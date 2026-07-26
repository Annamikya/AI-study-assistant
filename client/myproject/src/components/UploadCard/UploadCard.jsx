import "./UploadCard.css";
import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UploadCard() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (file.type !== "application/pdf") {
      alert("Please select only a PDF file");
      e.target.value = "";
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    setTitle(file.name.replace(/\.pdf$/i, ""));
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a PDF");
      return;
    }

    if (!title.trim()) {
      alert("Please enter a PDF title");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    const formData = new FormData();

    formData.append("pdf", selectedFile);
    formData.append("title", title.trim());

    try {
      setUploading(true);

      const response = await axios.post(
        "http://localhost:5000/api/pdf/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Upload response:", response.data);

      if (response.data?.pdf?._id) {
        localStorage.setItem("pdfId", response.data.pdf._id);
      }

      alert(
        response.data?.message ||
          "PDF uploaded successfully"
      );

      setSelectedFile(null);
      setTitle("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      navigate("/mypdfs");
    } catch (error) {
      console.error("Upload error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        alert("Your session has expired. Please login again.");
        navigate("/login");
        return;
      }

      alert(
        error.response?.data?.message ||
          "PDF upload failed"
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-card">
      <div className="upload-icon">📄</div>

      <h2>Upload Your PDF</h2>

      <p>
        Upload your study material in PDF format.
      </p>

      

      <br />
      <br />

      <input
        hidden
        ref={fileInputRef}
        type="file"
        accept="application/pdf,.pdf"
        onChange={handleFileChange}
        disabled={uploading}
      />

      <button
        type="button"
        className="browse-btn"
        onClick={handleBrowseClick}
        disabled={uploading}
      >
        Browse PDF
      </button>

      {selectedFile && (
        <div className="selected-file">
          <h4>Selected File</h4>
          <p>{selectedFile.name}</p>
        </div>
      )}

      <button
        type="button"
        className="upload-btn"
        onClick={handleUpload}
        disabled={!selectedFile || uploading}
      >
        {uploading ? "Uploading..." : "Upload PDF"}
      </button>
    </div>
  );
}

export default UploadCard;