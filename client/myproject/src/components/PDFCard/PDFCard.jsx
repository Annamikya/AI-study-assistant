import "./PDFCard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PDFCard({
  id,
  title,
  date,
  size,
  uploadedBy,
  onDelete,
}) {

  const navigate = useNavigate();

  const selectPDF = () => {
    localStorage.setItem("pdfId", id);
  };

  const handleOpen = () => {
    selectPDF();
    navigate(`/pdf-viewer/${id}`);
  };

  const handleSummary = () => {
    selectPDF();
    navigate(`/summary/${id}`);
  };

  const handleQuiz = () => {
    selectPDF();
    navigate("/quiz");
  };

  const handleChat = () => {
    selectPDF();
    navigate("/chat");
  };

  

const handleFlashcards = async () => {
  try {
    localStorage.setItem("flashcardPdfId", id);

    await axios.post(
      "http://localhost:5000/api/flashcards/generate",
      {
        pdfId: id,
      }
    );

    navigate("/flashcards");
  } catch (err) {
    console.log(err);
    alert("Flashcard Generation Failed");
  }
};

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this PDF?")) {
      onDelete(id);
    }
  };

  return (
    <div className="pdf-card">

      <div className="pdf-icon">📄</div>

      <h3>{title}</h3>

      <p>
        <strong>Uploaded By:</strong> {uploadedBy?.name}
      </p>

      <p>
        <strong>Email:</strong> {uploadedBy?.email}
      </p>

      <p>
        <strong>Date:</strong> {date}
      </p>

      <p>
        <strong>Size:</strong> {size}
      </p>

      <div className="pdf-buttons">

        <button className="open-btn" onClick={handleOpen}>
          Open
        </button>

        <button className="summary-btn" onClick={handleSummary}>
          Summary
        </button>

        <button className="quiz-btn" onClick={handleQuiz}>
          Quiz
        </button>

        <button className="chat-btn" onClick={handleChat}>
          Chat
        </button>

        <button className="flash-btn" onClick={handleFlashcards}>
          Flashcards
        </button>

        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>

      </div>

    </div>
  );
}

export default PDFCard;