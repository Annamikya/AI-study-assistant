import "./Sidebar.css";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaFilePdf,
  FaUpload,
  FaRobot,
  FaStickyNote,
  FaLayerGroup,
  FaQuestionCircle,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>StudyAI</h2>
      </div>

      <ul className="sidebar-menu">
        <li>
          <FaHome className="icon" />
          <Link to="/dashboard">Dashboard</Link>
        </li>

        <li>
          <FaUpload className="icon" />
          
          <Link to="/upload">Upload</Link>
        </li>

        <li>
          <FaFilePdf className="icon" />
          <span>My PDFs</span>
        </li>

        <li>
          <FaRobot className="icon" />
          <span>AI Chat</span>
        </li>

        <li>
          <FaStickyNote className="icon" />
          <span>Notes</span>
        </li>

        <li>
          <FaLayerGroup className="icon" />
          <span>Flashcards</span>
        </li>

        <li>
          <FaQuestionCircle className="icon" />
          <span>Quiz</span>
        </li>

        <li>
          <FaUser className="icon" />
          <span>Profile</span>
        </li>

        <li>
          <FaCog className="icon" />
          <span>Settings</span>
        </li>
      </ul>

      <div className="sidebar-footer">
        <button className="logout-btn">
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;