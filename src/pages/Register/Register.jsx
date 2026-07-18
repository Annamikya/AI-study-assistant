import "./Register.css";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

function Register() {
  return (
    <div className="register-container">
      <div className="register-card">

        <h1>Create Account</h1>
        <p>Join AI Study Assistant and start learning smarter.</p>

        <form>

          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Full Name"
            />
          </div>

          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              placeholder="Email Address"
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Password"
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Confirm Password"
            />
          </div>

          <div className="terms">
            <label>
              <input type="checkbox" />
              I agree to the Terms & Conditions
            </label>
          </div>

          <button type="submit" className="register-btn">
            Create Account
          </button>

        </form>

        <p className="login-text">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;