import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, ShieldAlert, Award, HelpCircle } from 'lucide-react';
import { VietDivider } from './VietnameseMotifs';

export default function StudentAction() {
  const [answers, setAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState({});

  const scenarios = [
    {
      id: 'sc1',
      question: 'Trong buổi học sáng, do ngủ quên nên bạn định nhờ bạn cùng phòng điểm danh hộ. Hành vi này có bản chất gì?',
      options: [
        {
          key: 'A',
          text: 'Chỉ là việc giúp đỡ bạn bè thông thường, không có gì to tát.',
          isCorrect: false,
          feedback: 'Sai rồi! Việc nhờ điểm danh hộ bản chất là hành vi "khai khống" – nhận quyền lợi (điểm danh chuyên cần) mà bản thân không thực tế thực hiện. Đây là mầm mống tư tưởng của việc làm khống hồ sơ nhận tiền chính sách trong tham nhũng lớn.'
        },
        {
          key: 'B',
          text: 'Một dạng gian lận nhỏ, thể hiện sự thiếu trung thực và không liêm chính.',
          isCorrect: true,
          feedback: 'Chính xác! Tham nhũng lớn ngày mai bắt đầu từ tiêu cực nhỏ hôm nay. Nhờ điểm danh hộ dùng chung một logic với việc khai khống đối tượng nhận hỗ trợ để tham ô ngân sách.'
        }
      ]
    },
    {
      id: 'sc2',
      question: 'Bạn gặp bài tập nhóm khó và quyết định sao chép hoặc mua báo cáo của khóa trước để nộp. Bản chất hành vi này tương đồng với hành vi nào?',
      options: [
        {
          key: 'A',
          text: 'Đạo văn và gian lận học thuật, tương ứng với hành vi cướp công, tham ô kết quả.',
          isCorrect: true,
          feedback: 'Chính xác! Đạo văn, sao chép kết quả chính là phiên bản học đường của việc "tham ô, chiếm đoạt tài sản trí tuệ", dùng tiền bạc và gian dối để chiếm lấy thứ mình không xứng đáng.'
        },
        {
          key: 'B',
          text: 'Tiết kiệm thời gian hợp lý vì bài quá khó và không có ứng dụng thực tế.',
          isCorrect: false,
          feedback: 'Thỏa hiệp với gian lận học thuật hôm nay sẽ tạo ra thói quen thỏa hiệp với tham nhũng lớn ngày mai khi nắm giữ quyền lực thực tế.'
        }
      ]
    },
    {
      id: 'sc3',
      question: 'Bạn phát hiện một người bạn trong lớp đang "chạy điểm" một môn học chuyên ngành. Bạn nên làm gì?',
      options: [
        {
          key: 'A',
          text: 'Im lặng cho qua để giữ tình bạn, tránh mang tiếng là kẻ mách lẻo.',
          isCorrect: false,
          feedback: 'Thái độ "nể nang, né tránh, dung túng" này chính là nguyên nhân số 3 dẫn đến việc tham nhũng không bị phát hiện và phát triển thành đại án.'
        },
        {
          key: 'B',
          text: 'Báo cáo lên giảng viên hoặc phản ánh qua kênh ẩn danh của nhà trường.',
          isCorrect: true,
          feedback: 'Chính xác! Dũng cảm lên tiếng trước tiêu cực chính là trách nhiệm của công dân và sinh viên để xây dựng môi trường học thuật liêm chính.'
        }
      ]
    }
  ];

  const handleSelectOption = (scenarioId, optionKey, isCorrect) => {
    setAnswers({
      ...answers,
      [scenarioId]: optionKey
    });
    setShowFeedback({
      ...showFeedback,
      [scenarioId]: true
    });
  };

  const getScore = () => {
    let score = 0;
    scenarios.forEach((sc) => {
      const selected = answers[sc.id];
      const correctOption = sc.options.find(opt => opt.isCorrect);
      if (selected === correctOption.key) {
        score += 1;
      }
    });
    return score;
  };

  const isCompleted = Object.keys(answers).length === scenarios.length;

  return (
    <section id="trach-nhiem" className="page-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-title-wrapper">
          <p className="section-subtitle">Vai trò thanh niên</p>
          <h2 className="section-title">Trách Nhiệm Của Sinh Viên</h2>
        </div>

        {/* Info Board */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '30px', marginBottom: '50px' }} className="grid-2-cols">
          <div className="premium-card" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.2rem' }}>
                4 Trụ Cột Liêm Chính Học Đường
              </h3>
            </div>
            
            <ol style={{
              paddingLeft: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              fontSize: '0.95rem',
              color: 'var(--color-text-primary)'
            }}>
              <li>
                <strong>Học thật - Thi thật:</strong> Nói không với gian lận thi cử, đạo văn, mua bán tiểu luận, "chạy điểm" môn học.
              </li>
              <li>
                <strong>Tìm hiểu pháp luật:</strong> Chủ động nâng cao hiểu biết về pháp luật PCTN và quy chế liêm chính của nhà trường.
              </li>
              <li>
                <strong>Dũng cảm đấu tranh:</strong> Lên án, không dung túng hay bao che cho các hành vi tiêu cực trong học tập.
              </li>
              <li>
                <strong>Rèn luyện đạo đức công vụ:</strong> Xây dựng lòng tự trọng và ý thức liêm chính trước khi bước vào thị trường lao động.
              </li>
            </ol>
          </div>

          {/* Interactive Questionnaire */}
          <div className="premium-card" style={{
            backgroundColor: 'var(--color-white)',
            border: 'none'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.2rem' }}>
                Tương tác: Đánh giá nhận thức liêm chính
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              {scenarios.map((sc, scIndex) => {
                const selectedKey = answers[sc.id];
                const feedbackVisible = showFeedback[sc.id];
                const selectedOption = sc.options.find(opt => opt.key === selectedKey);

                return (
                  <div key={sc.id} style={{
                    paddingBottom: scIndex !== scenarios.length - 1 ? '20px' : '0',
                    borderBottom: scIndex !== scenarios.length - 1 ? '1px solid rgba(197, 168, 128, 0.25)' : 'none'
                  }}>
                    <p style={{
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      color: 'var(--color-text-primary)',
                      marginBottom: '12px'
                    }}>
                      Tình huống {scIndex + 1}: {sc.question}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '10px' }}>
                      {sc.options.map((opt) => {
                        const isSelected = selectedKey === opt.key;
                        return (
                          <button
                            key={opt.key}
                            onClick={() => handleSelectOption(sc.id, opt.key, opt.isCorrect)}
                            style={{
                              padding: '10px 15px',
                              borderRadius: '6px',
                              border: 'none',
                              backgroundColor: isSelected ? 'rgba(158, 43, 30, 0.12)' : 'rgba(197, 168, 128, 0.08)',
                              color: 'var(--color-text-primary)',
                              fontSize: '0.9rem',
                              textAlign: 'left',
                              cursor: 'pointer',
                              fontWeight: isSelected ? '600' : '400',
                              transition: 'var(--transition-fast)'
                            }}
                          >
                            <strong>{opt.key}.</strong> {opt.text}
                          </button>
                        );
                      })}
                    </div>

                    {feedbackVisible && selectedOption && (
                      <div style={{
                        display: 'flex',
                        gap: '10px',
                        padding: '12px',
                        borderRadius: '6px',
                        backgroundColor: selectedOption.isCorrect ? 'rgba(46, 117, 89, 0.08)' : 'rgba(158, 43, 30, 0.08)',
                        fontSize: '0.85rem',
                        animation: 'fadeIn 0.3s ease'
                      }}>
                        <div style={{ marginTop: '2px' }}>
                          {selectedOption.isCorrect ? (
                            <CheckCircle2 size={16} color="#2E7559" />
                          ) : (
                            <ShieldAlert size={16} color="var(--color-lacquer)" />
                          )}
                        </div>
                        <div style={{ color: 'var(--color-text-secondary)' }}>
                          {selectedOption.feedback}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Score Summary */}
            {isCompleted && (
              <div style={{
                marginTop: '30px',
                padding: '20px',
                borderRadius: '8px',
                backgroundColor: 'rgba(197, 168, 128, 0.15)',
                border: 'none',
                textAlign: 'center',
                animation: 'fadeIn 0.5s ease'
              }}>
                <h4 style={{ fontFamily: 'var(--font-title)', fontSize: '1.1rem', marginBottom: '5px' }}>
                  KẾT QUẢ ĐÁNH GIÁ
                </h4>
                <p style={{ fontSize: '0.95rem' }}>
                  Bạn trả lời đúng <strong>{getScore()} / {scenarios.length}</strong> câu hỏi tư duy liêm chính!
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '5px', fontStyle: 'italic' }}>
                  Hãy luôn giữ vững lòng tự trọng học thuật để chuẩn bị cho một sự nghiệp sạch tương lai!
                </p>
              </div>
            )}
          </div>
        </div>

        <VietDivider />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .grid-2-cols {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />
    </section>
  );
}
