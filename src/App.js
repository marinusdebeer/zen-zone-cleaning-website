import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import BookingPage from './components/BookingPage';
import ConfirmationPage from './components/ConfirmationPage';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';

/**
 * The root application component.
 *
 * It stitches together the page sections into a cohesive single‑page layout.
 * Each section is encapsulated in its own component for clarity and reuse.
 */
function App() {
  return (
    <ThemeProvider>
      <div className="app-shell">
        <Header />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/house-cleaning-services-barrie"
              element={
                <HomePage
                  heroTitle="House Cleaning Services in Barrie"
                  heroSubtitle="Trusted local cleaners serving Barrie homes"
                  ctaTitle="Need a Reliable Cleaner in Barrie?"
                  ctaSubtitle="Professional, background‑checked cleaners. We proudly serve Barrie and nearby areas."
                />
              }
            />
            <Route
              path="/house-cleaning-services-orillia"
              element={
                <HomePage
                  heroTitle="House Cleaning Services in Orillia"
                  heroSubtitle="Friendly, dependable cleaners serving Orillia"
                  ctaTitle="Looking for Cleaning Help in Orillia?"
                  ctaSubtitle="Book trusted local cleaners. We serve Orillia and surrounding communities."
                />
              }
            />
            <Route
              path="/house-cleaning-services-innisfil"
              element={
                <HomePage
                  heroTitle="House Cleaning Services in Innisfil"
                  heroSubtitle="Top‑rated cleaners serving Innisfil households"
                  ctaTitle="Your Innisfil Home, Expertly Cleaned"
                  ctaSubtitle="Flexible scheduling and vetted pros. We serve Innisfil and nearby neighborhoods."
                />
              }
            />
            <Route path="/book" element={<BookingPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
