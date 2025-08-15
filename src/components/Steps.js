import React from 'react';
import './Steps.css';
import './Faces.css';
import Reveal from './Reveal';

/**
 * Displays the simplified booking process in three steps. Each step
 * includes an image, a title and supporting text.
 */
const Steps = () => {
  const steps = [
    {
      image: `${process.env.PUBLIC_URL}/images/book_online.avif`,
      title: 'Book Online',
      description:
        'Customize and book your cleaning service online. 24hr cancellation policy.',
    },
    {
      image: `${process.env.PUBLIC_URL}/images/zen_zone_branded_cleaner.avif`,
      title: 'We Clean',
      description:
        'Your home cleaned by a professional and background checked cleaner.',
    },
    {
      image: `${process.env.PUBLIC_URL}/images/2.avif`,
      title: 'You Relax',
      description:
        'Rate your cleaning, relax, and enjoy what matters most in life.',
    },
  ];

  return (
    <section className="section steps" id="how-it-works">
      <img src={`${process.env.PUBLIC_URL}/images/7.avif`} alt="" className="face face--lg face--heart face--sticker steps__face steps__face--l" aria-hidden="true" />
      <img src={`${process.env.PUBLIC_URL}/images/3.avif`} alt="" className="face face--md face--blob face--sticker steps__face steps__face--r" aria-hidden="true" />
      <Reveal as="h2" className="section-title" animation="up">How It Works</Reveal>
      <div className="steps__grid reveal-stagger">
        {steps.map((step, idx) => (
          <Reveal key={idx} as="div" className="step" animation={idx % 2 === 0 ? 'left' : 'right'}>
            <div className="step__media">
              <div
                className="step__photo"
                role="img"
                aria-label={step.title}
                style={{
                  backgroundImage: `image-set(url(${step.image.replace(/\.(png|jpe?g|webp|avif)$/i, '.avif')}) type('image/avif'), url(${step.image.replace(/\.(png|jpe?g|webp|avif)$/i, '.webp')}) type('image/webp'))`
                }}
              />
            </div>
            <h3 className="step__title">{`${idx + 1}. ${step.title}`}</h3>
            <p className="step__description">{step.description}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Steps;
