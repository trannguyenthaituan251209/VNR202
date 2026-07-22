import { WebSocketServer } from 'ws';
import { createServer } from 'http';

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('VNR202 Esports Bracket Survival Server is running.\n');
});

const wss = new WebSocketServer({ server });

// Map of roomCode -> { host, players: Map(playerName -> { socket, score, activeBranch, answeredCount }), status, teams: Map, playerToTeam: Map }
const rooms = new Map();

console.log('Starting Esports Bracket WebSocket Server on port 8080...');

wss.on('connection', (ws) => {
  ws.isAlive = true;
  ws.on('pong', () => {
    ws.isAlive = true;
  });

  let userSession = null; // { roomCode, name, isHost }

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message.toString());
      console.log('Received:', data.type, 'from', data.playerName || 'Host');

      switch (data.type) {
        case 'CREATE_ROOM': {
          const roomCode = Math.floor(1000 + Math.random() * 9000).toString();
          rooms.set(roomCode, {
            host: ws,
            players: new Map(),
            status: 'LOBBY',
            teams: new Map(),
            playerToTeam: new Map()
          });

          userSession = { roomCode, name: 'Host', isHost: true };
          ws.send(JSON.stringify({ type: 'ROOM_CREATED', roomCode }));
          console.log(`Room created: ${roomCode}`);
          break;
        }

        case 'JOIN_ROOM': {
          const { roomCode, playerName } = data;
          const room = rooms.get(roomCode);

          if (!room) {
            ws.send(JSON.stringify({ type: 'ERROR', message: 'Phòng không tồn tại!' }));
            return;
          }

          if (room.players.has(playerName)) {
            ws.send(JSON.stringify({ type: 'ERROR', message: 'Tên người chơi đã bị trùng!' }));
            return;
          }

          room.players.set(playerName, {
            socket: ws,
            score: 0,
            activeBranch: 'WINNERS',
            answeredCount: 0
          });

          userSession = { roomCode, name: playerName, isHost: false };
          ws.send(JSON.stringify({ type: 'JOINED_SUCCESS', roomCode, playerName }));
          
          sendPlayerListUpdate(roomCode);
          console.log(`Player ${playerName} joined room ${roomCode}`);
          break;
        }

        case 'START_CHAOS': {
          if (!userSession || !userSession.isHost) return;
          const room = rooms.get(userSession.roomCode);
          if (room) {
            room.status = 'CHAOS_ROUND';
            broadcastToRoom(userSession.roomCode, { type: 'GAME_STARTED', phase: 'CHAOS' });
          }
          break;
        }

        case 'SUBMIT_ANSWER': {
          if (!userSession || userSession.isHost) return;
          const { roomCode, name } = userSession;
          const { isCorrect, timeRemaining } = data;
          const room = rooms.get(roomCode);

          if (room) {
            const player = room.players.get(name);
            if (player) {
              player.answeredCount++;
              
              let points = 0;
              if (room.status === 'CHAOS_ROUND' || room.status === 'BRANCH_BATTLE') {
                points = isCorrect ? (100 + Math.round((timeRemaining / 15) * 50)) : -50;
              } else if (room.status === 'TEAM_DUO_ROUND') {
                const teamId = room.playerToTeam.get(name);
                const team = room.teams.get(teamId);
                if (team) {
                  points = isCorrect ? (150 + Math.round((timeRemaining / 15) * 50)) : -100;
                  team.score += points;
                  if (team.score < 0) team.score = 0;
                  
                  broadcastToRoom(roomCode, { 
                    type: 'TEAM_SCORE_UPDATE', 
                    teamId, 
                    score: team.score 
                  });
                }
              } else if (room.status === 'GRAND_FINALE') {
                points = isCorrect ? (200 + Math.round((timeRemaining / 15) * 100)) : -100;
              }

              if (room.status !== 'TEAM_DUO_ROUND') {
                player.score += points;
                if (player.score < 0) player.score = 0;
                
                ws.send(JSON.stringify({ 
                  type: 'ANSWER_RESULT', 
                  isCorrect, 
                  pointsGained: points, 
                  totalScore: player.score 
                }));
              }

              sendSubmissionStatus(roomCode);
            }
          }
          break;
        }

        case 'SPLIT_BRACKETS': {
          if (!userSession || !userSession.isHost) return;
          const room = rooms.get(userSession.roomCode);
          if (room) {
            room.status = 'BRACKET_SPLIT';
            const sortedPlayers = getRoomLeaderboard(userSession.roomCode);
            const mid = Math.ceil(sortedPlayers.length / 2);
            
            sortedPlayers.forEach((p, idx) => {
              const playerObj = room.players.get(p.name);
              if (playerObj) {
                playerObj.activeBranch = idx < mid ? 'WINNERS' : 'LOSERS';
              }
            });

            broadcastToRoom(userSession.roomCode, { 
              type: 'BRACKETS_UPDATED', 
              leaderboard: getRoomLeaderboard(userSession.roomCode), 
              midpointIndex: mid 
            });
          }
          break;
        }

        case 'START_BRANCH_BATTLE': {
          if (!userSession || !userSession.isHost) return;
          const room = rooms.get(userSession.roomCode);
          if (room) {
            room.status = 'BRANCH_BATTLE';
            broadcastToRoom(userSession.roomCode, { type: 'GAME_STARTED', phase: 'BRANCH_BATTLE' });
          }
          break;
        }

        case 'PROCESS_BRANCH_BATTLE': {
          if (!userSession || !userSession.isHost) return;
          const room = rooms.get(userSession.roomCode);
          if (room) {
            room.status = 'TEAM_LOBBY';
            const winners = [];
            const losers = [];
            for (const [name, p] of room.players.entries()) {
              if (p.activeBranch === 'WINNERS') winners.push({ name, score: p.score });
              if (p.activeBranch === 'LOSERS') losers.push({ name, score: p.score });
            }
            winners.sort((a, b) => b.score - a.score);
            losers.sort((a, b) => b.score - a.score);

            const survivorsWinners = winners.slice(0, 4);
            const survivorsLosers = losers.slice(0, 2);
            const eliminatedNames = [];

            winners.slice(4).forEach(p => eliminatedNames.push(p.name));
            losers.slice(2).forEach(p => eliminatedNames.push(p.name));

            eliminatedNames.forEach((name) => {
              const pObj = room.players.get(name);
              if (pObj) pObj.activeBranch = 'ELIMINATED';
            });

            const teams = [
              { id: 'TEAM_1', name: 'Đội Sao Lạc', p1: survivorsWinners[0]?.name, p2: survivorsLosers[1]?.name },
              { id: 'TEAM_2', name: 'Đội Trống Đồng', p1: survivorsWinners[1]?.name, p2: survivorsLosers[0]?.name },
              { id: 'TEAM_3', name: 'Đội Liêm Chính', p1: survivorsWinners[2]?.name, p2: survivorsWinners[3]?.name }
            ];

            room.teams.clear();
            room.playerToTeam.clear();

            teams.forEach((t) => {
              room.teams.set(t.id, { name: t.name, players: [t.p1, t.p2].filter(Boolean), score: 0 });
              if (t.p1) room.playerToTeam.set(t.p1, t.id);
              if (t.p2) room.playerToTeam.set(t.p2, t.id);
            });

            broadcastToRoom(userSession.roomCode, {
              type: 'TEAMS_CREATED',
              teams: teams.map(t => ({
                id: t.id,
                name: t.name,
                p1: t.p1 || 'Trống',
                p2: t.p2 || 'Trống',
                score: 0
              })),
              leaderboard: getRoomLeaderboard(userSession.roomCode)
            });
            console.log(`Teams created in room ${userSession.roomCode}`);
          }
          break;
        }

        case 'START_TEAM_DUO': {
          if (!userSession || !userSession.isHost) return;
          const room = rooms.get(userSession.roomCode);
          if (room) {
            room.status = 'TEAM_DUO_ROUND';
            broadcastToRoom(userSession.roomCode, { type: 'TEAM_DUO_STARTED' });
          }
          break;
        }

        case 'NEXT_QUESTION': {
          if (!userSession || !userSession.isHost) return;
          const { roomCode } = userSession;
          const { questionIndex } = data;
          const room = rooms.get(roomCode);
          if (room) {
            broadcastToRoom(roomCode, { 
              type: 'NEW_QUESTION', 
              questionIndex 
            });
            console.log(`Broadcasted new question index: ${questionIndex} in room ${roomCode}`);
          }
          break;
        }

        case 'SEND_TEAM_CHAT': {
          if (!userSession || userSession.isHost) return;
          const { roomCode, name } = userSession;
          const { text } = data;
          const room = rooms.get(roomCode);

          if (room && room.status === 'TEAM_DUO_ROUND') {
            const teamId = room.playerToTeam.get(name);
            const team = room.teams.get(teamId);
            if (team) {
              const teammateName = team.players.find(p => p !== name);
              if (teammateName) {
                const teammateObj = room.players.get(teammateName);
                if (teammateObj && teammateObj.socket.readyState === 1) {
                  teammateObj.socket.send(JSON.stringify({ 
                    type: 'TEAM_CHAT_RECEIVED', 
                    sender: name, 
                    text 
                  }));
                }
              }

              if (room.host.readyState === 1) {
                room.host.send(JSON.stringify({
                  type: 'CLASS_CHAT_EVENT',
                  teamName: team.name,
                  sender: name,
                  text
                }));
              }
            }
          }
          break;
        }

        case 'FINISH_TEAM_DUO': {
          if (!userSession || !userSession.isHost) return;
          const room = rooms.get(userSession.roomCode);
          if (room) {
            const teamList = Array.from(room.teams.entries()).map(([id, t]) => ({ id, name: t.name, score: t.score, players: t.players }));
            teamList.sort((a, b) => b.score - a.score);
            const winningTeam = teamList[0];

            for (const [name, p] of room.players.entries()) {
              if (winningTeam && winningTeam.players.includes(name)) {
                p.activeBranch = 'WINNERS';
                p.score = winningTeam.score; 
              } else {
                p.activeBranch = 'ELIMINATED';
              }
            }

            room.status = 'FINALE_LOBBY';
            broadcastToRoom(userSession.roomCode, {
              type: 'FINALE_ROSTER_READY',
              winningTeamName: winningTeam?.name || 'Chưa rõ',
              finalists: winningTeam?.players || [],
              leaderboard: getRoomLeaderboard(userSession.roomCode)
            });
            console.log(`Team Round finished. Winning team: ${winningTeam?.name}`);
          }
          break;
        }

        case 'START_FINALE': {
          if (!userSession || !userSession.isHost) return;
          const room = rooms.get(userSession.roomCode);
          if (room) {
            room.status = 'GRAND_FINALE';
            broadcastToRoom(userSession.roomCode, { type: 'FINALE_STARTED' });
          }
          break;
        }

        case 'FINISH_GAME': {
          if (!userSession || !userSession.isHost) return;
          const room = rooms.get(userSession.roomCode);
          if (room) {
            room.status = 'FINISHED';
            const leaderboard = getRoomLeaderboard(userSession.roomCode);
            broadcastToRoom(userSession.roomCode, { type: 'GAME_FINISHED', finalScores: leaderboard });
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
            player.socket.send(JSON.stringify({ type: 'HOST_DISCONNECTED' }));
            player.socket.close();
          }
          rooms.delete(roomCode);
        }
      } else {
        const room = rooms.get(roomCode);
        if (room) {
          room.players.delete(name);
          sendPlayerListUpdate(roomCode);
          sendSubmissionStatus(roomCode);
        }
      }
    }
  });
});

// Heartbeat interval to ping clients every 20 seconds and clear inactive connections
const heartbeatInterval = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) {
      console.log('Terminating dead websocket client...');
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
      score: player.score,
      activeBranch: player.activeBranch,
      answeredCount: player.answeredCount
    });
  }
  return list.sort((a, b) => b.score - a.score);
}

function sendPlayerListUpdate(roomCode) {
  const room = rooms.get(roomCode);
  if (!room) return;

  const playersList = Array.from(room.players.keys());
  room.host.send(JSON.stringify({ type: 'PLAYERS_LIST', players: playersList }));
}

function sendSubmissionStatus(roomCode) {
  const room = rooms.get(roomCode);
  if (!room) return;

  broadcastToRoom(roomCode, { 
    type: 'SUBMISSION_STATUS', 
    leaderboard: getRoomLeaderboard(roomCode)
  });
}

function broadcastToRoom(roomCode, payload) {
  const room = rooms.get(roomCode);
  if (!room) return;

  const msg = JSON.stringify(payload);
  room.host.send(msg);
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

server.listen(8080, () => {
  console.log('Server is listening on http://localhost:8080');
});
