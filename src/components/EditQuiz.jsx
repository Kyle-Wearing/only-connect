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
    console.log(fetchedQuestions);
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

  const handleInputChange = (e, type, questionIndex, key) => {
    const updatedQuestions = { ...questions };
    updatedQuestions[type][questionIndex][key] = e.target.value;
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
                    handleInputChange(e, "sequence", index, "clue_1");
                  }}
                  value={question.clue_1}
                />
              </label>
              <label>
                Clue 2:
                <input
                  onChange={(e) => {
                    handleInputChange(e, "sequence", index, "clue_2");
                  }}
                  value={question.clue_2}
                />
              </label>
              <label>
                Clue 3:
                <input
                  onChange={(e) => {
                    handleInputChange(e, "sequence", index, "clue_3");
                  }}
                  value={question.clue_3}
                />
              </label>
              <label>
                Clue 4:
                <input
                  onChange={(e) => {
                    handleInputChange(e, "sequence", index, "clue_4");
                  }}
                  value={question.clue_4}
                />
              </label>
              <label>
                Answer:
                <input
                  onChange={(e) => {
                    handleInputChange(e, "sequence", index, "answer");
                  }}
                  value={question.answer}
                />
              </label>
            </form>
          </div>
        ))}

        <h2>Connections</h2>
        {questions.connections.map((question, index) => (
          <div key={index} className="question-form">
            <h3>Question {index + 1}</h3>
            <form>
              <label>
                Clue 1:
                <input
                  onChange={(e) => {
                    handleInputChange(e, "connections", index, "clue_1");
                  }}
                  value={question.clue_1}
                />
              </label>
              <label>
                Clue 2:
                <input
                  onChange={(e) => {
                    handleInputChange(e, "connections", index, "clue_2");
                  }}
                  value={question.clue_2}
                />
              </label>
              <label>
                Clue 3:
                <input
                  onChange={(e) => {
                    handleInputChange(e, "connections", index, "clue_3");
                  }}
                  value={question.clue_3}
                />
              </label>
              <label>
                Clue 4:
                <input
                  onChange={(e) => {
                    handleInputChange(e, "connections", index, "clue_4");
                  }}
                  value={question.clue_4}
                />
              </label>
              <label>
                Answer:
                <input
                  onChange={(e) => {
                    handleInputChange(e, "connections", index, "answer");
                  }}
                  value={question.answer}
                />
              </label>
            </form>
          </div>
        ))}

        <h2>Image</h2>
        {questions.image.map((question, index) => (
          <div key={index} className="question-form">
            <h3>Question {index + 1}</h3>
            <form>
              <label>
                Clue 1:
                <input
                  onChange={(e) => {
                    handleInputChange(e, "image", index, "clue_1");
                  }}
                  value={question.clue_1}
                />
              </label>
              <label>
                Clue 2:
                <input
                  onChange={(e) => {
                    handleInputChange(e, "image", index, "clue_2");
                  }}
                  value={question.clue_2}
                />
              </label>
              <label>
                Clue 3:
                <input
                  onChange={(e) => {
                    handleInputChange(e, "image", index, "clue_3");
                  }}
                  value={question.clue_3}
                />
              </label>
              <label>
                Clue 4:
                <input
                  onChange={(e) => {
                    handleInputChange(e, "image", index, "clue_4");
                  }}
                  value={question.clue_4}
                />
              </label>
              <label>
                Answer:
                <input
                  onChange={(e) => {
                    handleInputChange(e, "image", index, "answer");
                  }}
                  value={question.answer}
                />
              </label>
            </form>
          </div>
        ))}

        <h2>Music</h2>
        {questions.music.map((question, index) => (
          <div key={index} className="question-form">
            <h3>Question {index + 1}</h3>
            <form>
              <label>
                Clue 1 URL:
                <input
                  onChange={(e) => {
                    handleInputChange(e, "music", index, "clue_1_url");
                  }}
                  value={question.clue_1_url}
                />
              </label>
              <label>
                Clue 1 Start:
                <input
                  onChange={(e) => {
                    handleInputChange(e, "music", index, "clue_1_start");
                  }}
                  value={question.clue_1_start}
                />
              </label>
              <label>
                Clue 1 Duration:
                <input
                  onChange={(e) => {
                    handleInputChange(e, "music", index, "clue_1_duration");
                  }}
                  value={question.clue_1_duration}
                />
              </label>
              <label>
                Clue 2 URL:
                <input
                  onChange={(e) => {
                    handleInputChange(e, "music", index, "clue_2_url");
                  }}
                  value={question.clue_2_url}
                />
              </label>
              <label>
                Clue 2 Start:
                <input
                  onChange={(e) => {
                    handleInputChange(e, "music", index, "clue_2_start");
                  }}
                  value={question.clue_2_start}
                />
              </label>
              <label>
                Clue 2 Duration:
                <input
                  onChange={(e) => {
                    handleInputChange(e, "music", index, "clue_2_duration");
                  }}
                  value={question.clue_2_duration}
                />
              </label>
              <label>
                Clue 3 URL:
                <input
                  onChange={(e) => {
                    handleInputChange(e, "music", index, "clue_3_url");
                  }}
                  value={question.clue_3_url}
                />
              </label>
              <label>
                Clue 3 Start:
                <input
                  onChange={(e) => {
                    handleInputChange(e, "music", index, "clue_3_start");
                  }}
                  value={question.clue_3_start}
                />
              </label>
              <label>
                Clue 3 Duration:
                <input
                  onChange={(e) => {
                    handleInputChange(e, "music", index, "clue_3_duration");
                  }}
                  value={question.clue_3_duration}
                />
              </label>
              <label>
                Clue 4 URL:
                <input
                  onChange={(e) => {
                    handleInputChange(e, "music", index, "clue_4_url");
                  }}
                  value={question.clue_4_url}
                />
              </label>
              <label>
                Clue 4 Start:
                <input
                  onChange={(e) => {
                    handleInputChange(e, "music", index, "clue_4_start");
                  }}
                  value={question.clue_4_start}
                />
              </label>
              <label>
                Clue 4 Duration:
                <input
                  onChange={(e) => {
                    handleInputChange(e, "music", index, "clue_4_duration");
                  }}
                  value={question.clue_4_duration}
                />
              </label>
              <label>
                Answer:
                <input
                  onChange={(e) => {
                    handleInputChange(e, "music", index, "answer");
                  }}
                  value={question.answer}
                />
              </label>
            </form>
          </div>
        ))}

        <h2>Missing Vowels</h2>
        {questions.vowels.map((question, index) => (
          <div key={index} className="question-form">
            <h3>Question {index + 1}</h3>
            <form>
              <label>
                Answer:
                <input
                  onChange={(e) => {
                    handleInputChange(e, "vowels", index, "answer");
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
