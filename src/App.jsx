import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Default } from "./components/Default";
import { SignUp } from "./components/SignUp";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { Profile } from "./components/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Default />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/quizzes-home" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
