import React from "react";
import { amenities } from "../../../data/amenities.data";
import "./Amenities.css";

function Amenities() {
  return (
    <section className="amenities-section py-5">
      <div className="container py-md-5">
        <div className="text-center mb-5">
          <p className="amenities-subtitle text-uppercase fw-normal mb-3">
            GUEST EXPERIENCE
          </p>
          <h2 className="amenities-title fw-semibold text-white mb-5">
            World-Class Amenities
          </h2>
        </div>

        <div className="row g-4">
          {amenities.map((amenity) => {
            const IconComponent = amenity.icon;
            return (
              <div key={amenity.id} className="col-12 col-md-6 col-lg-3">
                <div className="amenity-card text-center p-4">
                  <div className="amenity-icon mb-4 d-flex justify-content-center">
                    <IconComponent />
                  </div>
                  <h3 className="amenity-title fw-semibold text-white mb-3">
                    {amenity.title}
                  </h3>
                  <p className="amenity-description text-white-50 lh-base mb-0">
                    {amenity.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Amenities;
