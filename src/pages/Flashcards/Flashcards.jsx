import "./Flashcards.css";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import Flashcard from "../../components/Flashcard/Flashcard";

function Flashcards() {
  return (
    <DashboardLayout>
      <div className="flashcards-page">

        <div className="flashcards-header">
          <h1>🧠 AI Flashcards</h1>
          <p>Study smarter by flipping through AI-generated flashcards.</p>
        </div>

        <Flashcard
          question="What is React?"
          answer="React is a JavaScript library for building user interfaces."
        />

        <div className="navigation-buttons">
          <button className="prev-btn">⬅ Previous</button>
          <button className="next-btn">Next ➡</button>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default Flashcards;