import React from 'react';
import SEO from './SEO';

const Section = ({ title, children }) => (
  <section className="section" style={{ textAlign: 'left' }}>
    <h2 className="section__title" style={{ textAlign: 'left' }}>{title}</h2>
    <div style={{ lineHeight: 1.7 }}>{children}</div>
  </section>
);

export default function PrivacyPolicy() {
  return (
    <main className="legal legal--privacy">
      <SEO
        title="Privacy Policy | Zen Zone Cleaning"
        description="Learn how Zen Zone Cleaning collects, uses, and protects your personal information."
        path="/privacy"
        robots="index,follow"
      />
      <header className="section legal__header" style={{ textAlign: 'center' }}>
        <h1 className="section__title">Privacy Policy</h1>
        <p className="section__subtitle">Effective date: {new Date().getFullYear()}</p>
      </header>

      <Section title="1. Information We Collect">
        <p>
          We collect information that you voluntarily provide when you register on our website, make
          a booking, or contact us. This information may include: your name, email address, phone
          number, service preferences, and other relevant details.
        </p>
        <p>
          In addition, we automatically collect information through cookies and similar tracking
          technologies (such as your IP address, browser type, and pages visited) to help us improve
          our website and services.
        </p>
      </Section>

      <Section title="2. How We Use Your Information">
        <ul>
          <li>Service Provision: process bookings, manage your account, and deliver cleaning services</li>
          <li>Payment Processing via Stripe</li>
          <li>Customer Support and communications</li>
          <li>Marketing & Communications with your consent</li>
          <li>Website Improvement and analytics</li>
        </ul>
      </Section>

      <Section title="3. Use and Sharing of Your Personal Information">
        <p>
          Your personal information is used only for the purposes outlined above. We do not sell your
          information. However, we may share your data with trusted third parties that help us
          deliver our services, such as:
        </p>
        <ul>
          <li><strong>Stripe:</strong> to securely process payments. Your payment details are transmitted directly to Stripe and are not stored on our servers.</li>
          <li><strong>Jobber:</strong> our booking platform that manages your service appointments and account information.</li>
        </ul>
        <p><strong>Phone Numbers and Consent:</strong> We collect your phone number solely for confirming bookings, providing support, and sending service‑related notifications. We will not use your phone number for marketing purposes unless you expressly consent.</p>
        <p><strong>Text Messaging Consent Data:</strong> All the above categories exclude text messaging originator opt‑in data and consent; this information will not be shared with any third parties.</p>
      </Section>

      <Section title="4. Retention of Your Information">
        <p>
          We retain your personal information only for as long as necessary to fulfill the purposes
          for which it was collected or as required by law.
        </p>
      </Section>

      <Section title="5. Collection Practices">
        <p>
          We collect your personal information by lawful and fair means, ensuring that you are
          informed and that consent is obtained where required.
        </p>
      </Section>

      <Section title="6. Accuracy of Your Information">
        <p>
          We take reasonable steps to ensure that the personal information we hold is accurate,
          complete, and up‑to‑date. Please update your details if any changes occur.
        </p>
      </Section>

      <Section title="7. Security Measures">
        <p>
          We implement appropriate security measures—including encryption and secure servers—to
          protect your personal information from unauthorized access, disclosure, alteration, or
          destruction.
        </p>
      </Section>

      <Section title="8. Cookies and Tracking Technologies">
        <p>
          Our website uses cookies and similar technologies to enhance your browsing experience and
          analyze site traffic. You can manage your cookie preferences through your browser settings.
        </p>
      </Section>

      <Section title="9. Your Rights">
        <p>
          You have the right to access, correct, or delete your personal information, as well as to
          withdraw your consent to its use (subject to legal or contractual limitations). To exercise
          these rights, please contact us using the information provided below.
        </p>
      </Section>

      <Section title="10. International Data Transfers">
        <p>
          If we transfer your personal information outside of your jurisdiction, we will take
          appropriate measures to ensure that it remains protected in accordance with applicable
          laws.
        </p>
      </Section>

      <Section title="11. Policy Updates">
        <p>
          We may update this Privacy Policy from time to time to reflect changes in our practices or
          legal requirements. We encourage you to review this policy periodically. Significant
          changes will be communicated via email or by a notice on our website.
        </p>
      </Section>

      <Section title="12. Contact Us">
        <p>
          Zen Zone Cleaning Services Inc.<br />
          49 High St 3rd floor, Barrie, ON L4N 5J4, Canada<br />
          Email: <a href="mailto:admin@zenzonecleaning.com">admin@zenzonecleaning.com</a><br />
          Phone: <a href="tel:+17052425462">705-242-5462</a>
        </p>
      </Section>
    </main>
  );
}


