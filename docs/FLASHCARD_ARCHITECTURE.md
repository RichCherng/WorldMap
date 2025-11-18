# Flashcard Feature Architecture

**Last Updated**: November 17, 2025  
**Status**: Production Ready  
**Architecture**: gRPC + Data Layer Pattern

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture Diagram](#architecture-diagram)
3. [Technology Stack](#technology-stack)
4. [Backend Architecture](#backend-architecture)
5. [Frontend Architecture](#frontend-architecture)
6. [Data Flow](#data-flow)
7. [API Reference](#api-reference)
8. [Error Handling](#error-handling)
9. [Testing Strategy](#testing-strategy)
10. [Development Workflow](#development-workflow)
11. [Deployment Guide](#deployment-guide)
12. [Future Enhancements](#future-enhancements)

---

## Overview

The Flashcard feature is a full-stack Chinese language learning application that allows users to create, manage, and study vocabulary flashcards. The feature uses a modern gRPC-based architecture with Protocol Buffers for type-safe communication between the frontend and backend.

**Key Features**:
- ✅ Create, Read, Update, Delete (CRUD) flashcards
- ✅ Interactive card flipping animations
- ✅ Pinyin pronunciation display
- ✅ Optional image support
- ✅ Real-time data persistence with Firestore
- ✅ Mock data fallback for development
- ✅ Type-safe API contracts with Protocol Buffers
- ✅ Clean Data Layer pattern for separation of concerns

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                          FRONTEND (React)                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ UI Components                                                │  │
│  │ - FlashCardPage.tsx                                          │  │
│  │ - ChineseVocabCollection.tsx                                 │  │
│  │ - CardStack.tsx                                              │  │
│  │ - ChineseCard.tsx                                            │  │
│  └──────────────┬───────────────────────────────────────────────┘  │
│                 │ Uses ChineseCardData (TypeScript interface)       │
│                 ↓                                                   │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ Data Layer (chineseCardData.ts)                              │  │
│  │ - fetchChineseCards(): Promise<ChineseCardData[]>            │  │
│  │ - addChineseCard(data): Promise<ChineseCardData>             │  │
│  │ - updateChineseCard(id, data): Promise<ChineseCardData>      │  │
│  │ - deleteChineseCard(id): Promise<boolean>                    │  │
│  │                                                              │  │
│  │ Responsibilities:                                            │  │
│  │ - Maps Protobuf ↔ TypeScript types                          │  │
│  │ - Provides clean CRUD interface                             │  │
│  │ - Handles business logic                                    │  │
│  └──────────────┬───────────────────────────────────────────────┘  │
│                 │ Calls gRPC-Web service                            │
│                 ↓                                                   │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ gRPC-Web Service Layer (chineseFlashcardGrpcService.ts)      │  │
│  │ - getAllFlashcards(page, pageSize)                           │  │
│  │ - getFlashcardById(id)                                       │  │
│  │ - createFlashcard(data)                                      │  │
│  │ - updateFlashcard(id, data)                                  │  │
│  │ - deleteFlashcard(id)                                        │  │
│  │                                                              │  │
│  │ Responsibilities:                                            │  │
│  │ - Creates gRPC-Web requests                                 │  │
│  │ - Handles gRPC error codes                                  │  │
│  │ - Returns Protobuf responses                                │  │
│  └──────────────┬───────────────────────────────────────────────┘  │
│                 │                                                   │
└─────────────────┼───────────────────────────────────────────────────┘
                  │ gRPC-Web (HTTP/1.1)
                  │ Content-Type: application/grpc-web-text
                  ↓
┌─────────────────────────────────────────────────────────────────────┐
│                      BACKEND (Java + gRPC)                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ GrpcServer (Armeria)                                         │  │
│  │ - Port: 8080                                                 │  │
│  │ - Native gRPC-Web support                                    │  │
│  │ - CORS enabled for browser requests                          │  │
│  │ - Server Reflection enabled (for grpcui)                     │  │
│  └──────────────┬───────────────────────────────────────────────┘  │
│                 │ Routes to service                                 │
│                 ↓                                                   │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ ChineseFlashCardGrpcService                                  │  │
│  │ - Extends ChineseFlashCardServiceImplBase                    │  │
│  │ - Handles gRPC requests                                      │  │
│  │ - Delegates to business logic layer                          │  │
│  │ - Returns Protobuf responses                                 │  │
│  │                                                              │  │
│  │ RPC Methods:                                                 │  │
│  │ - CreateChineseFlashCard                                     │  │
│  │ - GetChineseFlashCards (with pagination)                     │  │
│  │ - GetChineseFlashCard                                        │  │
│  │ - UpdateChineseFlashCard                                     │  │
│  │ - DeleteChineseFlashCard                                     │  │
│  └──────────────┬───────────────────────────────────────────────┘  │
│                 │ Calls service layer                               │
│                 ↓                                                   │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ ChineseFlashCardService                                      │  │
│  │ - Business logic and validation                              │  │
│  │ - Protobuf ↔ Firestore mapping                              │  │
│  │ - Error handling                                             │  │
│  │ - Mock data fallback                                         │  │
│  └──────────────┬───────────────────────────────────────────────┘  │
│                 │ Uses generic service                              │
│                 ↓                                                   │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ FirestoreService (Generic)                                   │  │
│  │ - create(collection, docId, data, type)                      │  │
│  │ - get(collection, docId, type)                               │  │
│  │ - getAll(collection, page, pageSize, type)                   │  │
│  │ - update(collection, docId, data, type)                      │  │
│  │ - delete(collection, docId)                                  │  │
│  │ - count(collection)                                          │  │
│  │ - exists(collection, docId)                                  │  │
│  └──────────────┬───────────────────────────────────────────────┘  │
│                 │                                                   │
└─────────────────┼───────────────────────────────────────────────────┘
                  │ Firestore SDK
                  ↓
┌─────────────────────────────────────────────────────────────────────┐
│                      DATABASE (Firestore)                           │
├─────────────────────────────────────────────────────────────────────┤
│  Collection: chinese_flashcards                                     │
│                                                                     │
│  Document Structure:                                                │
│  {                                                                  │
│    id: number,                                                      │
│    chineseWord: string,                                             │
│    englishWord: string,                                             │
│    pinyin: string,                                                  │
│    img: string (optional),                                          │
│    createdAt: timestamp,                                            │
│    updatedAt: timestamp                                             │
│  }                                                                  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Backend
- **Language**: Java 21
- **RPC Framework**: gRPC (io.grpc:grpc-netty-shaded:1.68.1)
- **Web Framework**: Armeria 1.30.0 (native gRPC-Web support)
- **Dependency Injection**: Google Guice 7.0.0
- **Database**: Firebase Firestore
- **Serialization**: Protocol Buffers (proto3)
- **Build Tool**: Gradle 9.0
- **Testing**: JUnit 5, Mockito

### Frontend
- **Language**: TypeScript
- **Framework**: React 18
- **RPC Client**: grpc-web (official Google implementation)
- **State Management**: React Hooks (useState, useEffect)
- **Animation**: Framer Motion
- **Build Tool**: Vite
- **Testing**: Jest, React Testing Library (planned)

### Protocol Buffers
- **Syntax**: proto3
- **Java Generation**: protoc-gen-grpc-java plugin
- **TypeScript Generation**: protoc-gen-grpc-web plugin
- **Location**: `proto/chinese_card.proto`

---

## Backend Architecture

### 1. GrpcServer (Entry Point)

**File**: `src/main/java/com/worldmap/grpc/GrpcServer.java`

**Responsibilities**:
- Initialize and start gRPC server on port 8080
- Register all gRPC services via Guice Multibinder
- Enable Server Reflection for grpcui
- Enable Health Checking protocol
- Handle graceful shutdown

**Key Features**:
- Uses Armeria for native gRPC-Web support (no proxy needed)
- CORS configured for browser requests
- Single server instance for all services
- Dynamic service registration via dependency injection

### 2. ChineseFlashCardGrpcService (gRPC Layer)

**File**: `src/main/java/com/worldmap/grpc/ChineseFlashCardGrpcService.java`

**Responsibilities**:
- Implement gRPC service interface from protobuf
- Handle incoming RPC requests
- Delegate to business logic layer
- Send responses via StreamObserver
- Convert exceptions to gRPC errors

**Pattern**:
```java
@Override
public void createChineseFlashCard(
    CreateChineseFlashCardRequest request,
    StreamObserver<CreateChineseFlashCardResponse> responseObserver
) {
    try {
        CreateChineseFlashCardResponse response = service.create(request);
        responseObserver.onNext(response);
        responseObserver.onCompleted();
    } catch (Exception e) {
        responseObserver.onError(Status.INTERNAL
            .withDescription(e.getMessage())
            .asRuntimeException());
    }
}
```

### 3. ChineseFlashCardService (Business Logic Layer)

**File**: `src/main/java/com/worldmap/service/ChineseFlashCardService.java`

**Responsibilities**:
- Validate request data (required fields)
- Convert Protobuf ↔ Firestore documents
- Generate unique IDs and timestamps
- Call FirestoreService for database operations
- Build Protobuf response objects
- Handle errors with meaningful messages
- Provide mock data fallback

**Key Methods**:
- `create(CreateChineseFlashCardRequest)`: Validate, generate ID, save to Firestore
- `getAll(GetChineseFlashCardsRequest)`: Fetch with pagination, return list + count
- `getById(GetChineseFlashCardRequest)`: Fetch single card, handle not found
- `update(UpdateChineseFlashCardRequest)`: Validate, update timestamps, save
- `delete(DeleteChineseFlashCardRequest)`: Delete by ID, return success status

**Validation Rules**:
- `chineseWord`: Required, non-empty
- `englishWord`: Required, non-empty
- `pinyin`: Required, non-empty
- `img`: Optional

### 4. FirestoreService (Data Access Layer)

**File**: `src/main/java/com/worldmap/service/FirestoreService.java`

**Responsibilities**:
- Generic Firestore CRUD operations
- Handle Firestore connection and errors
- Support pagination and filtering
- Type-safe document conversion
- Null-safe when Firebase not configured

**Collection**: `chinese_flashcards`

---

## Frontend Architecture

### 1. Data Layer Pattern

The frontend uses a **Data Layer** pattern to separate API logic from UI logic:

**Benefits**:
- ✅ Single Responsibility: Data layer handles API, UI handles display
- ✅ Type Safety: Components work with TypeScript types, not protobuf objects
- ✅ Testability: Easy to mock data layer functions
- ✅ Centralized Mapping: Protobuf ↔ TypeScript conversion in one place
- ✅ Reusability: Multiple components can use the same data functions

### 2. Data Layer (chineseCardData.ts)

**File**: `frontend/src/data/chineseCardData.ts`

**Exported Functions**:

```typescript
// Fetch all Chinese flashcards
export async function fetchChineseCards(): Promise<ChineseCardData[]>

// Add a new Chinese flashcard
export async function addChineseCard(data: {
  chineseWord: string;
  englishWord: string;
  pinyin: string;
  img?: string;
}): Promise<ChineseCardData>

// Update an existing Chinese flashcard
export async function updateChineseCard(
  id: number,
  data: {
    chineseWord: string;
    englishWord: string;
    pinyin: string;
    img?: string;
  }
): Promise<ChineseCardData>

// Delete a Chinese flashcard
export async function deleteChineseCard(id: number): Promise<boolean>
```

**TypeScript Interface**:
```typescript
export interface ChineseCardData {
  id: number;
  chineseWord: string;
  englishWord: string;
  pinyin: string;
  img?: string;
}
```

**Protobuf Mapping Example**:
```typescript
// Protobuf → TypeScript
return response.getDataList().map((card) => ({
  id: card.getId(),
  chineseWord: card.getChineseWord(),
  englishWord: card.getEnglishWord(),
  pinyin: card.getPinyin(),
  img: card.getImg() || undefined
}));
```

### 3. gRPC-Web Service Layer

**File**: `frontend/src/services/chineseFlashcardGrpcService.ts`

**Responsibilities**:
- Create gRPC-Web client instance
- Build Protobuf request objects
- Make gRPC-Web calls
- Handle gRPC status codes
- Return Protobuf response objects

**Client Configuration**:
```typescript
const client = new ChineseFlashCardServiceClient(
  GRPC_SERVER_URL,  // http://localhost:8080
  null,
  null
);
```

**Error Handling**:
Uses `withErrorHandling()` wrapper from `grpcService.ts` to convert gRPC errors to user-friendly messages based on StatusCode.

### 4. UI Components

**ChineseVocabCollection.tsx**:
- Manages flashcard CRUD operations
- Calls data layer functions
- Displays error messages with error banner
- Notifies parent component of state changes

**FlashCardPage.tsx**:
- Main page component
- Renders CardStack with flashcards
- Integrates vocabulary management

**CardStack.tsx**:
- Displays stack of flashcards
- Handles drag interactions
- Random rotation for natural appearance

**ChineseCard.tsx**:
- Individual card display
- Flip animation on double-click
- Shows Chinese word (front) and English + Pinyin (back)

---

## Data Flow

### CREATE Flow (Add New Flashcard)

```
1. User fills form in ChineseVocabCollection
   ↓
2. handleAddVocab() calls addChineseCard(data)
   ↓
3. Data Layer (chineseCardData.ts):
   - Calls createFlashcard(data) from gRPC service
   - Maps Protobuf response → ChineseCardData
   ↓
4. gRPC-Web Service:
   - Creates CreateChineseFlashCardRequest
   - Sets fields: chineseWord, englishWord, pinyin, img
   - Makes gRPC-Web call to backend
   ↓
5. Backend (ChineseFlashCardGrpcService):
   - Receives request
   - Calls service.create(request)
   ↓
6. Business Logic (ChineseFlashCardService):
   - Validates required fields
   - Generates unique ID (System.currentTimeMillis())
   - Sets createdAt and updatedAt timestamps
   - Converts to Firestore document Map
   ↓
7. Data Access (FirestoreService):
   - Creates document in "chinese_flashcards" collection
   - Returns saved document
   ↓
8. Response flows back up:
   - Service builds CreateChineseFlashCardResponse
   - gRPC service sends response
   - Frontend receives Protobuf response
   - Data layer maps to ChineseCardData
   - UI updates local state and displays new card
```

### READ Flow (Fetch All Flashcards)

```
1. ChineseVocabCollection useEffect() on mount
   ↓
2. Calls fetchChineseCards()
   ↓
3. Data Layer:
   - Calls getAllFlashcards(1, 1000)
   - Maps Protobuf list → ChineseCardData[]
   ↓
4. gRPC-Web Service:
   - Creates GetChineseFlashCardsRequest
   - Sets page=1, pageSize=1000
   ↓
5. Backend processes request:
   - Service.getAll() fetches from Firestore
   - Returns list of flashcards + totalCount
   ↓
6. Response returns:
   - UI receives ChineseCardData[]
   - Updates state
   - Displays cards in CardStack
```

### UPDATE Flow (Edit Flashcard)

```
1. User edits card in VocabList
   ↓
2. handleEditVocab(item, index) called
   ↓
3. Data Layer:
   - Gets card ID from items array
   - Calls updateChineseCard(id, data)
   ↓
4. Backend:
   - Validates fields
   - Updates updatedAt timestamp
   - Saves to Firestore
   ↓
5. Response returns:
   - UI receives updated ChineseCardData
   - Replaces old card in local state
   - CardStack re-renders with updated card
```

### DELETE Flow (Remove Flashcard)

```
1. User clicks delete on VocabList item
   ↓
2. handleDeleteVocab(item, index) called
   ↓
3. Data Layer:
   - Gets card ID from items array
   - Calls deleteChineseCard(id)
   ↓
4. Backend:
   - Deletes document from Firestore
   - Returns success=true
   ↓
5. Response returns:
   - UI receives success boolean
   - Filters out deleted card from local state
   - CardStack re-renders without deleted card
```

---

## API Reference

### Protobuf Definition

**File**: `proto/chinese_card.proto`

```protobuf
syntax = "proto3";

package worldmap.flashcard;

// Chinese flashcard message
message ChineseFlashCard {
  int64 id = 1;
  string chinese_word = 2;
  string english_word = 3;
  string pinyin = 4;
  string img = 5;
  int64 created_at = 6;
  int64 updated_at = 7;
}

// Service definition
service ChineseFlashCardService {
  rpc CreateChineseFlashCard(CreateChineseFlashCardRequest) 
      returns (CreateChineseFlashCardResponse);
  rpc GetChineseFlashCards(GetChineseFlashCardsRequest) 
      returns (GetChineseFlashCardsResponse);
  rpc GetChineseFlashCard(GetChineseFlashCardRequest) 
      returns (GetChineseFlashCardResponse);
  rpc UpdateChineseFlashCard(UpdateChineseFlashCardRequest) 
      returns (UpdateChineseFlashCardResponse);
  rpc DeleteChineseFlashCard(DeleteChineseFlashCardRequest) 
      returns (DeleteChineseFlashCardResponse);
}
```

### gRPC Methods

#### 1. CreateChineseFlashCard

**Request**:
```protobuf
message CreateChineseFlashCardRequest {
  string chinese_word = 1;  // Required
  string english_word = 2;  // Required
  string pinyin = 3;        // Required
  string img = 4;           // Optional
}
```

**Response**:
```protobuf
message CreateChineseFlashCardResponse {
  bool success = 1;
  ChineseFlashCard data = 2;
  string message = 3;
  string error = 4;
}
```

**Errors**:
- `INVALID_ARGUMENT`: Missing required fields
- `INTERNAL`: Database error

#### 2. GetChineseFlashCards

**Request**:
```protobuf
message GetChineseFlashCardsRequest {
  int32 page = 1;      // Default: 1
  int32 page_size = 2; // Default: 50
}
```

**Response**:
```protobuf
message GetChineseFlashCardsResponse {
  bool success = 1;
  repeated ChineseFlashCard data = 2;
  int64 total_count = 3;
  string message = 4;
  string error = 5;
}
```

#### 3. GetChineseFlashCard

**Request**:
```protobuf
message GetChineseFlashCardRequest {
  int64 id = 1;  // Required
}
```

**Response**:
```protobuf
message GetChineseFlashCardResponse {
  bool success = 1;
  ChineseFlashCard data = 2;
  string message = 3;
  string error = 4;
}
```

**Errors**:
- `NOT_FOUND`: Flashcard ID does not exist

#### 4. UpdateChineseFlashCard

**Request**:
```protobuf
message UpdateChineseFlashCardRequest {
  int64 id = 1;             // Required
  string chinese_word = 2;  // Required
  string english_word = 3;  // Required
  string pinyin = 4;        // Required
  string img = 5;           // Optional
}
```

**Response**:
```protobuf
message UpdateChineseFlashCardResponse {
  bool success = 1;
  ChineseFlashCard data = 2;
  string message = 3;
  string error = 4;
}
```

**Errors**:
- `NOT_FOUND`: Flashcard ID does not exist
- `INVALID_ARGUMENT`: Missing required fields

#### 5. DeleteChineseFlashCard

**Request**:
```protobuf
message DeleteChineseFlashCardRequest {
  int64 id = 1;  // Required
}
```

**Response**:
```protobuf
message DeleteChineseFlashCardResponse {
  bool success = 1;
  string message = 2;
  string error = 3;
}
```

**Errors**:
- `NOT_FOUND`: Flashcard ID does not exist

---

## Error Handling

### Backend Error Strategy

**Validation Errors** (INVALID_ARGUMENT):
```java
if (chineseWord == null || chineseWord.isEmpty()) {
    return CreateChineseFlashCardResponse.newBuilder()
        .setSuccess(false)
        .setError("Chinese word is required")
        .build();
}
```

**Not Found Errors** (NOT_FOUND):
```java
if (!exists) {
    return GetChineseFlashCardResponse.newBuilder()
        .setSuccess(false)
        .setError("Flashcard with ID " + id + " not found")
        .build();
}
```

**Database Errors** (INTERNAL):
```java
try {
    // Firestore operation
} catch (Exception e) {
    return Response.newBuilder()
        .setSuccess(false)
        .setError("Database error: " + e.getMessage())
        .build();
}
```

### Frontend Error Strategy

**gRPC Status Code Mapping** (`grpcService.ts`):
```typescript
function handleGrpcError(error: RpcError): string {
  switch (error.code) {
    case StatusCode.NOT_FOUND:
      return 'Resource not found';
    case StatusCode.INVALID_ARGUMENT:
      return 'Invalid request: ' + error.message;
    case StatusCode.UNAVAILABLE:
      return 'Service unavailable. Please try again later.';
    case StatusCode.INTERNAL:
      return 'Internal server error';
    default:
      return error.message || 'Unknown error occurred';
  }
}
```

**UI Error Display**:
- Error banner component with dismiss button
- User-friendly error messages (not raw gRPC errors)
- Auto-clear errors on successful operations
- Console logging for debugging

---

## Testing Strategy

### Backend Testing

**Unit Tests** (JUnit 5 + Mockito):
- ✅ ChineseFlashCardServiceTest (21 tests, >80% coverage)
- Mock FirestoreService for isolated testing
- Test all CRUD operations
- Test validation logic
- Test error scenarios
- Test Protobuf conversions

**Test Example**:
```java
@Test
void testCreate_Success() {
    // Arrange
    CreateChineseFlashCardRequest request = ...;
    when(firestoreService.create(...)).thenReturn(mockDoc);
    
    // Act
    CreateChineseFlashCardResponse response = service.create(request);
    
    // Assert
    assertTrue(response.getSuccess());
    assertNotNull(response.getData());
    verify(firestoreService).create(...);
}
```

**Integration Testing** (Future):
- Firebase Emulator for Firestore testing
- End-to-end gRPC testing with grpcurl
- Performance testing with grpcurl --concurrency

### Frontend Testing

**Unit Tests** (Jest + React Testing Library - Planned):
- Data layer function testing (mock gRPC service)
- Component rendering tests
- User interaction tests (add, edit, delete)
- Error state tests
- Loading state tests

**E2E Testing** (Cypress - Future):
- Full CRUD workflow
- Error handling scenarios
- Network failure scenarios

---

## Development Workflow

### Backend Development

1. **Start Backend Server**:
   ```bash
   gradle run
   ```
   - Server starts on port 8080
   - Logs show registered services
   - Firestore connection status displayed

2. **Test with grpcui**:
   ```bash
   grpcui -plaintext localhost:8080
   ```
   - Opens web UI at http://localhost:8081
   - Auto-discovers all services via Server Reflection
   - Test RPC methods with interactive forms

3. **Run Unit Tests**:
   ```bash
   gradle test
   ```
   - View results: `open build/reports/tests/test/index.html`

### Frontend Development

1. **Start Frontend Dev Server**:
   ```bash
   cd frontend
   npm start
   ```
   - Dev server on port 3000 (or configured port)
   - Hot reload enabled
   - Connects to gRPC server at localhost:8080

2. **Environment Configuration**:
   
   `.env.development`:
   ```bash
   REACT_APP_GRPC_URL=http://localhost:8080
   ```

3. **Test in Browser**:
   - Navigate to http://localhost:3000/flashcard
   - Open Network tab to inspect gRPC-Web requests
   - Look for `Content-Type: application/grpc-web-text`

### Protobuf Updates

When updating `.proto` files:

1. **Regenerate Backend Classes**:
   ```bash
   gradle generateProto
   ```

2. **Regenerate Frontend Types**:
   ```bash
   cd frontend
   npm run generate:grpc-web
   ```

3. **Rebuild and Test**:
   ```bash
   gradle clean build
   npm start
   ```

---

## Deployment Guide

### Backend Deployment

1. **Build Production JAR**:
   ```bash
   gradle clean build
   ```

2. **Run JAR**:
   ```bash
   java -jar build/libs/WorldMap-0.0.1-SNAPSHOT.jar
   ```

3. **Environment Variables**:
   ```bash
   export FIREBASE_CREDENTIALS_PATH=/path/to/credentials.json
   export SERVER_PORT=8080
   ```

4. **Docker Deployment** (Future):
   ```dockerfile
   FROM eclipse-temurin:21-jre
   COPY build/libs/*.jar app.jar
   EXPOSE 8080
   ENTRYPOINT ["java", "-jar", "app.jar"]
   ```

### Frontend Deployment

**Option 1: Vercel**
```bash
cd frontend
vercel
```

**Option 2: Netlify**
```bash
npm run build
netlify deploy --prod --dir=build
```

**Option 3: Static Hosting (S3, CloudFront)**
```bash
npm run build
aws s3 sync build/ s3://your-bucket/
```

**Environment Variables for Production**:
```bash
REACT_APP_GRPC_URL=https://api.yourapp.com
```

---

## Future Enhancements

### Planned Features

1. **Shuffle Deck** (Task defined in FLASHCARD_TASK.md)
   - Fisher-Yates shuffle algorithm
   - Shuffle button in UI
   - Animation on shuffle

2. **French Flashcards**
   - Follow same pattern as Chinese flashcards
   - New protobuf definition
   - Reuse FirestoreService and GrpcServer

3. **Study Mode**
   - Track card mastery level
   - Spaced repetition algorithm
   - Progress tracking

4. **Image Upload**
   - Cloud Storage integration
   - Image optimization
   - CDN delivery

5. **Audio Pronunciation**
   - Text-to-Speech API
   - Audio playback on card flip
   - Record custom pronunciation

6. **React Query Migration**
   - Automatic caching
   - Background refetching
   - Optimistic updates
   - See: `REACTQUERY_TASK.md`

### Performance Optimizations

- **Backend**:
  - Implement caching layer (Redis)
  - Connection pooling for Firestore
  - Batch operations for bulk updates
  - gRPC streaming for large datasets

- **Frontend**:
  - Virtual scrolling for large card lists
  - Image lazy loading
  - Code splitting by route
  - Service Worker for offline support

### Security Enhancements

- Firebase Authentication
- Row-level security rules
- Rate limiting
- Input sanitization
- HTTPS enforcement

---

## References

- **Technical Documentation**: `tech_doc/FLASHCARD_FEATURE.md`
- **Task Tracking**: `tasks/FLASHCARD_TASK.md`
- **React Query Migration**: `tasks/REACTQUERY_TASK.md`, `tech_doc/REACT_QUERY.md`
- **Dependency Injection**: `docs/GUICE_DEPENDENCY_INJECTION.md`
- **Protocol Buffers**: `proto/chinese_card.proto`

---

**Document Version**: 1.0  
**Last Updated**: November 17, 2025  
**Authors**: WorldMap Development Team
