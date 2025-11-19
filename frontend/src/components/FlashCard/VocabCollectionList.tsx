import React, { useState } from 'react';
import { ChineseCardData } from './Language/ChineseCard';
import './VocabCollectionList.css';

interface VocabCollectionListProps {
  words: ChineseCardData[];
  selectedId: string | null;
  onSelectWord: (id: string) => void;
  onEdit: (id: string) => void;
}

const VocabCollectionList: React.FC<VocabCollectionListProps> = ({
  words,
  selectedId,
  onSelectWord,
  onEdit
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter words based on search query
  const filteredWords = words.filter(word => {
    const query = searchQuery.toLowerCase();
    return (
      word.chineseWord.toLowerCase().includes(query) ||
      word.pinyin.toLowerCase().includes(query) ||
      word.englishWord.toLowerCase().includes(query)
    );
  });

  const handleEdit = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onEdit(id);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    console.log('Delete word:', id);
    // TODO: Implement delete functionality
  };

  const handleAddNew = () => {
    console.log('Add new vocabulary');
    // TODO: Implement add new vocabulary functionality
  };

  return (
    <div className="vocab-collection-container">
      {/* Search Bar */}
      <div className="vocab-search-container">
        <svg className="vocab-search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM18 18l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <input
          type="text"
          className="vocab-search-input"
          placeholder="Search vocabulary..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Vocabulary List */}
      <div className="vocab-collection-list">
        {filteredWords.length === 0 ? (
          <div className="vocab-collection-empty">
            <p>{searchQuery ? 'No matching vocabulary found.' : 'No vocabulary items yet. Add some to get started!'}</p>
          </div>
        ) : (
          filteredWords.map((word) => (
            <div
              key={word.id}
              className={`vocab-list-item ${selectedId === word.id ? 'selected' : ''}`}
              onClick={() => onSelectWord(word.id)}
            >
              <div className="vocab-list-item-content">
                <div className="vocab-list-text">
                  <span className="vocab-list-chinese">{word.chineseWord}</span>
                  <span className="vocab-list-pinyin">{word.pinyin}</span>
                </div>
                <span className="vocab-list-english">{word.englishWord}</span>
              </div>
              <div className="vocab-list-actions">
                <button
                  className="vocab-action-icon-button"
                  onClick={(e) => handleEdit(e, word.id)}
                  aria-label="Edit"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M11.333 2A1.886 1.886 0 0 1 14 4.667l-9 9-3.667.666.667-3.666 9-9z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button
                  className="vocab-action-icon-button"
                  onClick={(e) => handleDelete(e, word.id)}
                  aria-label="Delete"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 4h12M5.333 4V2.667a1.333 1.333 0 0 1 1.334-1.334h2.666a1.333 1.333 0 0 1 1.334 1.334V4m2 0v9.333a1.333 1.333 0 0 1-1.334 1.334H4.667a1.333 1.333 0 0 1-1.334-1.334V4h9.334z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add New Button */}
      <button className="vocab-add-new-button" onClick={handleAddNew}>
        Add New Vocabulary
      </button>

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
