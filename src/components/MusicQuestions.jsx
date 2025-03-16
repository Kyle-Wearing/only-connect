import { useState } from "react";

export function MusicQuestions({
  questions,
  questionNum,
  setQuestionNum,
  turn,
  setTurn,
  team1,
  team2,
  setTeam1Score,
  setTeam2Score,
  setCurrentPlayer,
  currentPlayer,
}) {
  const [playVid1, setPlayVid1] = useState(false);
  const [playVid2, setPlayVid2] = useState(false);
  const [playVid3, setPlayVid3] = useState(false);
  const [playVid4, setPlayVid4] = useState(false);
  const [clueNum, setClueNum] = useState(0);
  const [hideAns, setHideAns] = useState(true);
  const [wrong, setWrong] = useState(false);
  const [right, setRight] = useState(false);

  function play1(time) {
    setPlayVid1(true);
    setTimeout(() => {
      setPlayVid1(false);
    }, time * 1000);
  }
  function play2(time) {
    setPlayVid2(true);
    setTimeout(() => {
      setPlayVid2(false);
    }, time * 1000);
  }
  function play3(time) {
    setPlayVid3(true);
    setTimeout(() => {
      setPlayVid3(false);
    }, time * 1000);
  }
  function play4(time) {
    setPlayVid4(true);
    setTimeout(() => {
      setPlayVid4(false);
    }, time * 1000);
  }

  return (
    <div>
      <h1>Music Questions</h1>
      <h2>{turn}</h2>
      {playVid1 ? (
        <iframe
          width="0"
          height="0"
          src={`https://www.youtube.com/embed/${
            questions[questionNum][`question${questionNum + 1}`].clue1Url.split(
              "/"
            )[3]
          }&rel=0&amp;controls=0&amp;showinfo=0&amp;start=${
            questions[questionNum][`question${questionNum + 1}`].clue1Start
          }&amp;autoplay=1`}
          frameborder="0"
          allow="autoplay; encrypted-media"
        ></iframe>
      ) : null}
      <button
        disabled={clueNum < 1}
        onClick={() => {
          play1(
            Number(
              questions[questionNum][`question${questionNum + 1}`].clue1Duration
            )
          );
        }}
      >
        Play
      </button>
      {playVid2 ? (
        <iframe
          width="0"
          height="0"
          src={`https://www.youtube.com/embed/${
            questions[questionNum][`question${questionNum + 1}`].clue2Url.split(
              "/"
            )[3]
          }&rel=0&amp;controls=0&amp;showinfo=0&amp;start=${
            questions[questionNum][`question${questionNum + 1}`].clue2Start
          }&amp;autoplay=1`}
          frameborder="0"
          allow="autoplay; encrypted-media"
        ></iframe>
      ) : null}
      <button
        disabled={clueNum < 2}
        onClick={() => {
          play2(
            Number(
              questions[questionNum][`question${questionNum + 1}`].clue2Duration
            )
          );
        }}
      >
        Play
      </button>
      {playVid3 ? (
        <iframe
          width="0"
          height="0"
          src={`https://www.youtube.com/embed/${
            questions[questionNum][`question${questionNum + 1}`].clue3Url.split(
              "/"
            )[3]
          }&rel=0&amp;controls=0&amp;showinfo=0&amp;start=${
            questions[questionNum][`question${questionNum + 1}`].clue3Start
          }&amp;autoplay=1`}
          frameborder="0"
          allow="autoplay; encrypted-media"
        ></iframe>
      ) : null}
      <button
        disabled={clueNum < 3}
        onClick={() => {
          play3(
            Number(
              questions[questionNum][`question${questionNum + 1}`].clue3Duration
            )
          );
        }}
      >
        Play
      </button>
      {playVid4 ? (
        <iframe
          width="0"
          height="0"
          src={`https://www.youtube.com/embed/${
            questions[questionNum][`question${questionNum + 1}`].clue4Url.split(
              "/"
            )[3]
          }&rel=0&amp;controls=0&amp;showinfo=0&amp;start=${
            questions[questionNum][`question${questionNum + 1}`].clue4Start
          }&amp;autoplay=1`}
          frameborder="0"
          allow="autoplay; encrypted-media"
        ></iframe>
      ) : null}
      <button
        disabled={clueNum < 4}
        onClick={() => {
          play4(
            Number(
              questions[questionNum][`question${questionNum + 1}`].clue4Duration
            )
          );
        }}
      >
        Play
      </button>
      <div>
        {!hideAns ? (
          <p>
            Answer:
            {questions[questionNum][`question${questionNum + 1}`].answer}
          </p>
        ) : null}
        <button
          disabled={clueNum > 3}
          onClick={() => {
            setClueNum((currNum) => {
              return currNum + 1;
            });
          }}
        >
          next clue
        </button>
        <button
          disabled={hideAns}
          onClick={() => {
            setWrong(false);
            setRight(false);
            setClueNum(0);
            setHideAns(true);
            setQuestionNum((currNum) => {
              if (currNum === 19) {
                if (currentPlayer === team1) {
                  setCurrentPlayer(team2);
                  setTurn(team2);
                } else {
                  setCurrentPlayer(team1);
                  setTurn(team1);
                }
                return null;
              }
              return currNum + 1;
            });
            setWrong(false);
            if (!wrong) {
              setTurn((currTurn) => {
                if (questionNum === 19) {
                  return currTurn;
                }
                if (currTurn === team1) {
                  return team2;
                } else {
                  return team1;
                }
              });
            }
          }}
        >
          Next Question
        </button>
        <button
          disabled={right || clueNum === 0}
          onClick={() => {
            if (!wrong) {
              setTurn((currTurn) => {
                if (currTurn === team1) {
                  return team2;
                } else {
                  return team1;
                }
              });
              setWrong(true);
            } else if (wrong) {
              setClueNum(4);
              setHideAns(false);
              setRight(true);
            }
          }}
        >
          Incorrect Guess
        </button>
        <button
          disabled={right || clueNum === 0}
          onClick={() => {
            setRight(true);
            setHideAns(false);
            setClueNum(4);
            if (turn === team1) {
              setTeam1Score((currScore) => {
                return currScore + (5 - clueNum);
              });
            } else {
              setTeam2Score((currScore) => {
                return currScore + (5 - clueNum);
              });
            }
          }}
        >
          Correct Guess
        </button>
      </div>
    </div>
  );
}
