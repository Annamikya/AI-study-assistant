import "./Notes.css";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";

function Notes() {
  const [note, setNote] = useState(null);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      setNote(null);

      const token =
        localStorage.getItem("token");

      const pdfId =
        localStorage.getItem("notesPdfId");

      if (!token) {
        alert("Please login first");

        navigate("/login", {
          replace: true,
        });

        return;
      }

      if (!pdfId) {
        setError(
          "No PDF selected. Please select a PDF first."
        );

        return;
      }

      const response = await axios.get(
        `http://localhost:5000/api/notes/${pdfId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "Notes fetch response:",
        response.data
      );

      setNote(response.data.note);
    } catch (error) {
      console.error(
        "NOTES FETCH ERROR:",
        error
      );

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem(
          "notesPdfId"
        );

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
          "Unable to load notes."
      );
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="notes-page message-box">
          <h2>Loading your study notes...</h2>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="notes-page message-box">
          <h2>{error}</h2>

          <button
            type="button"
            onClick={() =>
              navigate("/select-notes")
            }
          >
            Select PDF
          </button>
        </div>
      </DashboardLayout>
    );
  }

  if (
    !note ||
    !Array.isArray(note.notes) ||
    note.notes.length === 0
  ) {
    return (
      <DashboardLayout>
        <div className="notes-page message-box">
          <h2>No notes found.</h2>

          <button
            type="button"
            onClick={() =>
              navigate("/select-notes")
            }
          >
            Select Another PDF
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="notes-page">
        <div className="notes-header">
          <div>
            <h1>
              📝{" "}
              {note.title ||
                "AI Generated Notes"}
            </h1>

            <p>
              AI-generated notes prepared from
              your selected PDF.
            </p>
          </div>

          
        </div>

        <div className="notes-list">
          {note.notes.map(
            (section, index) => (
              <div
                className="note-section"
                key={`${section.heading}-${index}`}
              >
                <div className="section-number">
                  {index + 1}
                </div>

                <div className="section-content">
                  <h2>
                    {section.heading ||
                      `Section ${index + 1}`}
                  </h2>

                  {Array.isArray(
                    section.points
                  ) &&
                  section.points.length > 0 ? (
                    <ul>
                      {section.points.map(
                        (
                          point,
                          pointIndex
                        ) => (
                          <li
                            key={
                              pointIndex
                            }
                          >
                            {point}
                          </li>
                        )
                      )}
                    </ul>
                  ) : (
                    <p>
                      No points available.
                    </p>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Notes;