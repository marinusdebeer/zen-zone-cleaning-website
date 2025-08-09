import React from 'react';
import './Footer.css';

/**
 * Footer component containing navigation shortcuts, contact information and
 * a minimal copyright notice. Feel free to add social links or additional
 * legal information as needed.
 */
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <div className="footer__logo">
            <span className="logo--highlight">Zen</span> Zone Cleaning Services
          </div>
          <p className="footer__tagline">
            Serving Barrie, Orillia &amp; communities throughout Simcoe County.
          </p>
        </div>
        <div className="footer__links">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#why-us">Why Us</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
        <div className="footer__contact">
          <h4>Contact</h4>
          <p>
            Phone:{' '}
            <a href="tel:+1-705-242-5462">705‑242‑5462</a>
          </p>
          <p>
            Email:{' '}
            <a href="mailto:admin@zenzonecleaning.ca">admin@zenzonecleaning.ca</a>
          </p>
          <p>Simcoe County, Ontario</p>
        </div>
      </div>
      <div className="footer__bottom">
        © {new Date().getFullYear()} Zen Zone Cleaning Services. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;