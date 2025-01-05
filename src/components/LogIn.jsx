import { useContext, useState } from "react";
import { getUser } from "../../utils";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export function LogIn() {
  const [username, setUsername] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (username) {
      const user = await getUser(username);
      if (user) {
        setUser(user);
        navigate("/home");
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="login">Username: </label>
        <input
          type="text"
          name="login"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></input>
        <input type="submit" value="Log In"></input>
      </form>
      <button
        onClick={() => {
          navigate("/signup");
        }}
      >
        Sign Up
      </button>
    </div>
  );
}
