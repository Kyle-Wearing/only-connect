import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Default } from "./components/Default";
import { SignUp } from "./components/SignUp";
import { Login } from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Default />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
