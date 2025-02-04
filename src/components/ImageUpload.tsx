import React from "react";

// Component for handling image file uploads
interface ImageUploadProps {
  onImageChange: (file: File | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageChange }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onImageChange(file);
  };

  return (
    <div className="upload-section">
      <label htmlFor="file-upload" className="upload-label">
        Select File
      </label>
      <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} />
    </div>
  );
};

export default ImageUpload;
