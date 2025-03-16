import { useState } from "react";

export function Questions({
  questions,
  questionNum,
  setQuestionNum,
  turn,
  setTurn,
  team1,
  team2,
}) {
  const [clueNum, setClueNum] = useState(0);
  const [hideAns, setHideAns] = useState(true);
  const [wrong, setWrong] = useState(false);

  return (
    <div>
      {questionNum < 4 ? <h1>Connections</h1> : <h1>Sequence</h1>}
      <h2>{turn}</h2>
      {clueNum > 0 ? (
        <p>
          Clue 1: {questions[questionNum][`question${questionNum + 1}`].clue1}
        </p>
      ) : null}
      {clueNum > 1 ? (
        <p>
          Clue 2: {questions[questionNum][`question${questionNum + 1}`].clue2}
        </p>
      ) : null}
      {clueNum > 2 ? (
        <p>
          Clue 3: {questions[questionNum][`question${questionNum + 1}`].clue3}
        </p>
      ) : null}
      {clueNum > 3 ? (
        <p>
          Clue 4: {questions[questionNum][`question${questionNum + 1}`].clue4}
        </p>
      ) : null}
      {!hideAns ? (
        <p>
          Answer: {questions[questionNum][`question${questionNum + 1}`].answer}
        </p>
      ) : null}
      <button
        onClick={() => {
          setClueNum((currNum) => {
            return currNum + 1;
          });
        }}
      >
        next clue
      </button>
      <button
        onClick={() => {
          setHideAns(false);
          setClueNum(4);
        }}
      >
        reveal answer
      </button>
      <button
        onClick={() => {
          setClueNum(0);
          setHideAns(true);
          setQuestionNum((currNum) => {
            if (currNum === 3 || currNum === 9) {
              return null;
            }
            return currNum + 1;
          });

          setWrong(false);
          if (!wrong) {
            setTurn((currTurn) => {
              if (questionNum === 3 || questionNum === 9) {
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
        Next question
      </button>
      <button
        disabled={wrong}
        onClick={() => {
          setTurn((currTurn) => {
            if (currTurn === team1) {
              return team2;
            } else {
              return team1;
            }
          });
          setWrong(true);
        }}
      >
        Incorrect Guess
      </button>
    </div>
  );
}
