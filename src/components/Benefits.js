import React from 'react';
import './Benefits.css';

/**
 * Presents a list of reasons why customers should choose Zen Zone Cleaning Services. Each
 * benefit has a small icon and a description. The icons use the same
 * colour palette to maintain cohesion across the design.
 */
const Benefits = () => {
  const benefits = [
    {
      icon: '⭐',
      title: 'Quality Cleaning',
      description:
        'Detailed cleaning guided by a thorough checklist to ensure nothing is overlooked.',
    },
    {
      icon: '🛡️',
      title: 'Insured & Vetted',
      description: 'All cleaners are background checked and insured for your peace of mind.',
    },
    {
      icon: '📅',
      title: 'Flexible Scheduling',
      description: 'Book at a time that suits you with 24/7 online scheduling and reminders.',
    },
    {
      icon: '🔧',
      title: 'Technology Backed',
      description: 'Manage your bookings and reschedule easily through our online platform.',
    },
    {
      icon: '😊',
      title: 'Satisfaction Guarantee',
      description: 'Not completely satisfied? We’ll make it right at no extra cost.',
    },
    {
      icon: '💚',
      title: 'People‑Centric',
      description: 'We invest in our people and support local charities and communities.',
    },
  ];
  return (
    <section className="section section--alt benefits" id="why-us">
      <h2 className="section-title">Why Choose Us</h2>
      <p className="section__subtitle">
        Reliable service, vetted pros, and flexible scheduling—backed by our satisfaction guarantee.
      </p>
      <div className="benefits__grid">
        {benefits.map((benefit, idx) => (
          <div key={idx} className="benefit-card">
            <div className="benefit-card__icon" aria-hidden="true">
              {benefit.icon}
            </div>
            <h3 className="benefit-card__title">{benefit.title}</h3>
            <p className="benefit-card__description">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Benefits;
