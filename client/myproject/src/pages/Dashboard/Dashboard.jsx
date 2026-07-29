import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Dashboard.css";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";

import {
  FaFilePdf,
  FaLayerGroup,
  FaQuestionCircle,
  FaStickyNote,
} from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState({
    user: {
      name: "",
      email: "",
    },

    stats: {
      totalPDFs: 0,
      totalQuizzes: 0,
      totalFlashcards: 0,
      totalNotes: 0,
    },

    recentPDFs: [],
    recentActivities: [],
    studyProgress: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(
        "https://ai-study-assistant-backend-9lrh.onrender.com/api/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDashboardData(response.data);
    } catch (error) {
      console.error("Dashboard fetch error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      setError(
        error.response?.data?.message ||
          "Unable to load dashboard data"
      );
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const formatDate = (date) => {
    if (!date) {
      return "Date unavailable";
    }

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const openPDF = (pdfId) => {
    localStorage.setItem("pdfId", pdfId);
    navigate(`/pdf/${pdfId}`);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="dashboard-state">
          <div className="dashboard-loader"></div>
          <p>Loading dashboard...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="dashboard-page">
        {error && (
          <div className="dashboard-error">
            <p>{error}</p>

            <button type="button" onClick={fetchDashboardData}>
              Try Again
            </button>
          </div>
        )}

        {/* Welcome Section */}

        <div className="welcome-section">
          <div className="welcome-content">
            <h1>
              Welcome Back
              {dashboardData.user?.name
                ? `, ${dashboardData.user.name}`
                : ""}{" "}
              👋
            </h1>

            <p>Ready to continue your learning journey?</p>
          </div>
        </div>

        {/* Statistics */}

        <div className="stats-grid">
          <div className="stats-card">
            <FaFilePdf className="stats-icon" />

            <h2>{dashboardData.stats?.totalPDFs || 0}</h2>

            <p>Uploaded PDFs</p>
          </div>

          <div className="stats-card">
            <FaStickyNote className="stats-icon" />

            <h2>{dashboardData.stats?.totalNotes || 0}</h2>

            <p>Generated Notes</p>
          </div>

          <div className="stats-card">
            <FaLayerGroup className="stats-icon" />

            <h2>{dashboardData.stats?.totalFlashcards || 0}</h2>

            <p>Flashcards</p>
          </div>

          <div className="stats-card">
            <FaQuestionCircle className="stats-icon" />

            <h2>{dashboardData.stats?.totalQuizzes || 0}</h2>

            <p>Generated Quizzes</p>
          </div>
        </div>

        {/* Quick Actions */}

        <div className="section">
          <h2>Quick Actions</h2>

          <div className="action-buttons">
            <button
              type="button"
              onClick={() => navigate("/upload")}
            >
              Upload PDF
            </button>

            <button
              type="button"
              onClick={() => navigate("/my-pdfs")}
            >
              My PDFs
            </button>

            <button
              type="button"
              onClick={() => navigate("/select-quiz-pdf")}
            >
              Generate Quiz
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/select-flashcard-pdf")
              }
            >
              Create Flashcards
            </button>

            <button
              type="button"
              onClick={() => navigate("/select-notes-pdf")}
            >
              Generate Notes
            </button>
          </div>
        </div>

        {/* Recent PDFs */}

        <div className="section">
          <div className="section-heading">
            <h2>Recent PDFs</h2>

            <button
              type="button"
              className="text-button"
              onClick={() => navigate("/my-pdfs")}
            >
              View All
            </button>
          </div>

          <div className="pdf-list">
            {dashboardData.recentPDFs?.length > 0 ? (
              dashboardData.recentPDFs.map((pdf) => (
                <div className="pdf-item" key={pdf._id}>
                  <div className="pdf-info">
                    <FaFilePdf />

                    <div>
                      <h3>{pdf.title || pdf.filename}</h3>

                      <span>
                        Uploaded{" "}
                        {formatDate(
                          pdf.createdAt || pdf.uploadDate
                        )}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="open-pdf-button"
                    onClick={() => openPDF(pdf._id)}
                  >
                    Open
                  </button>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>No PDFs uploaded yet.</p>

                <button
                  type="button"
                  onClick={() => navigate("/upload")}
                >
                  Upload Your First PDF
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Study Progress */}

        <div className="section">
          <h2>Study Progress</h2>

          <div className="progress-header">
            <span>Content generation progress</span>

            <strong>
              {dashboardData.studyProgress || 0}%
            </strong>
          </div>

          <div className="progress-container">
            <div
              className="progress-bar"
              style={{
                width: `${dashboardData.studyProgress || 0}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Recent Activity */}

        <div className="section">
          <h2>Recent Activity</h2>

          {dashboardData.recentActivities?.length > 0 ? (
            <ul className="activity-list">
              {dashboardData.recentActivities.map(
                (activity, index) => (
                  <li
                    key={`${activity.type}-${activity.date}-${index}`}
                  >
                    <div>
                      <span className="activity-dot"></span>

                      <div>
                        <p>{activity.message}</p>

                        <small>
                          {formatDate(activity.date)}
                        </small>
                      </div>
                    </div>
                  </li>
                )
              )}
            </ul>
          ) : (
            <p className="empty-message">
              No recent activity available.
            </p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;