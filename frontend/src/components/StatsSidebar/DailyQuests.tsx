import React from 'react';
import { QuestItem } from './QuestItem';
import './DailyQuests.css';

export const DailyQuests: React.FC = () => {
  const quests = [
    { icon: '⚡', description: 'Earn 30 XP', progress: 30, target: 30, completed: true },
    { icon: '🔥', description: 'Get 5 in a row correct in 2 lessons', progress: 2, target: 2, completed: true },
    { icon: '🎯', description: 'Complete 3 perfect lessons', progress: 2, target: 3, completed: false },
  ];

  return (
    <div className="daily-quests">
      <div className="quests-header">
        <h3>Daily Quests</h3>
        <button className="view-all-btn">VIEW ALL</button>
      </div>

      <div className="quests-list">
        {quests.map((quest, i) => (
          <QuestItem key={i} {...quest} />
        ))}
      </div>
    </div>
  );
};
