import { useEffect, useState } from "react";
import { UserContext } from "./context/UserContext";
import "./App.css";
import { HomeScreen } from "./components/HomeScreen";
import { LogIn } from "./components/LogIn";
import { Route, Routes } from "react-router-dom";
import { SignUp } from "./components/SignUp";
import { CreateQuiz } from "./components/CreateQuiz";
import { use } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem("user");
    setUser(username);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
