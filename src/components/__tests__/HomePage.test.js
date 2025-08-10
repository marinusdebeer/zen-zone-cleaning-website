import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import HomePage from '../HomePage';

const renderWithRouter = (ui) =>
  render(
    <HelmetProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </HelmetProvider>
  );

test('renders hero heading', () => {
  renderWithRouter(<HomePage />);
  expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
});
