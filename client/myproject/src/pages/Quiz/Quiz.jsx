import "./Quiz.css";
import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const pdfId = localStorage.getItem("pdfId");

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/quiz/generate",
        { pdfId }
      );
      console.log("Quiz API Response:", res.data);

      setQuestions(res.data.quiz.questions);

    } catch (err) {
      console.log("Quiz Error:", err.response?.data || err.message);
    }
  };

  const handleNext = () => {
    const updatedAnswers = [...answers, selected];
    setAnswers(updatedAnswers);

    if (selected === questions[current].answer) {
      setScore(score + 1);
    }

    setSelected("");

    if (current + 1 === questions.length) {
      setFinished(true);
    } else {
      setCurrent(current + 1);
    }
  };

  if (questions.length === 0) {
    return (
      <DashboardLayout>
        <h2>Loading Quiz...</h2>
      </DashboardLayout>
    );
  }

  if (finished) {
    return (
      <DashboardLayout>
        <div className="quiz-result">
          <h1>🎉 Quiz Completed</h1>

          <h2>
            Your Score: {score} / {questions.length}
          </h2>
        </div>
      </DashboardLayout>
    );
  }

  const q = questions[current];

  return (
    <DashboardLayout>
      <div className="quiz-page">

        <div className="quiz-card">

          <h2>
            Question {current + 1} / {questions.length}
          </h2>

          <h3>{q.question}</h3>

          {q.options.map((option, index) => (

            <label key={index} className="option">

              <input
                type="radio"
                name="quiz"
                value={option}
                checked={selected === option}
                onChange={(e) => setSelected(e.target.value)}
              />

              {option}

            </label>

          ))}

          <button
            className="next-btn"
            disabled={!selected}
            onClick={handleNext}
          >
            {current === questions.length - 1
              ? "Finish Quiz"
              : "Next"}
          </button>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Quiz;