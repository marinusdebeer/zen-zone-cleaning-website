import React, { useState, useEffect } from 'react';

/**
 * Component to generate responsive image sources with WebP fallbacks
 * This helps reduce image file sizes significantly
 */
const ImageOptimizer = ({ 
  src, 
  alt, 
  className = '',
  sizes = '100vw',
  quality = 85,
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [imageFormat, setImageFormat] = useState('original');

  useEffect(() => {
    // Check WebP support
    const supportsWebP = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      return canvas.toDataURL('image/webp').startsWith('data:image/webp');
    };

    // Check AVIF support
    const supportsAVIF = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      return canvas.toDataURL('image/avif').startsWith('data:image/avif');
    };

    // Determine best format
    if (supportsAVIF()) {
      setImageFormat('avif');
    } else if (supportsWebP()) {
      setImageFormat('webp');
    } else {
      setImageFormat('original');
    }
  }, []);

  // Generate optimized src based on format support
  const getOptimizedSrc = (originalSrc, format) => {
    if (format === 'original') return originalSrc;
    
    // For development, we'll use the original images
    // In production, you'd typically use a CDN or build process to generate these
    const extension = format === 'avif' ? '.avif' : '.webp';
    return originalSrc.replace(/\.(jpg|jpeg|png)$/i, extension);
  };

  const optimizedSrc = getOptimizedSrc(src, imageFormat);

  return (
    <picture>
      {/* AVIF for maximum compression */}
      <source 
        srcSet={getOptimizedSrc(src, 'avif')} 
        type="image/avif" 
      />
      {/* WebP fallback */}
      <source 
        srcSet={getOptimizedSrc(src, 'webp')} 
        type="image/webp" 
      />
      {/* Original format fallback */}
      <img
        src={src}
        alt={alt}
        className={className}
        loading="lazy"
        decoding="async"
        onError={(e) => {
          // Fallback to original format on error
          if (e.target.src !== src) {
            e.target.src = src;
          }
        }}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
        }}
        {...props}
      />
    </picture>
  );
};

export default ImageOptimizer;
