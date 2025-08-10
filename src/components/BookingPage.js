import React, { useMemo, useRef, useState } from 'react';
import './BookingPage.css';

/**
 * BookingPage renders a multi-step booking form with conditional fields
 * and browser-level validation. On submission, it acknowledges the
 * request. Replace the submit handler with a real API call as needed.
 */
const BookingPage = () => {
  const formRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(1);

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
        const isSelected = prev.extras.includes(value);
        const updated = isSelected
          ? prev.extras.filter((v) => v !== value)
          : [...prev.extras, value];
        return { ...prev, extras: updated };
      }

      if (type === 'checkbox') {
        if (name === 'firstTimeDeepCleaning') {
          return { ...prev, [name]: checked ? 'Yes' : '' };
        }
        return { ...prev, [name]: checked };
      }

      if (type === 'file') {
        return { ...prev, [name]: Array.from(files || []) };
      }

      return { ...prev, [name]: value };
    });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const validateCurrentStep = () => {
    if (!formRef.current) return true;
    const stepEl = formRef.current.querySelector(`[data-step="${currentStep}"]`);
    if (!stepEl) return true;
    // Ensure hidden conditional fields are not required when hidden
    // We set required conditionally below, so browser validity works.
    const inputs = stepEl.querySelectorAll('input, select, textarea');
    for (const input of inputs) {
      if (input.required && !input.checkValidity()) {
        input.reportValidity();
        return false;
      }
    }
    return true;
  };

  const goNext = () => {
    if (!validateCurrentStep()) return;
    setCurrentStep((s) => Math.min(6, s + 1));
    scrollToTop();
  };

  const goPrev = () => {
    setCurrentStep((s) => Math.max(1, s - 1));
    scrollToTop();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate final step before submit
    if (!validateCurrentStep()) return;

    // In a real app, post formData to backend
    alert('Request submitted! We will contact you with an estimate.');
    setFormData(initialState);
    setCurrentStep(1);
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

  return (
    <main>
      <section className="booking">
        <div className="booking__container">
          <h1 className="booking__title">Book Your Cleaning</h1>
          <p className="booking__intro">Please complete the steps below to request an estimate.</p>

          <div className="stepper" aria-label="Booking steps">
            <div className="stepper__progress">
              <div className="stepper__bar" style={{ width: `${(currentStep - 1) * 20}%` }} />
            </div>
            <div className="stepper__labels">
              {[1, 2, 3, 4, 5, 6].map((n, idx) => (
                <div key={n} className={`stepper__label ${currentStep === n ? 'active' : ''}`} aria-current={currentStep === n ? 'step' : undefined}>
                  <span className="stepper__num">{n}</span>
                  <span className="stepper__text">{stepShortLabels[idx]}</span>
                </div>
              ))}
            </div>
          </div>

          <h2 className="step-title">Step {currentStep}: {stepTitle}</h2>

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
                      placeholder="e.g. 647 222 7305 or +1 647 222 7305"
                      title="Enter 10–15 digits, optional +, spaces, dashes, or parentheses"
                      value={formData.phone}
                      onChange={handleInputChange}
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
                    <div className="radio-group">
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
                  <div className="form-row">
                    <div className="form-field">
                      <span className="field-label">Frequency</span>
                      <div className="radio-group">
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
                    <div className="form-field">
                      <label htmlFor="extra-first-time-deep-cleaning">
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
                )}

                {isOneTime && (
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="booking-reason">Reason</label>
                      <input
                        id="booking-reason"
                        name="reason"
                        type="textarea"
                        required={isOneTime}
                        value={formData.reason}
                        onChange={handleInputChange}
                        placeholder="Tell us more about your one-time cleaning"
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
                      <option value="" disabled>Select a timeframe</option>
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
                      <option value="" disabled>Select an option</option>
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
                      <option value="" disabled>Select an option</option>
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
                          <option value="Deep - Scrub Frame & Shine Glass">Deep - Scrub Frame & Shine Glass</option>
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
                    >
                      <option value="" disabled>Select province</option>
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
                      placeholder="e.g. L4M 1A1"
                      pattern="^[A-Za-z]\\d[A-Za-z][ -]?\\d[A-Za-z]\\d$"
                      title="Enter a valid Canadian postal code (e.g., L4M 1A1)"
                      value={formData.postal}
                      onChange={handleInputChange}
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
                      <option value="I’ll be home to let you in">I’ll be home to let you in</option>
                      <option value="I’ll provide a lockbox or keypad code">I’ll provide a lockbox or keypad code</option>
                      <option value="Key hidden on premises">Key hidden on premises</option>
                      <option value="Key left with neighbor or concierge">Key left with neighbor or concierge</option>
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
              {currentStep > 1 && (
                <button type="button" className="btn btn--outline" onClick={goPrev}>
                  Previous
                </button>
              )}
              {currentStep < 6 && (
                <button type="button" className="btn" onClick={goNext}>
                  Next
                </button>
              )}
              {currentStep === 6 && (
                <button type="submit" className="btn booking__submit">
                  Request Estimate
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