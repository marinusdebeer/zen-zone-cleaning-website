import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/gallery') {
      // Center the gallery section in the viewport without animated scrolling
      requestAnimationFrame(() => {
        const el = document.querySelector('section.gallery');
        if (el) {
          const rect = el.getBoundingClientRect();
          const currentScrollY = window.scrollY || window.pageYOffset;
          const targetTop = Math.max(
            0,
            currentScrollY + rect.top + rect.height / 2 - window.innerHeight / 2
          );
          window.scrollTo({ top: targetTop, left: 0, behavior: 'auto' });
        } else {
          // Fallback: position roughly in the middle of the page
          window.scrollTo({ top: window.innerHeight / 2, left: 0, behavior: 'auto' });
        }
      });
      return;
    }
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
}
