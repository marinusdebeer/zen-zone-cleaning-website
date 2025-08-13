import React, { useState, useRef, useEffect } from 'react';

/**
 * LazyImage component with intersection observer for performance optimization
 * Supports modern image formats and proper loading states
 */
const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  loading = 'lazy',
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PC9zdmc+',
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px' // Start loading 50px before image enters viewport
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setIsLoaded(true);
  };

  // Only load image when in view, with optimized placeholder
  const canTranscode = /\.(png|jpe?g)$/i.test(src || '');
  const avifSrc = canTranscode ? (src || '').replace(/\.(png|jpe?g|webp)$/i, '.avif') : src;

  return (
    <div ref={imgRef} className={`lazy-image-wrapper ${className}`} style={{ minHeight: '200px' }}>
      {isInView ? (
        canTranscode ? (
          <img
            src={avifSrc}
            alt={alt}
            loading="lazy"
            onLoad={handleLoad}
            onError={handleError}
            style={{
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 0.2s ease',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            {...props}
          />
        ) : (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onLoad={handleLoad}
            onError={handleError}
            style={{
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 0.2s ease',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            {...props}
          />
        )
      ) : (
        <div 
          style={{
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
            minHeight: '200px',
            width: '100%',
          }}
        />
      )}
    </div>
  );
};

export default LazyImage;
