import React from "react";
import RoomCard from "../../Global/RoomCard/RoomCard";
import { signatureSuites } from "../../../data/suites.data";
import "./SignatureSuites.css";

function SignatureSuites() {
  return (
    <section className="signature-suites py-5">
      <div className="container py-md-5">
        <div className="text-center mb-5">
          <h2 className="section-title fw-semibold mb-3">
            Our Signature Suites
          </h2>
          <div className="title-underline mx-auto mb-4"></div>
          <p className="section-description mx-auto lh-lg">
            Selected for their unique character and sophisticated design, our
            featured rooms offer the ultimate in comfort.
          </p>
        </div>

        <div className="row g-4">
          {signatureSuites.map((suite) => (
            <RoomCard
              key={suite.id}
              title={suite.title}
              description={suite.description}
              price={suite.price}
              image={suite.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SignatureSuites;
