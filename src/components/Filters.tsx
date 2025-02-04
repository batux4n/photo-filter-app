import React from "react";

// Component for rendering filter sliders and handling filter value changes
interface FiltersProps {
  onFilterValueChange: (filter: string, value: number) => void;
  filters: { type: string; value: number }[];
}

const Filters: React.FC<FiltersProps> = ({ onFilterValueChange, filters }) => {
  return (
    <div className="filters">
      {filters.map((filter) => (
        <div key={filter.type} className="slider-section">
          <label>
            {filter.type === "brightness"
              ? "Brightness"
              : filter.type === "darken"
              ? "Darken"
              : filter.type === "sepia"
              ? "Sepia"
              : filter.type === "grayscale"
              ? "Grayscale"
              : filter.type === "blur"
              ? "Blur"
              : filter.type === "saturation"
              ? "Saturation"
              : ""}{" "}
            :
          </label>
          <input
            type="range"
            min={filter.type === "saturation" ? "0" : "0"}
            max={filter.type === "saturation" ? "200" : "100"}
            value={filter.value}
            onChange={(e) => onFilterValueChange(filter.type, parseInt(e.target.value))}
          />
          <span>{filter.type === "blur" ? `${filter.value}px` : `${filter.value}%`}</span>
        </div>
      ))}
    </div>
  );
};

export default Filters;
