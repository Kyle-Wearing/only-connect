import { useEffect, useState } from "react";

export function Connections({
  questions,
  setCategory,
  team1name,
  team2name,
  setTeam1Score,
  setTeam2Score,
  turn,
  setTurn,
}) {
  //   console.log(questions);

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
      setClueNum(4);
      setRevealAns(true);
    }
  }

  function handleNextClue() {
    console.log(clueNum);
    if (clueNum < 4) {
      setClueNum(clueNum + 1);
    }
  }

  function handleNextQuestion() {
    if (!passed) {
      setTurn(!turn);
    }
    setIncorrectDisabled(false);
    setCorrectDisabled(false);
    setClueNum(1);
    setCounter(counter + 1);
    setRevealAns(false);
  }

  return (
    <div>
      <h1>{turn ? `${team1name}'s turn` : `${team2name}'s turn`}</h1>
      {questions[counter] ? <p>{questions[counter].clue_1}</p> : null}
      {clueNum > 1 ? <p>{questions[counter].clue_2}</p> : null}
      {clueNum > 2 ? <p>{questions[counter].clue_3}</p> : null}
      {clueNum > 3 ? <p>{questions[counter].clue_4}</p> : null}
      {revealAns ? <p>{questions[counter].answer}</p> : null}
      <button onClick={handleNextClue}>next clue</button>
      <button onClick={handleNextQuestion}>next question</button>
      <button disabled={correctDisabled} onClick={handleCorrect}>
        correct guess
      </button>
      <button disabled={incorrectDisabled} onClick={handleIncorrect}>
        incorrect guess
      </button>
    </div>
  );
}
