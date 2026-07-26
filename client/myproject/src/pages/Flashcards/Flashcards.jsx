import "./Flashcards.css";
import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import Flashcard from "../../components/Flashcard/Flashcard";

function Flashcards() {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const pdfId = localStorage.getItem("flashcardPdfId");

      if (!pdfId) {
        alert("No PDF selected.");
        return;
      }

      const res = await axios.get(
        `http://localhost:5000/api/flashcards/${pdfId}`
      );

      setCards(res.data.flashcards.cards);
    } catch (err) {
      console.log(err);
      alert("Unable to load flashcards.");
    } finally {
      setLoading(false);
    }
  };

  const nextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const previousCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <h2>Loading...</h2>
      </DashboardLayout>
    );
  }

  if (cards.length === 0) {
    return (
      <DashboardLayout>
        <h2>No Flashcards Found</h2>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flashcards-page">

        <div className="flashcards-header">
          <h1>🧠 AI Flashcards</h1>
          <p>
            Card {currentIndex + 1} of {cards.length}
          </p>
        </div>

        <Flashcard
          key={currentIndex}
          question={cards[currentIndex].question}
          answer={cards[currentIndex].answer}
        />

        <div className="navigation-buttons">
          <button
            className="prev-btn"
            onClick={previousCard}
            disabled={currentIndex === 0}
          >
            ⬅ Previous
          </button>

          <button
            className="next-btn"
            onClick={nextCard}
            disabled={currentIndex === cards.length - 1}
          >
            Next ➡
          </button>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default Flashcards;