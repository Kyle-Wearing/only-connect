import { useEffect, useState } from "react";
import "../styles/Image.css";

export function Images({
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
    <div className="image-container">
      <h1 className="image-title">Image Round</h1>
      <h2 className="image-turn">
        {turn ? `${team1name}'s turn` : `${team2name}'s turn`}
      </h2>
      <div className="image-answer-box">
        <p>Answer</p>
        {revealAns && (
          <p className="image-answer-txt">{questions[counter].answer}</p>
        )}
      </div>
      <div className="image-clue-container">
        <div className="image-clue-box">
          <p>5 Points</p>
          {questions[counter] ? (
            <img className="image-img" src={questions[counter].clue_1}></img>
          ) : null}
        </div>
        <div className="image-clue-box">
          <p>3 Points</p>
          {clueNum > 1 ? (
            <img className="image-img" src={questions[counter].clue_2}></img>
          ) : null}
        </div>
        <div className="image-clue-box">
          <p>2 Points</p>
          {clueNum > 2 ? (
            <img className="image-img" src={questions[counter].clue_3}></img>
          ) : null}
        </div>
        <div className="image-clue-box">
          <p>1 Point</p>
          {clueNum > 3 ? (
            <img className="image-img" src={questions[counter].clue_4}></img>
          ) : null}
        </div>
      </div>
      <div className="image-button-container">
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
