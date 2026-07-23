import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import { readFileSync, existsSync, statSync } from 'fs';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 8080;

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp'
};

const server = createServer((req, res) => {
  // CORS Headers for cloud deployments
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Serve static files from 'dist' directory if built for production
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const reqPath = parsedUrl.pathname;
  let filePath = join(__dirname, 'dist', reqPath === '/' ? 'index.html' : reqPath);
  
  if (existsSync(filePath) && statSync(filePath).isFile()) {
    const ext = extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    try {
      const content = readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
      return;
    } catch (e) {}
  }

  // Fallback to index.html for SPA routing if dist exists
  const indexPath = join(__dirname, 'dist', 'index.html');
  if (existsSync(indexPath)) {
    try {
      const content = readFileSync(indexPath);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
      return;
    } catch (e) {}
  }

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('VNR202 Real-Time Individual Word Search Server is running.\n');
});

const wss = new WebSocketServer({ server });

// Map of roomCode -> { host, players: Map(playerName -> { socket, avatar, score, foundCount, foundWords }), status }
const rooms = new Map();

console.log(`Starting VNR202 Server on port ${PORT}...`);

wss.on('connection', (ws) => {
  ws.isAlive = true;
  ws.on('pong', () => {
    ws.isAlive = true;
  });

  let userSession = null; // { roomCode, name, isHost }

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message.toString());
      console.log('Received:', data.type, 'from', data.playerName || data.name || 'Host');

      switch (data.type) {
        case 'CREATE_ROOM': {
          const roomCode = Math.floor(1000 + Math.random() * 9000).toString();
          
          rooms.set(roomCode, {
            host: ws,
            players: new Map(),
            status: 'LOBBY'
          });

          userSession = { roomCode, name: 'Host', isHost: true };
          wsSendSafe(ws, JSON.stringify({ type: 'ROOM_CREATED', roomCode }));
          broadcastRoomState(roomCode);
          console.log(`Room created: ${roomCode}`);
          break;
        }

        case 'JOIN_ROOM': {
          const { roomCode, playerName, avatar } = data;
          const cleanRoomCode = (roomCode || '').trim();
          const cleanPlayerName = (playerName || '').trim();
          const mascotAvatar = avatar || '🦊';

          const room = rooms.get(cleanRoomCode);

          if (!room) {
            wsSendSafe(ws, JSON.stringify({ type: 'ERROR', message: `Phòng ${cleanRoomCode} không tồn tại!` }));
            return;
          }

          if (room.players.has(cleanPlayerName)) {
            wsSendSafe(ws, JSON.stringify({ type: 'ERROR', message: `Tên '${cleanPlayerName}' đã trùng trong phòng này!` }));
            return;
          }

          room.players.set(cleanPlayerName, {
            socket: ws,
            avatar: mascotAvatar,
            score: 0,
            foundCount: 0,
            foundWords: []
          });

          userSession = { roomCode: cleanRoomCode, name: cleanPlayerName, isHost: false };
          wsSendSafe(ws, JSON.stringify({ type: 'JOINED_SUCCESS', roomCode: cleanRoomCode, playerName: cleanPlayerName }));
          
          broadcastRoomState(cleanRoomCode);
          console.log(`Player ${cleanPlayerName} (${mascotAvatar}) joined room ${cleanRoomCode}. Total: ${room.players.size}`);
          break;
        }

        case 'START_GAME': {
          if (!userSession || !userSession.isHost) return;
          const room = rooms.get(userSession.roomCode);
          if (room) {
            room.status = 'PLAYING';
            // Reset player scores
            for (const player of room.players.values()) {
              player.score = 0;
              player.foundCount = 0;
              player.foundWords = [];
            }

            broadcastToRoom(userSession.roomCode, { 
              type: 'GAME_STARTED',
              leaderboard: getRoomLeaderboard(userSession.roomCode)
            });
            console.log(`Game started in room ${userSession.roomCode}`);
          }
          break;
        }

        case 'FOUND_WORD': {
          if (!userSession || userSession.isHost) return;
          const { roomCode, name } = userSession;
          const { word, points } = data;
          const room = rooms.get(roomCode);

          if (room && room.status === 'PLAYING') {
            const playerObj = room.players.get(name);
            if (playerObj) {
              if (!playerObj.foundWords.includes(word)) {
                playerObj.foundWords.push(word);
                playerObj.score += points;
                playerObj.foundCount = playerObj.foundWords.length;

                broadcastToRoom(roomCode, {
                  type: 'LEADERBOARD_UPDATE',
                  leaderboard: getRoomLeaderboard(roomCode),
                  latestFinder: name,
                  latestWord: word,
                  latestAvatar: playerObj.avatar
                });

                console.log(`Word '${word}' found by ${name} in room ${roomCode}`);
              }
            }
          }
          break;
        }

        case 'RESTART_GAME': {
          if (!userSession || !userSession.isHost) return;
          const room = rooms.get(userSession.roomCode);
          if (room) {
            room.status = 'LOBBY';
            for (const player of room.players.values()) {
              player.score = 0;
              player.foundCount = 0;
              player.foundWords = [];
            }
            broadcastRoomState(roomCode);
          }
          break;
        }
      }
    } catch (e) {
      console.error('Error handling message:', e);
    }
  });

  ws.on('close', () => {
    if (userSession) {
      const { roomCode, name, isHost } = userSession;
      console.log(`${name} disconnected.`);

      if (isHost) {
        const room = rooms.get(roomCode);
        if (room) {
          for (const player of room.players.values()) {
            wsSendSafe(player.socket, JSON.stringify({ type: 'HOST_DISCONNECTED' }));
            player.socket.close();
          }
          rooms.delete(roomCode);
        }
      } else {
        const room = rooms.get(roomCode);
        if (room) {
          room.players.delete(name);
          broadcastRoomState(roomCode);
        }
      }
    }
  });
});

// Heartbeat interval
const heartbeatInterval = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) {
      return ws.terminate();
    }
    ws.isAlive = false;
    ws.ping();
  });
}, 20000);

wss.on('close', () => {
  clearInterval(heartbeatInterval);
});

function getRoomLeaderboard(roomCode) {
  const room = rooms.get(roomCode);
  if (!room) return [];

  const list = [];
  for (const [name, player] of room.players.entries()) {
    list.push({
      name,
      avatar: player.avatar || '🦊',
      score: player.score,
      foundCount: player.foundCount
    });
  }
  return list.sort((a, b) => b.score - a.score);
}

function broadcastRoomState(roomCode) {
  const room = rooms.get(roomCode);
  if (!room) return;

  const lb = getRoomLeaderboard(roomCode);
  const payload = {
    type: 'ROOM_STATE_UPDATE',
    status: room.status,
    playersCount: room.players.size,
    leaderboard: lb
  };

  console.log(`Broadcasting ROOM_STATE_UPDATE for room ${roomCode} (${lb.length} players):`, lb.map(p => `${p.avatar} ${p.name}`));
  broadcastToRoom(roomCode, payload);
}

function broadcastToRoom(roomCode, payload) {
  const room = rooms.get(roomCode);
  if (!room) return;

  const msg = JSON.stringify(payload);
  if (room.host && room.host.readyState === 1) {
    wsSendSafe(room.host, msg);
  }

  for (const player of room.players.values()) {
    if (player.socket.readyState === 1) {
      wsSendSafe(player.socket, msg);
    }
  }
}

function wsSendSafe(socket, message) {
  try {
    if (socket.readyState === 1) {
      socket.send(message);
    }
  } catch (e) {
    console.error('Error sending socket message:', e);
  }
}

server.listen(PORT, () => {
  console.log(`VNR202 Production Server is running on port ${PORT}`);
});
