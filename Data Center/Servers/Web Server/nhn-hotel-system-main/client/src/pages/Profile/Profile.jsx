import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const [user] = useState(() => {
    const userFromStorage = localStorage.getItem("user");

    if (!userFromStorage) {
      return null;
    }

    try {
      return JSON.parse(userFromStorage);
    } catch {
      return null;
    }
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth");
  };

  return (
    <div className="profile-page">
      <div className="container py-5">
        <div className="profile-card">
          <div className="profile-icon-wrap">
            <FaUserCircle className="profile-user-icon" aria-hidden="true" />
          </div>
          <h1>User Profile</h1>

          {user ? (
            <div className="profile-details">
              <div className="profile-row">
                <span>Name</span>
                <strong>{user.name || "-"}</strong>
              </div>
              <div className="profile-row">
                <span>Email</span>
                <strong>{user.email || "-"}</strong>
              </div>
              <div className="profile-row">
                <span>User ID</span>
                <strong className="profile-id">{user.id || "-"}</strong>
              </div>
              <button
                type="button"
                className="btn btn-danger mt-4 profile-logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              <p className="text-muted">
                No user data found. Please login again.
              </p>
              <button
                type="button"
                className="btn btn-primary mt-3"
                onClick={() => navigate("/auth")}
              >
                Go to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
