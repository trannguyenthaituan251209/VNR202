import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, BookOpen, CheckCircle, HelpCircle, RefreshCw, 
  Sparkles, Trophy, Zap, Lightbulb, Users, UserCheck, Play,
  Award, X, ArrowRight, Radio, Shield, Star, Crown
} from 'lucide-react';
import { DongSonStar } from './VietnameseMotifs';

// VNR202 Word Search Database
const WORD_DATABASE = [
  {
    word: "LIEMCHINH",
    display: "LIÊM CHÍNH",
    definition: "Nền tảng đạo đức cốt lõi của sinh viên và công chức. Cố Tổng Bí thư Nguyễn Phú Trọng nhấn mạnh: 'Danh dự mới là điều thiêng liêng, cao quý nhất'."
  },
  {
    word: "THAMNHUNG",
    display: "THAM NHŨNG",
    definition: "Hành vi của người có chức vụ, quyền hạn đã lợi dụng chức vụ, quyền hạn đó vì vụ lợi (Theo Luật PCTN 2018)."
  },
  {
    word: "MINHBACH",
    display: "MINH BẠCH",
    definition: "Công khai, minh bạch các chính sách, tài chính và thủ tục hành chính để ngăn ngừa tiêu cực và tham nhũng."
  },
  {
    word: "DAODUC",
    display: "ĐẠO ĐỨC",
    definition: "Rèn luyện phẩm chất đạo đức nghề nghiệp và giữ vững liêm chính học thuật ngay từ khi còn ngồi trên ghế nhà trường."
  },
  {
    word: "TRACHNHIEM",
    display: "TRÁCH NHỆM",
    definition: "Trách nhiệm của người đứng đầu cơ quan tổ chức khi để xảy ra tham nhũng và nghĩa vụ giải trình trước nhân dân."
  },
  {
    word: "GIAODUC",
    display: "GIÁO DỤC",
    definition: "Chỉ thị 10/CT-TTg đưa nội dung phòng chống tham nhũng vào giảng dạy tại các cơ sở giáo dục trên toàn quốc từ năm học 2013-2014."
  },
  {
    word: "TOCAO",
    display: "TỐ CÁO",
    definition: "Quyền và nghĩa vụ của công dân trong việc phát hiện, tố giác tham nhũng; Luật Tố cáo 2018 có riêng 1 chương bảo vệ người tố cáo."
  },
  {
    word: "UNCAC",
    display: "UNCAC",
    definition: "Công ước của Liên Hợp Quốc về chống tham nhũng (UNCAC) mà Việt Nam là quốc gia thành viên tích cực."
  },
  {
    word: "VNR202",
    display: "VNR202",
    definition: "Môn học Lịch sử Đảng Cộng sản Việt Nam & Giáo dục Văn hóa Liêm chính phòng chống tham nhũng."
  },
  {
    word: "BONKHONG",
    display: "BỐN KHÔNG",
    definition: "Mục tiêu chiến lược của Đảng: Không thể, Không dám, Không cần, Không muốn tham nhũng."
  },
  {
    word: "THANHTRA",
    display: "THANH TRA",
    definition: "Hoạt động xem xét, đánh giá, xử lý việc thực hiện chính sách, pháp luật, nhiệm vụ của cơ quan, tổ chức, cá nhân."
  },
  {
    word: "KIEMTRA",
    display: "KIỂM TRA",
    definition: "Công tác kiểm tra, giám sát của Đảng là phương thức lãnh đạo quan trọng để giữ vững kỷ luật, kỷ cương."
  },
  {
    word: "GIAMSAT",
    display: "GIÁM SÁT",
    definition: "Giám sát của Mặt trận Tổ quốc, báo chí và nhân dân trong công tác phòng chống tham nhũng, tiêu cực."
  },
  {
    word: "KEKHAI",
    display: "KÊ KHAI",
    definition: "Nghĩa vụ kê khai tài sản, thu nhập của người có chức vụ, quyền hạn nhằm minh bạch hóa tài sản công chức."
  },
  {
    word: "GIATRINH",
    display: "GIẢI TRÌNH",
    definition: "Nghĩa vụ của cơ quan, tổ chức, cá nhân trong việc cung cấp, làm rõ thông tin về quyết định, hành vi của mình."
  },
  {
    word: "DANHDU",
    display: "DANH DỰ",
    definition: "Giá trị đạo đức nhân văn cao quý nhất của người cán bộ, đảng viên và sinh viên học tập liêm chính."
  },
  {
    word: "CONGKHAI",
    display: "CÔNG KHAI",
    definition: "Nguyên tắc công khai hoạt động của cơ quan, tổ chức để nhân dân biết, nhân dân bàn, nhân dân làm, nhân dân kiểm tra."
  },
  {
    word: "PHONGCHONG",
    display: "PHÒNG CHỐNG",
    definition: "Phương châm kết hợp chặt chẽ giữa phòng ngừa chủ động và đấu tranh kiên quyết chống tham nhũng, tiêu cực."
  },
  {
    word: "PHAPLUAT",
    display: "PHÁP LUẬT",
    definition: "Thượng tôn pháp luật, mọi hành vi vi phạm và tham nhũng đều phải bị xử lý nghiêm minh, không có vùng cấm."
  },
  {
    word: "KYLUAT",
    display: "KỶ LUẬT",
    definition: "Siết chặt kỷ luật, kỷ cương trong Đảng và bộ máy nhà nước, xử lý nghiêm cán bộ vi phạm văn hóa liêm chính."
  },
  {
    word: "CONGDUC",
    display: "CÔNG ĐỨC",
    definition: "Tấm lòng phụng sự tổ quốc, phục vụ nhân dân, đặt lợi ích chung của quốc gia dân tộc lên trên hết."
  },
  {
    word: "TRUNGTHUC",
    display: "TRUNG THỰC",
    definition: "Tính trung thực trong học tập, thi cử và công tác; nói đi đôi với làm, không gian lận hay dối trá."
  },
  {
    word: "CONGMINH",
    display: "CÔNG MINH",
    definition: "Xử lý công tâm, chính trực, không bao che, không thiên vị trong công tác cán bộ và quản lý xã hội."
  },
  {
    word: "VIETNAM",
    display: "VIỆT NAM",
    definition: "Quyết tâm xây dựng nước Việt Nam hùng cường, minh bạch, liêm chính và phát triển bền vững."
  },
  {
    word: "CONGCHUC",
    display: "CÔNG CHỨC",
    definition: "Đội ngũ cán bộ, công chức, viên chức tận tụy, liêm chính, hết lòng vì sự nghiệp phát triển của đất nước."
  }
];

const PASTEL_COLORS = [
  '#00f0ff', '#ff007f', '#00ff88', '#ffd700', 
  '#a855f7', '#ff6b6b', '#3b82f6', '#ec4899', '#f97316', '#10b981'
];

const FILL_CHARS = ['A', 'B', 'C', 'D', 'E', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', '2', '0'];

const DIRECTIONS = [
  { dx: 1, dy: 0 },   // Horizontal Right
  { dx: -1, dy: 0 },  // Horizontal Left
  { dx: 0, dy: 1 },   // Vertical Down
  { dx: 0, dy: -1 },  // Vertical Up
  { dx: 1, dy: 1 },   // Diagonal Down-Right
  { dx: -1, dy: -1 }, // Diagonal Up-Left
  { dx: -1, dy: 1 },  // Diagonal Down-Left
  { dx: 1, dy: -1 }   // Diagonal Up-Right
];

// 8 Interactive Animal Mascots
const ANIMAL_MASCOTS = [
  { id: 'fox', emoji: '🦊', name: 'Cáo Minh Bạch', title: 'Minh Bạch', color: '#ff7700' },
  { id: 'lion', emoji: '🦁', name: 'Sư Tử Dũng Cảm', title: 'Dũng Cảm', color: '#ffd700' },
  { id: 'owl', emoji: '🦉', name: 'Cú Uyên Bác', title: 'Uyên Bác', color: '#a855f7' },
  { id: 'panda', emoji: '🐼', name: 'Gấu Trúc Công Bằng', title: 'Công Bằng', color: '#00ff88' },
  { id: 'tiger', emoji: '🐯', name: 'Hổ Quyết Thắng', title: 'Quyết Thắng', color: '#ff4444' },
  { id: 'dolphin', emoji: '🐬', name: 'Cá Thần Thông', title: 'Nhanh Trí', color: '#00f0ff' },
  { id: 'eagle', emoji: '🦅', name: 'Đại Bàng Quang Minh', title: 'Liêm Chính', color: '#f97316' },
  { id: 'rabbit', emoji: '🐰', name: 'Thỏ Tinh Anh', title: 'Tinh Anh', color: '#ec4899' }
];

export default function GamePlaceholder() {
  const [gameState, setGameState] = useState('ROLE_SELECTION'); // ROLE_SELECTION, LOBBY, PLAYING, FINISHED
  const [isHost, setIsHost] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [selectedMascot, setSelectedMascot] = useState(ANIMAL_MASCOTS[0]);

  // Individual Leaderboard State
  const [leaderboard, setLeaderboard] = useState([]);

  // Game Board State
  const gridSize = 16;
  const [grid, setGrid] = useState([]);
  const [targetWords, setTargetWords] = useState([]);
  
  const [isSelecting, setIsSelecting] = useState(false);
  const [startCell, setStartCell] = useState(null);
  const [selectedPath, setSelectedPath] = useState([]);
  
  const GAME_DURATION = 540; // 9 minutes = 540 seconds
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(GAME_DURATION);
  const [timerActive, setTimerActive] = useState(false);
  const [hintsLeft, setHintsLeft] = useState(3);
  const [hintedPos, setHintedPos] = useState(null);
  const [latestToast, setLatestToast] = useState(null);
  const [floatingBubbles, setFloatingBubbles] = useState([]);

  const [showRuleModal, setShowRuleModal] = useState(false);
  const [activeDefinition, setActiveDefinition] = useState(null);

  // Trigger floating rising bubble
  const triggerFloatingBubble = (avatar, name, word) => {
    const id = Date.now() + Math.random();
    const randomLeft = 12 + Math.floor(Math.random() * 68);
    const newBubble = { id, avatar, name, word, left: `${randomLeft}%` };

    setFloatingBubbles((prev) => [...prev.slice(-4), newBubble]);

    setTimeout(() => {
      setFloatingBubbles((prev) => prev.filter((b) => b.id !== id));
    }, 4200);
  };
  
  const socketRef = useRef(null);

  // Cleanup WebSockets
  useEffect(() => {
    return () => {
      if (socketRef.current) {
        try { socketRef.current.close(); } catch (e) {}
      }
    };
  }, []);

  // 9-Minute Countdown Timer Effect
  useEffect(() => {
    let interval = null;
    if (timerActive && gameState === 'PLAYING') {
      interval = setInterval(() => {
        setTimer((t) => {
          if (t <= 1) {
            clearInterval(interval);
            setTimerActive(false);
            setGameState('FINISHED');
            triggerToast('⏰ Đã hết thời gian 9 phút thi đấu!');
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, gameState]);

  // Toast notification helper
  const triggerToast = (msg, duration = 3500) => {
    setLatestToast(msg);
    setTimeout(() => setLatestToast(null), duration);
  };

  // Safe Socket Message Sender
  const safeSendSocketMessage = (payload) => {
    try {
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify(payload));
        return true;
      } else {
        triggerToast('⚠️ Đang kết nối máy chủ WebSocket...');
        connectWebSocket((ws) => {
          ws.send(JSON.stringify(payload));
        });
        return false;
      }
    } catch (e) {
      console.error('Socket send exception:', e);
      return false;
    }
  };

  // Connect WebSocket safely
  const connectWebSocket = (onOpenCallback) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      if (onOpenCallback) onOpenCallback(socketRef.current);
      return;
    }

    if (socketRef.current) {
      try {
        socketRef.current.onopen = null;
        socketRef.current.onmessage = null;
        socketRef.current.onerror = null;
        socketRef.current.close();
      } catch (e) {}
    }

    try {
      let wsUrl = import.meta.env.VITE_WS_URL;

      if (!wsUrl) {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const hostname = window.location.hostname || 'localhost';
        const port = window.location.port ? `:${window.location.port}` : (hostname === 'localhost' ? ':8080' : '');
        wsUrl = `${protocol}//${hostname}${port}`;
      }

      const ws = new WebSocket(wsUrl);
      socketRef.current = ws;

      ws.onopen = () => {
        if (onOpenCallback) onOpenCallback(ws);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          handleServerMessage(data);
        } catch (e) {
          console.error("Error parsing message:", e);
        }
      };

      ws.onerror = (err) => {
        console.error("WebSocket Error:", err);
        triggerToast('Không thể kết nối tới máy chủ WebSocket (Port 8080)!');
      };
    } catch (e) {
      triggerToast('Lỗi mở kết nối WebSocket!');
    }
  };

  const handleServerMessage = (data) => {
    switch (data.type) {
      case 'ROOM_CREATED':
        setRoomCode(data.roomCode);
        setGameState('LOBBY');
        triggerToast(`Đã tạo phòng ${data.roomCode} thành công!`);
        break;

      case 'JOINED_SUCCESS':
        setRoomCode(data.roomCode);
        setGameState('LOBBY');
        triggerToast(`Đã tham gia phòng ${data.roomCode}!`);
        break;

      case 'ROOM_STATE_UPDATE':
        setLeaderboard(data.leaderboard || []);
        if (data.status === 'PLAYING' && gameState === 'LOBBY') {
          initializeBoard();
          setGameState('PLAYING');
          setTimerActive(true);
        }
        break;

      case 'ERROR':
        triggerToast(`⚠️ ${data.message || 'Có lỗi xảy ra!'}`);
        if (gameState !== 'LOBBY' && gameState !== 'PLAYING') {
          setGameState('ROLE_SELECTION');
        }
        break;

      case 'GAME_STARTED':
        setLeaderboard(data.leaderboard || []);
        initializeBoard();
        setGameState('PLAYING');
        setTimerActive(true);
        break;

      case 'LEADERBOARD_UPDATE':
        setLeaderboard(data.leaderboard || []);
        if (data.latestFinder) {
          const isMe = data.latestFinder === playerName.trim();
          const displayName = isMe ? `${data.latestFinder} (Bạn)` : data.latestFinder;
          triggerFloatingBubble(data.latestAvatar || '🌟', displayName, data.latestWord);
        }
        const winner = data.leaderboard.find(p => p.foundCount >= WORD_DATABASE.length);
        if (winner) {
          setTimerActive(false);
          setGameState('FINISHED');
        }
        break;

      case 'HOST_DISCONNECTED':
        triggerToast('Host đã rời phòng! Trận đấu kết thúc.');
        resetToRoleSelection();
        break;
    }
  };

  // Generate Fixed/Deterministic Grid for Fair Play
  const initializeBoard = () => {
    const size = 16;
    const newGrid = Array(size).fill(null).map(() => Array(size).fill(null));
    const placedList = [];

    WORD_DATABASE.forEach((wordObj, colorIdx) => {
      const wordStr = wordObj.word;
      let placed = false;
      let attempts = 0;

      while (!placed && attempts < 150) {
        attempts++;
        const dir = DIRECTIONS[(colorIdx * 3 + attempts) % DIRECTIONS.length];
        const startR = (colorIdx * 2 + attempts * 7) % size;
        const startC = (colorIdx * 5 + attempts * 3) % size;

        let fit = true;
        const positions = [];

        for (let i = 0; i < wordStr.length; i++) {
          const r = startR + dir.dy * i;
          const c = startC + dir.dx * i;

          if (r < 0 || r >= size || c < 0 || c >= size) {
            fit = false;
            break;
          }
          if (newGrid[r][c] !== null && newGrid[r][c] !== wordStr[i]) {
            fit = false;
            break;
          }
          positions.push({ r, c });
        }

        if (fit) {
          positions.forEach((pos, idx) => {
            newGrid[pos.r][pos.c] = wordStr[idx];
          });
          placedList.push({
            ...wordObj,
            positions,
            color: PASTEL_COLORS[colorIdx % PASTEL_COLORS.length],
            found: false
          });
          placed = true;
        }
      }
    });

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (newGrid[r][c] === null) {
          const charIdx = (r * 13 + c * 7) % FILL_CHARS.length;
          newGrid[r][c] = FILL_CHARS[charIdx];
        }
      }
    }

    setGrid(newGrid);
    setTargetWords(placedList);
    setScore(0);
    setTimer(GAME_DURATION);
    setHintsLeft(3);
  };

  // Host Create Room via WebSocket
  const handleHostCreateRoom = () => {
    setIsHost(true);
    connectWebSocket((ws) => {
      ws.send(JSON.stringify({ type: 'CREATE_ROOM' }));
    });
  };

  // Player Join Room via WebSocket with Animal Mascot Avatar
  const handlePlayerJoinRoom = () => {
    const trimmedName = playerName.trim();
    const trimmedCode = roomCode.trim();

    if (!trimmedName || !trimmedCode) {
      triggerToast('Vui lòng điền đủ Tên và Mã phòng chơi!');
      return;
    }

    setIsHost(false);
    connectWebSocket((ws) => {
      ws.send(JSON.stringify({ 
        type: 'JOIN_ROOM', 
        roomCode: trimmedCode, 
        playerName: trimmedName,
        avatar: selectedMascot.emoji
      }));
    });
  };

  // Host Starts Game via WebSocket
  const handleStartGame = () => {
    safeSendSocketMessage({ type: 'START_GAME' });
  };

  // Line Selection Logic
  const calculatePath = (start, end) => {
    if (!start || !end) return [];
    const dr = end.r - start.r;
    const dc = end.c - start.c;
    const absR = Math.abs(dr);
    const absC = Math.abs(dc);

    if (dr !== 0 && dc !== 0 && absR !== absC) return [start];

    const stepR = dr === 0 ? 0 : dr / absR;
    const stepC = dc === 0 ? 0 : dc / absC;
    const steps = Math.max(absR, absC);

    const path = [];
    for (let i = 0; i <= steps; i++) {
      path.push({ r: start.r + stepR * i, c: start.c + stepC * i });
    }
    return path;
  };

  const handleCellMouseDown = (r, c) => {
    setIsSelecting(true);
    setStartCell({ r, c });
    setSelectedPath([{ r, c }]);
  };

  const handleCellMouseEnter = (r, c) => {
    if (!isSelecting || !startCell) return;
    const path = calculatePath(startCell, { r, c });
    setSelectedPath(path);
  };

  const handleMouseUp = () => {
    if (!isSelecting) return;
    setIsSelecting(false);
    if (selectedPath.length === 0) return;

    const selectedString = selectedPath.map((pos) => grid[pos.r]?.[pos.c]).join('');
    const reversedString = selectedString.split('').reverse().join('');

    const matchedIndex = targetWords.findIndex(
      (tw) => !tw.found && (tw.word === selectedString || tw.word === reversedString)
    );

    if (matchedIndex !== -1) {
      const foundWordObj = targetWords[matchedIndex];
      const pointsGained = 120;

      const updatedWords = [...targetWords];
      updatedWords[matchedIndex].found = true;
      setTargetWords(updatedWords);

      const newScore = score + pointsGained;
      setScore(newScore);

      setActiveDefinition(foundWordObj);
      triggerFloatingBubble(selectedMascot.emoji, `${playerName.trim() || 'Bạn'} (Bạn)`, foundWordObj.display);

      safeSendSocketMessage({
        type: 'FOUND_WORD',
        word: foundWordObj.word,
        points: pointsGained
      });

      // Check win
      const allFound = updatedWords.every((w) => w.found);
      if (allFound) {
        setTimerActive(false);
        setTimeout(() => setGameState('FINISHED'), 800);
      }
    }

    setSelectedPath([]);
    setStartCell(null);
  };

  const isCellSelected = (r, c) => selectedPath.some((pos) => pos.r === r && pos.c === c);

  const getCellFoundColor = (r, c) => {
    for (let tw of targetWords) {
      if (tw.found && tw.positions.some((pos) => pos.r === r && pos.c === c)) {
        return tw.color;
      }
    }
    return null;
  };

  const handleUseHint = () => {
    if (hintsLeft <= 0) return;
    const unfound = targetWords.filter((w) => !w.found);
    if (unfound.length === 0) return;

    const randomWord = unfound[Math.floor(Math.random() * unfound.length)];
    setHintedPos(randomWord.positions[0]);
    setHintsLeft((h) => h - 1);
    setTimeout(() => setHintedPos(null), 3000);
  };

  const resetToRoleSelection = () => {
    if (socketRef.current) {
      try { socketRef.current.close(); } catch(e){}
    }
    setGameState('ROLE_SELECTION');
    setIsHost(false);
    setShowRuleModal(false);
    setActiveDefinition(null);
    setSelectedPath([]);
    setIsSelecting(false);
  };

  const formatTime = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <section 
      onMouseUp={handleMouseUp}
      onTouchEnd={handleMouseUp}
      style={{
        background: 'radial-gradient(circle at center, #0d1117 0%, #030406 100%)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        color: '#e2e8f0',
        fontFamily: 'var(--font-sans)',
        paddingBottom: '60px',
        userSelect: 'none'
      }}
    >
      {/* Star Backdrop */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: 0.04,
        pointerEvents: 'none'
      }} className="drum-rotate">
        <DongSonStar size={650} color="#00f0ff" />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 10, padding: '30px 20px', maxWidth: '1200px' }}>

        {/* Toast Notification */}
        {latestToast && (
          <div style={{
            position: 'fixed',
            top: '25px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0, 240, 255, 0.95)',
            color: '#090a0f',
            padding: '12px 24px',
            borderRadius: '30px',
            fontWeight: 'bold',
            boxShadow: '0 0 25px rgba(0, 240, 255, 0.5)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.92rem',
            pointerEvents: 'none',
            animation: 'fadeIn 0.3s ease-out'
          }}>
            <Sparkles size={18} /> {latestToast}
          </div>
        )}

        {/* Real-time Floating Word Discovery Bubbles (Bottom-to-Top Animation) */}
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999, overflow: 'hidden' }}>
          {floatingBubbles.map((b) => (
            <div
              key={b.id}
              className="floating-bubble"
              style={{
                left: b.left,
                backgroundColor: 'rgba(15, 23, 42, 0.92)',
                border: '1.5px solid #00f0ff',
                borderRadius: '25px',
                padding: '10px 22px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: '0.92rem',
                boxShadow: '0 8px 30px rgba(0, 240, 255, 0.4)'
              }}
            >
              <span style={{ fontSize: '1.6rem' }}>{b.avatar}</span>
              <span>
                <strong style={{ color: '#00f0ff' }}>{b.name}</strong> đã tìm thấy{' '}
                <span style={{ color: '#ffd700', textDecoration: 'underline' }}>{b.word}</span>! ✨
              </span>
            </div>
          ))}
        </div>

        {/* Screen 1: ROLE SELECTION */}
        {gameState === 'ROLE_SELECTION' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '35px' }}>
              <a href="#" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                textDecoration: 'none',
                color: '#00f0ff',
                fontWeight: 'bold',
                fontSize: '0.9rem'
              }}>
                <ArrowLeft size={16} /> Quay lại trang chủ học tập
              </a>

              <button 
                onClick={() => setShowRuleModal(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 18px',
                  backgroundColor: 'rgba(0, 240, 255, 0.12)',
                  border: '1px solid rgba(0, 240, 255, 0.4)',
                  borderRadius: '20px',
                  color: '#00f0ff',
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                <BookOpen size={16} /> Hướng Dẫn Luật Chơi Ô Chữ
              </button>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '35px' }}>
              <p style={{ color: '#00f0ff', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 'bold' }}>COSMIC ARENA</p>
              <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-title)', color: '#ffffff' }}>Ô Chữ Liêm Chính - Thách Thức Cá Nhân</h2>
            </div>

            {/* Role Box Selection */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: '30px', maxWidth: '950px', margin: '0 auto', alignItems: 'stretch' }}>
              
              {/* Host Card */}
              <div className="premium-card" style={{
                backgroundColor: 'rgba(15, 20, 35, 0.8)',
                border: '1px solid rgba(0, 240, 255, 0.25)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '22px',
                padding: '30px'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
                  <Trophy size={45} color="#ffd700" />
                  <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-title)', color: '#ffffff', margin: 0 }}>Người Quản Trò (Host)</h3>
                  <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: '1.5', margin: 0 }}>
                    Tạo phòng thi đấu real-time, nhận thông báo danh sách sinh viên tham gia và phát lệnh khởi tranh.
                  </p>
                </div>

                <button onClick={handleHostCreateRoom} style={{
                  width: '100%', padding: '14px', backgroundColor: '#00f0ff', color: '#090a0f', border: 'none', fontWeight: 'bold', cursor: 'pointer', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '1rem'
                }}>
                  <Play size={18} /> Tạo phòng thi đấu
                </button>
              </div>

              {/* Player Card with Animal Mascot Picker */}
              <div className="premium-card" style={{
                backgroundColor: 'rgba(15, 20, 35, 0.85)',
                border: '1px solid rgba(0, 240, 255, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
                padding: '30px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ fontSize: '1.35rem', fontFamily: 'var(--font-title)', color: '#ffffff', margin: 0 }}>Sinh Viên (Player)</h3>
                  <p style={{ fontSize: '0.82rem', color: '#cbd5e1', marginTop: '4px' }}>
                    Chọn <strong>Linh Vật Động Vật</strong> & Nhập mã phòng để đua top!
                  </p>
                </div>

                {/* Animal Mascot Picker Grid */}
                <div>
                  <label style={{ fontSize: '0.78rem', color: '#00f0ff', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>
                    CHỌN LINH VẬT ĐẠI DIỆN:
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                    {ANIMAL_MASCOTS.map((m) => {
                      const isSelected = selectedMascot.id === m.id;
                      return (
                        <button
                          key={m.id}
                          onClick={() => setSelectedMascot(m)}
                          style={{
                            padding: '8px 4px',
                            borderRadius: '8px',
                            backgroundColor: isSelected ? 'rgba(0, 240, 255, 0.2)' : 'rgba(9, 10, 15, 0.6)',
                            border: isSelected ? `2px solid ${m.color}` : '1px solid rgba(255,255,255,0.1)',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '2px',
                            transition: 'all 0.2s ease',
                            transform: isSelected ? 'scale(1.05)' : 'none'
                          }}
                        >
                          <span style={{ fontSize: '1.5rem' }}>{m.emoji}</span>
                          <span style={{ fontSize: '0.68rem', color: isSelected ? '#ffffff' : '#cbd5e1', fontWeight: isSelected ? 'bold' : 'normal' }}>
                            {m.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name & Room Code Inputs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <input
                    type="text" placeholder="Tên của bạn..." value={playerName} onChange={(e) => setPlayerName(e.target.value)}
                    style={{ padding: '11px', borderRadius: '6px', border: '1px solid rgba(0, 240, 255, 0.3)', backgroundColor: 'rgba(9, 10, 15, 0.8)', color: '#ffffff', outline: 'none' }}
                  />
                  <input
                    type="text" placeholder="Mã phòng (ví dụ: 1234)..." value={roomCode} onChange={(e) => setRoomCode(e.target.value)}
                    style={{ padding: '11px', borderRadius: '6px', border: '1px solid rgba(0, 240, 255, 0.3)', backgroundColor: 'rgba(9, 10, 15, 0.8)', color: '#ffffff', outline: 'none' }}
                  />
                </div>

                <button onClick={handlePlayerJoinRoom} style={{
                  width: '100%', padding: '13px', border: '1.5px solid #00f0ff', backgroundColor: 'transparent', color: '#00f0ff', fontWeight: 'bold', cursor: 'pointer', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '1rem'
                }}>
                  <ArrowRight size={18} /> Vào phòng chơi với {selectedMascot.emoji} {selectedMascot.name}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Screen 2: LOBBY & PLAYER ROSTER */}
        {gameState === 'LOBBY' && (
          <div style={{ maxWidth: '850px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <button onClick={resetToRoleSelection} style={{ border: 'none', background: 'none', color: '#cbd5e1', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <ArrowLeft size={16} /> Rời phòng
              </button>
              
              <div style={{ backgroundColor: 'rgba(0, 240, 255, 0.1)', border: '1px solid #00f0ff', padding: '8px 20px', borderRadius: '20px', color: '#00f0ff', fontWeight: 'bold' }}>
                MÃ PHÒNG CHƠI: <span style={{ fontSize: '1.4rem', fontFamily: 'var(--font-title)', marginLeft: '6px' }}>{roomCode}</span>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-title)', color: '#ffffff' }}>
                PHÒNG CHỜ THI ĐẤU (REAL-TIME)
              </h2>
              <p style={{ color: '#cbd5e1', fontSize: '0.92rem' }}>
                Đang kết nối: <strong style={{ color: '#00f0ff' }}>{leaderboard.length} Đấu thủ Linh Vật</strong>. Đang đợi Host khởi tranh!
              </p>
            </div>

            {/* Player Roster Grid with Animal Mascots */}
            <div className="premium-card" style={{
              backgroundColor: 'rgba(15, 20, 35, 0.85)',
              border: '1px solid rgba(0, 240, 255, 0.25)',
              borderRadius: '12px',
              padding: '25px',
              marginBottom: '35px'
            }}>
              <h3 style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '18px', fontFamily: 'var(--font-title)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={20} color="#00f0ff" /> Danh Sách Đấu Thủ Trong Phòng ({leaderboard.length})
              </h3>

              {leaderboard.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px 10px', color: '#64748b', fontSize: '0.9rem' }}>
                  <Users size={32} color="#64748b" style={{ marginBottom: '8px' }} /><br/>
                  Chưa có sinh viên nào tham gia. Đang chờ người chơi nhập mã phòng <strong>{roomCode}</strong>...
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                  {leaderboard.map((p, idx) => {
                    const isMe = p.name === playerName.trim();
                    return (
                      <div key={idx} style={{
                        padding: '12px 16px',
                        borderRadius: '10px',
                        backgroundColor: isMe ? 'rgba(0, 255, 136, 0.15)' : 'rgba(9, 10, 15, 0.6)',
                        border: isMe ? '1.5px solid #00ff88' : '1px solid rgba(0, 240, 255, 0.15)',
                        color: isMe ? '#00ff88' : '#ffffff',
                        fontWeight: 'bold',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        animation: 'fadeIn 0.3s ease-out'
                      }}>
                        <span style={{ fontSize: '1.6rem' }}>{p.avatar || '🦊'}</span>
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          <span style={{ display: 'block', fontSize: '0.92rem' }}>{p.name} {isMe && '(Bạn)'}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Host Action */}
            {isHost && (
              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={handleStartGame}
                  style={{
                    padding: '16px 45px',
                    fontSize: '1.1rem',
                    backgroundColor: '#00f0ff',
                    color: '#090a0f',
                    border: 'none',
                    borderRadius: '30px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '0 0 25px rgba(0, 240, 255, 0.4)'
                  }}
                >
                  🚀 BẮT ĐẦU TRẬN ĐẤU CÁ NHÂN
                </button>
              </div>
            )}
          </div>
        )}

        {/* Screen 3: IN-GAME INDIVIDUAL WORD SEARCH */}
        {gameState === 'PLAYING' && (
          <div>
            {/* Top Stats Banner */}
            <div className="premium-card" style={{
              backgroundColor: 'rgba(15, 20, 35, 0.85)',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              borderRadius: '12px',
              padding: '14px 20px',
              marginBottom: '25px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '15px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '1.3rem' }}>{selectedMascot.emoji}</span>
                  <span style={{ fontSize: '0.88rem', color: '#cbd5e1' }}>Điểm cá nhân:</span>
                  <strong style={{ fontSize: '1.2rem', color: '#ffd700' }}>{score}đ</strong>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Zap size={20} color={timer < 60 ? '#ff4444' : '#00f0ff'} />
                  <span style={{ fontSize: '0.88rem', color: '#cbd5e1' }}>Thời gian còn lại:</span>
                  <strong style={{ 
                    fontSize: '1.1rem', 
                    color: timer < 60 ? '#ff4444' : '#00f0ff', 
                    fontFamily: 'monospace',
                    animation: timer < 60 ? 'pulse 1s infinite alternate' : 'none'
                  }}>
                    {formatTime(timer)}
                  </strong>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '0.85rem', color: '#00ff88', fontWeight: 'bold' }}>
                  Tiến độ: {targetWords.filter(w => w.found).length} / {targetWords.length} từ
                </span>
                <button onClick={handleUseHint} disabled={hintsLeft <= 0} style={{ padding: '6px 12px', fontSize: '0.78rem', backgroundColor: 'rgba(255, 215, 0, 0.15)', border: '1px solid #ffd700', color: '#ffd700', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                  <Lightbulb size={14} style={{ display: 'inline', marginRight: '4px' }} /> Gợi ý ({hintsLeft})
                </button>
              </div>
            </div>

            {/* Word Search Grid & Individual Leaderboard */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 340px', gap: '30px', alignItems: 'start' }}>
              
              {/* Grid */}
              <div className="premium-card" style={{
                backgroundColor: 'rgba(15, 20, 35, 0.85)',
                border: '1px solid rgba(0, 240, 255, 0.3)',
                borderRadius: '14px',
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                  gap: '4px',
                  maxWidth: '620px',
                  width: '100%',
                  aspectRatio: '1/1',
                  touchAction: 'none'
                }}>
                  {grid.map((row, r) =>
                    row.map((char, c) => {
                      const selected = isCellSelected(r, c);
                      const foundColor = getCellFoundColor(r, c);
                      const isHinted = hintedPos && hintedPos.r === r && hintedPos.c === c;

                      return (
                        <div
                          key={`${r}-${c}`}
                          onMouseDown={() => handleCellMouseDown(r, c)}
                          onMouseEnter={() => handleCellMouseEnter(r, c)}
                          onTouchStart={() => handleCellMouseDown(r, c)}
                          data-r={r}
                          data-c={c}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: '0.92rem',
                            fontFamily: 'monospace',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            userSelect: 'none',
                            backgroundColor: selected 
                              ? '#00f0ff' 
                              : foundColor 
                              ? foundColor 
                              : isHinted
                              ? '#ffd700'
                              : 'rgba(9, 10, 15, 0.8)',
                            color: selected || foundColor || isHinted ? '#090a0f' : '#ffffff',
                            border: selected ? '2px solid #ffffff' : foundColor ? `1px solid ${foundColor}` : '1px solid rgba(0, 240, 255, 0.12)'
                          }}
                        >
                          {char}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Sidebar: Individual Leaderboard & Word Checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* Real-Time Individual Leaderboard */}
                <div className="premium-card" style={{
                  backgroundColor: 'rgba(15, 20, 35, 0.85)',
                  border: '1px solid rgba(0, 240, 255, 0.3)',
                  borderRadius: '14px',
                  padding: '20px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', borderBottom: '1px solid rgba(0, 240, 255, 0.2)', paddingBottom: '8px' }}>
                    <Trophy size={18} color="#ffd700" />
                    <h3 style={{ fontSize: '1.05rem', color: '#ffffff', margin: 0, fontFamily: 'var(--font-title)' }}>
                      BẢNG XẾP HẠNG TRỰC TIẾP
                    </h3>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '180px', overflowY: 'auto' }}>
                    {leaderboard.map((p, idx) => {
                      const isMe = p.name === playerName.trim();
                      return (
                        <div key={idx} style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '6px 10px',
                          borderRadius: '6px',
                          backgroundColor: isMe ? 'rgba(0, 255, 136, 0.15)' : 'rgba(9, 10, 15, 0.6)',
                          border: isMe ? '1px solid #00ff88' : '1px solid rgba(255,255,255,0.05)',
                          fontSize: '0.82rem'
                        }}>
                          <span style={{ fontWeight: isMe ? 'bold' : 'normal', color: isMe ? '#00ff88' : '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span>{p.avatar || '🦊'}</span> #{idx + 1} {p.name} {isMe && '(Bạn)'}
                          </span>
                          <strong style={{ color: '#ffd700' }}>{p.score}đ ({p.foundCount || 0}/10)</strong>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Word Checklist */}
                <div className="premium-card" style={{
                  backgroundColor: 'rgba(15, 20, 35, 0.85)',
                  border: '1px solid rgba(0, 240, 255, 0.3)',
                  borderRadius: '14px',
                  padding: '20px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', borderBottom: '1px solid rgba(0, 240, 255, 0.2)', paddingBottom: '8px' }}>
                    <BookOpen size={18} color="#00f0ff" />
                    <h3 style={{ fontSize: '1.05rem', color: '#ffffff', margin: 0, fontFamily: 'var(--font-title)' }}>
                      TỪ KHÓA CẦN TÌM
                    </h3>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '220px', overflowY: 'auto' }}>
                    {targetWords.map((wObj, idx) => (
                      <div key={idx} onClick={() => wObj.found && setActiveDefinition(wObj)} style={{
                        padding: '8px 12px', borderRadius: '6px', backgroundColor: wObj.found ? 'rgba(0, 255, 136, 0.08)' : 'rgba(9, 10, 15, 0.6)', border: wObj.found ? `1px solid ${wObj.color}` : '1px solid rgba(0, 240, 255, 0.1)', cursor: wObj.found ? 'pointer' : 'default', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                      }}>
                        <span style={{ fontWeight: 'bold', fontSize: '0.85rem', textDecoration: wObj.found ? 'line-through' : 'none', color: wObj.found ? '#cbd5e1' : '#ffffff' }}>
                          {wObj.display}
                        </span>
                        {wObj.found && <span style={{ fontSize: '0.72rem', color: wObj.color, fontWeight: 'bold' }}>Đã tìm thấy</span>}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* Screen 4: FINISHED VICTORY PODIUM */}
        {gameState === 'FINISHED' && (
          <div style={{ maxWidth: '650px', margin: '40px auto', textAlign: 'center' }}>
            <div className="premium-card" style={{
              backgroundColor: 'rgba(15, 20, 35, 0.9)', border: '2px solid #ffd700', borderRadius: '16px', padding: '40px 30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px'
            }}>
              <Trophy size={65} color="#ffd700" style={{ animation: 'pulse 1s infinite alternate' }} />
              <div>
                <span style={{ color: '#00f0ff', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '2px' }}>KẾT THÚC TRẬN ĐẤU</span>
                <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-title)', color: '#ffffff', marginTop: '5px' }}>
                  BẢNG XẾP HẠNG VÔ ĐỊCH
                </h2>
              </div>

              {leaderboard.length > 0 && (
                <div style={{ backgroundColor: 'rgba(9, 10, 15, 0.8)', border: '1px solid rgba(255,215,0,0.4)', padding: '20px 35px', borderRadius: '12px' }}>
                  <Crown size={35} color="#ffd700" style={{ marginBottom: '5px' }} />
                  <div style={{ fontSize: '2.5rem', marginBottom: '4px' }}>{leaderboard[0]?.avatar || '🦊'}</div>
                  <strong style={{ fontSize: '1.8rem', color: '#ffd700', fontFamily: 'var(--font-title)', display: 'block' }}>
                    #1 {leaderboard[0]?.name}
                  </strong>
                  <span style={{ fontSize: '1.1rem', color: '#00f0ff', fontWeight: 'bold' }}>
                    {leaderboard[0]?.score} điểm ({leaderboard[0]?.foundCount}/10 từ)
                  </span>
                </div>
              )}

              <button onClick={resetToRoleSelection} style={{ padding: '14px 35px', backgroundColor: '#00f0ff', color: '#090a0f', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                Trở Về Màn Hình Chính
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Modal Tooltip: Educational Definition */}
      {activeDefinition && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(5, 8, 18, 0.85)', backdropFilter: 'blur(6px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setActiveDefinition(null)}>
          <div onClick={(e) => e.stopPropagation()} style={{ backgroundColor: 'rgba(15, 20, 35, 0.95)', border: `2px solid ${activeDefinition.color || '#00f0ff'}`, borderRadius: '14px', padding: '28px', maxWidth: '550px', width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-title)', color: '#ffffff', margin: 0 }}>{activeDefinition.display}</h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>{activeDefinition.definition}</p>
            <button onClick={() => setActiveDefinition(null)} style={{ padding: '10px 24px', backgroundColor: activeDefinition.color || '#00f0ff', color: '#090a0f', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', alignSelf: 'flex-end' }}>Đã hiểu</button>
          </div>
        </div>
      )}

      {/* Modal Rule Guide */}
      {showRuleModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(5, 8, 18, 0.88)', backdropFilter: 'blur(6px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setShowRuleModal(false)}>
          <div onClick={(e) => e.stopPropagation()} style={{ backgroundColor: 'rgba(15, 20, 35, 0.95)', border: '1px solid rgba(0, 240, 255, 0.4)', borderRadius: '14px', padding: '28px', maxWidth: '600px', width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '1.3rem', color: '#ffffff', margin: 0, fontFamily: 'var(--font-title)' }}>HƯỚNG DẪN THI ĐẤU CÁ NHÂN</h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.6' }}>
              - Chọn <strong>Linh Vật Động Vật</strong> đại diện cho phong cách thi đấu của bạn.<br/>
              - Mỗi đấu thủ tự giải ma trận ô chữ của mình để tích lũy điểm số cá nhân.<br/>
              - Mỗi khi tìm thấy 1 từ đúng, bạn nhận <strong>+120 điểm</strong> và cập nhật vị trí trên Bảng xếp hạng trực tiếp của cả phòng.<br/>
              - Đấu thủ hoàn thành đủ 10 từ nhanh nhất sẽ đạt danh hiệu Vô Địch!
            </p>
            <button onClick={() => setShowRuleModal(false)} style={{ padding: '10px 24px', backgroundColor: '#00f0ff', color: '#090a0f', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', alignSelf: 'center' }}>Bắt Đầu Ngay</button>
          </div>
        </div>
      )}
    </section>
  );
}
