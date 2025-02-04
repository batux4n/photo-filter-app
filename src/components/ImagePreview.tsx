// Component for displaying image preview with applied filters
interface ImagePreviewProps {
  image: File | null;
  filters: { type: string; value: number }[];
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ image, filters }) => {
  if (!image) return null;

  // Generate filter styles based on the selected filters and values
  const filterStyles = filters
    .map((filter) => {
      if (filter.type === "blur") return `blur(${filter.value}px)`;
      if (filter.type === "sepia") return `sepia(${filter.value}%)`;
      if (filter.type === "grayscale") return `grayscale(${filter.value}%)`;
      if (filter.type === "brightness") return `brightness(${100 + filter.value}%)`;
      if (filter.type === "darken") return `brightness(${100 - filter.value}%)`;
      if (filter.type === "saturation") return `saturate(${filter.value}%)`;
      return "";
    })
    .join(" ");

  return (
    <div className="image-preview">
      <img
        src={URL.createObjectURL(image)}
        alt="Uploaded Photo"
        className="preview-img"
        style={{ filter: filterStyles }}
      />
    </div>
  );
};

export default ImagePreview;
