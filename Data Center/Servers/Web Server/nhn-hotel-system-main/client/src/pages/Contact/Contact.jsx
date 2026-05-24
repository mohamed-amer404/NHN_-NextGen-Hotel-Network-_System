import React from "react";
import "./Contact.css";

function Contact() {
  return (
    <div className="contact-page">
      <div className="container py-5">
        <div className="contact-hero text-center mb-5">
          <h1>Contact NHN Hotel</h1>
          <p>
            We are available 24/7 to help you with reservations, events, and
            special requests.
          </p>
        </div>

        <div className="row g-4 mb-5">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="contact-info-card h-100">
              <h3>Phone</h3>
              <p>+20 100 123 4567</p>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="contact-info-card h-100">
              <h3>Email</h3>
              <p>reservations@nhnhotel.com</p>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="contact-info-card h-100">
              <h3>Location</h3>
              <p>25 Nile Corniche, Cairo, Egypt</p>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-12 col-lg-9">
            <div className="contact-map-card h-100">
              <h2>Find Us on Map</h2>
              <iframe
                title="NHN Hotel Location"
                src="https://maps.google.com/maps?q=Nile%20Corniche%20Cairo&t=&z=13&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="contact-map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
