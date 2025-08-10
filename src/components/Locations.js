import React from 'react';
import { Link } from 'react-router-dom';
import './Locations.css';

/**
 * Displays the list of primary service areas as visually rich cards.
 * Each card links to the corresponding city landing page.
 */
const Locations = () => {
  const areas = [
    {
      name: 'Barrie',
      slug: 'barrie',
      blurb: 'House cleaning and recurring plans across Barrie neighbourhoods.',
      image: `${process.env.PUBLIC_URL}/images/building.png`,
    },
    {
      name: 'Orillia',
      slug: 'orillia',
      blurb: 'Trusted local cleaners serving homes throughout Orillia.',
      image: `${process.env.PUBLIC_URL}/images/house.png`,
    },
    {
      name: 'Innisfil',
      slug: 'innisfil',
      blurb: 'Top‑rated cleaning services for Innisfil households.',
      image: `${process.env.PUBLIC_URL}/images/broom.png`,
    },
  ];

  return (
    <section className="section locations" id="locations" aria-label="Service Areas">
      <div className="locations__header">
        <h2 className="section-title">Locations We Serve</h2>
        <p className="section__subtitle">Proudly serving communities across Simcoe County.</p>
      </div>

      <div className="locations__grid">
        {areas.map((area) => (
          <Link
            key={area.slug}
            to={`/house-cleaning-services-${area.slug}`}
            className="location-card"
            aria-label={`House cleaning services in ${area.name}`}
          >
            <div className="location-card__media">
              <img src={area.image} alt={`${area.name} house cleaning services`} />
            </div>
            <div className="location-card__body">
              <h3 className="location-card__title">{area.name}</h3>
              <p className="location-card__blurb">{area.blurb}</p>
              <span className="location-card__cta">Explore Services →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Locations;
