import React from "react";
import "./BackgroundSelector.css";

const BackgroundSelector = ({ 
  isOpen, 
  onClose, 
  backgrounds, 
  onSelect, 
  currentBackgroundIndex 
}) => {
  if (!isOpen) return null;

  return (
    <div className="background-selector-overlay">
      <div className="background-selector-container">
        <h2>Select Background</h2>
        <div className="background-grid">
          {backgrounds.map((background, index) => (
            <div 
              key={index} 
              className={`background-preview ${currentBackgroundIndex === index ? 'selected' : ''}`}
              onClick={() => onSelect(index)}
            >
              <video 
                muted 
                loop 
                autoPlay 
                className="preview-video"
              >
                <source src={background.src} type="video/mp4" />
              </video>
              <div className="background-name">{background.name}</div>
            </div>
          ))}
        </div>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default BackgroundSelector;