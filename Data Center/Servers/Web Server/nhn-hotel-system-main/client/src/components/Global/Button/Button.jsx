import React from "react";
import "./Button.css";

function Button({ children, variant = "primary", onClick, className = "" }) {
  const variantClass = variant === "primary" ? "btn-gold" : "btn-outline-light";

  return (
    <button
      className={`btn ${variantClass} text-uppercase px-4 py-3 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
