import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Locations.css';
import Reveal from './Reveal';

/**
 * Displays the list of primary service areas as visually rich cards.
 * Each card links to the corresponding city landing page.
 */
const Locations = () => {
  const location = useLocation();
  const match = location.pathname.match(/^\/house-cleaning-services-([a-z-]+)$/);
  const citySlug = match ? match[1] : null;
  const cityName = citySlug
    ? citySlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : null;

  const areas = [
    {
      name: 'Barrie',
      slug: 'barrie',
      blurb: 'House cleaning and recurring plans across Barrie neighbourhoods.',
      image: `${process.env.PUBLIC_URL}/images/building.avif`,
    },
    {
      name: 'Orillia',
      slug: 'orillia',
      blurb: 'Trusted local cleaners serving homes throughout Orillia.',
      image: `${process.env.PUBLIC_URL}/images/house.avif`,
    },
    {
      name: 'Innisfil',
      slug: 'innisfil',
      blurb: 'Top‑rated cleaning services for Innisfil households.',
      image: `${process.env.PUBLIC_URL}/images/broom.avif`,
    },
    {
      name: 'Essa',
      slug: 'essa',
      blurb: 'Reliable cleaning for Angus, Baxter, and Thornton (including CFB Borden).',
      image: `${process.env.PUBLIC_URL}/images/building.avif`,
    },
    {
      name: 'Springwater',
      slug: 'springwater',
      blurb: 'Premium house cleaning for Midhurst, Elmvale, and surrounding areas.',
      image: `${process.env.PUBLIC_URL}/images/house.avif`,
    },
    {
      name: 'Oro‑Medonte',
      slug: 'oro-medonte',
      blurb: 'Trusted cleaners for Horseshoe Valley, Shanty Bay, and Hawkestone.',
      image: `${process.env.PUBLIC_URL}/images/broom.avif`,
    },
    {
      name: 'Severn',
      slug: 'severn',
      blurb: 'Dependable cleaning for Coldwater, Washago, and cottage properties.',
      image: `${process.env.PUBLIC_URL}/images/box.avif`,
    },
  ];

  return (
    <section className="section locations" id="locations" aria-label="Service Areas">
      <div className="locations__header">
        <Reveal as="h2" className="section__title" animation="up">Locations We Serve</Reveal>
        <Reveal as="p" className="section__subtitle" animation="up" delay={60}>Proudly serving communities across Simcoe County.</Reveal>

        {/* City-specific location information */}
        {cityName && (
          <div className="city-location-info">
            {citySlug === 'barrie' && (
              <p>
                <strong>Barrie residents:</strong> We're proud to serve every corner of Barrie, from
                the historic downtown core to the growing north end. Our team knows Barrie's
                neighborhoods intimately and provides reliable cleaning services that fit your
                lifestyle.
              </p>
            )}

            {citySlug === 'orillia' && (
              <p>
                <strong>Orillia homeowners:</strong> Serving Orillia with dedication and care. From
                the beautiful waterfront communities to the established residential areas, we
                understand what makes Orillia special and deliver cleaning services that maintain
                that charm.
              </p>
            )}

            {citySlug === 'innisfil' && (
              <p>
                <strong>Innisfil families:</strong> As Innisfil continues to grow and develop, we're
                here to serve both established communities and new developments. Our flexible
                cleaning services adapt to Innisfil's unique mix of rural charm and suburban
                convenience.
              </p>
            )}
          </div>
        )}
      </div>

      <div className="locations__grid reveal-stagger">
        {areas.map((area, idx) => (
          <Reveal
            as={Link}
            key={area.slug}
            to={`/house-cleaning-services-${area.slug}`}
            className="location-card"
            aria-label={`House cleaning services in ${area.name}`}
            animation={idx % 2 === 0 ? 'left' : 'right'}
          >
            <div className="location-card__body">
              <h3 className="location-card__title">{area.name}</h3>
              <p className="location-card__blurb">{area.blurb}</p>
              <span className="location-card__cta">Explore Services →</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Locations;
