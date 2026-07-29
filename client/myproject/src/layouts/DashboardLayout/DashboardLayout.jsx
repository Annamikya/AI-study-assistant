import "./DashboardLayout.css";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;