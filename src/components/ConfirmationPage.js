import React, { useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';

const ConfirmationPage = () => {
  const { state } = useLocation();
  const firstName = state?.firstName || 'Thank you';
  const email = state?.email || '';

  const subtitle = useMemo(() => {
    if (email) {
      return `We’ve emailed a confirmation to ${email}. Our team will contact you shortly with your estimate.`;
    }
    return 'Our team will contact you shortly with your estimate.';
  }, [email]);

  return (
    <main>
      <section className="booking">
        <div className="booking__container" style={{ textAlign: 'center' }}>
          <h1 className="booking__title">{firstName} — Request Received</h1>
          <p className="booking__intro">
            {subtitle}
          </p>

          <div className="step-panel" style={{ maxWidth: 680, margin: '0 auto' }}>
            <h2 className="step-title" style={{ textAlign: 'center' }}>What happens next?</h2>
            <ul style={{ textAlign: 'left', margin: '0 auto', maxWidth: 560, lineHeight: 1.6 }}>
              <li>We’ll review your details and reach out to confirm any specifics.</li>
              <li>You’ll receive your free estimate.</li>
              <li>Have photos to add? Simply reply to the confirmation email with attachments.</li>
            </ul>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <Link className="btn" to="/book">Make another request</Link>
            <a className="btn btn--outline" href="/">Return to homepage</a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ConfirmationPage;


