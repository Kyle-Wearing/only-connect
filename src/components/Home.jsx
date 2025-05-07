import { useEffect, useState } from "react";
import { getQuizzes } from "../../api";
import { Link, useNavigate } from "react-router-dom";
import { LoadingSpinner } from "./LoadingScreen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "../styles/Home.css";

export function Home() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = sessionStorage.getItem("user_id");
  const navigate = useNavigate();

  async function apiCall() {
    const fetchedQuizes = await getQuizzes();
    setQuizzes(fetchedQuizes);
    setLoading(false);
  }

  useEffect(() => {
    apiCall();
  }, []);

  return (
    <div className="home-container">
      {userId ? (
        <button onClick={() => navigate("/profile")} className="profile-button">
          <FontAwesomeIcon icon={faUser} style={{ marginRight: "8px" }} />
          Profile
        </button>
      ) : (
        <button onClick={() => navigate("/login")} className="profile-button">
          Log In
        </button>
      )}
      <div className="home-card">
        <h1>Quizzes</h1>
        {loading ? (
          <LoadingSpinner />
        ) : quizzes.length > 0 ? (
          <ul className="quiz-list">
            {quizzes.map((quiz) => (
              <li
                key={quiz.quiz_id}
                onClick={() => {
                  navigate("/");
                }}
              >
                {quiz.quiz_name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No quizzes found.</p>
        )}
      </div>
    </div>
  );
}
