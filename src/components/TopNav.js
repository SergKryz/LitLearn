import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import userIcon from "../assets/background/user-128.png";
import "../styles/TopNav.css";
import { Modal, Button } from "react-bootstrap";

const TopNav = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    const closeDropdown = (e) => {
      if (!e.target.closest(".user-info")) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
      unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setModalMessage("Logged out successfully");
      setShowModal(true);
    } catch (error) {
      setModalMessage(`Error logging out: ${error.message}`);
      setShowModal(true);
    }
  };
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="topnav">
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/quiz">Quiz</Link>
        <Link to="/leaderboard">Leaderboard</Link>
      </div>
      <div className="user-info" onClick={() => setShowDropdown(!showDropdown)}>
        <span>{user?.email}</span>
        <img src={user?.photoURL || userIcon} alt="user" />
        {showDropdown && (
          <div className="user-dropdown">
            <div className="drop-item">Settings</div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TopNav;
