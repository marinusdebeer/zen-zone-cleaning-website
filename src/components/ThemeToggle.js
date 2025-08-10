import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import './ThemeToggle.css';

/**
 * ThemeToggle component provides a button to switch between light and dark themes.
 * It can be used anywhere in the application where theme switching is needed.
 */
const ThemeToggle = ({ className = '', size = 'medium' }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button 
      className={`theme-toggle theme-toggle--${size} ${className}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;
