import { useEffect, useState } from "react";
import { UserContext } from "./context/UserContext";
import "./App.css";
import { HomeScreen } from "./components/HomeScreen";
import { LogIn } from "./components/LogIn";
import { Route, Routes } from "react-router-dom";
import { SignUp } from "./components/SignUp";
import { CreateQuiz } from "./components/CreateQuiz";
import { EditQuiz } from "./components/EditQuiz";
import { SelectQuiz } from "./components/SelectQuiz";
import { PlayQuiz } from "./components/PlayQuiz";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(localStorage.getItem("user"));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/select-quiz" element={<SelectQuiz />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/edit-quiz" element={<EditQuiz />} />
        <Route path="/play-quiz" element={<PlayQuiz />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
