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