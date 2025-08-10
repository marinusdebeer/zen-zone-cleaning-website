import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './CTA.css';

/**
 * A call‑to‑action banner encouraging visitors to request a quote or book a
 * service. The button uses the global .btn class defined in App.css.
 */
const CTA = ({ title, subtitle }) => {
  const location = useLocation();
  const match = location.pathname.match(/^\/house-cleaning-services-([a-z-]+)(?:\/.*)?$/);
  const citySlug = match ? match[1] : null;
  return (
    <section className="cta section" id="contact">
      <h2 className="cta__title">{title || 'Ready to Reclaim Your Time?'}</h2>
      <p className="cta__subtitle">
        {subtitle || 'Let our friendly professionals handle the cleaning while you focus on what matters most. We serve Barrie, Orillia and the entire Simcoe County.'}
      </p>
      <Link to={'/book'} className="btn">
        Request Estimate
      </Link>
    </section>
  );
};

export default CTA;