import { useEffect, useState } from "react";
import "../styles/Vowels.css";

export function MissingVowels({
  questions,
  setCategory,
  team1name,
  team2name,
  setTeam1Score,
  setTeam2Score,
}) {
  const [counter, setCounter] = useState(0);
  const [revealAns, setRevealAns] = useState(false);
  const [correct, setCorrect] = useState(false);

  useEffect(() => {
    if (counter === questions.length) {
      setCategory("");
    }
  }, [counter, questions.length]);

  function handleScore(team) {
    setCorrect(true);
    setRevealAns(true);
    if (team === 1) {
      setTeam1Score((currScore) => {
        return currScore + 1;
      });
    } else if (team === 2) {
      setTeam2Score((currScore) => {
        return currScore + 1;
      });
    }
  }

  function handleNextQuestion() {
    setRevealAns(false);
    setCorrect(false);
    setCounter(counter + 1);
  }

  function handleGiveUp() {
    setCorrect(true);
    setRevealAns(true);
  }

  if (counter === questions.length) {
    return <></>;
  }

  return (
    <div className="vowels-container">
      <h1 className="vowels-title">Missing Vowels</h1>
      <div className="vowels-clue-box">
        <p className="vowels-clue-text">{questions[counter].clue}</p>
      </div>
      <div className="vowels-answer-box">
        {revealAns ? (
          <p className="vowels-ans-text">{questions[counter].answer}</p>
        ) : (
          <p className="vowels-ans-text">
            {questions[counter].answer
              ? questions[counter].answer.replace(/[aeiou]/gi, "")
              : ""}
          </p>
        )}
      </div>
      <div className="vowels-score-buttons-container">
        <button
          disabled={correct}
          onClick={() => {
            handleScore(1);
          }}
        >
          {team1name}
        </button>
        <button
          disabled={correct}
          onClick={() => {
            handleScore(2);
          }}
        >
          {team2name}
        </button>
      </div>
      <div className="vowels-button-container">
        <button disabled={correct} onClick={handleGiveUp}>
          Give Up
        </button>
        <button disabled={!correct} onClick={handleNextQuestion}>
          Next Question
        </button>
      </div>
    </div>
  );
}
