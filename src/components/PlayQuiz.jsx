import { useEffect, useState } from "react";
import { Questions } from "./Questions";
import { getQuiz } from "../../utils";
import { useLocation } from "react-router-dom";
import { ImageQuestions } from "./ImageQuestions";
import { MusicQuestions } from "./MusicQuestions";
import { Glyphs } from "./Glyphs";

export function PlayQuiz() {
  const { state } = useLocation();
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [turn, setTurn] = useState("");
  const [questionNum, setQuestionNum] = useState(null);
  const [teamNames, setTeamNames] = useState(false);
  const [choices, setChoises] = useState([0, 4, 10, 16]);

  const username = localStorage.getItem("user");
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    getQuiz(state.id, username).then((res) => {
      setQuestions(Object.values(res)[0]);
    });
  }, []);

  if (!teamNames) {
    return (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (team1 && team2) {
              setTeamNames(true);
              setTurn(team1);
            }
          }}
        >
          <label htmlFor="team1">Enter team 1 name: </label>
          <input
            name="team1"
            id="team1"
            type="text"
            value={team1}
            onChange={(e) => {
              setTeam1(e.target.value);
            }}
          ></input>
          <br />
          <label htmlFor="team2">Enter team 2 name: </label>
          <input
            name="team2"
            id="team2"
            type="text"
            value={team2}
            onChange={(e) => {
              setTeam2(e.target.value);
            }}
          ></input>
          <button type="submit">confirm team names</button>
        </form>
      </div>
    );
  }
  if (questionNum === null) {
    return (
      <Glyphs
        setQuestionNum={setQuestionNum}
        choices={choices}
        setChoises={setChoises}
        turn={turn}
      />
    );
  }
  if (questionNum < 10) {
    return (
      <Questions
        turn={turn}
        setTurn={setTurn}
        questions={questions}
        questionNum={questionNum}
        setQuestionNum={setQuestionNum}
        team1={team1}
        team2={team2}
      />
    );
  }
  if (questionNum > 9 && questionNum < 16) {
    return (
      <ImageQuestions
        turn={turn}
        setTurn={setTurn}
        questions={questions}
        questionNum={questionNum}
        setQuestionNum={setQuestionNum}
        team1={team1}
        team2={team2}
      />
    );
  }
  if (questionNum > 15 && questionNum < 20) {
    return (
      <MusicQuestions
        turn={turn}
        setTurn={setTurn}
        questions={questions}
        questionNum={questionNum}
        setQuestionNum={setQuestionNum}
        team1={team1}
        team2={team2}
      />
    );
  }
}
