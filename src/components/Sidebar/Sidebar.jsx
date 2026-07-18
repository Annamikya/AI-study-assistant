import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import {
  FaFilePdf,
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
    to="/flashcards"
    className={({ isActive }) =>
      isActive ? "sidebar-link active" : "sidebar-link"
    }
  >
    <FaLayerGroup className="icon" />
    <span>Flashcards</span>
  </NavLink>
</li>

        <li>
          <NavLink
            to="/quiz"
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

      <div className="sidebar-footer">
        <button className="logout-btn">
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;