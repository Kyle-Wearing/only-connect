import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CreateQuiz.css";
import { createQuiz } from "../../api";

export function CreateQuiz() {
  const [quizName, setQuizName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const user_id = sessionStorage.getItem("user_id");

  const handleConfirm = async () => {
    if (!quizName.trim()) {
      setError("Quiz name cannot be empty.");
      return;
    }
    setError("");
    const quiz_id = await createQuiz(user_id, quizName);
    if (quiz_id) {
      navigate(`/quizzes/${quiz_id}/edit`, { state: { quiz_name: quizName } });
    } else {
      setError("Something went wrong");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="title">Create New Quiz</h2>

        {error && <p className="error">{error}</p>}

        <input
          className="quiz-input"
          type="text"
          placeholder="Enter quiz name"
          value={quizName}
          onChange={(e) => setQuizName(e.target.value)}
        />

        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <button className="create-quiz-button" onClick={handleConfirm}>
            Confirm
          </button>
          <button
            className="create-quiz-button"
            onClick={() => navigate(-1)}
            style={{ backgroundColor: "#ccc", color: "#333" }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
