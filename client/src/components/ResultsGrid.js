// client/src/components/ResultsGrid.js
import React from 'react';
import './Dashboard.css'; // We'll create this CSS file next

const ResultsGrid = ({ images, selected, setSelected }) => {
  
  const handleSelect = (image) => {
    // Check if the image is already selected
    if (selected.find(img => img.id === image.id)) {
      // If yes, remove it
      setSelected(selected.filter(img => img.id !== image.id));
    } else {
      // If no, add it
      setSelected([...selected, image]);
    }
  };

  return (
    <div className="results-grid"> {/*  */}
      {images.map((image) => {
        const isSelected = selected.find(img => img.id === image.id);
        return (
          <div 
            key={image.id} 
            className={`grid-item ${isSelected ? 'selected' : ''}`}
            onClick={() => handleSelect(image)}
          >
            <img src={image.urls.small} alt={image.alt_description} />
            <div className="overlay"> {/*  */}
              <input 
                type="checkbox" 
                checked={!!isSelected} 
                readOnly 
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ResultsGrid;