import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Showcase from './pages/Showcase';
import Enquiry from './pages/Enquiry';
import Preloader from './components/Preloader';
import FireAsh from './components/FireAsh';
import './index.css';

const ScrollToTop = () => {
  const { pathname, hash, state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (state?.fromBelow) {
      // Small timeout to let layout settle and avoid intermediate scroll triggers
      const timer = setTimeout(() => {
        window.scrollTo(0, document.documentElement.scrollHeight);
        // Clean up state so we don't teleport back on manual refreshes
        // and to avoid interfering with any other scroll logic
        navigate(pathname, { replace: true, state: {} });
      }, 100);
      return () => clearTimeout(timer);
    } else if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, state, navigate]);

  return null;
};

function App() {
  const [loading, setLoading] = useState(true);

  // Enforce a cinematic loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      window.hasPreloaderFinished = true;
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" setLoading={setLoading} />}
      </AnimatePresence>
      
      {/* Global Fire Ash Atmosphere - Persistent across all pages */}
      <FireAsh />

      <style>{`
        .nav-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-family: var(--font-sans);
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: color 0.3s;
        }
        .nav-link:hover {
          color: var(--text-primary);
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }
      `}</style>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/showcase" element={<Showcase />} />
        <Route path="/enquiry" element={<Enquiry />} />
      </Routes>
    </Router>
  );
}

export default App;
