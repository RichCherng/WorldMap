import React from 'react';
import { ChineseCardData } from './Language/ChineseCard';
import './VocabCollectionList.css';

interface VocabCollectionListProps {
  words: ChineseCardData[];
  selectedId: string | null;
  onSelectWord: (id: string) => void;
}

const VocabCollectionList: React.FC<VocabCollectionListProps> = ({
  words,
  selectedId,
  onSelectWord
}) => {
  return (
    <div className="vocab-collection-container">
      <div className="vocab-collection-header">
        <h2 className="vocab-collection-title">Vocabulary Collection</h2>
      </div>

      <div className="vocab-collection-list">
        {words.length === 0 ? (
          <div className="vocab-collection-empty">
            <p>No vocabulary items yet. Add some to get started!</p>
          </div>
        ) : (
          words.map((word) => (
            <button
              key={word.id}
              className={`vocab-list-item ${selectedId === word.id ? 'selected' : ''}`}
              onClick={() => onSelectWord(word.id)}
            >
              <div className="vocab-list-item-content">
                <span className="vocab-list-chinese">{word.chineseWord}</span>
                <span className="vocab-list-details">
                  {word.pinyin} - {word.englishWord}
                </span>
              </div>
            </button>
          ))
        )}
      </div>

      {/* Stats Display */}
      <div className="vocab-stats">
        <div className="vocab-stat-item">
          <span className="vocab-stat-label">Cards Studied:</span>
          <span className="vocab-stat-value">15</span>
        </div>
        <div className="vocab-stat-item">
          <span className="vocab-stat-label">Accuracy:</span>
          <span className="vocab-stat-value">85%</span>
        </div>
      </div>
    </div>
  );
};

export default VocabCollectionList;
