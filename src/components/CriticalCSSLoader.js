import { useEffect } from 'react';

/**
 * Component to load non-critical CSS after the initial render
 * This prevents CSS from blocking the initial page render
 */
const CriticalCSSLoader = () => {
  useEffect(() => {
    const loadNonCriticalCSS = () => {
      // List of CSS files to load after initial render
      const cssFiles = [
        '/static/css/main.css', // Adjust path based on your build output
      ];

      cssFiles.forEach(href => {
        // Check if already loaded
        if (document.querySelector(`link[href="${href}"]`)) {
          return;
        }

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.media = 'print';
        link.onload = function() {
          this.media = 'all';
        };
        document.head.appendChild(link);
      });
    };

    // Use requestIdleCallback if available, otherwise setTimeout
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadNonCriticalCSS);
    } else {
      setTimeout(loadNonCriticalCSS, 100);
    }
  }, []);

  return null;
};

export default CriticalCSSLoader;
