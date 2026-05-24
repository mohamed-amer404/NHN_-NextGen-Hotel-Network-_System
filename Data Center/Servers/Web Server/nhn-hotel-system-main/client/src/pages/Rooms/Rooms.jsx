import React, { useState } from "react";
import AccommodationCard from "../../components/Global/AccommodationCard/AccommodationCard";
import { accommodations, categories } from "../../data/accommodations.data";
import "./Rooms.css";

function Rooms() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredAccommodations =
    activeCategory === "all"
      ? accommodations
      : accommodations.filter((room) => room.category === activeCategory);

  return (
    <div className="rooms-page">
      <section className="accommodations-section py-5">
        <div className="container py-md-5">
          <div className="text-center mb-5">
            <h1 className="section-title fw-semibold mb-3">
              Our Accommodations
            </h1>
            <p className="section-description mx-auto lh-lg mb-4">
              Indulge in an atmosphere of refined elegance and unparalleled
              comfort, designed for the discerning traveler seeking the pinnacle
              of luxury.
            </p>

            {/* Category Filter */}
            <div className="category-filters d-flex justify-content-center gap-3 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`filter-btn btn ${
                    activeCategory === category.id
                      ? "btn-dark"
                      : "btn-outline-dark"
                  } text-uppercase px-4 py-2`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div className="row g-4">
            {filteredAccommodations.map((accommodation) => (
              <AccommodationCard
                key={accommodation.id}
                name={accommodation.name}
                description={accommodation.description}
                price={accommodation.price}
                image={accommodation.image}
                category={accommodation.category}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Rooms;
