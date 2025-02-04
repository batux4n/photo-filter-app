import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import ImageUpload from "./components/ImageUpload";
import ImagePreview from "./components/ImagePreview";
import Filters from "./components/Filters";
import DownloadButton from "./components/DownloadButton";

const App: React.FC = () => {
  // State for storing the uploaded image file
  const [image, setImage] = useState<File | null>(null);
  
  // State for storing the selected filters and their values
  const [filters, setFilters] = useState<{ type: string; value: number }[]>([
    { type: "brightness", value: 0 },
    { type: "darken", value: 0 },
    { type: "sepia", value: 0 },
    { type: "grayscale", value: 0 },
    { type: "blur", value: 0 },
    { type: "saturation", value: 100 }, // Default saturation is 100
  ]);

  // Handle image change when a file is uploaded
  const handleImageChange = (file: File | null) => {
    setImage(file);
  };

  // Handle applying a new filter
  const handleFilterApply = (selectedFilter: string) => {
    if (!filters.some((filter) => filter.type === selectedFilter)) {
      setFilters([...filters, { type: selectedFilter, value: selectedFilter === "saturation" ? 100 : 0 }]);
    }
  };

  // Handle filter value change (e.g., brightness, blur)
  const handleFilterValueChange = (selectedFilter: string, value: number) => {
    setFilters(
      filters.map((filter) =>
        filter.type === selectedFilter ? { ...filter, value: value } : filter
      )
    );
  };

  // Handle removing a filter
  const handleRemoveFilter = (selectedFilter: string) => {
    setFilters(filters.filter((filter) => filter.type !== selectedFilter));
  };

  return (
    <div className="App">
      <Header />
      <main>
        <div className="image-section">
          <ImageUpload onImageChange={handleImageChange} />
          <ImagePreview image={image} filters={filters} />
        </div>
        <div className="filters-container">
          <Filters
            onFilterApply={handleFilterApply}
            onFilterValueChange={handleFilterValueChange}
            onRemoveFilter={handleRemoveFilter}
            filters={filters}
          />
          <DownloadButton image={image} filters={filters} />
        </div>
      </main>
    </div>
  );
};

export default App;
