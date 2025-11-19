import {
    doc,
    updateDoc,
} from 'firebase/firestore';
import { db } from '@/config/firebase';

/**
 * Update the favorite state of a vocabulary item
 * Uses optimistic update pattern - caller updates UI immediately before calling this
 * 
 * @param vocabId - The Firestore document ID
 * @param favorite - The new favorite state
 * @returns Promise<void>
 * 
 * @example
 * // Optimistic update pattern:
 * setIsFavorite(true);  // Update UI immediately
 * await updateVocabFavorite(vocabId, true);  // Persist to Firebase
 */
export async function updateVocabFavorite(
    vocabId: string,
    favorite: boolean
): Promise<void> {
    try {
        const vocabRef = doc(db, 'chinese_flashcards', vocabId);
        await updateDoc(vocabRef, {
            favorite: favorite
        });
        console.log(`Updated favorite for ${vocabId}: ${favorite}`);
    } catch (error) {
        console.error('Error updating favorite:', error);
        // Note: UI already updated optimistically, caller can choose to revert on error
        throw error;
    }
}
