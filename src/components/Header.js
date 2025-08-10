import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
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
          <img 
            src={`${process.env.PUBLIC_URL}/images/logo.png`} 
            alt="Zen Zone Cleaning Services" 
            className="header__logo-image"
          />
          <span className="header__logo-text">Zen Zone Cleaning Services</span>
        </div>
        <nav className="header__nav">
          <a href="/zen-zone-cleaning-website/#services">Services</a>
          <a href="/zen-zone-cleaning-website/#about">About</a>
          <a href="/zen-zone-cleaning-website/#why-us">Why Us</a>
          <a href="/zen-zone-cleaning-website/#contact">Contact</a>
          <ThemeToggle size="medium" />
          {/* Use Link for internal routing to avoid full page reloads */}
          <Link to="/book" className="header__book">Book Now</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;