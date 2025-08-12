/**
 * Performance utility functions for optimizing loading and runtime performance
 */

/**
 * Lazy load component with intersection observer
 * @param {Function} importFunc - Dynamic import function
 * @param {Object} options - Configuration options
 */
export const lazy = (importFunc, options = {}) => {
  const { 
    fallback = null,
    errorBoundary = false 
  } = options;
  
  return React.lazy(() => {
    return importFunc().catch(err => {
      console.error('Component lazy loading failed:', err);
      // Return a minimal fallback component
      return { 
        default: () => fallback || React.createElement('div', null, 'Loading error') 
      };
    });
  });
};

/**
 * Debounce function to limit rapid function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function to limit function calls to once per interval
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Preload image to improve perceived performance
 * @param {string} src - Image source URL
 */
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Optimize animation frames for smooth performance
 * @param {Function} callback - Animation callback
 */
export const requestIdleCallback = (callback) => {
  if ('requestIdleCallback' in window) {
    return window.requestIdleCallback(callback);
  }
  // Fallback for browsers without requestIdleCallback
  return setTimeout(callback, 1);
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get connection information for adaptive loading
 */
export const getConnectionType = () => {
  if ('connection' in navigator) {
    return navigator.connection.effectiveType || 'unknown';
  }
  return 'unknown';
};

/**
 * Check if device is likely to be low-powered
 */
export const isLowPoweredDevice = () => {
  if ('hardwareConcurrency' in navigator) {
    return navigator.hardwareConcurrency <= 2;
  }
  return false;
};
