import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import WorldMap from './components/WorldMap';

const App: React.FC = () => {
  return (
    <div className="container">
      <div className="header">
        <h1>🗺️ WorldMap Application</h1>
        <p>A full-stack application with Spring Boot and React</p>
      </div>
      
      <Navigation />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/worldmap" element={<WorldMap />} />
      </Routes>
    </div>
  );
};

export default App;