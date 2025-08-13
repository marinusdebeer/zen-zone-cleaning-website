import React from 'react';
import { FAQS } from './faqsData';

export default function BookingFAQ() {
  return (
    <section className="sidebar-card faq" aria-label="Booking FAQ">
      <h3 className="sidebar-card__title">Frequently Asked Questions</h3>
      <div className="faq__items" role="list">
        {FAQS.map((item) => (
          <details key={item.q} className="faq__item" role="listitem">
            <summary className="faq__question">
              <span className="faq__q-text">{item.q}</span>
              <svg className="faq__chevron" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </summary>
            <div className="faq__answer">{item.a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}


