import React from 'react';
import './StatsHeader.css';

interface Stat {
  id: string;
  emoji: string;
  value: number | string;
  label: string;
  className: string;
}

const stats: Stat[] = [
  { id: 'hearts', emoji: '❤️', value: 12, label: 'Hearts', className: 'stat-red' },
  { id: 'flames', emoji: '🔥', value: 295, label: 'Day Streak', className: 'stat-orange' },
  { id: 'gems', emoji: '💎', value: 3091, label: 'Gems', className: 'stat-cyan' }
];

export const StatsHeader: React.FC = () => {
  return (
    <header className="stats-header">
      <div className="stats-container">
        {stats.map((stat) => (
          <div key={stat.id} className={`stat-badge ${stat.className}`} title={stat.label}>
            <span>{stat.emoji}</span>
            <span>{stat.value}</span>
          </div>
        ))}
        <div className="profile-badge" title="Rank">
          <span>🏅</span>
          <span>#1</span>
        </div>
      </div>
    </header>
  );
};
