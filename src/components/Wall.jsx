import { useEffect, useState } from "react";
import "../styles/Wall.css";

export function Wall({
  questions,
  setCategory,
  team1name,
  team2name,
  setTeam1Score,
  setTeam2Score,
  turn,
  setTurn,
}) {
  const [started, setStarted] = useState(false);
  const [wall, setWall] = useState([]);
  const [counter, setCounter] = useState(0);
  const [ans1, setAns1] = useState("");
  const [ans2, setAns2] = useState("");
  const [ans3, setAns3] = useState("");
  const [ans4, setAns4] = useState("");
  const [guess, setGuess] = useState([]);
  const [showAns1, setShowAns1] = useState(false);
  const [showAns2, setShowAns2] = useState(false);
  const [showAns3, setShowAns3] = useState(false);
  const [showAns4, setShowAns4] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timeOut, setTimeOut] = useState(false);
  const [wallBeat, setWallBeat] = useState(false);
  const [score, setScore] = useState(0);

  function getWords() {
    return Array.from(
      { length: 16 },
      (_, i) => questions[counter][`word_${i + 1}`]
    );
  }

  function generateAnswers(words) {
    setAns1(words.slice(0, 4).sort().join("/"));
    setAns2(words.slice(4, 8).sort().join("/"));
    setAns3(words.slice(8, 12).sort().join("/"));
    setAns4(words.slice(12, 16).sort().join("/"));
  }

  function shuffleArray(array) {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  useEffect(() => {
    if (counter === 2) {
      setCategory("");
    } else {
      const wordArr = getWords();
      const randomWords = shuffleArray(shuffleArray(shuffleArray(wordArr)));
      setWall(randomWords);
      generateAnswers(wordArr);
    }
  }, [counter]);

  function checkAnswer() {
    const guessStr = guess.slice().sort().join("/");
    let wordsToRemove = [];

    if (guessStr === ans1) {
      wordsToRemove = ans1.split("/");
      setShowAns1(true);
    } else if (guessStr === ans2) {
      wordsToRemove = ans2.split("/");
      setShowAns2(true);
    } else if (guessStr === ans3) {
      wordsToRemove = ans3.split("/");
      setShowAns3(true);
    } else if (guessStr === ans4) {
      wordsToRemove = ans4.split("/");
      setShowAns4(true);
    }

    if (wordsToRemove.length) {
      setWall((currWall) => {
        const newWall = [...currWall];
        return newWall.filter((el) => !wordsToRemove.includes(el));
      });
    }
  }

  useEffect(() => {
    if (guess.length === 4) {
      checkAnswer();
      setTimeout(() => {
        setGuess([]);
      }, 150);
    }
  }, [guess]);

  function handleClick(word) {
    if (guess.length < 4 && !guess.includes(word)) {
      setGuess((currGuess) => {
        const newGuess = [...currGuess];
        newGuess.push(word);
        return newGuess;
      });
    } else if (guess.length !== 4) {
      setGuess((currGuess) => {
        const newGuess = [...currGuess];
        return newGuess.filter((el) => {
          return el !== word;
        });
      });
    }
  }

  useEffect(() => {
    if (timer > 0 && wall.length) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0 && started && wallBeat === false) {
      setTimeOut(true);
      setShowAns1(true);
      setShowAns2(true);
      setShowAns3(true);
      setShowAns4(true);
      setScore(4 - wall.length / 4);
      setWall([]);
    } else if (!wall.length && started) {
      setTimeOut(true);
      setShowAns1(true);
      setShowAns2(true);
      setShowAns3(true);
      setShowAns4(true);
      setScore(5);
      setWallBeat(true);
      setTimer(0);
    }
  }, [timer]);

  function handleScore() {
    if (turn) {
      setTeam1Score((currScore) => {
        return currScore + score;
      });
    } else {
      setTeam2Score((currScore) => {
        return currScore + score;
      });
    }
    setTurn(!turn);
    setWallBeat(false);
    setStarted(false);
    setTimeOut(false);
    setShowAns1(false);
    setShowAns2(false);
    setShowAns3(false);
    setShowAns4(false);
    setCounter(counter + 1);
  }

  if (!started) {
    return (
      <div className="wall-page">
        <h2 className="wall-turn">
          {turn ? `${team1name}'s Wall` : `${team2name}'s Wall`}
        </h2>
        <p className="wall-txt">Choose a player to play the wall</p>
        <button
          className="wall-score-button"
          onClick={() => {
            setTimer(45);
            setStarted(true);
          }}
        >
          Start
        </button>
      </div>
    );
  }

  return (
    <div className="wall-page">
      <h1 className="wall-timer">{timer}</h1>
      <div className="wall">
        {wall.map((word, index) => {
          return (
            <button
              disabled={timeOut}
              className={guess.includes(word) ? "guessed-word" : "word"}
              key={index}
              onClick={() => handleClick(word)}
            >
              {word}
            </button>
          );
        })}
      </div>
      {timeOut && (
        <>
          <p className="wall-txt">
            {wallBeat ? "Well done" : "You ran out of time"}
          </p>
          <button className="wall-score-button" onClick={handleScore}>
            button
          </button>
        </>
      )}
      <div className="wall-answer-container">
        {showAns1 && (
          <div className="wall-answers">
            <h3 className="wall-answers-title">
              {questions[counter].answer_1}
            </h3>
            <p>{questions[counter].word_1}</p>
            <p>{questions[counter].word_2}</p>
            <p>{questions[counter].word_3}</p>
            <p>{questions[counter].word_4}</p>
          </div>
        )}
        {showAns2 && (
          <div className="wall-answers">
            <h3 className="wall-answers-title">
              {questions[counter].answer_2}
            </h3>
            <p>{questions[counter].word_5}</p>
            <p>{questions[counter].word_6}</p>
            <p>{questions[counter].word_7}</p>
            <p>{questions[counter].word_8}</p>
          </div>
        )}
        {showAns3 && (
          <div className="wall-answers">
            <h3 className="wall-answers-title">
              {questions[counter].answer_3}
            </h3>
            <p>{questions[counter].word_9}</p>
            <p>{questions[counter].word_10}</p>
            <p>{questions[counter].word_11}</p>
            <p>{questions[counter].word_12}</p>
          </div>
        )}
        {showAns4 && (
          <div className="wall-answers">
            <h3 className="wall-answers-title">
              {questions[counter].answer_4}
            </h3>
            <p>{questions[counter].word_13}</p>
            <p>{questions[counter].word_14}</p>
            <p>{questions[counter].word_15}</p>
            <p>{questions[counter].word_16}</p>
          </div>
        )}
      </div>
    </div>
  );
}
