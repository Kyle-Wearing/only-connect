import { useLocation, useNavigate } from "react-router-dom";
import "../styles/EndQuiz.css";

export function EndQuiz() {
  const location = useLocation();
  const { team1Score, team1name, team2Score, team2name } = location.state;
  const navigate = useNavigate();

  return (
    <div className="end-container">
      <div className="end-scoreboard">
        <div className="end-team">
          <h1>{team1name}</h1>
          <p>{team1Score}</p>
        </div>
        <div className="end-team">
          <h1>{team2name}</h1>
          <p>{team2Score}</p>
        </div>
      </div>
      <button
        onClick={() => {
          navigate("/profile");
        }}
        className="end-home"
      >
        Home
      </button>
    </div>
  );
}
