import React from "react";
import "./MissionVision.css";

function MissionVision({ mission, vision }) {
  return (
    <section className="mission-vision-section py-5">
      <div className="container py-md-5">
        <div className="row g-4">
          <div className="col-md-6">
            <div className="mission-card card border-0 shadow-sm h-100 p-5">
              <h3 className="card-title fw-semibold mb-4">{mission.title}</h3>
              <p className="card-text lh-lg">{mission.text}</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="vision-card card border-0 shadow-sm h-100 p-5">
              <h3 className="card-title fw-semibold mb-4">{vision.title}</h3>
              <p className="card-text lh-lg">{vision.text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MissionVision;
