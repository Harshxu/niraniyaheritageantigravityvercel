import React, { useMemo } from 'react';

// Pre-generate stable ember data ONCE — no re-renders ever recalculate positions
const FireAsh = () => {
  const embers = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      size: Math.random() * 2 + 1.2,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * -15,
      left: Math.random() * 100,
      isOrange: Math.random() > 0.4,
      pulseDuration: Math.random() * 2 + 3
    }));
  }, []); // runs only once per mount

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -3, overflow: 'hidden' }}>
      {embers.map(({ id, size, duration, delay, left, isOrange, pulseDuration }) => (
        <div
          key={id}
          className="fire-ember"
          style={{
            position: 'absolute',
            bottom: '-20px',
            left: `${left}%`,
            width: `${size}px`,
            height: `${size}px`,
            background: isOrange ? 'var(--accent-orange)' : 'var(--accent-gold)',
            borderRadius: '50%',
            boxShadow: `0 0 ${size}px var(--accent-orange)`,
            animation: `floatEmber ${duration}s linear infinite, emberPulse ${pulseDuration}s ease-in-out infinite`,
            animationDelay: `${delay}s`,
            opacity: 0
          }}
        />
      ))}
      {/* Flaming Horizon Glow */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '20vh',
        background: 'linear-gradient(to top, rgba(255, 90, 0, 0.12) 0%, transparent 100%)',
        pointerEvents: 'none'
      }} />
    </div>
  );
};

export default React.memo(FireAsh);
