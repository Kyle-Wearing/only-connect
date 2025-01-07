import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { postQuiz } from "../../utils";

export function CreateQuiz() {
  const [questions, setQuestions] = useState([
    { question1: { clue1: "", clue2: "", clue3: "", clue4: "", answer: "" } },
    { question2: { clue1: "", clue2: "", clue3: "", clue4: "", answer: "" } },
    { question3: { clue1: "", clue2: "", clue3: "", clue4: "", answer: "" } },
    { question4: { clue1: "", clue2: "", clue3: "", clue4: "", answer: "" } },

    { question5: { clue1: "", clue2: "", clue3: "", clue4: "", answer: "" } },
    { question6: { clue1: "", clue2: "", clue3: "", clue4: "", answer: "" } },
    { question7: { clue1: "", clue2: "", clue3: "", clue4: "", answer: "" } },
    { question8: { clue1: "", clue2: "", clue3: "", clue4: "", answer: "" } },
    { question9: { clue1: "", clue2: "", clue3: "", clue4: "", answer: "" } },
    { question10: { clue1: "", clue2: "", clue3: "", clue4: "", answer: "" } },

    { question11: { clue1: "", clue2: "", clue3: "", clue4: "", answer: "" } },
    { question12: { clue1: "", clue2: "", clue3: "", clue4: "", answer: "" } },
    { question13: { clue1: "", clue2: "", clue3: "", clue4: "", answer: "" } },
    { question14: { clue1: "", clue2: "", clue3: "", clue4: "", answer: "" } },
    { question15: { clue1: "", clue2: "", clue3: "", clue4: "", answer: "" } },
    { question16: { clue1: "", clue2: "", clue3: "", clue4: "", answer: "" } },

    {
      question17: {
        clue1Url: "",
        clue1Start: "",
        clue1Duration: "",
        clue2Url: "",
        clue2Start: "",
        clue2Duration: "",
        clue3Url: "",
        clue3Start: "",
        clue3Duration: "",
        clue4Url: "",
        clue4Start: "",
        clue4Duration: "",
        answer: "",
      },
    },
    {
      question18: {
        clue1Url: "",
        clue1Start: "",
        clue1Duration: "",
        clue2Url: "",
        clue2Start: "",
        clue2Duration: "",
        clue3Url: "",
        clue3Start: "",
        clue3Duration: "",
        clue4Url: "",
        clue4Start: "",
        clue4Duration: "",
        answer: "",
      },
    },
    {
      question19: {
        clue1Url: "",
        clue1Start: "",
        clue1Duration: "",
        clue2Url: "",
        clue2Start: "",
        clue2Duration: "",
        clue3Url: "",
        clue3Start: "",
        clue3Duration: "",
        clue4Url: "",
        clue4Start: "",
        clue4Duration: "",
        answer: "",
      },
    },
    {
      question20: {
        clue1Url: "",
        clue1Start: "",
        clue1Duration: "",
        clue2Url: "",
        clue2Start: "",
        clue2Duration: "",
        clue3Url: "",
        clue3Start: "",
        clue3Duration: "",
        clue4Url: "",
        clue4Start: "",
        clue4Duration: "",
        answer: "",
      },
    },
  ]);

  const [title, setTitle] = useState("");

  const { user } = useContext(UserContext);

  function handleSave() {
    if (title) {
      postQuiz(questions, user, title);
    }
  }

  return (
    <div>
      <form>
        <label htmlFor="title">Quiz Name:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></input>
      </form>

      {questions.map((question, index) => {
        if (index < 16) {
          return (
            <div key={index}>
              {index === 0 ? (
                <h3>Connections</h3>
              ) : index === 4 ? (
                <h3>Sequence</h3>
              ) : index === 10 ? (
                <h3>Image round</h3>
              ) : null}
              <p>question {index + 1}</p>
              <form>
                <label htmlFor={`${index}.1`}>clue 1:</label>
                <input
                  type="text"
                  name={`${index}.1`}
                  id={`${index}.1`}
                  value={question.clue1}
                  onChange={(e) => {
                    setQuestions((currQuestions) => {
                      const newQuestions = [...currQuestions];
                      newQuestions[index][`question${index + 1}`].clue1 =
                        e.target.value;
                      return newQuestions;
                    });
                  }}
                ></input>
                <br />
                <label htmlFor={`${index}.2`}>clue 2:</label>
                <input
                  type="text"
                  name={`${index}.2`}
                  id={`${index}.2`}
                  value={question.clue2}
                  onChange={(e) => {
                    setQuestions((currQuestions) => {
                      const newQuestions = [...currQuestions];
                      newQuestions[index][`question${index + 1}`].clue2 =
                        e.target.value;
                      return newQuestions;
                    });
                  }}
                ></input>
                <br />
                <label htmlFor={`${index}.3`}>clue 3:</label>
                <input
                  type="text"
                  name={`${index}.3`}
                  id={`${index}.3`}
                  value={question.clue3}
                  onChange={(e) => {
                    setQuestions((currQuestions) => {
                      const newQuestions = [...currQuestions];
                      newQuestions[index][`question${index + 1}`].clue3 =
                        e.target.value;
                      return newQuestions;
                    });
                  }}
                ></input>
                <br />
                <label htmlFor={`${index}.4`}>clue 4:</label>
                <input
                  type="text"
                  name={`${index}.4`}
                  id={`${index}.4`}
                  value={question.clue4}
                  onChange={(e) => {
                    setQuestions((currQuestions) => {
                      const newQuestions = [...currQuestions];
                      newQuestions[index][`question${index + 1}`].clue4 =
                        e.target.value;
                      return newQuestions;
                    });
                  }}
                ></input>
                <br />
                <label htmlFor={`${index}.answer`}>Answer:</label>
                <input
                  type="text"
                  name={`${index}.answer`}
                  id={`${index}.answer`}
                  value={question.answer}
                  onChange={(e) => {
                    setQuestions((currQuestions) => {
                      const newQuestions = [...currQuestions];
                      newQuestions[index][`question${index + 1}`].answer =
                        e.target.value;
                      return newQuestions;
                    });
                  }}
                ></input>
              </form>
            </div>
          );
        } else if (index > 15) {
          return (
            <div key={index}>
              {index === 16 ? <h3>Music round</h3> : null}
              <p>question {index + 1}</p>
              <form>
                <label htmlFor={`${index}.1url`}>clue 1 URL:</label>
                <input
                  type="text"
                  name={`${index}.1url`}
                  id={`${index}.1url`}
                  value={question.clue1Url}
                  onChange={(e) => {
                    setQuestions((currQuestions) => {
                      const newQuestions = [...currQuestions];
                      newQuestions[index][`question${index + 1}`].clue1Url =
                        e.target.value;
                      return newQuestions;
                    });
                  }}
                ></input>
                <br />
                <label htmlFor={`${index}.1start`}>clue 1 Start time:</label>
                <input
                  type="text"
                  name={`${index}.1start`}
                  id={`${index}.1start`}
                  value={question.clue1Start}
                  onChange={(e) => {
                    setQuestions((currQuestions) => {
                      const newQuestions = [...currQuestions];
                      newQuestions[index][`question${index + 1}`].clue1Start =
                        e.target.value;
                      return newQuestions;
                    });
                  }}
                ></input>
                <br />
                <label htmlFor={`${index}.1duration`}>
                  clue 1 Play duration:
                </label>
                <input
                  type="text"
                  name={`${index}.1duration`}
                  id={`${index}.1duration`}
                  value={question.clue1Duration}
                  onChange={(e) => {
                    setQuestions((currQuestions) => {
                      const newQuestions = [...currQuestions];
                      newQuestions[index][
                        `question${index + 1}`
                      ].clue1Duration = e.target.value;
                      return newQuestions;
                    });
                  }}
                ></input>
                <br />
                <label htmlFor={`${index}.2url`}>clue 2 URL:</label>
                <input
                  type="text"
                  name={`${index}.2url`}
                  id={`${index}.2url`}
                  value={question.clue2Url}
                  onChange={(e) => {
                    setQuestions((currQuestions) => {
                      const newQuestions = [...currQuestions];
                      newQuestions[index][`question${index + 1}`].clue2Url =
                        e.target.value;
                      return newQuestions;
                    });
                  }}
                ></input>
                <br />
                <label htmlFor={`${index}.2start`}>clue 2 Start time:</label>
                <input
                  type="text"
                  name={`${index}.2start`}
                  id={`${index}.2start`}
                  value={question.clue2Start}
                  onChange={(e) => {
                    setQuestions((currQuestions) => {
                      const newQuestions = [...currQuestions];
                      newQuestions[index][`question${index + 1}`].clue2Start =
                        e.target.value;
                      return newQuestions;
                    });
                  }}
                ></input>
                <br />
                <label htmlFor={`${index}.2duration`}>
                  clue 2 Play duration:
                </label>
                <input
                  type="text"
                  name={`${index}.2duration`}
                  id={`${index}.2duration`}
                  value={question.clue2Duration}
                  onChange={(e) => {
                    setQuestions((currQuestions) => {
                      const newQuestions = [...currQuestions];
                      newQuestions[index][
                        `question${index + 1}`
                      ].clue2Duration = e.target.value;
                      return newQuestions;
                    });
                  }}
                ></input>
                <br />
                <label htmlFor={`${index}.3url`}>clue 3 URL:</label>
                <input
                  type="text"
                  name={`${index}.3url`}
                  id={`${index}.3url`}
                  value={question.clue3Url}
                  onChange={(e) => {
                    setQuestions((currQuestions) => {
                      const newQuestions = [...currQuestions];
                      newQuestions[index][`question${index + 1}`].clue3Url =
                        e.target.value;
                      return newQuestions;
                    });
                  }}
                ></input>
                <br />
                <label htmlFor={`${index}.3start`}>clue 3 Start time:</label>
                <input
                  type="text"
                  name={`${index}.3start`}
                  id={`${index}.3start`}
                  value={question.clue3Start}
                  onChange={(e) => {
                    setQuestions((currQuestions) => {
                      const newQuestions = [...currQuestions];
                      newQuestions[index][`question${index + 1}`].clue3Start =
                        e.target.value;
                      return newQuestions;
                    });
                  }}
                ></input>
                <br />
                <label htmlFor={`${index}.3duration`}>
                  clue 3 Play duration:
                </label>
                <input
                  type="text"
                  name={`${index}.3duration`}
                  id={`${index}.3duration`}
                  value={question.clue3Duration}
                  onChange={(e) => {
                    setQuestions((currQuestions) => {
                      const newQuestions = [...currQuestions];
                      newQuestions[index][
                        `question${index + 1}`
                      ].clue3Duration = e.target.value;
                      return newQuestions;
                    });
                  }}
                ></input>
                <br />
                <label htmlFor={`${index}.4url`}>clue 4 URL:</label>
                <input
                  type="text"
                  name={`${index}.4url`}
                  id={`${index}.4url`}
                  value={question.clue4Url}
                  onChange={(e) => {
                    setQuestions((currQuestions) => {
                      const newQuestions = [...currQuestions];
                      newQuestions[index][`question${index + 1}`].clue4Url =
                        e.target.value;
                      return newQuestions;
                    });
                  }}
                ></input>
                <br />
                <label htmlFor={`${index}.4start`}>clue 4 Start time:</label>
                <input
                  type="text"
                  name={`${index}.4start`}
                  id={`${index}.4start`}
                  value={question.clue4Start}
                  onChange={(e) => {
                    setQuestions((currQuestions) => {
                      const newQuestions = [...currQuestions];
                      newQuestions[index][`question${index + 1}`].clue4Start =
                        e.target.value;
                      return newQuestions;
                    });
                  }}
                ></input>
                <br />
                <label htmlFor={`${index}.4duration`}>
                  clue 4 Play duration:
                </label>
                <input
                  type="text"
                  name={`${index}.4duration`}
                  id={`${index}.4duration`}
                  value={question.clue4Duration}
                  onChange={(e) => {
                    setQuestions((currQuestions) => {
                      const newQuestions = [...currQuestions];
                      newQuestions[index][
                        `question${index + 1}`
                      ].clue4Duration = e.target.value;
                      return newQuestions;
                    });
                  }}
                ></input>
                <br />
                <label htmlFor={`${index}.answer`}>Answer:</label>
                <input
                  type="text"
                  name={`${index}.answer`}
                  id={`${index}.answer`}
                  value={question.answer}
                  onChange={(e) => {
                    setQuestions((currQuestions) => {
                      const newQuestions = [...currQuestions];
                      newQuestions[index][`question${index + 1}`].answer =
                        e.target.value;
                      return newQuestions;
                    });
                  }}
                ></input>
              </form>
            </div>
          );
        }
      })}
      <button onClick={handleSave}>save</button>
    </div>
  );
}
