import React from "react";

interface DownloadButtonProps {
  image: File | null;
  filters: { type: string; value: number }[];
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ image, filters }) => {
  const handleDownload = () => {
    if (!image) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const img = new Image();
    img.src = URL.createObjectURL(image);

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      let filterStr = filters
        .map((filter) => {
          if (filter.type === "brightness") return `brightness(${100 + filter.value}%)`;
          if (filter.type === "darken") return `brightness(${100 - filter.value}%)`;
          if (filter.type === "sepia") return `sepia(${filter.value}%)`;
          if (filter.type === "grayscale") return `grayscale(${filter.value}%)`;
          if (filter.type === "blur") return `blur(${filter.value}px)`;
          if (filter.type === "saturation") return `saturate(${filter.value}%)`;
          return "";
        })
        .join(" ");

      ctx.filter = filterStr;
      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "filtered-image.png";
          link.click();
          URL.revokeObjectURL(url);
        }
      });
    };
  };

  return (
    <button onClick={handleDownload} className="download-btn">
     Download
    </button>
  );
};

export default DownloadButton;
