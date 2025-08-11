import React from 'react';
import './Reviews.css';
import { REVIEWS as RAW_REVIEWS, getReviewsSummary } from './reviewsData';

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
  const initial = (name || '?').trim().charAt(0).toUpperCase();
  return (
    <div className="review__avatar" aria-hidden="true">
      {initial}
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
            <span className="review-card__rating-score">{review.rating.toFixed(1)}</span>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} filled={i < review.rating} />
            ))}
          </div>
          <span className="review-card__date">{review.date}</span>
        </div>
      </header>
      {showText && <blockquote className="review-card__text">“{review.text}”</blockquote>}
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
  return (
    <section className="reviews" id="reviews" aria-label="Client Reviews">
      <div className="reviews__header">
        <h2 className="reviews__title">Reviews</h2>
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

      <div className="reviews__scroller" aria-label="Reviews list">
        {REVIEWS.map((r) => (
          <ReviewCard key={r.name} review={r} />
        ))}
      </div>
    </section>
  );
}
