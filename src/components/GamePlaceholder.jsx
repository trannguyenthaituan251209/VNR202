import React, { useState, useEffect, useRef } from 'react';
import { Play, Users, Trophy, UserCheck, ArrowRight, ArrowLeft, Skull, Zap, MessageSquare, Send, Globe, Radio } from 'lucide-react';
import { DongSonStar } from './VietnameseMotifs';

const QUESTIONS = [
  // Phase 1 & 2: Chaos & Branch Battle Questions (Continuous Loop)
  {
    id: 1,
    text: "Theo Luật Phòng, chống tham nhũng hiện hành, hành vi tham nhũng được chia làm mấy nhóm chính?",
    options: [
      { key: "A", text: "Chỉ 1 nhóm duy nhất trong khu vực Nhà nước." },
      { key: "B", text: "2 nhóm: Trong khu vực nhà nước và Ngoài khu vực nhà nước." },
      { key: "C", text: "3 nhóm: Hành chính, Hình sự và Kinh tế." },
      { key: "D", text: "4 nhóm tương ứng với các cơ quan hành pháp." }
    ],
    correctKey: "B"
  },
  {
    id: 2,
    text: "Bản chất pháp lý cốt lõi phân biệt tội tham nhũng với tội trộm cắp thông thường là gì?",
    options: [
      { key: "A", text: "Giá trị tài sản bị thất thoát lớn hơn." },
      { key: "B", text: "Chủ thể lợi dụng chức vụ, quyền hạn được giao để vụ lợi." },
      { key: "C", text: "Hành vi được thực hiện vào ban ngày tại công sở." },
      { key: "D", text: "Có sự đồng thuận của nhiều bên liên quan." }
    ],
    correctKey: "B"
  },
  {
    id: 3,
    text: "Ai là người phải chịu trách nhiệm chính khi để xảy ra tham nhũng trong cơ quan, tổ chức?",
    options: [
      { key: "A", text: "Người đứng đầu cơ quan, tổ chức đó." },
      { key: "B", text: "Nhân viên trực tiếp ký tá hồ sơ kế toán." },
      { key: "C", text: "Cơ quan thanh tra cấp trên trực tiếp quản lý." },
      { key: "D", text: "Toàn bộ tập thể cán bộ công chức cùng chia đều trách nhiệm." }
    ],
    correctKey: "A"
  },
  {
    id: 4,
    text: "Cơ quan nào có thẩm quyền cao nhất giám sát tối cao công tác phòng chống tham nhũng toàn quốc?",
    options: [
      { key: "A", text: "Thanh tra Chính phủ." },
      { key: "B", text: "Viện kiểm sát nhân dân tối cao." },
      { key: "C", text: "Quốc hội nước Cộng hòa Xã hội Chủ nghĩa Việt Nam." },
      { key: "D", text: "Bộ Công an." }
    ],
    correctKey: "C"
  },
  {
    id: 5,
    text: "Trong các nguyên nhân khách quan, kẽ hở pháp luật nào thường bị tội phạm tham nhũng lợi dụng?",
    options: [
      { key: "A", text: "Luật pháp quy định mức án quá nặng." },
      { key: "B", text: "Hệ thống pháp luật còn chồng chéo, mâu thuẫn, chậm sửa đổi bổ sung." },
      { key: "C", text: "Quy trình thanh tra tài chính quá rườm rà." },
      { key: "D", text: "Không có quy định bảo vệ tài sản công." }
    ],
    correctKey: "B"
  },
  {
    id: 6,
    text: "Hành vi nào dưới đây KHÔNG thuộc nhóm hành vi tham nhũng trong khu vực doanh nghiệp tư nhân?",
    options: [
      { key: "A", text: "Thủ kho công ty tư nhân lấy trộm hàng hóa mang đi bán cá nhân." },
      { key: "B", text: "Nhận hối lộ để ưu tiên ký kết hợp đồng thầu phụ yếu kém." },
      { key: "C", text: "Đưa hối lộ cho đối tác để giành quyền lợi trái luật." },
      { key: "D", text: "Tham ô quỹ đầu tư của các cổ đông công ty đại chúng." }
    ],
    correctKey: "A"
  },
  // Phase 3: Team Duo Questions
  {
    id: 7,
    text: "Team Battle: Luật Phòng, chống tham nhũng Việt Nam hiện hành (năm 2018) có hiệu lực thi hành từ ngày nào?",
    options: [
      { key: "A", text: "Ngày 01/01/2019" },
      { key: "B", text: "Ngày 01/07/2019" },
      { key: "C", text: "Ngày 01/01/2020" },
      { key: "D", text: "Ngày 02/09/2019" }
    ],
    correctKey: "B"
  },
  {
    id: 8,
    text: "Team Battle: Công ước của Liên Hợp Quốc về chống tham nhũng mà Việt Nam tham gia ký kết có tên viết tắt là gì?",
    options: [
      { key: "A", text: "UNCAC" },
      { key: "B", text: "UNODC" },
      { key: "C", text: "UNICEF" },
      { key: "D", text: "UNESCO" }
    ],
    correctKey: "A"
  },
  {
    id: 9,
    text: "Team Battle: Tác hại về mặt xã hội nguy hiểm nhất mà tham nhũng gây ra cho cộng đồng là gì?",
    options: [
      { key: "A", text: "Làm chậm tiến trình xây dựng hạ tầng kỹ thuật." },
      { key: "B", text: "Băng hoại giá trị đạo đức truyền thống và chuẩn mực đạo lý xã hội." },
      { key: "C", text: "Làm gia tăng tỷ lệ lạm phát tiền tệ." },
      { key: "D", text: "Gây cản trở giao thương quốc tế." }
    ],
    correctKey: "B"
  },
  // Phase 4: Grand Finale 1v1 Questions
  {
    id: 10,
    text: "Chung Kết 1v1: Chỉ thị số 10/CT-TTg của Thủ tướng Chính phủ quy định nội dung gì nổi bật trong giáo dục?",
    options: [
      { key: "A", text: "Miễn học phí cho sinh viên ngành Luật." },
      { key: "B", text: "Đưa nội dung phòng chống tham nhũng vào giảng dạy tại các cơ sở GD&ĐT từ năm học 2013-2014." },
      { key: "C", text: "Bắt buộc thi tốt nghiệp môn VNR202." },
      { key: "D", text: "Tổ chức tuần lễ liêm chính học đường hàng năm." }
    ],
    correctKey: "B"
  },
  {
    id: 11,
    text: "Chung Kết 1v1: Nhận hối lộ gián tiếp qua người trung gian hoặc nhận lợi ích phi vật chất có bị xử lý hình sự tội Nhận hối lộ không?",
    options: [
      { key: "A", text: "Không, chỉ bị phạt hành chính và kỷ luật đảng." },
      { key: "B", text: "Có, bị xử lý hình sự tương tự như nhận trực tiếp." },
      { key: "C", text: "Chỉ xử lý khi giá trị tài sản quy đổi trên 1 tỷ đồng." },
      { key: "D", text: "Không quy định cụ thể trong Bộ luật Hình sự." }
    ],
    correctKey: "B"
  },
  {
    id: 12,
    text: "Chung Kết 1v1: Trụ cột cốt lõi nhất để sinh viên xây dựng văn hóa phòng chống tham nhũng học đường là gì?",
    options: [
      { key: "A", text: "Nghiên cứu sâu các văn bản pháp luật của Nhà nước." },
      { key: "B", text: "Giữ vững tính liêm chính học thuật (không gian lận thi cử, không đạo văn)." },
      { key: "C", text: "Tham gia các kỳ thi tìm hiểu pháp luật trực tuyến." },
      { key: "D", text: "Thành lập ban thanh tra sinh viên tự quản." }
    ],
    correctKey: "B"
  }
];

const BOT_NAMES = [
  "Nam Anh", "Bích Phương", "Gia Huy", "Minh Tuấn", "Thanh Hằng", 
  "Quốc Bảo", "Xuân Trường", "Mai Chi", "Hữu Đạt", "Thu Trang", 
  "Khánh Linh", "Duy Anh", "Hải Yến", "Việt Hoàng", "Quỳnh Anh", 
  "Tấn Phát", "Hoài An", "Ngọc Bích", "Văn Đức"
];

const CHAT_BOT_PHRASES = [
  "Câu này chắc chắn là B bạn ơi, tôi đọc tài liệu rồi!",
  "Tôi nghĩ đáp án là C, bạn đồng ý không?",
  "Đáp án đúng là B đó, chọn đi nào!",
  "Câu này dễ, chắc chắn A rồi bạn!",
  "Đồng đội ơi, mình phối hợp chọn C nhé!",
  "Để tôi chọn B cho chắc cú nha!"
];

export default function GamePlaceholder() {
  const [gameState, setGameState] = useState('ROLE_SELECTION');
  const [gameMode, setGameMode] = useState('OFFLINE'); 
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [players, setPlayers] = useState([]);
  
  const [chaosQuestionIdx, setChaosQuestionIdx] = useState(0); 
  const [teamQuestionIdx, setTeamQuestionIdx] = useState(0); 
  const [finaleQuestionIdx, setFinaleQuestionIdx] = useState(0); 
  const [timer, setTimer] = useState(45);
  
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [tempSelectedAnswer, setTempSelectedAnswer] = useState(null);
  const [answeredInRound, setAnsweredInRound] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [pointsGained, setPointsGained] = useState(0);
  const [isCorrectAns, setIsCorrectAns] = useState(false);
  const [activeBranch, setActiveBranch] = useState('WINNERS'); 
  
  const [teams, setTeams] = useState([]); 
  const [myTeamId, setMyTeamId] = useState(null);
  const [myTeammate, setMyTeammate] = useState(null);
  const [winningTeamName, setWinningTeamName] = useState('');
  const [finalists, setFinalists] = useState([]);

  const [chatMessages, setChatMessages] = useState([]); 
  const [chatInput, setChatInput] = useState('');
  const [classChats, setClassChats] = useState([]); 

  const [leaderboard, setLeaderboard] = useState([]);
  const [midpointIndex, setMidpointIndex] = useState(10);
  const [isHost, setIsHost] = useState(false);
  const [connectionError, setConnectionError] = useState('');
  
  const socketRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const simulationIntervalRef = useRef(null);
  const chatContainerRef = useRef(null);
  const hostChatContainerRef = useRef(null);

  useEffect(() => {
    return () => {
      clearInterval(timerIntervalRef.current);
      clearInterval(simulationIntervalRef.current);
      if (socketRef.current) socketRef.current.close();
    };
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  useEffect(() => {
    if (hostChatContainerRef.current) {
      hostChatContainerRef.current.scrollTop = hostChatContainerRef.current.scrollHeight;
    }
  }, [classChats]);

  useEffect(() => {
    if (gameState === 'CHAOS_ROUND' || gameState === 'BRANCH_BATTLE' || gameState === 'TEAM_DUO_ROUND' || gameState === 'GRAND_FINALE') {
      clearInterval(timerIntervalRef.current);
      let initTime = 15;
      if (gameState === 'CHAOS_ROUND' || gameState === 'BRANCH_BATTLE' || gameState === 'TEAM_DUO_ROUND') {
        initTime = 45;
      } else {
        initTime = 15;
      }
      setTimer(initTime);
      
      timerIntervalRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current);
            handleTimeExpired();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerIntervalRef.current);
  }, [gameState, teamQuestionIdx, finaleQuestionIdx]);

  const handleTimeExpired = () => {
    if (isHost) {
      if (gameState === 'CHAOS_ROUND') {
        handleSplitBrackets();
      } else if (gameState === 'BRANCH_BATTLE') {
        handleProcessBranchBattle();
      } else if (gameState === 'TEAM_DUO_ROUND') {
        if (teamQuestionIdx < 2) {
          handleNextTeamQuestion();
        } else {
          handleFinishTeamDuo();
        }
      } else if (gameState === 'GRAND_FINALE') {
        if (finaleQuestionIdx < 2) {
          handleNextFinaleQuestion();
        } else {
          handleFinishGame();
        }
      }
    } else {
      if (!hasAnswered) {
        setHasAnswered(true);
        setSelectedAnswer(null);
        setIsCorrectAns(false);
        setPointsGained(0);
      }
    }
  };

  const connectWebSocket = (onOpenCallback) => {
    try {
      setConnectionError('Đang kết nối tới máy chủ...');
      const host = window.location.hostname || 'localhost';
      const wsUrl = `ws://${host}:8080`;
      const ws = new WebSocket(wsUrl);
      socketRef.current = ws;

      ws.onopen = () => {
        setConnectionError('');
        if (onOpenCallback) onOpenCallback(ws);
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        handleServerMessage(data);
      };

      ws.onerror = () => {
        setConnectionError('Không kết nối được tới máy chủ WebSocket.');
      };
    } catch (e) {
      setConnectionError('Lỗi kết nối WebSocket!');
    }
  };

  const handleServerMessage = (data) => {
    switch (data.type) {
      case 'ROOM_CREATED':
        setRoomCode(data.roomCode);
        setGameState('HOST_LOBBY');
        break;

      case 'PLAYERS_LIST':
        setPlayers(data.players.map(name => ({ name, score: 0, activeBranch: 'WINNERS' })));
        break;

      case 'JOINED_SUCCESS':
        setRoomCode(data.roomCode);
        setGameState('PLAYER_LOBBY');
        break;

      case 'SUBMISSION_STATUS':
        if (data.leaderboard) {
          setLeaderboard(data.leaderboard);
        }
        break;

      case 'GAME_STARTED':
        setChaosQuestionIdx(0);
        setSelectedAnswer(null);
        setTempSelectedAnswer(null);
        setHasAnswered(false);
        setAnsweredInRound(0);
        if (data.phase === 'CHAOS') {
          setScore(0);
          setGameState('CHAOS_ROUND');
        } else if (data.phase === 'BRANCH_BATTLE') {
          setGameState('BRANCH_BATTLE');
        }
        break;

      case 'ANSWER_RESULT':
        setIsCorrectAns(data.isCorrect);
        setPointsGained(data.pointsGained);
        setScore(data.totalScore);
        break;

      case 'BRACKETS_UPDATED':
        setLeaderboard(data.leaderboard);
        setMidpointIndex(data.midpointIndex);
        setGameState('BRACKET_SPLIT');
        
        const myStatus = data.leaderboard.find(p => p.name === playerName);
        if (myStatus) {
          setActiveBranch(myStatus.activeBranch);
        }
        break;

      case 'TEAMS_CREATED':
        setTeams(data.teams);
        setLeaderboard(data.leaderboard);
        setGameState('TEAM_LOBBY');

        const statusInTeams = data.leaderboard.find(p => p.name === playerName);
        if (statusInTeams) {
          setActiveBranch(statusInTeams.activeBranch);
        } else {
          setActiveBranch('ELIMINATED');
        }

        const myTeam = data.teams.find(t => t.p1 === playerName || t.p2 === playerName);
        if (myTeam) {
          setMyTeamId(myTeam.id);
          setMyTeammate(myTeam.p1 === playerName ? myTeam.p2 : myTeam.p1);
          setScore(myTeam.score);
        } else {
          setMyTeamId(null);
          setMyTeammate(null);
        }
        break;

      case 'TEAM_DUO_STARTED':
        setTeamQuestionIdx(0);
        setSelectedAnswer(null);
        setTempSelectedAnswer(null);
        setHasAnswered(false);
        setChatMessages([]);
        setGameState('TEAM_DUO_ROUND');
        break;

      case 'TEAM_CHAT_RECEIVED':
        setChatMessages(prev => [...prev, { sender: data.sender, text: data.text }]);
        break;

      case 'CLASS_CHAT_EVENT':
        setClassChats(prev => [...prev, { teamName: data.teamName, sender: data.sender, text: data.text }]);
        break;

      case 'TEAM_SCORE_UPDATE':
        setTeams(prev => prev.map(t => t.id === data.teamId ? { ...t, score: data.score } : t));
        const activeT = myTeamId === data.teamId;
        if (activeT) {
          setScore(data.score);
        }
        break;

      case 'NEW_QUESTION':
        if (data.questionIndex >= 6 && data.questionIndex <= 8) {
          setTeamQuestionIdx(data.questionIndex - 6);
        } else if (data.questionIndex >= 9 && data.questionIndex <= 11) {
          setFinaleQuestionIdx(data.questionIndex - 9);
        }
        setSelectedAnswer(null);
        setTempSelectedAnswer(null);
        setHasAnswered(false);
        break;

      case 'FINALE_ROSTER_READY':
        setLeaderboard(data.leaderboard);
        setWinningTeamName(data.winningTeamName);
        setFinalists(data.finalists);
        setGameState('FINALE_LOBBY');

        const endStatus = data.leaderboard.find(p => p.name === playerName);
        if (endStatus) {
          setActiveBranch(endStatus.activeBranch);
          setScore(endStatus.score);
        }
        break;

      case 'FINALE_STARTED':
        setFinaleQuestionIdx(0);
        setSelectedAnswer(null);
        setTempSelectedAnswer(null);
        setHasAnswered(false);
        setGameState('GRAND_FINALE');
        break;

      case 'GAME_FINISHED':
        setLeaderboard(data.finalScores);
        setGameState('FINAL_LEADERBOARD');
        break;

      case 'HOST_DISCONNECTED':
        alert('Host đã rời phòng đấu! Trận đấu kết thúc.');
        resetToRoleSelection();
        break;
    }
  };

  const handleHostCreateRoom = () => {
    setIsHost(true);
    if (gameMode === 'OFFLINE') {
      const code = `Sim-${Math.floor(1000 + Math.random() * 9000)}`;
      setRoomCode(code);
      setGameState('HOST_LOBBY');
      
      let botsCount = 0;
      setPlayers([]);
      clearInterval(simulationIntervalRef.current);
      simulationIntervalRef.current = setInterval(() => {
        if (botsCount < 19) {
          const newBot = BOT_NAMES[botsCount];
          setPlayers((prev) => [...prev, { name: newBot, score: 0, activeBranch: 'WINNERS' }]);
          botsCount++;
        } else {
          clearInterval(simulationIntervalRef.current);
        }
      }, 200);
    } else {
      connectWebSocket((ws) => {
        ws.send(JSON.stringify({ type: 'CREATE_ROOM' }));
      });
    }
  };

  const handlePlayerJoinRoom = () => {
    if (!playerName.trim() || !roomCode.trim()) {
      alert('Vui lòng điền đủ Tên và Mã phòng chơi!');
      return;
    }
    setIsHost(false);
    if (gameMode === 'OFFLINE') {
      alert('Chế độ Giả lập chỉ dùng cho Host.');
    } else {
      connectWebSocket((ws) => {
        ws.send(JSON.stringify({ type: 'JOIN_ROOM', roomCode, playerName }));
      });
    }
  };

  const handleStartChaosRound = () => {
    if (gameMode === 'OFFLINE') {
      setLeaderboard(players.map(p => ({ ...p, score: 0, answeredCount: 0 })));
      setGameState('CHAOS_ROUND');
      setChaosQuestionIdx(0);
      startOfflineChaosBotsSimulation();
    } else {
      if (socketRef.current) socketRef.current.send(JSON.stringify({ type: 'START_CHAOS' }));
    }
  };

  const handleSplitBrackets = () => {
    if (gameMode === 'OFFLINE') {
      const sorted = [...leaderboard].sort((a, b) => b.score - a.score);
      const mid = 10;
      sorted.forEach((p, idx) => {
        p.activeBranch = idx < mid ? 'WINNERS' : 'LOSERS';
      });
      setLeaderboard(sorted);
      setMidpointIndex(mid);
      setGameState('BRACKET_SPLIT');
    } else {
      if (socketRef.current) socketRef.current.send(JSON.stringify({ type: 'SPLIT_BRACKETS' }));
    }
  };

  const handleStartBranchBattle = () => {
    if (gameMode === 'OFFLINE') {
      setGameState('BRANCH_BATTLE');
      setChaosQuestionIdx(0);
      startOfflineBranchBattleSimulation();
    } else {
      if (socketRef.current) socketRef.current.send(JSON.stringify({ type: 'START_BRANCH_BATTLE' }));
    }
  };

  const handleProcessBranchBattle = () => {
    if (gameMode === 'OFFLINE') {
      const winners = leaderboard.filter(p => p.activeBranch === 'WINNERS');
      const losers = leaderboard.filter(p => p.activeBranch === 'LOSERS');
      winners.sort((a, b) => b.score - a.score);
      losers.sort((a, b) => b.score - a.score);

      const survivorsW = winners.slice(0, 4);
      const survivorsL = losers.slice(0, 2);
      const survivorsNames = [...survivorsW, ...survivorsL].map(p => p.name);

      const updated = leaderboard.map((p) => {
        if (survivorsNames.includes(p.name)) {
          return p;
        } else {
          return { ...p, activeBranch: 'ELIMINATED' };
        }
      });

      const teamSetup = [
        { id: 'TEAM_1', name: 'Đội Sao Lạc', p1: survivorsW[0]?.name, p2: survivorsL[1]?.name, score: 0 },
        { id: 'TEAM_2', name: 'Đội Trống Đồng', p1: survivorsW[1]?.name, p2: survivorsL[0]?.name, score: 0 },
        { id: 'TEAM_3', name: 'Đội Liêm Chính', p1: survivorsW[2]?.name, p2: survivorsW[3]?.name, score: 0 }
      ];

      setTeams(teamSetup);
      setLeaderboard(updated);
      setGameState('TEAM_LOBBY');
    } else {
      if (socketRef.current) socketRef.current.send(JSON.stringify({ type: 'PROCESS_BRANCH_BATTLE' }));
    }
  };

  const handleStartTeamDuoRound = () => {
    if (gameMode === 'OFFLINE') {
      setTeamQuestionIdx(0);
      setGameState('TEAM_DUO_ROUND');
      setChatMessages([]);
      setClassChats([]);
      startOfflineTeamBotsSimulation();
    } else {
      if (socketRef.current) socketRef.current.send(JSON.stringify({ type: 'START_TEAM_DUO' }));
    }
  };

  const handleNextTeamQuestion = () => {
    const nextIdx = teamQuestionIdx + 1;
    if (gameMode === 'OFFLINE') {
      setTeamQuestionIdx(nextIdx);
      setGameState('TEAM_DUO_ROUND');
      startOfflineTeamBotsSimulation();
    } else {
      if (socketRef.current) {
        socketRef.current.send(JSON.stringify({ type: 'NEXT_QUESTION', questionIndex: 6 + nextIdx }));
      }
    }
  };

  const handleFinishTeamDuo = () => {
    if (gameMode === 'OFFLINE') {
      const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
      const winningT = sortedTeams[0];
      setWinningTeamName(winningT.name);
      setFinalists([winningT.p1, winningT.p2]);

      const updated = leaderboard.map((p) => {
        if ([winningT.p1, winningT.p2].includes(p.name)) {
          return { ...p, activeBranch: 'WINNERS', score: winningT.score }; 
        } else {
          return { ...p, activeBranch: 'ELIMINATED' };
        }
      });

      setLeaderboard(updated);
      setGameState('FINALE_LOBBY');
    } else {
      if (socketRef.current) socketRef.current.send(JSON.stringify({ type: 'FINISH_TEAM_DUO' }));
    }
  };

  const handleStartFinaleRound = () => {
    if (gameMode === 'OFFLINE') {
      setFinaleQuestionIdx(0);
      setGameState('GRAND_FINALE');
      startOfflineFinaleBotsSimulation();
    } else {
      if (socketRef.current) socketRef.current.send(JSON.stringify({ type: 'START_FINALE' }));
    }
  };

  const handleNextFinaleQuestion = () => {
    const nextIdx = finaleQuestionIdx + 1;
    if (gameMode === 'OFFLINE') {
      setFinaleQuestionIdx(nextIdx);
      setGameState('GRAND_FINALE');
      startOfflineFinaleBotsSimulation();
    } else {
      if (socketRef.current) {
        socketRef.current.send(JSON.stringify({ type: 'NEXT_QUESTION', questionIndex: 9 + nextIdx }));
      }
    }
  };

  const handleFinishGame = () => {
    if (gameMode === 'OFFLINE') {
      setGameState('FINAL_LEADERBOARD');
    } else {
      if (socketRef.current) {
        socketRef.current.send(JSON.stringify({ type: 'FINISH_GAME' }));
      }
    }
  };

  const handlePlayerSubmitDuoAnswer = (key) => {
    if (hasAnswered) return;
    setTempSelectedAnswer(key);
  };

  const handleConfirmDuoAnswer = () => {
    if (!tempSelectedAnswer || hasAnswered) return;
    setHasAnswered(true);
    setSelectedAnswer(tempSelectedAnswer);

    const correctKey = activeQuestion.correctKey;
    const isCorrect = tempSelectedAnswer === correctKey;
    setIsCorrectAns(isCorrect);
    
    // For Vòng 3 (Team), points are +150 / -100
    const points = isCorrect ? 150 : -100;
    
    if (gameMode === 'ONLINE') {
      if (socketRef.current) {
        socketRef.current.send(JSON.stringify({ 
          type: 'SUBMIT_ANSWER', 
          isCorrect, 
          timeRemaining: timer
        }));
      }
    }
    setTempSelectedAnswer(null);
  };

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    setChatMessages(prev => [...prev, { sender: playerName, text: chatInput }]);
    
    if (gameMode === 'ONLINE') {
      if (socketRef.current) {
        socketRef.current.send(JSON.stringify({ 
          type: 'SEND_TEAM_CHAT', 
          text: chatInput 
        }));
      }
    } else {
      const botResponse = CHAT_BOT_PHRASES[Math.floor(Math.random() * CHAT_BOT_PHRASES.length)];
      setTimeout(() => {
        setChatMessages(prev => [...prev, { sender: myTeammate, text: botResponse }]);
      }, 1000 + Math.random() * 1500);
    }
    setChatInput('');
  };

  const startOfflineChaosBotsSimulation = () => {
    let startTime = Date.now();
    clearInterval(simulationIntervalRef.current);
    simulationIntervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      if (elapsed >= 45) {
        clearInterval(simulationIntervalRef.current);
        return;
      }
      setLeaderboard((prev) => {
        const updated = prev.map((p) => {
          if (Math.random() > 0.6) {
            const isCorrect = Math.random() > 0.35;
            const pts = isCorrect ? Math.round(100 + Math.random() * 50) : -50;
            const newS = p.score + pts;
            return { ...p, score: newS < 0 ? 0 : newS, answeredCount: p.answeredCount + 1 };
          }
          return p;
        });
        return updated.sort((a, b) => b.score - a.score);
      });
    }, 400);
  };

  const startOfflineBranchBattleSimulation = () => {
    let startTime = Date.now();
    clearInterval(simulationIntervalRef.current);
    simulationIntervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      if (elapsed >= 45) {
        clearInterval(simulationIntervalRef.current);
        return;
      }
      setLeaderboard((prev) => {
        const updated = prev.map((p) => {
          if (p.activeBranch !== 'ELIMINATED' && Math.random() > 0.6) {
            const isCorrect = Math.random() > 0.3;
            const pts = isCorrect ? Math.round(100 + Math.random() * 50) : -50;
            const newS = p.score + pts;
            return { ...p, score: newS < 0 ? 0 : newS, answeredCount: p.answeredCount + 1 };
          }
          return p;
        });
        return updated.sort((a, b) => b.score - a.score);
      });
    }, 400);
  };

  const startOfflineTeamBotsSimulation = () => {
    clearInterval(simulationIntervalRef.current);
    let question = QUESTIONS[6 + teamQuestionIdx];

    simulationIntervalRef.current = setInterval(() => {
      if (Math.random() > 0.65 && teams.length > 0) {
        const selectedTeam = teams[Math.floor(Math.random() * teams.length)];
        const sender = Math.random() > 0.5 ? selectedTeam.p1 : selectedTeam.p2;
        const phrase = CHAT_BOT_PHRASES[Math.floor(Math.random() * CHAT_BOT_PHRASES.length)];
        
        if (sender) {
          setClassChats(prev => [...prev, { teamName: selectedTeam.name, sender, text: phrase }]);
        }
      }
    }, 2000);

    teams.forEach((t) => {
      const delay = 3000 + Math.random() * 9000;
      setTimeout(() => {
        setGameState((current) => {
          if (current === 'TEAM_DUO_ROUND') {
            const isCorrect = Math.random() > 0.35;
            const pts = isCorrect ? Math.round(150 + Math.random() * 50) : -100;
            
            setTeams(prev => prev.map(team => {
              if (team.id === t.id) {
                const nextScore = team.score + pts;
                return { ...team, score: nextScore < 0 ? 0 : nextScore };
              }
              return team;
            }));
          }
          return current;
        });
      }, delay);
    });
  };

  const startOfflineFinaleBotsSimulation = () => {
    clearInterval(simulationIntervalRef.current);
    
    leaderboard.forEach((bot) => {
      if (bot.activeBranch === 'WINNERS') {
        const delay = 1000 + Math.random() * 9000;
        setTimeout(() => {
          setGameState((current) => {
            if (current === 'GRAND_FINALE') {
              setLeaderboard((prev) => {
                const updated = prev.map((p) => {
                  if (p.name === bot.name) {
                    const isCorrect = Math.random() > 0.4;
                    const pts = isCorrect ? Math.round(200 + Math.random() * 100) : -100;
                    const nextS = p.score + pts;
                    return { ...p, score: nextS < 0 ? 0 : nextS };
                  }
                  return p;
                });
                return updated.sort((a, b) => b.score - a.score);
              });
            }
            return current;
          });
        }, delay);
      }
    });
  };

  const handlePlayerSubmitChaosAnswer = (key) => {
    setTempSelectedAnswer(key);
  };

  const handleConfirmChaosAnswer = () => {
    if (!tempSelectedAnswer) return;
    const correctKey = activeQuestion.correctKey;
    const isCorrect = tempSelectedAnswer === correctKey;
    let points = isCorrect ? 100 : -50;
    
    if (isCorrect) {
      points += Math.round((timer / 45) * 50);
    }
    
    const nextScore = score + points;
    setScore(nextScore < 0 ? 0 : nextScore);
    setPointsGained(points);
    setIsCorrectAns(isCorrect);
    
    if (gameMode === 'ONLINE' && socketRef.current) {
      socketRef.current.send(JSON.stringify({ 
        type: 'SUBMIT_ANSWER', 
        isCorrect, 
        timeRemaining: timer
      }));
    }

    const nextCount = answeredInRound + 1;
    setAnsweredInRound(nextCount);
    setTempSelectedAnswer(null);

    if (nextCount < 6) {
      const nextQIdx = (chaosQuestionIdx + 1) % 6; 
      setChaosQuestionIdx(nextQIdx);
    }
  };

  const handlePlayerSubmitFinaleAnswer = (key) => {
    if (hasAnswered) return;
    setTempSelectedAnswer(key);
  };

  const handleConfirmFinaleAnswer = () => {
    if (!tempSelectedAnswer || hasAnswered) return;
    setHasAnswered(true);
    setSelectedAnswer(tempSelectedAnswer);

    const correctKey = activeQuestion.correctKey;
    const isCorrect = tempSelectedAnswer === correctKey;
    setIsCorrectAns(isCorrect);
    
    const points = isCorrect ? 200 : -100;
    const nextScore = score + points;
    setScore(nextScore < 0 ? 0 : nextScore);
    setPointsGained(points);

    if (gameMode === 'ONLINE' && socketRef.current) {
      socketRef.current.send(JSON.stringify({ 
        type: 'SUBMIT_ANSWER', 
        isCorrect, 
        timeRemaining: timer
      }));
    }
    setTempSelectedAnswer(null);
  };

  const resetToRoleSelection = () => {
    clearInterval(timerIntervalRef.current);
    clearInterval(simulationIntervalRef.current);
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
    setGameState('ROLE_SELECTION');
    setPlayers([]);
    setRoomCode('');
    setScore(0);
    setHasAnswered(false);
    setSelectedAnswer(null);
    setTempSelectedAnswer(null);
    setAnsweredInRound(0);
    setConnectionError('');
    setActiveBranch('WINNERS');
    setTeams([]);
    setMyTeamId(null);
    setMyTeammate(null);
    setChatMessages([]);
    setClassChats([]);
  };

  const activeQuestion = gameState === 'CHAOS_ROUND' || gameState === 'BRANCH_BATTLE' 
    ? QUESTIONS[chaosQuestionIdx] 
    : gameState === 'TEAM_DUO_ROUND' 
      ? QUESTIONS[6 + teamQuestionIdx]
      : gameState === 'GRAND_FINALE'
        ? QUESTIONS[9 + finaleQuestionIdx]
        : null;

  return (
    <section id="tro-choi" className="page-section" style={{
      background: 'radial-gradient(circle at center, #0d1117 0%, #030406 100%)',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100vh',
      color: '#e2e8f0',
      fontFamily: 'var(--font-sans)'
    }}>
      {/* Star backdrop rotate - colored in neon cyan for sci-fi look */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: 0.04,
        pointerEvents: 'none'
      }} className="drum-rotate">
        <DongSonStar size={600} color="#00f0ff" />
      </div>

      {/* Futuristic glow elements */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '10%',
        width: '350px',
        height: '350px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 240, 255, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        right: '10%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(138, 43, 226, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 10, padding: '40px 20px' }}>

        {/* If player is eliminated and it's not the lobby or podium phase */}
        {!isHost && activeBranch === 'ELIMINATED' && gameState !== 'ROLE_SELECTION' && gameState !== 'FINAL_LEADERBOARD' ? (
          <div className="premium-card" style={{
            backgroundColor: 'rgba(15, 20, 35, 0.85)',
            border: '1px solid rgba(255, 83, 83, 0.25)',
            maxWidth: '650px',
            margin: '50px auto',
            padding: '45px 30px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <Skull size={50} color="#ff5353" style={{ alignSelf: 'center' }} />
            <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-title)', color: '#ff5353', letterSpacing: '1px' }}>
              BẠN ĐÃ BỊ LOẠI!
            </h3>
            <p style={{ fontSize: '1rem', color: '#e2e8f0' }}>
              Đấu thủ: <strong>{playerName}</strong> | Điểm số đạt được: <strong style={{ color: '#ffc75f' }}>{score} pts</strong>
            </p>
            <div style={{
              padding: '15px',
              backgroundColor: 'rgba(255, 83, 83, 0.05)',
              borderRadius: '8px',
              fontSize: '0.9rem',
              color: '#cbd5e1',
              lineHeight: '1.6',
              border: '1px solid rgba(255, 83, 83, 0.1)'
            }}>
              Bạn đã dừng chân tại giải đấu này. Bạn hiện đang ở <strong>Chế độ Quan sát (Spectator Mode)</strong>. 
              Hãy tiếp tục theo dõi diễn biến giải đấu trên màn chiếu lớn của Host!
            </div>
            
            <button onClick={resetToRoleSelection} className="btn-secondary" style={{
              alignSelf: 'center',
              padding: '10px 24px',
              border: '1.5px solid #ff5353',
              backgroundColor: 'transparent',
              color: '#ff5353',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              Rời phòng đấu
            </button>
          </div>
        ) : (
          <>
            {/* ROLE_SELECTION */}
            {gameState === 'ROLE_SELECTION' && (
              <div>
                <a href="#" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  textDecoration: 'none',
                  color: '#00f0ff',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  marginBottom: '35px',
                  fontFamily: 'var(--font-sans)',
                  transition: 'color 0.2s'
                }}>
                  <ArrowLeft size={16} /> Quay lại trang chủ học tập
                </a>

                <div className="section-title-wrapper" style={{ textAlign: 'center', marginBottom: '40px' }}>
                  <p className="section-subtitle" style={{ color: '#00f0ff', letterSpacing: '2px', textTransform: 'uppercase' }}>COSMIC ARENA</p>
                  <h2 className="section-title" style={{ color: '#ffffff', textShadow: '0 0 15px rgba(255,255,255,0.1)' }}>Đấu Trường Đỉnh Cao</h2>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '30px',
                  maxWidth: '850px',
                  margin: '0 auto'
                }} className="grid-2-cols">
                  
                  {/* Host Box */}
                  <div className="premium-card" style={{
                    backgroundColor: 'rgba(15, 20, 35, 0.8)',
                    border: '1px solid rgba(0, 240, 255, 0.2)',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    padding: '40px'
                  }}>
                    <Trophy size={40} color="#ffd700" style={{ alignSelf: 'center' }} />
                    <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-title)', color: '#ffffff' }}>
                      Người thuyết trình (Host)
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.5' }}>
                      Hiển thị sơ đồ phân nhánh và trực quan hóa các đoạn chat đồng đội trên màn chiếu lớn.
                    </p>

                    <div style={{ 
                      display: 'flex', 
                      gap: '10px', 
                      justifyContent: 'center', 
                      backgroundColor: 'rgba(9, 10, 15, 0.6)', 
                      padding: '6px', 
                      borderRadius: '8px' 
                    }}>
                      <button 
                        onClick={() => setGameMode('OFFLINE')}
                        style={{
                          flex: 1,
                          border: 'none',
                          borderRadius: '6px',
                          padding: '8px 12px',
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          backgroundColor: gameMode === 'OFFLINE' ? '#00f0ff' : 'transparent',
                          color: gameMode === 'OFFLINE' ? '#090a0f' : '#cbd5e1',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        Giả lập (Offline)
                      </button>
                      <button 
                        onClick={() => setGameMode('ONLINE')}
                        style={{
                          flex: 1,
                          border: 'none',
                          borderRadius: '6px',
                          padding: '8px 12px',
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          backgroundColor: gameMode === 'ONLINE' ? '#00f0ff' : 'transparent',
                          color: gameMode === 'ONLINE' ? '#090a0f' : '#cbd5e1',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        Kết nối mạng (Online)
                      </button>
                    </div>

                    <span style={{ fontSize: '0.75rem', color: '#ff5353', fontStyle: 'italic', fontWeight: 600 }}>
                      {gameMode === 'OFFLINE' ? '* Hỗ trợ 20 đấu thủ giả lập (bots) vượt qua các vòng.' : '* Yêu cầu chạy "node ws-server.js" trước.'}
                    </span>

                    <button onClick={handleHostCreateRoom} className="btn-primary" style={{
                      width: '100%',
                      padding: '14px',
                      marginTop: '10px',
                      backgroundColor: '#00f0ff',
                      color: '#090a0f',
                      border: 'none',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}>
                      <Play size={16} />
                      Tạo phòng thi đấu
                    </button>
                  </div>

                  {/* Player Box */}
                  <div className="premium-card" style={{
                    backgroundColor: 'rgba(15, 20, 35, 0.8)',
                    border: '1px solid rgba(0, 240, 255, 0.2)',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    padding: '40px'
                  }}>
                    <UserCheck size={40} color="#00f0ff" style={{ alignSelf: 'center' }} />
                    <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-title)', color: '#ffffff' }}>
                      Sinh viên tham gia (Player)
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.5' }}>
                      Ghép cặp để chat thảo luận và đấu 1v1 tìm kiếm nhà vô địch liêm chính.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
                      <input
                        type="text"
                        placeholder="Tên của bạn..."
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        style={{
                          padding: '12px',
                          borderRadius: '6px',
                          border: '1px solid rgba(0, 240, 255, 0.3)',
                          backgroundColor: 'rgba(9, 10, 15, 0.8)',
                          color: '#ffffff',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.9rem',
                          outline: 'none'
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Mã phòng..."
                        value={roomCode}
                        onChange={(e) => setRoomCode(e.target.value)}
                        style={{
                          padding: '12px',
                          borderRadius: '6px',
                          border: '1px solid rgba(0, 240, 255, 0.3)',
                          backgroundColor: 'rgba(9, 10, 15, 0.8)',
                          color: '#ffffff',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.9rem',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <button onClick={handlePlayerJoinRoom} className="btn-secondary" style={{
                      width: '100%',
                      padding: '14px',
                      border: '1.5px solid #00f0ff',
                      backgroundColor: 'transparent',
                      color: '#00f0ff',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}>
                      <ArrowRight size={16} />
                      Vào phòng thi đấu
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* HOST_LOBBY */}
            {gameState === 'HOST_LOBBY' && (
              <div className="premium-card" style={{
                backgroundColor: 'rgba(15, 20, 35, 0.85)',
                border: '1px solid rgba(0, 240, 255, 0.2)',
                maxWidth: '750px',
                margin: '0 auto',
                padding: '40px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: '25px'
              }}>
                <button onClick={resetToRoleSelection} style={{
                  alignSelf: 'start',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  color: '#cbd5e1',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <ArrowLeft size={16} /> Thoát
                </button>

                <div>
                  <span style={{ fontSize: '0.85rem', color: '#00f0ff', fontWeight: 'bold', letterSpacing: '1px' }}>
                    {gameMode === 'OFFLINE' ? 'ĐẤU TRƯỜNG GIẢ LẬP (20 ĐẤU THỦ)' : 'ĐẤU TRƯỜNG MẠNG (ONLINE)'}
                  </span>
                  <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-title)', marginTop: '5px', color: '#ffffff' }}>
                    SẴN SÀNG KHỞI CHIẾN
                  </h3>
                </div>

                <div style={{
                  backgroundColor: 'rgba(9, 10, 15, 0.7)',
                  border: '1px solid rgba(0, 240, 255, 0.15)',
                  padding: '20px',
                  borderRadius: '8px',
                  display: 'inline-block',
                  margin: '0 auto'
                }}>
                  <span style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '5px' }}>
                    MÃ PHÒNG CHƠI:
                  </span>
                  <strong style={{ fontSize: '2.5rem', letterSpacing: '4px', color: '#00f0ff', fontFamily: 'var(--font-title)' }}>
                    {roomCode}
                  </strong>
                </div>

                <div>
                  <span style={{ fontSize: '0.95rem', fontWeight: 600, display: 'block', marginBottom: '15px' }}>
                    Sĩ số: {players.length} / 20 đấu thủ
                  </span>

                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                    justifyContent: 'center',
                    maxHeight: '180px',
                    overflowY: 'auto',
                    padding: '15px',
                    backgroundColor: 'rgba(9, 10, 15, 0.5)',
                    borderRadius: '8px'
                  }}>
                    {players.map((p, i) => (
                      <span key={i} style={{
                        backgroundColor: 'rgba(0, 240, 255, 0.08)',
                        border: '1px solid rgba(0, 240, 255, 0.2)',
                        padding: '8px 15px',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: '#ffffff'
                      }}>
                        {p.name}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleStartChaosRound}
                  style={{
                    alignSelf: 'center',
                    padding: '14px 40px',
                    backgroundColor: '#00f0ff',
                    color: '#090a0f',
                    border: 'none',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Play size={16} /> Bắt đầu hỗn chiến
                </button>
              </div>
            )}

            {/* PLAYER_LOBBY */}
            {gameState === 'PLAYER_LOBBY' && (
              <div className="premium-card" style={{
                backgroundColor: 'rgba(15, 20, 35, 0.85)',
                border: '1px solid rgba(0, 240, 255, 0.2)',
                maxWidth: '600px',
                margin: '0 auto',
                padding: '40px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
                <button onClick={resetToRoleSelection} style={{
                  alignSelf: 'start',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  color: '#cbd5e1',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <ArrowLeft size={16} /> Rời phòng
                </button>

                <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-title)', color: '#ffffff' }}>
                  ĐÃ VÀO PHÒNG CHỜ
                </h3>
                <p style={{ fontSize: '0.95rem', color: '#cbd5e1' }}>
                  Đấu thủ: <strong>{playerName}</strong> | Phòng: <strong>{roomCode}</strong>
                </p>
                <div style={{
                  padding: '15px',
                  backgroundColor: 'rgba(0, 240, 255, 0.05)',
                  border: '1px solid rgba(0, 240, 255, 0.15)',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#00f0ff'
                }}>
                  Đang chờ Host kích hoạt Vòng 1: Hỗn Chiến...
                </div>
              </div>
            )}

            {/* CHAOS_ROUND */}
            {gameState === 'CHAOS_ROUND' && (
              <div style={{ maxWidth: '950px', margin: '0 auto' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}>
                  <div>
                    <span className="lacquer-badge" style={{ backgroundColor: '#00f0ff', color: '#090a0f', marginRight: '10px', fontWeight: 'bold' }}>
                      Vòng 1: Hỗn Chiến 20 Người
                    </span>
                    <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                      Đúng: +100 | Sai: -50 (Trả lời liên tục)
                    </span>
                  </div>

                  <div style={{
                    width: '60px',
                    height: '40px',
                    backgroundColor: 'rgba(0, 240, 255, 0.12)',
                    border: '1px solid rgba(0, 240, 255, 0.3)',
                    color: '#00f0ff',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.1rem'
                  }}>
                    {timer}s
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 0.8fr',
                  gap: '30px'
                }} className="grid-2-cols">
                  
                  {/* Game Area */}
                  <div>
                    {isHost ? (
                      <div className="premium-card" style={{
                        backgroundColor: 'rgba(15, 20, 35, 0.85)',
                        border: '1px solid rgba(0, 240, 255, 0.2)',
                        padding: '30px',
                        textAlign: 'center'
                      }}>
                        <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-title)', color: '#00f0ff' }}>
                          ĐẠI CHIẾN PHÂN HẠNG!
                        </h3>
                        <p style={{ fontSize: '0.9rem', color: '#cbd5e1', marginTop: '10px', lineHeight: '1.5' }}>
                          Các đấu thủ đang tự do trả lời các câu hỏi.
                        </p>
                        <div style={{ marginTop: '20px', opacity: 0.8 }}>
                          <DongSonStar size={120} color="#00f0ff" className="drum-rotate" />
                        </div>
                      </div>
                    ) : (
                      answeredInRound >= 6 ? (
                        <div className="premium-card" style={{
                          backgroundColor: 'rgba(15, 20, 35, 0.85)',
                          border: '1px solid rgba(0, 240, 255, 0.2)',
                          padding: '40px 30px',
                          textAlign: 'center',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '15px'
                        }}>
                          <Radio size={40} color="#00f0ff" style={{ alignSelf: 'center' }} className="pulse" />
                          <h3 style={{ fontSize: '1.3rem', color: '#ffffff', fontFamily: 'var(--font-title)' }}>
                            BẠN ĐÃ HOÀN THÀNH PHẦN THI!
                          </h3>
                          <p style={{ fontSize: '0.95rem', color: '#cbd5e1', lineHeight: '1.6' }}>
                            Đang chờ các đấu thủ khác hoàn thành bộ câu hỏi... Vui lòng theo dõi diễn biến giải đấu trên màn chiếu chính của Host.
                          </p>
                        </div>
                      ) : (
                        <div className="premium-card" style={{
                          backgroundColor: 'rgba(15, 20, 35, 0.85)',
                          border: '1px solid rgba(0, 240, 255, 0.2)',
                          padding: '30px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '20px'
                        }}>
                          <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#00f0ff' }}>
                            CÂU HỎI CUỐN CHIẾU CỦA BẠN (CÂU {chaosQuestionIdx + 1}/6)
                          </div>
                          <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-title)', lineHeight: '1.5', color: '#ffffff' }}>
                            {QUESTIONS[chaosQuestionIdx].text}
                          </h3>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                            {QUESTIONS[chaosQuestionIdx].options.map((opt) => {
                              const isTempSelected = tempSelectedAnswer === opt.key;
                              return (
                                <button
                                  key={opt.key}
                                  onClick={() => handlePlayerSubmitChaosAnswer(opt.key)}
                                  style={{
                                    border: isTempSelected ? '1.5px solid #00f0ff' : '1px solid rgba(0, 240, 255, 0.2)',
                                    padding: '15px 20px',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    backgroundColor: isTempSelected ? 'rgba(0, 240, 255, 0.12)' : 'rgba(9, 10, 15, 0.6)',
                                    color: '#e2e8f0',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    gap: '10px',
                                    alignItems: 'center',
                                    fontFamily: 'var(--font-sans)',
                                    transition: 'background-color 0.2s'
                                  }}
                                >
                                  <strong style={{ color: '#00f0ff' }}>{opt.key}.</strong> {opt.text}
                                </button>
                              );
                            })}
                          </div>

                          {tempSelectedAnswer && (
                            <button
                              onClick={handleConfirmChaosAnswer}
                              style={{
                                marginTop: '10px',
                                padding: '12px 24px',
                                border: 'none',
                                backgroundColor: '#00f0ff',
                                color: '#090a0f',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '6px',
                                borderRadius: '4px'
                              }}
                            >
                              Xác nhận đáp án <ArrowRight size={16} />
                            </button>
                          )}
                        </div>
                      )
                    )}
                  </div>

                  {/* Leaderboard */}
                  <div className="premium-card" style={{
                    backgroundColor: 'rgba(15, 20, 35, 0.85)',
                    border: '1px solid rgba(0, 240, 255, 0.2)',
                    padding: '25px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px'
                  }}>
                    <div style={{ display: 'flex', justifyBetween: 'space-between', alignItems: 'center', width: '100%' }}>
                      <h3 style={{ fontSize: '0.95rem', fontFamily: 'var(--font-title)', color: '#00f0ff' }}>
                        BẢNG ĐIỂM TRỰC TIẾP
                      </h3>
                      {!isHost && (
                        <span style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#ffc75f' }}>
                          Điểm: {score} pts
                        </span>
                      )}
                    </div>

                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      maxHeight: '320px',
                      overflowY: 'auto'
                    }}>
                      {leaderboard.slice(0, 7).map((p, idx) => (
                        <div key={idx} style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '8px 12px',
                          backgroundColor: 'rgba(9, 10, 15, 0.6)',
                          borderRadius: '6px',
                          fontSize: '0.85rem',
                          border: '1px solid rgba(0, 240, 255, 0.1)'
                        }}>
                          <span style={{ fontWeight: 600, color: '#ffffff' }}>
                            #{idx + 1} {p.name}
                          </span>
                          <strong style={{ color: '#00f0ff' }}>{p.score} pts</strong>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {isHost && (
                  <button onClick={handleSplitBrackets} style={{
                    margin: '35px auto 0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '12px 28px',
                    backgroundColor: '#00f0ff',
                    color: '#090a0f',
                    border: 'none',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}>
                    Kết thúc Vòng 1 & Phân Nhánh <ArrowRight size={16} />
                  </button>
                )}
              </div>
            )}

            {/* BRACKET_SPLIT */}
            {gameState === 'BRACKET_SPLIT' && (
              <div style={{ maxWidth: '950px', margin: '0 auto' }}>
                <div className="section-title-wrapper" style={{ textAlign: 'center', marginBottom: '30px' }}>
                  <p className="section-subtitle" style={{ color: '#00f0ff' }}>PHÂN NHÁNH THI ĐẤU</p>
                  <h2 className="section-title" style={{ color: '#ffffff' }}>Kết Quả Phân Nhánh Vòng 1</h2>
                </div>

                {!isHost && (
                  <div style={{
                    textAlign: 'center',
                    padding: '15px',
                    borderRadius: '8px',
                    backgroundColor: activeBranch === 'WINNERS' ? 'rgba(57, 224, 155, 0.08)' : 'rgba(255, 83, 83, 0.08)',
                    color: activeBranch === 'WINNERS' ? '#39e09b' : '#ff5353',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    border: activeBranch === 'WINNERS' ? '1px solid rgba(57, 224, 155, 0.15)' : '1px solid rgba(255, 83, 83, 0.15)',
                    marginBottom: '30px'
                  }}>
                    {activeBranch === 'WINNERS' 
                      ? 'BẠN VÀO NHÁNH THẮNG (WINNERS) - ĐẤU LẤY TOP 4 VÀO PHÒNG CHAT ĐỒNG ĐỘI!' 
                      : 'BẠN RƠI XUỐNG NHÁNH THUA (LOSERS) - PHẢI ĐẤU LẤY TOP 2 ĐỂ HỒI SINH!'}
                  </div>
                )}

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '30px',
                  marginBottom: '30px'
                }} className="grid-2-cols">
                  
                  {/* Winners Bracket */}
                  <div className="premium-card" style={{
                    backgroundColor: 'rgba(15, 20, 35, 0.85)',
                    border: '1px solid rgba(57, 224, 155, 0.25)',
                    padding: '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px'
                  }}>
                    <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-title)', color: '#39e09b' }}>
                      🏆 NHÁNH THẮNG (WINNERS BRACKET)
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {leaderboard.filter(p => p.activeBranch === 'WINNERS').slice(0, 10).map((p, idx) => (
                        <div key={idx} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '8px 12px',
                          backgroundColor: 'rgba(9, 10, 15, 0.6)',
                          borderRadius: '6px',
                          fontSize: '0.85rem',
                          border: '1px solid rgba(57, 224, 155, 0.1)'
                        }}>
                          <span style={{ fontWeight: 600, color: '#ffffff' }}>#{idx + 1} {p.name}</span>
                          <strong style={{ color: '#39e09b' }}>{p.score} pts</strong>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Losers Bracket */}
                  <div className="premium-card" style={{
                    backgroundColor: 'rgba(15, 20, 35, 0.85)',
                    border: '1px solid rgba(255, 83, 83, 0.25)',
                    padding: '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px'
                  }}>
                    <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-title)', color: '#ff5353' }}>
                      💀 NHÁNH THUA (LOSERS BRACKET)
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {leaderboard.filter(p => p.activeBranch === 'LOSERS').slice(0, 10).map((p, idx) => (
                        <div key={idx} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '8px 12px',
                          backgroundColor: 'rgba(9, 10, 15, 0.6)',
                          borderRadius: '6px',
                          fontSize: '0.85rem',
                          border: '1px solid rgba(255, 83, 83, 0.1)'
                        }}>
                          <span style={{ fontWeight: 600, color: '#ffffff' }}>#{idx + 11} {p.name}</span>
                          <strong style={{ color: '#ff5353' }}>{p.score} pts</strong>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {isHost && (
                  <button onClick={handleStartBranchBattle} style={{
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '12px 28px',
                    backgroundColor: '#00f0ff',
                    color: '#090a0f',
                    border: 'none',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}>
                    Bắt đầu Trận Chiến Nhánh (Vòng 2) <ArrowRight size={16} />
                  </button>
                )}
              </div>
            )}

            {/* BRANCH_BATTLE */}
            {gameState === 'BRANCH_BATTLE' && (
              <div style={{ maxWidth: '950px', margin: '0 auto' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}>
                  <div>
                    <span className="lacquer-badge" style={{ backgroundColor: '#00f0ff', color: '#090a0f', marginRight: '10px', fontWeight: 'bold' }}>
                      Vòng 2: Trận Chiến Nhánh
                    </span>
                    <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                      Nhánh Thắng chọn Top 4 | Nhánh Thua hồi sinh Top 2!
                    </span>
                  </div>

                  <div style={{
                    width: '60px',
                    height: '40px',
                    backgroundColor: 'rgba(0, 240, 255, 0.12)',
                    border: '1px solid rgba(0, 240, 255, 0.3)',
                    color: '#00f0ff',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.1rem'
                  }}>
                    {timer}s
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 0.8fr',
                  gap: '30px'
                }} className="grid-2-cols">
                  
                  {/* Game View */}
                  <div>
                    {isHost ? (
                      <div className="premium-card" style={{
                        backgroundColor: 'rgba(15, 20, 35, 0.85)',
                        border: '1px solid rgba(0, 240, 255, 0.2)',
                        padding: '30px',
                        textAlign: 'center'
                      }}>
                        <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-title)', color: '#00f0ff' }}>
                          SO GĂNG NỘI BỘ NHÁNH!
                        </h3>
                        <p style={{ fontSize: '0.9rem', color: '#cbd5e1', marginTop: '10px', lineHeight: '1.5' }}>
                          Các đấu thủ đang nỗ lực đạt điểm số cao nhất để sinh tồn.
                        </p>
                        <div style={{ marginTop: '20px', opacity: 0.8 }}>
                          <DongSonStar size={120} color="#00f0ff" className="drum-rotate" />
                        </div>
                      </div>
                    ) : (
                      answeredInRound >= 6 ? (
                        <div className="premium-card" style={{
                          backgroundColor: 'rgba(15, 20, 35, 0.85)',
                          border: '1px solid rgba(0, 240, 255, 0.2)',
                          padding: '40px 30px',
                          textAlign: 'center',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '15px'
                        }}>
                          <Radio size={40} color="#00f0ff" style={{ alignSelf: 'center' }} className="pulse" />
                          <h3 style={{ fontSize: '1.3rem', color: '#ffffff', fontFamily: 'var(--font-title)' }}>
                            BẠN ĐÃ HOÀN THÀNH PHẦN THI!
                          </h3>
                          <p style={{ fontSize: '0.95rem', color: '#cbd5e1', lineHeight: '1.6' }}>
                            Đang chờ các đấu thủ khác hoàn thành bộ câu hỏi... Vui lòng theo dõi diễn biến giải đấu trên màn chiếu chính của Host.
                          </p>
                        </div>
                      ) : (
                        <div className="premium-card" style={{
                          backgroundColor: 'rgba(15, 20, 35, 0.85)',
                          border: '1px solid rgba(0, 240, 255, 0.2)',
                          padding: '30px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '20px'
                        }}>
                          <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#00f0ff' }}>
                            CÂU HỎI CUỐN CHIẾU CỦA BẠN (CÂU {chaosQuestionIdx + 1}/6)
                          </div>
                          <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-title)', lineHeight: '1.5', color: '#ffffff' }}>
                            {QUESTIONS[chaosQuestionIdx].text}
                          </h3>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                            {QUESTIONS[chaosQuestionIdx].options.map((opt) => {
                              const isTempSelected = tempSelectedAnswer === opt.key;
                              return (
                                <button
                                  key={opt.key}
                                  onClick={() => handlePlayerSubmitChaosAnswer(opt.key)}
                                  style={{
                                    border: isTempSelected ? '1.5px solid #00f0ff' : '1px solid rgba(0, 240, 255, 0.2)',
                                    padding: '15px 20px',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    backgroundColor: isTempSelected ? 'rgba(0, 240, 255, 0.12)' : 'rgba(9, 10, 15, 0.6)',
                                    color: '#e2e8f0',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    gap: '10px',
                                    alignItems: 'center',
                                    fontFamily: 'var(--font-sans)',
                                    transition: 'background-color 0.2s'
                                  }}
                                >
                                  <strong style={{ color: '#00f0ff' }}>{opt.key}.</strong> {opt.text}
                                </button>
                              );
                            })}
                          </div>

                          {tempSelectedAnswer && (
                            <button
                              onClick={handleConfirmChaosAnswer}
                              style={{
                                marginTop: '10px',
                                padding: '12px 24px',
                                border: 'none',
                                backgroundColor: '#00f0ff',
                                color: '#090a0f',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '6px',
                                borderRadius: '4px'
                              }}
                            >
                              Xác nhận đáp án <ArrowRight size={16} />
                            </button>
                          )}
                        </div>
                      )
                    )}
                  </div>

                  {/* Sidebar stats */}
                  <div className="premium-card" style={{
                    backgroundColor: 'rgba(15, 20, 35, 0.85)',
                    border: '1px solid rgba(0, 240, 255, 0.2)',
                    padding: '25px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px'
                  }}>
                    <h3 style={{ fontSize: '0.95rem', fontFamily: 'var(--font-title)', color: '#00f0ff' }}>
                      BẢNG ĐIỂM THEO NHÁNH
                    </h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '320px', overflowY: 'auto' }}>
                      {leaderboard.filter(p => p.activeBranch !== 'ELIMINATED').map((p, idx) => (
                        <div key={idx} style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '8px 12px',
                          backgroundColor: p.activeBranch === 'WINNERS' ? 'rgba(57, 224, 155, 0.05)' : 'rgba(255, 83, 83, 0.05)',
                          borderRadius: '6px',
                          fontSize: '0.85rem',
                          border: p.activeBranch === 'WINNERS' ? '1px solid rgba(57, 224, 155, 0.1)' : '1px solid rgba(255, 83, 83, 0.1)'
                        }}>
                          <span style={{ fontWeight: 600, color: '#ffffff' }}>{p.name} ({p.activeBranch === 'WINNERS' ? 'Nhánh Thắng' : 'Nhánh Thua'})</span>
                          <strong style={{ color: p.activeBranch === 'WINNERS' ? '#39e09b' : '#ff5353' }}>{p.score} pts</strong>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {isHost && (
                  <button onClick={handleProcessBranchBattle} style={{
                    margin: '35px auto 0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '12px 28px',
                    backgroundColor: '#00f0ff',
                    color: '#090a0f',
                    border: 'none',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}>
                    Lọc Kết Quả Vòng 2 & Tạo Cặp Đấu <ArrowRight size={16} />
                  </button>
                )}
              </div>
            )}

            {/* TEAM_LOBBY */}
            {gameState === 'TEAM_LOBBY' && (
              <div style={{ maxWidth: '950px', margin: '0 auto' }}>
                <div className="section-title-wrapper" style={{ textAlign: 'center', marginBottom: '30px' }}>
                  <p className="section-subtitle" style={{ color: '#00f0ff' }}>GHÉP CẶP CHIẾN THUẬT</p>
                  <h2 className="section-title" style={{ color: '#ffffff' }}>Thiết Lập 3 Cặp Đấu Đồng Đội</h2>
                </div>

                {!isHost && (
                  <div style={{
                    textAlign: 'center',
                    padding: '15px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(0, 240, 255, 0.08)',
                    color: '#00f0ff',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    border: '1px solid rgba(0, 240, 255, 0.15)',
                    marginBottom: '30px'
                  }}>
                    {`BẠN ĐÃ ĐƯỢC GHÉP VÀO: ${teams.find(t => t.p1 === playerName || t.p2 === playerName)?.name}! ĐỒNG ĐỘI: ${myTeammate}`}
                  </div>
                )}

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '24px',
                  marginBottom: '35px'
                }} className="cards-grid">
                  {teams.map((t, i) => (
                    <div key={i} className="premium-card" style={{
                      backgroundColor: 'rgba(15, 20, 35, 0.85)',
                      border: (t.p1 === playerName || t.p2 === playerName) ? '2px solid #ffd700' : '1px solid rgba(0, 240, 255, 0.2)',
                      padding: '25px',
                      borderRadius: '8px',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '15px'
                    }}>
                      <span className="lacquer-badge" style={{ alignSelf: 'center', backgroundColor: '#00f0ff', color: '#090a0f', fontWeight: 'bold' }}>{t.name}</span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '10px 0', color: '#cbd5e1' }}>
                        <div style={{ fontSize: '0.9rem' }}>Đồng đội 1: <strong style={{ color: '#ffffff' }}>{t.p1}</strong></div>
                        <div style={{ fontSize: '0.9rem' }}>Đồng đội 2: <strong style={{ color: '#ffffff' }}>{t.p2}</strong></div>
                      </div>
                      <strong style={{ fontSize: '1.1rem', color: '#ffc75f' }}>Điểm nhóm: {t.score} pts</strong>
                    </div>
                  ))}
                </div>

                {isHost && (
                  <button onClick={handleStartTeamDuoRound} style={{
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '12px 28px',
                    backgroundColor: '#00f0ff',
                    color: '#090a0f',
                    border: 'none',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}>
                    Bắt đầu Vòng Thảo Luận Đồng Đội (4 Phút) <ArrowRight size={16} />
                  </button>
                )}
              </div>
            )}

            {/* TEAM_DUO_ROUND */}
            {gameState === 'TEAM_DUO_ROUND' && (
              <div style={{ maxWidth: '950px', margin: '0 auto' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}>
                  <div>
                    <span className="lacquer-badge" style={{ backgroundColor: '#00f0ff', color: '#090a0f', marginRight: '10px', fontWeight: 'bold' }}>
                      Vòng 3: Đồng Đội Tác Chiến (Câu {teamQuestionIdx + 1}/3)
                    </span>
                    <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                      Thảo luận đáp án qua Chat Box nội bộ để lấy điểm chung!
                    </span>
                  </div>

                  <div style={{
                    width: '60px',
                    height: '40px',
                    backgroundColor: 'rgba(0, 240, 255, 0.12)',
                    border: '1px solid rgba(0, 240, 255, 0.3)',
                    color: '#00f0ff',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.1rem'
                  }}>
                    {timer}s
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 0.8fr',
                  gap: '30px'
                }} className="grid-2-cols">
                  
                  {/* Left Column: Questions / Host scroll feed */}
                  <div>
                    <div className="premium-card" style={{
                      backgroundColor: 'rgba(15, 20, 35, 0.85)',
                      border: '1px solid rgba(0, 240, 255, 0.2)',
                      padding: '30px',
                      marginBottom: '25px',
                      textAlign: 'center'
                    }}>
                      <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-title)', lineHeight: '1.5', color: '#ffffff' }}>
                        {activeQuestion?.text}
                      </h3>
                    </div>

                    {isHost ? (
                      <div className="premium-card" style={{
                        backgroundColor: 'rgba(15, 20, 35, 0.85)',
                        border: '1px solid rgba(0, 240, 255, 0.2)',
                        padding: '25px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px'
                      }}>
                        <h3 style={{ fontSize: '0.95rem', fontFamily: 'var(--font-title)', color: '#00f0ff' }}>
                          KÊNH CHAT GIÁM SÁT LỚP HỌC (HOST SCREEN):
                        </h3>
                        <div ref={hostChatContainerRef} style={{
                          height: '180px',
                          overflowY: 'auto',
                          backgroundColor: 'rgba(9, 10, 15, 0.7)',
                          border: '1px solid rgba(0, 240, 255, 0.15)',
                          padding: '15px',
                          borderRadius: '8px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px'
                        }}>
                          {classChats.map((c, i) => (
                            <div key={i} style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>
                              <strong style={{ color: '#00f0ff' }}>[{c.teamName}] {c.sender}</strong>: <span style={{ color: '#e2e8f0' }}>{c.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {activeQuestion?.options.map((opt) => {
                          const isThisSelected = selectedAnswer === opt.key;
                          return (
                            <button
                              key={opt.key}
                              disabled={hasAnswered}
                              onClick={() => handlePlayerSubmitDuoAnswer(opt.key, activeQuestion.correctKey)}
                              style={{
                                backgroundColor: isThisSelected ? 'rgba(0, 240, 255, 0.12)' : 'rgba(15, 20, 35, 0.85)',
                                border: isThisSelected ? '1.5px solid #00f0ff' : '1px solid rgba(0, 240, 255, 0.15)',
                                borderRadius: '8px',
                                padding: '16px 20px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                textAlign: 'left',
                                color: '#e2e8f0',
                                cursor: hasAnswered ? 'default' : 'pointer',
                                width: '100%',
                                fontFamily: 'var(--font-sans)',
                              }}
                            >
                              <span style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                backgroundColor: isThisSelected ? '#00f0ff' : 'rgba(9, 10, 15, 0.6)',
                                color: isThisSelected ? '#090a0f' : '#00f0ff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyStyle: 'center',
                                justifyContent: 'center',
                                fontWeight: 700
                              }}>
                                {opt.key}
                              </span>
                              <span>{opt.text}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Sidebar Chat / Leaderboard */}
                  <div>
                    {isHost ? (
                      <div className="premium-card" style={{
                        backgroundColor: 'rgba(15, 20, 35, 0.85)',
                        border: '1px solid rgba(0, 240, 255, 0.2)',
                        padding: '25px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px'
                      }}>
                        <h3 style={{ fontSize: '0.95rem', fontFamily: 'var(--font-title)', color: '#00f0ff' }}>
                          ĐIỂM SỐ CÁC CẶP ĐẤU
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {teams.map((t, idx) => (
                            <div key={idx} style={{
                              padding: '12px 15px',
                              backgroundColor: 'rgba(9, 10, 15, 0.6)',
                              borderRadius: '6px',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              border: '1px solid rgba(0, 240, 255, 0.1)'
                            }}>
                              <span style={{ fontWeight: 600, color: '#ffffff' }}>{t.name}</span>
                              <strong style={{ color: '#ffd700' }}>{t.score} pts</strong>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="premium-card" style={{
                        backgroundColor: 'rgba(15, 20, 35, 0.85)',
                        border: '1px solid rgba(0, 240, 255, 0.2)',
                        padding: '25px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                        height: '350px'
                      }}>
                        <div style={{ borderBottom: '1px solid rgba(0, 240, 255, 0.25)', paddingBottom: '8px' }}>
                          <span style={{ fontSize: '0.75rem', color: '#cbd5e1', display: 'block' }}>
                            Kênh thảo luận cặp:
                          </span>
                          <strong style={{ fontSize: '0.9rem', color: '#00f0ff' }}>
                            {teams.find(t => t.id === myTeamId)?.name} (Đồng đội: {myTeammate})
                          </strong>
                        </div>

                        {/* Message log */}
                        <div ref={chatContainerRef} style={{
                          flex: 1,
                          overflowY: 'auto',
                          backgroundColor: 'rgba(9, 10, 15, 0.7)',
                          padding: '10px',
                          borderRadius: '6px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px',
                          border: '1px solid rgba(0, 240, 255, 0.1)'
                        }}>
                          {chatMessages.length === 0 ? (
                             <span style={{ fontSize: '0.75rem', color: '#cbd5e1', fontStyle: 'italic', margin: 'auto', textAlign: 'center' }}>
                               Nhắn tin bàn bạc đáp án đúng...
                             </span>
                          ) : (
                            chatMessages.map((msg, i) => {
                              const isMe = msg.sender === playerName;
                              return (
                                <div key={i} style={{
                                  alignSelf: isMe ? 'flex-end' : 'flex-start',
                                  backgroundColor: isMe ? '#00f0ff' : 'rgba(15, 20, 35, 0.9)',
                                  color: isMe ? '#090a0f' : '#ffffff',
                                  padding: '8px 12px',
                                  borderRadius: '8px',
                                  fontSize: '0.8rem',
                                  maxWidth: '80%',
                                  lineHeight: '1.4',
                                  border: isMe ? 'none' : '1px solid rgba(0, 240, 255, 0.15)'
                                }}>
                                  <span style={{ fontSize: '0.65rem', opacity: 0.8, display: 'block', fontWeight: 'bold', marginBottom: '2px' }}>
                                    {isMe ? 'Bạn' : msg.sender}
                                  </span>
                                  {msg.text}
                                </div>
                              );
                            })
                          )}
                        </div>

                        {/* Send bar */}
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <input
                            type="text"
                            placeholder="Nhập tin nhắn..."
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                            style={{
                              flex: 1,
                              padding: '8px 12px',
                              borderRadius: '6px',
                              border: '1px solid rgba(0, 240, 255, 0.3)',
                              backgroundColor: 'rgba(9, 10, 15, 0.8)',
                              color: '#ffffff',
                              outline: 'none',
                              fontSize: '0.85rem'
                            }}
                          />
                          <button onClick={handleSendChat} style={{
                            padding: '8px 12px',
                            borderRadius: '6px',
                            border: 'none',
                            backgroundColor: '#00f0ff',
                            color: '#090a0f',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center'
                          }}>
                            <Send size={14} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                </div>

                {isHost && (
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '35px' }}>
                    {teamQuestionIdx < 2 ? (
                      <button onClick={handleNextTeamQuestion} style={{
                        padding: '12px 28px',
                        backgroundColor: '#00f0ff',
                        color: '#090a0f',
                        border: 'none',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        Câu hỏi nhóm tiếp theo <ArrowRight size={16} />
                      </button>
                    ) : (
                      <button onClick={handleFinishTeamDuo} style={{
                        padding: '12px 28px',
                        backgroundColor: '#ff5353',
                        color: '#ffffff',
                        border: 'none',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        Xem Cặp Đấu Thắng Cuộc <ArrowRight size={16} />
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* FINALE_LOBBY */}
            {gameState === 'FINALE_LOBBY' && (
              <div style={{ maxWidth: '750px', margin: '0 auto', textAlign: 'center' }}>
                <div className="section-title-wrapper" style={{ textAlign: 'center', marginBottom: '30px' }}>
                  <p className="section-subtitle" style={{ color: '#00f0ff' }}>1V1 CHUNG KẾT</p>
                  <h2 className="section-title" style={{ color: '#ffffff' }}>Huynh Đệ Tương Tàn</h2>
                </div>

                <div className="premium-card" style={{
                  backgroundColor: 'rgba(15, 20, 35, 0.85)',
                  border: '1px solid #ffd700',
                  padding: '40px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  marginBottom: '35px'
                }}>
                  <Trophy size={40} color="#ffd700" style={{ alignSelf: 'center' }} />
                  <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-title)', color: '#ffd700' }}>
                    CẶP ĐẤU CHIẾN THẮNG VÒNG ĐỒNG ĐỘI:
                  </h3>
                  <strong style={{ fontSize: '1.8rem', color: '#00f0ff', fontFamily: 'var(--font-title)', letterSpacing: '1px' }}>
                    {winningTeamName}
                  </strong>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '40px',
                    margin: '15px 0'
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>Đấu thủ 1:</span>
                      <strong style={{ fontSize: '1.2rem', color: '#ffffff' }}>{finalists[0]}</strong>
                    </div>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffd700' }}>VS</span>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>Đấu thủ 2:</span>
                      <strong style={{ fontSize: '1.2rem', color: '#ffffff' }}>{finalists[1]}</strong>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.5' }}>
                    Hai đồng đội vừa đồng cam cộng khổ sẽ bị chia đôi để bước vào trận quyết chiến 1v1 tìm kiếm ngôi vương!
                  </p>
                </div>

                {!isHost && (
                  <div style={{
                    padding: '15px',
                    borderRadius: '8px',
                    backgroundColor: finalists.includes(playerName) ? 'rgba(255, 83, 83, 0.08)' : 'rgba(15, 20, 35, 0.6)',
                    color: finalists.includes(playerName) ? '#ff5353' : '#cbd5e1',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    border: finalists.includes(playerName) ? '1px solid rgba(255, 83, 83, 0.2)' : '1px solid rgba(0, 240, 255, 0.1)',
                    marginBottom: '30px'
                  }}>
                    {finalists.includes(playerName) 
                      ? 'BẠN ĐÃ LỌT VÀO TRẬN ĐẤU ĐƠN CHUNG KẾT 1V1! HÃY CHUẨN BỊ CHIẾN ĐẤU VỚI CỰU ĐỒNG ĐỘI!' 
                      : 'BẠN LÀ KHÁN GIẢ. HÃY CỔ VŨ CHO HAI ĐẤU THỦ CHUNG KẾT!' }
                  </div>
                )}

                {isHost && (
                  <button onClick={handleStartFinaleRound} style={{
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '12px 28px',
                    backgroundColor: '#ffd700',
                    color: '#090a0f',
                    border: 'none',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}>
                    Bắt đầu Trận Đấu Đơn 1v1 <ArrowRight size={16} />
                  </button>
                )}
              </div>
            )}

            {/* GRAND_FINALE */}
            {gameState === 'GRAND_FINALE' && (
              <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}>
                  <div>
                    <span className="lacquer-badge" style={{ backgroundColor: '#ffd700', color: '#090a0f', marginRight: '10px', fontWeight: 'bold' }}>
                      Chung Kết Đơn (Câu {finaleQuestionIdx + 1}/3)
                    </span>
                    <span style={{ fontSize: '0.85rem', color: '#ffd700', fontWeight: 'bold' }}>
                      ĐIỂM NHÂN ĐÔI: Đúng +200 | Sai -100 (1v1 Solo Duel)
                    </span>
                  </div>

                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 83, 83, 0.12)',
                    border: '1px solid rgba(255, 83, 83, 0.3)',
                    color: '#ff5353',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.1rem'
                  }}>
                    {timer}
                  </div>
                </div>

                {/* Question Area */}
                <div className="premium-card" style={{
                  backgroundColor: 'rgba(15, 20, 35, 0.85)',
                  border: '1px solid rgba(0, 240, 255, 0.2)',
                  padding: '35px',
                  textAlign: 'center',
                  marginBottom: '30px'
                }}>
                  <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-title)', lineHeight: '1.5', color: '#ffffff' }}>
                    {QUESTIONS[9 + finaleQuestionIdx].text}
                  </h3>
                </div>

                {/* Options / Specating view */}
                {isHost ? (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '20px'
                  }} className="grid-2-cols">
                    {QUESTIONS[9 + finaleQuestionIdx].options.map((opt) => (
                      <div key={opt.key} style={{
                        backgroundColor: 'rgba(15, 20, 35, 0.85)',
                        border: '1px solid rgba(0, 240, 255, 0.15)',
                        padding: '20px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px'
                      }}>
                        <span style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(9, 10, 15, 0.6)',
                          color: '#00f0ff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700
                        }}>
                          {opt.key}
                        </span>
                        <span style={{ fontSize: '0.95rem', color: '#e2e8f0', fontWeight: 500 }}>
                          {opt.text}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  finalists.includes(playerName) ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {QUESTIONS[9 + finaleQuestionIdx].options.map((opt) => {
                        const isThisSelected = selectedAnswer === opt.key;
                        return (
                          <button
                            key={opt.key}
                            disabled={hasAnswered}
                            onClick={() => handlePlayerSubmitFinaleAnswer(opt.key, QUESTIONS[9 + finaleQuestionIdx].correctKey)}
                            style={{
                              backgroundColor: isThisSelected ? 'rgba(0, 240, 255, 0.12)' : 'rgba(15, 20, 35, 0.85)',
                              border: isThisSelected ? '1.5px solid #00f0ff' : '1px solid rgba(0, 240, 255, 0.15)',
                              borderRadius: '8px',
                              padding: '16px 20px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              textAlign: 'left',
                              color: '#e2e8f0',
                              cursor: hasAnswered ? 'default' : 'pointer',
                              width: '100%',
                              fontFamily: 'var(--font-sans)',
                            }}
                          >
                            <span style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '50%',
                              backgroundColor: isThisSelected ? '#00f0ff' : 'rgba(9, 10, 15, 0.6)',
                              color: isThisSelected ? '#090a0f' : '#00f0ff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 700
                            }}>
                              {opt.key}
                            </span>
                            <span>{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="premium-card" style={{
                      backgroundColor: 'rgba(15, 20, 35, 0.85)',
                      border: '1px solid rgba(0, 240, 255, 0.15)',
                      padding: '30px',
                      textAlign: 'center'
                    }}>
                      <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#cbd5e1' }}>
                        BẠN ĐANG XEM TRẬN CHUNG KẾT
                      </p>
                      <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginTop: '5px' }}>
                        Theo dõi cựu đồng đội {finalists.join(' và ')} so tài tìm ra nhà vô địch.
                      </p>
                    </div>
                  )
                )}

                {/* Host actions */}
                {isHost && (
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '35px' }}>
                    {finaleQuestionIdx < 2 ? (
                      <button onClick={handleNextFinaleQuestion} style={{
                        padding: '12px 28px',
                        backgroundColor: '#00f0ff',
                        color: '#090a0f',
                        border: 'none',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        Câu hỏi chung kết tiếp theo <ArrowRight size={16} />
                      </button>
                    ) : (
                      <button onClick={handleFinishGame} style={{
                        padding: '12px 28px',
                        backgroundColor: '#ffd700',
                        color: '#090a0f',
                        border: 'none',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        Tiết lộ Nhà Vô Địch <Trophy size={16} />
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* FINAL_LEADERBOARD */}
            {gameState === 'FINAL_LEADERBOARD' && (
              <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                <div className="section-title-wrapper" style={{ textAlign: 'center', marginBottom: '30px' }}>
                  <p className="section-subtitle" style={{ color: '#00f0ff', letterSpacing: '2px' }}>TOURNAMENT COMPLETED</p>
                  <h2 className="section-title" style={{ color: '#ffffff' }}>NHÀ VÔ ĐỊCH TOÀN GIẢI</h2>
                </div>

                {leaderboard.length > 0 && (
                  <div style={{
                    backgroundColor: 'rgba(15, 20, 35, 0.9)',
                    border: '2px solid #ffd700',
                    padding: '40px 30px',
                    borderRadius: '12px',
                    display: 'inline-flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '15px',
                    marginBottom: '35px'
                  }}>
                    <Trophy size={60} color="#ffd700" style={{ animation: 'pulse 1s infinite alternate' }} />
                    <span style={{ fontSize: '0.85rem', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      NHÀ VÔ ĐỊCH ĐẤU TRƯỜNG
                    </span>
                    <strong style={{ fontSize: '2.2rem', fontFamily: 'var(--font-title)', color: '#ffffff' }}>
                      {leaderboard[0].name}
                    </strong>
                    <span style={{
                      fontSize: '0.95rem',
                      backgroundColor: 'rgba(0, 240, 255, 0.15)',
                      border: '1px solid rgba(0, 240, 255, 0.3)',
                      padding: '6px 16px',
                      borderRadius: '20px',
                      fontWeight: 'bold',
                      color: '#00f0ff'
                    }}>
                      {leaderboard[0].score} pts
                    </span>
                  </div>
                )}

                {/* Score list */}
                <div className="premium-card" style={{
                  backgroundColor: 'rgba(15, 20, 35, 0.85)',
                  border: '1px solid rgba(0, 240, 255, 0.2)',
                  padding: '30px',
                  maxWidth: '600px',
                  margin: '0 auto 30px auto'
                }}>
                  <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-title)', color: '#00f0ff', marginBottom: '15px' }}>
                    XẾP HẠNG CHI TIẾT
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto' }}>
                    {leaderboard.slice(0, 10).map((p, idx) => (
                      <div key={idx} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        backgroundColor: 'rgba(9, 10, 15, 0.6)',
                        border: '1px solid rgba(0, 240, 255, 0.1)',
                        borderRadius: '6px'
                      }}>
                        <span style={{ fontSize: '0.9rem', fontWeight: idx === 0 ? 700 : 500, color: '#ffffff' }}>
                          #{idx + 1} {p.name}
                        </span>
                        <strong style={{ fontSize: '0.9rem', color: idx === 0 ? '#ffd700' : '#00f0ff' }}>
                          {p.score} pts
                        </strong>
                      </div>
                    ))}
                  </div>
                </div>

                <button onClick={resetToRoleSelection} style={{
                  padding: '14px 40px',
                  backgroundColor: '#00f0ff',
                  color: '#090a0f',
                  border: 'none',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}>
                  Trở lại màn hình chính
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
}
