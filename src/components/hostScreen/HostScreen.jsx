import { useLocation, useParams } from "react-router-dom";
import { getAllQuestions } from "../../../utils";
import { useEffect, useState } from "react";
import "../../styles/Host.css";

export function HostScreen() {
  const { quiz_id } = useParams();
  const location = useLocation();
  const { quiz_name } = location.state;
  const [questions, setQuestions] = useState({});
  const [categorys, setCategorys] = useState([]);
  const [category, setCategory] = useState("");
  const [questionNum, setQuestionNum] = useState(0);

  async function apiCall() {
    const fetchedQuestions = await getAllQuestions(quiz_id);
    setQuestions(fetchedQuestions);
    setCategorys(Object.keys(fetchedQuestions));
  }

  useEffect(() => {
    apiCall();
  }, []);

  function handleClick(category) {
    setCategory(category);
  }

  function handleQuestions(num) {
    if (num === -1) {
      setQuestionNum((curr) => {
        return curr - 1;
      });
    } else if (num === 1) {
      setQuestionNum((curr) => {
        return curr + 1;
      });
    }
  }

  if (!category) {
    return (
      <>
        <h1 className="host-title">{quiz_name}</h1>
        <div className="host-list">
          {categorys.map((category) => {
            if (category !== "wall") {
              return (
                <button
                  className="host-button"
                  key={category}
                  onClick={() => {
                    handleClick(category);
                  }}
                >
                  {category}
                </button>
              );
            }
          })}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="host-container">
        <button
          className="host-button"
          onClick={() => {
            setQuestionNum(0);
            setCategory("");
          }}
        >
          Home
        </button>
        <h1 className="host-category-title">{category}</h1>
        <h2 className="host-question-title">Question {questionNum + 1}:</h2>
        <p className="host-answer">{questions[category][questionNum].answer}</p>
        <div className="host-button-container">
          <button
            disabled={questionNum === 0}
            className="host-button"
            onClick={() => handleQuestions(-1)}
          >
            back
          </button>
          <button
            disabled={questionNum === questions[category].length - 1}
            className="host-button"
            onClick={() => handleQuestions(1)}
          >
            next
          </button>
        </div>
      </div>
    </>
  );
}
