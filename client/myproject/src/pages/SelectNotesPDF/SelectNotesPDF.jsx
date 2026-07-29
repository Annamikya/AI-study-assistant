import "./SelectNotesPDF.css";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";

function SelectNotesPDF() {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPdfId, setSelectedPdfId] =
    useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchPDFs = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");

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

      console.log(
        "PDF fetch response:",
        response.data
      );

      setPdfs(response.data.pdfs || []);
    } catch (error) {
      console.error("PDF FETCH ERROR:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("notesPdfId");

        alert(
          "Session expired. Please login again."
        );

        navigate("/login", {
          replace: true,
        });

        return;
      }

      setError(
        error.response?.data?.message ||
          "Unable to fetch PDFs."
      );
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchPDFs();
  }, [fetchPDFs]);

  const openNotes = async (pdfId) => {
    try {
      setSelectedPdfId(pdfId);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");

        navigate("/login", {
          replace: true,
        });

        return;
      }

      // Selected PDF ki ID save karo
      localStorage.setItem("notesPdfId", pdfId);

      // Selected PDF ke notes generate/update karo
      const response = await axios.post(
        "https://ai-study-assistant-backend-9lrh.onrender.com/api/notes/generate",
        {
          pdfId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "Notes generation response:",
        response.data
      );

      navigate("/notes");
    } catch (error) {
      console.error(
        "NOTES GENERATION ERROR:",
        error
      );

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("notesPdfId");

        alert(
          "Session expired. Please login again."
        );

        navigate("/login", {
          replace: true,
        });

        return;
      }

      setError(
        error.response?.data?.message ||
          "Unable to generate notes."
      );
    } finally {
      setSelectedPdfId(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="select-notes-page">
        <div className="select-notes-header">
          <h1>Select PDF for Notes</h1>

          <p>
            Choose one of your uploaded PDFs to
            generate or view notes.
          </p>
        </div>

        {error && (
          <div className="notes-error-message">
            {error}
          </div>
        )}

        {loading ? (
          <div className="notes-loading">
            <h2>Loading PDFs...</h2>
          </div>
        ) : (
          <div className="notes-pdf-grid">
            {pdfs.length === 0 ? (
              <div className="no-pdfs-message">
                <h2>No PDFs Uploaded Yet</h2>

                <p>
                  Upload a PDF before creating
                  notes.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/upload")
                  }
                >
                  Upload PDF
                </button>
              </div>
            ) : (
              pdfs.map((pdf) => (
                <div
                  className="notes-pdf-card"
                  key={pdf._id}
                >
                  <div className="pdf-icon">
                    📄
                  </div>

                  <h3>
                    {pdf.title ||
                      "Untitled PDF"}
                  </h3>

                  <p>
                    Uploaded on:{" "}
                    {pdf.createdAt
                      ? new Date(
                          pdf.createdAt
                        ).toLocaleDateString(
                          "en-IN"
                        )
                      : "Date unavailable"}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      openNotes(pdf._id)
                    }
                    disabled={
                      selectedPdfId === pdf._id
                    }
                  >
                    {selectedPdfId === pdf._id
                      ? "Generating Notes..."
                      : "Generate Notes"}
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default SelectNotesPDF;