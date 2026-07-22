import React from 'react';
import { ArrowDown, Flame } from 'lucide-react';
import { DongSonStar, ChimLac } from './VietnameseMotifs';
import QuoteCard from './QuoteCard';

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 0',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, var(--color-bg) 0%, var(--color-bg-alt) 100%)',
      }}
    >
      {/* Background Rotating Dong Son Star */}
      <div
        style={{
          position: 'absolute',
          right: '-10%',
          top: '10%',
          opacity: 0.1,
          pointerEvents: 'none',
        }}
        className="drum-rotate"
      >
        <DongSonStar size={600} color="var(--color-gold-dark)" />
      </div>

      <div
        style={{
          position: 'absolute',
          left: '-5%',
          bottom: '-10%',
          opacity: 0.08,
          pointerEvents: 'none',
        }}
        className="drum-rotate"
      >
        <DongSonStar size={400} color="var(--color-gold-dark)" />
      </div>

      {/* Floating Chim Lac Icons in the air */}
      <div style={{ position: 'absolute', top: '15%', left: '10%', opacity: 0.3 }} className="chim-lac-float">
        <ChimLac width={80} height={50} color="var(--color-gold)" />
      </div>
      <div style={{ position: 'absolute', top: '40%', right: '15%', opacity: 0.25 }} className="chim-lac-float">
        <ChimLac width={60} height={40} color="var(--color-gold-dark)" flip={true} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
        {/* Topic Badge */}
        <div style={{ marginBottom: '20px' }}>
          <span className="lacquer-badge">
            Đề tài 3.4
          </span>
          <span style={{
            marginLeft: '10px',
            fontFamily: 'var(--font-title)',
            fontWeight: 700,
            color: 'var(--color-gold-dark)',
            fontSize: '0.9rem'
          }}>
            VNR202 • LỊCH SỬ ĐẢNG CỘNG SẢN VIỆT NAM
          </span>
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: 'clamp(2.2rem, 5vw, 4.2rem)',
          fontFamily: 'var(--font-title)',
          lineHeight: '1.2',
          marginBottom: '20px',
          color: 'var(--color-text-primary)',
          letterSpacing: '1px'
        }}>
          NGUYÊN NHÂN & TÁC HẠI <br />
          <span style={{
            background: 'linear-gradient(90deg, var(--color-lacquer), var(--color-gold-dark))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 10px rgba(197, 168, 128, 0.15)'
          }}>
            CỦA THAM NHŨNG
          </span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          fontFamily: 'var(--font-serif)',
          color: 'var(--color-text-secondary)',
          maxWidth: '800px',
          margin: '0 auto 40px auto',
          lineHeight: '1.5'
        }}>
          Bài thuyết trình bám sát tài liệu chính thống của Bộ Giáo dục & Đào tạo dành cho các trường đại học, cao đẳng (QĐ số 3468/QĐ-BGDĐT).
        </p>

        {/* Ho Chi Minh callout box */}
        <div style={{ marginBottom: '50px' }}>
          <QuoteCard
            text="“Tham ô, lãng phí và bệnh quan liêu là kẻ thù của nhân dân, của bộ đội, của Chính phủ. Kẻ thù khá nguy hiểm, vì nó không mang gươm mang súng mà nó nằm trong tổ chức của ta để làm hỏng công việc của ta.”"
            highlight="Kẻ thù khá nguy hiểm"
            author="CHỦ TỊCH HỒ CHÍ MINH"
            subtitle="Kẻ thù giặc nội xâm"
          />
        </div>

        {/* Call to Actions */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '20px',
          marginBottom: '50px'
        }}>
          <a href="#khai-niem" className="btn-primary">
            <ArrowDown size={18} />
            Khám phá nội dung
          </a>
          <a href="#tro-choi" className="btn-secondary">
            <Flame size={18} color="var(--color-lacquer)" />
            Trò chơi WebSocket (Sắp ra mắt)
          </a>
        </div>
      </div>
    </section>
  );
}
