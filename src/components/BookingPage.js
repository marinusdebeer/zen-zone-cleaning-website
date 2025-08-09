import React, { useState } from 'react';
import './BookingPage.css';

/**
 * BookingPage renders a comprehensive booking form for clients to
 * request a cleaning service. The form gathers all the essential
 * information our team needs to prepare an accurate quote. On
 * submission the form simply acknowledges the request; in a real
 * implementation this data would be sent to a backend or CRM.
 */
const BookingPage = () => {
  // Define the initial state for the booking form. Using a single
  // state object allows us to manage all fields cleanly. Extras are
  // captured in an array because multiple values can be selected.
  const initialState = {
    name: '',
    email: '',
    phone: '',
    address: '',
    propertyType: '',
    serviceType: '',
    frequency: '',
    bedrooms: '',
    bathrooms: '',
    extras: [],
    comments: '',
  };
  const [formData, setFormData] = useState(initialState);

  /**
   * Handles updates to form inputs. For checkboxes, we add or remove
   * the value from the extras array. For other fields, we update the
   * corresponding key on the formData object.
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => {
        const extras = prev.extras.includes(value)
          ? prev.extras.filter((item) => item !== value)
          : [...prev.extras, value];
        return { ...prev, extras };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  /**
   * Submits the booking form. Currently this simply shows an alert
   * acknowledging receipt and resets the form. Replace this logic
   * with an API call to persist the booking request as needed.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      'Thank you for your booking request! One of our team members will reach out shortly to confirm the details.'
    );
    setFormData(initialState);
  };

  return (
    <main>
      <section className="booking">
        <div className="booking__container">
          <h1 className="booking__title">Book Your Cleaning</h1>
          <p className="booking__intro">
            Fill out the form below and we’ll be in touch to confirm your
            appointment and finalise your quote.
          </p>
          <form className="booking__form" onSubmit={handleSubmit}>
            {/* Personal information */}
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="address">Address</label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            {/* Property and service selection */}
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="propertyType">Property Type</label>
                <select
                  id="propertyType"
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select property type
                  </option>
                  <option value="House">House</option>
                  <option value="Condo">Condo</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Office">Office</option>
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="serviceType">Service Type</label>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select service type
                  </option>
                  <option value="Standard Cleaning">Standard Cleaning</option>
                  <option value="Deep Cleaning">Deep Cleaning</option>
                  <option value="Move In/Out">Move In/Out</option>
                  <option value="Post-Renovation">Post‑Renovation</option>
                  <option value="Office Cleaning">Office Cleaning</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="frequency">Frequency</label>
                <select
                  id="frequency"
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select frequency
                  </option>
                  <option value="One‑Time">One‑Time</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Bi‑Weekly">Bi‑Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="bedrooms">Bedrooms</label>
                <select
                  id="bedrooms"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    No. of bedrooms
                  </option>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="bathrooms">Bathrooms</label>
                <select
                  id="bathrooms"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    No. of bathrooms
                  </option>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Extras */}
            <div className="form-extras">
              <p className="extras-title">Extras</p>
              <div className="extras-grid">
                {[
                  'Inside Fridge',
                  'Inside Oven',
                  'Interior Windows',
                  'Laundry',
                  'Organising',
                ].map((extra) => (
                  <label key={extra}>
                    <input
                      type="checkbox"
                      name="extras"
                      value={extra}
                      checked={formData.extras.includes(extra)}
                      onChange={handleChange}
                    />
                    {extra}
                  </label>
                ))}
              </div>
            </div>
            {/* Additional notes */}
            <div className="form-field">
              <label htmlFor="comments">Additional Notes</label>
              <textarea
                id="comments"
                name="comments"
                rows="4"
                value={formData.comments}
                onChange={handleChange}
                placeholder="Any special instructions or information you’d like to share"
              ></textarea>
            </div>
            <button type="submit" className="btn booking__submit">
              Submit Request
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default BookingPage;