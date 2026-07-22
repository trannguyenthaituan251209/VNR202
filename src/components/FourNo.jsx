import React from 'react';
import { Lock, Hammer, Wallet, Heart } from 'lucide-react';
import { VietDivider } from './VietnameseMotifs';
import QuoteCard from './QuoteCard';

export default function FourNo() {
  const strategies = [
    {
      title: 'Không thể',
      english: 'Cannot corrupt',
      icon: Lock,
      badge: 'Thể chế chặt chẽ',
      desc: 'Bịt kín mọi kẽ hở pháp lý, xây dựng hệ thống chính sách và quy định kiểm soát quyền lực khoa học, chặt chẽ để cán bộ không thể lợi dụng kẽ hở làm sai.',
      action: 'Hoàn thiện Luật PCTN 2018 mở rộng khu vực tư; số hóa thủ tục hành chính, tăng cường thanh tra giám sát tài sản công.'
    },
    {
      title: 'Không dám',
      english: 'Dare not corrupt',
      icon: Hammer,
      badge: 'Răn đe nghiêm khắc',
      desc: 'Xử lý nghiêm minh mọi hành vi vi phạm pháp luật với phương châm "không có vùng cấm, không có ngoại lệ, bất kể người đó là ai".',
      action: 'Thành lập Ban Chỉ đạo Trung ương trực thuộc Bộ Chính trị; đưa các vụ đại án ra xét xử công khai, thu hồi triệt để tài sản tham nhũng.'
    },
    {
      title: 'Không cần',
      english: 'Need not corrupt',
      icon: Wallet,
      badge: 'Đãi ngộ thỏa đáng',
      desc: 'Cải cách chính sách tiền lương và chế độ công vụ, đảm bảo thu nhập hợp lý giúp cán bộ công chức đủ sống và nuôi sống gia đình bằng lương.',
      action: 'Đẩy mạnh lộ trình cải cách tiền lương khu vực hành chính công; xây dựng chính sách nhà ở công vụ, đãi ngộ tài năng.'
    },
    {
      title: 'Không muốn',
      english: 'Want not corrupt',
      icon: Heart,
      badge: 'Đạo đức liêm chính',
      desc: 'Giáo dục lòng tự trọng, đạo đức công vụ và tinh thần phụng sự tổ quốc; hình thành văn hóa liêm chính để cán bộ tự thấy xấu hổ nếu tham nhũng.',
      action: 'Đưa nội dung phòng chống tham nhũng vào trường học theo Chỉ thị 10/CT-TTg; tôn vinh các tấm gương liêm khiết, trung thực.'
    }
  ];

  return (
    <section id="giai-phap" className="page-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-title-wrapper">
          <p className="section-subtitle">Chiến lược Quốc gia</p>
          <h2 className="section-title">Hệ Giải Pháp "4 Không"</h2>
        </div>

        {/* Intro quote */}
        <div style={{ marginBottom: '50px' }}>
          <QuoteCard
            text="“Tiền bạc lắm làm gì, chết có mang theo được đâu. Danh dự mới là điều thiêng liêng, cao quý nhất!”"
            highlight="Danh dự"
            author="CỐ TỔNG BÍ THƯ NGUYỄN PHÚ TRỌNG"
            subtitle="Giá trị cao quý nhất"
          />
        </div>

        {/* 2x2 Grid Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '30px'
        }} className="grid-2-cols">
          {strategies.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="premium-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px',
                  backgroundColor: 'var(--color-white)',
                  padding: '35px'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div>
                      <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-title)' }}>
                        {item.title}
                      </h3>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontStyle: 'italic', textTransform: 'lowercase' }}>
                        ({item.english})
                      </span>
                    </div>
                  </div>
                  <span className="lacquer-badge" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>
                    {item.badge}
                  </span>
                </div>

                <p style={{
                  fontSize: '0.95rem',
                  color: 'var(--color-text-primary)',
                  lineHeight: '1.6'
                }}>
                  {item.desc}
                </p>

                <div style={{
                  marginTop: 'auto',
                  paddingTop: '15px',
                  borderTop: '1px dashed rgba(197, 168, 128, 0.4)',
                  fontSize: '0.85rem',
                  color: 'var(--color-text-secondary)'
                }}>
                  <strong style={{ color: 'var(--color-lacquer)', display: 'block', marginBottom: '4px' }}>
                    Chính sách thực tế:
                  </strong>
                  {item.action}
                </div>
              </div>
            );
          })}
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
