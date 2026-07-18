import "./Navbar.css";

import { Link } from "react-router-dom";
import { FaRobot } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">

      <div className="logo">
        <FaRobot className="logo-icon" />
        <span>StudyAI</span>
      </div>

      <ul className={menuOpen ? "nav-links active" : "nav-links"}>

        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link to="/upload">Upload</Link>
        </li>

        <li>
          <Link to="/chat">AI Chat</Link>
        </li>

        <li>
          <Link to="/notes">Notes</Link>
        </li>

      </ul>

      <div className="nav-buttons">

        <Link to="/login">
          <button className="login-btn">
            Login
          </button>
        </Link>

        <Link to="/register">
          <button className="signup-btn">
            Sign Up
          </button>
        </Link>

      </div>

      <div
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <HiX /> : <HiMenu />}
      </div>

    </nav>
  );
}

export default Navbar;