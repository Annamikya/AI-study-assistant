import "./SelectQuizPDF.css";
import {
  useCallback,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";

function SelectQuizPDF() {
  const [pdfs, setPdfs] = useState([]);
  const [fetchingPdfs, setFetchingPdfs] =
    useState(true);

  const [generatingPdfId, setGeneratingPdfId] =
    useState(null);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchPDFs = useCallback(async () => {
    try {
      setFetchingPdfs(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login", {
          replace: true,
        });
        return;
      }

      const response = await axios.get(
        "https://ai-study-assistant-backend-9lrh.onrender.com/api/pdf",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPdfs(response.data.pdfs || []);
    } catch (err) {
      console.error("Fetch PDFs error:", err);

      if (err.response?.status === 401) {
        localStorage.removeItem("token");

        navigate("/login", {
          replace: true,
        });

        return;
      }

      setError(
        err.response?.data?.message ||
          "Unable to load PDFs"
      );
    } finally {
      setFetchingPdfs(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchPDFs();
  }, [fetchPDFs]);

  const generateQuiz = async (pdfId) => {
    try {
      setGeneratingPdfId(pdfId);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login", {
          replace: true,
        });
        return;
      }

      localStorage.setItem("pdfId", pdfId);

      const response = await axios.post(
        "https://ai-study-assistant-backend-9lrh.onrender.com/api/quiz/generate",
        {
          pdfId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        response.data.message ||
          "Quiz generated successfully"
      );

      navigate("/quiz");
    } catch (err) {
      console.error("Quiz generation error:", err);

      if (err.response?.status === 401) {
        localStorage.removeItem("token");

        navigate("/login", {
          replace: true,
        });

        return;
      }

      setError(
        err.response?.data?.message ||
          "Quiz generation failed"
      );
    } finally {
      setGeneratingPdfId(null);
    }
  };

  if (fetchingPdfs) {
    return (
      <DashboardLayout>
        <div className="select-quiz-page">
          <div className="quiz-loading">
            <div className="quiz-loading-spinner"></div>
            <p>Loading PDFs...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="select-quiz-page">
        <div className="select-quiz-heading">
          <h1>Select PDF for Quiz</h1>

          <p>
            Choose one of your uploaded PDFs to generate
            an AI-powered quiz.
          </p>
        </div>

        {error && (
          <div className="quiz-error-message">
            {error}
          </div>
        )}

        <div className="quiz-pdf-grid">
          {pdfs.length === 0 ? (
            <div className="no-pdfs-message">
              <div className="no-pdfs-icon">📄</div>

              <h2>No PDFs Uploaded</h2>

              <p>
                Upload a PDF first to generate a quiz.
              </p>

              <button
                type="button"
                onClick={() => navigate("/upload")}
              >
                Upload PDF
              </button>
            </div>
          ) : (
            pdfs.map((pdf) => {
              const isGenerating =
                generatingPdfId === pdf._id;

              return (
                <div
                  className="quiz-pdf-card"
                  key={pdf._id}
                >
                  <div className="pdf-icon">📄</div>

                  <h3>
                    {pdf.title ||
                      pdf.originalName ||
                      "Untitled PDF"}
                  </h3>

                  {pdf.uploadedBy?.name && (
                    <p>
                      Uploaded By:{" "}
                      {pdf.uploadedBy.name}
                    </p>
                  )}

                  <p>
                    Uploaded on:{" "}
                    {pdf.createdAt
                      ? new Date(
                          pdf.createdAt
                        ).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : "Date unavailable"}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      generateQuiz(pdf._id)
                    }
                    disabled={
                      generatingPdfId !== null
                    }
                  >
                    {isGenerating
                      ? "Generating Quiz..."
                      : "Generate Quiz"}
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default SelectQuizPDF;