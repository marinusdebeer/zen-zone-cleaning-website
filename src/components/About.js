import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './About.css';
import './Faces.css';
import './Mascots.css';
import Reveal from './Reveal';
import { getReviewsSummary } from './reviewsData';

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

  const { average, count } = React.useMemo(() => getReviewsSummary(), []);

  return (
    <section className="section about" id="about">
      <div className="about__wrapper">
        <div className="about__content">
          <Reveal as="p" className="about__eyebrow" animation="up">Family‑owned in Simcoe County</Reveal>
          <Reveal as="h2" className="section-title about__title" animation="up">About Zen Zone Cleaning</Reveal>
          <Reveal as="p" className="about__lead" animation="up" delay={60}>
            We’re a local, family‑run team focused on thoughtful, reliable cleaning—so you get more
            time for what matters most.
          </Reveal>

          <Reveal as="ul" className="about__bullets" animation="up" delay={90}>
            <li>Insured & Vetted cleaners</li>
            <li>Top‑rated service</li>
            <li>Flexible scheduling (weekly, bi‑weekly, monthly, one‑time)</li>
            <li>Detail‑driven with thorough checklists</li>
            <li>Satisfaction guarantee</li>
            <li>People‑centric and community‑minded</li>
            <li>Technology‑backed booking & management</li>
            <li>Background‑checked professionals</li>
          </Reveal>

          <Reveal as="div" className="about__copy" animation="up" delay={120}>
            <p>
              Founded by Daleen and Marinus, Zen Zone began as a passion project and grew into a
              trusted service across Barrie, Orillia, Innisfil, and surrounding communities. From
              first‑time deep cleans to ongoing maintenance, our team delivers dependable results
              tailored to every home.
            </p>
            <p>
              Our mission is two‑fold: help clients enjoy calm, clean spaces—and support our team
              with fair, respectful work. That’s how we create lasting, positive experiences for
              everyone we serve.
            </p>
          </Reveal>

          <div className="about__stats">
            <Reveal as="div" className="stat" animation="up">
              <div className="stat__value">{average.toFixed(1)}</div>
              <div className="stat__label">Average Rating</div>
              <div className="stat__sub">from {count} reviews</div>
            </Reveal>
            <Reveal as="div" className="stat" animation="up" delay={60}>
              <div className="stat__value">7d</div>
              <div className="stat__label">Open Every Day</div>
            </Reveal>
            <Reveal as="div" className="stat" animation="up" delay={120}>
              <div className="stat__value">100%</div>
              <div className="stat__label">Satisfaction Promise</div>
            </Reveal>
          </div>

          <Reveal as="div" className="about__cta" animation="up">
            <Link to="/book" className="btn">Request Estimate</Link>
            <a href="#services" className="btn btn--outline">See Services</a>
          </Reveal>

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
        <div className="about__aside">
          <div className="about__founders-grid">
            <Reveal as="section" className="founder-card" aria-label="Founder Daleen" animation="left">
              <img
                src={`${process.env.PUBLIC_URL}/images/daleen.avif`}
                alt="Founder Daleen from Zen Zone Cleaning"
                className="founder-card__photo"
                loading="lazy"
                decoding="async"
              />
              <div className="founder-card__body">
                <h3 className="founder-card__name">Daleen</h3>
                <div className="founder-card__role" aria-label="Role">Co‑Founder • Operations & Quality</div>
                <p className="founder-card__blurb">
                  Daleen leads our day‑to‑day operations and quality standards with a focus on
                  consistency, communication, and care—so every visit meets our promise.
                </p>
              </div>
            </Reveal>

            <Reveal as="section" className="founder-card" aria-label="Founder Marinus" animation="right">
              <img
                src={`${process.env.PUBLIC_URL}/images/marinus.avif`}
                alt="Founder Marinus from Zen Zone Cleaning"
                className="founder-card__photo founder-card__photo--top"
                loading="lazy"
                decoding="async"
              />
              <div className="founder-card__body">
                <h3 className="founder-card__name">Marinus</h3>
                <div className="founder-card__role" aria-label="Role">Co‑Founder • Technology & Marketing</div>
                <p className="founder-card__blurb">
                  Marinus builds simple, modern systems that make booking and managing your cleaning
                  effortless—backed by fast, friendly support.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
