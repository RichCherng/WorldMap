/**
 * Generic API Response wrapper
 * Can be used for all API endpoints
 */
export interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
  timestamp?: string;
}

/**
 * API Error structure
 */
export interface APIError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

/**
 * Loading state for API calls
 */
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}
