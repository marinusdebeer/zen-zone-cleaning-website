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
          <span className="dot" aria-hidden>·</span>
          <a href="tel:+1-705-242-5462" aria-label="Call 705 242 5462">705‑242‑5462</a>
          <span className="dot" aria-hidden>·</span>
          <a href="mailto:admin@zenzonecleaning.ca">admin@zenzonecleaning.ca</a>
        </div>
        <nav className="footer__areas-inline" aria-label="Service Areas">
          <a href="/house-cleaning-services-barrie">Barrie</a>
          <span className="dot" aria-hidden>·</span>
          <a href="/house-cleaning-services-orillia">Orillia</a>
          <span className="dot" aria-hidden>·</span>
          <a href="/house-cleaning-services-innisfil">Innisfil</a>
        </nav>
      </div>
      <div className="footer__bottom" />
    </footer>
  );
};

export default Footer;