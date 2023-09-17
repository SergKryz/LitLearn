import React from "react";
import Signup from "./Signup";
import { Container } from "react-bootstrap";
import Dashboard from "./Dashboard";
import Login from "./Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateOutlet from "./PrivateRoute";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import AdminPanel from "./AdminPanel";

function App() {
  const { currentUser } = useAuth();
  return (
    <Container>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateOutlet />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
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
