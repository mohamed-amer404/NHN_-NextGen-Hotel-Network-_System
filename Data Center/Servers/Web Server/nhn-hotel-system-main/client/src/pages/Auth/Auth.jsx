import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/AuthComponents/LoginForm/LoginForm";
import RegisterForm from "../../components/AuthComponents/RegisterForm/RegisterForm";
import { loginUser, registerUser } from "../../utils/authApi";
import "./Auth.css";

function Auth() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const tabTitle = useMemo(
    () => (activeTab === "login" ? "Welcome Back" : "Create Account"),
    [activeTab],
  );

  const clearMessages = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };

  const switchTab = (tabName) => {
    clearMessages();
    setActiveTab(tabName);
  };

  const handleLoginSubmit = async (formData) => {
    clearMessages();
    setIsSubmitting(true);

    try {
      const data = await loginUser(formData);

      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      if (data?.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      setSuccessMessage("Login successful. Redirecting to home...");
      setTimeout(() => navigate("/home"), 900);
    } catch (error) {
      setErrorMessage(error.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (formData) => {
    clearMessages();
    setIsSubmitting(true);

    try {
      const data = await registerUser(formData);
      setSuccessMessage(
        data?.message || "Account created successfully. Please login.",
      );
      setActiveTab("login");
    } catch (error) {
      setErrorMessage(error.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <p className="auth-eyebrow">NHN Hotel System</p>
        <h2>{tabTitle}</h2>

        <div className="auth-tabs nav nav-pills mb-4" role="tablist">
          <button
            type="button"
            className={`nav-link ${activeTab === "login" ? "active" : ""}`}
            onClick={() => switchTab("login")}
          >
            Login
          </button>
          <button
            type="button"
            className={`nav-link ${activeTab === "register" ? "active" : ""}`}
            onClick={() => switchTab("register")}
          >
            Register
          </button>
        </div>

        {errorMessage && (
          <div className="alert alert-danger py-2" role="alert">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="alert alert-success py-2" role="alert">
            {successMessage}
          </div>
        )}

        <div className="auth-panel">
          {activeTab === "login" ? (
            <LoginForm
              onSubmit={handleLoginSubmit}
              isSubmitting={isSubmitting}
            />
          ) : (
            <RegisterForm
              onSubmit={handleRegisterSubmit}
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth;
