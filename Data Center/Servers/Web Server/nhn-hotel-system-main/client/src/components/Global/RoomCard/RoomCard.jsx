import React from "react";
import "./RoomCard.css";

function RoomCard({ title, description, price, image }) {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="room-card card h-100 border-0 rounded-3 shadow-sm overflow-hidden">
        <div className="room-card-image overflow-hidden">
          <img
            src={image}
            alt={title}
            className="card-img-top w-100 h-100 object-fit-cover"
          />
        </div>
        <div className="card-body p-4">
          <h3 className="room-card-title fw-semibold mb-3">{title}</h3>
          <p className="room-card-description text-muted lh-base mb-4">
            {description}
          </p>
          <p className="room-card-price fw-bold text-uppercase mb-0">
            FROM ${price.toLocaleString()} / NIGHT
          </p>
        </div>
      </div>
    </div>
  );
}

export default RoomCard;
