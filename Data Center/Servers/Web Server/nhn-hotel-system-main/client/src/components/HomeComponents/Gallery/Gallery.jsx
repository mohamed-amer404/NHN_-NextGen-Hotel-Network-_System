import React from "react";
import { galleryImages } from "../../../data/gallery.data";
import "./Gallery.css";

function Gallery() {
  return (
    <section className="gallery-section py-5">
      <div className="container py-md-5">
        <div className="text-center mb-5">
          <h2 className="section-title fw-semibold mb-3">Visual Experience</h2>
          <div className="title-underline mx-auto mb-4"></div>
          <p className="section-description mx-auto lh-lg">
            Explore the elegance and luxury through our stunning spaces, from
            grand suites to serene outdoor retreats.
          </p>
        </div>

        <div className="gallery-grid">
          {galleryImages.map((item, index) => (
            <div
              key={item.id}
              className={`gallery-item gallery-item-${index + 1}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="gallery-image w-100 h-100 object-fit-cover"
              />
              <div className="gallery-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                <h3 className="gallery-title text-white text-center fw-semibold">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;
