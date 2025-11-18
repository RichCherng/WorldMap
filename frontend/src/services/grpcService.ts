/**
 * Generic gRPC-Web Service Layer
 *
 * This service provides a reusable pattern for all gRPC-Web clients.
 * It can be used for flashcards, user management, or any other gRPC services.
 *
 * Features:
 * - Type-safe requests and responses
 * - Proper error handling with gRPC status codes
 * - Promise-based API (natively supported by gRPC-Web clients)
 * - Environment-based configuration
 */

import { RpcError, StatusCode } from 'grpc-web';

/**
 * Get gRPC server URL from environment variable or use default
 * Set REACT_APP_GRPC_URL in .env.development or .env.production
 */
const GRPC_SERVER_URL = process.env.REACT_APP_GRPC_URL || 'http://localhost:8080';

// Log the configured gRPC server URL in development
if (process.env.NODE_ENV === 'development') {
  console.log(`[gRPC-Web] Configured server URL: ${GRPC_SERVER_URL}`);
}

/**
 * Generic gRPC error handler with detailed error information
 *
 * @param error - The gRPC error
 * @returns Never (always throws)
 */
export function handleGrpcError(error: RpcError): never {
  const statusCode = error.code ?? StatusCode.UNKNOWN;
  const message = error.message || 'Unknown gRPC error';
  const metadata = error.metadata;

  console.error('[gRPC Error]', {
    code: statusCode,
    message,
    metadata,
  });

  // Provide user-friendly error messages based on status code
  let userMessage = message;
  switch (statusCode) {
    case StatusCode.NOT_FOUND:
      userMessage = 'The requested resource was not found';
      break;
    case StatusCode.INVALID_ARGUMENT:
      userMessage = 'Invalid request data';
      break;
    case StatusCode.UNAVAILABLE:
      userMessage = 'Server is currently unavailable. Please try again later.';
      break;
    case StatusCode.INTERNAL:
      userMessage = 'An internal server error occurred';
      break;
    case StatusCode.PERMISSION_DENIED:
    case StatusCode.UNAUTHENTICATED:
      userMessage = 'Authentication required or permission denied';
      break;
  }

  throw new Error(`[gRPC ${statusCode}] ${userMessage}`);
}

/**
 * Wraps a gRPC-Web Promise call with error handling
 *
 * Note: gRPC-Web clients natively return Promises when called without a callback.
 * This wrapper adds consistent error handling.
 *
 * @param promise - The Promise returned by the gRPC-Web client
 * @returns Promise with the response
 */
export async function withErrorHandling<T>(promise: Promise<T>): Promise<T> {
  try {
    return await promise;
  } catch (error) {
    throw handleGrpcError(error as RpcError);
  }
}

/**
 * Export the gRPC server URL for client initialization
 */
export { GRPC_SERVER_URL };
