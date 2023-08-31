import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import image from "../assets/icons/FBicon.png";

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
      navigate("/");
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <h2 className="text-center mb-4">Log in</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>

            <Button
              disabled={loading}
              className="w-50 mt-3 mx-auto d-block "
              type="submit"
            >
              Log in
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            Or sign in with other accounts
          </div>
          <div className="w-100 text-center mt-3">
            <img
              className="mx-2"
              src={image}
              alt="Facebook icon"
              width="30"
              height="30"
            ></img>
            <img
              className="mx-2"
              src={image}
              alt="Facebook icon"
              width="30"
              height="30"
            ></img>

            <img
              className="mx-2"
              src={image}
              alt="Facebook icon"
              width="30"
              height="30"
            ></img>
          </div>

          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Not registered yet ? <Link to="/signup">Sign up</Link>
      </div>
    </>
  );
}
