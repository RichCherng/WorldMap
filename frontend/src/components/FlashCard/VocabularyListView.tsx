import React, { useState, useEffect } from 'react';
import { ChineseCardData } from './Language/ChineseCard';
import VocabCardPreview from './VocabCardPreview';
import VocabCollectionList from './VocabCollectionList';
import VocabEditForm from './VocabEditForm';
import './VocabularyListView.css';

interface VocabularyListViewProps {
  words: ChineseCardData[];
}

const VocabularyListView: React.FC<VocabularyListViewProps> = ({ words }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Auto-select first item when words are loaded
  useEffect(() => {
    if (words.length > 0 && !selectedId) {
      setSelectedId(words[0].id);
    }
  }, [words, selectedId]);

  const selectedCard = words.find(word => word.id === selectedId) || null;

  const handleSelectWord = (id: string) => {
    setSelectedId(id);
    setIsEditing(false); // Exit edit mode when selecting a new word
  };

  const handleEdit = (id: string) => {
    setSelectedId(id);
    setIsEditing(true);
  };

  const handleSave = (updatedWord: ChineseCardData) => {
    console.log('Save word:', updatedWord);
    // TODO: Implement actual save functionality
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
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
        {/* Left Panel - Card Preview or Edit Form */}
        <div className="vocabulary-preview-panel">
          {isEditing && selectedCard ? (
            <VocabEditForm
              word={selectedCard}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          ) : (
            <VocabCardPreview card={selectedCard} />
          )}
        </div>

        {/* Right Panel - Collection List */}
        <div className="vocabulary-list-panel">
          <VocabCollectionList
            words={words}
            selectedId={selectedId}
            onSelectWord={handleSelectWord}
            onEdit={handleEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default VocabularyListView;
