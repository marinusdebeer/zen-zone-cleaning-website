import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Services.css';

/**
 * Services shows two groups: Recurring Cleaning Plans and One‑Time Services.
 * One‑time tiles have “Learn More” modals implemented with lightweight React state.
 */
const Services = () => {
  const location = useLocation();
  const match = location.pathname.match(/^\/house-cleaning-services-([a-z-]+)(?:\/.*)?$/);
  const citySlug = match ? match[1] : null;
  const [activeModal, setActiveModal] = useState(null);

  const oneTimeServiceContent = useMemo(
    () => ({
      DeepCleaning: {
        title: 'Deep Cleaning',
        paragraphs: [
          'Our Deep Cleaning Service is designed to give your home a fresh start by tackling both the visible and hidden dirt. We thoroughly clean all common areas, including bedrooms, kitchens, and bathrooms. This includes wiping and dusting surfaces, sweeping and mopping floors, vacuuming carpets, and cleaning mirrors, door handles, and light switches.',
          'We also focus on areas that are often overlooked or hard to reach, such as cleaning behind appliances, baseboards, door frames, interior windows, blinds, ceiling fans, light fixtures, and wall spots. High-touch areas are sanitized to help reduce the spread of germs.',
        ],
      },
      StandardCleaning: {
        title: 'Standard Cleaning',
        paragraphs: [
          'Our Standard Cleaning Service ensures a thorough cleaning of all common areas, including bedrooms, kitchens, and bathrooms. We wipe and dust surfaces, sweep and mop floors and baseboards, vacuum carpets, and clean mirrors, door handles, light switches, and kitchen cabinet fronts.',
          'High-touch areas receive extra attention to reduce the spread of germs, making this service ideal for maintaining a fresh, clean, and healthy living environment.',
        ],
      },
      PostConstructionCleaning: {
        title: 'Post-Construction Cleaning',
        paragraphs: [
          'Our Post-Construction Cleaning Service handles the mess left behind after construction or renovation projects. We ensure your property is spotless, safe, and move-in ready by tackling dust, debris, and residue with precision.',
          'This service includes removing construction dust and debris, deep cleaning all surfaces, windows, fixtures, and hard-to-reach areas.',
        ],
      },
      MoveInCleaning: {
        title: 'Standard Moving Cleaning',
        paragraphs: [
          'Our Move-In/Out Standard Cleaning Service is perfect for homes that need a general refresh during a move. We clean all common areas, including bedrooms, kitchens, and bathrooms, ensuring surfaces, floors, and fixtures are spotless.',
          'High-touch areas receive extra care to reduce the spread of germs, making it ideal for preparing a home for new occupants.',
        ],
      },
      MoveOutCleaning: {
        title: 'Deep Moving Cleaning',
        paragraphs: [
          'Our Move-In/Out Deep Cleaning Service provides a comprehensive, detailed clean to ensure every corner of your home is spotless. In addition to standard cleaning tasks, we clean behind appliances, baseboards, door frames, interior windows, blinds, ceiling fans, light fixtures, and wall spots.',
          'High-touch areas are sanitized to minimize the spread of germs, making this service perfect for a thorough reset during a move.',
        ],
      },
      OfficeCleaning: {
        title: 'Office Cleaning',
        paragraphs: [
          'Our Office Cleaning Service is designed to maintain a healthy, professional workspace by ensuring that all areas are thoroughly cleaned and disinfected. We focus on high-traffic spaces such as workstations, meeting rooms, break areas, and restrooms to promote a productive and inviting environment.',
          'The service includes dusting, vacuuming, mopping, and sanitizing surfaces including desks, countertops, and common equipment. Our comprehensive approach not only enhances the professional image of your office but also contributes to employee well-being by reducing allergens and germs.',
        ],
      },
    }),
    []
  );

  return (
    <section className="section services" id="services" aria-label="Services">
      <div className="services-content">
        <h2 className="section-title">Recurring Cleaning Plans</h2>

        <div className="services-intro">
          <h3>What our recurring cleaning plans include</h3>
          <div className="includes-list">
            <ul>
              <li>Dusting & cobweb removal</li>
              <li>Vacuum carpets & rugs</li>
              <li>Sweep & mop hard floors</li>
              <li>Mirrors, glass surfaces & handles</li>
              <li>Kitchen counters, stovetop & microwave</li>
            </ul>
            <ul>
              <li>Oven door (exterior) & appliance exteriors</li>
              <li>Sinks, toilets, tubs & showers</li>
              <li>Light switches & high-touch sanitization</li>
              <li>Laundry room surfaces & floors</li>
              <li>Trash emptied & bins relined</li>
            </ul>
          </div>
        </div>

        <div className="services-hero-tiles">
          <div className="service-tile">
            <img
              src={`${process.env.PUBLIC_URL}/images/broom.png`}
              alt=""
              aria-hidden="true"
              className="service-icon"
            />
            <h3>Weekly Cleaning</h3>
            <p>
              Keep your home spotless with our weekly service—dusting, vacuuming, mopping, and
              sanitizing every corner.
            </p>
            <p className="price">Starting at $130/visit</p>
            <Link
              to={'/book?service=Weekly'}
              className="btn"
              aria-label="Request estimate for Weekly Cleaning"
            >
              Request Estimate
            </Link>
          </div>

          <div className="service-tile popular">
            <img
              src={`${process.env.PUBLIC_URL}/images/house.png`}
              alt=""
              aria-hidden="true"
              className="service-icon"
            />
            <h3>Bi-Weekly Cleaning</h3>
            <p>
              A thorough clean every two weeks—ideal for keeping your space fresh without the weekly
              commitment.
            </p>
            <p className="price">Starting at $130/visit</p>
            <Link
              to={'/book?service=Bi-Weekly'}
              className="btn"
              aria-label="Request estimate for Bi-Weekly Cleaning"
            >
              Request Estimate
            </Link>
          </div>

          <div className="service-tile">
            <img
              src={`${process.env.PUBLIC_URL}/images/box.png`}
              alt=""
              aria-hidden="true"
              className="service-icon"
            />
            <h3>Monthly Refresh</h3>
            <p>
              A deep refresh once a month, focusing on high-traffic areas to keep your home
              guest-ready.
            </p>
            <p className="price">Starting at $130/visit</p>
            <Link
              to={'/book?service=Every%204%20Weeks'}
              className="btn"
              aria-label="Request estimate for Monthly Refresh"
            >
              Request Estimate
            </Link>
          </div>

          <div className="service-tile">
            <img
              src={`${process.env.PUBLIC_URL}/images/bucket.png`}
              alt=""
              aria-hidden="true"
              className="service-icon"
            />
            <h3>First-Time Deep Cleaning</h3>
            <p>
              One comprehensive deep clean for new recurring customers—behind appliances,
              baseboards, interior windows, and more.
            </p>
            <Link
              to={'/book?service=First-Time%20Deep'}
              className="btn"
              aria-label="Request estimate for First-Time Deep Cleaning"
            >
              Request Estimate
            </Link>
          </div>
        </div>

        <section className="faq" id="faq" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="section-title">
            Frequently Asked Questions
          </h2>
          <div className="faq-list">
            <details>
              <summary>What if I need to reschedule?</summary>
              <p>
                You can reschedule up to 12 hours before your cleaning via your client portal or by
                calling us. We’ll find a new slot that fits your needs.
              </p>
            </details>
            <details>
              <summary>Do I get the same cleaner every time?</summary>
              <p>
                Whenever possible, yes! We aim to send the same team to build familiarity with your
                home and your preferences.
              </p>
            </details>
            <details>
              <summary>What if I’m not happy with the clean?</summary>
              <p>
                Your satisfaction is guaranteed. If anything was missed, let us know within 24 hours
                and we’ll return to make it right—free of charge.
              </p>
            </details>
            <details>
              <summary>How do I pay for my recurring plan?</summary>
              <p>
                After each cleaning, we'll send you an invoice that you can pay by e‑transfer or
                credit card. You can also set up automatic payments.
              </p>
            </details>
          </div>
        </section>

        <h2 className="section-title" style={{ marginTop: '2rem' }}>
          One‑Time Cleaning Services
        </h2>
        <div className="services-hero-tiles">
          <div className="service-tile">
            <h3>Deep Cleaning</h3>
            <p className="truncate">
              Our Deep Cleaning Service is designed to give your home a fresh start by tackling both
              the visible and hidden dirt. We thoroughly clean all common areas…
            </p>
            <button
              className="btn btn--outline"
              onClick={() => setActiveModal('DeepCleaning')}
              aria-label="Learn more about Deep Cleaning"
            >
              Learn More
            </button>
          </div>

          <div className="service-tile">
            <h3>Standard Cleaning</h3>
            <p className="truncate">
              Our Standard Cleaning Service ensures a thorough cleaning of all common areas,
              including bedrooms, kitchens, and bathrooms. We wipe and dust surfaces…
            </p>
            <button
              className="btn btn--outline"
              onClick={() => setActiveModal('StandardCleaning')}
              aria-label="Learn more about Standard Cleaning"
            >
              Learn More
            </button>
          </div>

          <div className="service-tile">
            <h3>Post-Construction Cleaning</h3>
            <p className="truncate">
              Our Post-Construction Cleaning Service handles the mess left behind after construction
              or renovation projects. We ensure your property is spotless…
            </p>
            <button
              className="btn btn--outline"
              onClick={() => setActiveModal('PostConstructionCleaning')}
              aria-label="Learn more about Post-Construction Cleaning"
            >
              Learn More
            </button>
          </div>

          <div className="service-tile">
            <h3>Standard Moving Cleaning</h3>
            <p className="truncate">
              Our Move-In/Out Standard Cleaning Service is perfect for homes that need a general
              refresh during a move. We focus on cleaning all common areas…
            </p>
            <button
              className="btn btn--outline"
              onClick={() => setActiveModal('MoveInCleaning')}
              aria-label="Learn more about Standard Moving Cleaning"
            >
              Learn More
            </button>
          </div>

          <div className="service-tile">
            <h3>Deep Moving Cleaning</h3>
            <p className="truncate">
              Our Move-In/Out Deep Cleaning Service provides a comprehensive, detailed clean
              ensuring every corner of your home is spotless…
            </p>
            <button
              className="btn btn--outline"
              onClick={() => setActiveModal('MoveOutCleaning')}
              aria-label="Learn more about Deep Moving Cleaning"
            >
              Learn More
            </button>
          </div>

          <div className="service-tile">
            <h3>Office Cleaning</h3>
            <p className="truncate">
              Boost productivity and maintain a professional image with our comprehensive office
              cleaning services…
            </p>
            <button
              className="btn btn--outline"
              onClick={() => setActiveModal('OfficeCleaning')}
              aria-label="Learn more about Office Cleaning"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {activeModal && (
        <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal__header">
              <h3 className="modal__title">{oneTimeServiceContent[activeModal].title}</h3>
              <button
                className="modal__close"
                aria-label="Close"
                onClick={() => setActiveModal(null)}
              >
                ×
              </button>
            </div>
            <div className="modal__body">
              {oneTimeServiceContent[activeModal].paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="modal__footer">
              <Link to={'/book'} className="btn">
                Request Estimate
              </Link>
              <button className="btn btn--outline" onClick={() => setActiveModal(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
