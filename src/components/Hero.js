import React, { useMemo, useEffect, useRef } from 'react';
import { getReviewsSummary } from './reviewsData';
import { Link, useLocation } from 'react-router-dom';
import './Hero.css';
import './Faces.css';
import './Mascots.css';

/**
 * Hero section with a decorative background image, headline, sub‑text and a
 * simple quote form. The form is for demonstration purposes only and does
 * not submit data anywhere. Adjust the options to suit the business.
 */
const Hero = ({ title, subtitle }) => {
  const heroRef = useRef(null);
  const bgImgRef = useRef(null);
  const location = useLocation();
  const ratingInfo = useMemo(() => getReviewsSummary(), []);
  const match = location.pathname.match(/^\/house-cleaning-services-([a-z-]+)(?:\/.*)?$/);
  const citySlug = match ? match[1] : null;
  const cityName = citySlug
    ? citySlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : null;
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    let ticking = false;
    const parallaxStrength = 1; // 1 = background appears fixed while content scrolls

    const update = () => {
      try {
        if (!heroRef.current || !bgImgRef.current) return;
        const rect = heroRef.current.getBoundingClientRect();
        // Translate based on distance from top of viewport
        const translateY = Math.round(rect.top * -parallaxStrength);
        bgImgRef.current.style.transform = `translate3d(0, ${translateY}px, 0) scale(1.1)`;
      } finally {
        ticking = false;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const handleBgError = (e) => {
    try {
      e.currentTarget.onerror = null;
      e.currentTarget.src = `${process.env.PUBLIC_URL}/images/hero.webp`;
    } catch {}
  };

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero__background" style={{ willChange: 'transform' }}>
        <picture>
          {/* Prefer portrait asset on smaller screens */}
          <source media="(max-width: 768px)" srcSet={`${process.env.PUBLIC_URL}/images/hero.avif`} type="image/avif" />
          <source media="(max-width: 768px)" srcSet={`${process.env.PUBLIC_URL}/images/hero.webp`} type="image/webp" />
          {/* Default desktop/large */}
          <source srcSet={`${process.env.PUBLIC_URL}/images/hero.avif`} type="image/avif" />
          <source srcSet={`${process.env.PUBLIC_URL}/images/hero.webp`} type="image/webp" />
          <img
            src={`${process.env.PUBLIC_URL}/images/hero.webp`}
            alt=""
            aria-hidden="true"
            decoding="async"
            fetchpriority="high"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              willChange: 'transform'
            }}
            ref={bgImgRef}
            onError={handleBgError}
          />
        </picture>
      </div>
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
          <a href="tel:+17052425462" className="btn btn--call">
            <span className="phone-icon" aria-hidden="true">
              📞
            </span>
            Call Now
          </a>
        </div>
        
      </div>
    </section>
  );
};

export default Hero;
