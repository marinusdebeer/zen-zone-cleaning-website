import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import BookingPage from './components/BookingPage';
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
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book" element={<BookingPage />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}

export default App;