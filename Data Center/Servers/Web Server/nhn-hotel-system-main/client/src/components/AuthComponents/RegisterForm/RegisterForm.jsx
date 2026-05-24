import React, { useState } from "react";

const initialState = {
  name: "",
  email: "",
  password: "",
};

function RegisterForm({ onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form" noValidate>
      <div className="mb-3 text-start">
        <label htmlFor="register-name" className="form-label auth-label">
          Full Name
        </label>
        <input
          id="register-name"
          name="name"
          type="text"
          className="form-control auth-input"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
          required
          minLength={2}
        />
      </div>

      <div className="mb-3 text-start">
        <label htmlFor="register-email" className="form-label auth-label">
          Email
        </label>
        <input
          id="register-email"
          name="email"
          type="email"
          className="form-control auth-input"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3 text-start">
        <label htmlFor="register-password" className="form-label auth-label">
          Password
        </label>
        <input
          id="register-password"
          name="password"
          type="password"
          className="form-control auth-input"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={6}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary w-100 auth-submit-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating account..." : "Register"}
      </button>
    </form>
  );
}

export default RegisterForm;
