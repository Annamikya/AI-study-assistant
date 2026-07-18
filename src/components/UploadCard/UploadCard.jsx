import "./UploadCard.css";
import { useRef, useState } from "react";

function UploadCard() {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="upload-card">

      <div className="upload-icon">
        📄
      </div>

      <h2>Upload Your PDF</h2>

      <p>
        Drag & Drop your PDF here or click the button below.
      </p>

      <input
        type="file"
        accept=".pdf"
        ref={fileInputRef}
        onChange={handleFileChange}
        hidden
      />

      <button
        className="browse-btn"
        onClick={handleBrowseClick}
      >
        Browse Files
      </button>

      {selectedFile && (
        <div className="selected-file">
          <h4>Selected File</h4>
          <p>{selectedFile.name}</p>
        </div>
      )}

      <button
        className="upload-btn"
        disabled={!selectedFile}
      >
        Upload PDF
      </button>

    </div>
  );
}

export default UploadCard;