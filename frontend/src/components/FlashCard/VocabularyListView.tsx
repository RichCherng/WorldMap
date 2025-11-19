import React, { useState, useEffect } from 'react';
import { ChineseCardData } from './Language/ChineseCard';
import VocabCardPreview from './VocabCardPreview';
import VocabCollectionList from './VocabCollectionList';
import VocabEditForm from './VocabEditForm';
import { updateChineseCard, deleteChineseCard } from '@/data/chineseCardData';
import './VocabularyListView.css';

interface VocabularyListViewProps {
  words: ChineseCardData[];
  onWordsChange?: (words: ChineseCardData[]) => void;
}

const VocabularyListView: React.FC<VocabularyListViewProps> = ({ words, onWordsChange }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleSave = async (updatedWord: ChineseCardData) => {
    console.log('🔵 handleSave called with:', updatedWord);

    // Store original words for rollback if needed
    const originalWords = words;

    try {
      setIsSaving(true);
      setError(null);

      // OPTIMISTIC UPDATE: Update UI immediately
      console.log('⚡ Applying optimistic update');
      if (onWordsChange) {
        const optimisticWords = words.map(w =>
          w.id === updatedWord.id ? updatedWord : w
        );
        onWordsChange(optimisticWords);
      }

      // Exit edit mode immediately for better UX
      setIsEditing(false);

      // Build update payload - only include exampleUsage if it has a value
      const updatePayload: any = {
        chineseWord: updatedWord.chineseWord,
        pinyin: updatedWord.pinyin,
        englishWord: updatedWord.englishWord,
      };

      // Only include exampleUsage if it has actual content
      // Don't pass empty strings to avoid deleteField() issues
      if (updatedWord.exampleUsage && updatedWord.exampleUsage.trim()) {
        updatePayload.exampleUsage = updatedWord.exampleUsage;
      }

      console.log('📤 Calling updateChineseCard with id:', updatedWord.id, 'payload:', updatePayload);

      // Update backend in background
      const updated = await updateChineseCard(String(updatedWord.id), updatePayload);

      console.log('✅ Backend update successful:', updated);

      // Update with server response to ensure consistency
      if (onWordsChange) {
        const serverWords = words.map(w => w.id === updated.id ? updated : w);
        onWordsChange(serverWords);
      }
    } catch (err: any) {
      console.error('❌ Error saving vocabulary:', err);

      // ROLLBACK: Revert to original state on error
      console.log('🔄 Rolling back optimistic update');
      if (onWordsChange) {
        onWordsChange(originalWords);
      }

      // Re-enter edit mode so user can fix the issue
      setIsEditing(true);
      setError(err.message || 'Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDelete = async (id: string) => {
    // Store original words for rollback if needed
    const originalWords = words;
    const originalSelectedId = selectedId;
    const originalIsEditing = isEditing;

    try {
      setError(null);

      // OPTIMISTIC UPDATE: Remove from UI immediately
      console.log('⚡ Applying optimistic delete');
      if (onWordsChange) {
        const optimisticWords = words.filter(w => w.id !== id);
        onWordsChange(optimisticWords);
      }

      // If we deleted the selected card, clear selection or select another immediately
      if (selectedId === id) {
        const remainingWords = words.filter(w => w.id !== id);
        setSelectedId(remainingWords.length > 0 ? remainingWords[0].id : null);
        setIsEditing(false);
      }

      // Delete from Firestore in background (ensure id is string)
      console.log('📤 Deleting from backend:', id);
      await deleteChineseCard(String(id));

      console.log('✅ Backend delete successful');
    } catch (err: any) {
      console.error('❌ Error deleting vocabulary:', err);

      // ROLLBACK: Revert to original state on error
      console.log('🔄 Rolling back optimistic delete');
      if (onWordsChange) {
        onWordsChange(originalWords);
      }
      setSelectedId(originalSelectedId);
      setIsEditing(originalIsEditing);

      setError(err.message || 'Failed to delete vocabulary');
    }
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
      {/* Error Display */}
      {error && (
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#fee2e2',
          border: '1px solid #fca5a5',
          borderRadius: '0.5rem',
          padding: '1rem',
          zIndex: 1000,
          maxWidth: '500px'
        }}>
          <strong style={{ color: '#dc2626' }}>Error:</strong>
          <p style={{ margin: '0.5rem 0 0 0', color: '#991b1b' }}>{error}</p>
          <button
            onClick={() => setError(null)}
            style={{
              marginTop: '0.5rem',
              padding: '0.25rem 0.5rem',
              background: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}
          >
            Dismiss
          </button>
        </div>
      )}

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
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default VocabularyListView;
