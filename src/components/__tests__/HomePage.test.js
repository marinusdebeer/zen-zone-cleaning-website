import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import HomePage from '../HomePage';

const renderWithRouter = (ui) =>
  render(
    <HelmetProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        {ui}
      </BrowserRouter>
    </HelmetProvider>
  );

test('renders hero heading', async () => {
  renderWithRouter(<HomePage />);
  await waitFor(() => expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument());
});
