import React, { useMemo } from 'react';
import { getReviewsSummary } from './reviewsData';
import { Link, useLocation } from 'react-router-dom';
import './Hero.css';

/**
 * Hero section with a decorative background image, headline, sub‑text and a
 * simple quote form. The form is for demonstration purposes only and does
 * not submit data anywhere. Adjust the options to suit the business.
 */
const Hero = ({ title, subtitle }) => {
  const location = useLocation();
  const ratingInfo = useMemo(() => getReviewsSummary(), []);
  const match = location.pathname.match(/^\/house-cleaning-services-([a-z-]+)(?:\/.*)?$/);
  const citySlug = match ? match[1] : null;
  const cityName = citySlug
    ? citySlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : null;
  return (
    <section className="hero">
      <div
        className="hero__background"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/hero.png)`,
        }}
      ></div>
      <div className="hero__overlay"></div>
      <div className="hero__content">
        <h1 className="hero__title">{title || 'House Cleaning Services'}</h1>
        <h2 className="hero__subtitle">
          {subtitle || 'Serving Barrie, Orillia, and greater Simcoe County'}
        </h2>
        <div className="hero__rating">
          <a
            href="https://maps.app.goo.gl/EyMWdSuMsExvrxaG7"
            target="_blank"
            rel="noopener noreferrer"
            className="hero__rating-badge"
            aria-label={`Rated ${ratingInfo.average.toFixed(1)} out of 5 on Google based on ${ratingInfo.count} reviews`}
          >
            <span className="google-word" aria-hidden="true">
              <span className="g g--blue">G</span>
              <span className="g g--red">o</span>
              <span className="g g--yellow">o</span>
              <span className="g g--blue">g</span>
              <span className="g g--green">l</span>
              <span className="g g--red">e</span>
            </span>
            <span className="hero__rating-sep" aria-hidden="true">
              •
            </span>
            <span className="hero__rating-score">{ratingInfo.average.toFixed(1)}</span>
            <span className="hero__rating-stars" aria-hidden="true">
              ★★★★★
            </span>
            <span className="hero__rating-count">({ratingInfo.count})</span>
          </a>
        </div>
        <p className="hero__subtitle">
          Family‑owned, reliable, and background‑checked professionals. Enjoy a spotless home and
          more free time—without lifting a finger.
        </p>

        {cityName && (
          <div className="route-chip" aria-live="polite">
            Now viewing: {cityName}
          </div>
        )}
        <div className="hero__buttons">
          <Link to={'/book'} className="btn">
            Request Estimate
          </Link>
          <a href="#services" className="btn btn--outline">
            See Services
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
