import React from 'react';
import { ChineseCardData } from './Language/ChineseCard';
import './VocabCardPreview.css';

interface VocabCardPreviewProps {
  card: ChineseCardData | null;
}

const VocabCardPreview: React.FC<VocabCardPreviewProps> = ({ card }) => {
  if (!card) {
    return (
      <div className="vocab-card-preview-container">
        <div className="vocab-card-preview">
          <div className="vocab-card-preview-empty">
            <p>Select a vocabulary item to preview</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="vocab-card-preview-container">
      <div className="vocab-card-preview">
        <div className="vocab-card-preview-content">
          {card.img && (
            <img
              src={card.img}
              alt={card.chineseWord}
              className="vocab-preview-image"
            />
          )}
          <h1 className="vocab-preview-chinese">{card.chineseWord}</h1>
          <p className="vocab-preview-pinyin">{card.pinyin}</p>
          <p className="vocab-preview-english">{card.englishWord}</p>

          {card.exampleUsage && (
            <div className="vocab-preview-example">
              <p className="vocab-preview-example-text">{card.exampleUsage}</p>
            </div>
          )}
        </div>

        <div className="vocab-card-preview-actions">
          <button className="vocab-action-button vocab-know-it">
            Know it
          </button>
          <button className="vocab-action-button vocab-study-again">
            Study again
          </button>
        </div>
      </div>
    </div>
  );
};

export default VocabCardPreview;
