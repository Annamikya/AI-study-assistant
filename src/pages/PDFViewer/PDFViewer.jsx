import "./PDFViewer.css";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import ChatPanel from "../../components/ChatPanel/ChatPanel";

function PDFViewer() {
  return (
    <DashboardLayout>
      <div className="pdf-viewer-page">

        <h1>PDF Viewer</h1>

        <p>
          View your uploaded study material here.
        </p>


        <div className="pdf-toolbar">

          <button>⬅ Previous</button>

          <span>Page 1 of 10</span>

          <button>Next ➡</button>

        </div>

        <div className="pdf-container">

          <div className="pdf-placeholder">
            PDF will be displayed here.
            <ChatPanel />
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default PDFViewer;