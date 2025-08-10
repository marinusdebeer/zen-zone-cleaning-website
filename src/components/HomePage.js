import React from 'react';
import { useLocation } from 'react-router-dom';
import SEO from './SEO';
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
const capitalizeWords = (s) => s.replace(/\b\w/g, (c) => c.toUpperCase());
const HomePage = ({ heroTitle, heroSubtitle }) => {
  const location = useLocation();
  const match = location.pathname.match(/^\/house-cleaning-services-([a-z-]+)$/);
  const citySlug = match ? match[1] : null;
  const cityName = citySlug ? capitalizeWords(citySlug.replace(/-/g, ' ')) : null;

  const title = cityName
    ? `House Cleaning Services in ${cityName} | Zen Zone Cleaning`
    : 'House Cleaning Services in Simcoe County | Zen Zone Cleaning';
  const description = cityName
    ? `Trusted house cleaning in ${cityName}. Recurring and one‑time cleans by vetted pros. Request your free estimate.`
    : 'Trusted house cleaning in Barrie, Orillia, and Innisfil. Recurring and one‑time cleans by vetted pros. Request your free estimate.';

  const localBusinessLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Zen Zone Cleaning',
    url: 'https://zenzonecleaning.com',
    telephone: '+1-705-242-5462',
    email: 'admin@zenzonecleaning.com',
    image: 'https://zenzonecleaning.com/images/hero.png',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '49 High St Suite 300',
      addressLocality: 'Barrie',
      addressRegion: 'ON',
      postalCode: 'L4N 5J4',
      addressCountry: 'CA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 44.3894,
      longitude: -79.6903,
    },
    areaServed: cityName || 'Simcoe County',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '08:00',
        closes: '20:00',
      },
    ],
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What if I need to reschedule?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'You can reschedule up to 12 hours before your cleaning via your client portal or by calling us. We’ll find a new slot that fits your needs.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I get the same cleaner every time?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Whenever possible, yes! We aim to send the same team to build familiarity with your home and your preferences.',
        },
      },
      {
        '@type': 'Question',
        name: 'What if I’m not happy with the clean?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Your satisfaction is guaranteed. If anything was missed, let us know within 24 hours and we’ll return to make it right—free of charge.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I pay for my recurring plan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'After each cleaning, we\'ll send you an invoice that you can pay by e‑transfer or credit card. You can also set up automatic payments.',
        },
      },
    ],
  };

  return (
    <main>
      <SEO title={title} description={description} path={location.pathname} jsonLd={[localBusinessLd, faqLd]} />
      <Hero title={heroTitle} subtitle={heroSubtitle} />
      {cityName && (
        <section className="section" aria-label={`House Cleaning in ${cityName}`}>
          <h2>House Cleaning in {cityName}</h2>
          <p>
            Professional recurring and one‑time cleaning services across {cityName}. Background‑checked cleaners,
            supplies included, flexible scheduling. Open daily 8am–8pm.
          </p>
        </section>
      )}
      <Locations />
      <Services />
      <About />
      <Benefits />
      <Steps />
    </main>
  );
};

export default HomePage;