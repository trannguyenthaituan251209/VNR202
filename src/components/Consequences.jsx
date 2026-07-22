import React, { useState } from 'react';
import { Landmark, TrendingDown, Users2, ShieldAlert, Award, AlertCircle } from 'lucide-react';
import { VietDivider } from './VietnameseMotifs';

export default function Consequences() {
  const [activeCard, setActiveCard] = useState(0);

  const listConsequences = [
    {
      title: 'Tác hại về Chính trị',
      subtitle: 'Nghiêm trọng & Sinh tử nhất',
      icon: Landmark,
      color: 'var(--color-lacquer)',
      summary: 'Tham nhũng trực tiếp cản trở việc thực hiện chính sách đúng đắn của Đảng, ăn chặn ngân sách người nghèo và làm mục ruỗng tổ chức từ bên trong.',
      details: [
        {
          label: 'Cản trở chính sách',
          text: 'Lợi dụng chính sách hỗ trợ hộ nghèo, đền bù giải phóng mặt bằng, trợ giá... để trục lợi cá nhân, làm mất ý nghĩa nhân văn của chính sách.'
        },
        {
          label: 'Xói mòn lòng tin',
          text: 'Hành vi sách nhiễu làm người dân bức xúc, làm suy giảm lòng tin đối với sự lãnh đạo của Đảng và quản lý của Nhà nước.'
        },
        {
          label: 'Đe dọa chế độ',
          text: 'Chiến lược quốc gia PCTN ghi rõ: "Tham nhũng trở thành vật cản lớn cho thành công của công cuộc đổi mới... đe dọa sự tồn vong của chế độ".'
        },
        {
          label: 'Giảm uy tín quốc tế',
          text: 'Thất thoát nguồn vốn hỗ trợ phát triển ODA, gây nản lòng các nhà đầu tư nước ngoài khi đến Việt Nam kinh doanh.'
        }
      ]
    },
    {
      title: 'Tác hại về Kinh tế',
      subtitle: 'Thiệt hại đo lường bằng con số',
      icon: TrendingDown,
      color: 'var(--color-gold-dark)',
      summary: 'Tham nhũng làm tăng vọt chi phí giao dịch, rút ruột hạ tầng kỹ thuật và bòn rút ngân sách nhà nước thông qua nhiều chiêu trò trốn thuế, thầu phụ.',
      stats: [
        { value: '1.600 Tỷ $', label: 'Thiệt hại các nước đang phát triển hàng năm (Theo UNODC & WB)' },
        { value: '+25%', label: 'Tăng chi phí giao dịch tại nước đang phát triển (Theo Ngân hàng Thế giới)' },
        { value: '8.152 Tỷ', label: 'Số tiền kiến nghị thu hồi riêng năm 2010 qua thanh tra Việt Nam' },
        { value: '2.108 Ha', label: 'Diện tích đất sai phạm bị kiến nghị thu hồi trong năm 2010' }
      ],
      details: [
        {
          label: 'Rút ruột công trình',
          text: 'Cầu đường, trường học kém chất lượng do bị xà xẻo kinh phí, đe dọa trực tiếp đến tính mạng người sử dụng.'
        },
        {
          label: 'Méo mó thị trường',
          text: 'Doanh nghiệp yếu kém nhưng có "quan hệ và hối lộ" thắng thầu, gạt bỏ các đơn vị làm ăn chân chính có năng lực.'
        }
      ]
    },
    {
      title: 'Tác hại về Xã hội',
      subtitle: 'Băng hoại giá trị đạo đức',
      icon: Users2,
      color: 'var(--color-text-primary)',
      summary: 'Nguy hại lâu dài nhất khi tham nhũng bình thường hóa cái xấu, làm đảo lộn chuẩn mực đạo lý truyền thống và tấn công vào các lĩnh vực tôn kính nhất.',
      details: [
        {
          label: 'Bình thường hóa cái xấu',
          text: 'Các tệ nạn như "văn hóa phong bì", "chạy chức, chạy quyền, chạy điểm" vốn đáng lên án nay bị coi là lẽ hiển nhiên.'
        },
        {
          label: 'Xâm hại lĩnh vực tôn kính',
          text: 'Tham nhũng len lỏi vào y tế (nâng khống giá thiết bị) và giáo dục (chạy điểm, mua bằng), xâm hại lòng nhân ái.'
        },
        {
          label: 'Ăn chặn tiền cứu trợ',
          text: 'Một số cán bộ bòn rút tiền, quà hỗ trợ thiên tai dành cho đồng bào lũ lụt - xâm hại sâu sắc đạo lý "lá lành đùm lá rách".'
        },
        {
          label: 'Phân hóa giàu nghèo',
          text: 'Tài sản tập trung vào tay một số ít người lạm quyền, gia tăng bất công xã hội và tiềm ẩn xung đột lợi ích.'
        }
      ]
    }
  ];

  return (
    <section id="tac-hai" className="page-section">
      <div className="container">
        {/* Section Title */}
        <div className="section-title-wrapper">
          <p className="section-subtitle">Phần 2</p>
          <h2 className="section-title">3 Nhóm Tác Hại Lớn</h2>
        </div>

        {/* 3 Columns selector */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          marginBottom: '40px'
        }} className="cards-grid">
          {listConsequences.map((item, index) => {
            const Icon = item.icon;
            const isSelected = activeCard === index;
            return (
              <div
                key={index}
                onClick={() => setActiveCard(index)}
                className="premium-card"
                style={{
                  cursor: 'pointer',
                  textAlign: 'center',
                  backgroundColor: isSelected ? 'var(--color-white)' : 'rgba(255, 255, 255, 0.5)',
                  boxShadow: 'var(--shadow-sm)',
                  transform: 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-title)', marginBottom: '5px', marginTop: '15px' }}>
                  {item.title}
                </h3>
                <span style={{ fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--color-lacquer)', fontWeight: 'bold' }}>
                  {item.subtitle}
                </span>
              </div>
            );
          })}
        </div>

        {/* Deep Dive Panel */}
        <div className="premium-card" style={{
          backgroundColor: 'var(--color-white)',
          padding: '40px',
          animation: 'fadeIn 0.5s ease'
        }}>
          <h3 style={{
            fontSize: '1.6rem',
            fontFamily: 'var(--font-title)',
            marginBottom: '10px',
            color: listConsequences[activeCard].color
          }}>
            Chi tiết {listConsequences[activeCard].title}
          </h3>
          <p style={{
            fontSize: '1.05rem',
            color: 'var(--color-text-secondary)',
            marginBottom: '30px',
            lineHeight: '1.6'
          }}>
            {listConsequences[activeCard].summary}
          </p>

          {/* If economic: display statistics cards */}
          {listConsequences[activeCard].stats && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '16px',
              marginBottom: '35px'
            }} className="stats-grid">
              {listConsequences[activeCard].stats.map((stat, i) => (
                <div key={i} style={{
                  backgroundColor: 'var(--color-bg-alt)',
                  padding: '20px',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '1.6rem',
                    fontFamily: 'var(--font-title)',
                    fontWeight: 800,
                    color: 'var(--color-lacquer)',
                    marginBottom: '5px'
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: 'var(--color-text-primary)',
                    lineHeight: '1.3'
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Details bullet boxes */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px'
          }} className="grid-2-cols">
            {listConsequences[activeCard].details.map((detail, i) => (
              <div key={i} style={{
                padding: '20px',
                backgroundColor: 'rgba(197, 168, 128, 0.05)',
                borderRadius: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <h4 style={{ fontFamily: 'var(--font-title)', fontSize: '1rem', color: 'var(--color-text-primary)' }}>
                    {detail.label}
                  </h4>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>
                  {detail.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <VietDivider />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 992px) {
          .stats-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 768px) {
          .cards-grid {
            grid-template-columns: 1fr !important;
          }
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
          .grid-2-cols {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />
    </section>
  );
}
