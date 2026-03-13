import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Gallery from './Gallery';
import { useScrollRedirect } from '../hooks/useScrollRedirect';

const Showcase = () => {
  useScrollRedirect('/', '/enquiry');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      style={{ minHeight: '100vh', paddingTop: isMobile ? '120px' : '220px' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '0 12px' : '0 40px' }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          style={{ textAlign: 'center', marginBottom: isMobile ? '40px' : '100px' }}
        >
          <h1 className="cinematic-text glow-text" style={{ fontSize: isMobile ? 'clamp(1.6rem, 8vw, 3rem)' : 'clamp(2rem, 5vw, 4rem)', marginBottom: '10px' }}>
            The Masterpieces
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '18px', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
            "Chiseled from eternity, polished for the modern eye."
          </p>
        </motion.div>

        <Gallery hideTitle={true} />

        <motion.div
          style={{ textAlign: 'center', padding: '100px 0', opacity: 0.5 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
        >
          <p className="cinematic-text" style={{ letterSpacing: '4px', fontSize: '12px' }}>Scroll Down to Inquire</p>
          <div style={{ width: '1px', height: '40px', background: 'var(--accent-orange)', margin: '20px auto' }} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Showcase;
