import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const PremiumCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Smooth trailing effect
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <>
      <style>
        {`
          body {
            cursor: none;
          }
          a, button {
            cursor: none;
          }
        `}
      </style>
      {/* Outer trailing aura */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: cursorXSpring,
          y: cursorYSpring,
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '1px solid var(--accent-orange)',
          boxShadow: '0 0 15px var(--accent-orange-glow)',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference' // Elegant blending over light/dark
        }}
      />
      
      {/* Exact dot */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: cursorX,
          y: cursorY,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: '#fff',
          boxShadow: '0 0 10px #fff',
          pointerEvents: 'none',
          zIndex: 10000,
          transform: 'translate(13px, 13px)' // Center perfectly inside the 32px ring
        }}
      />
    </>
  );
};

export default PremiumCursor;
