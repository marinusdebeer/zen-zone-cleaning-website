import React from 'react';
import Hero from './Hero';
import Steps from './Steps';
import Services from './Services';
import About from './About';
import Benefits from './Benefits';
import CTA from './CTA';

/**
 * The home page aggregates the core sections of the public site. It exists so
 * that React Router can swap between the home and booking pages without
 * repeating layout code in App.js.
 */
const HomePage = () => {
  return (
    <main>
      <Hero />
      <Steps />
      <Services />
      <About />
      <Benefits />
      <CTA />
    </main>
  );
};

export default HomePage;