import { useEffect, useState } from "react";
import { Questions } from "./Questions";
import { getQuiz } from "../../utils";
import { useLocation } from "react-router-dom";
import { ImageQuestions } from "./ImageQuestions";
import { MusicQuestions } from "./MusicQuestions";

export function PlayQuiz() {
  const { state } = useLocation();
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [questionNum, setQuestionNum] = useState(0);
  const [teamNames, setTeamNames] = useState(false);

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
  if (questionNum < 10) {
    return (
      <Questions
        questions={questions}
        questionNum={questionNum}
        setQuestionNum={setQuestionNum}
      />
    );
  }
  if (questionNum > 9 && questionNum < 15) {
    return (
      <ImageQuestions
        questions={questions}
        questionNum={questionNum}
        setQuestionNum={setQuestionNum}
      />
    );
  }
  if (questionNum > 14 && questionNum < 19) {
    return (
      <MusicQuestions
        questions={questions}
        questionNum={questionNum}
        setQuestionNum={setQuestionNum}
      />
    );
  }
}
