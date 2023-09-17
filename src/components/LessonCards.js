import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../styles/LessonCards.css";

const LessonCards = () => {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [flipped, setFlipped] = useState({});

  useEffect(() => {
    const lessonsRef = database.ref("learningLevels/beginner/lessons");
    lessonsRef
      .once("value")
      .then((snapshot) => {
        const data = snapshot.val();
        setLessons(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleFlip = (index) => {
    setFlipped((prevFlipped) => ({
      ...prevFlipped,
      [index]: !prevFlipped[index],
    }));
  };

  const selectLesson = (lessonKey) => {
    setSelectedLesson(lessons[lessonKey]);
  };

  const allCardsFlipped =
    selectedLesson &&
    Object.keys(flipped).length === Object.keys(selectedLesson.words).length &&
    Object.values(flipped).every((val) => val);

  console.log("Flipped cards:", Object.keys(flipped).length);
  console.log(
    "Total cards:",
    selectedLesson
      ? Object.keys(selectedLesson.words).length
      : "No lesson selected"
  );
  console.log("All cards flipped:", allCardsFlipped);

  return (
    <div className="lesson-cards-container">
      {selectedLesson ? (
        <>
          <button
            className="back-button"
            onClick={() => setSelectedLesson(null)}
          >
            &larr;
          </button>
          {Object.keys(selectedLesson.words).map((wordKey, index) => (
            <div
              className="lesson-card"
              key={wordKey}
              onClick={() => handleFlip(index)}
            >
              <div className={`card-inner ${flipped[index] ? "flipped" : ""}`}>
                <div className="card-front">
                  <h1>{selectedLesson.words[wordKey].word}</h1>
                </div>
                <div className="card-back">
                  <p className="translation">
                    {selectedLesson.words[wordKey].translation}
                  </p>
                  <div className="divider"></div>
                  <p className="example">
                    {selectedLesson.words[wordKey].example}
                  </p>
                  <div className="divider"></div>
                  <p className="exTrans">
                    {selectedLesson.words[wordKey].exTrans}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {allCardsFlipped && (
            <button className="quiz-btn" onClick={() => navigate("/quiz")}>
              Go to Quiz
            </button>
          )}
        </>
      ) : lessons ? (
        Object.keys(lessons).map((lessonKey, index) => (
          <div
            className="lesson-card"
            key={lessonKey}
            onClick={() => selectLesson(lessonKey)}
          >
            <div className="card-front">
              <h3>{lessons[lessonKey].lessonName}</h3>
            </div>
          </div>
        ))
      ) : (
        <p className="loading">KRAUNASI</p>
      )}
    </div>
  );
};

export default LessonCards;
