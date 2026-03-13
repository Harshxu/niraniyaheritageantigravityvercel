import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useScrollRedirect } from '../hooks/useScrollRedirect';

const Enquiry = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useScrollRedirect('/showcase', null);

  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [activeTab, setActiveTab] = useState('whatsapp');
  const [submitted, setSubmitted] = useState(false);
  const processedRef = useRef("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);

  // Pre-fill message if an item was passed from the Showcase layout
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const incomingItem = params.get('item');
    
    if (incomingItem && processedRef.current !== incomingItem) {
      processedRef.current = incomingItem;
      setFormState(prev => {
        const itemLine = `- ${incomingItem}`;
        // Rigorous check for existing item to avoid duplicates
        if (prev.message.toLowerCase().includes(incomingItem.toLowerCase())) return prev;

        const header = "Greetings. I am reaching out regarding:\n";
        const footer = "\n\nI would like to discuss...";

        // If message is empty or doesn't have our header, start fresh
        if (!prev.message || !prev.message.includes("regarding:")) {
          return { ...prev, message: `${header}${itemLine}${footer}` };
        }

        // Add to the list. We look for the last bullet point or the footer.
        const msg = prev.message;
        const footerIndex = msg.lastIndexOf(footer);
        
        if (footerIndex !== -1) {
          const mainPart = msg.substring(0, footerIndex).trim();
          return {
            ...prev,
            message: `${mainPart}\n${itemLine}${footer}`
          };
        } else {
          return {
            ...prev,
            message: `${msg.trim()}\n${itemLine}${footer}`
          };
        }
      });
    }
  }, [location.search]);

  const [isSubmitting, setIsSubmitting] = useState(false); // Keep this state if it's used elsewhere for UI feedback

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set submitting state

    if (activeTab === 'email') {
      try {
        await fetch("https://formsubmit.co/ajax/harshkumawat9950@gmail.com", {
          method: "POST",
          headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: formState.name,
            email: formState.email,
            message: formState.message,
            _subject: `New Enquiry from ${formState.name} on Niraniya Heritage`
          })
        });
        setSubmitted(true);
      } catch (error) {
        console.error("Email API failed:", error);
        alert("Failed to send email. Please try WhatsApp.");
      }
    } else { // activeTab === 'whatsapp'
      // Open WhatsApp Message
      const waText = `Hello Niraniya Heritage!%0A%0A*Name:* ${formState.name}%0A*Message:* ${formState.message}`;
      const waURL = `https://wa.me/919351303138?text=${waText}`;
      window.open(waURL, '_blank');
      setSubmitted(true);
    }
    setIsSubmitting(false); // Reset submitting state
  };

  const inputStyle = {
    width: '100%',
    padding: '16px 20px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid var(--glass-border)',
    borderRadius: '12px',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-sans)',
    fontSize: '16px',
    marginBottom: '24px',
    outline: 'none',
    transition: 'all 0.3s'
  };

  return (
    <div style={{ minHeight: '100vh', padding: isMobile ? '100px 16px 60px' : '140px 40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="glass-panel"
        style={{ width: '100%', maxWidth: '600px', padding: '60px 40px', position: 'relative', overflow: 'hidden' }}
      >
        <div style={{ 
          position: 'absolute', top: -100, left: -100, width: 300, height: 300, 
          background: 'radial-gradient(circle, rgba(255, 90, 0, 0.03) 0%, transparent 70%)',
          filter: 'blur(60px)', zIndex: -1 
        }} />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <p style={{ textAlign: 'center', letterSpacing: '6px', color: 'var(--accent-gold)', textTransform: 'uppercase', fontSize: '10px', marginBottom: '15px' }}>Concierge Desk</p>
          <h2 className="cinematic-text glow-orange" style={{ textAlign: 'center', marginBottom: '12px', color: 'var(--accent-orange)', fontSize: '2.5rem' }}>The Dialogue</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '40px', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>Transforming vision into timeless stone.</p>
        </motion.div>

        {!submitted && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '45px' }}>
            <button 
              onClick={() => setActiveTab('whatsapp')}
              style={{
                padding: '10px 30px', borderRadius: '30px', cursor: 'pointer', fontFamily: 'var(--font-display)', fontSize: '11px', letterSpacing: '2px', transition: 'all 0.4s',
                background: activeTab === 'whatsapp' ? 'rgba(37, 211, 102, 0.1)' : 'transparent',
                border: activeTab === 'whatsapp' ? '1px solid rgba(37, 211, 102, 0.5)' : '1px solid rgba(255,255,255,0.05)',
                color: activeTab === 'whatsapp' ? '#25D366' : 'var(--text-secondary)'
              }}
            >
              WHATSAPP
            </button>
            <button 
              onClick={() => setActiveTab('email')}
              style={{
                padding: '10px 30px', borderRadius: '30px', cursor: 'pointer', fontFamily: 'var(--font-display)', fontSize: '11px', letterSpacing: '2px', transition: 'all 0.4s',
                background: activeTab === 'email' ? 'rgba(255, 90, 0, 0.1)' : 'transparent',
                border: activeTab === 'email' ? '1px solid var(--accent-orange-glow)' : '1px solid rgba(255,255,255,0.05)',
                color: activeTab === 'email' ? 'var(--accent-orange)' : 'var(--text-secondary)'
              }}
            >
              EMAIL
            </button>
          </div>
        )}

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <motion.div whileFocus={{ scale: 1.02 }}>
              <input
                type="text"
                value={formState.name}
                placeholder="Your Name"
                required
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = 'var(--accent-orange)'; e.target.style.boxShadow = '0 0 10px var(--accent-orange-glow)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--glass-border)'; e.target.style.boxShadow = 'none'; }}
                onChange={e => setFormState({ ...formState, name: e.target.value })}
              />
            </motion.div>

            {activeTab === 'email' && ( // Only show email field if email tab is active
              <motion.div whileFocus={{ scale: 1.02 }}>
                <input
                  type="email"
                  value={formState.email}
                  placeholder="Your Email"
                  required={activeTab === 'email'} // Make required only for email tab
                  style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--accent-orange)'; e.target.style.boxShadow = '0 0 10px var(--accent-orange-glow)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--glass-border)'; e.target.style.boxShadow = 'none'; }}
                  onChange={e => setFormState({ ...formState, email: e.target.value })}
                />
              </motion.div>
            )}
            <motion.div whileFocus={{ scale: 1.02 }}>
              <textarea
                value={formState.message}
                placeholder="The Vision You Seek..."
                required
                rows={5}
                style={{ ...inputStyle, resize: 'none' }}
                onFocus={(e) => { e.target.style.borderColor = 'var(--accent-orange)'; e.target.style.boxShadow = '0 0 10px var(--accent-orange-glow)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--glass-border)'; e.target.style.boxShadow = 'none'; }}
                onChange={e => setFormState({ ...formState, message: e.target.value })}
              />
            </motion.div>

            <motion.button 
              whileHover={{ scale: 1.02, boxShadow: activeTab === 'whatsapp' ? '0 0 25px rgba(37,211,102,0.4)' : '0 0 25px var(--accent-orange-glow)' }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: '100%',
                padding: '16px',
                background: activeTab === 'whatsapp' ? 'linear-gradient(45deg, #128C7E, #25D366)' : 'linear-gradient(45deg, var(--accent-orange), #ff8a4c)',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontFamily: 'var(--font-display)',
                fontWeight: 'bold',
                fontSize: '14px',
                cursor: 'pointer',
                marginTop: '10px',
                boxShadow: activeTab === 'whatsapp' ? '0 0 15px rgba(37,211,102,0.2)' : '0 0 15px var(--accent-orange-glow)'
              }}
              type="submit"
              disabled={isSubmitting} // Disable button while submitting
            >
              {isSubmitting ? 'SENDING...' : (activeTab === 'whatsapp' ? 'SEND VIA WHATSAPP' : 'SEND INQUIRY')}
            </motion.button>
          </form>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: 'center', padding: '60px 0' }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>✧</div>
            <h3 className="glow-orange cinematic-text" style={{ color: 'var(--accent-orange)', marginBottom: '16px', letterSpacing: '4px' }}>The Seal of Inquiry</h3>
            <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-serif)', fontStyle: 'italic', maxWidth: '400px', margin: '0 auto' }}>"Our artisans have received your word. Expect a response through your chosen dispatch channel."</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Enquiry;
