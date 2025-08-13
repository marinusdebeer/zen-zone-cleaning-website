import React from 'react';
import { useLocation } from 'react-router-dom';
import './About.css';
import './Faces.css';
import './Mascots.css';

/**
 * About section tells the story of the company and its mission. A
 * decorative illustration reinforces the narrative and adds visual
 * interest. In a real application, you might fetch this content from a
 * CMS or API.
 */
const About = () => {
  const location = useLocation();
  const match = location.pathname.match(/^\/house-cleaning-services-([a-z-]+)$/);
  const citySlug = match ? match[1] : null;
  const cityName = citySlug
    ? citySlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : null;

  return (
    <section className="section about" id="about">
      <div className="about__wrapper">
        <div className="about__content">
          <h2 className="section-title about__title">
            About Zen Zone Cleaning Services
          </h2>
          <p>
            Zen Zone Cleaning Services is a locally operated, family-owned cleaning company in
            Ontario, Canada created with one clear mission: to simplify your life by taking cleaning
            off your busy schedule. Founded by Daleen and Marinus, we understand the pressures of
            balancing work, family commitments, and household upkeep—especially in today’s demanding
            world. Recognizing that many of our neighbors in Barrie, Orillia, Innisfil, and all
            areas within Simcoe County faced similar daily challenges, we set out to offer a
            solution that provides peace of mind and more free time for you and your family.
          </p>

          <p>
            What began as a family-owned passion project has blossomed into a respected, top-rated
            cleaning service relied upon by homeowners, businesses, and rental property managers
            across the region. From one-time comprehensive deep cleans to weekly or monthly
            maintenance plans, Zen Zone delivers consistently exceptional results tailored
            specifically to your needs. Our friendly, professional cleaning specialists are ready to
            help transform your space—no matter your cleaning goals.
          </p>

          <h3>Our Mission</h3>
          <h4>For Our Clients</h4>
          <p>
            We connect you with reliable, insured, and thoroughly background-checked cleaners who
            consistently deliver outstanding results. Our customizable service options mean you can
            choose exactly what you need—allowing you to reclaim precious time and enjoy life to its
            fullest.
          </p>
          <h4>For Our Cleaners</h4>
          <p>
            We strive to create fulfilling, supportive job opportunities with competitive
            compensation and respectful working conditions. We ensure every member of our team feels
            valued, motivated, and committed to providing exceptional care for every home and
            business they serve.
          </p>

          <p>
            At Zen Zone Cleaning, the satisfaction of our clients and the happiness of our team form
            the foundation of our business. As we steadily grow across Barrie, Orillia, Innisfil,
            and surrounding communities, we remain passionately committed to leaving homes, offices,
            and vacation rentals sparkling clean and stress-free. Whether you’re hosting guests,
            managing rental properties, or simply looking to reclaim your free time, Zen Zone is
            here to help you maintain a cleaner, calmer space—one expert clean at a time.
          </p>
          <p>
            Let us give you back your valuable time. Choose Zen Zone Cleaning Services today, and
            experience the true joy of a clean, stress-free space.
          </p>

          {/* City-specific about content */}
          {cityName && (
            <div className="city-about-section">
              {citySlug === 'barrie' && (
                <>
                  <h3>Why We Love Serving Barrie</h3>
                  <p>
                    Barrie's unique blend of urban convenience and natural beauty makes it a special
                    place to serve. From the bustling downtown core to the peaceful lakeside
                    communities, we've learned that Barrie residents value quality, reliability, and
                    a personal touch. Our team has become part of the fabric of this community,
                    understanding the seasonal rhythms and the importance of maintaining beautiful
                    homes that reflect Barrie's charm.
                  </p>
                </>
              )}

              {citySlug === 'orillia' && (
                <>
                  <h3>Our Connection to Orillia</h3>
                  <p>
                    Orillia holds a special place in our hearts. This historic lakeside city
                    combines small-town warmth with big-city amenities, and we've found that Orillia
                    families appreciate the same values we do: trust, consistency, and attention to
                    detail. Whether you're in the established neighborhoods or the growing west end,
                    we're committed to maintaining the high standards that make Orillia such a
                    wonderful place to call home.
                  </p>
                </>
              )}

              {citySlug === 'innisfil' && (
                <>
                  <h3>Growing Together with Innisfil</h3>
                  <p>
                    Innisfil's rapid growth and development have been exciting to witness, and we're
                    proud to be part of this community's journey. From the established areas like
                    Alcona and Stroud to the new developments, we understand that Innisfil families
                    need flexible, reliable cleaning services that adapt to their changing needs.
                    We're committed to growing alongside this vibrant community.
                  </p>
                </>
              )}

              {citySlug === 'essa' && (
                <>
                  <h3>Serving Essa with Reliability</h3>
                  <p>
                    Essa’s communities—Angus, Baxter, and Thornton—combine small‑town warmth with
                    commuter convenience. We understand military family schedules near CFB Borden
                    and the needs of busy professionals. Our team delivers dependable, respectful
                    service you can count on.
                  </p>
                </>
              )}

              {citySlug === 'springwater' && (
                <>
                  <h3>Committed to Springwater Excellence</h3>
                  <p>
                    In Springwater, we care for beautiful properties that deserve meticulous
                    attention. From Midhurst to Elmvale, we tailor our approach to premium finishes
                    and larger spaces—always with professionalism and care.
                  </p>
                </>
              )}

              {citySlug === 'oro-medonte' && (
                <>
                  <h3>Proudly Supporting Oro‑Medonte</h3>
                  <p>
                    Oro‑Medonte’s combination of luxury homes and seasonal properties requires a
                    thoughtful, reliable cleaning partner. We respect specialty materials and adapt
                    to unique access and seasonal rhythms across Horseshoe Valley, Shanty Bay, and
                    Hawkestone.
                  </p>
                </>
              )}

              {citySlug === 'severn' && (
                <>
                  <h3>Trusted Across Severn</h3>
                  <p>
                    From Coldwater to Washago, Severn blends residential and cottage life. We
                    provide consistent, flexible service that supports both weekend getaways and
                    full‑time living.
                  </p>
                </>
              )}
            </div>
          )}
        </div>
        <div className="about__image-wrapper">
          <div className="about__founders-grid">
            <section className="founder-card" aria-label="Founder Daleen">
              <img
                src={`${process.env.PUBLIC_URL}/images/daleen.jpeg`}
                alt="Founder Daleen from Zen Zone Cleaning"
                className="founder-card__photo"
                loading="lazy"
                decoding="async"
              />
              <div className="founder-card__body">
                <h3 className="founder-card__name">Daleen</h3>
                <div className="founder-card__role" aria-label="Role">Co‑Founder • Operations & Quality</div>
                <p className="founder-card__blurb">
                  Daleen leads our day-to-day operations and quality standards, bringing a strong
                  cleaning and business background to every client relationship. With a hands-on
                  approach and a focus on consistency, communication, and care, she ensures our
                  teams deliver reliable, detail-oriented service—every single visit.
                </p>
              </div>
            </section>

            <section className="founder-card" aria-label="Founder Marinus">
              <img
                src={`${process.env.PUBLIC_URL}/images/marinus.JPG`}
                alt="Founder Marinus from Zen Zone Cleaning"
                className="founder-card__photo founder-card__photo--top"
                loading="lazy"
                decoding="async"
              />
              <div className="founder-card__body">
                <h3 className="founder-card__name">Marinus</h3>
                <div className="founder-card__role" aria-label="Role">Co‑Founder • Technology & Marketing</div>
                <p className="founder-card__blurb">
                  Marinus brings a technology background that powers our scheduling, customer
                  experience, and operational efficiency. He’s focused on building simple, modern
                  systems that make it easy to book, manage, and customize your cleaning—so you get
                  dependable results without any hassle.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
