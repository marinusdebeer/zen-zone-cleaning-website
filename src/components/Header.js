import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

/**
 * Header component renders the top navigation bar for the site.
 * It includes a simple typographic logo and anchor links that
 * scroll to the corresponding sections on the page.
 */
const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <span className="logo--highlight">Zen</span> Zone
        </div>
        <nav className="header__nav">
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#why-us">Why Us</a>
          <a href="#contact">Contact</a>
          {/* Use Link for internal routing to avoid full page reloads */}
          <Link to="/book" className="header__book">Book Now</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;