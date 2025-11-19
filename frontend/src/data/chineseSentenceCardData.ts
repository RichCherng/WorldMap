import {
  createDocument,
  getAllDocuments,
  updateDocument,
  deleteDocument,
  subscribeToCollection,
} from '@/services/firestoreService';
import { deleteField } from 'firebase/firestore';

/**
 * Data Layer for Chinese Sentence Flashcards
 */

// Firestore collection name for Chinese sentence flashcards
const COLLECTION_NAME = 'chinese_sentence_cards';

export interface ChineseSentenceCardData {
  id: string;
  chineseSentence: string;
  pinyin: string;
  englishTranslation: string;
  collectionId?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  grammarNotes?: string;
  audioUrl?: string;
  createdAt?: number;
  updatedAt?: number;
}

/**
 * Fetch all Chinese sentence flashcards from Firestore
 */
export async function getChineseSentenceCards(collectionId?: string): Promise<ChineseSentenceCardData[]> {
  try {
    // TODO: Add filtering by collectionId when supported by getAllDocuments or add a specific query function
    const response = await getAllDocuments<ChineseSentenceCardData>(COLLECTION_NAME, { pageSize: 1000 });
    let cards = response.data;
    
    if (collectionId) {
      cards = cards.filter(card => card.collectionId === collectionId);
    }
    
    return cards;
  } catch (error) {
    console.error('Data layer: Failed to fetch Chinese sentence cards:', error);
    throw error;
  }
}

/**
 * Add a new Chinese sentence flashcard to Firestore
 */
export async function addChineseSentenceCard(data: Omit<ChineseSentenceCardData, 'id' | 'createdAt' | 'updatedAt'>): Promise<ChineseSentenceCardData> {
  try {
    const cleanData: any = { ...data };
    
    // Remove undefined optional fields
    Object.keys(cleanData).forEach(key => {
      if (cleanData[key] === undefined) {
        delete cleanData[key];
      }
    });

    const card = await createDocument<ChineseSentenceCardData>(COLLECTION_NAME, cleanData);
    return card;
  } catch (error) {
    console.error('Data layer: Failed to add Chinese sentence card:', error);
    throw error;
  }
}

/**
 * Update an existing Chinese sentence flashcard in Firestore
 */
export async function updateChineseSentenceCard(
  id: string,
  updates: Partial<Omit<ChineseSentenceCardData, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<ChineseSentenceCardData> {
  try {
    const cleanData: any = { ...updates };

    // Handle field deletions for optional fields
    const optionalFields = ['collectionId', 'difficulty', 'grammarNotes', 'audioUrl'];
    optionalFields.forEach(field => {
      if (cleanData[field] === undefined && updates.hasOwnProperty(field)) {
         // If explicitly set to undefined/null in updates, delete it
         // But here we check if it's in updates. 
         // If the caller passes { grammarNotes: undefined }, it means they might want to delete it?
         // Or we can follow the pattern in chineseCardData.ts
      }
    });
    
    // Better approach based on chineseCardData.ts pattern:
    if (updates.grammarNotes === '') cleanData.grammarNotes = deleteField();
    if (updates.audioUrl === '') cleanData.audioUrl = deleteField();
    if (updates.collectionId === '') cleanData.collectionId = deleteField();

    const card = await updateDocument<ChineseSentenceCardData>(COLLECTION_NAME, id, cleanData);
    return card;
  } catch (error) {
    console.error('Data layer: Failed to update Chinese sentence card:', error);
    throw error;
  }
}

/**
 * Delete a Chinese sentence flashcard from Firestore
 */
export async function deleteChineseSentenceCard(id: string): Promise<boolean> {
  try {
    return await deleteDocument(COLLECTION_NAME, id);
  } catch (error) {
    console.error('Data layer: Failed to delete Chinese sentence card:', error);
    throw error;
  }
}

/**
 * Subscribe to real-time updates for Chinese sentence flashcards
 */
export function subscribeToChineseSentenceCards(
  callback: (cards: ChineseSentenceCardData[]) => void,
  collectionId?: string
): () => void {
  return subscribeToCollection<ChineseSentenceCardData>(COLLECTION_NAME, (cards) => {
    if (collectionId) {
      callback(cards.filter(card => card.collectionId === collectionId));
    } else {
      callback(cards);
    }
  }, { pageSize: 1000 });
}
