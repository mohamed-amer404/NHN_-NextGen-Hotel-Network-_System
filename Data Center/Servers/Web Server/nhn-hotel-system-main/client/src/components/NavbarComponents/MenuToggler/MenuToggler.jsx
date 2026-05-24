import React from "react";
import { FaBars } from "react-icons/fa";
import "./MenuToggler.css";

function MenuToggler({ isOpen, onToggle }) {
  return (
    <button
      className="navbar-toggler border-0"
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-label="Toggle navigation"
    >
      <FaBars className="toggler-icon" />
    </button>
  );
}

export default MenuToggler;
