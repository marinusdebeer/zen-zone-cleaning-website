import React from 'react';
import SEO from './SEO';

const Section = ({ title, children }) => (
  <section className="section" style={{ textAlign: 'left' }}>
    <h2 className="section__title" style={{ textAlign: 'left' }}>{title}</h2>
    <div style={{ lineHeight: 1.7 }}>{children}</div>
  </section>
);

export default function TermsPage() {
  return (
    <main className="legal legal--terms">
      <SEO
        title="Terms & Conditions | Zen Zone Cleaning"
        description="Read the terms and conditions for using Zen Zone Cleaning services and website."
        path="/terms"
        robots="index,follow"
      />
      <header className="section legal__header" style={{ textAlign: 'center' }}>
        <h1 className="section__title">Terms & Conditions</h1>
        <p className="section__subtitle">Effective date: {new Date().getFullYear()}</p>
      </header>

      <Section title="1. Introduction">
        <p>
          Welcome to Zen Zone Cleaning Services. By accessing and using our website and/or services,
          you agree to be bound by these Terms of Service. Please read them carefully before using
          our services.
        </p>
      </Section>

      <Section title="2. Our Services">
        <p>
          Zen Zone Cleaning Services provides both residential and commercial cleaning services. Our
          offerings include, but are not limited to, general cleaning, deep cleaning, move‑in/move‑out
          cleaning, and customized cleaning plans. We reserve the right to modify or add services as
          necessary.
        </p>
      </Section>

      <Section title="3. Booking and Payment">
        <p><strong>Booking:</strong> To schedule a service, please contact us via phone, email, or through our online booking system. You must provide accurate and complete information so that we can deliver the best service possible.</p>
        <p><strong>Payment:</strong> Payment is due upon completion of the service unless other arrangements have been made in writing. We accept various forms of payment, including cash, credit/debit cards, and online payment options.</p>
        <p><strong>Cancellations and Rescheduling:</strong> Cancellations made within 72 hours of the scheduled service will incur a cancellation fee, the amount of which will be determined based on the service booked and the notice given.</p>
      </Section>

      <Section title="4. Service Terms">
        <p><strong>Access:</strong> You agree to provide our staff with reasonable access to your property at the scheduled time. Failure to provide access may result in a rescheduling fee or cancellation of service.</p>
        <p><strong>Safety:</strong> For the safety of our staff, please secure any pets and inform us of any potential hazards on the property prior to the service.</p>
        <p><strong>Damage and Liability:</strong> While we take great care during our service, Zen Zone Cleaning Services is not responsible for any pre‑existing damage to property or items. In the event that accidental damage is caused by our staff, please notify us within 24 hours so that we may address the issue.</p>
        <p><strong>Quality Guarantee:</strong> If you are not satisfied with our service, please contact us within 24 hours. We will make every effort to resolve your concern at no additional charge.</p>
      </Section>

      <Section title="5. Privacy">
        <p>
          We value your privacy and are committed to protecting your personal information. We do not
          share your information with third parties except as required by law or as necessary to
          provide our services (for example, with payment processors or booking platforms).
        </p>
      </Section>

      <Section title="6. Termination">
        <p>
          Zen Zone Cleaning Services reserves the right to suspend or terminate service if you
          violate these Terms of Service or if the working conditions are deemed unsafe for our
          staff. We also reserve the right to refuse service at our discretion.
        </p>
      </Section>

      <Section title="7. Changes to These Terms">
        <p>
          We may update these Terms of Service from time to time to reflect changes in our practices
          or legal requirements. Any modifications will be posted on our website, and your continued
          use of our services will signify your acceptance of the updated terms. It is your
          responsibility to review these terms periodically.
        </p>
      </Section>

      <Section title="8. Governing Law">
        <p>
          These Terms of Service are governed by and construed in accordance with the laws of
          Ontario, Canada. Any disputes arising under or in connection with these terms shall be
          subject to the exclusive jurisdiction of the courts of Ontario.
        </p>
      </Section>

      <Section title="9. Contact Information">
        <p>
          Zen Zone Cleaning Services Inc.<br />
          49 High St 3rd floor, Barrie, ON L4N 5J4, Canada<br />
          Email: <a href="mailto:admin@zenzonecleaning.com">admin@zenzonecleaning.com</a>
        </p>
      </Section>
    </main>
  );
}


