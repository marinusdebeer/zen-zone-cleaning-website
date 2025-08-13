import React, { useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import SEO from './SEO';
import './ConfirmationPage.css';

const ConfirmationPage = () => {
  const { state } = useLocation();
  const firstName = state?.firstName || 'Thank you';
  const email = state?.email || '';

  const subtitle = useMemo(() => {
    if (email) {
      return `We’ve emailed a confirmation to ${email}. Our team will contact you shortly with your estimate.`;
    }
    return 'Our team will contact you shortly with your estimate.';
  }, [email]);

  // Precompute firework bursts across the screen
  const fireworks = useMemo(() => {
    const COLORS = ['#34a853', '#fbbc05', '#ea4335', '#4285f4', '#FFD166', '#06D6A0', '#EF476F'];
    const bursts = [];
    const burstCount = 7;
    const piecesPerBurst = 26;
    for (let b = 0; b < burstCount; b += 1) {
      const left = `${5 + Math.random() * 90}%`;
      const top = `${10 + Math.random() * 70}%`;
      const pieces = [];
      for (let i = 0; i < piecesPerBurst; i += 1) {
        const angle = (360 / piecesPerBurst) * i;
        const distance = 110 + Math.round(Math.random() * 70);
        const delay = 250 + b * 320 + i * 8 + Math.round(Math.random() * 80);
        const color = COLORS[i % COLORS.length];
        pieces.push({ angle, distance, delay, color });
      }
      bursts.push({ left, top, pieces });
    }
    return bursts;
  }, []);

  return (
    <main>
      <SEO
        title="Request Received | Zen Zone Cleaning"
        description="Thanks for your request. Our team will be in touch shortly with your estimate. We’re open daily 8am–8pm."
        path="/confirmation"
        robots="noindex,follow"
      />
      <section className="confirm" aria-label="Request received confirmation">
        <div className="confirm__hero">
          <div className="confirm__badge" aria-hidden="true">
            <svg width="52" height="52" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="11" fill="currentColor" opacity="0.12" />
              <path d="M20 7L9 18l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="confirm__title">
            {firstName} — Request Received
          </h1>
          <p className="confirm__subtitle">{subtitle}</p>
        </div>

        <div className="confirm__card" role="region" aria-label="Next steps">
          <h2 className="confirm__card-title">What happens next?</h2>
          <ul className="confirm__list">
            <li>We’ll review your details and reach out to confirm any specifics.</li>
            <li>You’ll receive your free estimate.</li>
            <li>Have photos to add? Reply to the confirmation email with attachments.</li>
          </ul>
        </div>

        <div className="confirm__actions">
          <Link className="btn" to="/book">Make another request</Link>
          <a className="btn btn--outline" href="/">Return to homepage</a>
        </div>

        <div className="fireworks" aria-hidden="true">
          {fireworks.map((burst, bIdx) => (
            <div
              key={bIdx}
              className="fireworks__burst"
              style={{ left: burst.left, top: burst.top }}
            >
              {burst.pieces.map((p, i) => (
                <span
                  key={i}
                  className="fireworks__piece"
                  style={{
                    '--angle': `${p.angle}deg`,
                    '--distance': `${p.distance}px`,
                    '--delay': `${p.delay}ms`,
                    '--color': p.color,
                    '--duration': `${800 + (i % 5) * 60}ms`,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ConfirmationPage;
