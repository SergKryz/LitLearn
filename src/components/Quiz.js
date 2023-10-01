import React from "react";
import "../styles/Quiz.css";
import TopNav from "./TopNav";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };
  return (
    <div>
      <TopNav />

      <div className="quiz-container">
        <div className="quiz-top-nav">
          <button className="back-button" onClick={handleBack}>
            &larr;
          </button>
        </div>
        <div className="quiz-content">
          <h1>Welcome to the Quiz!</h1>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
