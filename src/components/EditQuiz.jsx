import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getQuiz, saveQuiz } from "../../utils";

export function EditQuiz() {
  const { state } = useLocation();
  const username = localStorage.getItem("user");
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    getQuiz(state.id, username).then((res) => {
      setQuestions(Object.values(res)[0]);
      setTitle(Object.keys(res)[0]);
    });
  }, []);

  function handleSave() {
    saveQuiz(questions, username, title, state.id);
  }

  return (
    <div>
      <form>
        <label htmlFor="title">Quiz Name:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></input>
      </form>
      {questions.map((q, index) => {
        const question = Object.values(q)[0];
        return (
          <div key={index}>
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
              ></input>{" "}
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
              ></input>{" "}
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
              ></input>{" "}
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
              ></input>{" "}
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
