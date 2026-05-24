import React from "react";
import hotelImage from "../../../assets/Hotel.webp";
import "./OurStory.css";

function OurStory({ title, paragraphs }) {
  return (
    <section className="our-story-section py-5">
      <div className="container py-md-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <h2 className="section-title fw-semibold mb-4">{title}</h2>
            <div className="title-underline mb-4"></div>
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="section-text lh-lg mb-4">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="col-lg-6">
            <div className="story-image-wrapper">
              <img
                src={hotelImage}
                alt="Hotel Story"
                className="story-image w-100 rounded shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurStory;
