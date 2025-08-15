import React, { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import './Services.css';
import './Faces.css';
 

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
      RecurringCleaning: {
        title: 'Recurring Cleaning',
        paragraphs: [
          'Choose a schedule that fits your life: weekly, bi‑weekly, or monthly. We keep the same reliable standard each visit so your home stays consistently fresh.',
          'A First‑Time Deep is often suggested to reset hard‑to‑reach areas before starting a recurring cadence.',
        ],
      },
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
        title: 'Post Renovation Cleaning',
        paragraphs: [
          'Our Post-Construction Cleaning Service handles the mess left behind after construction or renovation projects. We ensure your property is spotless, safe, and move-in ready by tackling dust, debris, and residue with precision.',
          'This service includes removing construction dust and debris, deep cleaning all surfaces, windows, fixtures, and hard-to-reach areas.',
        ],
      },
      MoveInOutCleaning: {
        title: 'Move In Move Out Cleaning',
        paragraphs: [
          'Thorough top‑to‑bottom clean tailored for moving day. We focus on kitchens, baths, appliances, baseboards, inside cabinets and closets, and more so the home is ready for hand‑off.',
          'Ideal for tenants, landlords, buyers, and sellers. Add‑ons like inside fridge/oven, interior windows, and wall spot cleaning are available.',
        ],
      },
      CondoCleaning: {
        title: 'Condo Cleaning',
        paragraphs: [
          'Specialized condo cleaning perfect for high‑rise living. We handle compact spaces with attention to detail—kitchens, baths, dusting, floors, and balcony sweep as applicable.',
          'Great for owners, renters, and Airbnb hosts wanting a reliable tidy and refresh.',
        ],
      },
      CustomCleaning: {
        title: 'Custom Cleaning',
        paragraphs: [
          'Build your own cleaning plan by selecting exactly what you want. Popular choices include: inside fridge and oven, inside cabinets, baseboards, interior windows, wall spot cleaning, laundry and bed linens, balcony sweep, and more.',
          'Use the booking form to choose services and frequency, or tell us your priorities and we will tailor a quote to your home.',
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
        <h2 className="section-title">Our Cleaning Services Include</h2>

        {/* City-specific service information */}
        {citySlug === 'barrie' && (
          <div className="city-service-info">
            <p>
              <strong>Barrie residents:</strong> Our recurring plans are designed around Barrie's
              active lifestyle. Whether you're near the waterfront, in the growing north end, or in
              established neighborhoods like Holly, we adapt our cleaning schedule to your needs.
              Many Barrie families choose our bi-weekly service to maintain their homes between busy
              weekends at the lake.
            </p>
          </div>
        )}

        {citySlug === 'orillia' && (
          <div className="city-service-info">
            <p>
              <strong>Orillia homeowners:</strong> We understand the unique rhythm of life in
              Orillia. Our recurring cleaning services are tailored for families who appreciate the
              city's charm while maintaining busy schedules. From the waterfront communities to the
              growing west end, we provide flexible cleaning that fits your lifestyle.
            </p>
          </div>
        )}

        {citySlug === 'innisfil' && (
          <div className="city-service-info">
            <p>
              <strong>Innisfil families:</strong> As Innisfil continues to grow, we've adapted our
              recurring cleaning services to meet the needs of both established communities and new
              developments. Whether you're in Alcona, Stroud, or the expanding areas, our flexible
              scheduling accommodates Innisfil's diverse family needs.
            </p>
          </div>
        )}

        {citySlug === 'essa' && (
          <div className="city-service-info">
            <p>
              <strong>Essa (Angus, Baxter, Thornton):</strong> We offer flexible scheduling that
              fits commuter and military family life. Whether you're in Angus near CFB Borden or in
              Baxter and Thornton, our reliable recurring plans keep your home consistently clean.
            </p>
          </div>
        )}

        {citySlug === 'springwater' && (
          <div className="city-service-info">
            <p>
              <strong>Springwater residents:</strong> Tailored recurring plans for larger homes and
              premium finishes in Midhurst, Elmvale, and surrounding communities—meticulous care,
              consistent schedules, and trusted local teams.
            </p>
          </div>
        )}

        {citySlug === 'oro-medonte' && (
          <div className="city-service-info">
            <p>
              <strong>Oro‑Medonte homeowners:</strong> Dependable cleaning for year‑round residences
              and seasonal cottages. We respect specialty materials and coordinate access for
              properties in Horseshoe Valley, Shanty Bay, and Hawkestone.
            </p>
          </div>
        )}

        {citySlug === 'severn' && (
          <div className="city-service-info">
            <p>
              <strong>Severn clients:</strong> Flexible recurring plans for cottages and residential
              homes across Coldwater, Washago, and beyond—adapted to weekend and full‑time living.
            </p>
          </div>
        )}

        {/* Removed includes section per request */}

        {/* Removed separate recurring tiles; consolidated into the unified grid below */}

        {/* FAQ moved below the tiles in its own section */}

        <div className="services-hero-tiles">
          <div
            className="service-tile is-clickable"
            role="button"
            tabIndex={0}
            onClick={() => setActiveModal('RecurringCleaning')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveModal('RecurringCleaning'); } }}
            aria-label="Learn more about Recurring Cleaning"
          >
            <div className="service-tile__media">
              <picture>
                <source type="image/avif" srcSet={`${process.env.PUBLIC_URL}/images/7.avif`} />
                <source type="image/webp" srcSet={`${process.env.PUBLIC_URL}/images/7.webp`} />
                <img src={`${process.env.PUBLIC_URL}/images/7.webp`} alt="Recurring home cleaning schedule" loading="lazy" decoding="async" />
              </picture>
            </div>
            <h3>Recurring Cleaning</h3>
            <p className="truncate">Weekly, bi‑weekly, or monthly visits to keep your home consistently clean.</p>
          </div>
          <div
            className="service-tile is-clickable"
            role="button"
            tabIndex={0}
            onClick={() => setActiveModal('DeepCleaning')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveModal('DeepCleaning'); } }}
            aria-label="Learn more about Deep Cleaning"
          >
            <div className="service-tile__media">
              <picture>
                <source type="image/avif" srcSet={`${process.env.PUBLIC_URL}/images/1.avif`} />
                <source type="image/webp" srcSet={`${process.env.PUBLIC_URL}/images/1.webp`} />
                <img src={`${process.env.PUBLIC_URL}/images/1.webp`} alt="Deep cleaning in kitchen" loading="lazy" decoding="async" />
              </picture>
            </div>
            <h3>Deep Cleaning</h3>
            <p className="truncate">
              Our Deep Cleaning Service is designed to give your home a fresh start by tackling both
              the visible and hidden dirt. We thoroughly clean all common areas…
            </p>
            
          </div>

          <div
            className="service-tile is-clickable"
            role="button"
            tabIndex={0}
            onClick={() => setActiveModal('StandardCleaning')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveModal('StandardCleaning'); } }}
            aria-label="Learn more about Standard Cleaning"
          >
            <div className="service-tile__media">
              <picture>
                <source type="image/avif" srcSet={`${process.env.PUBLIC_URL}/images/2.avif`} />
                <source type="image/webp" srcSet={`${process.env.PUBLIC_URL}/images/2.webp`} />
                <img src={`${process.env.PUBLIC_URL}/images/2.webp`} alt="Standard cleaning living room" loading="lazy" decoding="async" />
              </picture>
            </div>
            <h3>Standard Cleaning</h3>
            <p className="truncate">
              Our Standard Cleaning Service ensures a thorough cleaning of all common areas,
              including bedrooms, kitchens, and bathrooms. We wipe and dust surfaces…
            </p>
            
          </div>

          <div
            className="service-tile is-clickable"
            role="button"
            tabIndex={0}
            onClick={() => setActiveModal('PostConstructionCleaning')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveModal('PostConstructionCleaning'); } }}
            aria-label="Learn more about Post Renovation Cleaning"
          >
            <div className="service-tile__media">
              <picture>
                <source type="image/avif" srcSet={`${process.env.PUBLIC_URL}/images/3.avif`} />
                <source type="image/webp" srcSet={`${process.env.PUBLIC_URL}/images/3.webp`} />
                <img src={`${process.env.PUBLIC_URL}/images/3.webp`} alt="Post-construction dust cleanup" loading="lazy" decoding="async" />
              </picture>
            </div>
            <h3>Post Renovation Cleaning</h3>
            <p className="truncate">
              Our Post-Construction Cleaning Service handles the mess left behind after construction
              or renovation projects. We ensure your property is spotless…
            </p>
            
          </div>

          <div
            className="service-tile is-clickable"
            role="button"
            tabIndex={0}
            onClick={() => setActiveModal('MoveInOutCleaning')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveModal('MoveInOutCleaning'); } }}
            aria-label="Learn more about Move In Move Out Cleaning"
          >
            <div className="service-tile__media">
              <picture>
                <source type="image/avif" srcSet={`${process.env.PUBLIC_URL}/images/4.avif`} />
                <source type="image/webp" srcSet={`${process.env.PUBLIC_URL}/images/4.webp`} />
                <img src={`${process.env.PUBLIC_URL}/images/4.webp`} alt="Move-in cleaning bedroom" loading="lazy" decoding="async" />
              </picture>
            </div>
            <h3>Move In Move Out Cleaning</h3>
            <p className="truncate">
              Complete top‑to‑bottom clean for moving day—kitchen, baths, baseboards, inside cabinets and more…
            </p>
            
          </div>

          <div
            className="service-tile is-clickable"
            role="button"
            tabIndex={0}
            onClick={() => setActiveModal('OfficeCleaning')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveModal('OfficeCleaning'); } }}
            aria-label="Learn more about Office Cleaning"
          >
            <div className="service-tile__media">
              <picture>
                <source type="image/avif" srcSet={`${process.env.PUBLIC_URL}/images/6.avif`} />
                <source type="image/webp" srcSet={`${process.env.PUBLIC_URL}/images/6.webp`} />
                <img src={`${process.env.PUBLIC_URL}/images/6.webp`} alt="Office cleaning desks" loading="lazy" decoding="async" />
              </picture>
            </div>
            <h3>Office Cleaning</h3>
            <p className="truncate">
              Boost productivity and maintain a professional image with our comprehensive office
              cleaning services…
            </p>
            
          </div>

          <div
            className="service-tile is-clickable"
            role="button"
            tabIndex={0}
            onClick={() => setActiveModal('CondoCleaning')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveModal('CondoCleaning'); } }}
            aria-label="Learn more about Condo Cleaning"
          >
            <div className="service-tile__media">
              <picture>
                <source type="image/avif" srcSet={`${process.env.PUBLIC_URL}/images/2.avif`} />
                <source type="image/webp" srcSet={`${process.env.PUBLIC_URL}/images/2.webp`} />
                <img src={`${process.env.PUBLIC_URL}/images/2.webp`} alt="Condo exterior high rise" loading="lazy" decoding="async" />
              </picture>
            </div>
            <h3>Condo Cleaning</h3>
            <p className="truncate">Specialized condo cleaning—perfect for high‑rise living and compact spaces.</p>
          </div>

          <div
            className="service-tile is-clickable"
            role="button"
            tabIndex={0}
            onClick={() => setActiveModal('CustomCleaning')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveModal('CustomCleaning'); } }}
            aria-label="Learn more about Custom Cleaning"
          >
            <div className="service-tile__media">
              <picture>
                <source type="image/avif" srcSet={`${process.env.PUBLIC_URL}/images/8.avif`} />
                <source type="image/webp" srcSet={`${process.env.PUBLIC_URL}/images/8.webp`} />
                <img src={`${process.env.PUBLIC_URL}/images/8.webp`} alt="Custom cleaning options collage" loading="lazy" decoding="async" />
              </picture>
            </div>
            <h3>Custom Cleaning</h3>
            <p className="truncate">Build your own service: inside fridge/oven, cabinets, baseboards, windows, laundry, and more.</p>
          </div>
        </div>
      </div>

      {/* FAQ intentionally rendered on the Home page, not here */}

      {activeModal && createPortal(
        (
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
              </div>
            </div>
          </div>
        ),
        document.body
      )}
    </section>
  );
};

export default Services;
