import React, { useState } from "react";

const initialState = {
  email: "",
  password: "",
};

function LoginForm({ onSubmit, isSubmitting }) {
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
        <label htmlFor="login-email" className="form-label auth-label">
          Email
        </label>
        <input
          id="login-email"
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
        <label htmlFor="login-password" className="form-label auth-label">
          Password
        </label>
        <input
          id="login-password"
          name="password"
          type="password"
          className="form-control auth-input"
          placeholder="Enter your password"
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
        {isSubmitting ? "Signing in..." : "Login"}
      </button>
    </form>
  );
}

export default LoginForm;
