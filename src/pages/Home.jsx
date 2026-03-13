import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useScrollRedirect } from '../hooks/useScrollRedirect';
import ganeshaIcon from '../assets/ganesha_icon.png';

const Home = () => {
  const { scrollYProgress } = useScroll();
  const yElement = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const opacityElement = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  useScrollRedirect(null, '/showcase');

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);

  // Only delay animation if this is the very first load of the app session
  const ANIM_DELAY = window.hasPreloaderFinished ? 0.2 : 3.2;

  useEffect(() => {
    // If animations started, tell the app we don't need to delay next time
    const timer = setTimeout(() => {
      window.hasPreloaderFinished = true;
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Background Ambience & Image */}
      <motion.div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '110%',
        height: '110vh',
        backgroundImage: 'url("https://images.unsplash.com/photo-1621644781440-1e5b8e9f2d1e?auto=format&fit=crop&q=80&w=2000")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.15,
        zIndex: -5,
        mixBlendMode: 'luminosity',
        y: useTransform(scrollYProgress, [0, 1], [0, 150]),
        scale: 1.1
      }} />
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60vw',
        height: '60vw',
        background: 'radial-gradient(circle, rgba(255, 90, 0, 0.08) 0%, transparent 70%)',
        filter: 'blur(60px)',
        zIndex: -4
      }} />

      {/* Hero Section */}
      <motion.div
        id="hero"
        style={{
          height: '90vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          y: yElement,
          opacity: opacityElement,
          position: 'relative'
        }}
      >
        {/* Half Ganesha Watermark Left Aligned */}
        <motion.img
          src={ganeshaIcon}
          alt="Ganesha Watermark"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 0.25, x: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={isMobile ? {
            /* ============================================
               MOBILE GANESHA — EDIT THESE VALUES 📱
               ============================================ */
            position: 'absolute',
            top: '21%',         /* ← move UP/DOWN (try 0%, 10%, 20%) */
            left: '23%',       /* ← move LEFT/RIGHT (50% = centered) */
            transform: 'translateX(-50%)',
            height: '25vh',    /* ← make BIGGER/SMALLER */
            opacity: 0.15,
            mixBlendMode: 'screen',
            zIndex: -1,
            pointerEvents: 'none',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)'
          } : {
            /* ============================================
               DESKTOP GANESHA — EDIT THESE VALUES 🖥️
               ============================================ */
            position: 'absolute',
            top: '18%',        /* ← move UP/DOWN */
            left: '11%',       /* ← move LEFT/RIGHT */
            transform: 'translate(-50%, -50%)',
            height: '60vh',    /* ← make BIGGER/SMALLER */
            mixBlendMode: 'screen',
            zIndex: -1,
            pointerEvents: 'none',
            WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)',
            maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)'
          }}
        />
        <div style={{ marginTop: '145px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', zIndex: 10 }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: ANIM_DELAY, ease: "easeOut" }}
            style={{ textTransform: 'uppercase', letterSpacing: '12px', color: 'var(--accent-orange)', marginRight: '-12px', textAlign: 'center', fontSize: '12px', fontWeight: 600, marginBottom: '10px' }}
          >
            A Legacy In Stone
          </motion.p>

          <div style={{ position: 'relative' }}>
            <motion.h1
              className="cinematic-text glow-text"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 7.5rem)', textAlign: 'center', margin: '0', lineHeight: '1', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
            >
              {"Niraniya".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 80, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.8, delay: ANIM_DELAY + i * 0.05, ease: [0.215, 0.61, 0.355, 1] }}
                  style={{ display: 'inline-block', originY: '100%' }}
                >
                  {char}
                </motion.span>
              ))}
              <div style={{ width: '100%', height: '0' }} />
              {"Heritage".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 80, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 1, delay: ANIM_DELAY + 0.5 + i * 0.05, ease: [0.215, 0.61, 0.355, 1] }}
                  style={{
                    display: 'inline-block',
                    originY: '100%',
                    color: i < 4 ? 'var(--accent-gold)' : 'rgba(255,255,255,0.9)',
                    textShadow: '0 0 15px var(--accent-orange-glow)'
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>

            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 120, opacity: 1 }}
              transition={{ delay: ANIM_DELAY + 1.5, duration: 1.5, ease: "circOut" }}
              style={{
                position: 'absolute', bottom: '-25px', left: '50%', transform: 'translateX(-50%)',
                height: '1px', background: 'linear-gradient(90deg, transparent, var(--accent-orange), transparent)',
                boxShadow: '0 0 10px var(--accent-orange-glow)'
              }}
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: ANIM_DELAY + 1.2 }}
          style={{ marginTop: '40px' }}
        >
          <Link to="/showcase" style={{ textDecoration: 'none' }}>
            <button className="glass-panel" style={{
              padding: '16px 40px',
              fontSize: '14px',
              fontFamily: 'var(--font-display)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'all 0.4s',
              position: 'relative',
              overflow: 'hidden'
            }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow = '0 0 25px var(--accent-orange-glow)';
                e.currentTarget.style.borderColor = 'var(--accent-orange)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
                e.currentTarget.style.borderColor = 'var(--glass-border)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Explore Collection <ArrowRight size={18} color="var(--accent-orange)" />
            </button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Triggered Welcome Note */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: isMobile ? '40px 20px' : '80px 40px',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '100%', height: '100%',
          background: 'radial-gradient(circle, rgba(255, 90, 0, 0.05) 0%, transparent 70%)',
          zIndex: -1
        }} />

        <h2 className="glow-orange cinematic-text" style={{ color: 'var(--accent-orange)', marginBottom: '40px', fontSize: '14px', letterSpacing: '8px' }}>The Philosophy</h2>
        <p style={{
          fontSize: isMobile ? '1rem' : 'clamp(1.2rem, 3vw, 2rem)',
          lineHeight: '1.6',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          marginBottom: '40px'
        }}>
          "Every stone holds a whisper of the earth. We don't just shape rocks; we listen to the history trapped within and chisel away what isn't the soul of the sculpture."
        </p>
        <div style={{ height: '1px', width: '60px', background: 'var(--accent-gold)', margin: '0 auto 40px', opacity: 0.5 }} />
        <p style={{
          fontSize: isMobile ? '15px' : '18px',
          lineHeight: '2',
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-sans)',
          maxWidth: '700px',
          margin: '0 auto',
          fontWeight: 300,
          letterSpacing: '0.5px'
        }}>
          At Niraniya Heritage Stones, each idol isn't merely an artifact—it's a story born from the depths of Jaipur’s ancient quarries.
          Experience the finest craftsmanship where tradition meets the ultra-modern canvas.
        </p>

        {/* Scroll Indicator at bottom of page */}
        <motion.div
          style={{ marginTop: '100px', opacity: 0.5 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 2 }}
        >
          <p className="cinematic-text" style={{ letterSpacing: '4px', fontSize: '12px' }}>Scroll down to enter showcase</p>
          <div style={{ width: '1px', height: '40px', background: 'var(--accent-orange)', margin: '20px auto' }} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
