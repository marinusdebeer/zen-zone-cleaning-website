import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';
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

  // NOTE: Avoid locking body scroll to preserve sticky header on mobile
  useEffect(() => {
    document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  // Close drawer with Escape key
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') closeMenu(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMenuOpen]);

  const handleSectionClick = (sectionId) => (event) => {
    event.preventDefault();
    const onHome = location.pathname === '/' || isCityHomepagePath(location.pathname);
    if (onHome) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        try { window.history.replaceState(null, '', `#${sectionId}`); } catch {}
      }
    } else {
      let base = '/';
      try {
        const preferred = localStorage.getItem('preferredCitySlug');
        if (preferred) base = `/house-cleaning-services-${preferred}`;
      } catch {}
      navigate(`${base}#${sectionId}`);
    }
    setIsMenuOpen(false);
  };

  const drawer = (
    <div
      id="mobile-menu"
      className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      onClick={(e) => { if (e.target === e.currentTarget) closeMenu(); }}
    >
      <div className="mobile-menu__panel" onClick={(e) => e.stopPropagation()}>
        <button className="mobile-menu__burger" aria-label="Close menu" onClick={closeMenu}>
          <span className="menu-icon" />
        </button>
        <ThemeToggle size="medium" className="mobile-menu__theme-toggle" />
        <div className="mobile-menu__content">
          <a href="#services" onClick={handleSectionClick('services')}>Services</a>
          <a href="#locations" onClick={handleSectionClick('locations')}>Locations</a>
          <a href="#about" onClick={handleSectionClick('about')}>About</a>
          <a href="#why-us" onClick={handleSectionClick('why-us')}>Why Us</a>
          <Link to={'/gallery'} onClick={closeMenu}>Gallery</Link>
          <Link to={'/blog'} onClick={closeMenu}>Blog</Link>
          <Link to={'/book'} className="btn mobile-menu__cta" onClick={closeMenu}>Request Estimate</Link>
        </div>
      </div>
    </div>
  );

  return (
    <header className="header">
      <div className="header__container">
        <Link to={'/'} className="header__logo" onClick={(e) => {
          setIsMenuOpen(false);
          try {
            const preferred = localStorage.getItem('preferredCitySlug');
            if (preferred) {
              e.preventDefault();
              navigate(`/house-cleaning-services-${preferred}`);
              try { setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0); } catch {}
              return;
            }
          } catch {}
          try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch {}
        }}>
          <picture>
            <source type="image/avif" srcSet={`${process.env.PUBLIC_URL}/images/logo.avif`} />
            <img src={`${process.env.PUBLIC_URL}/images/logo.webp`} alt="Zen Zone Cleaning Services" className="header__logo-image" />
          </picture>
          <span className="header__logo-text"><span className="header__logo-text-zen">Zen</span>Zone</span>
          <span className="header__flag" role="img" aria-label="Canada">🇨🇦</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="header__nav" aria-label="Primary">
          <a href="#services" onClick={handleSectionClick('services')}>Services</a>
          <a href="#locations" onClick={handleSectionClick('locations')}>Locations</a>
          <a href="#about" onClick={handleSectionClick('about')}>About</a>
          <a href="#why-us" onClick={handleSectionClick('why-us')}>Why Us</a>
          <Link to={'/gallery'}>Gallery</Link>
          <Link to={'/blog'}>Blog</Link>
        </nav>

        {/* Right side actions (desktop and mobile): phone, theme toggle, CTA, burger */}
        <div className="header__actions">
          <a href="tel:+17052425462" className="header__phone" aria-label="Call 705-242-5462">
            <span className="phone-icon" aria-hidden="true">📞</span>
            <span className="phone-text">705‑242‑5462</span>
          </a>
          <Link to={'/book'} className="header__book">Request Estimate</Link>
          <ThemeToggle size="medium" />
          <button className="header__menu-toggle" aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={isMenuOpen} aria-controls="mobile-menu" onClick={() => setIsMenuOpen((v) => !v)}>
            <span className="menu-icon" />
          </button>
        </div>
      </div>

      {createPortal(drawer, document.body)}
      {isMenuOpen && createPortal(<div className="menu-backdrop" onClick={closeMenu} aria-hidden="true" />, document.body)}
    </header>
  );
};

export default Header;
