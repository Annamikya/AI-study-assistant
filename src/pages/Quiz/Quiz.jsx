import "./Quiz.css";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import QuizCard from "../../components/QuizCard/QuizCard";

function Quiz() {
  return (
    <DashboardLayout>
      <div className="quiz-page">

        <div className="quiz-header">
          <h1>📝 AI Quiz</h1>
          <p>Test your understanding with AI-generated questions.</p>
        </div>

        <QuizCard
          question="What is React?"
          option1="A JavaScript Library"
          option2="A Database"
          option3="A Programming Language"
          option4="An Operating System"
        />

        <div className="quiz-buttons">
          <button className="prev-btn">⬅ Previous</button>
          <button className="next-btn">Next ➡</button>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default Quiz;