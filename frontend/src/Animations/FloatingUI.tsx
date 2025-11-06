import React from 'react';
import './FloatingUI.css';

interface FloatingUIProps {
  onAddIslands?: () => void;
  onAddShips?: () => void;
  onAddSeaLife?: () => void;
}

export const FloatingUI: React.FC<FloatingUIProps> = ({
  onAddIslands,
  onAddShips,
  onAddSeaLife
}) => {
  return (
    <div className="floating-ui">
      <div className="pixel-card">
        <h2 className="pixel-title">🗺️ Pixel World Ocean</h2>
        <p className="pixel-text">
          Welcome to the pixel art ocean! This is the beginning of your world map adventure.
        </p>
      </div>

      <div className="pixel-controls">
        <button 
          className="pixel-button"
          onClick={onAddIslands}
        >
          🏝️ Add Islands
        </button>
        <button 
          className="pixel-button"
          onClick={onAddShips}
        >
          🚢 Add Ships
        </button>
        <button 
          className="pixel-button"
          onClick={onAddSeaLife}
        >
          🐋 Add Sea Life
        </button>
      </div>

      <div className="pixel-info">
        <div className="info-item">
          <span className="pixel-label">Ocean Depth:</span>
          <div className="depth-indicator">
            <div className="depth-bar"></div>
          </div>
        </div>
        <div className="info-item">
          <span className="pixel-label">Wave Activity:</span>
          <span className="pixel-value">Active</span>
        </div>
      </div>
    </div>
  );
};

export default FloatingUI;