/**
 * Chinese Flashcard gRPC-Web Service
 *
 * This service implements the Chinese flashcard API using gRPC-Web.
 * The generated gRPC-Web client natively returns Promises when called without a callback.
 */

import { ChineseFlashCardServiceClient } from '../types/grpc-web/Chinese_cardServiceClientPb';
import {
  CreateChineseFlashCardRequest,
  CreateChineseFlashCardResponse,
  GetChineseFlashCardsRequest,
  GetChineseFlashCardsResponse,
  GetChineseFlashCardRequest,
  GetChineseFlashCardResponse,
  UpdateChineseFlashCardRequest,
  UpdateChineseFlashCardResponse,
  DeleteChineseFlashCardRequest,
  DeleteChineseFlashCardResponse,
} from '../types/grpc-web/chinese_card_pb';
import { GRPC_SERVER_URL, withErrorHandling } from './grpcService';

/**
 * Singleton client instance
 */
const client = new ChineseFlashCardServiceClient(GRPC_SERVER_URL, null, null);

/**
 * Get all Chinese flashcards with pagination
 *
 * @param page - Page number (0-indexed)
 * @param pageSize - Number of items per page
 * @returns Promise with list of flashcards and total count
 */
export function getAllFlashcards(
  page: number = 0,
  pageSize: number = 10
): Promise<GetChineseFlashCardsResponse> {
  const request = new GetChineseFlashCardsRequest();
  request.setPage(page);
  request.setPageSize(pageSize);

  return withErrorHandling(client.getChineseFlashCards(request));
}

/**
 * Get a single Chinese flashcard by ID
 *
 * @param id - Flashcard ID
 * @returns Promise with the flashcard
 */
export function getFlashcardById(id: number): Promise<GetChineseFlashCardResponse> {
  const request = new GetChineseFlashCardRequest();
  request.setId(id);

  return withErrorHandling(client.getChineseFlashCard(request));
}

/**
 * Create a new Chinese flashcard
 *
 * @param data - Flashcard data (chineseWord, englishWord, pinyin, img)
 * @returns Promise with the created flashcard
 */
export function createFlashcard(data: {
  chineseWord: string;
  englishWord: string;
  pinyin: string;
  img?: string;
}): Promise<CreateChineseFlashCardResponse> {
  const request = new CreateChineseFlashCardRequest();
  request.setChineseWord(data.chineseWord);
  request.setEnglishWord(data.englishWord);
  request.setPinyin(data.pinyin);
  if (data.img) {
    request.setImg(data.img);
  }

  return withErrorHandling(client.createChineseFlashCard(request));
}

/**
 * Update an existing Chinese flashcard
 *
 * @param id - Flashcard ID
 * @param data - Updated flashcard data
 * @returns Promise with the updated flashcard
 */
export function updateFlashcard(
  id: number,
  data: {
    chineseWord: string;
    englishWord: string;
    pinyin: string;
    img?: string;
  }
): Promise<UpdateChineseFlashCardResponse> {
  const request = new UpdateChineseFlashCardRequest();
  request.setId(id);
  request.setChineseWord(data.chineseWord);
  request.setEnglishWord(data.englishWord);
  request.setPinyin(data.pinyin);
  if (data.img) {
    request.setImg(data.img);
  }

  return withErrorHandling(client.updateChineseFlashCard(request));
}

/**
 * Delete a Chinese flashcard by ID
 *
 * @param id - Flashcard ID
 * @returns Promise with the deletion response
 */
export function deleteFlashcard(id: number): Promise<DeleteChineseFlashCardResponse> {
  const request = new DeleteChineseFlashCardRequest();
  request.setId(id);

  return withErrorHandling(client.deleteChineseFlashCard(request));
}

/**
 * Export the client instance for advanced use cases
 */
export { client as chineseFlashcardClient };
