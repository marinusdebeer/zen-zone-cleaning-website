import React from 'react';
import './Hero.css';

/**
 * Hero section with a decorative background image, headline, sub‑text and a
 * simple quote form. The form is for demonstration purposes only and does
 * not submit data anywhere. Adjust the options to suit the business.
 */
const Hero = () => {
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
        <h1 className="hero__title">House Cleaning Barrie & Orillia</h1>
        <p className="hero__subtitle">
          Serving Simcoe County. Take cleaning off your busy schedule with our
          family‑owned service and reclaim your free time.
        </p>
        <form
          className="hero__form"
          onSubmit={(e) => {
            e.preventDefault();
            // In a real application, you would handle form submission here.
            alert('Thank you! We will be in touch shortly.');
          }}
        >
          <div className="form-row">
            <input type="text" name="name" placeholder="Name" required />
            <input type="email" name="email" placeholder="Email" required />
          </div>
          <div className="form-row">
            <input type="tel" name="phone" placeholder="Phone" required />
            <select name="cleaningType" defaultValue="">
              <option value="" disabled>
                Type of Cleaning
              </option>
              <option value="standard">Standard</option>
              <option value="deep">Deep</option>
              <option value="move">Move In/Out</option>
              <option value="office">Office</option>
            </select>
          </div>
          <div className="form-row">
            <select name="bedrooms" defaultValue="">
              <option value="" disabled>
                No. of Bedrooms
              </option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <select name="bathrooms" defaultValue="">
              <option value="" disabled>
                No. of Bathrooms
              </option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn hero__button">
            Get My Estimate
          </button>
        </form>
      </div>
    </section>
  );
};

export default Hero;