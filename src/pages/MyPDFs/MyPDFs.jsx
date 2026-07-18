import "./MyPDFs.css";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import SearchBar from "../../components/SearchBar/SearchBar";
import PDFCard from "../../components/PDFCard/PDFCard";

function MyPDFs() {
  return (
    <DashboardLayout>
      <div className="mypdfs-page">

        <div className="mypdfs-header">
          <h1>My PDFs</h1>
          <p>All your uploaded study materials are available here.</p>
        </div>

        <SearchBar />

        <div className="pdf-grid">

          <PDFCard
            title="Operating System Notes"
            date="20 July 2026"
            size="2.3 MB"
          />

          <PDFCard
            title="DBMS Notes"
            date="18 July 2026"
            size="3.1 MB"
          />

          <PDFCard
            title="React Notes"
            date="15 July 2026"
            size="1.8 MB"
          />

          <PDFCard
            title="Computer Networks"
            date="10 July 2026"
            size="2.9 MB"
          />

        </div>

      </div>
    </DashboardLayout>
  );
}

export default MyPDFs;