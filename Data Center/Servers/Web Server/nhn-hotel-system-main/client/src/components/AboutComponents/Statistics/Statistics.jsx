import React from "react";
import { statistics } from "../../../data/statistics.data";
import "./Statistics.css";

function Statistics() {
  return (
    <section className="statistics-section py-5">
      <div className="container py-md-5">
        <div className="text-center mb-5">
          <h2 className="section-title fw-semibold mb-3">
            Excellence in Numbers
          </h2>
          <div className="title-underline mx-auto mb-4"></div>
          <p className="section-description mx-auto lh-lg">
            Two decades of dedication to hospitality excellence, reflected in
            every experience we deliver.
          </p>
        </div>

        <div className="row g-4">
          {statistics.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div key={stat.id} className="col-6 col-lg-3">
                <div className="stat-card card border-0 shadow-sm text-center p-4 h-100">
                  <div className="stat-icon mb-3 d-flex justify-content-center">
                    <IconComponent />
                  </div>
                  <h3 className="stat-number fw-bold mb-2">{stat.number}</h3>
                  <p className="stat-label text-muted text-uppercase mb-0">
                    {stat.label}
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

export default Statistics;
