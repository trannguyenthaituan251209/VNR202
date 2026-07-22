import React, { useState } from 'react';
import { MessageSquare, HelpCircle, User, ArrowRight } from 'lucide-react';
import { VietDivider } from './VietnameseMotifs';

export default function QAHub() {
  const [selectedQA, setSelectedQA] = useState(0);

  const qaData = [
    {
      question: 'Trong 5 nhóm nguyên nhân, nguyên nhân nào là gốc rễ nhất? Vì sao?',
      asker: 'Nhóm phản biện',
      answer: 'Nhóm nguyên nhân về con người (2.1.4 – suy thoái đạo đức và bất cập công tác cán bộ) là gốc rễ nhất. Lập luận: kẽ hở cơ chế chỉ là điều kiện; hành vi tham nhũng chỉ xảy ra khi con người có động cơ vụ lợi và sự suy thoái đạo đức. Tuy nhiên cần trả lời biện chứng: cơ chế và con người tác động qua lại – cơ chế lỏng lẻo làm hư hỏng con người, con người hư hỏng lại tìm cách duy trì cơ chế lỏng lẻo, nên phải xử lý đồng bộ cả hai.'
    },
    {
      question: 'Phân biệt tham nhũng với hành vi vi phạm pháp luật khác có yếu tố vụ lợi (trộm cắp, lừa đảo)?',
      asker: 'Giảng viên chấm điểm',
      answer: 'Điểm phân biệt cốt lõi là dấu hiệu chủ thể có chức vụ, quyền hạn và có sự lợi dụng chức vụ, quyền hạn đó để thực hiện hành vi trái luật. Ví dụ: thủ kho lấy tài sản kho mình quản lý = tham ô; công chức trộm tài sản ở cơ quan không liên quan đến chức trách của mình = trộm cắp thường.'
    },
    {
      question: 'Vì sao lương thấp mà không phải cán bộ nào cũng tham nhũng? Vậy lương thấp có thực sự là nguyên nhân?',
      asker: 'Nhóm phản biện',
      answer: 'Lương thấp chỉ là điều kiện thúc đẩy làm tăng cám dỗ và giảm sức đề kháng, không phải nguyên nhân quyết định. Yếu tố quyết định là phẩm chất đạo đức cán bộ và cơ chế kiểm soát quyền lực. Tuy nhiên, chính sách tiền lương chưa đảm bảo đời sống là một bất cập lớn cần giải quyết triệt để – vì vậy giải pháp "không cần tham nhũng" (cải cách tiền lương) vẫn là trụ cột trong chiến lược của Đảng.'
    },
    {
      question: 'Tài liệu nói pháp luật chưa điều chỉnh tham nhũng khu vực tư – hiện nay còn đúng không?',
      asker: 'Nhóm phản biện',
      answer: 'Hiện nay không còn đúng nguyên trạng. Luật Phòng chống tham nhũng 2018 đã mở rộng điều chỉnh sang doanh nghiệp, tổ chức khu vực ngoài nhà nước; Bộ luật Hình sự 2015 (sđ 2017) chính thức quy định xử lý hình sự tội tham ô tài sản và nhận hối lộ trong doanh nghiệp tư. Đây là bước nội luật hóa Công ước Liên Hợp Quốc về chống tham nhũng (UNCAC) của Việt Nam.'
    },
    {
      question: 'Tác hại nào của tham nhũng là nghiêm trọng nhất?',
      asker: 'Giảng viên chấm điểm',
      answer: 'Tác hại về chính trị là nghiêm trọng nhất. Thiệt hại kinh tế có thể bù đắp, chuẩn mực xã hội có thể phục hồi, nhưng mất lòng tin của nhân dân vào Đảng và chế độ là mất tất cả ("đe dọa sự tồn vong của chế độ"). Điều này bám sát tư tưởng "dân là gốc" của dân tộc ta.'
    },
    {
      question: 'Sinh viên chưa có chức vụ, quyền hạn thì "phòng, chống tham nhũng" bằng cách nào cho thực chất?',
      asker: 'Sinh viên hội trường',
      answer: 'Trọng tâm nhất của sinh viên là giữ liêm chính học thuật (không quay cóp, không đạo văn, không chạy điểm) và rèn luyện đạo đức nghề nghiệp trước khi bước vào thị trường lao động. Ngoài ra, sinh viên có trách nhiệm chấp hành luật pháp, lên tiếng đấu tranh với hành vi tiêu cực và đóng góp ý kiến xây dựng chính sách.'
    }
  ];

  return (
    <section id="hoi-dap" className="page-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-title-wrapper">
          <p className="section-subtitle">Phụ lục 1</p>
          <h2 className="section-title">Hỏi Đáp Phản Biện</h2>
        </div>

        {/* Q&A Interactive Dashboard */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1.8fr',
          gap: '30px',
          maxWidth: '1000px',
          margin: '0 auto'
        }} className="grid-2-cols">
          
          {/* Question List (Left Column) */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <h3 style={{
              fontSize: '1rem',
              fontFamily: 'var(--font-title)',
              color: 'var(--color-gold-dark)',
              marginBottom: '10px',
              borderBottom: '1px solid rgba(197, 168, 128, 0.3)',
              paddingBottom: '8px'
            }}>
              CÂU HỎI THƯỜNG GẶP (PHẢN BIỆN)
            </h3>
            {qaData.map((qa, index) => {
              const isSelected = selectedQA === index;
              return (
                <button
                  key={index}
                  onClick={() => setSelectedQA(index)}
                  style={{
                    display: 'flex',
                    alignItems: 'start',
                    gap: '10px',
                    padding: '14px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: isSelected ? 'rgba(158, 43, 30, 0.12)' : 'var(--color-white)',
                    color: 'var(--color-text-primary)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: 'none'
                  }}
                >
                  <div>
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                      color: 'var(--color-text-secondary)',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: '2px'
                    }}>
                      {qa.asker}
                    </span>
                    <p style={{
                      fontSize: '0.85rem',
                      fontWeight: isSelected ? 600 : 400,
                      lineHeight: '1.4'
                    }}>
                      {qa.question}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Chat Dialogue (Right Column) */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <h3 style={{
              fontSize: '1rem',
              fontFamily: 'var(--font-title)',
              color: 'var(--color-gold-dark)',
              marginBottom: '10px',
              borderBottom: '1px solid rgba(197, 168, 128, 0.3)',
              paddingBottom: '8px'
            }}>
              MÔ PHỎNG GIẢI ĐÁP PHẢN BIỆN
            </h3>

            {/* Chat Bubble 1: The Question */}
            <div style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'start',
              animation: 'fadeIn 0.3s ease'
            }}>
              <div style={{
                backgroundColor: 'var(--color-bg-alt)',
                padding: '16px 20px',
                borderRadius: '0 12px 12px 12px',
                border: 'none',
                boxShadow: 'var(--shadow-sm)',
                maxWidth: '85%'
              }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-gold-dark)', display: 'block', marginBottom: '4px' }}>
                  {qaData[selectedQA].asker} đặt câu hỏi:
                </span>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-text-primary)', fontWeight: 600, lineHeight: '1.4' }}>
                  "{qaData[selectedQA].question}"
                </p>
              </div>
            </div>

            {/* Arrow transition */}
            <div style={{ display: 'flex', justifyContent: 'center', margin: '-5px 0' }}>
              <ArrowRight size={20} color="var(--color-gold)" style={{ transform: 'rotate(90deg)' }} />
            </div>

            {/* Chat Bubble 2: The Answer */}
            <div style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'start',
              flexDirection: 'row-reverse',
              animation: 'fadeIn 0.5s ease'
            }}>
              <div style={{
                backgroundColor: 'var(--color-bg-alt)',
                padding: '20px',
                borderRadius: '12px 0 12px 12px',
                border: 'none',
                boxShadow: 'var(--shadow-sm)',
                maxWidth: '85%'
              }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-lacquer)', display: 'block', marginBottom: '6px' }}>
                  Nhóm thuyết trình trả lời (Speaker Notes):
                </span>
                <p style={{
                  fontSize: '0.95rem',
                  color: 'var(--color-text-primary)',
                  lineHeight: '1.6',
                  textAlign: 'justify'
                }}>
                  {qaData[selectedQA].answer}
                </p>
              </div>
            </div>

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
