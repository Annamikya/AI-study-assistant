import "./Dashboard.css";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";

import SearchBar from "../../components/SearchBar/SearchBar";

import {
  FaFilePdf,
  FaRobot,
  FaLayerGroup,
  FaQuestionCircle,
} from "react-icons/fa";

function Dashboard() {
  return (
    <DashboardLayout>
      <div className="dashboard-page">

        {/* Welcome Section */}
        <div className="welcome-section">
          <div>
            <h1>Welcome Back 👋</h1>
            <p>Ready to continue your learning journey?</p>


            <SearchBar/>

            
          </div>

          
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">

          <div className="stats-card">
            <FaFilePdf className="stats-icon" />
            <h2>12</h2>
            <p>Uploaded PDFs</p>
          </div>

          <div className="stats-card">
            <FaRobot className="stats-icon" />
            <h2>48</h2>
            <p>AI Chats</p>
          </div>

          <div className="stats-card">
            <FaLayerGroup className="stats-icon" />
            <h2>30</h2>
            <p>Flashcards</p>
          </div>

          <div className="stats-card">
            <FaQuestionCircle className="stats-icon" />
            <h2>8</h2>
            <p>Quizzes</p>

          </div>

          

        </div>

        {/* Quick Actions  */}

        <div className="section">

           <h2>Quick Actions</h2>

          <div className="action-buttons"> 

             <button>Upload PDF</button>

            <button>AI Chat</button>

            <button>Generate Quiz</button>

            <button>Create Flashcards</button> 

           </div>

        </div> 

        {/* Recent PDFs */}

        <div className="section">

          <h2>Recent PDFs</h2>

          <div className="pdf-list">

            <div className="pdf-item">
              Operating System.pdf
            </div>

            <div className="pdf-item">
              React Notes.pdf
            </div>

            <div className="pdf-item">
              DBMS Unit-2.pdf
            </div>

          </div>

        </div>

        {/* Progress */}

        <div className="section">

          <h2>Study Progress</h2>

          <div className="progress-container">

            <div className="progress-bar"></div>

          </div>

          <span>75% Completed</span>

        </div>

        {/* Activity */}

        <div className="section">

          <h2>Recent Activity</h2>

          <ul className="activity-list">

            <li>Uploaded React Notes.pdf</li>

            <li>Generated AI Summary</li>

            <li>Created Flashcards</li>

            <li>Completed Quiz</li>

          </ul>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Dashboard;