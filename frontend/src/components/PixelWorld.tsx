import React, { useState } from 'react';
import Ocean from '../Animations/Ocean';
import FloatingUI from '../Animations/FloatingUI';
import WorldMapLayer from '../Animations/WorldMapLayer';
import './PixelWorld.css';

interface PixelWorldProps {
  onAddIslands?: () => void;
  onAddShips?: () => void;
  onAddSeaLife?: () => void;
}

export const PixelWorld: React.FC<PixelWorldProps> = ({
  onAddIslands,
  onAddShips,
  onAddSeaLife
}) => {
  const [showContinents, setShowContinents] = useState(true);
  const [interactiveMode, setInteractiveMode] = useState(true);

  const handleToggleContinents = () => {
    setShowContinents(!showContinents);
  };

  const handleToggleInteractive = () => {
    setInteractiveMode(!interactiveMode);
  };

  return (
    <div className="pixel-world-map">
      {/* Pixel art ocean background */}
      <Ocean />
      
      {/* World map continents layer */}
      <WorldMapLayer 
        showContinents={showContinents}
        interactive={interactiveMode}
      />
      
      {/* Floating UI elements */}
      <FloatingUI 
        onAddIslands={onAddIslands}
        onAddShips={onAddShips}
        onAddSeaLife={onAddSeaLife}
      />

      {/* Map controls */}
      <div className="map-controls">
        <button 
          className={`control-button ${showContinents ? 'active' : ''}`}
          onClick={handleToggleContinents}
        >
          🗺️ {showContinents ? 'Hide' : 'Show'} Continents
        </button>
        <button 
          className={`control-button ${interactiveMode ? 'active' : ''}`}
          onClick={handleToggleInteractive}
        >
          🖱️ {interactiveMode ? 'Disable' : 'Enable'} Interactive
        </button>
      </div>
    </div>
  );
};

export default PixelWorld;