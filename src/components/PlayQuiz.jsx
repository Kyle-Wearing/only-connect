import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/PlayQuiz.css";
import { getAllQuestions } from "../../utils";

export function PlayQuiz() {
  const { quiz_id } = useParams();
  const [team1name, setTeam1name] = useState("");
  const [team2name, setTeam2name] = useState("");
  const [started, setStarted] = useState(false);
  const navigate = useNavigate();
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [questions, setQuestions] = useState({});

  async function apiCall() {
    const fetchedQuestions = await getAllQuestions(quiz_id);
    setQuestions(fetchedQuestions);
  }

  useEffect(() => {
    apiCall();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (team1name && team2name) {
      setStarted(true);
    }
  }

  if (!started) {
    return (
      <div className="container">
        <form className="card team-form" onSubmit={handleSubmit}>
          <label>
            Team 1 Name:
            <input
              onChange={(e) => setTeam1name(e.target.value)}
              value={team1name}
              className="input-field"
            />
          </label>
          <label>
            Team 2 Name:
            <input
              onChange={(e) => setTeam2name(e.target.value)}
              value={team2name}
              className="input-field"
            />
          </label>
          <div className="button-group">
            <button type="submit" className="play-button">
              Start Game
            </button>
            <button
              onClick={() => {
                navigate(-1);
              }}
              type="button"
              className="back-button"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    );
  }
}
