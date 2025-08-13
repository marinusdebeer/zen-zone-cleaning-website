import React from 'react';
import { REVIEWS as RAW_REVIEWS, getReviewsSummary } from './reviewsData';

const REVIEWS = [...RAW_REVIEWS]
  .sort((a, b) => new Date(b.date) - new Date(a.date));
const SUMMARY = getReviewsSummary();

function StarRow({ rating }) {
  const stars = Array.from({ length: 5 });
  return (
    <span aria-label={`${rating} out of 5 stars`} className="mini-reviews__stars">
      {stars.map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          className={`mini-reviews__star ${i < rating ? 'is-filled' : ''}`}
          aria-hidden="true"
        >
          <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.786 1.401 8.164L12 18.896l-7.335 3.864 1.401-8.164L.132 9.21l8.2-1.192L12 .587z" />
        </svg>
      ))}
    </span>
  );
}

export default function MiniReviews() {
  return (
    <section className="sidebar-card mini-reviews" aria-label="Recent Reviews">
      <div className="mini-reviews__header">
        <h3 className="sidebar-card__title">What clients say</h3>
        <a
          href="https://maps.app.goo.gl/EyMWdSuMsExvrxaG7"
          target="_blank"
          rel="noopener noreferrer"
          className="mini-reviews__link"
          aria-label={`Open Google Reviews. Average ${SUMMARY.average.toFixed(1)} from ${SUMMARY.count} reviews`}
        >
          Google Reviews • <strong>{SUMMARY.average.toFixed(1)}</strong> ({SUMMARY.count})
        </a>
      </div>
      <ul className="mini-reviews__list mini-reviews__scroller" role="list" aria-label="Recent reviews list">
        {REVIEWS.map((r) => (
          <li key={`${r.name}-${r.date}`} className="mini-reviews__item">
            <div className="mini-reviews__row">
              <span className="mini-reviews__name">{r.name}</span>
              <StarRow rating={r.rating} />
            </div>
            <div className="mini-reviews__meta">
              <span className="mini-reviews__date" aria-label="Review date">{r.date}</span>
            </div>
            {r.text && !/^\[no written review provided\]/i.test(r.text.trim()) && (
              <p className="mini-reviews__text">“{r.text}”</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}


