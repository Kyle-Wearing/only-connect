import { useLocation, useParams, useNavigate } from "react-router-dom";
import "../styles/QuizzesHome.css";

export function QuizzesHome() {
  const { quiz_id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { quiz_name } = location.state;

  function handleEdit() {
    navigate(`/quizzes/${quiz_id}/edit`);
  }

  function handlePlay() {
    navigate(`/quizzes/${quiz_id}/play`);
  }

  return (
    <div className="container">
      <div className="card">
        <h2>{quiz_name}</h2>
        <div className="button-group">
          <button className="back-button" onClick={() => navigate(-1)}>
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
