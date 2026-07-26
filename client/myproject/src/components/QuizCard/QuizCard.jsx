import "./QuizCard.css";

function QuizCard({
  question,
  option1,
  option2,
  option3,
  option4,
}) {
  return (
    <div className="quiz-card">

      <h2>{question}</h2>

      <div className="options">

        <button>{option1}</button>

        <button>{option2}</button>

        <button>{option3}</button>

        <button>{option4}</button>

      </div>

    </div>
  );
}

export default QuizCard;