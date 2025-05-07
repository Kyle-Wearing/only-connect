import { useLocation, useParams } from "react-router-dom";
import { getAllQuestions } from "../../utils";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import "../styles/EditQuiz.css";

export function EditQuiz() {
  const { quiz_id } = useParams();
  const location = useLocation();
  const { quiz_name } = location.state;
  const [questions, setQuestions] = useState({});
  const [loading, setLoading] = useState(true);

  async function apiCall() {
    const fetchedQuestions = await getAllQuestions(quiz_id);
    setQuestions(fetchedQuestions);
    setLoading(false);
  }

  useEffect(() => {
    apiCall();
  }, []);

  if (loading) {
    return (
      <div className="edit-container">
        <LoadingSpinner />
      </div>
    );
  }

  const handleInputChange = (e, questionIndex, key) => {
    const updatedQuestions = { ...questions };
    updatedQuestions.sequence[questionIndex][key] = e.target.value;
    setQuestions(updatedQuestions);
  };

  return (
    <div className="edit-container">
      <h1>{quiz_name}</h1>
      <div className="question-list">
        <h2>Sequence</h2>
        {questions.sequence.map((question, index) => (
          <div key={index} className="question-form">
            <h3>Question {index + 1}</h3>
            <form>
              <label>
                Clue 1:
                <input
                  onChange={(e) => {
                    handleInputChange(e, index, "clue_1");
                  }}
                  value={question.clue_1}
                />
              </label>
              <label>
                Clue 2:
                <input
                  onChange={(e) => {
                    handleInputChange(e, index, "clue_2");
                  }}
                  value={question.clue_2}
                />
              </label>
              <label>
                Clue 3:
                <input
                  onChange={(e) => {
                    handleInputChange(e, index, "clue_3");
                  }}
                  value={question.clue_3}
                />
              </label>
              <label>
                Clue 4:
                <input
                  onChange={(e) => {
                    handleInputChange(e, index, "clue_4");
                  }}
                  value={question.clue_4}
                />
              </label>
              <label>
                Answer:
                <input
                  onChange={(e) => {
                    handleInputChange(e, index, "answer");
                  }}
                  value={question.answer}
                />
              </label>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
