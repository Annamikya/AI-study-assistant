import "./PDFViewer.css";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function PDFViewer() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [pdfUrl, setPdfUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let objectUrl = "";

    const fetchPDF = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
          alert("Please login first");
          navigate("/login", { replace: true });
          return;
        }

        if (!id) {
          setError("PDF ID is missing");
          return;
        }

        const response = await axios.get(
          `https://ai-study-assistant-backend-9lrh.onrender.com/api/pdf/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },

            // PDF ko binary file ke roop me receive karne ke liye
            responseType: "blob",
          }
        );

        objectUrl = URL.createObjectURL(response.data);

        setPdfUrl(objectUrl);
      } catch (error) {
        console.error("PDF OPEN ERROR:", error);

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          alert("Session expired. Please login again.");

          navigate("/login", { replace: true });
          return;
        }

        if (error.response?.status === 404) {
          setError(
            error.response?.data?.message ||
              "PDF not found or you are not allowed to open it"
          );
          return;
        }

        setError("Unable to open PDF");
      } finally {
        setLoading(false);
      }
    };

    fetchPDF();

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [id, navigate]);

  return (
    <DashboardLayout>
      <div className="pdf-viewer-page">
        <div className="pdf-viewer-header">
          <h1>PDF Viewer</h1>

          <button
            type="button"
            onClick={() => navigate("/mypdfs")}
          >
            Back to My PDFs
          </button>
        </div>

        {loading && (
          <div className="pdf-viewer-message">
            <h2>Loading PDF...</h2>
          </div>
        )}

        {!loading && error && (
          <div className="pdf-viewer-message">
            <h2>{error}</h2>

            <button
              type="button"
              onClick={() => navigate("/mypdfs")}
            >
              Go to My PDFs
            </button>
          </div>
        )}

        {!loading && !error && pdfUrl && (
          <iframe
            src={pdfUrl}
            title="PDF Viewer"
            width="100%"
            height="750px"
            style={{
              border: "none",
              borderRadius: "10px",
            }}
          />
        )}
      </div>
    </DashboardLayout>
  );
}

export default PDFViewer;