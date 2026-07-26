import "./SelectFlashcardPDF.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";

function SelectFlashcardPDF() {
  const [pdfs, setPdfs] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchPDFs();
  }, []);

  const fetchPDFs = async () => {
    try {
      const res = await axios.get("https://ai-study-assistant-backend-9lrh.onrender.com/api/pdf");

      setPdfs(res.data.pdfs || []);
    } catch (err) {
      console.log("PDF FETCH ERROR:", err);

      alert(
        err.response?.data?.message ||
          "Unable to fetch PDFs"
      );
    }
  };

  const generateFlashcards = async (pdfId) => {
    try {
      setLoadingId(pdfId);

      localStorage.setItem("flashcardPdfId", pdfId);

      const res = await axios.post(
        "https://ai-study-assistant-backend-9lrh.onrender.com/api/flashcards/generate",
        {
          pdfId,
        }
      );

      alert(res.data.message);

      navigate("/flashcards");
    } catch (err) {
      console.log("FLASHCARD GENERATION ERROR:", err);

      alert(
        err.response?.data?.message ||
          "Flashcard Generation Failed"
      );
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="select-flashcard-page">
        <h1>Select PDF for Flashcards</h1>

        <p className="select-flashcard-description">
          Choose an uploaded PDF to generate AI flashcards.
        </p>

        <div className="flashcard-pdf-grid">
          {pdfs.length === 0 ? (
            <h2>No PDFs Uploaded</h2>
          ) : (
            pdfs.map((pdf) => (
              <div
                className="flashcard-pdf-card"
                key={pdf._id}
              >
                <div className="pdf-icon">📄</div>

                <h3>{pdf.title}</h3>

                <p>
                  Uploaded By:{" "}
                  {pdf.uploadedBy?.name || "Unknown"}
                </p>

                <p>
                  {pdf.createdAt
                    ? new Date(
                        pdf.createdAt
                      ).toLocaleDateString()
                    : "Date unavailable"}
                </p>

                <button
                  onClick={() =>
                    generateFlashcards(pdf._id)
                  }
                  disabled={loadingId !== null}
                >
                  {loadingId === pdf._id
                    ? "Generating..."
                    : "Generate Flashcards"}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default SelectFlashcardPDF;