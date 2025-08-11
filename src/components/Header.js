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
  // city slug derived where needed; no local state here

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
        <Link to={'/'} className="header__logo" onClick={() => setIsMenuOpen(false)}>
          <img
            src={`${process.env.PUBLIC_URL}/images/logo.png`}
            alt="Zen Zone Cleaning Services"
            className="header__logo-image"
          />
          <span className="header__logo-text">Zen Zone Cleaning</span>
          <span className="header__flag" role="img" aria-label="Canada">
            🇨🇦
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="header__nav" aria-label="Primary">
          <a href="#locations" onClick={handleSectionClick('locations')}>
            Locations
          </a>
          <a href="#services" onClick={handleSectionClick('services')}>
            Services
          </a>
          <a href="#about" onClick={handleSectionClick('about')}>
            About
          </a>
          <a href="#why-us" onClick={handleSectionClick('why-us')}>
            Why Us
          </a>
          <Link to={'/blog'}>Blog</Link>
          <Link to={'/gallery'}>Gallery</Link>
        </nav>

        {/* Right side actions (desktop and mobile): phone, theme toggle, CTA, burger */}
        <div className="header__actions">
          <a href="tel:+17052425462" className="header__phone" aria-label="Call 705-242-5462">
            <span className="phone-icon" aria-hidden="true">
              📞
            </span>
            <span className="phone-text">705‑242‑5462</span>
          </a>
          <Link to={'/book'} className="header__book">
            Request Estimate
          </Link>
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

        {/* end header__actions */}
      </div>

      {/* Mobile slide-out menu */}
      <div
        id="mobile-menu"
        className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
        <div className="mobile-menu__panel">
          <button className="mobile-menu__burger" aria-label="Close menu" onClick={closeMenu}>
            <span className="menu-icon" />
          </button>
          <ThemeToggle size="medium" className="mobile-menu__theme-toggle" />
          <div className="mobile-menu__content">
            <a href="#locations" onClick={handleSectionClick('locations')}>
              Locations
            </a>
            <a href="#services" onClick={handleSectionClick('services')}>
              Services
            </a>
            <a href="#about" onClick={handleSectionClick('about')}>
              About
            </a>
            <a href="#why-us" onClick={handleSectionClick('why-us')}>
              Why Us
            </a>
            <Link to={'/blog'} onClick={closeMenu}>
              Blog
            </Link>
            <Link to={'/gallery'} onClick={closeMenu}>
              Gallery
            </Link>
            <Link to={'/book'} className="btn mobile-menu__cta" onClick={closeMenu}>
              Request Estimate
            </Link>
          </div>
        </div>
      </div>
      {isMenuOpen && <div className="menu-backdrop" onClick={closeMenu} aria-hidden="true" />}
    </header>
  );
};

export default Header;
