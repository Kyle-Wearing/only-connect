import { useLocation, useNavigate } from "react-router-dom";

export function SelectQuiz() {
  const { state } = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => navigate("/edit-quiz", { state: { id: state.id } })}
      >
        edit
      </button>
      <button
        onClick={() => navigate("/play-quiz", { state: { id: state.id } })}
      >
        play
      </button>
    </>
  );
}
