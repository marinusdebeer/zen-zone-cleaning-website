import React from 'react';
import './Reviews.css';
import './Faces.css';
import './Mascots.css';
import { REVIEWS as RAW_REVIEWS, getReviewsSummary } from './reviewsData';
import Reveal from './Reveal';

// Sort by date desc; parse using Date for robust ordering
const REVIEWS = [...RAW_REVIEWS].sort((a, b) => new Date(b.date) - new Date(a.date));
const SUMMARY = getReviewsSummary();

function Star({ filled }) {
  return (
    <svg
      className={`review__star ${filled ? 'review__star--filled' : ''}`}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.786 1.401 8.164L12 18.896l-7.335 3.864 1.401-8.164L.132 9.21l8.2-1.192L12 .587z" />
    </svg>
  );
}

function Avatar({ name }) {
  const trimmed = (name || '?').trim();
  const parts = trimmed.split(/\s+/);
  const first = parts[0]?.charAt(0) || '?';
  const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : '';
  const initials = `${first}${last}`.toUpperCase();
  return (
    <div className="review__avatar" aria-hidden="true">
      {initials}
    </div>
  );
}

function ReviewCard({ review }) {
  const rawText = (review.text || '').trim();
  const showText = rawText && !/^\[no written review provided\]/i.test(rawText);
  return (
    <article className="review-card">
      <header className="review-card__header">
        <Avatar name={review.name} />
        <div className="review-card__meta">
          <strong className="review-card__name">
            {review.name}{' '}
            {review.isLocalGuide && (
              <span className="review-card__badge" title="Local Guide">
                Local Guide
              </span>
            )}
          </strong>
          <div className="review-card__rating" aria-label={`${review.rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} filled={i < review.rating} />
            ))}
          </div>
          <span className="review-card__date">{review.date}</span>
        </div>
      </header>
      {showText && (
        <blockquote className="review-card__text">
          "{review.text}"
        </blockquote>
      )}
    </article>
  );
}

export default function Reviews() {
  const totals = React.useMemo(() => {
    const count = REVIEWS.length;
    const sum = REVIEWS.reduce((acc, r) => acc + (Number(r.rating) || 0), 0);
    const avg = count ? sum / count : 0;
    return { count, average: avg };
  }, []);

  const gridRef = React.useRef(null);

  // Masonry sizing to ensure consistent vertical gaps without overlap
  React.useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const compute = () => {
      const styles = window.getComputedStyle(grid);
      const rowGap = parseFloat(styles.getPropertyValue('row-gap')) || 16;
      const autoRow = parseFloat(styles.getPropertyValue('grid-auto-rows')) || 8;
      Array.from(grid.children).forEach((item) => {
        // Reset span to auto to measure natural height
        item.style.gridRowEnd = 'auto';
        const height = item.getBoundingClientRect().height;
        const span = Math.ceil((height + rowGap) / (autoRow + rowGap));
        item.style.gridRowEnd = `span ${span}`;
      });
    };

    compute();
    const ro = new ResizeObserver(() => compute());
    ro.observe(grid);
    Array.from(grid.children).forEach((c) => ro.observe(c));
    window.addEventListener('resize', compute);

    return () => {
      window.removeEventListener('resize', compute);
      ro.disconnect();
    };
  }, []);

  return (
    <section className="reviews" id="reviews" aria-label="Client Reviews">
      <div className="reviews__header">
        <Reveal as="h2" className="reviews__title" animation="up">Reviews</Reveal>
        <div className="reviews__actions">
          <a
            href="https://maps.app.goo.gl/EyMWdSuMsExvrxaG7"
            target="_blank"
            rel="noopener noreferrer"
            className="google-button"
          >
            <span className="google-word" aria-hidden="true">
              <span className="g g--blue">G</span>
              <span className="g g--red">o</span>
              <span className="g g--yellow">o</span>
              <span className="g g--blue">g</span>
              <span className="g g--green">l</span>
              <span className="g g--red">e</span>
            </span>
            <span>Reviews</span>
            <span
              className="reviews__summary"
              aria-label={`Average ${SUMMARY.average.toFixed(1)} from ${SUMMARY.count} reviews`}
            >
              <strong>{SUMMARY.average.toFixed(1)}</strong> ({SUMMARY.count})
            </span>
          </a>
        </div>
      </div>

      <div className="reviews__grid reveal-stagger" aria-label="Reviews list" ref={gridRef}>
        {REVIEWS.map((r, i) => (
          <Reveal key={r.name + i} as="div" animation={i % 2 === 0 ? 'left' : 'right'}>
            <ReviewCard review={r} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
