import React, { useState, useEffect } from 'react';
import { ChineseCardData } from './Language/ChineseCard';
import './VocabEditForm.css';

interface VocabEditFormProps {
  word: ChineseCardData;
  onSave: (updatedWord: ChineseCardData) => void;
  onCancel: () => void;
}

const VocabEditForm: React.FC<VocabEditFormProps> = ({ word, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    chineseWord: word.chineseWord,
    pinyin: word.pinyin,
    englishWord: word.englishWord,
    exampleUsage: word.exampleUsage || '',
  });

  useEffect(() => {
    setFormData({
      chineseWord: word.chineseWord,
      pinyin: word.pinyin,
      englishWord: word.englishWord,
      exampleUsage: word.exampleUsage || '',
    });
  }, [word]);

  const handleChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('📝 Form submitted');
    console.log('Current formData:', formData);
    const updatedWord: ChineseCardData = {
      ...word,
      ...formData,
      updatedAt: Date.now()
    };
    console.log('Calling onSave with:', updatedWord);
    onSave(updatedWord);
  };

  return (
    <div className="vocab-edit-form-container">
      <form className="vocab-edit-form" onSubmit={handleSubmit}>
        <h2 className="vocab-edit-form-title">Chinese Word</h2>

        <div className="vocab-form-group">
          <input
            type="text"
            className="vocab-form-input"
            placeholder="Chinese Word"
            value={formData.chineseWord}
            onChange={handleChange('chineseWord')}
            required
          />
        </div>

        <div className="vocab-form-group">
          <input
            type="text"
            className="vocab-form-input"
            placeholder="Pinyin"
            value={formData.pinyin}
            onChange={handleChange('pinyin')}
            required
          />
        </div>

        <div className="vocab-form-group">
          <input
            type="text"
            className="vocab-form-input"
            placeholder="English Definition"
            value={formData.englishWord}
            onChange={handleChange('englishWord')}
            required
          />
        </div>

        <div className="vocab-form-group">
          <label className="vocab-form-label">Example Usage</label>
          <textarea
            className="vocab-form-textarea"
            placeholder="Enter example sentence..."
            value={formData.exampleUsage}
            onChange={handleChange('exampleUsage')}
            rows={3}
          />
        </div>

        <div className="vocab-form-actions">
          <button type="submit" className="vocab-form-button vocab-save-button">
            Save
          </button>
          <button type="button" className="vocab-form-button vocab-cancel-button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default VocabEditForm;
