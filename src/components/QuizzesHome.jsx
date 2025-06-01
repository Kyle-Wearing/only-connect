import { useLocation, useParams, useNavigate } from "react-router-dom";
import "../styles/QuizzesHome.css";
import { useEffect } from "react";

export function QuizzesHome() {
  const { quiz_id } = useParams();
  const location = useLocation();
  const { quiz_name, quiz_maker } = location.state;
  const user_id = sessionStorage.getItem("user_id");
  const navigate = useNavigate();

  useEffect(() => {
    if (!quiz_name || !quiz_maker) {
      navigate("/");
    }
  }, []);

  function handleEdit() {
    navigate(`/quizzes/${quiz_id}/edit`, {
      state: { quiz_name: quiz_name, quiz_maker: quiz_maker },
    });
  }

  function handlePlay() {
    navigate(`/quizzes/${quiz_id}/play`, {
      state: { quiz_name: quiz_name, quiz_maker: quiz_maker },
    });
  }

  return (
    <div className="container">
      <div className="card">
        <button
          className="quiz-host-button"
          onClick={() => {
            navigate(`/quizzes/${quiz_id}/host`, {
              state: { quiz_name: quiz_name },
            });
          }}
        >
          Host
        </button>
        <h2>{quiz_name}</h2>
        <div className="button-group">
          <button
            className="back-button"
            onClick={() => navigate(user_id ? "/profile" : "/home")}
          >
            Back
          </button>
          <button className="play-button" onClick={() => handlePlay()}>
            Play
          </button>
          {user_id === quiz_maker.toString() && (
            <button className="edit-button" onClick={() => handleEdit()}>
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
