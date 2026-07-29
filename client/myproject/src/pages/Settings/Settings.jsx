import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSignOutAlt,
  FaCalendarAlt,
  FaSave,
} from "react-icons/fa";

import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import "./Settings.css";

function Settings() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    joinedDate: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] =
    useState("");

  const fetchAccountInformation = useCallback(
    async () => {
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

        setUser(response.data.user);
      } catch (error) {
        console.error(
          "Settings profile fetch error:",
          error
        );

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        setError(
          error.response?.data?.message ||
            "Unable to load account information"
        );
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  useEffect(() => {
    fetchAccountInformation();
  }, [fetchAccountInformation]);

  const handlePasswordInputChange = (event) => {
    const { name, value } = event.target;

    setPasswordData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setError("");
    setSuccessMessage("");
  };

  const togglePasswordVisibility = (fieldName) => {
    setShowPasswords((previousValues) => ({
      ...previousValues,
      [fieldName]: !previousValues[fieldName],
    }));
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();

    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = passwordData;

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      setError("Please fill in all password fields");
      return;
    }

    if (newPassword.length < 6) {
      setError(
        "New password must contain at least 6 characters"
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(
        "New password and confirm password do not match"
      );
      return;
    }

    if (currentPassword === newPassword) {
      setError(
        "New password must be different from current password"
      );
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccessMessage("");

      const token = localStorage.getItem("token");

      const response = await axios.put(
        "https://ai-study-assistant-backend-9lrh.onrender.com/api/users/change-password",
        passwordData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage(response.data.message);

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      /*
        Password change hone ke baad token remove hoga
        aur user dobara login karega.
      */
      setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("pdfId");
        navigate("/login");
      }, 2000);
    } catch (error) {
  const message =
    error.response?.data?.message ||
    "Unable to change password";

  setError(message);
  setSuccessMessage("");

  // 401 wrong password ke case me console error print mat karo
  if (!error.response || error.response.status >= 500) {
    console.error("Change password error:", error);
  }
} finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("pdfId");

    navigate("/login", {
      replace: true,
    });
  };

  const formatDate = (date) => {
    if (!date) {
      return "Not available";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="settings-loading">
          <div className="settings-loader"></div>
          <p>Loading settings...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="settings-page">
        <div className="settings-heading">
          <h1>Settings</h1>

          <p>
            Manage your account, password and login
            preferences.
          </p>
        </div>

        {error && (
          <div className="settings-message settings-error">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="settings-message settings-success">
            {successMessage}
          </div>
        )}

        {/* Account Information */}

        <section className="settings-card">
          <div className="settings-card-heading">
            <div className="settings-heading-icon">
              <FaUser />
            </div>

            <div>
              <h2>Account Information</h2>
              <p>Your basic account details</p>
            </div>
          </div>

          <div className="account-information-grid">
            <div className="account-information-item">
              <FaUser />

              <div>
                <span>Full Name</span>
                <strong>
                  {user.name || "Not available"}
                </strong>
              </div>
            </div>

            <div className="account-information-item">
              <FaEnvelope />

              <div>
                <span>Email Address</span>
                <strong>
                  {user.email || "Not available"}
                </strong>
              </div>
            </div>

            <div className="account-information-item">
              <FaCalendarAlt />

              <div>
                <span>Joined Date</span>
                <strong>
                  {formatDate(user.joinedDate)}
                </strong>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="settings-profile-button"
            onClick={() => navigate("/profile")}
          >
            Edit Profile
          </button>
        </section>

        {/* Change Password */}

        <section className="settings-card">
  <div className="settings-card-heading">
    <div className="settings-heading-icon">
      <FaLock />
    </div>

    <div>
      <h2>Change Password</h2>
      <p>
        Use a strong password that you do not use elsewhere.
      </p>
    </div>
  </div>

  {error && (
    <div className="settings-message settings-error">
      {error}
    </div>
  )}

  {successMessage && (
    <div className="settings-message settings-success">
      {successMessage}
    </div>
  )}

  <form
    className="password-form"
    onSubmit={handleChangePassword}
  >
            <PasswordInput
              id="currentPassword"
              name="currentPassword"
              label="Current Password"
              value={passwordData.currentPassword}
              visible={showPasswords.currentPassword}
              onChange={handlePasswordInputChange}
              onToggle={() =>
                togglePasswordVisibility(
                  "currentPassword"
                )
              }
              placeholder="Enter current password"
            />

            <PasswordInput
              id="newPassword"
              name="newPassword"
              label="New Password"
              value={passwordData.newPassword}
              visible={showPasswords.newPassword}
              onChange={handlePasswordInputChange}
              onToggle={() =>
                togglePasswordVisibility("newPassword")
              }
              placeholder="Enter new password"
            />

            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm New Password"
              value={passwordData.confirmPassword}
              visible={showPasswords.confirmPassword}
              onChange={handlePasswordInputChange}
              onToggle={() =>
                togglePasswordVisibility(
                  "confirmPassword"
                )
              }
              placeholder="Confirm new password"
            />

            <p className="password-help-text">
              Password must contain at least 6 characters.
            </p>

            <button
              type="submit"
              className="change-password-button"
              disabled={saving}
            >
              <FaSave />

              {saving
                ? "Changing Password..."
                : "Change Password"}
            </button>
          </form>
        </section>

        {/* Logout */}

        <section className="settings-card logout-card">
          <div className="settings-card-heading">
            <div className="settings-heading-icon logout-icon">
              <FaSignOutAlt />
            </div>

            <div>
              <h2>Logout</h2>
              <p>
                End your current session on this device.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="settings-logout-button"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            Logout
          </button>
        </section>
      </div>
    </DashboardLayout>
  );
}

function PasswordInput({
  id,
  name,
  label,
  value,
  visible,
  onChange,
  onToggle,
  placeholder,
}) {
  return (
    <div className="settings-form-group">
      <label htmlFor={id}>{label}</label>

      <div className="password-input-wrapper">
        <input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="off"
        />

        <button
          type="button"
          className="password-toggle-button"
          onClick={onToggle}
          aria-label={
            visible ? "Hide password" : "Show password"
          }
        >
          {visible ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>
  );
}

export default Settings;