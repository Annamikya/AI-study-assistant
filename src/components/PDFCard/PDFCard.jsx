import "./PDFCard.css";
import { useNavigate } from "react-router-dom";

function PDFCard({ title, date, size }) {
  const navigate = useNavigate();

  const handleOpen = () => {
    navigate("/pdf-viewer");
  };

  return (
    <div className="pdf-card">

      <div className="pdf-icon">
        📄
      </div>

      <h3>{title}</h3>

      <p><strong>Uploaded:</strong> {date}</p>

      <p><strong>Size:</strong> {size}</p>

      <div className="pdf-buttons">
        <button className="open-btn" onClick={handleOpen}>
          Open
        </button>

        <button className="delete-btn">
          Delete
        </button>
      </div>

    </div>
  );
}

export default PDFCard;