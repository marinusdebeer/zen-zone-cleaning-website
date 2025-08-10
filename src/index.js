import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Use a basename only when PUBLIC_URL provides a path (e.g., GitHub Pages);
// for custom domains, PUBLIC_URL will be the domain root and this returns ''.
const computeBasename = () => {
  if (process.env.NODE_ENV !== 'production') return '';
  try {
    const pathname = new URL(process.env.PUBLIC_URL, window.location.origin).pathname;
    return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  } catch {
    return '';
  }
};

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
