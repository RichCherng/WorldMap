import React from 'react';
import './QuestItem.css';

interface QuestItemProps {
  icon: string;
  description: string;
  progress: number;
  target: number;
  completed: boolean;
}

export const QuestItem: React.FC<QuestItemProps> = ({
  icon,
  description,
  progress,
  target,
  completed
}) => {
  const percentage = (progress / target) * 100;

  return (
    <div className={`quest-item${completed ? ' completed' : ''}`}>
      <div className="quest-icon">{icon}</div>

      <div className="quest-content">
        <p className="quest-description">{description}</p>

        <div className="progress-bar-container">
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="progress-text">{progress} / {target}</span>
        </div>
      </div>

      <div className="quest-reward">
        {completed ? '✓' : '🎁'}
      </div>
    </div>
  );
};
