import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import BookingPage from './components/BookingPage';
import ConfirmationPage from './components/ConfirmationPage';
import FullGalleryPage from './components/FullGalleryPage';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import ScrollToTop from './components/ScrollToTop';
import RouteChangeIndicator from './components/RouteChangeIndicator';
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
        <RouteChangeIndicator />
        <div className="app-content route-transition">
          <ScrollToTop />
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
            <Route
              path="/house-cleaning-services-essa"
              element={
                <HomePage
                  heroTitle="House Cleaning Services in Essa"
                  heroSubtitle="Reliable cleaners serving Angus, Baxter, and Thornton"
                  ctaTitle="Need a Cleaner in Essa?"
                  ctaSubtitle="Trusted local cleaners. We serve Angus, Baxter, Thornton, and CFB Borden families."
                />
              }
            />
            <Route
              path="/house-cleaning-services-springwater"
              element={
                <HomePage
                  heroTitle="House Cleaning Services in Springwater"
                  heroSubtitle="Professional cleaners serving Midhurst and Elmvale"
                  ctaTitle="Looking for Cleaning Help in Springwater?"
                  ctaSubtitle="Premium service for Springwater homes, including Midhurst, Elmvale, and nearby areas."
                />
              }
            />
            <Route
              path="/house-cleaning-services-oro-medonte"
              element={
                <HomePage
                  heroTitle="House Cleaning Services in Oro‑Medonte"
                  heroSubtitle="Trusted cleaners for Horseshoe Valley, Shanty Bay, and Hawkestone"
                  ctaTitle="Your Oro‑Medonte Home, Expertly Cleaned"
                  ctaSubtitle="Reliable cleaning across Oro‑Medonte, tailored for year‑round and seasonal homes."
                />
              }
            />
            <Route
              path="/house-cleaning-services-severn"
              element={
                <HomePage
                  heroTitle="House Cleaning Services in Severn"
                  heroSubtitle="Serving Coldwater, Washago, and surrounding communities"
                  ctaTitle="Need a Cleaner in Severn?"
                  ctaSubtitle="Dependable cleaning for cottages and residential homes throughout Severn."
                />
              }
            />
            <Route path="/gallery" element={<FullGalleryPage />} />
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
