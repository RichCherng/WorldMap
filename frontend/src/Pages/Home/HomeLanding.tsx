import React from 'react';
import { StatsHeader } from '@/components/StatsHeader';
import './HomeLanding.css';

const HomeLanding: React.FC = () => {
  return (
    <div className="home-layout">
      <StatsHeader />
      <div className="home-grid">
        <main className="center-content">
          <div className="placeholder">
            <h2>🎯 Learning Path</h2>
            <p>Coming soon in Phase 2!</p>
            <p style={{ color: '#999', fontSize: '14px' }}>
              This will display your language learning journey with interactive lesson nodes.
            </p>
          </div>
        </main>
        <aside className="right-sidebar">
          <div className="placeholder">
            <h3>📊 Daily Stats</h3>
            <p>Coming soon in Phase 3!</p>
            <p style={{ color: '#999', fontSize: '14px' }}>
              Daily quests, league rankings, and friend activity will appear here.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default HomeLanding;
