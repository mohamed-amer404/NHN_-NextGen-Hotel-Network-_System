import React from "react";
import Button from "../../Global/Button/Button";
import heroImage from "../../../assets/Hero_Image.webp";
import "./HeroSection.css";

function HeroSection() {
  return (
    <section className="hero-section position-relative overflow-hidden d-flex align-items-center justify-content-center">
      <div className="hero-overlay position-absolute top-0 start-0 w-100 h-100"></div>
      <img
        src={heroImage}
        alt="Hotel Lobby"
        className="hero-image position-absolute top-0 start-0 w-100 h-100"
      />
      <div className="hero-content position-relative text-center text-white px-3 px-md-4">
        <p className="hero-subtitle text-uppercase mb-3 mb-md-4">
          WELCOME TO EXCELLENCE
        </p>
        <h1 className="hero-title fw-bold mb-3 mb-md-4">
          NHN Hotel: Your
          <br />
          Sanctuary of Elegance
        </h1>
        <p className="hero-description mx-auto mb-4 mb-md-5">
          Experience unparalleled luxury and world-class service in the heart of
          the city. Your journey to refined relaxation starts here.
        </p>
        <div className="d-flex flex-column flex-md-row gap-3 gap-md-4 justify-content-center align-items-center">
          <Button variant="primary">DISCOVER MORE</Button>
          <Button variant="outline">VIRTUAL TOUR</Button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
