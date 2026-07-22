import React from 'react';

// 12-point star central motif of Dong Son bronze drum
export const DongSonStar = ({ className = '', size = 120, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={className}
    style={{ display: 'inline-block' }}
  >
    <defs>
      <radialGradient id="goldGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FAF6EE" />
        <stop offset="60%" stopColor="#C5A880" />
        <stop offset="100%" stopColor="#8E714B" />
      </radialGradient>
    </defs>
    
    {/* Outer concentric rings */}
    <circle cx="50" cy="50" r="48" fill="none" stroke={color} strokeWidth="0.8" opacity="0.6" />
    <circle cx="50" cy="50" r="44" fill="none" stroke={color} strokeWidth="0.5" strokeDasharray="1 1.5" opacity="0.8" />
    <circle cx="50" cy="50" r="40" fill="none" stroke={color} strokeWidth="0.8" opacity="0.6" />
    <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth="0.4" opacity="0.5" />
    
    {/* Inner background */}
    <circle cx="50" cy="50" r="24" fill="url(#goldGrad)" opacity="0.15" />
    <circle cx="50" cy="50" r="24" fill="none" stroke={color} strokeWidth="0.8" />
    
    {/* Star rays (12 points) */}
    <g transform="translate(50, 50)">
      {[...Array(12)].map((_, i) => (
        <g key={i} transform={`rotate(${i * 30})`}>
          {/* Main ray */}
          <polygon points="0,-24 -3,-5 0,0" fill={color} opacity="0.85" />
          <polygon points="0,-24 3,-5 0,0" fill={color} opacity="0.95" />
          {/* Tangent rays/feather decoration between points */}
          <polygon points="0,-24 0,-15 5,-18" fill={color} opacity="0.4" />
          <polygon points="0,-24 0,-15 -5,-18" fill={color} opacity="0.4" />
        </g>
      ))}
    </g>
    
    {/* Central circle */}
    <circle cx="50" cy="50" r="3" fill={color} />
  </svg>
);

// Traditional Chim Lac silhouette (Stylized Vietnamese Lạc bird)
export const ChimLac = ({ className = '', width = 60, height = 40, color = 'currentColor', flip = false }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 60 40"
    className={className}
    style={{
      transform: flip ? 'scaleX(-1)' : 'none',
      display: 'inline-block',
      verticalAlign: 'middle'
    }}
  >
    {/* Stylized flying Chim Lac based on Dong Son Bronze Drum carvings */}
    <path
      d="M55,10 
         C48,12 40,5 30,12 
         C25,15 20,20 12,21 
         C6,22 1,18 2,24 
         C3,30 10,31 16,28 
         C25,24 30,18 38,20 
         C46,22 50,28 58,26 
         C60,25 58,18 55,10 Z 
         M10,21 
         C8,25 4,28 6,31 
         C8,34 14,32 15,28 Z 
         M32,15 
         C35,9 38,2 35,0 
         C32,2 29,8 30,14 Z 
         M24,18 
         C21,14 16,8 14,7 
         C12,8 15,16 18,19 Z"
      fill={color}
    />
  </svg>
);

// Traditional wave/scroll border divider
export const VietDivider = ({ className = '', color = '#C5A880' }) => (
  <div className={`viet-divider ${className}`} style={{ width: '100%', textAlign: 'center', margin: '30px 0' }}>
    <svg width="200" height="24" viewBox="0 0 200 24" fill="none" style={{ display: 'inline-block' }}>
      {/* Center Star */}
      <circle cx="100" cy="12" r="4" fill={color} />
      <polygon points="100,5 102,10 107,12 102,14 100,19 98,14 93,12 98,10" fill={color} />
      
      {/* Left scroll motifs */}
      <path d="M85,12 C75,6 70,18 60,12 C50,6 45,18 35,12 C25,6 20,18 10,12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M80,12 C72,8 68,16 60,12" stroke={color} strokeWidth="0.8" opacity="0.6" />
      
      {/* Right scroll motifs */}
      <path d="M115,12 C125,6 130,18 140,12 C150,6 155,18 165,12 C175,6 180,18 190,12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M120,12 C128,8 132,16 140,12" stroke={color} strokeWidth="0.8" opacity="0.6" />
      
      {/* Small Lạc birds flying outwards */}
      <g transform="translate(15, 2) scale(0.18)">
        <path d="M55,10 C48,12 40,5 30,12 C25,15 20,20 12,21 C6,22 1,18 2,24 C3,30 10,31 16,28 C25,24 30,18 38,20 C46,22 50,28 58,26 C60,25 58,18 55,10 Z" fill={color} />
      </g>
      <g transform="translate(185, 2) scale(0.18) scaleX(-1)">
        <path d="M55,10 C48,12 40,5 30,12 C25,15 20,20 12,21 C6,22 1,18 2,24 C3,30 10,31 16,28 C25,24 30,18 38,20 C46,22 50,28 58,26 C60,25 58,18 55,10 Z" fill={color} />
      </g>
    </svg>
  </div>
);
