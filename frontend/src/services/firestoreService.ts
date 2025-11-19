import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData,
  Timestamp,
  serverTimestamp,
  onSnapshot,
  Unsubscribe,
} from 'firebase/firestore';
import { db } from '@/config/firebase';

/**
 * Generic Firestore Service
 *
 * Provides reusable CRUD operations for any Firestore collection.
 * Type-safe operations with automatic timestamp handling.
 *
 * Architecture:
 * - Generic types allow reuse across different data models
 * - Automatic createdAt/updatedAt timestamp management
 * - Error handling with descriptive messages
 * - Pagination support for large collections
 * - Real-time listener support
 */

/**
 * Base interface for Firestore documents
 * All document types should extend this
 */
export interface FirestoreDocument {
  id?: string;
  createdAt?: number;
  updatedAt?: number;
}

/**
 * Pagination options for queries
 */
export interface PaginationOptions {
  pageSize?: number;
  lastDoc?: QueryDocumentSnapshot<DocumentData>;
}

/**
 * Response type for paginated queries
 */
export interface PaginatedResponse<T> {
  data: T[];
  lastDoc?: QueryDocumentSnapshot<DocumentData>;
  hasMore: boolean;
}

/**
 * Create a new document in a Firestore collection
 *
 * @param collectionName - Name of the Firestore collection
 * @param data - Document data (without id, timestamps added automatically)
 * @returns Promise<T> - Created document with generated ID and timestamps
 *
 * @example
 * const card = await createDocument('chinese_flashcards', {
 *   chineseWord: '你好',
 *   englishWord: 'Hello',
 *   pinyin: 'Nǐ hǎo'
 * });
 */
export async function createDocument<T extends FirestoreDocument>(
  collectionName: string,
  data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>
): Promise<T> {
  try {
    const collectionRef = collection(db, collectionName);

    // Add timestamps
    const docData = {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    // Add document to Firestore
    const docRef = await addDoc(collectionRef, docData);

    // Fetch the created document to get the server-generated timestamps
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error('Failed to retrieve created document');
    }

    // Convert Firestore Timestamps to milliseconds for consistency
    const docDataWithId = convertTimestamps({
      id: docRef.id,
      ...docSnap.data(),
    }) as T;

    return docDataWithId;
  } catch (error) {
    console.error(`Firestore: Failed to create document in ${collectionName}:`, error);
    throw new Error(`Failed to create document: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Get all documents from a Firestore collection with optional pagination
 *
 * @param collectionName - Name of the Firestore collection
 * @param options - Pagination options (pageSize, lastDoc for cursor-based pagination)
 * @returns Promise<PaginatedResponse<T>> - Array of documents with pagination info
 *
 * @example
 * const { data, lastDoc, hasMore } = await getAllDocuments('chinese_flashcards', { pageSize: 50 });
 */
export async function getAllDocuments<T extends FirestoreDocument>(
  collectionName: string,
  options: PaginationOptions = {}
): Promise<PaginatedResponse<T>> {
  try {
    const collectionRef = collection(db, collectionName);
    const { pageSize = 1000, lastDoc } = options;

    // Build query with pagination
    let q = query(collectionRef, limit(pageSize + 1)); // +1 to check if there are more

    if (lastDoc) {
      q = query(collectionRef, startAfter(lastDoc), limit(pageSize + 1));
    }

    const querySnapshot = await getDocs(q);
    const documents: T[] = [];
    const docs = querySnapshot.docs;

    // Check if there are more documents
    const hasMore = docs.length > pageSize;
    const dataToProcess = hasMore ? docs.slice(0, pageSize) : docs;

    dataToProcess.forEach((doc) => {
      documents.push(convertTimestamps({
        id: doc.id,
        ...doc.data(),
      }) as T);
    });

    return {
      data: documents,
      lastDoc: dataToProcess[dataToProcess.length - 1],
      hasMore,
    };
  } catch (error) {
    console.error(`Firestore: Failed to fetch documents from ${collectionName}:`, error);
    throw new Error(`Failed to fetch documents: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Get a single document by ID from a Firestore collection
 *
 * @param collectionName - Name of the Firestore collection
 * @param id - Document ID
 * @returns Promise<T | null> - Document data or null if not found
 *
 * @example
 * const card = await getDocumentById('chinese_flashcards', 'abc123');
 */
export async function getDocumentById<T extends FirestoreDocument>(
  collectionName: string,
  id: string
): Promise<T | null> {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return convertTimestamps({
      id: docSnap.id,
      ...docSnap.data(),
    }) as T;
  } catch (error) {
    console.error(`Firestore: Failed to fetch document ${id} from ${collectionName}:`, error);
    throw new Error(`Failed to fetch document: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Update an existing document in a Firestore collection
 *
 * @param collectionName - Name of the Firestore collection
 * @param id - Document ID
 * @param data - Updated document data (id and timestamps excluded)
 * @returns Promise<T> - Updated document
 *
 * @example
 * const updated = await updateDocument('chinese_flashcards', 'abc123', {
 *   chineseWord: '你好',
 *   englishWord: 'Hello (updated)',
 *   pinyin: 'Nǐ hǎo'
 * });
 */
export async function updateDocument<T extends FirestoreDocument>(
  collectionName: string,
  id: string,
  data: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<T> {
  try {
    const docRef = doc(db, collectionName, id);

    // Check if document exists
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error(`Document with ID ${id} not found`);
    }

    // Update document with new timestamp
    const updateData = {
      ...data,
      updatedAt: serverTimestamp(),
    };

    console.log('🔍 updateDocument - about to call updateDoc with:', {
      collectionName,
      id,
      updateData,
      dataKeys: Object.keys(updateData),
      dataValues: Object.values(updateData).map(v => typeof v === 'object' ? `[object ${v?.constructor?.name}]` : typeof v)
    });

    await updateDoc(docRef, updateData);

    // Fetch updated document
    const updatedSnap = await getDoc(docRef);

    if (!updatedSnap.exists()) {
      throw new Error('Failed to retrieve updated document');
    }

    return convertTimestamps({
      id: updatedSnap.id,
      ...updatedSnap.data(),
    }) as T;
  } catch (error) {
    console.error(`Firestore: Failed to update document ${id} in ${collectionName}:`, error);
    throw new Error(`Failed to update document: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Delete a document from a Firestore collection
 *
 * @param collectionName - Name of the Firestore collection
 * @param id - Document ID
 * @returns Promise<boolean> - True if deletion was successful
 *
 * @example
 * const success = await deleteDocument('chinese_flashcards', 'abc123');
 */
export async function deleteDocument(
  collectionName: string,
  id: string
): Promise<boolean> {
  try {
    const docRef = doc(db, collectionName, id);

    // Check if document exists
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error(`Document with ID ${id} not found`);
    }

    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error(`Firestore: Failed to delete document ${id} from ${collectionName}:`, error);
    throw new Error(`Failed to delete document: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Subscribe to real-time updates for a collection
 *
 * @param collectionName - Name of the Firestore collection
 * @param callback - Function called when collection changes
 * @param options - Pagination options
 * @returns Unsubscribe function to stop listening
 *
 * @example
 * const unsubscribe = subscribeToCollection('chinese_flashcards', (cards) => {
 *   console.log('Cards updated:', cards);
 * });
 *
 * // Later: unsubscribe();
 */
export function subscribeToCollection<T extends FirestoreDocument>(
  collectionName: string,
  callback: (data: T[]) => void,
  options: PaginationOptions = {}
): Unsubscribe {
  const collectionRef = collection(db, collectionName);
  const { pageSize = 1000 } = options;

  const q = query(collectionRef, limit(pageSize));

  return onSnapshot(
    q,
    (querySnapshot) => {
      const documents: T[] = [];
      querySnapshot.forEach((doc) => {
        documents.push(convertTimestamps({
          id: doc.id,
          ...doc.data(),
        }) as T);
      });
      callback(documents);
    },
    (error) => {
      console.error(`Firestore: Snapshot listener error for ${collectionName}:`, error);
    }
  );
}

/**
 * Helper function to convert Firestore Timestamps to milliseconds
 * Firestore returns Timestamp objects, but we want simple numbers for easier handling
 */
function convertTimestamps(data: DocumentData): DocumentData {
  const converted = { ...data };

  if (converted.createdAt instanceof Timestamp) {
    converted.createdAt = converted.createdAt.toMillis();
  }

  if (converted.updatedAt instanceof Timestamp) {
    converted.updatedAt = converted.updatedAt.toMillis();
  }

  return converted;
}
