import React from 'react';
import { PixelWorld } from '../Animations';

const WorldMap: React.FC = () => {
  const handleAddIslands = () => {
    console.log('Adding islands...');
    // Future implementation
  };

  const handleAddShips = () => {
    console.log('Adding ships...');
    // Future implementation
  };

  const handleAddSeaLife = () => {
    console.log('Adding sea life...');
    // Future implementation
  };

  return (
    <PixelWorld 
      onAddIslands={handleAddIslands}
      onAddShips={handleAddShips}
      onAddSeaLife={handleAddSeaLife}
    />
  );
};

export default WorldMap;