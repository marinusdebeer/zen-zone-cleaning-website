import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

/**
 * Header component renders the top navigation bar for the site.
 * It includes a simple typographic logo and anchor links that
 * scroll to the corresponding sections on the page.
 */
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      // If already on home page, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // If on different page, navigate to home page
      navigate('/');
    }
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <span className="logo--highlight">Zen</span> Zone Cleaning Services
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