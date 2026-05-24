import React from "react";
import "./AccommodationCard.css";

function AccommodationCard({ name, description, price, image, category }) {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="accommodation-card card h-100 border-0 shadow-sm overflow-hidden">
        <div className="accommodation-image position-relative">
          <img
            src={image}
            alt={name}
            className="card-img-top w-100 h-100 object-fit-cover"
          />
          <span className="category-badge badge position-absolute top-0 start-0 m-3 text-uppercase">
            {category}
          </span>
        </div>
        <div className="card-body p-4 d-flex flex-column">
          <h3 className="accommodation-name fw-semibold mb-3">{name}</h3>
          <p className="accommodation-description text-muted mb-4 flex-grow-1 lh-base">
            {description}
          </p>
          <hr className="my-3" />
          <div className="d-flex justify-content-between align-items-center">
            <span className="price-label text-uppercase text-muted fw-medium">
              Starting From
            </span>
            <span className="accommodation-price fw-bold">
              ${price}
              <span className="price-period text-muted fw-normal">/night</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccommodationCard;
