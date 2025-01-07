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

    { question17: { clue1: "", clue2: "", clue3: "", clue4: "", answer: "" } },
    { question18: { clue1: "", clue2: "", clue3: "", clue4: "", answer: "" } },
    { question19: { clue1: "", clue2: "", clue3: "", clue4: "", answer: "" } },
    { question20: { clue1: "", clue2: "", clue3: "", clue4: "", answer: "" } },
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
        return (
          <div key={index}>
            {index === 0 ? (
              <h3>Connections</h3>
            ) : index === 4 ? (
              <h3>Sequence</h3>
            ) : index === 10 ? (
              <h3>Image round</h3>
            ) : index === 16 ? (
              <h3>Music round</h3>
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
      })}
      <button onClick={handleSave}>save</button>
    </div>
  );
}
