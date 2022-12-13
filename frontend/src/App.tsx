import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import CreateUser from "./Pages/CreateUser";
import Login from "./Pages/Login";
import Quiz from "./Pages/Quiz";
import Result from "./Pages/Result";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/" element={<Layout />}>
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
