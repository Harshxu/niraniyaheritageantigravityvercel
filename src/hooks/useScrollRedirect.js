import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const COOLDOWN_MS = 1500;

export const useScrollRedirect = (prevPath, nextPath) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleWheel = (e) => {
      const now = Date.now();
      if (now - (window.lastScrollRedirectTime || 0) < COOLDOWN_MS) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Scroll Down — at the very bottom of the page
      if (e.deltaY > 0 && nextPath && (scrollY + windowHeight >= documentHeight - 5)) {
        window.lastScrollRedirectTime = now;
        setTimeout(() => navigate(nextPath), 50);
      }

      // Scroll Up — at the very top of the page
      if (e.deltaY < 0 && prevPath && scrollY <= 5) {
        window.lastScrollRedirectTime = now;
        setTimeout(() => navigate(prevPath, { state: { fromBelow: true } }), 50);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [navigate, prevPath, nextPath]);
};
