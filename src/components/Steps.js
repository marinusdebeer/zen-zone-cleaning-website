import React from 'react';
import './Steps.css';

/**
 * Displays the simplified booking process in three steps. Each step
 * includes an icon, a title and supporting text. Using images from
 * the public folder allows the assets to be referenced at runtime without
 * bundling them into the JavaScript bundle.
 */
const Steps = () => {
  const steps = [
    {
      icon: `${process.env.PUBLIC_URL}/images/house.png`,
      title: 'Book Online',
      description:
        'Choose your service, date and time in a few clicks using our easy online form.',
    },
    {
      icon: `${process.env.PUBLIC_URL}/images/broom.png`,
      title: 'We Clean',
      description:
        'Our background‑checked professionals arrive on time with all supplies needed.',
    },
    {
      icon: `${process.env.PUBLIC_URL}/images/bucket.png`,
      title: 'You Relax',
      description:
        'Enjoy your sparkling home and spend your time on what matters most to you.',
    },
  ];

  return (
    <section className="section steps" id="how-it-works">
      <h2 className="section-title">How It Works</h2>
      <div className="steps__grid">
        {steps.map((step, idx) => (
          <div key={idx} className="step">
            <img src={step.icon} alt="" className="step__icon" />
            <h3 className="step__title">{`${idx + 1}. ${step.title}`}</h3>
            <p className="step__description">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Steps;