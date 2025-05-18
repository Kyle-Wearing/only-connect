import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getAllQuestions, updateAllQuestions } from "../../utils";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import "../styles/EditQuiz.css";

export function EditQuiz() {
  const { quiz_id } = useParams();
  const location = useLocation();
  const { quiz_name, quiz_maker } = location.state;
  const [questions, setQuestions] = useState({});
  const [loading, setLoading] = useState(true);
  const [quizName, setQuizName] = useState(quiz_name);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

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

  const handleInputChange = (e, type, questionIndex, key) => {
    const updatedQuestions = { ...questions };
    updatedQuestions[type][questionIndex][key] = e.target.value;
    setQuestions(updatedQuestions);
  };

  async function handleSave() {
    setSaving(true);
    const success = await updateAllQuestions(quiz_id, questions, quizName);
    if (success.status === 200) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } else {
      setError(success.msg);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
    setSaving(false);
  }

  return (
    <div className="edit-container">
      <button
        className="back-button-edit"
        onClick={() => {
          navigate(`/quizzes/${quiz_id}/home`, {
            state: { quiz_name: quiz_name, quiz_maker: quiz_maker },
          });
        }}
      >
        ← Back
      </button>

      <button className="save-button" disabled={saving} onClick={handleSave}>
        {saving ? (
          <div className="spinner" />
        ) : !success ? (
          "Save All Changes"
        ) : (
          "Successfully Saved"
        )}
      </button>
      {error ? <p className="error-message">{error}</p> : null}

      <form className="quiz-title-input">
        <input
          className="quiz-title-text"
          type="text"
          value={quizName}
          onChange={(e) => setQuizName(e.target.value)}
        />
      </form>
      <ul className="question-list">
        <li>
          <h2 className="quiz-name-input">Sequence</h2>
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
                    value={question.clue_1 || ""}
                  />
                </label>
                <label>
                  Clue 2:
                  <input
                    onChange={(e) => {
                      handleInputChange(e, "sequence", index, "clue_2");
                    }}
                    value={question.clue_2 || ""}
                  />
                </label>
                <label>
                  Clue 3:
                  <input
                    onChange={(e) => {
                      handleInputChange(e, "sequence", index, "clue_3");
                    }}
                    value={question.clue_3 || ""}
                  />
                </label>
                <label>
                  Clue 4:
                  <input
                    onChange={(e) => {
                      handleInputChange(e, "sequence", index, "clue_4");
                    }}
                    value={question.clue_4 || ""}
                  />
                </label>
                <label>
                  Answer:
                  <input
                    onChange={(e) => {
                      handleInputChange(e, "sequence", index, "answer");
                    }}
                    value={question.answer || ""}
                  />
                </label>
              </form>
            </div>
          ))}
        </li>
        <li>
          <h2 className="quiz-name-input">Connections</h2>
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
                    value={question.clue_1 || ""}
                  />
                </label>
                <label>
                  Clue 2:
                  <input
                    onChange={(e) => {
                      handleInputChange(e, "connections", index, "clue_2");
                    }}
                    value={question.clue_2 || ""}
                  />
                </label>
                <label>
                  Clue 3:
                  <input
                    onChange={(e) => {
                      handleInputChange(e, "connections", index, "clue_3");
                    }}
                    value={question.clue_3 || ""}
                  />
                </label>
                <label>
                  Clue 4:
                  <input
                    onChange={(e) => {
                      handleInputChange(e, "connections", index, "clue_4");
                    }}
                    value={question.clue_4 || ""}
                  />
                </label>
                <label>
                  Answer:
                  <input
                    onChange={(e) => {
                      handleInputChange(e, "connections", index, "answer");
                    }}
                    value={question.answer || ""}
                  />
                </label>
              </form>
            </div>
          ))}
        </li>
        <li>
          <h2 className="quiz-name-input">Image</h2>
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
                    value={question.clue_1 || ""}
                  />
                </label>
                <label>
                  Clue 2:
                  <input
                    onChange={(e) => {
                      handleInputChange(e, "image", index, "clue_2");
                    }}
                    value={question.clue_2 || ""}
                  />
                </label>
                <label>
                  Clue 3:
                  <input
                    onChange={(e) => {
                      handleInputChange(e, "image", index, "clue_3");
                    }}
                    value={question.clue_3 || ""}
                  />
                </label>
                <label>
                  Clue 4:
                  <input
                    onChange={(e) => {
                      handleInputChange(e, "image", index, "clue_4");
                    }}
                    value={question.clue_4 || ""}
                  />
                </label>
                <label>
                  Answer:
                  <input
                    onChange={(e) => {
                      handleInputChange(e, "image", index, "answer");
                    }}
                    value={question.answer || ""}
                  />
                </label>
              </form>
            </div>
          ))}
        </li>
        <li>
          <h2 className="quiz-name-input">Music</h2>
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
                    value={question.clue_1_url || ""}
                  />
                </label>
                <label>
                  Clue 1 Start:
                  <input
                    onChange={(e) => {
                      handleInputChange(e, "music", index, "clue_1_start");
                    }}
                    value={question.clue_1_start || ""}
                  />
                </label>
                <label>
                  Clue 1 Duration:
                  <input
                    onChange={(e) => {
                      handleInputChange(e, "music", index, "clue_1_duration");
                    }}
                    value={question.clue_1_duration || ""}
                  />
                </label>
                <label>
                  Clue 2 URL:
                  <input
                    onChange={(e) => {
                      handleInputChange(e, "music", index, "clue_2_url");
                    }}
                    value={question.clue_2_url || ""}
                  />
                </label>
                <label>
                  Clue 2 Start:
                  <input
                    onChange={(e) => {
                      handleInputChange(e, "music", index, "clue_2_start");
                    }}
                    value={question.clue_2_start || ""}
                  />
                </label>
                <label>
                  Clue 2 Duration:
                  <input
                    onChange={(e) => {
                      handleInputChange(e, "music", index, "clue_2_duration");
                    }}
                    value={question.clue_2_duration || ""}
                  />
                </label>
                <label>
                  Clue 3 URL:
                  <input
                    onChange={(e) => {
                      handleInputChange(e, "music", index, "clue_3_url");
                    }}
                    value={question.clue_3_url || ""}
                  />
                </label>
                <label>
                  Clue 3 Start:
                  <input
                    onChange={(e) => {
                      handleInputChange(e, "music", index, "clue_3_start");
                    }}
                    value={question.clue_3_start || ""}
                  />
                </label>
                <label>
                  Clue 3 Duration:
                  <input
                    onChange={(e) => {
                      handleInputChange(e, "music", index, "clue_3_duration");
                    }}
                    value={question.clue_3_duration || ""}
                  />
                </label>
                <label>
                  Clue 4 URL:
                  <input
                    onChange={(e) => {
                      handleInputChange(e, "music", index, "clue_4_url");
                    }}
                    value={question.clue_4_url || ""}
                  />
                </label>
                <label>
                  Clue 4 Start:
                  <input
                    onChange={(e) => {
                      handleInputChange(e, "music", index, "clue_4_start");
                    }}
                    value={question.clue_4_start || ""}
                  />
                </label>
                <label>
                  Clue 4 Duration:
                  <input
                    onChange={(e) => {
                      handleInputChange(e, "music", index, "clue_4_duration");
                    }}
                    value={question.clue_4_duration || ""}
                  />
                </label>
                <label>
                  Answer:
                  <input
                    onChange={(e) => {
                      handleInputChange(e, "music", index, "answer");
                    }}
                    value={question.answer || ""}
                  />
                </label>
              </form>
            </div>
          ))}
        </li>
        <li>
          <h2 className="quiz-name-input">Missing Vowels</h2>
          {questions.vowels.map((question, index) => (
            <div key={index} className="question-form">
              <h3>Question {index + 1}</h3>
              <form>
                <label>
                  Clue:
                  <input
                    onChange={(e) => {
                      handleInputChange(e, "vowels", index, "clue");
                    }}
                    value={question.clue || ""}
                  />
                </label>
                <label>
                  Answer:
                  <input
                    onChange={(e) => {
                      handleInputChange(e, "vowels", index, "answer");
                    }}
                    value={question.answer || ""}
                  />
                </label>
              </form>
            </div>
          ))}
        </li>
        <li>
          <h2 className="quiz-name-input">Wall</h2>
          {questions.wall.map((question, index) => {
            return (
              <div key={index} className="question-form">
                <h3>Question {index + 1}</h3>
                <form>
                  <label>
                    Word 1:
                    <input
                      onChange={(e) => {
                        handleInputChange(e, "wall", index, "word_1");
                      }}
                      value={question.word_1 || ""}
                    />
                  </label>
                  <label>
                    Word 2:
                    <input
                      onChange={(e) => {
                        handleInputChange(e, "wall", index, "word_2");
                      }}
                      value={question.word_2 || ""}
                    />
                  </label>
                  <label>
                    Word 3:
                    <input
                      onChange={(e) => {
                        handleInputChange(e, "wall", index, "word_3");
                      }}
                      value={question.word_3 || ""}
                    />
                  </label>
                  <label>
                    Word 4:
                    <input
                      onChange={(e) => {
                        handleInputChange(e, "wall", index, "word_4");
                      }}
                      value={question.word_4 || ""}
                    />
                  </label>
                  <label>
                    Answer 1:
                    <input
                      onChange={(e) => {
                        handleInputChange(e, "wall", index, "answer_1");
                      }}
                      value={question.answer_1 || ""}
                    />
                  </label>
                  <label>
                    Word 1:
                    <input
                      onChange={(e) => {
                        handleInputChange(e, "wall", index, "word_5");
                      }}
                      value={question.word_5 || ""}
                    />
                  </label>
                  <label>
                    Word 2:
                    <input
                      onChange={(e) => {
                        handleInputChange(e, "wall", index, "word_6");
                      }}
                      value={question.word_6 || ""}
                    />
                  </label>
                  <label>
                    Word 3:
                    <input
                      onChange={(e) => {
                        handleInputChange(e, "wall", index, "word_7");
                      }}
                      value={question.word_7 || ""}
                    />
                  </label>
                  <label>
                    Word 4:
                    <input
                      onChange={(e) => {
                        handleInputChange(e, "wall", index, "word_8");
                      }}
                      value={question.word_8 || ""}
                    />
                  </label>
                  <label>
                    Answer 2:
                    <input
                      onChange={(e) => {
                        handleInputChange(e, "wall", index, "answer_2");
                      }}
                      value={question.answer_2 || ""}
                    />
                  </label>
                  <label>
                    Word 1:
                    <input
                      onChange={(e) => {
                        handleInputChange(e, "wall", index, "word_9");
                      }}
                      value={question.word_9 || ""}
                    />
                  </label>
                  <label>
                    Word 2:
                    <input
                      onChange={(e) => {
                        handleInputChange(e, "wall", index, "word_10");
                      }}
                      value={question.word_10 || ""}
                    />
                  </label>
                  <label>
                    Word 3:
                    <input
                      onChange={(e) => {
                        handleInputChange(e, "wall", index, "word_11");
                      }}
                      value={question.word_11 || ""}
                    />
                  </label>
                  <label>
                    Word 4:
                    <input
                      onChange={(e) => {
                        handleInputChange(e, "wall", index, "word_12");
                      }}
                      value={question.word_12 || ""}
                    />
                  </label>
                  <label>
                    Answer 3:
                    <input
                      onChange={(e) => {
                        handleInputChange(e, "wall", index, "answer_3");
                      }}
                      value={question.answer_3 || ""}
                    />
                  </label>
                  <label>
                    Word 1:
                    <input
                      onChange={(e) => {
                        handleInputChange(e, "wall", index, "word_13");
                      }}
                      value={question.word_13 || ""}
                    />
                  </label>
                  <label>
                    Word 2:
                    <input
                      onChange={(e) => {
                        handleInputChange(e, "wall", index, "word_14");
                      }}
                      value={question.word_14 || ""}
                    />
                  </label>
                  <label>
                    Word 3:
                    <input
                      onChange={(e) => {
                        handleInputChange(e, "wall", index, "word_15");
                      }}
                      value={question.word_15 || ""}
                    />
                  </label>
                  <label>
                    Word 4:
                    <input
                      onChange={(e) => {
                        handleInputChange(e, "wall", index, "word_16");
                      }}
                      value={question.word_16 || ""}
                    />
                  </label>
                  <label>
                    Answer 4:
                    <input
                      onChange={(e) => {
                        handleInputChange(e, "wall", index, "answer_4");
                      }}
                      value={question.answer_4 || ""}
                    />
                  </label>
                </form>
              </div>
            );
          })}
        </li>
      </ul>
    </div>
  );
}
