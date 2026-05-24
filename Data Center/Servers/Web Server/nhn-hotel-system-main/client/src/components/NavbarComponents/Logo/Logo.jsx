import React from "react";
import { Link } from "react-router-dom";
import { RiHotelLine } from "react-icons/ri";
import "./Logo.css";

function Logo() {
  return (
    <Link to="/home" className="navbar-brand d-flex align-items-center gap-2">
      <RiHotelLine className="logo-icon" />
      <span className="logo-text">NHN HOTEL</span>
    </Link>
  );
}

export default Logo;
