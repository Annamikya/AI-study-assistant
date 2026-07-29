import "./MyPDFs.css";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import PDFCard from "../../components/PDFCard/PDFCard";

import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

function MyPDFs() {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchPDFs = useCallback(async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        navigate("/login");
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

      console.log(response.data);

      setPdfs(response.data.pdfs || []);
    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
        return;
      }

      alert(
        error.response?.data?.message ||
          "Unable to fetch PDFs"
      );
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchPDFs();
  }, [fetchPDFs]);

  // Delete PDF
  const deletePDF = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete(
        `https://ai-study-assistant-backend-9lrh.onrender.com/api/pdf/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      fetchPDFs();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Delete Failed"
      );
    }
  };

  return (
    <DashboardLayout>
      <div className="mypdfs-page">
        <div className="mypdfs-header">
          <h1>My PDFs</h1>

          <p>
            All your uploaded study materials are available
            here.
          </p>
        </div>

        {loading ? (
          <h2>Loading PDFs...</h2>
        ) : (
          <div className="pdf-grid">
            {pdfs.length === 0 ? (
              <h2>No PDFs Uploaded Yet</h2>
            ) : (
              pdfs.map((pdf) => (
                <PDFCard
                  key={pdf._id}
                  id={pdf._id}
                  title={pdf.title}
                  uploadedBy={pdf.uploadedBy}
                  date={new Date(
                    pdf.createdAt
                  ).toLocaleDateString()}
                  size="PDF File"
                  onDelete={deletePDF}
                />
              ))
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default MyPDFs;