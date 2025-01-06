import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { getQuizes } from "../../utils";
import { useNavigate } from "react-router-dom";

export function HomeScreen() {
  const { user } = useContext(UserContext);
  const [quizes, setQuizes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getQuizes(localStorage.getItem("user")).then((response) => {
      const quizList = [];
      for (const quiz in response) {
        quizList.push({ title: Object.keys(response[quiz])[0], id: quiz });
      }
      setQuizes(quizList || []);
    });
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          navigate("/create-quiz");
        }}
      >
        Create a new quiz
      </button>
      {quizes.map((quiz, index) => {
        return (
          <p
            key={index}
            onClick={() => navigate("/edit-quiz", { state: { id: quiz.id } })}
          >
            {quiz.title}
          </p>
        );
      })}
    </div>
  );
}
