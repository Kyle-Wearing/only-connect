import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

export function Default() {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome to Only Connect Quiz Builder</h2>
        <p className="auth-subtext">
          Create and challenge others with your own quiz connections.
        </p>
        <div className="auth-button-group">
          <button onClick={() => navigate("/login")}>Log In</button>
          <button className="secondary" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
