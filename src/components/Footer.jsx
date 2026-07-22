import React from 'react';
import { Book, FileText, Award, Calendar } from 'lucide-react';
import { ChimLac } from './VietnameseMotifs';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--color-text-primary)',
      color: 'var(--color-bg)',
      padding: '60px 0 30px 0',
      position: 'relative',
      borderTop: '5px solid var(--color-gold-dark)'
    }}>
      {/* Decorative top strip showing golden geometric pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '4px',
        background: 'linear-gradient(90deg, var(--color-gold) 25%, var(--color-gold-glow) 50%, var(--color-gold) 75%)'
      }} />

      <div className="container">
        {/* Footer Top Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1.8fr',
          gap: '40px',
          marginBottom: '40px',
          borderBottom: '1px solid rgba(243, 236, 224, 0.1)',
          paddingBottom: '40px'
        }} className="grid-2-cols">
          
          {/* Credits Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ChimLac width={45} height={30} color="var(--color-gold-glow)" />
              <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.2rem', color: 'var(--color-gold-glow)' }}>
                VNR202 • ĐỀ TÀI 3.4
              </h3>
            </div>
            
            <p style={{ fontSize: '0.85rem', color: 'var(--color-gold-light)', lineHeight: '1.5' }}>
              Dự án website tương tác học tập và trình bày báo cáo về "Nguyên nhân và tác hại của tham nhũng" phục vụ môn học Lịch sử Đảng Cộng sản Việt Nam.
            </p>

            <div style={{ fontSize: '0.8rem', color: 'var(--color-bg-alt)', display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px' }}>
              <div>Nhóm thực hiện: <strong>Nhóm 3 - Lớp VNR202</strong></div>
              <div>Giảng viên hướng dẫn: <strong>Thầy/Cô phụ trách môn học</strong></div>
            </div>
          </div>

          {/* Documents and Citations */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-title)',
              fontSize: '1rem',
              color: 'var(--color-gold-glow)',
              marginBottom: '15px',
              letterSpacing: '1px'
            }}>
              TÀI LIỆU DẪN CHIẾU & CƠ SỞ PHÁP LÝ
            </h4>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px'
            }} className="grid-2-cols">
              
              {/* Document column 1 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
                  <Book size={16} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-gold-light)', lineHeight: '1.4' }}>
                    <strong>Tài liệu giảng dạy Bộ GD&ĐT:</strong> Tài liệu giảng dạy về PCTN dùng cho trường ĐH, CĐ không chuyên luật (2014), tr. 28-47.
                  </span>
                </div>
                
                <div style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
                  <FileText size={16} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-gold-light)', lineHeight: '1.4' }}>
                    <strong>Cơ sở pháp luật:</strong> Luật Phòng, chống tham nhũng năm 2018; Bộ luật Hình sự năm 2015 (sửa đổi 2017).
                  </span>
                </div>
              </div>

              {/* Document column 2 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
                  <Calendar size={16} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-gold-light)', lineHeight: '1.4' }}>
                    <strong>Văn kiện Đảng:</strong> Nghị quyết Trung ương 3 khóa X (Hội nghị TW3 khóa X ngày 21/8/2006) về tăng cường sự lãnh đạo của Đảng đối với PCTN.
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
                  <Award size={16} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-gold-light)', lineHeight: '1.4' }}>
                    <strong>Quyết định Chính phủ:</strong> Chiến lược quốc gia phòng, chống tham nhũng đến năm 2020 (NQ 21/NQ-CP).
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '15px',
          fontSize: '0.75rem',
          color: 'var(--color-gold-light)'
        }}>
          <div>
            © {new Date().getFullYear()} VNR202 Presentation Project. Phát triển cho mục đích học tập.
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <span>"Danh dự mới là điều thiêng liêng, cao quý nhất!"</span>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .grid-2-cols {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />
    </footer>
  );
}
