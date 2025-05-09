import { useNavigate } from "react-router-dom";
import { getQuizzesByUserId } from "../../api";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import "../styles/Profile.css";

export function Profile() {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("user_id");
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  async function apiCall() {
    const fetchedQuizzes = await getQuizzesByUserId(userId);
    setQuizzes(fetchedQuizzes);
    setLoading(false);
  }

  useEffect(() => {
    apiCall();
  }, []);

  return (
    <div className="profile-container">
      <div className="button-bar">
        <button
          className="back-button"
          onClick={() => {
            navigate("/home");
          }}
        >
          Home
        </button>
        <button
          className="logout-button"
          onClick={() => {
            sessionStorage.removeItem("user_id");
            navigate("/home");
          }}
        >
          Log out
        </button>
      </div>

      <div className="create-quiz-container">
        <button
          className="create-quiz-button"
          onClick={() => {
            navigate("/quizzes/create");
          }}
        >
          Create A New Quiz
        </button>
      </div>

      <div className="profile-card">
        <h1>Your Quizzes</h1>
        {loading ? (
          <LoadingSpinner />
        ) : quizzes.length > 0 ? (
          <ul className="quiz-list">
            {quizzes.map((quiz) => (
              <li
                key={quiz.quiz_id}
                onClick={() => {
                  navigate(`/quizzes/${quiz.quiz_id}/home`, {
                    state: { quiz_name: quiz.quiz_name },
                  });
                }}
              >
                {quiz.quiz_name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No quizzes found</p>
        )}
      </div>
    </div>
  );
}
