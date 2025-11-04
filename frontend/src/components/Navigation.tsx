import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav className="nav">
      <Link to="/home">Home</Link>
      <Link to="/worldmap">World Map</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/flash-card">Flash Card</Link>
      <Link to="/stack">Stack</Link>
    </nav>
  );
};

export default Navigation;