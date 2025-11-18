/**
 * @deprecated This file is deprecated and no longer used.
 * Use the Data Layer approach instead: frontend/src/data/chineseCardData.ts
 * 
 * The Data Layer pattern provides:
 * - Clean separation between UI and API logic
 * - Type-safe gRPC-Web integration
 * - Centralized protobuf mapping
 * - Better testability
 * 
 * See: frontend/src/data/chineseCardData.ts for the new implementation
 * See: frontend/src/services/chineseFlashcardGrpcService.ts for gRPC-Web service
 */

import axios from 'axios';
import { ChineseCardData } from '@/components/FlashCard/Language/ChineseCard';
import { mockChineseCardData, ChineseCardAPIResponse, CHINESE_CARDS_API_ENDPOINT } from '@/data/chineseCardData';

/**
 * Input interface for adding a new Chinese card
 */
export interface AddChineseCardInput {
  chineseWord: string;
  englishWord: string;
  pinyin: string;
  img?: string;
}

/**
 * Fetches Chinese flashcard data from the API
 * Currently returns mock data until backend is fully implemented
 *
 * @returns Promise with array of ChineseCardData
 * @throws Error if the API request fails
 */
export const fetchChineseCards = async (): Promise<ChineseCardData[]> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const response = await axios.get<ChineseCardAPIResponse>(CHINESE_CARDS_API_ENDPOINT);

    // Simulate API call with mock data
    // This simulates network delay for realistic loading states
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simulate API response structure
    const mockResponse: ChineseCardAPIResponse = {
      success: true,
      data: mockChineseCardData,
      message: 'Chinese cards fetched successfully (mock data)'
    };

    if (!mockResponse.success) {
      throw new Error(mockResponse.error || 'Failed to fetch Chinese cards');
    }

    return mockResponse.data;

    // When backend is ready, uncomment this:
    // if (!response.data.success) {
    //   throw new Error(response.data.error || 'Failed to fetch Chinese cards');
    // }
    // return response.data.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
        error.message ||
        'Failed to fetch Chinese cards from server'
      );
    }
    throw error;
  }
};

/**
 * Adds a new Chinese flashcard to the collection
 * Currently simulates API call until backend is fully implemented
 *
 * @param cardInput - The card data to add
 * @returns Promise with the newly created ChineseCardData
 * @throws Error if the API request fails
 */
export const addChineseCard = async (cardInput: AddChineseCardInput): Promise<ChineseCardData> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const response = await axios.post<{ success: boolean; data: ChineseCardData; message?: string; error?: string }>(
    //   CHINESE_CARDS_API_ENDPOINT,
    //   cardInput
    // );

    // Simulate API call with mock data
    await new Promise(resolve => setTimeout(resolve, 300));

    // Generate new ID (in real app, backend would generate this)
    const newId = Date.now();

    // Create the new card
    const newCard: ChineseCardData = {
      id: newId,
      chineseWord: cardInput.chineseWord,
      englishWord: cardInput.englishWord,
      pinyin: cardInput.pinyin,
      img: cardInput.img
    };

    // Simulate API response structure
    const mockResponse = {
      success: true,
      data: newCard,
      message: 'Chinese card added successfully (mock data)'
    };

    if (!mockResponse.success) {
      throw new Error('Failed to add Chinese card');
    }

    return mockResponse.data;

    // When backend is ready, uncomment this:
    // if (!response.data.success) {
    //   throw new Error(response.data.error || 'Failed to add Chinese card');
    // }
    // return response.data.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
        error.message ||
        'Failed to add Chinese card to server'
      );
    }
    throw error;
  }
};

/**
 * Deletes a Chinese flashcard from the collection
 * Currently simulates API call until backend is fully implemented
 *
 * @param cardId - The ID of the card to delete
 * @returns Promise that resolves when deletion is complete
 * @throws Error if the API request fails
 */
export const deleteChineseCard = async (cardId: number): Promise<void> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const response = await axios.delete<{ success: boolean; message?: string; error?: string }>(
    //   `${CHINESE_CARDS_API_ENDPOINT}/${cardId}`
    // );

    // Simulate API call with mock data
    await new Promise(resolve => setTimeout(resolve, 300));

    // Simulate API response structure
    const mockResponse = {
      success: true,
      message: 'Chinese card deleted successfully (mock data)'
    };

    if (!mockResponse.success) {
      throw new Error('Failed to delete Chinese card');
    }

    // When backend is ready, uncomment this:
    // if (!response.data.success) {
    //   throw new Error(response.data.error || 'Failed to delete Chinese card');
    // }

  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
        error.message ||
        'Failed to delete Chinese card from server'
      );
    }
    throw error;
  }
};

/**
 * Fetches Chinese flashcard data by collection/category ID
 * For future implementation when backend supports multiple collections
 *
 * @param collectionId - The ID of the card collection to fetch
 * @returns Promise with array of ChineseCardData
 */
export const fetchChineseCardsByCollection = async (collectionId: string): Promise<ChineseCardData[]> => {
  try {
    // TODO: Implement when backend supports collections
    // const response = await axios.get<ChineseCardAPIResponse>(
    //   `${CHINESE_CARDS_API_ENDPOINT}/collection/${collectionId}`
    // );

    // For now, return mock data
    await new Promise(resolve => setTimeout(resolve, 500));

    const mockResponse: ChineseCardAPIResponse = {
      success: true,
      data: mockChineseCardData,
      message: `Chinese cards for collection ${collectionId} fetched successfully (mock data)`
    };

    if (!mockResponse.success) {
      throw new Error(mockResponse.error || 'Failed to fetch Chinese cards');
    }

    return mockResponse.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
        error.message ||
        'Failed to fetch Chinese cards from server'
      );
    }
    throw error;
  }
};
