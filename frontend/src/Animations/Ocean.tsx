import React, { useState, useEffect } from 'react';
import './Ocean.css';

interface OceanProps {
  rows?: number;
  cols?: number;
  animationSpeed?: number;
}

export const Ocean: React.FC<OceanProps> = ({ 
  rows = 25, 
  cols = 40, 
  animationSpeed = 150 
}) => {
  const [waveOffset, setWaveOffset] = useState(0);

  // Create animated wave effect
  useEffect(() => {
    const interval = setInterval(() => {
      setWaveOffset(prev => (prev + 1) % 100);
    }, animationSpeed);

    return () => clearInterval(interval);
  }, [animationSpeed]);

  // Generate ocean grid pattern
  const generateOceanGrid = () => {
    const grid = [];

    for (let row = 0; row < rows; row++) {
      const rowElements = [];
      for (let col = 0; col < cols; col++) {
        // Create wave pattern
        const waveIntensity = Math.sin((col + waveOffset) * 0.3) * 2 + 
                            Math.sin((row + waveOffset * 0.5) * 0.2) * 1;
        
        // Different shades of blue for ocean depth
        let pixelClass = 'ocean-deep';
        if (waveIntensity > 1.5) {
          pixelClass = 'ocean-shallow';
        } else if (waveIntensity > 0.5) {
          pixelClass = 'ocean-medium';
        } else if (waveIntensity > -0.5) {
          pixelClass = 'ocean-deep';
        } else {
          pixelClass = 'ocean-darker';
        }

        // Add some random foam/whitecaps
        if (Math.random() > 0.97 && waveIntensity > 1) {
          pixelClass = 'ocean-foam';
        }

        rowElements.push(
          <div 
            key={`${row}-${col}`} 
            className={`ocean-pixel ${pixelClass}`}
          />
        );
      }
      grid.push(
        <div key={row} className="ocean-row">
          {rowElements}
        </div>
      );
    }
    return grid;
  };

  return (
    <div className="ocean-container">
      {generateOceanGrid()}
    </div>
  );
};

export default Ocean;