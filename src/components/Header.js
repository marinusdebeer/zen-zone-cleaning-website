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

  const isCityHomepagePath = (pathname) => /^\/house-cleaning-services-[a-z-]+$/.test(pathname);
  const currentCitySlug = () => {
    const match = location.pathname.match(/^\/house-cleaning-services-([a-z-]+)(?:\/.*)?$/);
    return match ? match[1] : null;
  };

  const handleLogoClick = () => {
    navigate('/');
    setIsMenuOpen(false);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const handleSectionClick = (sectionId) => (event) => {
    event.preventDefault();
    const onHome = location.pathname === '/' || isCityHomepagePath(location.pathname);
    if (onHome) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        try {
          window.history.replaceState(null, '', `#${sectionId}`);
        } catch {}
      }
    } else {
      navigate(`/#${sectionId}`);
    }
    setIsMenuOpen(false);
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
          <span className="header__flag" role="img" aria-label="Canada">
            🇨🇦
          </span>
        </div>

        {/* Desktop navigation */}
        <nav className="header__nav">
          <a href="#services" onClick={handleSectionClick('services')}>
            Services
          </a>
          <a href="#about" onClick={handleSectionClick('about')}>
            About
          </a>
          <a href="#why-us" onClick={handleSectionClick('why-us')}>
            Why Us
          </a>
          <a href="#contact" onClick={handleSectionClick('contact')}>
            Contact
          </a>
          <ThemeToggle size="medium" />
          <Link to={'/book'} className="header__book">
            Request Estimate
          </Link>
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
        <button className="mobile-menu__close" aria-label="Close menu" onClick={closeMenu}>
          ×
        </button>
        <div className="mobile-menu__content">
          <a href="#services" onClick={handleSectionClick('services')}>
            Services
          </a>
          <a href="#about" onClick={handleSectionClick('about')}>
            About
          </a>
          <a href="#why-us" onClick={handleSectionClick('why-us')}>
            Why Us
          </a>
          <a href="#contact" onClick={handleSectionClick('contact')}>
            Contact
          </a>
          <Link to={'/book'} className="btn mobile-menu__cta" onClick={closeMenu}>
            Request Estimate
          </Link>
        </div>
      </div>
      {isMenuOpen && <div className="menu-backdrop" onClick={closeMenu} aria-hidden="true" />}
    </header>
  );
};

export default Header;
