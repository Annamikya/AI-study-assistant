import "./DashboardLayout.css";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";



function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">

      {/* Top Navigation */}
      <Navbar />
      

      {/* Sidebar */}
      <Sidebar />

      

      {/* Main Content */}
      <main className="dashboard-content">
        {children}
      </main>

    </div>
  );
}

export default DashboardLayout;