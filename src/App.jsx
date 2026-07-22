import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Concept from './components/Concept';
import Causes from './components/Causes';
import Consequences from './components/Consequences';
import FourNo from './components/FourNo';
import StudentAction from './components/StudentAction';
import GamePlaceholder from './components/GamePlaceholder';
import Footer from './components/Footer';
import { ChevronUp, Trophy, ArrowRight } from 'lucide-react';

export default function App() {
  const progressBarRef = React.useRef(null);
  const backToTopRef = React.useRef(null);
  const [route, setRoute] = useState(window.location.hash === '#/game' ? 'game' : 'main');

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash === '#/game' ? 'game' : 'main');
      window.scrollTo(0, 0); // Scroll to top on route change
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (route === 'game') return; // Disable scroll listener on game page

    let ticked = false;
    const handleScroll = () => {
      if (!ticked) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0 && progressBarRef.current) {
            const progress = (window.scrollY / totalHeight) * 100;
            progressBarRef.current.style.width = `${progress}%`;
          }

          if (backToTopRef.current) {
            if (window.scrollY > 400) {
              backToTopRef.current.style.opacity = '1';
              backToTopRef.current.style.transform = 'translateY(0)';
              backToTopRef.current.style.pointerEvents = 'auto';
            } else {
              backToTopRef.current.style.opacity = '0';
              backToTopRef.current.style.transform = 'translateY(10px)';
              backToTopRef.current.style.pointerEvents = 'none';
            }
          }
          ticked = false;
        });
        ticked = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [route]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (route === 'game') {
    return <GamePlaceholder />;
  }

  return (
    <>
      {/* Scroll Progress Bar at the top of page */}
      <div 
        ref={progressBarRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '4px',
          width: '0%',
          background: 'linear-gradient(90deg, var(--color-lacquer), var(--color-gold), var(--color-lacquer-light))',
          zIndex: 1001,
          transition: 'width 0.1s ease-out'
        }} 
      />

      {/* Main Layout */}
      <Header />
      <main>
        <Hero />
        <Concept />
        <Causes />
        <Consequences />
        <FourNo />
        <StudentAction />
        
        {/* Game Promotional Banner */}
        <section id="tro-choi-promo" className="page-section" style={{
          background: 'linear-gradient(180deg, var(--color-bg-alt) 0%, var(--color-bg) 100%)',
          textAlign: 'center',
          padding: '80px 20px'
        }}>
          <div className="premium-card" style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '50px 40px',
            backgroundColor: 'var(--color-white)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px'
          }}>
            <Trophy size={48} color="var(--color-gold-dark)" />
            <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '2rem', color: 'var(--color-text-primary)' }}>
              Đấu Trường Sinh Tồn VNR202
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', lineHeight: '1.6', fontSize: '0.95rem' }}>
              Trải nghiệm giải đấu đối kháng eSports kịch tính, ghép cặp thảo luận trực tiếp qua chat box và so tài 1v1 đỉnh cao để tìm ra nhà vô địch liêm chính.
            </p>
            <a href="#/game" className="btn-primary" style={{
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 32px',
              marginTop: '10px',
              fontWeight: 'bold'
            }}>
              Tham gia Đấu Trường <ArrowRight size={16} />
            </a>
          </div>
        </section>
      </main>
      <Footer />

      {/* Back to Top Button */}
      <button
        ref={backToTopRef}
        onClick={scrollToTop}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          padding: '12px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-lacquer)',
          color: 'var(--color-white)',
          border: 'none',
          cursor: 'pointer',
          boxShadow: 'var(--shadow-md)',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0,
          transform: 'translateY(10px)',
          pointerEvents: 'none',
          transition: 'opacity 0.3s ease, transform 0.3s ease, background-color 0.2s ease'
        }}
        className="back-to-top-btn"
        aria-label="Scroll to top"
      >
        <ChevronUp size={20} />
      </button>

      {/* Styles for Back to top hover */}
      <style dangerouslySetInnerHTML={{__html: `
        .back-to-top-btn:hover {
          background-color: var(--color-lacquer-light) !important;
          transform: translateY(-3px);
          box-shadow: var(--shadow-lg) !important;
        }
      `}} />
    </>
  );
}
