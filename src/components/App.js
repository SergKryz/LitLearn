import React from "react";
import Signup from "./Signup";
import { Container } from "react-bootstrap";
import Dash from "./Dash";
import Login from "./Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateOutlet from "./PrivateRoute";

function App() {
  return (
    <Container>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateOutlet />}>
            <Route path="/" element={<Dash />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
