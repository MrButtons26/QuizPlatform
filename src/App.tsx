import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import CreateQuiz from "./pages/createQuiz";
import MyQuiz from "./pages/myQuizzes";
import PlayQuiz from "./pages/playquiz";
import PageNotFound from "./pages/notFound";
import { useEffect } from "react";
function App() {
  useEffect(() => {
    document.title = "QuizApp";
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myquizzes" element={<MyQuiz />} />
        <Route path="/createquiz" element={<CreateQuiz />} />
        <Route path="/playquiz" element={<PlayQuiz />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
