import { useLocation, useParams, useNavigate } from "react-router-dom";
import "../styles/QuizzesHome.css";

export function QuizzesHome() {
  const { quiz_id } = useParams();
  const location = useLocation();
  const { quiz_name } = location.state;
  const navigate = useNavigate();

  function handleEdit() {
    navigate(`/quizzes/${quiz_id}/edit`, { state: { quiz_name: quiz_name } });
  }

  function handlePlay() {
    navigate(`/quizzes/${quiz_id}/play`, { state: { quiz_name: quiz_name } });
  }

  return (
    <div className="container">
      <div className="card">
        <h2>{quiz_name}</h2>
        <div className="button-group">
          <button className="back-button" onClick={() => navigate("/profile")}>
            Back
          </button>
          <button className="play-button" onClick={() => handlePlay()}>
            Play
          </button>
          <button className="edit-button" onClick={() => handleEdit()}>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
