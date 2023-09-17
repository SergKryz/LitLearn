import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import fbIcon from "../assets/icons/fb.png";
import twitterIcon from "../assets/icons/twitter.png";
import googleIcon from "../assets/icons/google.png";
import "../styles/Login.css";
import MainLogo from "./mainLogo";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);

      //if email is admins , redirect to admin page
      if (emailRef.current.value === "admin@admin.com") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }

  return (
    <div className="main">
      <MainLogo />
      <div className="login-container">
        <div className="login-card">
          <div className="card-body">
            {error && <div className="alert alert-danger">{error}</div>}
            <span className="form-title">Log in</span>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  ref={emailRef}
                  placeholder="Email"
                  required
                  className="email-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  ref={passwordRef}
                  placeholder="Password"
                  required
                  className="password-input"
                />
              </div>
              <button disabled={loading} className="login-button" type="submit">
                Log in
              </button>
              <br />
              <div className="btn-not-reg">
                <Link className="btn-reg" to="/signup">
                  Not registered yet?
                </Link>
              </div>
            </form>
            <div className="LT-gradient">Or sign in with other accounts</div>
            <div className="icon-container">
              <img
                className="mx-2"
                src={fbIcon}
                alt="Facebook icon"
                width="40"
                height="40"
              />
              <img
                className="mx-2"
                src={googleIcon}
                alt="Google icon"
                width="40"
                height="40"
              />
              <img
                className="mx-2"
                src={twitterIcon}
                alt="Twitter icon"
                width="40"
                height="40"
                border
                radius="50%"
              />
            </div>
            <div className="link forgot">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
