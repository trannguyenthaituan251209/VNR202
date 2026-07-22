import React from 'react';

export default function QuoteCard({ text, highlight, author, subtitle }) {
  // Helper to split text by highlight and render in italic gold
  const renderHighlightedText = (fullText, highlightText) => {
    if (!highlightText) return fullText;
    const parts = fullText.split(new RegExp(`(${highlightText})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === highlightText.toLowerCase() ? (
        <span key={index} style={{ color: 'var(--color-gold-glow)', fontStyle: 'italic', fontWeight: 'bold' }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div 
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '700px',
        margin: '0 auto',
        padding: '40px 40px 80px 40px', // Extra bottom padding for the cutout area
        color: 'var(--color-white)',
        boxSizing: 'border-box'
      }}
    >
      {/* Background SVG drawing the custom stepped-corner shape */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'none'
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d="M 4,0 
             L 96,0 
             A 4,5 0 0,1 100,5 
             L 100,80 
             A 4,5 0 0,1 96,85 
             L 79,85 
             A 4,5 0 0,0 75,90 
             L 75,95 
             A 4,5 0 0,1 71,100 
             L 4,100 
             A 4,5 0 0,1 0,95 
             L 0,5 
             A 4,5 0 0,1 4,0 
             Z"
          fill="#26201B"
          stroke="var(--color-gold)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Quote Content (Overlayed on top of background SVG) */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'left' }}>
        <p style={{
          fontFamily: 'var(--font-accent)',
          fontSize: 'clamp(1.15rem, 2.2vw, 1.6rem)',
          lineHeight: '1.45',
          fontWeight: '500',
          marginBottom: '25px',
          color: '#FAF6EE'
        }}>
          {renderHighlightedText(text, highlight)}
        </p>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2px'
        }}>
          <span style={{
            fontFamily: 'var(--font-accent)',
            fontSize: '0.85rem',
            fontWeight: '600',
            color: 'var(--color-gold-light)',
            letterSpacing: '0.5px'
          }}>
            - {author}
          </span>
          {subtitle && (
            <span style={{
              fontSize: '0.75rem',
              color: 'var(--color-lacquer-light)',
              fontStyle: 'italic',
              marginLeft: '10px'
            }}>
              ({subtitle})
            </span>
          )}
        </div>
      </div>

      {/* Decorative dots and line in the bottom-right cutout area */}
      <div 
        style={{
          position: 'absolute',
          bottom: '22px',
          right: '35px',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          pointerEvents: 'none'
        }}
      >
        {/* Three dots */}
        <div style={{ display: 'flex', gap: '5px' }}>
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', border: '1px solid var(--color-gold)' }} />
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', border: '1px solid var(--color-gold)' }} />
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', border: '1px solid var(--color-gold)' }} />
        </div>
        {/* Line */}
        <div style={{ width: '50px', height: '1px', backgroundColor: 'var(--color-gold)', opacity: 0.6 }} />
      </div>
    </div>
  );
}
