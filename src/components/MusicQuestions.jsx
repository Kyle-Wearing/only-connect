import { useState } from "react";

export function MusicQuestions({ questions, questionNum, setQuestionNum }) {
  const [playVid1, setPlayVid1] = useState(false);
  const [playVid2, setPlayVid2] = useState(false);
  const [playVid3, setPlayVid3] = useState(false);
  const [playVid4, setPlayVid4] = useState(false);
  const [hideAns, setHideAns] = useState(true);

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
          onClick={() => {
            setHideAns(false);
          }}
        >
          reveal answer
        </button>
        <button
          onClick={() => {
            setHideAns(true);
            setQuestionNum((currNum) => {
              return currNum + 1;
            });
          }}
        >
          Next question
        </button>
      </div>
    </div>
  );
}
