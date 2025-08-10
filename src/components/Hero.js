import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

/**
 * Hero section with a decorative background image, headline, sub‑text and a
 * simple quote form. The form is for demonstration purposes only and does
 * not submit data anywhere. Adjust the options to suit the business.
 */
const Hero = ({ title, subtitle }) => {
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
        <h2 className="hero__subtitle">{subtitle || 'Serving Barrie, Orillia, and greater Simcoe County'}</h2>
        <p className="hero__subtitle">
          Family‑owned, reliable, and background‑checked professionals. Enjoy a spotless
          home and more free time—without lifting a finger.
        </p>

        <div className="hero__buttons">
          <Link to="/book" className="btn">Request Estimate</Link>
          <a href="#services" className="btn btn--outline">See Services</a>
        </div>

        <ul className="hero__trust" aria-label="reasons to trust Zen Zone Cleaning">
          <li>5‑Star Rated</li>
          <li>Background‑Checked</li>
          <li>Supplies Included</li>
        </ul>
      </div>
    </section>
  );
};

export default Hero;