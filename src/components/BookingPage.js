import React, { useMemo, useRef, useState, useEffect } from 'react';
import SEO from './SEO';
import { useNavigate } from 'react-router-dom';
import './BookingPage.css';

/**
 * BookingPage renders a multi-step booking form with conditional fields
 * and browser-level validation. On submission, it acknowledges the
 * request. Replace the submit handler with a real API call as needed.
 */
const BookingPage = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [maxCompletedStep, setMaxCompletedStep] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Feature flag: temporarily disable emails
  const ENABLE_EMAILS = false;

  // Prefill flag (?prefill=1) to auto-populate all fields for testing
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const prefill = params.get('prefill');
    if (!prefill) return;

    setFormData((prev) => ({
      ...prev,
      // Step 1
      firstName: 'Test',
      lastName: 'User',
      company: 'Zen Zone Demo',
      email: 'marinusdebeer@gmail.com',
      phone: '6472227305',
      // Step 2
      industry: 'Home Cleaning',
      propertyType: 'House',
      // Step 3
      bookingType: 'Recurring',
      frequency: 'Weekly',
      reason: '',
      firstTimeDeepCleaning: 'Yes',
      // Step 4
      squareFootage: '1800',
      levels: '2',
      bedrooms: '3',
      bathrooms: '2',
      powderRooms: '1',
      kitchens: '1',
      lastCleaned: '1–4 weeks',
      people: '3',
      builtYear: '2005',
      lastRenovated: '2020',
      pets: 'Dog(s)',
      furnished: 'Yes',
      // Step 5
      package: '4',
      extras: [],
      interiorWindows: 'Basic - Shine Glass',
      insideEmptyKitchenCabinets: 'Not Needed',
      // Step 6
      address: '49 High St Suite 300',
      city: 'Barrie',
      province: 'ON',
      postal: 'L4N 5J4',
      date: 'Next Tue afternoon',
      accessMethod: "I'll be home to let you in",
      accessDetails: '',
      details: 'Please ring the bell. Gate code 1234 if needed.',
      hearAbout: 'Google Maps or GBP',
      referralName: '',
    }));

    // Jump to final step for quick submission
    setCurrentStep(6);
    setMaxCompletedStep(6);
  }, []);

  // Clear validation highlights when the step changes
  useEffect(() => {
    if (!formRef.current) return;
    const highlighted = formRef.current.querySelectorAll('.step-panel.show-validation');
    highlighted.forEach((el) => el.classList.remove('show-validation'));
  }, [currentStep]);

  const initialState = {
    // Step 1: Personal Information
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',

    // Step 2: Select Industry
    industry: '', // "Home Cleaning" | "Office Cleaning"
    propertyType: '', // House, Apartment, Condo, Townhouse, Commercial

    // Step 3: Select Service
    bookingType: '', // One-Time | Recurring
    frequency: '', // if Recurring
    reason: '', // if One-Time (input type="textarea")
    firstTimeDeepCleaning: '', // if Recurring; stores 'Yes' when checked

    // Step 4: Property Details
    squareFootage: '',
    levels: '',
    bedrooms: '',
    bathrooms: '',
    powderRooms: '',
    kitchens: '',
    lastCleaned: '',
    people: '',
    builtYear: '',
    lastRenovated: '',
    pets: '',
    furnished: '',

    // Step 5: Packages and Extras
    package: '', // if Recurring
    extras: [], // if One-Time
    interiorWindows: '', // if One-Time
    insideEmptyKitchenCabinets: '', // if One-Time

    // Step 6: Additional Details
    address: '',
    city: '',
    province: '',
    postal: '',
    date: '',
    accessMethod: '',
    accessDetails: '', // when Other
    details: '',
    hearAbout: '',
    referralName: '', // when Referral
    images: [],
  };

  const [formData, setFormData] = useState(initialState);

  const isRecurring = formData.bookingType === 'Recurring';
  const isOneTime = formData.bookingType === 'One-Time';

  const handleInputChange = (event) => {
    const target = event.target;
    const { name, type, value, checked, files } = target;

    setFormData((prev) => {
      if (type === 'checkbox' && name === 'extras') {
        const wasSelected = prev.extras.includes(value);
        const nowSelected = !wasSelected;
        const updatedExtras = nowSelected
          ? [...prev.extras, value]
          : prev.extras.filter((v) => v !== value);
        try {
          if (window.Tracking) {
            // granular toggle event per extra
            window.Tracking.queue && window.Tracking.queue(`extra:${value}`, nowSelected);
            window.Tracking.sendDataDebounced &&
              window.Tracking.sendDataDebounced(`extra:${value}`, nowSelected);
            // snapshot of all extras as a stable string
            const snapshot = updatedExtras.join(' | ');
            window.Tracking.queue && window.Tracking.queue('extras', snapshot);
            window.Tracking.sendDataDebounced &&
              window.Tracking.sendDataDebounced('extras', snapshot);
          }
        } catch (e) {}
        return { ...prev, extras: updatedExtras };
      }

      if (type === 'checkbox') {
        const nextVal = name === 'firstTimeDeepCleaning' ? (checked ? 'Yes' : '') : checked;
        try {
          if (window.Tracking && window.Tracking.queue) {
            window.Tracking.queue(name, nextVal);
          }
        } catch (e) {}
        if (name === 'firstTimeDeepCleaning') {
          return { ...prev, [name]: nextVal };
        }
        return { ...prev, [name]: nextVal };
      }

      if (type === 'file') {
        const selected = Array.from(files || []);
        try {
          if (window.Tracking) {
            window.Tracking.queue && window.Tracking.queue('imagesSelected', selected.length);
            window.Tracking.sendDataDebounced && window.Tracking.sendDataDebounced('imagesSelected', selected.length);
          }
        } catch (e) {}
        return { ...prev, [name]: selected };
      }

      const updated = { ...prev, [name]: value };
      try {
        // Queue all changes for batch flush
        if (window.Tracking && window.Tracking.queue) {
          window.Tracking.queue(name, value);
        }
        // Debounce immediate PII fields
        if (['firstName', 'lastName'].includes(name)) {
          const fullName = `${name === 'firstName' ? value : updated.firstName} ${
            name === 'lastName' ? value : updated.lastName
          }`.trim();
          if (window.Tracking && window.Tracking.sendDataDebounced) {
            if (fullName) {
              window.Tracking.sendDataDebounced('name', fullName);
            }
            if (name === 'firstName') {
              window.Tracking.sendDataDebounced('firstName', value);
            }
            if (name === 'lastName') {
              window.Tracking.sendDataDebounced('lastName', value);
            }
          }
        }
        if (name === 'email' && window.Tracking && window.Tracking.sendDataDebounced) {
          window.Tracking.sendDataDebounced('email', value);
        }
        if (name === 'phone' && window.Tracking && window.Tracking.sendDataDebounced) {
          window.Tracking.sendDataDebounced('phone', value);
        }
      } catch (e) {}
      return updated;
    });
  };

  const validateCurrentStep = () => {
    if (!formRef.current) return true;
    const stepEl = formRef.current.querySelector(`[data-step="${currentStep}"]`);
    if (!stepEl) return true;

    const inputs = stepEl.querySelectorAll('input, select, textarea');
    let firstInvalidInput = null;

    for (const input of inputs) {
      if (input.required && !input.checkValidity()) {
        if (!firstInvalidInput) {
          firstInvalidInput = input;
          input.reportValidity();
        }
      }
    }

    if (firstInvalidInput) {
      stepEl.classList.add('show-validation');

      if (isMobile) {
        setTimeout(() => {
          firstInvalidInput.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest',
          });
          firstInvalidInput.style.borderColor = 'var(--color-error, #dc2626)';
          firstInvalidInput.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)';
          setTimeout(() => {
            firstInvalidInput.style.borderColor = '';
            firstInvalidInput.style.boxShadow = '';
          }, 3000);
        }, 100);
      }
      return false;
    }
    return true;
  };

  const goNext = () => {
    if (!validateCurrentStep()) return;
    // Batch-track all fields when proceeding to the next step
    try {
      if (window.Tracking && window.Tracking.queue) {
        const serializeValue = (key, val) => {
          if (key === 'extras') return Array.isArray(val) ? val.join(' | ') : val;
          // skip images in step snapshot to avoid clobbering server 'images' link
          if (key === 'images') return undefined;
          return val;
        };
        Object.entries(formData).forEach(([key, val]) => {
          const out = serializeValue(key, val);
          if (typeof out !== 'undefined') window.Tracking.queue(key, out);
        });
        // avoid custom fields that may not exist in sheet
        window.Tracking.flush && window.Tracking.flush();
      }
    } catch (e) {}
    setCurrentStep((s) => {
      const next = Math.min(6, s + 1);
      setMaxCompletedStep((m) => Math.max(m, next));
      return next;
    });
    scrollToTop();
  };

  const goPrev = () => {
    setCurrentStep((s) => Math.max(1, s - 1));
    scrollToTop();
  };

  // Enhanced mobile scroll behavior
  const scrollToTop = () => {
    if (isMobile) {
      // Smooth scroll to top on mobile with offset for better UX
      const headerOffset = 80;
      const elementPosition = document.body.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    } else {
      // Instant scroll on desktop
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateCurrentStep()) return;
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      // fire a submission event and flush immediately
      try {
        if (window.Tracking) {
          // fire via beacon with minimal payload to avoid blocking
          window.Tracking.trackSubmitted && window.Tracking.trackSubmitted();
          // also queue current snapshot then flush as a backup
          if (window.Tracking.queue) {
            const serializeValue = (key, val) => {
              if (key === 'extras') return Array.isArray(val) ? val.join(' | ') : val;
              if (key === 'images') return undefined;
              return val;
            };
            Object.entries(formData).forEach(([key, val]) => {
              const out = serializeValue(key, val);
              if (typeof out !== 'undefined') window.Tracking.queue(key, out);
            });
            // match Apps Script sheet column name
            window.Tracking.queue('submitClicked', 'Submitted');
          }
          window.Tracking.flush && window.Tracking.flush();
        }
      } catch (e) {}
      // capture a few details for the confirmation page before resetting state
      const confirmEmail = formData.email;
      const confirmName = formData.firstName;
      // Upload images and track archive link even if emails are disabled
      try {
        if (formData.images && formData.images.length && window.Email && window.Email.uploadAllImages) {
          const result = await window.Email.uploadAllImages(formData.images, formData);
          if (result && result.folder && window.Tracking && window.Tracking.sendData) {
            const archiveLink = `https://prod.zenzonecleaning.ca/images/archive/${result.folder}`;
            window.Tracking.sendData('images', archiveLink);
          }
        }
      } catch (e) {
        console.error('Image upload or tracking failed:', e);
      }
      if (ENABLE_EMAILS && window.Email && window.Email.sendBookingRequest) {
        await window.Email.sendBookingRequest(formData);
      }
      // reset and navigate to confirmation
      setFormData(initialState);
      setCurrentStep(1);
      navigate('/confirmation', { state: { email: confirmEmail, firstName: confirmName } });
    } catch (err) {
      console.error('Submission failed:', err);
      alert('Sorry, something went wrong sending your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepTitle = useMemo(() => {
    switch (currentStep) {
      case 1:
        return 'Personal Information';
      case 2:
        return 'Select Industry';
      case 3:
        return 'Select Service';
      case 4:
        return 'Property Details';
      case 5:
        return 'Packages and Extras';
      case 6:
        return 'Additional Details';
      default:
        return '';
    }
  }, [currentStep]);

  const stepShortLabels = ['Info', 'Industry', 'Service', 'Property', 'Packages', 'Details'];

  // Calculate progress percentage (show progress on first step too)
  const progressPercentage = (currentStep / 6) * 100;

  // Flush queued events on visibility change/unload to avoid data loss
  useEffect(() => {
    const flushHandler = () => {
      try {
        window.Tracking && window.Tracking.flush && window.Tracking.flush();
      } catch (e) {}
    };
    window.addEventListener('visibilitychange', flushHandler);
    window.addEventListener('pagehide', flushHandler);
    window.addEventListener('beforeunload', flushHandler);
    return () => {
      window.removeEventListener('visibilitychange', flushHandler);
      window.removeEventListener('pagehide', flushHandler);
      window.removeEventListener('beforeunload', flushHandler);
    };
  }, []);

  return (
    <main>
      <SEO
        title="Request an Estimate | Zen Zone Cleaning"
        description="Request your free house cleaning estimate. Open daily 8am–8pm. Serving Barrie, Orillia, Innisfil and surrounding areas."
        path="/book"
      />
      <section className="booking">
        <div className="booking__container">
          <h1 className="booking__title">Book Your Cleaning</h1>
          <p className="booking__intro">Please complete the steps below to request an estimate.</p>

          {/* Enhanced Mobile progress indicator */}
          {isMobile && (
            <div className="mobile-progress">
              <div className="mobile-progress__text">
                Step {currentStep} of 6: {stepTitle}
              </div>
              <div className="mobile-progress__bar">
                <div
                  className="mobile-progress__fill"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          )}

          {/* Desktop-only stepper progress */}
          {!isMobile && (
            <div className="stepper" aria-label="Booking steps">
              <div className="stepper__header">
                <span className="stepper__current-textline">
                  Step {currentStep} of 6: {stepTitle}
                </span>
              </div>
              <div className="stepper__labels" role="tablist" aria-label="Steps">
                {stepShortLabels.map((label, idx) => {
                  const stepNum = idx + 1;
                  const isActive = stepNum === currentStep;
                  const isClickable = stepNum <= maxCompletedStep;
                  const className = [
                    'stepper__label',
                    isActive ? 'stepper__label--active' : '',
                    isClickable ? 'stepper__label--done' : 'stepper__label--disabled',
                  ]
                    .filter(Boolean)
                    .join(' ');
                  const handleJump = () => {
                    if (!isClickable) return;
                    // If jumping forward, batch-track snapshot before changing step
                    if (stepNum > currentStep) {
                      try {
                        if (window.Tracking && window.Tracking.queue) {
                          const serializeValue = (key, val) => {
                            if (key === 'extras') return Array.isArray(val) ? val.join(' | ') : val;
                            if (key === 'images') return undefined;
                            return val;
                          };
                          Object.entries(formData).forEach(([key, val]) => {
                            const out = serializeValue(key, val);
                            if (typeof out !== 'undefined') window.Tracking.queue(key, out);
                          });
                          window.Tracking.flush && window.Tracking.flush();
                        }
                      } catch (e) {}
                    }
                    setCurrentStep(stepNum);
                    scrollToTop();
                  };
                  return (
                    <button
                      key={label}
                      type="button"
                      className={className}
                      onClick={handleJump}
                      aria-current={isActive ? 'step' : undefined}
                      aria-disabled={!isClickable}
                      role="tab"
                    >
                      <span className="stepper__num" aria-hidden="true">{stepNum}</span>
                      <span className="stepper__text">{label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="stepper__progress">
                <div className="stepper__bar" style={{ width: `${progressPercentage}%` }} />
              </div>
            </div>
          )}

          {/* Remove duplicate desktop title; the header above now shows it with progress */}
          {/* {!isMobile && <h2 className="step-title">Step {currentStep}: {stepTitle}</h2>} */}

          <form ref={formRef} className="booking__form" onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div data-step="1" className="step-panel">
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="booking-firstName">First Name</label>
                    <input
                      id="booking-firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      autoComplete="given-name"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="booking-lastName">Last Name</label>
                    <input
                      id="booking-lastName"
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      autoComplete="family-name"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="booking-company">Company (optional)</label>
                    <input
                      id="booking-company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleInputChange}
                      autoComplete="organization"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="booking-email">Email</label>
                    <input
                      id="booking-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      autoComplete="email"
                      inputMode="email"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="booking-phone">Phone</label>
                    <input
                      id="booking-phone"
                      name="phone"
                      type="tel"
                      pattern="^(?:\+)?(?=(?:\D*\d){10,15}\D*$)[\d\s()\-]+$"
                      required
                      inputMode="tel"
                      placeholder=""
                      title="Enter 10–15 digits, optional +, spaces, dashes, or parentheses"
                      value={formData.phone}
                      onChange={handleInputChange}
                      autoComplete="tel"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Select Industry */}
            {currentStep === 2 && (
              <div data-step="2" className="step-panel">
                <div className="form-row">
                  <div className="form-field">
                    <span className="field-label">Industry</span>
                    <div className="radio-group">
                      <label htmlFor="industry-home">
                        <input
                          id="industry-home"
                          type="radio"
                          name="industry"
                          value="Home Cleaning"
                          required
                          checked={formData.industry === 'Home Cleaning'}
                          onChange={handleInputChange}
                        />
                        Home Cleaning
                      </label>
                      <label htmlFor="industry-office">
                        <input
                          id="industry-office"
                          type="radio"
                          name="industry"
                          value="Office Cleaning"
                          required
                          checked={formData.industry === 'Office Cleaning'}
                          onChange={handleInputChange}
                        />
                        Office Cleaning
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="booking-propertyType">Property Type</label>
                    <select
                      id="booking-propertyType"
                      name="propertyType"
                      required
                      value={formData.propertyType}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>
                        Select property type
                      </option>
                      <option value="House">House</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Condo">Condo</option>
                      <option value="Townhouse">Townhouse</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Select Service */}
            {currentStep === 3 && (
              <div data-step="3" className="step-panel">
                <div className="form-row">
                  <div className="form-field">
                    <span className="field-label">Booking Type</span>
                    <div className="radio-group booking-type">
                      <label htmlFor="booking-type-one-time">
                        <input
                          id="booking-type-one-time"
                          type="radio"
                          name="bookingType"
                          value="One-Time"
                          required
                          checked={formData.bookingType === 'One-Time'}
                          onChange={handleInputChange}
                        />
                        One-Time
                      </label>
                      <label htmlFor="booking-type-recurring">
                        <input
                          id="booking-type-recurring"
                          type="radio"
                          name="bookingType"
                          value="Recurring"
                          required
                          checked={formData.bookingType === 'Recurring'}
                          onChange={handleInputChange}
                        />
                        Recurring
                      </label>
                    </div>
                  </div>
                </div>

                {isRecurring && (
                  <>
                    <div className="form-row">
                      <div className="form-field">
                        <span className="field-label">Frequency</span>
                        <div className="radio-group radio-grid">
                          <label htmlFor="frequency-weekly">
                            <input
                              id="frequency-weekly"
                              type="radio"
                              name="frequency"
                              value="Weekly"
                              required={isRecurring}
                              checked={formData.frequency === 'Weekly'}
                              onChange={handleInputChange}
                            />
                            Weekly
                          </label>
                          <label htmlFor="frequency-biweekly">
                            <input
                              id="frequency-biweekly"
                              type="radio"
                              name="frequency"
                              value="Bi-Weekly"
                              required={isRecurring}
                              checked={formData.frequency === 'Bi-Weekly'}
                              onChange={handleInputChange}
                            />
                            Bi-Weekly
                          </label>
                          <label htmlFor="frequency-every4weeks">
                            <input
                              id="frequency-every4weeks"
                              type="radio"
                              name="frequency"
                              value="Every 4 Weeks"
                              required={isRecurring}
                              checked={formData.frequency === 'Every 4 Weeks'}
                              onChange={handleInputChange}
                            />
                            Every 4 Weeks
                          </label>
                          <label htmlFor="frequency-other">
                            <input
                              id="frequency-other"
                              type="radio"
                              name="frequency"
                              value="Other"
                              required={isRecurring}
                              checked={formData.frequency === 'Other'}
                              onChange={handleInputChange}
                            />
                            Other
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-field">
                        <label htmlFor="extra-first-time-deep-cleaning" className="checkbox-card">
                          <input
                            id="extra-first-time-deep-cleaning"
                            type="checkbox"
                            name="firstTimeDeepCleaning"
                            value="Yes"
                            checked={!!formData.firstTimeDeepCleaning}
                            onChange={handleInputChange}
                          />
                          First-time deep cleaning
                        </label>
                      </div>
                    </div>
                  </>
                )}

                {isOneTime && (
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="booking-reason">Reason</label>
                      <textarea
                        id="booking-reason"
                        name="reason"
                        required={isOneTime}
                        value={formData.reason}
                        onChange={handleInputChange}
                        placeholder="Tell us more about your one-time cleaning"
                        rows={3}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Property Details */}
            {currentStep === 4 && (
              <div data-step="4" className="step-panel">
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="booking-squareFootage">Square Footage</label>
                    <input
                      id="booking-squareFootage"
                      name="squareFootage"
                      type="number"
                      required
                      inputMode="numeric"
                      min="0"
                      step="1"
                      placeholder="e.g. 1800"
                      value={formData.squareFootage}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="booking-levels">Levels</label>
                    <input
                      id="booking-levels"
                      name="levels"
                      type="number"
                      required
                      inputMode="numeric"
                      min="1"
                      step="1"
                      placeholder="e.g. 2"
                      value={formData.levels}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="booking-bedrooms">Bedrooms</label>
                    <input
                      id="booking-bedrooms"
                      name="bedrooms"
                      type="number"
                      required
                      inputMode="numeric"
                      min="0"
                      step="1"
                      value={formData.bedrooms}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="booking-bathrooms">Bathrooms</label>
                    <input
                      id="booking-bathrooms"
                      name="bathrooms"
                      type="number"
                      required
                      inputMode="numeric"
                      min="0"
                      step="1"
                      value={formData.bathrooms}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="booking-powderRooms">Powder Rooms</label>
                    <input
                      id="booking-powderRooms"
                      name="powderRooms"
                      type="number"
                      required
                      inputMode="numeric"
                      min="0"
                      step="1"
                      value={formData.powderRooms}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="booking-kitchens">Kitchens</label>
                    <input
                      id="booking-kitchens"
                      name="kitchens"
                      type="number"
                      required
                      inputMode="numeric"
                      min="0"
                      step="1"
                      value={formData.kitchens}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="booking-lastCleaned">Last Cleaned</label>
                    <select
                      id="booking-lastCleaned"
                      name="lastCleaned"
                      required
                      value={formData.lastCleaned}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>
                        Select a timeframe
                      </option>
                      <option value="Within 1 week">Within 1 week</option>
                      <option value="1–4 weeks">1–4 weeks</option>
                      <option value="1–3 months">1–3 months</option>
                      <option value="3+ months">3+ months</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label htmlFor="booking-people">People</label>
                    <input
                      id="booking-people"
                      name="people"
                      type="number"
                      required
                      inputMode="numeric"
                      min="1"
                      step="1"
                      placeholder="e.g. 3"
                      value={formData.people}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="booking-builtYear">Built Year</label>
                    <input
                      id="booking-builtYear"
                      name="builtYear"
                      type="number"
                      required
                      inputMode="numeric"
                      min="1900"
                      max={new Date().getFullYear()}
                      step="1"
                      placeholder="e.g. 2005"
                      value={formData.builtYear}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="booking-lastRenovated">Last Renovated</label>
                    <input
                      id="booking-lastRenovated"
                      name="lastRenovated"
                      type="text"
                      required
                      placeholder="e.g. 2020 or N/A"
                      value={formData.lastRenovated}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="booking-pets">Pets</label>
                    <select
                      id="booking-pets"
                      name="pets"
                      required
                      value={formData.pets}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      <option value="None">None</option>
                      <option value="Dog(s)">Dog(s)</option>
                      <option value="Cat(s)">Cat(s)</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label htmlFor="booking-furnished">Furnished</label>
                    <select
                      id="booking-furnished"
                      name="furnished"
                      required
                      value={formData.furnished}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Packages and Extras */}
            {currentStep === 5 && (
              <div data-step="5" className="step-panel">
                {isRecurring && (
                  <div className="form-row">
                    <div className="form-field">
                      <span className="field-label">Package</span>
                      <div className="radio-group radio-grid">
                        {['2.5', '3', '3.5', '4', '4.5', '5', '6', 'NA'].map((pkg) => (
                          <label key={pkg} htmlFor={`package-${pkg}`}>
                            <input
                              id={`package-${pkg}`}
                              type="radio"
                              name="package"
                              value={pkg}
                              required={isRecurring}
                              checked={formData.package === pkg}
                              onChange={handleInputChange}
                            />
                            {pkg}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {isOneTime && (
                  <>
                    <div className="form-extras">
                      <p className="extras-title">Extras</p>
                      <div className="extras-grid checkbox-grid">
                        {[
                          { id: 'extra-baseboards', label: 'Deep clean of baseboards' },
                          { id: 'extra-oven', label: 'Inside Oven' },
                          { id: 'extra-behind-stove', label: 'Behind Stove' },
                          { id: 'extra-inside-fridge', label: 'Inside Fridge' },
                          { id: 'extra-behind-fridge', label: 'Behind Fridge' },
                          { id: 'extra-window-blinds', label: 'Window Blinds' },
                          { id: 'extra-wall-spot', label: 'Wall Spot Cleaning' },
                          { id: 'extra-cabinet-fronts', label: 'Cabinet Fronts (Deep Clean)' },
                        ].map((ex) => (
                          <label key={ex.id} htmlFor={ex.id}>
                            <input
                              id={ex.id}
                              type="checkbox"
                              name="extras"
                              value={ex.label}
                              checked={formData.extras.includes(ex.label)}
                              onChange={handleInputChange}
                            />
                            {ex.label}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-field">
                        <label htmlFor="interiorWindows">Interior Windows</label>
                        <select
                          id="interiorWindows"
                          name="interiorWindows"
                          required={isOneTime}
                          value={formData.interiorWindows}
                          onChange={handleInputChange}
                        >
                          <option value="" disabled>
                            Select an option
                          </option>
                          <option value="Basic - Shine Glass">Basic - Shine Glass</option>
                          <option value="Deep - Scrub Frame & Shine Glass">
                            Deep - Scrub Frame & Shine Glass
                          </option>
                          <option value="Not Needed">Not Needed</option>
                        </select>
                      </div>

                      <div className="form-field">
                        <label htmlFor="insideCabinets">Inside Empty Kitchen Cabinets</label>
                        <select
                          id="insideCabinets"
                          name="insideEmptyKitchenCabinets"
                          required={isOneTime}
                          value={formData.insideEmptyKitchenCabinets}
                          onChange={handleInputChange}
                        >
                          <option value="" disabled>
                            Select an option
                          </option>
                          <option value="Basic Wipe Out">Basic Wipe Out</option>
                          <option value="Deep Clean">Deep Clean</option>
                          <option value="Not Needed">Not Needed</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Step 6: Additional Details */}
            {currentStep === 6 && (
              <div data-step="6" className="step-panel">
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="booking-address">Address</label>
                    <input
                      id="booking-address"
                      name="address"
                      type="text"
                      required
                      placeholder="49 High St Suite 300, Barrie, ON L4N 5J4, Canada"
                      value={formData.address}
                      onChange={handleInputChange}
                      autoComplete="street-address"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="booking-city">City</label>
                    <input
                      id="booking-city"
                      name="city"
                      type="text"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      autoComplete="address-level2"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="booking-province">Province</label>
                    <select
                      id="booking-province"
                      name="province"
                      required
                      value={formData.province}
                      onChange={handleInputChange}
                      autoComplete="address-level1"
                    >
                      <option value="" disabled>
                        Select province
                      </option>
                      <option value="ON">Ontario</option>
                      <option value="BC">British Columbia</option>
                      <option value="AB">Alberta</option>
                      <option value="SK">Saskatchewan</option>
                      <option value="MB">Manitoba</option>
                      <option value="QC">Quebec</option>
                      <option value="NB">New Brunswick</option>
                      <option value="NS">Nova Scotia</option>
                      <option value="PE">Prince Edward Island</option>
                      <option value="NL">Newfoundland and Labrador</option>
                      <option value="YT">Yukon</option>
                      <option value="NT">Northwest Territories</option>
                      <option value="NU">Nunavut</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label htmlFor="booking-postal">Postal Code</label>
                    <input
                      id="booking-postal"
                      name="postal"
                      type="text"
                      required
                      placeholder="e.g. L4M 1A1 or 12345"
                      maxLength={10}
                      value={formData.postal}
                      onChange={handleInputChange}
                      autoComplete="postal-code"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="booking-date">Preferred Dates</label>
                    <input
                      id="booking-date"
                      name="date"
                      type="text"
                      required
                      placeholder="e.g., Next Tue afternoon or any weekday mornings"
                      value={formData.date}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="booking-accessMethod">Access Method</label>
                    <select
                      id="booking-accessMethod"
                      name="accessMethod"
                      required
                      value={formData.accessMethod}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>
                        Select access method
                      </option>
                      <option value="I'll be home to let you in">I'll be home to let you in</option>
                      <option value="I'll provide a lockbox or keypad code">
                        I'll provide a lockbox or keypad code
                      </option>
                      <option value="Key hidden on premises">Key hidden on premises</option>
                      <option value="Key left with neighbor or concierge">
                        Key left with neighbor or concierge
                      </option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {formData.accessMethod === 'Other' && (
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="booking-accessDetails">Access Details</label>
                      <textarea
                        id="booking-accessDetails"
                        name="accessDetails"
                        rows={3}
                        value={formData.accessDetails}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                )}

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="booking-details">Additional Details</label>
                    <textarea
                      id="booking-details"
                      name="details"
                      rows={4}
                      required
                      value={formData.details}
                      onChange={handleInputChange}
                      placeholder="Any additional information or special requests..."
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="booking-hearAbout">How did you hear about us?</label>
                    <select
                      id="booking-hearAbout"
                      name="hearAbout"
                      required
                      value={formData.hearAbout}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      <option value="Google Maps or GBP">Google Maps or GBP</option>
                      <option value="Google Guaranteed">Google Guaranteed</option>
                      <option value="Brochure">Brochure</option>
                      <option value="Referral">Referral</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {formData.hearAbout === 'Referral' && (
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="booking-referralName">Referral Name</label>
                      <input
                        id="booking-referralName"
                        name="referralName"
                        type="text"
                        value={formData.referralName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                )}

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="booking-images">Upload Images (optional)</label>
                    <input
                      id="booking-images"
                      name="images"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="nav-buttons">
              <button
                type="button"
                className="btn btn--outline"
                onClick={goPrev}
                disabled={currentStep === 1}
                aria-disabled={currentStep === 1}
              >
                Previous
              </button>
              {currentStep < 6 && (
                <button type="button" className="btn" onClick={goNext}>
                  Next
                </button>
              )}
              {currentStep === 6 && (
                <button
                  type="submit"
                  className="btn booking__submit"
                  disabled={isSubmitting}
                  aria-disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending…' : 'Request Estimate'}
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default BookingPage;
