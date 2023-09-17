import React from "react";
import "../styles/Quiz.css";
import TopNav from "./TopNav";

const Quiz = () => {
  return (
    <div>
      <TopNav />

      <div className="quiz-container">
        <div className="quiz-top-nav">
          <button className="back-button">&larr; Go Back</button>
        </div>
        <div className="quiz-content">
          <h1>Welcome to the Quiz!</h1>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
