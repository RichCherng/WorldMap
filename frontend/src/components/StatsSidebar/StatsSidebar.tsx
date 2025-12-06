import React from 'react';
import { LeaguePanel } from './LeaguePanel';
import { DailyQuests } from './DailyQuests';
import './StatsSidebar.css';

export const StatsSidebar: React.FC = () => {
  return (
    <div className="stats-sidebar-container">
      <LeaguePanel />
      <DailyQuests />
    </div>
  );
};
