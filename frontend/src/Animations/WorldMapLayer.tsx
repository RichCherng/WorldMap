import React, { useState } from 'react';
import './WorldMapLayer.css';

interface Continent {
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  shape: boolean[][];
}

interface WorldMapLayerProps {
  showContinents?: boolean;
  interactive?: boolean;
}

export const WorldMapLayer: React.FC<WorldMapLayerProps> = ({
  showContinents = true,
  interactive = false
}) => {
  const [hoveredContinent, setHoveredContinent] = useState<string | null>(null);

  // Simplified pixel art representations of continents
  const continents: Continent[] = [
    {
      name: 'North America',
      x: 15,
      y: 8,
      width: 12,
      height: 8,
      shape: [
        [false, false, true, true, true, true, true, true, false, false, false, false],
        [false, true, true, true, true, true, true, true, true, false, false, false],
        [true, true, true, true, true, true, true, true, true, true, false, false],
        [true, true, true, true, true, true, true, true, true, true, true, false],
        [false, true, true, true, true, true, true, true, true, true, true, true],
        [false, false, true, true, true, true, true, true, true, true, false, false],
        [false, false, false, true, true, true, true, true, false, false, false, false],
        [false, false, false, false, true, true, true, false, false, false, false, false]
      ]
    },
    {
      name: 'South America',
      x: 20,
      y: 16,
      width: 6,
      height: 10,
      shape: [
        [false, true, true, true, false, false],
        [true, true, true, true, true, false],
        [true, true, true, true, true, false],
        [true, true, true, true, true, false],
        [true, true, true, true, false, false],
        [true, true, true, true, false, false],
        [false, true, true, true, false, false],
        [false, true, true, false, false, false],
        [false, true, true, false, false, false],
        [false, false, true, false, false, false]
      ]
    },
    {
      name: 'Europe',
      x: 32,
      y: 7,
      width: 8,
      height: 6,
      shape: [
        [false, false, true, true, true, false, false, false],
        [false, true, true, true, true, true, false, false],
        [true, true, true, true, true, true, true, false],
        [true, true, true, true, true, true, true, true],
        [false, true, true, true, true, true, false, false],
        [false, false, true, true, true, false, false, false]
      ]
    },
    {
      name: 'Africa',
      x: 32,
      y: 13,
      width: 8,
      height: 12,
      shape: [
        [false, false, true, true, true, true, false, false],
        [false, true, true, true, true, true, true, false],
        [true, true, true, true, true, true, true, true],
        [true, true, true, true, true, true, true, true],
        [true, true, true, true, true, true, true, false],
        [true, true, true, true, true, true, true, false],
        [true, true, true, true, true, true, false, false],
        [true, true, true, true, true, true, false, false],
        [false, true, true, true, true, true, false, false],
        [false, true, true, true, true, false, false, false],
        [false, false, true, true, true, false, false, false],
        [false, false, false, true, false, false, false, false]
      ]
    },
    {
      name: 'Asia',
      x: 40,
      y: 5,
      width: 15,
      height: 12,
      shape: [
        [false, false, true, true, true, true, true, true, true, true, true, false, false, false, false],
        [false, true, true, true, true, true, true, true, true, true, true, true, false, false, false],
        [true, true, true, true, true, true, true, true, true, true, true, true, true, true, false],
        [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
        [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
        [true, true, true, true, true, true, true, true, true, true, true, true, true, false, false],
        [true, true, true, true, true, true, true, true, true, true, true, false, false, false, false],
        [false, true, true, true, true, true, true, true, true, true, false, false, false, false, false],
        [false, false, true, true, true, true, true, true, true, false, false, false, false, false, false],
        [false, false, false, true, true, true, true, true, false, false, false, false, false, false, false],
        [false, false, false, false, true, true, true, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, true, false, false, false, false, false, false, false, false, false]
      ]
    },
    {
      name: 'Australia',
      x: 50,
      y: 20,
      width: 8,
      height: 4,
      shape: [
        [false, true, true, true, true, true, false, false],
        [true, true, true, true, true, true, true, false],
        [true, true, true, true, true, true, true, true],
        [false, true, true, true, true, true, false, false]
      ]
    }
  ];

  const renderContinent = (continent: Continent) => {
    const pixels = [];
    
    for (let row = 0; row < continent.height; row++) {
      for (let col = 0; col < continent.width; col++) {
        if (continent.shape[row] && continent.shape[row][col]) {
          pixels.push(
            <div
              key={`${continent.name}-${row}-${col}`}
              className={`continent-pixel ${hoveredContinent === continent.name ? 'continent-pixel-hover' : ''}`}
              style={{
                left: `${(continent.x + col) * 2.5}vw`,
                top: `${(continent.y + row) * 4}vh`,
              }}
              onMouseEnter={() => interactive && setHoveredContinent(continent.name)}
              onMouseLeave={() => interactive && setHoveredContinent(null)}
              title={interactive ? continent.name : undefined}
            />
          );
        }
      }
    }
    
    return pixels;
  };

  if (!showContinents) {
    return null;
  }

  return (
    <div className="world-map-layer">
      {continents.map(continent => renderContinent(continent))}
      
      {/* Continent label when hovered */}
      {hoveredContinent && interactive && (
        <div className="continent-label">
          {hoveredContinent}
        </div>
      )}
    </div>
  );
};

export default WorldMapLayer;