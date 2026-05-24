import React from "react";
import "./WhyChooseUs.css";

function WhyChooseUs({ title, features }) {
  return (
    <section className="why-choose-section py-5">
      <div className="container py-md-5">
        <div className="text-center mb-5">
          <h2 className="section-title fw-semibold mb-3">{title}</h2>
          <div className="title-underline mx-auto mb-4"></div>
        </div>

        <div className="row g-4">
          {features.map((feature) => (
            <div key={feature.id} className="col-md-6 col-lg-3">
              <div className="feature-card text-center p-4">
                <div className="feature-number fw-bold mb-3">
                  {feature.number}
                </div>
                <h4 className="feature-title fw-semibold mb-3">
                  {feature.title}
                </h4>
                <p className="feature-text lh-base">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
