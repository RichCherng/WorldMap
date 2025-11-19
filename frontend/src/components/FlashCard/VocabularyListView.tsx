import React, { useState, useEffect } from 'react';
import { ChineseCardData } from './Language/ChineseCard';
import VocabCardPreview from './VocabCardPreview';
import VocabCollectionList from './VocabCollectionList';
import VocabEditForm from './VocabEditForm';
import { updateChineseCard, deleteChineseCard, addChineseCard } from '@/data/chineseCardData';
import './VocabularyListView.css';

interface VocabularyListViewProps {
  words: ChineseCardData[];
  onWordsChange?: (words: ChineseCardData[]) => void;
}

const VocabularyListView: React.FC<VocabularyListViewProps> = ({ words, onWordsChange }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sort words in reverse chronological order (newest first)
  const sortedWords = [...words].sort((a, b) => {
    const timeA = a.createdAt || 0;
    const timeB = b.createdAt || 0;
    return timeB - timeA; // Descending order (newest first)
  });

  // Auto-select first item when words are loaded
  useEffect(() => {
    if (sortedWords.length > 0 && !selectedId) {
      setSelectedId(sortedWords[0].id);
    }
  }, [sortedWords.length, selectedId]);

  const selectedCard = sortedWords.find(word => word.id === selectedId) || null;

  const handleSelectWord = (id: string) => {
    setSelectedId(id);
    setIsEditing(false); // Exit edit mode when selecting a new word
    setIsCreating(false); // Exit create mode when selecting a word
  };

  const handleEdit = (id: string) => {
    setSelectedId(id);
    setIsEditing(true);
    setIsCreating(false);
  };

  const handleAddNew = () => {
    setIsCreating(true);
    setIsEditing(false);
    setSelectedId(null);
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
    setIsCreating(false);
  };

  const handleCreate = async (newWord: ChineseCardData) => {
    console.log('🆕 handleCreate called with:', newWord);

    try {
      setIsSaving(true);
      setError(null);

      // Build create payload
      const createPayload: any = {
        chineseWord: newWord.chineseWord,
        pinyin: newWord.pinyin,
        englishWord: newWord.englishWord,
      };

      // Only include exampleUsage if it has actual content
      if (newWord.exampleUsage && newWord.exampleUsage.trim()) {
        createPayload.exampleUsage = newWord.exampleUsage;
      }

      console.log('📤 Calling addChineseCard with payload:', createPayload);

      // Create new card in backend
      const created = await addChineseCard(createPayload);

      console.log('✅ Backend create successful:', created);

      // Add to local state
      if (onWordsChange) {
        const updatedWords = [...words, created];
        onWordsChange(updatedWords);
      }

      // Select the newly created card and exit create mode
      setSelectedId(created.id);
      setIsCreating(false);
    } catch (err: any) {
      console.error('❌ Error creating vocabulary:', err);
      setError(err.message || 'Failed to create vocabulary');
    } finally {
      setIsSaving(false);
    }
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

  if (sortedWords.length === 0) {
    return (
      <div className="vocabulary-list-view">
        <div className="vocabulary-list-empty">
          <p>No vocabulary items found. Add some words to get started!</p>
        </div>
      </div>
    );
  }

  // Create a blank card for new vocabulary
  const blankCard: ChineseCardData = {
    id: '',
    chineseWord: '',
    englishWord: '',
    pinyin: '',
    exampleUsage: ''
  };

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
          {isCreating ? (
            <VocabEditForm
              word={blankCard}
              onSave={handleCreate}
              onCancel={handleCancel}
            />
          ) : isEditing && selectedCard ? (
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
            words={sortedWords}
            selectedId={selectedId}
            onSelectWord={handleSelectWord}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAddNew={handleAddNew}
          />
        </div>
      </div>
    </div>
  );
};

export default VocabularyListView;
