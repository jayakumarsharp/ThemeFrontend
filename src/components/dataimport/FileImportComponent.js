import React, { useState } from "react";
import axios from "axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

const FileImportComponent = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    setUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("http://localhost:3003/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        setUploading(false);
        // Optionally, provide feedback to the user
        alert("File uploaded successfully!");
      })
      .catch((error) => {
        console.error(error);
        setUploading(false);
        setUploadError("Error uploading file. Please try again.");
      });
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={!file || uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
        {uploadError && <p style={{ color: "red" }}>{uploadError}</p>}
      </div>
    </DashboardLayout>
  );
};

export default FileImportComponent;
