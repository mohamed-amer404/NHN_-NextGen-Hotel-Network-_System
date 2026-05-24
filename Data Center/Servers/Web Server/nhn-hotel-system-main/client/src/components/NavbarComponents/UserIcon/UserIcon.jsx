import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./UserIcon.css";

function UserIcon() {
  return (
    <div className="navbar-user ms-md-3 d-flex align-items-center justify-content-center mt-3 mt-md-0 pb-3 pb-md-0">
      <Link to="/profile">
        <FaUserCircle className="user-icon" />
      </Link>
    </div>
  );
}

export default UserIcon;
