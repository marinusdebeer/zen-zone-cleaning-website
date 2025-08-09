import React from 'react';
import './About.css';

/**
 * About section tells the story of the company and its mission. A
 * decorative illustration reinforces the narrative and adds visual
 * interest. In a real application, you might fetch this content from a
 * CMS or API.
 */
const About = () => {
  return (
    <section className="section about" id="about">
      <div className="about__wrapper">
        <div className="about__content">
          <h2 className="section-title">About Zen Zone Cleaning Services</h2>
          <p>
            Zen Zone Cleaning Services is a locally operated, family‑owned
            cleaning company in Ontario, Canada created with one clear
            mission: to simplify your life by taking cleaning off your busy
            schedule. Founded by Daleen and Marinus, we understand the
            pressures of balancing work, family commitments and household
            upkeep—especially in today’s demanding world. Recognising that
            many of our neighbours in Barrie, Orillia, Innisfil and across
            Simcoe County face similar challenges, we set out to provide a
            solution that delivers peace of mind and more free time for you
            and your family.
          </p>
          <p>
            What began as a passion project has blossomed into a top‑rated
            cleaning service relied upon by homeowners, businesses and
            property managers throughout the region. Whether you’re looking
            for a one‑time deep clean, ongoing maintenance or move‑in/move‑out
            services, our friendly professionals are ready to transform
            your space. We connect you with reliable, insured and thoroughly
            background‑checked cleaners and offer customisable options so you
            get exactly the support you need.
          </p>
          <p>
            Our mission extends beyond cleaning: we strive to create
            fulfilling, supportive job opportunities with competitive
            compensation and respectful working conditions for our team
            members. At Zen Zone Cleaning Services, the satisfaction of our clients and the
            happiness of our cleaners form the foundation of our business.
            Experience the joy of a clean, stress‑free space—one expert
            clean at a time.
          </p>
        </div>
        <div className="about__image-wrapper">
          <img
            src={`${process.env.PUBLIC_URL}/images/team.png`}
            alt="Our team"
            className="about__image"
          />
        </div>
      </div>
    </section>
  );
};

export default About;