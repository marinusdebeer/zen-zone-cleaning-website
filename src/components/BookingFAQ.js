import React from 'react';

const FAQ_ITEMS = [
  {
    q: 'Do I need to be home for the cleaning?',
    a: 'No. Many clients are away. You can let us in, provide a code, or leave a key with a neighbor/concierge. Just choose your preferred access method in the form.'
  },
  {
    q: 'Do you bring supplies and equipment?',
    a: 'Yes. We bring all supplies and equipment needed. If you have specific products you prefer we use, let us know in the Additional Details.'
  },
  {
    q: 'What should I do before the cleaners arrive?',
    a: 'A quick tidy (picking up toys, clothes, or dishes) helps us focus on deeper cleaning and saves you money.'
  },
  {
    q: 'How are estimates calculated?',
    a: 'We consider home size, number of rooms, last cleaned date, pets, extras, and the photos you share. More photos usually means better rates.'
  },
  {
    q: 'Can I add extras later?',
    a: 'Absolutely. You can request extras now or message us anytime before the appointment.'
  },
  {
    q: 'How and when can I pay?',
    a: 'Once the cleaning is completed, we will send you an invoice. You can pay via e‑transfer, or credit card.'
  },
  {
    q: 'How can I contact you?',
    a: 'Email admin@zenzonecleaning.com or call/text 705‑242‑5462. We\'re happy to help with any questions.'
  }
];

export default function BookingFAQ() {
  return (
    <section className="sidebar-card faq" aria-label="Booking FAQ">
      <h3 className="sidebar-card__title">Frequently Asked Questions</h3>
      <div className="faq__items" role="list">
        {FAQ_ITEMS.map((item) => (
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


