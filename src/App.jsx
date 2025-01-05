import { useState } from "react";
import { UserContext } from "./context/UserContext";
import "./App.css";
import { HomeScreen } from "./components/HomeScreen";
import { LogIn } from "./components/LogIn";
import { Route, Routes } from "react-router-dom";
import { SignUp } from "./components/SignUp";

function App() {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<HomeScreen />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
