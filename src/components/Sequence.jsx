import { useEffect, useState } from "react";
import "../styles/Sequence.css";

export function Sequence({
  questions,
  setCategory,
  team1name,
  team2name,
  setTeam1Score,
  setTeam2Score,
  turn,
  setTurn,
}) {
  const [counter, setCounter] = useState(0);
  const [clueNum, setClueNum] = useState(1);
  const [revealAns, setRevealAns] = useState(false);
  const [passed, setPassed] = useState(false);
  const [incorrectDisabled, setIncorrectDisabled] = useState(false);
  const [correctDisabled, setCorrectDisabled] = useState(false);

  useEffect(() => {
    if (counter === questions.length) {
      setCategory("");
    }
  }, [counter, questions.length]);

  function handleCorrect() {
    setCorrectDisabled(true);
    setIncorrectDisabled(true);
    if (turn) {
      setTeam1Score((currScore) => {
        let points = 5;
        if (clueNum !== 1) {
          points - clueNum;
        }
        return currScore + points;
      });
    } else {
      setTeam2Score((currScore) => {
        let points = 5;
        if (clueNum !== 1) {
          points - clueNum;
        }
        return currScore + points;
      });
    }
    setClueNum(4);
    setRevealAns(true);
  }

  function handleIncorrect() {
    if (!passed) {
      setPassed(true);
      setTurn(!turn);
    } else {
      setIncorrectDisabled(true);
      setCorrectDisabled(true);
      setClueNum(4);
      setRevealAns(true);
    }
  }

  function handleNextClue() {
    if (clueNum < 4) {
      setClueNum(clueNum + 1);
    }
  }

  function handleNextQuestion() {
    if (!passed) {
      setTurn(!turn);
    }
    setPassed(false);
    setIncorrectDisabled(false);
    setCorrectDisabled(false);
    setClueNum(1);
    setCounter(counter + 1);
    setRevealAns(false);
  }

  return (
    <div className="sequence-container">
      <h1 className="sequence-title">Find The Sequence</h1>
      <h2 className="sequence-turn">
        {turn ? `${team1name}'s turn` : `${team2name}'s turn`}
      </h2>
      <p className="sequence-question-num">Question {counter + 1}</p>
      <div className="sequence-answer-box">
        <p>Answer</p>
        {revealAns && (
          <p className="sequence-text">{questions[counter].answer}</p>
        )}
      </div>
      <div className="sequence-clue-container">
        <div className="sequence-clue-box">
          <p>5 Points</p>
          {questions[counter] ? (
            <p className="sequence-text">{questions[counter].clue_1}</p>
          ) : null}
        </div>
        <div className="sequence-clue-box">
          <p>3 Points</p>
          {clueNum > 1 ? (
            <p className="sequence-text">{questions[counter].clue_2}</p>
          ) : null}
        </div>
        <div className="sequence-clue-box">
          <p>2 Points</p>
          {clueNum > 2 ? (
            <p className="sequence-text">{questions[counter].clue_3}</p>
          ) : null}
        </div>
        <div className="sequence-clue-box">
          <p>1 Point</p>
          {clueNum > 3 ? (
            <p className="sequence-text">{questions[counter].clue_4}</p>
          ) : null}
        </div>
      </div>
      <div className="sequence-button-container">
        <button disabled={clueNum === 4} onClick={handleNextClue}>
          next clue
        </button>
        <button
          disabled={!correctDisabled && !incorrectDisabled}
          onClick={handleNextQuestion}
        >
          next question
        </button>
        <button disabled={correctDisabled} onClick={handleCorrect}>
          correct guess
        </button>
        <button disabled={incorrectDisabled} onClick={handleIncorrect}>
          incorrect guess
        </button>
      </div>
    </div>
  );
}
