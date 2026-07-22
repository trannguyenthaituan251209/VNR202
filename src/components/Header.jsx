import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { ChimLac } from './VietnameseMotifs';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticked = false;

    const handleScroll = () => {
      if (!ticked) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 20;
          setScrolled((prev) => {
            if (prev !== isScrolled) return isScrolled;
            return prev;
          });
          ticked = false;
        });
        ticked = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Khái niệm', href: '#khai-niem' },
    { name: 'Nguyên nhân', href: '#nguyen-nhan' },
    { name: 'Tác hại', href: '#tac-hai' },
    { name: 'Giải pháp', href: '#giai-phap' },
    { name: 'Trách nhiệm', href: '#trach-nhiem' },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      left: 0,
      width: '100%',
      backgroundColor: scrolled ? 'rgba(250, 246, 238, 0.98)' : 'var(--color-bg)',
      borderBottom: `1px solid ${scrolled ? 'rgba(197, 168, 128, 0.3)' : 'transparent'}`,
      boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
      transition: 'var(--transition-normal)',
      zIndex: 1000,
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'between',
        height: '70px',
        padding: '0 24px',
      }}>
        {/* Logo and title */}
        <a href="#hero" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          textDecoration: 'none',
          color: 'var(--color-text-primary)',
        }}>
          <ChimLac width={45} height={30} color="var(--color-gold-dark)" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{
              fontFamily: 'var(--font-title)',
              fontWeight: 700,
              fontSize: '1.1rem',
              letterSpacing: '1px',
              lineHeight: '1.2'
            }}>
              VNR202 - ĐỀ TÀI 3.4
            </span>
            <span style={{
              fontSize: '0.75rem',
              color: 'var(--color-lacquer)',
              fontWeight: 500,
              letterSpacing: '0.5px'
            }}>
              PHÒNG CHỐNG THAM NHŨNG
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'none' }} className="desktop-nav">
          <ul style={{ display: 'flex', listStyle: 'none', gap: '20px' }}>
            {navLinks.map((link) => {
              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      textDecoration: 'none',
                      color: 'var(--color-text-secondary)',
                      fontSize: '0.9rem',
                      fontFamily: 'var(--font-accent)',
                      fontWeight: 600,
                      padding: '8px 12px',
                      borderRadius: '6px',
                      transition: 'var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = 'var(--color-lacquer)';
                      e.target.style.backgroundColor = 'rgba(197, 168, 128, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = 'var(--color-text-secondary)';
                      e.target.style.backgroundColor = 'transparent';
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Hamburger Menu Toggle (Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--color-gold-dark)',
            cursor: 'pointer',
            padding: '8px',
          }}
          className="mobile-toggle"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '70px',
          left: 0,
          width: '100%',
          backgroundColor: 'var(--color-bg)',
          borderBottom: '2px solid var(--color-gold)',
          boxShadow: 'var(--shadow-md)',
          padding: '16px 24px',
        }} className="mobile-dropdown">
          <ul style={{ display: 'flex', flexDirection: 'column', listStyle: 'none', gap: '12px' }}>
            {navLinks.map((link) => {
              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      textDecoration: 'none',
                      color: 'var(--color-text-primary)',
                      fontFamily: 'var(--font-accent)',
                      fontWeight: 600,
                      padding: '12px',
                      borderRadius: '6px',
                      backgroundColor: 'var(--color-bg-alt)',
                      transition: 'var(--transition-fast)',
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Injecting CSS specifically for Responsive Navigation */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 992px) {
          .desktop-nav { display: block !important; }
          .mobile-toggle { display: none !important; }
          .mobile-dropdown { display: none !important; }
        }
        .container {
          justify-content: space-between !important;
        }
      `}} />
    </header>
  );
}
