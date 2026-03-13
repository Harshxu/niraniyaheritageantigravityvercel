import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

import obsidianImg from '../assets/obsidian_ganesha.png';
import buddhaImg from '../assets/marble_buddha.png';
import shivaImg from '../assets/granite_shiva.png';
import sandstoneImg from '../assets/sandstone_carving.png';

const MOCK_ITEMS = [
  { id: 1, title: 'Obsidian Ganesha', price: '₹145,000', story: 'Carved from a single block found in the deep quarries, this magnificent idol represents the removal of the deepest obstacles in life. Pure black obsidian polished to a mirror finish.', image: obsidianImg },
  { id: 2, title: 'Marble Buddha', price: '₹280,000', story: 'Infused with the tranquility of white Makrana marble, this serene piece took 90 days to complete by our master artisans. The ultimate centerpiece for mindful spaces.', image: buddhaImg },
  { id: 3, title: 'Granite Shiva Linga', price: '₹365,000', story: 'Forged from unyielding black granite with subtle gold-leaf details highlighting natural fault lines. It represents the infinite nature of the cosmos.', image: shivaImg },
  { id: 4, title: 'Sandstone Pillar Facade', price: '₹180,000', story: 'A standalone architectural masterpiece echoing the profound majesty of 15th-century temple pillars, meticulously hand-carved in rich red sandstone.', image: sandstoneImg }
];

const Gallery = ({ hideTitle = false }) => {
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 600;
  return (
    <div style={{ padding: isMobile ? '20px 16px 80px' : '60px 40px 120px', minHeight: '100vh' }}>
      {!hideTitle && (
        <h1 className="cinematic-text glow-text" style={{ textAlign: 'center', marginBottom: '60px' }}>
          The Collection
        </h1>
      )}

      <div className="gallery-grid">
        {MOCK_ITEMS.map((item) => (
          <motion.div
            layoutId={`card-${item.id}`}
            key={item.id}
            onClick={() => setSelectedId(item.id)}
            className="gallery-item"
            style={{
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '40px',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              background: '#050505',
              transition: 'all 0.4s ease'
            }}
            whileHover={{ y: -10, boxShadow: '0 0 30px var(--accent-orange-glow)', borderColor: 'var(--accent-orange)' }}
          >
            <motion.div
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                zIndex: 0,
                overflow: 'hidden'
              }}
            >
              <motion.img
                src={item.image}
                alt={item.title}
                className="gallery-image-bg"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 1,
                  display: 'block'
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </motion.div>
            {/* Very light gradient just for text readability at the bottom */}
            <div style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 40%, transparent 100%)', position: 'absolute', bottom: 0, left: 0, width: '100%', height: '40%', zIndex: 1 }} />
            <motion.h3 className="cinematic-text" layoutId={`title-${item.id}`} style={{ position: 'relative', zIndex: 2, color: '#fff', fontSize: '1.8rem', letterSpacing: '4px', textShadow: '0 2px 15px rgba(0,0,0,1)', marginBottom: '12px' }}>
              {item.title}
            </motion.h3>
            <motion.p layoutId={`price-${item.id}`} style={{ position: 'relative', zIndex: 2, color: 'var(--accent-gold)', fontSize: '1.1rem', letterSpacing: '2px', fontWeight: '600' }}>
              {item.price}
            </motion.p>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0,0,0,0.8)',
              backdropFilter: 'blur(10px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
            onClick={() => setSelectedId(null)}
          >
            {MOCK_ITEMS.filter(i => i.id === selectedId).map(item => (
              <motion.div
                layoutId={`card-${item.id}`}
                key="modal"
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: '100%',
                  maxWidth: '1000px',
                  height: isMobile ? '90vh' : '70vh',
                  background: 'var(--bg-darker)',
                  borderRadius: '24px',
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  overflow: 'hidden',
                  border: '1px solid var(--accent-orange)',
                  boxShadow: '0 0 40px rgba(255, 90, 0, 0.2)',
                  position: 'relative'
                }}
              >
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1, background: 'rgba(255, 90, 0, 0.2)', color: 'var(--accent-orange)' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                  style={{
                    position: 'absolute',
                    top: '24px',
                    right: '24px',
                    zIndex: 10,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'var(--text-secondary)',
                    backdropFilter: 'blur(5px)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <X size={20} />
                </motion.button>
                <motion.div style={{ flex: isMobile ? '0 0 40%' : 1, position: 'relative', minHeight: isMobile ? '35%' : 'auto' }}>
                  <img src={item.image} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(50%)' }} alt={item.title} />
                </motion.div>

                <div style={{ flex: 1, padding: isMobile ? '24px' : '60px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                  <motion.h2 layoutId={`title-${item.id}`} className="glow-text" style={{ fontSize: isMobile ? '22px' : '32px', marginBottom: '8px' }}>{item.title}</motion.h2>
                  <motion.p layoutId={`price-${item.id}`} style={{ color: 'var(--accent-orange)', fontSize: isMobile ? '18px' : '24px', marginBottom: isMobile ? '20px' : '40px', fontWeight: 'bold' }}>{item.price}</motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h4 style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>The Core Story</h4>
                    <p style={{ lineHeight: '1.8', color: 'var(--text-primary)' }}>{item.story}</p>
                  </motion.div>

                  <div style={{ marginTop: 'auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '12px' }}>
                    <button className="glass-panel" style={{ flex: 1, padding: '16px', color: '#fff', background: 'var(--accent-orange)', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-display)', fontWeight: 'bold', boxShadow: '0 0 15px var(--accent-orange-glow)', transition: 'all 0.3s' }}
                      onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 25px var(--accent-orange-glow)'; }}
                      onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 15px var(--accent-orange-glow)'; }}
                      onClick={() => {
                        setSelectedId(null);
                        navigate(`/enquiry?item=${encodeURIComponent('Add to Vault: ' + item.title)}`);
                      }}
                    >
                      Add to Vault (Cart)
                    </button>
                    <button className="glass-panel" style={{ flex: 1, padding: '16px', color: 'var(--accent-gold)', border: '1px solid var(--accent-gold)', background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-display)', transition: 'all 0.3s' }}
                      onMouseOver={(e) => { e.currentTarget.style.boxShadow = '0 0 15px var(--accent-gold-glow)'; e.currentTarget.style.background = 'rgba(205, 154, 70, 0.1)'; }}
                      onMouseOut={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = 'transparent'; }}
                      onClick={() => {
                        setSelectedId(null);
                        navigate(`/enquiry?item=${encodeURIComponent('Inquiry for: ' + item.title)}`);
                      }}
                    >
                      Inquire Custom
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
