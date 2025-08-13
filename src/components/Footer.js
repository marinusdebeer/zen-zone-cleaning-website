import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

/**
 * Footer component containing navigation shortcuts, contact information and
 * a minimal copyright notice. Feel free to add social links or additional
 * legal information as needed.
 */
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container footer__container--compact">
        <div className="footer__meta">
          <span>© {new Date().getFullYear()} Zen Zone Cleaning Services</span>
          <span className="dot" aria-hidden>
            ·
          </span>
          <a href="tel:+1-705-242-5462" aria-label="Call 705 242 5462">
            705‑242‑5462
          </a>
          <span className="dot" aria-hidden>
            ·
          </span>
          <a href="mailto:admin@zenzonecleaning.com">admin@zenzonecleaning.com</a>
          <span className="dot" aria-hidden>
            ·
          </span>
          <span>Open daily 8am–8pm</span>
          <span className="dot" aria-hidden>
            ·
          </span>
          <address style={{ display: 'inline' }}>49 High St Suite 300, Barrie, ON L4N 5J4</address>
        </div>
      </div>
      <div className="footer__bottom" />
      <div className="footer__container footer__container--compact" style={{ marginTop: '0.5rem' }}>
        <nav aria-label="Legal" style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</Link>
          <span className="dot" aria-hidden>·</span>
          <Link to="/terms" target="_blank" rel="noopener noreferrer">Terms & Conditions</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
