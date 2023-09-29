import React from "react";
import Signup from "./Signup";
import { Container } from "react-bootstrap";

import Login from "./Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateOutlet from "./PrivateRoute";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import AdminPanel from "./AdminPanel";
import Quiz from "./Quiz";

function App() {
  const { currentUser } = useAuth();
  return (
    <Container>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateOutlet />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route
            path="/admin"
            element={currentUser ? <AdminPanel /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
