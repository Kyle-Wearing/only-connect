import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../src/styles/App.css";
import { Default } from "./components/Default";
import { SignUp } from "./components/SignUp";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { Profile } from "./components/Profile";
import { QuizzesHome } from "./components/QuizzesHome";
import { PlayQuiz } from "./components/PlayQuiz";
import { EditQuiz } from "./components/EditQuiz";
import { CreateQuiz } from "./components/CreateQuiz";
import { EndQuiz } from "./components/EndQuiz";
import { HostScreen } from "./components/hostScreen/HostScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Default />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/quizzes/:quiz_id/home" element={<QuizzesHome />} />
        <Route path="/quizzes/:quiz_id/play" element={<PlayQuiz />} />
        <Route path="/quizzes/:quiz_id/edit" element={<EditQuiz />} />
        <Route path="/quizzes/:quiz_id/host" element={<HostScreen />} />
        <Route path="/quizzes/create" element={<CreateQuiz />} />
        <Route path="/quizzes/scores" element={<EndQuiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
