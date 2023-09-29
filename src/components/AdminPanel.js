import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import "../styles/AdminPanel.css";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";

export default function AdminPanel() {
  const [lessons, setLessons] = useState({});
  const [newLesson, setNewLesson] = useState("");
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [newWord, setNewWord] = useState("");
  const [newTranslation, setNewTranslation] = useState("");
  const [newExample, setNewExample] = useState("");
  const [newExTrans, setNewExTrans] = useState("");
  const [selectedWord, setSelectedWord] = useState(null);

  useEffect(() => {
    const lessonsRef = database.ref("learningLevels/beginner/lessons");
    lessonsRef.on("value", (snapshot) => {
      const data = snapshot.val();
      console.log("Data from Firebase:", data);
      setLessons(data || {});
    });
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      <Navigate to="/login" />;
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Function to find the next available index for a new lesson
  const findNextAvailableIndex = () => {
    const existingKeys = Object.keys(lessons);
    let maxIndex = 0;
    for (let key of existingKeys) {
      const match = key.match(/^lesson(\d+)$/);
      if (match) {
        const index = parseInt(match[1], 10);
        if (index > maxIndex) {
          maxIndex = index;
        }
      }
    }
    return maxIndex + 1;
  };

  const addNewLesson = () => {
    if (newLesson) {
      const nextIndex = findNextAvailableIndex();
      const newLessonKey = `lesson${nextIndex}`;
      database.ref(`learningLevels/beginner/lessons/${newLessonKey}`).set({
        lessonName: newLesson,
        words: {
          word1: {
            word: "Add words here",
            translation: "Add translations here",
            example: "Add examples here",
            exTrans: "Add example translations here",
          },
        },
      });
      setNewLesson("");
    }
  };

  const deleteLesson = (lessonKey) => {
    database.ref(`learningLevels/beginner/lessons/${lessonKey}`).remove();
    if (lessonKey === selectedLesson) {
      setSelectedLesson(null);
    }
  };

  const findNextWordIndex = (lessonKey) => {
    const existingWords = lessons[lessonKey]?.words || {};
    const existingKeys = Object.keys(existingWords);
    let maxIndex = 0;
    for (let key of existingKeys) {
      const match = key.match(/^word(\d+)$/);
      if (match) {
        const index = parseInt(match[1], 10);
        if (index > maxIndex) {
          maxIndex = index;
        }
      }
    }
    return maxIndex + 1;
  };
  const addWordToLesson = (lessonKey) => {
    const nextIndex = findNextWordIndex(lessonKey);
    const newWordKey = `word${nextIndex}`;
    const wordRef = database.ref(
      `learningLevels/beginner/lessons/${lessonKey}/words/${newWordKey}`
    );
    wordRef
      .set({
        word: newWord,
        translation: newTranslation,
        example: newExample,
        exTrans: newExTrans,
      })
      .then(() => {
        // Reset the input fields
        setNewWord("");
        setNewTranslation("");
        setNewExample("");
        setNewExTrans("");
      })
      .catch((error) => {
        console.error("Error adding word:", error);
      });
  };

  const deleteWordFromLesson = (lessonKey, wordKey) => {
    database
      .ref(`learningLevels/beginner/lessons/${lessonKey}/words/${wordKey}`)
      .remove();
  };

  const editWordInLesson = (
    lessonKey,
    wordKey,
    newWord,
    newTranslation,
    newExample,
    newExTrans
  ) => {
    database
      .ref(`learningLevels/beginner/lessons/${lessonKey}/words/${wordKey}`)
      .set({
        word: newWord,
        translation: newTranslation,
        example: newExample,
        exTrans: newExTrans,
      });
  };

  return (
    <div>
      <div className="admin-container">
        <div className="admin-title-container">
          <h1>Admin Page</h1>
          <button className=" logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div className="admin-card">
          <input
            className="admin-input"
            type="text"
            placeholder="New Lesson Name"
            value={newLesson}
            onChange={(e) => setNewLesson(e.target.value)}
          />
          <button className="admin-button" onClick={addNewLesson}>
            Add New Lesson
          </button>
        </div>

        <h2>Existing Lessons</h2>
        <div className="lesson-cards-container">
          {lessons &&
            Object.keys(lessons).map((lessonKey) => (
              <div className="lesson-card" key={lessonKey}>
                <div className="card-inner">
                  <div className="card-front">
                    <span>{lessons[lessonKey].lessonName}</span>
                  </div>
                  <div className="card-back">
                    <button
                      className="admin-button"
                      onClick={() => deleteLesson(lessonKey)}
                    >
                      Delete
                    </button>
                    <button
                      className="admin-button"
                      onClick={() => setSelectedLesson(lessonKey)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {selectedLesson && (
          <div className="edit-lesson-section">
            <h2>Edit Lesson: {lessons[selectedLesson].lessonName}</h2>
            <input
              type="text"
              placeholder="New Word"
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
            />
            <input
              type="text"
              placeholder="Translation"
              value={newTranslation}
              onChange={(e) => setNewTranslation(e.target.value)}
            />
            <input
              type="text"
              placeholder="Example"
              value={newExample}
              onChange={(e) => setNewExample(e.target.value)}
            />
            <input
              type="text"
              placeholder="Example Translation"
              value={newExTrans}
              onChange={(e) => setNewExTrans(e.target.value)}
            />

            <button onClick={() => addWordToLesson(selectedLesson)}>
              Add New Word
            </button>

            <div className="word-list-section">
              <h2>Words in this Lesson</h2>
              <ul>
                {lessons[selectedLesson].words &&
                  Object.keys(lessons[selectedLesson].words).map((wordKey) => (
                    <li className="word-list-item" key={wordKey}>
                      {lessons[selectedLesson].words[wordKey].word} -{" "}
                      {lessons[selectedLesson].words[wordKey].translation} -{" "}
                      {lessons[selectedLesson].words[wordKey].example} -{" "}
                      {lessons[selectedLesson].words[wordKey].exTrans}
                      <div className="buton-container">
                        <button
                          onClick={() => setSelectedWord(wordKey)}
                          className="edit-btn"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            deleteWordFromLesson(selectedLesson, wordKey)
                          }
                        >
                          Delete
                        </button>
                      </div>
                      {selectedWord === wordKey && (
                        <div>
                          <input
                            type="text"
                            placeholder="Edit word"
                            defaultValue={
                              lessons[selectedLesson].words[wordKey].word
                            }
                            onChange={(e) => setNewWord(e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="Edit translation"
                            defaultValue={
                              lessons[selectedLesson].words[wordKey].translation
                            }
                            onChange={(e) => setNewTranslation(e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="Edit example"
                            defaultValue={
                              lessons[selectedLesson].words[wordKey].example
                            }
                            onChange={(e) => setNewExample(e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="Edit example translation"
                            defaultValue={
                              lessons[selectedLesson].words[wordKey].exTrans
                            }
                            onChange={(e) => setNewExTrans(e.target.value)}
                          />
                          <button
                            onClick={() =>
                              editWordInLesson(
                                selectedLesson,
                                wordKey,
                                newWord,
                                newTranslation,
                                newExample,
                                newExTrans
                              )
                            }
                          >
                            Save
                          </button>
                        </div>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
