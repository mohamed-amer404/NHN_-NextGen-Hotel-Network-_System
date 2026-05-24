import React from "react";
import { NavLink } from "react-router-dom";
import "./NavLinks.css";

function NavLinks({ onLinkClick }) {
  const links = [
    { to: "/home", label: "Home" },
    { to: "/rooms", label: "Rooms" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <ul className="navbar-nav mx-auto gap-md-4 gap-2">
      {links.map((link) => (
        <li className="nav-item" key={link.to}>
          <NavLink
            to={link.to}
            className="nav-link text-center"
            onClick={onLinkClick}
          >
            {link.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default NavLinks;
