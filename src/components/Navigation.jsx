import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneCall, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import ganeshaIcon from '../assets/ganesha_icon_transparent.png';

const NAV_LINKS = [
  { path: '/', name: 'Home' },
  { path: '/showcase', name: 'Showcase' },
  { path: '/enquiry', name: 'Enquiry' }
];

const Navigation = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 20,
          left: '50%',
          x: '-50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '90%',
          maxWidth: '1200px',
          padding: isMobile ? '12px 20px' : '16px 32px',
          zIndex: 200,
          background: 'rgba(5, 5, 5, 0.6)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '16px'
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <img
            src={ganeshaIcon}
            alt="Ganesha Logo"
            style={{
              height: isMobile ? '32px' : '42px',
              width: 'auto',
              filter: 'drop-shadow(0 0 8px var(--accent-orange-glow))'
            }}
          />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: isMobile ? '11px' : '14px', letterSpacing: '1px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
            NIRANIYA <span style={{ color: 'var(--accent-gold)' }}>HERITAGE</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: '32px' }}>
            {NAV_LINKS.map(({ path, name }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className="nav-link"
                  style={{ position: 'relative', textDecoration: 'none', color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                >
                  {name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      style={{
                        position: 'absolute', bottom: -4, left: 0, right: 0,
                        height: 2, background: 'var(--accent-orange)',
                        boxShadow: '0 0 10px var(--accent-orange-glow)', borderRadius: 2
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        )}

        {/* Desktop Contact Button */}
        {!isMobile && (
          <Link to="/enquiry" style={{ textDecoration: 'none' }}>
            <button style={{
              background: 'transparent', border: '1px solid var(--accent-orange)',
              color: 'var(--accent-orange)', padding: '10px 20px', borderRadius: '30px',
              fontFamily: 'var(--font-display)', fontSize: '12px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s'
            }}
              onMouseOver={(e) => { e.currentTarget.style.boxShadow = '0 0 15px var(--accent-orange-glow)'; e.currentTarget.style.background = 'rgba(255, 90, 0, 0.1)'; }}
              onMouseOut={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = 'transparent'; }}
            >
              <PhoneCall size={14} /> Contact
            </button>
          </Link>
        )}

        {/* Mobile Hamburger */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'transparent', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '10px', padding: '8px', color: 'var(--text-primary)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.3s'
            }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        )}
      </motion.nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: '90px',
              left: '5%',
              width: '90%',
              background: 'rgba(5, 5, 5, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '24px',
              zIndex: 199,
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}
          >
            {NAV_LINKS.map(({ path, name }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  style={{
                    textDecoration: 'none',
                    padding: '14px 16px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: isActive ? 'rgba(255, 90, 0, 0.08)' : 'transparent',
                    border: isActive ? '1px solid rgba(255, 90, 0, 0.2)' : '1px solid transparent',
                    color: isActive ? 'var(--accent-orange)' : 'var(--text-secondary)',
                    fontFamily: 'var(--font-display)',
                    fontSize: '13px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    transition: 'all 0.2s'
                  }}
                >
                  {name}
                  {isActive && <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-orange)' }} />}
                </Link>
              );
            })}

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '8px 0' }} />
            <Link to="/enquiry" style={{ textDecoration: 'none' }}>
              <button style={{
                width: '100%', padding: '14px', background: 'rgba(255, 90, 0, 0.1)',
                border: '1px solid var(--accent-orange)', borderRadius: '12px',
                color: 'var(--accent-orange)', fontFamily: 'var(--font-display)',
                fontSize: '12px', letterSpacing: '2px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
              }}>
                <PhoneCall size={14} /> CONTACT US
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
