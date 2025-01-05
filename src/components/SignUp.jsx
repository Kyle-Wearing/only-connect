import { useContext, useState } from "react";
import { getUser, postUser } from "../../utils";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const [username, setUsername] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (username) {
      const user = await getUser(username);
      if (user === null) {
        postUser(username);
        const newUser = await getUser(username);
        if (newUser) {
          setUser(username);
          localStorage.setItem("user", username);
          navigate("/home");
        }
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="signUp">Username: </label>
        <input
          type="text"
          name="signUp"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></input>
        <input type="submit" value="Sign Up"></input>
      </form>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Log In
      </button>
    </div>
  );
}
