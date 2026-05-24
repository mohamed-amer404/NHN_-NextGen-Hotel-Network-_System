import React from "react";
import hotelImage from "../../../assets/Hotel.webp";
import "./AboutHero.css";

function AboutHero({ title, subtitle }) {
  return (
    <section className="about-hero position-relative">
      <img
        src={hotelImage}
        alt="NHN Hotel"
        className="about-hero-image w-100 h-100 object-fit-cover"
      />
      <div className="about-hero-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
        <div className="container text-center text-white">
          <h1 className="about-hero-title fw-bold mb-3">{title}</h1>
          <p className="about-hero-subtitle fw-medium">{subtitle}</p>
        </div>
      </div>
    </section>
  );
}

export default AboutHero;
