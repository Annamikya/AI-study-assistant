import "./Flashcard.css";
import { useState } from "react";

function Flashcard({ question, answer }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flashcard-container">
      <div
        className={`flashcard ${flipped ? "flipped" : ""}`}
        onClick={() => setFlipped(!flipped)}
      >
        <div className="flashcard-front">
          <h3>Question</h3>
          <p>{question}</p>
          <span className="hint">Click to view answer</span>
        </div>

        <div className="flashcard-back">
          <h3>Answer</h3>
          <p>{answer}</p>
          <span className="hint">Click to go back</span>
        </div>
      </div>
    </div>
  );
}

export default Flashcard;