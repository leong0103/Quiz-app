import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Quiz from "./Components/Quiz";
import Result from "./Components/Result";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
