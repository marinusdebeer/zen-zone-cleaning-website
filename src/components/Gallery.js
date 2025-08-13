import React from 'react';
import ReactDOM from 'react-dom';
import LazyImage from './LazyImage';
import './Gallery.css';

// Auto‑wire images from public/images/gallery
const galleryFileNames = [
  '1.JPG',
  '2.JPG',
  '3.JPG',
  '4.JPG',
  '5.JPG',
  '6.JPG',
  '7.JPG',
  '8.JPG',
  '9.JPG',
  '10.JPG',
  '11.JPG',
  '12.JPG',
  '13.JPG',
  '14.JPG',
  '15.JPG',
  '16.JPG',
  '17.JPG',
  '18.JPG',
  '19.JPG',
  '20.JPG',
  '21.JPG',
  '22.JPG',
  '23.JPG',
  '24.JPG',
  '25.JPG',
  '26.JPG',
  '27.JPG',
  '28.JPG',
  '29.JPG',
  '30.JPG',
  '31.JPG',
  '32.JPG',
];

// Balanced mosaic pattern for a more satisfying layout
const mosaicPattern = [
  'wide',
  'square',
  'square',
  'tall',
  'square',
  'wide',
  'square',
  'tall',
  'square',
  'square',
  'wide',
  'square',
  'tall',
  'square',
  'square',
];
const makeCaption = (name) => `Project ${name.replace(/\.JPG$/i, '')}`;

const GALLERY_ITEMS = galleryFileNames.map((fileName, idx) => ({
  src: `${process.env.PUBLIC_URL}/images/gallery/${fileName}`,
  alt: makeCaption(fileName),
  caption: makeCaption(fileName),
  size: mosaicPattern[idx % mosaicPattern.length],
}));

export default function Gallery({
  limit = null,
  fullWidth = false,
  compact = false,
  strip = false,
}) {
  const [lightboxIndex, setLightboxIndex] = React.useState(null);
  const totalItems = limit ? Math.min(limit, GALLERY_ITEMS.length) : GALLERY_ITEMS.length;

  const openLightbox = (index) => setLightboxIndex(index % totalItems);
  const closeLightbox = () => setLightboxIndex(null);
  const showPrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((i) => (i === null ? null : (i + totalItems - 1) % totalItems));
  };
  const showNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((i) => (i === null ? null : (i + 1) % totalItems));
  };

  React.useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i + totalItems - 1) % totalItems);
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i + 1) % totalItems);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [lightboxIndex, totalItems]);

  // Keep index in range if `limit` changes while lightbox is open
  React.useEffect(() => {
    if (lightboxIndex === null) return;
    if (lightboxIndex >= totalItems) {
      setLightboxIndex(totalItems - 1);
    }
  }, [totalItems, lightboxIndex]);

  // Prevent background scrolling the simple way for cross-browser stability
  React.useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (lightboxIndex !== null) {
      html.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
    } else {
      html.style.overflow = '';
      body.style.overflow = '';
    }
  }, [lightboxIndex]);

  const itemsToRender = limit ? GALLERY_ITEMS.slice(0, limit) : GALLERY_ITEMS;
  const baseClass = `${fullWidth ? 'gallery gallery--full' : 'section gallery'}`;
  const modeClass = strip ? 'gallery--strip' : 'gallery--masonry';
  const wrapperClass = `${baseClass} ${modeClass}${compact ? ' gallery--compact' : ''}`;

  const activeItem =
    lightboxIndex !== null && lightboxIndex >= 0 && lightboxIndex < itemsToRender.length
      ? itemsToRender[lightboxIndex]
      : null;

  const lightbox =
    activeItem ? (
      <div className="lightbox" role="dialog" aria-modal="true" onClick={closeLightbox}>
        <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
          <img src={activeItem.src} alt={activeItem.alt} className="lightbox__image" />
        </div>
        <button className="lightbox__close" aria-label="Close" onClick={closeLightbox}>
          ×
        </button>
        <button className="lightbox__nav lightbox__nav--prev" aria-label="Previous" onClick={showPrev}>
          ‹
        </button>
        <button className="lightbox__nav lightbox__nav--next" aria-label="Next" onClick={showNext}>
          ›
        </button>
      </div>
    ) : null;

  return (
    <section className={wrapperClass} id="gallery" aria-label="Gallery of our work">
      <div className="gallery__header">
        <h2 className="section-title">Our Work</h2>
        <p className="section__subtitle">A few highlights from recent cleans</p>
      </div>

      <div className="gallery__grid">
        {itemsToRender.map((item, index) => (
          <button
            key={`${item.alt}-${index}`}
            className={`gallery__tile ${strip ? 'gallery__tile--uniform' : `gallery__tile--${item.size}`}`}
            onClick={() => openLightbox(index)}
            aria-label={`Open image`}
          >
            <LazyImage src={item.src} alt={item.alt} loading="lazy" />
            <span className="gallery__tile-overlay" aria-hidden="true" />
          </button>
        ))}
      </div>

      {limit && (
        <div className="gallery__cta">
          <a
            href="/gallery"
            className="btn btn--outline"
            aria-label="View full gallery of our work"
          >
            View Full Gallery
          </a>
        </div>
      )}
      {lightbox && ReactDOM.createPortal(lightbox, document.body)}
    </section>
  );
}
