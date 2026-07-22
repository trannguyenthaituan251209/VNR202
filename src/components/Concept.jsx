import React, { useState } from 'react';
import { ShieldCheck, UserCheck, Scale, AlertOctagon, HelpCircle } from 'lucide-react';
import { VietDivider } from './VietnameseMotifs';

export default function Concept() {
  const [activeTab, setActiveTab] = useState(0);
  const [showExample, setShowExample] = useState(false);

  const characteristics = [
    {
      title: 'Chủ thể có chức vụ, quyền hạn',
      subtitle: 'Dấu hiệu phân biệt cốt lõi',
      icon: UserCheck,
      desc: 'Người có chức vụ, quyền hạn bao gồm cán bộ, công chức, viên chức; người đại diện vốn nhà nước; hoặc người giữ chức danh quản lý trong doanh nghiệp, tổ chức (cả khu vực công và tư).',
      example: 'Đây là đặc điểm phân biệt tham nhũng với các tội danh thông thường khác như trộm cắp hay cướp giật tài sản.'
    },
    {
      title: 'Lợi dụng chức vụ, quyền hạn',
      subtitle: 'Sử dụng quyền lực làm phương tiện',
      icon: Scale,
      desc: 'Chủ thể sử dụng quyền lực pháp luật giao hoặc quyền lực thực tế có được từ vị trí của mình để thực hiện hành vi trái pháp luật, biến công quyền thành công cụ phục vụ mục đích cá nhân.',
      example: 'Lạm quyền duyệt dự án trái quy định, duyệt cấp phép kinh doanh để lấy lợi ích cá nhân.'
    },
    {
      title: 'Mục đích/Động cơ vụ lợi',
      subtitle: 'Mưu cầu lợi ích riêng',
      icon: ShieldCheck,
      desc: 'Hành vi được thúc đẩy bởi việc mong muốn đạt được lợi ích vật chất (tiền bạc, đất đai, quà tặng) hoặc phi vật chất (địa vị, quyền lực, thăng tiến) cho bản thân, gia đình hoặc nhóm lợi ích của mình.',
      example: 'Hối lộ để được ưu tiên nâng lương, thăng chức, bỏ qua sai phạm.'
    }
  ];

  return (
    <section id="khai-niem" className="page-section">
      <div className="container">
        {/* Section Title */}
        <div className="section-title-wrapper">
          <p className="section-subtitle">Nền tảng lý luận</p>
          <h2 className="section-title">Khái niệm & Đặc điểm</h2>
        </div>

        {/* Definition Hero Box */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px', marginBottom: '50px' }} className="grid-layout">
          <div className="premium-card" style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(243,236,224,0.6) 100%)'
          }}>
            <span className="lacquer-badge" style={{ marginBottom: '15px' }}>Định nghĩa pháp luật</span>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.25rem',
              color: 'var(--color-text-primary)',
              lineHeight: '1.6',
              fontWeight: '600'
            }}>
              “Tham nhũng là hành vi của người có chức vụ, quyền hạn đã lợi dụng chức vụ, quyền hạn đó vì vụ lợi.”
            </p>
            <p style={{
              fontSize: '0.85rem',
              color: 'var(--color-text-secondary)',
              marginTop: '10px',
              fontStyle: 'italic'
            }}>
              — Theo quy định tại Luật Phòng, chống tham nhũng Việt Nam hiện hành.
            </p>
          </div>
        </div>

        {/* Interactive Tabs for 3 Characteristics */}
        <div style={{ marginBottom: '50px' }}>
          <h3 style={{
            fontFamily: 'var(--font-title)',
            fontSize: '1.3rem',
            textAlign: 'center',
            marginBottom: '30px',
            color: 'var(--color-gold-dark)'
          }}>
            3 ĐẶC ĐIỂM (DẤU HIỆU) BẮT BUỘC CỦA HÀNH VI
          </h3>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '30px'
          }}>
            {/* Tab navigation headers */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              justifyContent: 'center'
            }} className="tab-headers">
              {characteristics.map((char, index) => {
                const Icon = char.icon;
                const isActive = activeTab === index;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '14px 20px',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: isActive ? 'var(--color-gold)' : 'rgba(197, 168, 128, 0.12)',
                      color: isActive ? 'var(--color-white)' : 'var(--color-text-primary)',
                      fontFamily: 'var(--font-title)',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      boxShadow: 'none',
                      transition: 'var(--transition-fast)',
                    }}
                  >
                    {char.title}
                  </button>
                );
              })}
            </div>

            {/* Tab active content card */}
            <div className="premium-card" style={{
              animation: 'fadeIn 0.5s ease',
              padding: '40px',
              backgroundColor: 'var(--color-white)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                marginBottom: '20px'
              }}>
                <div>
                  <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-lacquer)', fontWeight: 'bold' }}>
                    {characteristics[activeTab].subtitle}
                  </span>
                  <h4 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-title)', marginTop: '2px' }}>
                    {characteristics[activeTab].title}
                  </h4>
                </div>
              </div>

              <p style={{
                fontSize: '1.05rem',
                color: 'var(--color-text-primary)',
                lineHeight: '1.7',
                marginBottom: '20px'
              }}>
                {characteristics[activeTab].desc}
              </p>

              <div style={{
                backgroundColor: 'var(--color-bg-alt)',
                padding: '20px',
                borderRadius: '8px'
              }}>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-gold-dark)', display: 'block', marginBottom: '4px' }}>
                  Bản chất pháp lý:
                </span>
                <p style={{ fontSize: '0.95rem', fontStyle: 'italic', color: 'var(--color-text-secondary)' }}>
                  {characteristics[activeTab].example}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal update and Interactive simulation box */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }} className="grid-2-cols">
          {/* Legal updates */}
          <div className="premium-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                <h4 style={{ fontFamily: 'var(--font-title)', fontSize: '1.2rem' }}>Cập nhật pháp luật hiện hành</h4>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', marginBottom: '15px', lineHeight: '1.6' }}>
                Tài liệu Bộ GD&ĐT soạn năm 2014 dựa trên Luật PCTN 2005 (chỉ xử lý tham nhũng khu vực nhà nước).
              </p>
              <ul style={{ paddingLeft: '20px', fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--color-text-primary)' }}>
                <li>
                  <strong>Luật PCTN 2018:</strong> Mở rộng phạm vi điều chỉnh sang <strong>khu vực ngoài nhà nước</strong> (doanh nghiệp tư nhân, công ty đại chúng).
                </li>
                <li>
                  <strong>Bộ luật Hình sự 2015 (sđ 2017):</strong> Xử lý hình sự các hành vi như <em>Tham ô tài sản</em>, <em>Nhận hối lộ</em> trong khu vực tư nhân.
                </li>
              </ul>
            </div>
            <div style={{ marginTop: '20px', fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--color-lacquer)', fontWeight: '600' }}>
              * Đây là điểm cộng đặc biệt khi trả lời phản biện thuyết trình môn VNR202.
            </div>
          </div>

          {/* Interactive Simulation: Distinguishing Corruption */}
          <div className="premium-card" style={{ backgroundColor: 'rgba(197, 168, 128, 0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
              <h4 style={{ fontFamily: 'var(--font-title)', fontSize: '1.2rem' }}>Ví dụ tương tác: Phân biệt hành vi</h4>
            </div>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-primary)', marginBottom: '15px' }}>
              Làm sao để phân biệt <strong>Tham ô tài sản (Tham nhũng)</strong> với hành vi <strong>Trộm cắp</strong> thông thường có vụ lợi?
            </p>

            <button
              onClick={() => setShowExample(!showExample)}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: 'transparent',
                border: '1.5px solid var(--color-lacquer)',
                color: 'var(--color-lacquer)',
                borderRadius: '6px',
                fontFamily: 'var(--font-title)',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'var(--transition-fast)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--color-lacquer)';
                e.target.style.color = 'var(--color-white)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = 'var(--color-lacquer)';
              }}
            >
              {showExample ? 'Ẩn ví dụ thực tế' : 'Xem ví dụ thực tế (Slide 3)'}
            </button>

            {showExample && (
              <div style={{
                marginTop: '15px',
                padding: '15px',
                backgroundColor: 'var(--color-bg-alt)',
                borderRadius: '6px',
                fontSize: '0.9rem',
                lineHeight: '1.5',
                animation: 'fadeIn 0.3s ease'
              }}>
                <p style={{ marginBottom: '8px' }}>
                  <strong>Trường hợp 1 (Tham ô):</strong> Một thủ kho lợi dụng quyền giữ chìa khóa, lấy tài sản trong chính kho mình quản lý đem bán lấy tiền. 
                  <br />
                  <span style={{ color: 'var(--color-lacquer)', fontWeight: 'bold' }}>→ Tham nhũng</span> (do có chức trách quản lý và lợi dụng nó).
                </p>
                <p>
                  <strong>Trường hợp 2 (Trộm cắp):</strong> Thủ kho này lẻn sang kho của phòng ban khác (nơi không thuộc thẩm quyền quản lý của mình) trộm tài sản.
                  <br />
                  <span style={{ color: 'var(--color-gold-dark)', fontWeight: 'bold' }}>→ Trộm cắp thường</span> (không lợi dụng chức trách quản lý).
                </p>
              </div>
            )}
          </div>
        </div>

        <VietDivider />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .grid-2-cols {
            grid-template-columns: 1fr !important;
          }
          .tab-headers {
            flex-direction: column;
            width: 100%;
          }
          .tab-headers button {
            width: 100%;
            justify-content: center;
          }
        }
      `}} />
    </section>
  );
}
