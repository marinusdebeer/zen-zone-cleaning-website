import React from 'react';
import { useLocation } from 'react-router-dom';
import SEO from './SEO';
import Hero from './Hero';
import Steps from './Steps';
import Services from './Services';
import About from './About';
import Benefits from './Benefits';
import Locations from './Locations';
import Reviews from './Reviews';
import Gallery from './Gallery';
import { getReviewsSummary } from './reviewsData';

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
  const { average, count } = getReviewsSummary();

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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: average.toFixed(1),
      reviewCount: String(count),
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
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
          text: 'You can reschedule up to 12 hours before your cleaning via your client portal or by calling us. We’ll find a new slot that fits your needs.',
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
          text: 'Your satisfaction is guaranteed. If anything was missed, let us know within 24 hours and we’ll return to make it right—free of charge.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I pay for my recurring plan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "After each cleaning, we'll send you an invoice that you can pay by e‑transfer or credit card. You can also set up automatic payments.",
        },
      },
    ],
  };

  React.useEffect(() => {
    // On city route change, focus the heading for an accessible visual cue
    const el = document.querySelector('main h2');
    if (cityName && el) {
      el.focus({ preventScroll: true });
    }
  }, [cityName, location.pathname]);

  return (
    <main>
      <SEO
        title={title}
        description={description}
        path={location.pathname}
        jsonLd={[localBusinessLd, faqLd]}
      />
      <Hero title={heroTitle} subtitle={heroSubtitle} />
      
      <Services />
      <Reviews />
      <About />
      <Gallery limit={8} fullWidth strip />
      <Benefits />
      <Steps />
      <Locations />
      {cityName && (
        <section className="section" aria-label={`House Cleaning in ${cityName}`}>
          <h2 tabIndex="-1">House Cleaning in {cityName}</h2>
          <p>
            Professional recurring and one‑time cleaning services across {cityName}.
            Background‑checked cleaners, supplies included, flexible scheduling. Open daily 8am–8pm.
          </p>

          {/* City-specific content */}
          {citySlug === 'barrie' && (
            <div className="city-details">
              <h3>Why Choose Zen Zone Cleaning in Barrie?</h3>
              <p>
                As Barrie's premier cleaning service, we understand the unique needs of homes in
                this vibrant lakeside city. From the historic downtown core to the growing
                communities of Holly, Painswick, and Allandale, our team serves every corner of
                Barrie with the same dedication to excellence.
              </p>
              <div className="city-features">
                <div className="city-feature">
                  <h4>🏠 Barrie Neighborhoods We Serve</h4>
                  <ul>
                    <li>Downtown Barrie & Waterfront</li>
                    <li>Holly & Painswick</li>
                    <li>Allandale & Eastview</li>
                    <li>Ardagh & Sunnidale</li>
                    <li>Lampman Lane & Mapleview</li>
                  </ul>
                </div>
                <div className="city-feature">
                  <h4>🌟 Local Barrie Advantages</h4>
                  <ul>
                    <li>Quick response times across the city</li>
                    <li>Familiar with Barrie's seasonal cleaning needs</li>
                    <li>Local team members who know the area</li>
                    <li>Flexible scheduling around Barrie's busy lifestyle</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {citySlug === 'orillia' && (
            <div className="city-details">
              <h3>Trusted Cleaning Services in Orillia</h3>
              <p>
                Serving Orillia with pride since our founding, we've built lasting relationships
                with families throughout this beautiful lakeside community. Our local team knows
                Orillia's unique character and provides personalized cleaning solutions for homes in
                every neighborhood.
              </p>
              <div className="city-features">
                <div className="city-feature">
                  <h4>🏠 Orillia Areas We Cover</h4>
                  <ul>
                    <li>Downtown Orillia & Waterfront</li>
                    <li>West Ridge & Westmount</li>
                    <li>North Ward & East Ward</li>
                    <li>Lakeshore & Tudhope Park</li>
                    <li>Mountainview & Coldwater</li>
                  </ul>
                </div>
                <div className="city-feature">
                  <h4>🌟 Why Orillia Chooses Us</h4>
                  <ul>
                    <li>Deep roots in the Orillia community</li>
                    <li>Understanding of local seasonal challenges</li>
                    <li>Reliable service for busy Orillia families</li>
                    <li>Competitive pricing for the Orillia market</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {citySlug === 'innisfil' && (
            <div className="city-details">
              <h3>Professional Cleaning Throughout Innisfil</h3>
              <p>
                From the shores of Lake Simcoe to the growing communities of Alcona and Stroud, we
                provide comprehensive cleaning services across Innisfil. Our team understands the
                unique needs of this rapidly expanding area and delivers consistent, reliable
                service to every home.
              </p>
              <div className="city-features">
                <div className="city-feature">
                  <h4>🏠 Innisfil Communities We Serve</h4>
                  <ul>
                    <li>Alcona & Lake Simcoe Shores</li>
                    <li>Stroud & Lefroy</li>
                    <li>Belle Ewart & Churchill</li>
                    <li>Gilford & Big Bay Point</li>
                    <li>Innisfil Heights & 9th Line</li>
                  </ul>
                </div>
                <div className="city-feature">
                  <h4>🌟 Innisfil-Specific Benefits</h4>
                  <ul>
                    <li>Adapted to Innisfil's growth and development</li>
                    <li>Understanding of rural and suburban cleaning needs</li>
                    <li>Flexible scheduling for Innisfil's diverse communities</li>
                    <li>Local knowledge of area-specific cleaning challenges</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {citySlug === 'essa' && (
            <div className="city-details">
              <h3>Reliable Cleaning Services in Essa (Angus, Baxter, Thornton)</h3>
              <p>
                From Angus and CFB Borden to Baxter and Thornton, our team delivers dependable
                cleaning tailored to the unique rhythm of these fast‑growing commuter towns. We’re
                experienced supporting military families and busy households with flexible, reliable
                scheduling.
              </p>
              <div className="city-features">
                <div className="city-feature">
                  <h4>🏠 Essa Communities We Serve</h4>
                  <ul>
                    <li>Angus & CFB Borden</li>
                    <li>Baxter & rural Essa</li>
                    <li>Thornton & surrounding hamlets</li>
                    <li>Nottawasaga & County Road corridors</li>
                  </ul>
                </div>
                <div className="city-feature">
                  <h4>🌟 Essa‑Specific Benefits</h4>
                  <ul>
                    <li>Flexible plans around training and deployments</li>
                    <li>Quick access to Barrie & commuter schedules</li>
                    <li>Trusted by military and civilian families alike</li>
                    <li>Respect for base area protocols and privacy</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {citySlug === 'springwater' && (
            <div className="city-details">
              <h3>Premium Cleaning for Springwater (Midhurst, Elmvale)</h3>
              <p>
                We care for Springwater’s beautiful homes with meticulous attention to detail. From
                family houses in Midhurst to character properties in Elmvale, we tailor our cleans
                to higher‑end finishes and larger floor plans.
              </p>
              <div className="city-features">
                <div className="city-feature">
                  <h4>🏠 Springwater Areas We Cover</h4>
                  <ul>
                    <li>Midhurst & Forest Hill areas</li>
                    <li>Elmvale & surrounding concessions</li>
                    <li>Minesing & Anten Mills</li>
                    <li>Snow Valley & Vespra</li>
                  </ul>
                </div>
                <div className="city-feature">
                  <h4>🌟 Springwater‑Focused Care</h4>
                  <ul>
                    <li>Expert care for premium finishes and fixtures</li>
                    <li>Detailed attention for larger homes</li>
                    <li>Flexible scheduling for busy families</li>
                    <li>Seasonal adjustments for rural roads and access</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {citySlug === 'oro-medonte' && (
            <div className="city-details">
              <h3>Trusted Cleaning Across Oro‑Medonte</h3>
              <p>
                From Horseshoe Valley to Shanty Bay and Hawkestone, we serve year‑round and seasonal
                homes across Oro‑Medonte. Our team adapts to cottage and estate‑style properties
                with careful attention to materials and access.
              </p>
              <div className="city-features">
                <div className="city-feature">
                  <h4>🏠 Oro‑Medonte Communities We Serve</h4>
                  <ul>
                    <li>Horseshoe Valley & ski areas</li>
                    <li>Shanty Bay & Ridge Road</li>
                    <li>Hawkestone & Lake Simcoe shoreline</li>
                    <li>Warminster & rural concessions</li>
                  </ul>
                </div>
                <div className="city-feature">
                  <h4>🌟 Oro‑Medonte‑Specific Benefits</h4>
                  <ul>
                    <li>Care for seasonal and luxury properties</li>
                    <li>Attention to wood, stone, and specialty finishes</li>
                    <li>Coordinated access for gated or cottage roads</li>
                    <li>Reliable service in all seasons</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {citySlug === 'severn' && (
            <div className="city-details">
              <h3>Dependable Cleaning in Severn (Coldwater, Washago)</h3>
              <p>
                We support Severn’s mix of residential and cottage properties—from Coldwater to
                Washago—with dependable cleaning that fits weekend and full‑time living schedules.
              </p>
              <div className="city-features">
                <div className="city-feature">
                  <h4>🏠 Severn Areas We Cover</h4>
                  <ul>
                    <li>Coldwater & Matchedash Bay area</li>
                    <li>Washago & Severn Bridge</li>
                    <li>Port Severn & Georgian Bay access</li>
                    <li>Rural Severn concessions</li>
                  </ul>
                </div>
                <div className="city-feature">
                  <h4>🌟 Severn‑Focused Service</h4>
                  <ul>
                    <li>Options for cottages and full‑time residences</li>
                    <li>Seasonal scheduling for weekend stays</li>
                    <li>Care for mixed rural and waterfront properties</li>
                    <li>Trusted local team familiar with the area</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </section>
      )}
    </main>
  );
};

export default HomePage;
