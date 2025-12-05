import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LeftIconNav } from './components/Navigation/LeftIconNav';
import HomeLanding from '@/Pages/Home/HomeLanding';
import WorldMap from './components/WorldMap';
import FlashCard from '@/Pages/FlashCard/FlashCardPage';
import PlaygroundPage, { PlaygroundRedirect } from '@/Pages/Playground/PlaygroundPage';
import { prototypes } from '@/Pages/Playground/prototypes';
import Practice from '@/Pages/Practice/Practice';
import Leaderboards from '@/Pages/Leaderboards/Leaderboards';
import Quests from '@/Pages/Quests/Quests';
import Profile from '@/Pages/Profile/Profile';
import More from '@/Pages/More/More';

const App: React.FC = () => {
  return (
    <div className="app-layout">
      <LeftIconNav />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomeLanding />} />
          <Route path="/world-map" element={<WorldMap />} />
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
          <Route path="/practice" element={<Practice />} />
          <Route path="/leaderboards" element={<Leaderboards />} />
          <Route path="/quests" element={<Quests />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/more" element={<More />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;