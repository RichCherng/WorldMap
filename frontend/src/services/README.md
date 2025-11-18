# gRPC-Web Services

This directory contains gRPC-Web service layers for all application features (flashcards, etc.).

## Architecture

The service layer follows a **generic + specific** pattern for maximum reusability:

### Generic Layer (`grpcService.ts`)
- `withErrorHandling()` - Wraps gRPC calls with consistent error handling
- `handleGrpcError()` - Converts gRPC errors to user-friendly messages
- `GRPC_SERVER_URL` - Centralized server configuration

### Language-Specific Layers
- `chineseFlashcardGrpcService.ts` - Chinese flashcard API
- `frenchFlashcardGrpcService.ts` (future) - French flashcard API

**Note**: The generated gRPC-Web clients natively return Promises when called without a callback. We wrap them with `withErrorHandling()` for consistent error handling.

## Usage Example

### Chinese Flashcards

```typescript
import {
  getAllFlashcards,
  getFlashcardById,
  createFlashcard,
  updateFlashcard,
  deleteFlashcard
} from './chineseFlashcardGrpcService';

// Get all flashcards (paginated)
const response = await getAllFlashcards(0, 10);
console.log(response.getFlashcardsList());
console.log(response.getTotalCount());

// Get by ID
const card = await getFlashcardById(123);
console.log(card.getFlashcard()?.getChineseWord());

// Create new flashcard
const newCard = await createFlashcard({
  chineseWord: '你好',
  englishWord: 'Hello',
  pinyin: 'nǐ hǎo',
  img: 'https://example.com/image.jpg' // optional
});

// Update flashcard
const updated = await updateFlashcard(123, {
  chineseWord: '你好',
  englishWord: 'Hello',
  pinyin: 'nǐ hǎo',
  img: 'https://example.com/image.jpg'
});

// Delete flashcard
await deleteFlashcard(123);
```

## Adding a New Language (e.g., French)

To add French flashcard support, follow this pattern:

### 1. Generate gRPC-Web client stubs
```bash
npm run generate:grpc-web  # Update script to include french_flashcard.proto
```

### 2. Create French-specific service
Create `frenchFlashcardGrpcService.ts`:

```typescript
import { FrenchFlashCardServiceClient } from '../types/grpc-web/French_cardServiceClientPb';
import {
  GetFrenchFlashCardsRequest,
  GetFrenchFlashCardsResponse,
  // ... other imports
} from '../types/grpc-web/french_card_pb';
import { GRPC_SERVER_URL, withErrorHandling } from './grpcService';

const client = new FrenchFlashCardServiceClient(GRPC_SERVER_URL, null, null);

export function getAllFlashcards(
  page = 0,
  pageSize = 10
): Promise<GetFrenchFlashCardsResponse> {
  const request = new GetFrenchFlashCardsRequest();
  request.setPage(page);
  request.setPageSize(pageSize);

  return withErrorHandling(client.getFrenchFlashCards(request));
}

// ... implement other methods following the same pattern
```

### 3. Use in React components
```typescript
import * as FrenchFlashcards from './frenchFlashcardGrpcService';

const response = await FrenchFlashcards.getAllFlashcards(0, 10);
```

## Configuration

### Server URL
Set the gRPC server URL via environment variable:

**Development** (`.env.development`):
```
REACT_APP_GRPC_URL=http://localhost:8080
```

**Production** (`.env.production`):
```
REACT_APP_GRPC_URL=https://api.yourapp.com
```

If not set, defaults to `http://localhost:8080`.

## Error Handling

All service functions are wrapped with `withErrorHandling()` which provides:

1. **Automatic error conversion** - Converts gRPC errors to user-friendly messages
2. **Detailed logging** - Logs error details (code, message, metadata) to console
3. **Type-safe error handling** - Uses gRPC's `StatusCode` enum

### Usage Example

```typescript
try {
  const response = await getAllFlashcards(0, 10);
  // Handle success
} catch (error) {
  console.error('Failed to fetch flashcards:', error);
  // Error format: [gRPC STATUS_CODE] User-friendly message
}
```

### Error Format
`[gRPC STATUS_CODE] User-friendly message`

### Common Status Codes & Messages

| Status Code | User-friendly Message |
|------------|----------------------|
| `NOT_FOUND` (5) | "The requested resource was not found" |
| `INVALID_ARGUMENT` (3) | "Invalid request data" |
| `UNAVAILABLE` (14) | "Server is currently unavailable. Please try again later." |
| `INTERNAL` (13) | "An internal server error occurred" |
| `PERMISSION_DENIED` (7) | "Authentication required or permission denied" |
| `UNAUTHENTICATED` (16) | "Authentication required or permission denied" |

See [gRPC Status Codes](https://grpc.github.io/grpc/core/md_doc_statuscodes.html) for full list.

## Benefits of This Pattern

1. **Reusability** - Generic `grpcService.ts` reduces code duplication across all services
2. **Type Safety** - Full TypeScript type checking with auto-generated types from protobuf
3. **Consistency** - All services follow the same pattern (import `withErrorHandling`, wrap client calls)
4. **Better Error Messages** - User-friendly messages instead of cryptic gRPC error codes
5. **Maintainability** - Easy to add new services (flashcards, users, etc.) or update existing ones
6. **Testability** - Each service can be mocked and tested independently
7. **Native Promises** - Uses gRPC-Web's built-in Promise support (no custom wrappers needed)

## How It Works

1. **Generated Code**: `protoc-gen-grpc-web` generates TypeScript client stubs from `.proto` files
2. **Promise Support**: When called without a callback, gRPC-Web clients return native Promises
3. **Error Wrapping**: `withErrorHandling()` catches gRPC errors and converts them to friendly messages
4. **Service Layer**: Each feature (Chinese flashcards, French flashcards, etc.) gets its own service file that uses the generic error handling

### Example Flow
```typescript
// User calls service function
getAllFlashcards(0, 10)
  ↓
// Service creates request and calls gRPC-Web client
const request = new GetChineseFlashCardsRequest();
client.getChineseFlashCards(request)  // Returns Promise<Response>
  ↓
// Wrapped with error handling
withErrorHandling(promise)
  ↓
// If error occurs, converts to user-friendly message
// If success, returns response
Promise<GetChineseFlashCardsResponse>
```
