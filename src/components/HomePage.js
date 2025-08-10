import React from 'react';
import Hero from './Hero';
import Steps from './Steps';
import Services from './Services';
import About from './About';
import Benefits from './Benefits';
import Locations from './Locations';

/**
 * The home page aggregates the core sections of the public site. It exists so
 * that React Router can swap between the home and booking pages without
 * repeating layout code in App.js.
 */
const HomePage = ({ heroTitle, heroSubtitle, ctaTitle, ctaSubtitle }) => {
  return (
    <main>
      <Hero title={heroTitle} subtitle={heroSubtitle} />
      <Locations />
      <Services />
      <About />
      <Benefits />
      <Steps />
    </main>
  );
};

export default HomePage;