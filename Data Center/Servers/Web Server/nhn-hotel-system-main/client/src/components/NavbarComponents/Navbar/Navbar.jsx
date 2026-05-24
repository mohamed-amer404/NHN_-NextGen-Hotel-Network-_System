import React, { useState } from "react";
import Logo from "../Logo/Logo";
import MenuToggler from "../MenuToggler/MenuToggler";
import NavLinks from "../NavLinks/NavLinks";
import UserIcon from "../UserIcon/UserIcon";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-md navbar-custom sticky-top">
      <div className="container">
        {/* Logo Component */}
        <Logo />

        {/* Toggler Button for Mobile */}
        <MenuToggler isOpen={isOpen} onToggle={toggleNavbar} />

        {/* Collapsible Content */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          {/* Navigation links - Center */}
          <NavLinks onLinkClick={handleLinkClick} />

          {/* User icon - Right */}
          <UserIcon />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
