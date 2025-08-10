import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import './Header.css';

/**
 * Header component renders the top navigation bar for the site.
 * Desktop shows inline navigation. On mobile, a hamburger opens a
 * slide‑out menu that contains nav links and the primary CTA button.
 * The theme toggle is shown inline next to the hamburger on mobile.
 */
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

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

        {/* Desktop navigation */}
        <nav className="header__nav">
          <a href="/zen-zone-cleaning-website/#services">Services</a>
          <a href="/zen-zone-cleaning-website/#about">About</a>
          <a href="/zen-zone-cleaning-website/#why-us">Why Us</a>
          <a href="/zen-zone-cleaning-website/#contact">Contact</a>
          <ThemeToggle size="medium" />
          <Link to="/book" className="header__book">Request Estimate</Link>
        </nav>

        {/* Mobile actions: theme toggle + hamburger */}
        <div className="header__actions">
          <ThemeToggle size="medium" />
          <button
            className="header__menu-toggle"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            <span className="menu-icon" />
          </button>
        </div>
      </div>

      {/* Mobile slide-out menu */}
      <div
        id="mobile-menu"
        className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
        <div className="mobile-menu__content">
          <a href="/zen-zone-cleaning-website/#services" onClick={closeMenu}>Services</a>
          <a href="/zen-zone-cleaning-website/#about" onClick={closeMenu}>About</a>
          <a href="/zen-zone-cleaning-website/#why-us" onClick={closeMenu}>Why Us</a>
          <a href="/zen-zone-cleaning-website/#contact" onClick={closeMenu}>Contact</a>
          <Link to="/book" className="btn mobile-menu__cta" onClick={closeMenu}>Request Estimate</Link>
        </div>
      </div>
      {isMenuOpen && <div className="menu-backdrop" onClick={closeMenu} aria-hidden="true" />}
    </header>
  );
};

export default Header;