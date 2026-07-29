import "./Summary.css";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Summary() {
  const { id } = useParams();

  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateSummary = async () => {
    try {
      const res = await axios.post(
        "https://ai-study-assistant-backend-9lrh.onrender.com/api/summary/generate",
        {
          pdfId: id,
        }
      );

      setSummary(res.data.summary.summary);
    } catch (error) {
      console.log(error);
      alert("Unable to generate summary");
    }

    setLoading(false);
  };
    generateSummary();
  }, 
  [id]);

  
  return (
    <DashboardLayout>
      <div className="summary-page">

        <h1>AI Summary</h1>

        {loading ? (
          <h2>Generating Summary...</h2>
        ) : (
          <div className="summary-box">
            {summary}
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}

export default Summary;