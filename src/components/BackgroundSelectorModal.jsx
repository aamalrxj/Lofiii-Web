import React from "react";
import "./BackgroundSelectorModal.css";

const BackgroundSelectorModal = ({ 
  isOpen, 
  onClose, 
  backgrounds, 
  onSelect, 
  currentBackgroundIndex 
}) => {
  if (!isOpen) return null;

  const handleSelect = (index) => {
    onSelect(index);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Select Background</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="background-grid">
          {backgrounds.map((background, index) => (
            <div 
              key={index} 
              className={`background-item ${currentBackgroundIndex === index ? 'selected' : ''}`}
              onClick={() => handleSelect(index)}
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
      </div>
    </div>
  );
};

export default BackgroundSelectorModal;
