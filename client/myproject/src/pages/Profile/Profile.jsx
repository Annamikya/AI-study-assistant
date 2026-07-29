import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaFilePdf,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";

import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    joinedDate: "",
  });

  const [stats, setStats] = useState({
    totalPDFs: 0,
  });

  const [editedName, setEditedName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(
        "https://ai-study-assistant-backend-9lrh.onrender.com/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile(response.data.user);
      setStats(response.data.stats);
      setEditedName(response.data.user.name);
    } catch (error) {
      console.error("Profile fetch error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      setError(
        error.response?.data?.message ||
          "Unable to load profile"
      );
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleUpdateProfile = async (event) => {
    event.preventDefault();

    const trimmedName = editedName.trim();

    if (!trimmedName) {
      setError("Name is required");
      return;
    }

    if (trimmedName.length < 2) {
      setError("Name must contain at least 2 characters");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccessMessage("");

      const token = localStorage.getItem("token");

      const response = await axios.put(
        "https://ai-study-assistant-backend-9lrh.onrender.com/api/users/profile",
        {
          name: trimmedName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile(response.data.user);
      setEditedName(response.data.user.name);
      setIsEditing(false);

      setSuccessMessage(
        response.data.message || "Profile updated successfully"
      );

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Profile update error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  const cancelEditing = () => {
    setEditedName(profile.name);
    setIsEditing(false);
    setError("");
  };

  const formatDate = (date) => {
    if (!date) {
      return "Not available";
    }

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const getInitial = () => {
    return profile.name?.charAt(0)?.toUpperCase() || "U";
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="profile-loading">
          <div className="profile-loader"></div>
          <p>Loading profile...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="profile-page">
        <div className="profile-heading">
          <div>
            <h1>My Profile</h1>
            <p>View and manage your personal information.</p>
          </div>
        </div>

        {error && (
          <div className="profile-message profile-error-message">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="profile-message profile-success-message">
            {successMessage}
          </div>
        )}

        <div className="profile-grid">
          <div className="profile-card profile-summary-card">
            <div className="profile-avatar">
              {getInitial()}
            </div>

            <h2>{profile.name}</h2>
            <p>{profile.email}</p>

            <div className="profile-stat-box">
              <FaFilePdf />

              <div>
                <strong>{stats.totalPDFs || 0}</strong>
                <span>Uploaded PDFs</span>
              </div>
            </div>
          </div>

          <div className="profile-card profile-details-card">
            <div className="profile-card-header">
              <div>
                <h2>Personal Information</h2>
                <p>Your account details</p>
              </div>

              {!isEditing && (
                <button
                  type="button"
                  className="profile-edit-button"
                  onClick={() => {
                    setIsEditing(true);
                    setError("");
                    setSuccessMessage("");
                  }}
                >
                  <FaEdit />
                  Edit Profile
                </button>
              )}
            </div>

            <form onSubmit={handleUpdateProfile}>
              <div className="profile-form-group">
                <label htmlFor="profileName">
                  <FaUser />
                  Full Name
                </label>

                <input
                  id="profileName"
                  type="text"
                  value={editedName}
                  onChange={(event) =>
                    setEditedName(event.target.value)
                  }
                  disabled={!isEditing}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="profile-form-group">
                <label htmlFor="profileEmail">
                  <FaEnvelope />
                  Email Address
                </label>

                <input
                  id="profileEmail"
                  type="email"
                  value={profile.email}
                  disabled
                />

                <small>
                  Email address cannot be changed here.
                </small>
              </div>

              <div className="profile-form-group">
                <label htmlFor="profileJoinedDate">
                  <FaCalendarAlt />
                  Joined Date
                </label>

                <input
                  id="profileJoinedDate"
                  type="text"
                  value={formatDate(profile.joinedDate)}
                  disabled
                />
              </div>

              {isEditing && (
                <div className="profile-form-actions">
                  <button
                    type="button"
                    className="profile-cancel-button"
                    onClick={cancelEditing}
                    disabled={saving}
                  >
                    <FaTimes />
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="profile-save-button"
                    disabled={saving}
                  >
                    <FaSave />
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Profile;