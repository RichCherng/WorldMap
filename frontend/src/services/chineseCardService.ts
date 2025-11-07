import axios from 'axios';
import { ChineseCardData } from '@/components/FlashCard/Language/ChineseCard';
import { mockChineseCardData, ChineseCardAPIResponse, CHINESE_CARDS_API_ENDPOINT } from '@/data/chineseCardData';

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
