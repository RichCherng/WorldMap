import React from 'react';
import './LeaguePanel.css';

export const LeaguePanel: React.FC = () => {
  return (
    <div className="league-panel">
      <h3 className="league-title">Pearl League</h3>

      <div className="rank-display">
        <div className="rank-badge">
          <div className="badge-icon">💎</div>
          <div className="rank-info">
            <span className="rank-label">You're ranked</span>
            <span className="rank-number">#1</span>
          </div>
        </div>

        <div className="rank-change">
          <span className="check-icon">✓</span>
          <span>You moved up 1 rank!</span>
        </div>
      </div>

      <button className="view-league-btn">VIEW LEAGUE</button>
    </div>
  );
};
