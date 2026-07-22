import React, { useState } from 'react';
import { BookOpen, Settings, AlertTriangle, Users, Volume2, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { VietDivider } from './VietnameseMotifs';

export default function Causes() {
  const [expandedCause, setExpandedCause] = useState(0);

  const causesList = [
    {
      id: 1,
      title: 'Hạn chế trong chính sách, pháp luật',
      subtitle: 'Slide 4 - Mục 2.1.1',
      icon: BookOpen,
      bulletPoints: [
        'Hạn chế trong thực thi chính sách: đền bù, trợ giá, vay ưu đãi... thiếu công khai, minh bạch tạo rào cản buộc dân phải có "thỏa thuận/chi phí".',
        'Cơ chế "xin - cho", bao cấp, độc quyền tạo đất sống cho tham nhũng.',
        'Hệ thống pháp luật còn chồng chéo, mâu thuẫn (ví dụ: Luật PCTN coi đưa hối lộ bởi người có chức vụ là tham nhũng, nhưng BLHS không xếp vào nhóm tội phạm tham nhũng).',
        'Thiếu văn bản hướng dẫn chi tiết gây ra sự áp dụng tùy tiện của cán bộ.'
      ],
      quote: 'NQ Trung ương 3 khóa X: "Cơ chế, chính sách, pháp luật chưa hoàn thiện, thiếu đồng bộ, còn nhiều sơ hở, nhưng chậm được sửa đổi, bổ sung".',
      speakerNotes: 'Nhóm nguyên nhân đầu tiên nằm ở chính sách và pháp luật. Nhà nước có nhiều chính sách hỗ trợ tốt nhưng triển khai thiếu minh bạch. Một số cán bộ làm giả hồ sơ để tham ô. Về luật, thời điểm 2014 chưa quy định khu vực tư, chưa bảo vệ người tố cáo tốt. Nhiều quy định đất đai chồng chéo tạo kẽ hở vòi vĩnh.'
    },
    {
      id: 2,
      title: 'Hạn chế trong quản lý, điều hành kinh tế & cơ quan nhà nước',
      subtitle: 'Slide 5 - Mục 2.1.2',
      icon: Settings,
      bulletPoints: [
        'Phân công trách nhiệm, quyền hạn chồng chéo, quyền lực giao rất lớn nhưng chế độ trách nhiệm cá nhân không rõ ràng.',
        'Công cụ thanh tra, kiểm kê, kiểm toán chưa được tiến hành thường xuyên, nghiêm túc.',
        'Nhà nước can thiệp sâu tạo khan hiếm giả tạo thông qua cấp phép → tạo động cơ hối lộ để chạy giấy phép.',
        'Cải cách hành chính chậm, thủ tục rườm rà buộc doanh nghiệp phải "bôi trơn" để đẩy nhanh tiến độ.'
      ],
      quote: 'Tài liệu phân tích: Khi cơ chế quản lý mới chưa theo kịp kinh tế thị trường, tài sản công giao cho cá nhân nắm giữ không đi kèm trách nhiệm giám sát chặt chẽ sẽ tạo ra thất thoát lớn.',
      speakerNotes: 'Nguyên nhân từ bộ máy quản lý: chúng ta chuyển dịch sang kinh tế thị trường nhưng cơ chế quản lý chưa theo kịp. Tài sản công giao cho cá nhân với quyền rất lớn nhưng khi thất thoát lại khó quy trách nhiệm cá nhân. Việc can thiệp bằng giấy phép tạo khan hiếm giả, buộc doanh nghiệp phải chung chi để được cấp phép.'
    },
    {
      id: 3,
      title: 'Hạn chế trong việc phát hiện và xử lý tham nhũng',
      subtitle: 'Slide 6 - Mục 2.1.3',
      icon: AlertTriangle,
      bulletPoints: [
        'Thiếu cơ chế khuyến khích và bảo vệ người tố cáo, khiến cấp dưới sợ bị trù dập, trả thù.',
        'Quy định trách nhiệm người đứng đầu vô tình tạo tâm lý che giấu nội bộ nhằm giữ thành tích thi đua.',
        'Cơ quan thanh tra phụ thuộc cơ quan quản lý cùng cấp nên thiếu tính độc lập khách quan.',
        'Cơ quan tư pháp: tỷ lệ phá án tham nhũng thấp, án kéo dài, chuyển xử lý hình sự sang hành chính làm giảm răn đe.'
      ],
      quote: 'NQ 04-NQ/TW thẳng thắn chỉ rõ: Nhiều nơi có biểu hiện "nể nang, né tránh, dung túng, bao che cho tham nhũng, lãng phí".',
      speakerNotes: 'Vì sao tham nhũng khó bị phát hiện? Người biết rõ nhất là cấp dưới nhưng họ sợ bị trả thù do thiếu luật bảo vệ. Quy định kỷ luật người đứng đầu lại tạo tác dụng ngược: họ có xu hướng đóng cửa bảo nhau để tránh mất thi đua. Thanh tra thiếu độc lập, tư pháp xử lý nhẹ khiến rủi ro bị trừng phạt quá nhỏ so với món lợi khổng lồ.'
    },
    {
      id: 4,
      title: 'Hạn chế trong nhận thức, tư tưởng & công tác cán bộ',
      subtitle: 'Slide 7 - Mục 2.1.4 (Nguyên nhân cốt lõi)',
      icon: Users,
      bulletPoints: [
        'Sự xuống cấp đạo đức của một bộ phận cán bộ mang tâm lý bao cấp, hách dịch, cửa quyền, đòi ăn chia phần trăm.',
        'Lối sống suy thoái, thực dụng, coi trọng đồng tiền, muốn hưởng thụ hơn là cống hiến.',
        'Quy hoạch, bổ nhiệm cán bộ bị ảnh hưởng bởi cục bộ, bè phái, tạo thành "đường dây khép kín" vô hiệu hóa kiểm soát nội bộ.',
        'Nghịch lý: Người tích cực tố cáo bị luân chuyển hoặc trù dập, trong khi kẻ tham nhũng tiếp tục thăng quan tiến chức.'
      ],
      quote: 'NQ Trung ương 3 khóa X: "Một bộ phận không nhỏ đảng viên, cán bộ, công chức suy thoái về tư tưởng chính trị, phẩm chất đạo đức, lối sống".',
      speakerNotes: 'Đây là nguyên nhân gốc rễ thuộc về yếu tố con người. Kẽ hở cơ chế chỉ là điều kiện, còn lòng tham và sự suy thoái đạo đức mới là động cơ hành động. Tư tưởng cục bộ, nâng đỡ bè phái tạo ra các nhóm lợi ích khép kín. Đau lòng hơn khi có nơi dập tắt tiếng nói trung thực và thăng chức cho kẻ sai phạm.'
    },
    {
      id: 5,
      title: 'Hạn chế trong tuyên truyền, phổ biến giáo dục pháp luật',
      subtitle: 'Slide 8 - Mục 2.1.5',
      icon: Volume2,
      bulletPoints: [
        'Phạm vi tuyên truyền hẹp: mới chủ yếu trong nội bộ các cơ quan, chưa sâu rộng tới các tầng lớp nhân dân.',
        'Hình thức đơn điệu: chủ yếu báo cáo một chiều từ báo cáo viên, thiếu hình thức sinh động trực quan (internet, kịch nghệ, thi tìm hiểu).',
        'Nội dung khô khan: nặng lý thuyết đọc luật, chưa phù hợp với từng đối tượng cụ thể (nông dân, công nhân, học sinh sinh viên).'
      ],
      quote: 'Chỉ thị 10/CT-TTg năm 2013: Yêu cầu đưa nội dung phòng chống tham nhũng vào giảng dạy tại các cơ sở giáo dục đào tạo toàn quốc.',
      speakerNotes: 'Nguyên nhân cuối cùng là giáo dục pháp luật yếu kém trên cả 3 mặt: phạm vi hẹp (dân chưa biết quyền của mình), hình thức khô khan, nội dung xa rời thực tế. Chỉ thị 10 của Thủ tướng chính là giải pháp khắc phục vấn đề này, đưa PCTN vào giảng đường đại học để xây dựng tư tưởng liêm chính cho thế hệ trẻ.'
    }
  ];

  return (
    <section id="nguyen-nhan" className="page-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-title-wrapper">
          <p className="section-subtitle">Phần 1</p>
          <h2 className="section-title">5 Nhóm Nguyên Nhân</h2>
        </div>

        {/* Cause Accordion Layout */}
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {causesList.map((cause, index) => {
            const Icon = cause.icon;
            const isExpanded = expandedCause === index;
            return (
              <div
                key={cause.id}
                className="premium-card"
                style={{
                  padding: '24px',
                  backgroundColor: isExpanded ? 'rgba(197, 168, 128, 0.08)' : 'var(--color-white)',
                  transition: 'var(--transition-normal)'
                }}
              >
                {/* Cause Accordion Header */}
                <div
                  onClick={() => setExpandedCause(isExpanded ? null : index)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 600, display: 'block', textTransform: 'uppercase' }}>
                        {cause.subtitle}
                      </span>
                      <h4 style={{
                        fontSize: '1.15rem',
                        fontFamily: 'var(--font-title)',
                        marginTop: '2px',
                        color: isExpanded ? 'var(--color-lacquer)' : 'var(--color-text-primary)'
                      }}>
                        {cause.id}. {cause.title}
                      </h4>
                    </div>
                  </div>
                  <div>
                    {isExpanded ? <ChevronUp size={20} color="var(--color-lacquer)" /> : <ChevronDown size={20} color="var(--color-gold-dark)" />}
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div style={{
                    marginTop: '20px',
                    borderTop: '1px solid rgba(197, 168, 128, 0.2)',
                    paddingTop: '20px',
                    animation: 'slideDown 0.3s ease'
                  }}>
                    {/* Bullet Points */}
                    <ul style={{
                      paddingLeft: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      fontSize: '0.95rem',
                      color: 'var(--color-text-primary)',
                      marginBottom: '20px'
                    }}>
                      {cause.bulletPoints.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>

                    {/* Resolution Quote */}
                    <div style={{
                      fontFamily: 'var(--font-serif)',
                      fontStyle: 'italic',
                      fontSize: '0.9rem',
                      color: 'var(--color-lacquer)',
                      padding: '12px 16px',
                      backgroundColor: 'var(--color-bg-alt)',
                      borderRadius: '6px'
                    }}>
                      "{cause.quote}"
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>

        <VietDivider />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideDown {
          from { opacity: 0; max-height: 0; }
          to { opacity: 1; max-height: 1000px; }
        }
      `}} />
    </section>
  );
}
