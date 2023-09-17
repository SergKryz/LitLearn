import React, { useState } from "react";
import { auth } from "../firebase";
import "../styles/Login.css";
import MainLogo from "./mainLogo";
import fbIcon from "../assets/icons/fb.png";
import twitterIcon from "../assets/icons/twitter.png";
import googleIcon from "../assets/icons/google.png";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (password === confirmPassword && email && password) {
      try {
        await auth.createUserWithEmailAndPassword(email, password);
        alert("User registered successfully");
        navigate("/login");
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("Please ensure that all fields are filled and passwords match");
    }
  };

  return (
    <div className="main">
      <MainLogo />
      <div className="login-container">
        {" "}
        <div className="login-card">
          <span className="form-title">Register</span>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="email-input"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="password-input"
          />
          <input
            type="password"
            className="password-input"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={handleSignUp} className="login-button">
            Register
          </button>
          <div className="btn-not-reg">
            <Link className="btn-reg" to="/login">
              Back
            </Link>
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
};

export default SignUp;
