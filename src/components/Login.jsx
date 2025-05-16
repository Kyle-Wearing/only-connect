import React, { useState } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logIn } from "../../api";
import { LoadingSpinner } from "./LoadingSpinner";

export function Login() {
  const [credentials, setCredentials] = useState({
    name: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const user = await logIn(credentials);
    if (user.status === 200) {
      sessionStorage.setItem("user_id", user.userId);
      navigate("/home");
    } else {
      setError(user.msg);
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>

        <div className="login-field">
          <label htmlFor="name">Name</label>
          <div className="password-wrapper">
            <input
              type="text"
              id="name"
              name="name"
              value={credentials.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="login-field">
          <label htmlFor="password">Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="toggle-password"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
        </div>
        {error && <p className="login-error">{error}</p>}
        <button type="submit" className="login-button">
          {loading ? <LoadingSpinner /> : "Log In"}
        </button>
        <p className="login-switch">
          Don't have an account? <Link to="/sign-up">Sign up</Link>
        </p>
        <p className="signup-switch">
          <Link to="/home">Continue as Guest?</Link>
        </p>
      </form>
    </div>
  );
}
