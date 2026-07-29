import "./Upload.css";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import UploadCard from "../../components/UploadCard/UploadCard";

function Upload() {
  return (
    <DashboardLayout>
      <div className="upload-page">
        <h1>Upload Study Material</h1>
        <p>Upload your PDF to generate summaries, quizzes and flashcards.</p>

        <UploadCard />
      </div>
    </DashboardLayout>
  );
}

export default Upload;