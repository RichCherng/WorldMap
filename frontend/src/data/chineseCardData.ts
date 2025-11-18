import { ChineseCardData } from '@/components/FlashCard/Language/ChineseCard';
import {
  createDocument,
  getAllDocuments,
  updateDocument,
  deleteDocument,
  subscribeToCollection,
} from '@/services/firestoreService';
import { deleteField } from 'firebase/firestore';

/**
 * Data Layer for Chinese Flashcards
 *
 * This layer handles all data operations for Chinese flashcards, providing a clean
 * interface between UI components and the Firestore database. It abstracts away
 * Firestore complexity and provides type-safe CRUD operations.
 *
 * Architecture:
 * UI Components → Data Layer (this file) → Firestore Service → Firebase/Firestore
 */

// Firestore collection name for Chinese flashcards
const COLLECTION_NAME = 'chinese_flash_cards';

/**
 * Fetch all Chinese flashcards from Firestore
 *
 * @returns Promise<ChineseCardData[]> - Array of Chinese flashcards
 * @throws Error if the Firestore request fails
 */
export async function fetchChineseCards(): Promise<ChineseCardData[]> {
  try {
    // Fetch all cards from Firestore (pagination can be added later if needed)
    const response = await getAllDocuments<ChineseCardData>(COLLECTION_NAME, { pageSize: 1000 });

    // Return the data array from the paginated response
    return response.data;
  } catch (error) {
    // Re-throw error - it's already been formatted by the Firestore service layer
    console.error('Data layer: Failed to fetch Chinese cards:', error);
    throw error;
  }
}

/**
 * Add a new Chinese flashcard to Firestore
 *
 * @param data - Flashcard data to create (chineseWord, englishWord, pinyin, optional img)
 * @returns Promise<ChineseCardData> - The created flashcard with generated ID
 * @throws Error if the Firestore request fails or validation errors occur
 */
export async function addChineseCard(data: {
  chineseWord: string;
  englishWord: string;
  pinyin: string;
  img?: string;
  exampleUsage?: string;
}): Promise<ChineseCardData> {
  try {
    console.log('➕ Adding new Chinese card with data:', data);

    // Remove undefined fields to prevent Firestore errors
    const cleanData: any = {
      chineseWord: data.chineseWord,
      englishWord: data.englishWord,
      pinyin: data.pinyin,
    };

    if (data.img) {
      cleanData.img = data.img;
    }

    if (data.exampleUsage) {
      cleanData.exampleUsage = data.exampleUsage;
    }

    console.log('🧹 Cleaned data for Firestore:', cleanData);

    // Call Firestore service to create the flashcard
    // The service will automatically add id, createdAt, and updatedAt
    const card = await createDocument<ChineseCardData>(COLLECTION_NAME, cleanData);

    console.log('✅ Created card received from Firestore:', card);

    return card;
  } catch (error) {
    // Re-throw error - it's already been formatted by the Firestore service layer
    console.error('❌ Data layer: Failed to add Chinese card:', error);
    throw error;
  }
}

/**
 * Update an existing Chinese flashcard in Firestore
 *
 * @param id - ID of the flashcard to update
 * @param data - Updated flashcard data (chineseWord, englishWord, pinyin, optional img)
 * @returns Promise<ChineseCardData> - The updated flashcard
 * @throws Error if the Firestore request fails, card not found, or validation errors occur
 */
export async function updateChineseCard(
  id: string,
  data: {
    chineseWord: string;
    englishWord: string;
    pinyin: string;
    img?: string;
    exampleUsage?: string;
  }
): Promise<ChineseCardData> {
  try {
    // Build update data with required fields
    const cleanData: any = {
      chineseWord: data.chineseWord,
      englishWord: data.englishWord,
      pinyin: data.pinyin,
    };

    // Handle optional img field
    if (data.img) {
      cleanData.img = data.img;
    }

    // Handle exampleUsage field - use deleteField() if empty/undefined
    if (data.exampleUsage) {
      cleanData.exampleUsage = data.exampleUsage;
    } else {
      // Explicitly delete the field from Firestore if it's empty/undefined
      cleanData.exampleUsage = deleteField();
    }

    console.log('🔄 Updating card with data:', { id, cleanData, hasDeleteField: cleanData.exampleUsage === deleteField() });

    // Call Firestore service to update the flashcard
    // The service will automatically update the updatedAt timestamp
    const card = await updateDocument<ChineseCardData>(COLLECTION_NAME, id, cleanData);

    console.log('✅ Updated card received from Firestore:', card);

    return card;
  } catch (error) {
    // Re-throw error - it's already been formatted by the Firestore service layer
    console.error('Data layer: Failed to update Chinese card:', error);
    throw error;
  }
}

/**
 * Delete a Chinese flashcard from Firestore
 *
 * @param id - ID of the flashcard to delete
 * @returns Promise<boolean> - True if deletion was successful
 * @throws Error if the Firestore request fails or card not found
 */
export async function deleteChineseCard(id: string): Promise<boolean> {
  try {
    // Call Firestore service to delete the flashcard
    const success = await deleteDocument(COLLECTION_NAME, id);

    return success;
  } catch (error) {
    // Re-throw error - it's already been formatted by the Firestore service layer
    console.error('Data layer: Failed to delete Chinese card:', error);
    throw error;
  }
}

/**
 * Subscribe to real-time updates for Chinese flashcards
 *
 * @param callback - Function called when cards change
 * @returns Unsubscribe function to stop listening
 *
 * @example
 * const unsubscribe = subscribeToChineseCards((cards) => {
 *   console.log('Cards updated:', cards);
 * });
 * // Later: unsubscribe();
 */
export function subscribeToChineseCards(
  callback: (cards: ChineseCardData[]) => void
): () => void {
  return subscribeToCollection<ChineseCardData>(COLLECTION_NAME, callback, { pageSize: 1000 });
}

/**
 * Mock data for Chinese flashcards.
 * Kept as reference and for fallback scenarios.
 * Note: IDs changed to strings for Firestore compatibility
 */
export const mockChineseCardData: ChineseCardData[] = [
  {
    id: 'mock-1',
    chineseWord: '你好',
    englishWord: 'Hello',
    pinyin: 'Nǐ hǎo',
    img: 'https://i.pinimg.com/736x/82/42/75/824275fa74fdff9a946834a52e38ff6c.jpg'
  },
  {
    id: 'mock-2',
    chineseWord: '谢谢',
    englishWord: 'Thank you',
    pinyin: 'Xièxiè'
  },
  {
    id: 'mock-3',
    chineseWord: '再见',
    englishWord: 'Goodbye',
    pinyin: 'Zàijiàn'
  },
  {
    id: 'mock-4',
    chineseWord: '请',
    englishWord: 'Please',
    pinyin: 'Qǐng'
  },
  {
    id: 'mock-5',
    chineseWord: '我',
    englishWord: 'I, me',
    pinyin: 'Wǒ'
  },
  {
    id: 'mock-6',
    chineseWord: '是',
    englishWord: 'Yes/to be',
    pinyin: 'Shì'
  },
  {
    id: 'mock-7',
    chineseWord: '不',
    englishWord: 'No/not',
    pinyin: 'Bù'
  },
  {
    id: 'mock-8',
    chineseWord: '水',
    englishWord: 'Water',
    pinyin: 'Shuǐ'
  },
  {
    id: 'mock-9',
    chineseWord: '吃',
    englishWord: 'To eat',
    pinyin: 'Chī'
  },
  {
    id: 'mock-10',
    chineseWord: '喝',
    englishWord: 'To drink',
    pinyin: 'Hē'
  },
  {
    id: 'mock-11',
    chineseWord: '好',
    englishWord: 'Good',
    pinyin: 'Hǎo'
  },
  {
    id: 'mock-12',
    chineseWord: '爱',
    englishWord: 'Love',
    pinyin: 'Ài'
  },
  {
    id: 'mock-13',
    chineseWord: '家',
    englishWord: 'Home/family',
    pinyin: 'Jiā'
  },
  {
    id: 'mock-14',
    chineseWord: '朋友',
    englishWord: 'Friend',
    pinyin: 'Péngyǒu'
  },
  {
    id: 'mock-15',
    chineseWord: '学习',
    englishWord: 'To study',
    pinyin: 'Xuéxí'
  },
];

/**
 * API Response interface for Chinese card data
 * This defines the expected structure from the backend API
 */
export interface ChineseCardAPIResponse {
  success: boolean;
  data: ChineseCardData[];
  message?: string;
  error?: string;
}

/**
 * Placeholder for future API endpoint
 * Replace this with actual API call when backend is ready
 */
export const CHINESE_CARDS_API_ENDPOINT = '/api/flashcards/chinese';
