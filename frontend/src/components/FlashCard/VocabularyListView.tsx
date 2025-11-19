import React, { useState, useEffect } from 'react';
import { ChineseCardData } from './Language/ChineseCard';
import VocabCardPreview from './VocabCardPreview';
import VocabCollectionList from './VocabCollectionList';
import './VocabularyListView.css';

interface VocabularyListViewProps {
  words: ChineseCardData[];
}

const VocabularyListView: React.FC<VocabularyListViewProps> = ({ words }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Auto-select first item when words are loaded
  useEffect(() => {
    if (words.length > 0 && !selectedId) {
      setSelectedId(words[0].id);
    }
  }, [words, selectedId]);

  const selectedCard = words.find(word => word.id === selectedId) || null;

  const handleSelectWord = (id: string) => {
    setSelectedId(id);
  };

  if (words.length === 0) {
    return (
      <div className="vocabulary-list-view">
        <div className="vocabulary-list-empty">
          <p>No vocabulary items found. Add some words to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="vocabulary-list-view">
      <div className="vocabulary-grid">
        {/* Left Panel - Card Preview */}
        <div className="vocabulary-preview-panel">
          <VocabCardPreview card={selectedCard} />
        </div>

        {/* Right Panel - Collection List */}
        <div className="vocabulary-list-panel">
          <VocabCollectionList
            words={words}
            selectedId={selectedId}
            onSelectWord={handleSelectWord}
          />
        </div>
      </div>
    </div>
  );
};

export default VocabularyListView;
