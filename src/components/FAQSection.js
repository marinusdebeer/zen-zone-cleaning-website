import React from 'react';
import './FAQSection.css';

/**
 * Generic FAQ section component.
 *
 * Props:
 * - id: optional id attribute for the section
 * - title: heading text (default: 'Frequently Asked Questions')
 * - faqs: array of { q, a } objects
 * - initialVisibleCount: number of FAQs to show before "Show more" (default 6)
 */
export default function FAQSection({ id = 'faq', title = 'Frequently Asked Questions', faqs = [], initialVisibleCount = 6 }) {
  const [openIndex, setOpenIndex] = React.useState(-1);
  const contentRefs = React.useRef([]);
  const [panelHeights, setPanelHeights] = React.useState([]);

  const visibleFaqs = faqs;

  React.useEffect(() => {
    const heights = visibleFaqs.map((_, i) => {
      const el = contentRefs.current[i];
      return el ? el.scrollHeight : 0;
    });
    setPanelHeights(heights);
  }, [visibleFaqs]);

  React.useEffect(() => {
    const onResize = () => {
      const heights = visibleFaqs.map((_, i) => {
        const el = contentRefs.current[i];
        return el ? el.scrollHeight : 0;
      });
      setPanelHeights(heights);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [visibleFaqs]);

  return (
    <section className="faq" id={id} aria-labelledby={`${id}-heading`} style={{ marginTop: '2.5rem', position: 'relative' }}>
      <h2 id={`${id}-heading`} className="section-title">{title}</h2>
      <div className="faq-list">
        {visibleFaqs.map((f, i) => {
          const isOpen = openIndex === i;
          const maxHeight = isOpen ? `${panelHeights[i] || 0}px` : '0px';
          return (
            <div className="faq-item" key={f.q}>
              <button
                type="button"
                className="faq-question"
                aria-expanded={isOpen}
                aria-controls={`${id}-panel-${i}`}
                id={`${id}-control-${i}`}
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
              >
                {f.q}
              </button>
              <div
                id={`${id}-panel-${i}`}
                role="region"
                aria-labelledby={`${id}-control-${i}`}
                className={`faq-panel${isOpen ? ' is-open' : ''}`}
                style={{ maxHeight }}
                ref={(el) => (contentRefs.current[i] = el)}
              >
                <div className="faq-content">
                  <p>{f.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* All FAQs are shown by default; no toggle button */}
    </section>
  );
}


