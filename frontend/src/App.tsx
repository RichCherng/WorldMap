import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { PillNavigation } from './components/Navigation/PillNavigation';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import WorldMap from './components/WorldMap';
import FlashCard from './Pages/FlashCard/FlashCardPage';
import PlaygroundPage, { PlaygroundRedirect } from '@/Pages/Playground/PlaygroundPage';
import { prototypes } from '@/Pages/Playground/prototypes';
import Stack from './components/Stack';

const App: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/home';

  return (
    <div className="container">
      {/* <div className="header">
        <h1>🗺️ WorldMap Application</h1>
        <p>A full-stack application with Spring Boot and React</p>
      </div> */}

      <PillNavigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/worldmap" element={<WorldMap />} />
        <Route path="/flash-card" element={<FlashCard />} />
        <Route path="/playground" element={<PlaygroundPage />}>
          <Route index element={<PlaygroundRedirect />} />
          {prototypes.map((prototype) => (
            <Route
              key={prototype.id}
              path={prototype.id}
              element={<prototype.component />}
            />
          ))}
        </Route>
        <Route path="/stack" element={<Stack />} />
      </Routes>
    </div>
  );
};

export default App;