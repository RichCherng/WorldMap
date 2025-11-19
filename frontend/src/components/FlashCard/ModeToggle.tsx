import React from 'react';
import './ModeToggle.css';

export type FlashCardMode = 'study' | 'vocabulary';

interface ModeToggleProps {
  currentMode: FlashCardMode;
  onModeChange: (mode: FlashCardMode) => void;
}

const ModeToggle: React.FC<ModeToggleProps> = ({ currentMode, onModeChange }) => {
  return (
    <div className="mode-toggle-container">
      <div className="mode-toggle-buttons">
        <button
          className={`mode-toggle-button ${currentMode === 'study' ? 'active' : ''}`}
          onClick={() => onModeChange('study')}
        >
          STUDY MODE
        </button>
        <button
          className={`mode-toggle-button ${currentMode === 'vocabulary' ? 'active' : ''}`}
          onClick={() => onModeChange('vocabulary')}
        >
          VOCABULARY LIST
        </button>
      </div>
    </div>
  );
};

export default ModeToggle;
