import React from 'react';
import './Services.css';

/**
 * Displays a grid of cleaning services offered by Zen Zone. Each card
 * includes an icon, service name and a short description. Feel free to
 * expand or modify the list to match the full range of offerings.
 */
const Services = () => {
  const services = [
    {
      icon: `${process.env.PUBLIC_URL}/images/house.png`,
      name: 'Maid Service',
      description:
        'One‑time or recurring cleanings that keep your house sparkling from top to bottom.',
    },
    {
      icon: `${process.env.PUBLIC_URL}/images/building.png`,
      name: 'Condo Cleaning',
      description:
        'Specialised cleaning for condos and high‑rise apartments, perfect for urban living.',
    },
    {
      icon: `${process.env.PUBLIC_URL}/images/box.png`,
      name: 'Move In/Out',
      description:
        'Thorough cleaning for tenants, landlords and realtors before or after moving.',
    },
    {
      icon: `${process.env.PUBLIC_URL}/images/bucket.png`,
      name: 'Deep Cleaning',
      description:
        'Intensive cleaning that reaches every corner and removes built‑up dirt and grime.',
    },
    {
      icon: `${process.env.PUBLIC_URL}/images/hammer.png`,
      name: 'Post Renovation',
      description:
        'Fast and careful cleanup after construction or renovation to remove dust and debris.',
    },
    {
      icon: `${process.env.PUBLIC_URL}/images/broom.png`,
      name: 'Recurring Cleaning',
      description:
        'Weekly, bi‑weekly or monthly plans to maintain a clean and healthy environment.',
    },
  ];

  return (
    <section className="section services" id="services">
      <h2 className="section-title">Our Cleaning Services</h2>
      <div className="services__grid">
        {services.map((svc, idx) => (
          <div key={idx} className="service-card">
            <img src={svc.icon} alt="" className="service-card__icon" />
            <h3 className="service-card__name">{svc.name}</h3>
            <p className="service-card__description">{svc.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;