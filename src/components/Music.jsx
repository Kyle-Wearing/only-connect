import { useEffect, useState } from "react";
import "../styles/Music.css";

export function Music({
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
  const [playMusic, setPlayMusic] = useState(0);

  console.log(questions);

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

  function handlePlayClue(clueNum) {
    setPlayMusic(clueNum);
    const duration = questions[counter][`clue_${clueNum}_duration`] * 1000;
    setTimeout(() => {
      setPlayMusic(0);
    }, duration);
  }

  return (
    <div className="music-container">
      <h1 className="music-title">Music Round</h1>
      <h2 className="music-turn">
        {turn ? `${team1name}'s turn` : `${team2name}'s turn`}
      </h2>
      <p className="music-question-num">Question {counter + 1}</p>
      <div className="music-answer-box">
        <p>Answer</p>
        {revealAns && (
          <p className="music-answer-txt">{questions[counter].answer}</p>
        )}
      </div>
      <div className="music-clue-container">
        <div className="music-clue-box">
          <p>5 Points</p>
          {questions[counter] && (
            <button
              disabled={playMusic}
              onClick={() => {
                handlePlayClue(1);
              }}
            >
              Play Clue 1
            </button>
          )}
          {playMusic === 1 ? (
            <iframe
              height="0"
              width="0"
              src={questions[counter].clue_1_url}
              title="YouTube video"
              allow="autoplay"
              style={{ border: "none" }}
            ></iframe>
          ) : null}
        </div>
        <div className="music-clue-box">
          <p>3 Points</p>
          {clueNum > 1 && (
            <button
              disabled={playMusic}
              onClick={() => {
                handlePlayClue(2);
              }}
            >
              Play Clue 2
            </button>
          )}
          {playMusic === 2 ? (
            <iframe
              height="0"
              width="0"
              src={questions[counter].clue_2_url}
              title="YouTube video"
              allow="autoplay"
              style={{ border: "none" }}
            ></iframe>
          ) : null}
        </div>
        <div className="music-clue-box">
          <p>2 Points</p>
          {clueNum > 2 && (
            <button
              disabled={playMusic}
              onClick={() => {
                handlePlayClue(3);
              }}
            >
              Play Clue 3
            </button>
          )}
          {playMusic === 3 ? (
            <iframe
              height="0"
              width="0"
              src={questions[counter].clue_3_url}
              title="YouTube video"
              allow="autoplay"
              style={{ border: "none" }}
            ></iframe>
          ) : null}
        </div>
        <div className="music-clue-box">
          <p>1 Point</p>
          {clueNum > 3 && (
            <button
              disabled={playMusic}
              onClick={() => {
                handlePlayClue(4);
              }}
            >
              Play Clue 4
            </button>
          )}
          {playMusic === 4 ? (
            <iframe
              height="0"
              width="0"
              src={questions[counter].clue_4_url}
              title="YouTube video"
              allow="autoplay"
              style={{ border: "none" }}
            ></iframe>
          ) : null}
        </div>
      </div>
      <div className="music-button-container">
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
