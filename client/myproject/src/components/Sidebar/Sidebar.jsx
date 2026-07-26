import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { FaRobot } from "react-icons/fa";
import {
  FaFilePdf,
  FaLayerGroup,
  FaQuestionCircle,
  FaUser,
  FaCog,
  
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <FaRobot className="logo-icon" />
        <h2>StudyAI</h2>
      </div>

      <ul className="sidebar-menu">

        <li>
          <NavLink
            to="/mypdfs"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <FaFilePdf className="icon" />
            <span>My PDFs</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/select-flashcard-pdf"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <FaLayerGroup className="icon" />
            <span>Flashcards</span>
          </NavLink>
        </li>

        {/* Quiz */}
        <li>
          <NavLink
            to="/select-quiz-pdf"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <FaQuestionCircle className="icon" />
            <span>Quiz</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <FaUser className="icon" />
            <span>Profile</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <FaCog className="icon" />
            <span>Settings</span>
          </NavLink>
        </li>

      </ul>

      

    </aside>
  );
}

export default Sidebar;