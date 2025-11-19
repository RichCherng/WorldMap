 b# Flash Card Feature - Technical Documentation

## Table of Contents
1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Data Flow](#data-flow)
5. [Backend Implementation](#backend-implementation)
6. [Frontend Implementation](#frontend-implementation)
7. [Protocol Buffers](#protocol-buffers)
8. [API Reference](#api-reference)
9. [Database Schema](#database-schema)
10. [Testing Strategy](#testing-strategy)
11. [Deployment](#deployment)
12. [Future Enhancements](#future-enhancements)

---

## Overview

The Flash Card feature is a language learning application that provides interactive flashcards for studying vocabulary in multiple languages (currently Chinese, with French planned). The system uses a modern gRPC-based architecture with Protocol Buffers for type-safe communication between the frontend and backend.

### Key Features
- Interactive flashcards with flip animations
- CRUD operations (Create, Read, Update, Delete) for flashcards
- Multi-language support (Chinese implemented, French planned)
- Firebase Firestore integration for data persistence
- gRPC-Web for efficient client-server communication
- Responsive UI with drag-and-drop functionality (Frontend communicates with backend via REST/HTTP or directly with Firebase SDK)

### Current Status
- **Chinese Flash Cards**: ✅ Backend API complete, Frontend UI complete, Integration pending
- **French Flash Cards**: ❌ Planned (protobuf and implementation pending)

---

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ FlashCard UI │  │ Card Stack   │  │ Vocab Mgmt   │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         └─────────────────┴──────────────────┘               │
│                          │                                   │
│              ┌───────────▼───────────┐                       │
│              │   Firebase Service    │                       │
│              │ (flashcardService.ts) │                       │
│              └───────────┬───────────┘                       │
└──────────────────────────┼───────────────────────────────────┘
                           │ Firebase SDK (Web)
┌──────────────────────────▼───────────────────────────────────┐
│              Firebase Firestore (Cloud)                    │
│                                                             │
│  Collections:                                               │
│  - chinese_flashcards                                       │
│  - french_flashcards (planned)                              │
└─────────────────────────────────────────────────────────────┘
```

### Service Layers

#### 1. **gRPC Service Layer** (Protocol Handling)
- **Location**: `src/main/java/com/worldmap/grpc/`
- **Responsibility**: Handle gRPC requests/responses, delegate to business logic
- **Files**:
  - [ChineseFlashCardGrpcService.java](../src/main/java/com/worldmap/grpc/ChineseFlashCardGrpcService.java) - Chinese flashcard gRPC endpoints

#### 2. **Business Logic Layer** (Service Layer)
- **Location**: `src/main/java/com/worldmap/service/`
- **Responsibility**: Validation, business rules, data transformation
- **Files**:
  - [ChineseFlashCardService.java](../src/main/java/com/worldmap/service/ChineseFlashCardService.java) - Chinese flashcard business logic
  - [FirestoreService.java](../src/main/java/com/worldmap/service/FirestoreService.java) - Generic Firestore operations

#### 3. **Data Access Layer** (Firestore Service)
- **Location**: `src/main/java/com/worldmap/service/FirestoreService.java`
- **Responsibility**: Database CRUD operations, connection management
- **Features**:
  - Generic type-safe methods
  - Pagination support
  - Connection validation
  - Error handling

---

## Technology Stack

### Backend
- **Language**: Java 21
- **Framework**: Spring Boot (or similar web framework for REST endpoints)
- **Database**: Firebase Firestore
- **Dependency Injection**: Google Guice
- **Build Tool**: Gradle
- **Serialization**: Protocol Buffers (proto3) for internal data model representation

### Frontend
- **Framework**: React with TypeScript
- **Animations**: Framer Motion
- **Build Tool**: Vite
- **State Management**: React Hooks (useState, useEffect)
- **HTTP Client**: gRPC-Web (replaces Axios)

### Infrastructure
- **Server**: Armeria (embedded, port 8080)
- **Development Tools**: grpcui (gRPC testing UI)
- **Version Control**: Git
- **CI/CD**: (To be configured)

---

## Data Flow

### Create Flashcard Flow

```
1. User fills form in ChineseVocabCollection.tsx
   ↓
2. Component calls createFlashcard() from chineseFlashcardGrpcService.ts
   ↓
3. gRPC-Web client creates CreateChineseFlashCardRequest (protobuf)
   ↓
4. HTTP/1.1 POST to http://localhost:8080/worldmap.flashcard.ChineseFlashCardService/CreateChineseFlashCard
   ↓
5. Armeria receives request, deserializes protobuf
   ↓
6. GrpcServer routes to ChineseFlashCardGrpcService.createChineseFlashCard()
   ↓
7. ChineseFlashCardGrpcService delegates to ChineseFlashCardService.create()
   ↓
8. ChineseFlashCardService validates input (chineseWord, englishWord, pinyin)
   ↓
9. ChineseFlashCardService generates ID (timestamp-based)
   ↓
10. ChineseFlashCardService calls FirestoreService.create()
    ↓
11. FirestoreService writes to Firestore collection "chinese_flashcards"
    ↓
12. FirestoreService returns created document
    ↓
13. ChineseFlashCardService builds CreateChineseFlashCardResponse (success=true)
    ↓
14. ChineseFlashCardGrpcService sends response via StreamObserver
    ↓
15. Armeria serializes protobuf response
    ↓
16. gRPC-Web client receives response, deserializes
    ↓
17. Component updates UI with new flashcard
```

### Get All Flashcards Flow (with Pagination)

```
1. Component mounts or user requests page
   ↓
2. Component calls getAllFlashcards(page=1, pageSize=10)
   ↓
3. gRPC-Web client creates GetChineseFlashCardsRequest
   ↓
4. Request sent to backend via gRPC-Web
   ↓
5. ChineseFlashCardGrpcService receives request
   ↓
6. ChineseFlashCardService.getAll() called
   ↓
7. FirestoreService.getAll("chinese_flashcards", page, pageSize) called
   ↓
8. Firestore returns paginated results
   ↓
9. ChineseFlashCardService converts Firestore docs to protobuf objects
   ↓
10. Response includes: flashcards[], totalCount, page, pageSize
    ↓
11. Frontend displays flashcards with pagination controls
```

---

## Backend Implementation

### 1. GrpcServer Configuration

**File**: [src/main/java/com/worldmap/grpc/GrpcServer.java](../src/main/java/com/worldmap/grpc/GrpcServer.java)

```java
@Singleton
public class GrpcServer {
    private final int port;
    private final Set<BindableService> services;
    private Server server;

    @Inject
    public GrpcServer(ApplicationConfig config, Set<BindableService> services) {
        this.port = config.getGrpcPort(); // 8080
        this.services = services;
    }

    public void start() {
        ServerBuilder builder = ServerBuilder.forPort(port);

        // Register all injected services dynamically
        services.forEach(builder::addService);

        // Enable Server Reflection (for grpcui)
        builder.addService(ProtoReflectionService.newInstance());

        // Enable Health Checking
        builder.addService(new HealthStatusManager().getHealthService());

        server = builder.build().start();
    }
}
```

**Port**: 8080
**Protocols**: gRPC (HTTP/2), gRPC-Web (HTTP/1.1 via Armeria)

### 2. Firestore Service (Generic Data Layer)

**File**: [src/main/java/com/worldmap/service/FirestoreService.java](../src/main/java/com/worldmap/service/FirestoreService.java)

**Key Methods**:
- `<T> T create(String collection, String docId, Map<String, Object> data, Class<T> type)`
- `<T> T get(String collection, String docId, Class<T> type)`
- `<T> List<T> getAll(String collection, int page, int pageSize, Class<T> type)`
- `<T> T update(String collection, String docId, Map<String, Object> data, Class<T> type)`
- `void delete(String collection, String docId)`
- `boolean exists(String collection, String docId)`
- `long count(String collection)`

**Features**:
- Null-safe (handles Firebase not configured)
- Async operations using `ApiFuture<T>`
- Custom exception handling (`FirestoreException`)
- Connection validation before operations
- Comprehensive logging

### 3. Chinese FlashCard Service

**File**: [src/main/java/com/worldmap/service/ChineseFlashCardService.java](../src/main/java/com/worldmap/service/ChineseFlashCardService.java)

**Methods**:
1. `CreateChineseFlashCardResponse create(CreateChineseFlashCardRequest request)`
   - Validates: chineseWord, englishWord, pinyin (required)
   - Generates ID: `System.currentTimeMillis()`
   - Sets timestamps: createdAt, updatedAt
   - Calls FirestoreService.create()

2. `GetChineseFlashCardsResponse getAll(GetChineseFlashCardsRequest request)`
   - Pagination: page, pageSize
   - Returns: flashcards[], totalCount
   - Calls FirestoreService.getAll()

3. `GetChineseFlashCardResponse getById(GetChineseFlashCardRequest request)`
   - Validates: id > 0
   - Returns: single flashcard or error
   - Calls FirestoreService.get()

4. `UpdateChineseFlashCardResponse update(UpdateChineseFlashCardRequest request)`
   - Validates: id, required fields
   - Updates: updatedAt timestamp
   - Calls FirestoreService.update()

5. `DeleteChineseFlashCardResponse delete(DeleteChineseFlashCardRequest request)`
   - Validates: id > 0
   - Calls FirestoreService.delete()

**Collection**: `"chinese_flashcards"`

### 4. Chinese FlashCard gRPC Service

**File**: [src/main/java/com/worldmap/grpc/ChineseFlashCardGrpcService.java](../src/main/java/com/worldmap/grpc/ChineseFlashCardGrpcService.java)

```java
@Singleton
public class ChineseFlashCardGrpcService extends ChineseFlashCardServiceGrpc.ChineseFlashCardServiceImplBase {

    private final ChineseFlashCardService flashCardService;

    @Inject
    public ChineseFlashCardGrpcService(ChineseFlashCardService flashCardService) {
        this.flashCardService = flashCardService;
    }

    @Override
    public void createChineseFlashCard(CreateChineseFlashCardRequest request,
                                       StreamObserver<CreateChineseFlashCardResponse> responseObserver) {
        try {
            CreateChineseFlashCardResponse response = flashCardService.create(request);
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        } catch (Exception e) {
            responseObserver.onError(Status.INTERNAL
                .withDescription(e.getMessage())
                .asRuntimeException());
        }
    }

    // ... other 4 methods follow same pattern
}
```

**Registered in**: [GrpcModule.java](../src/main/java/com/worldmap/guice/modules/GrpcModule.java) via Multibinder

---

## Frontend Implementation

### 1. gRPC-Web Service Layer

**File**: [frontend/src/services/chineseFlashcardGrpcService.ts](../frontend/src/services/chineseFlashcardGrpcService.ts)

```typescript
import { ChineseFlashCardServiceClient } from '../types/grpc-web/Chinese_cardServiceClientPb';
import {
  CreateChineseFlashCardRequest,
  GetChineseFlashCardsRequest,
  // ... other imports
} from '../types/grpc-web/chinese_card_pb';
import { GRPC_SERVER_URL, withErrorHandling } from './grpcService';

const client = new ChineseFlashCardServiceClient(GRPC_SERVER_URL);

export const getAllFlashcards = (page: number = 1, pageSize: number = 10) => {
  const request = new GetChineseFlashCardsRequest();
  request.setPage(page);
  request.setPagesize(pageSize);

  return withErrorHandling(
    client.getChineseFlashCards(request, {})
  );
};

export const createFlashcard = (data: {
  chineseWord: string;
  englishWord: string;
  pinyin: string;
  img?: string;
}) => {
  const request = new CreateChineseFlashCardRequest();
  request.setChineseword(data.chineseWord);
  request.setEnglishword(data.englishWord);
  request.setPinyin(data.pinyin);
  if (data.img) request.setImg(data.img);

  return withErrorHandling(
    client.createChineseFlashCard(request, {})
  );
};

// ... 3 more methods: getById, update, delete
```

**Error Handling**: [grpcService.ts](../frontend/src/services/grpcService.ts)
- `withErrorHandling()` wrapper for all gRPC calls
- Maps gRPC StatusCodes to user-friendly messages
- Logs errors in development mode

### 2. UI Components

**Location**: [frontend/src/components/FlashCard/](../frontend/src/components/FlashCard/)

#### Main Components:
1. **FlashCard.tsx** - Main wrapper component
2. **Card.tsx** - Individual card with flip animation (Framer Motion)
3. **CardStack.tsx** - Stack container with drag functionality
4. **ChineseCard.tsx** - Chinese-specific card layout (displays pinyin on back)

**Page Components**:
- [FlashCardPage.tsx](../frontend/src/Pages/FlashCard/FlashCardPage.tsx) - Full page view
- [ChineseVocabCollection.tsx](../frontend/src/Pages/FlashCard/VocabCollections/ChineseVocabCollection.tsx) - Collection management UI

#### Features:
- ✅ Flip animation (double-click)
- ✅ Drag to reorder
- ✅ Add/Delete vocabulary
- ✅ Responsive design
- ❌ Integration with Firebase service (pending)
- ❌ Update functionality (pending)
- ❌ Pagination controls (pending)

---

## Protocol Buffers

### Chinese FlashCard Protobuf Definition

**File**: [proto/chinese_card.proto](../proto/chinese_card.proto)

**Note**: This Protobuf definition serves as the canonical data model for a `ChineseFlashCard`. It is used for documentation and to generate TypeScript types. It is **not** used for network communication, as the frontend communicates directly with Firestore.

```protobuf
syntax = "proto3";

package worldmap.flashcard;

option java_multiple_files = true;
option java_package = "com.worldmap.flashcard";

// Chinese FlashCard message
message ChineseFlashCard {
  int64 id = 1;                    // Unique identifier (timestamp-based)
  string chineseWord = 2;          // Chinese characters (e.g., "你好")
  string englishWord = 3;          // English translation (e.g., "Hello")
  string pinyin = 4;               // Pinyin pronunciation (e.g., "nǐ hǎo")
  string img = 5;                  // Optional image URL
  int64 createdAt = 6;             // Unix timestamp (milliseconds)
  int64 updatedAt = 7;             // Unix timestamp (milliseconds)
}
```

### Code Generation

**Backend** (Java):
```bash
gradle generateProto
```
Output: `build/generated/source/proto/main/java/com/worldmap/flashcard/`

**Frontend** (TypeScript):
```bash
npm run generate:grpc-web
```
Output: `frontend/src/types/grpc-web/`

---

## API Reference

### Chinese FlashCard gRPC Service

**Base URL**: `http://localhost:8080`
**Service**: `worldmap.flashcard.ChineseFlashCardService`

#### 1. Create FlashCard
```
Method: CreateChineseFlashCard
Request: {chineseWord, englishWord, pinyin, img?}
Response: {success, flashcard, message, error}
Validation: chineseWord, englishWord, pinyin required
```

#### 2. Get All FlashCards (Paginated)
```
Method: GetChineseFlashCards
Request: {page, pageSize}
Response: {success, flashcards[], totalCount, page, pageSize, message, error}
Default: page=1, pageSize=10
```

#### 3. Get FlashCard by ID
```
Method: GetChineseFlashCard
Request: {id}
Response: {success, flashcard, message, error}
Error: NOT_FOUND if id doesn't exist
```

#### 4. Update FlashCard
```
Method: UpdateChineseFlashCard
Request: {id, chineseWord, englishWord, pinyin, img?}
Response: {success, flashcard, message, error}
Validation: id and required fields must be present
```

#### 5. Delete FlashCard
```
Method: DeleteChineseFlashCard
Request: {id}
Response: {success, message, error}
Error: NOT_FOUND if id doesn't exist
```

### gRPC Status Codes
- `OK (0)`: Success
- `INVALID_ARGUMENT (3)`: Validation error (missing required fields)
- `NOT_FOUND (5)`: Resource not found (invalid ID)
- `INTERNAL (13)`: Server error (Firestore error, unexpected exception)
- `UNAVAILABLE (14)`: Service unavailable (Firestore not configured)

---

## Database Schema

### Firestore Collection: `chinese_flashcards`

**Document Structure**:
```json
{
  "id": 1731638400000,
  "chineseWord": "你好",
  "englishWord": "Hello",
  "pinyin": "nǐ hǎo",
  "img": "https://example.com/hello.png",
  "createdAt": 1731638400000,
  "updatedAt": 1731638400000
}
```

**Field Types**:
- `id`: Number (Unix timestamp in milliseconds)
- `chineseWord`: String (required)
- `englishWord`: String (required)
- `pinyin`: String (required)
- `img`: String (optional, URL)
- `createdAt`: Number (Unix timestamp in milliseconds)
- `updatedAt`: Number (Unix timestamp in milliseconds)

**Indexes**: (Auto-created by Firestore)
- Default: Indexed by document ID
- Custom indexes can be added for filtering/sorting (not yet configured)

---

## Testing Strategy

### Backend Testing

#### 1. Unit Tests
**Location**: [src/test/java/com/worldmap/service/ChineseFlashCardServiceTest.java](../src/test/java/com/worldmap/service/ChineseFlashCardServiceTest.java)

**Coverage**: 21 tests, >80% code coverage ✅

**Test Categories**:
- Create operation: success, validation errors, Firestore errors
- GetAll operation: with results, empty collection, pagination
- GetById operation: found, not found
- Update operation: success, not found, validation errors
- Delete operation: success, not found
- Conversion helpers: toFirestoreDoc, fromFirestoreDoc
- Mock data fallback scenarios

**Mocking**:
- FirestoreService mocked with Mockito
- Protobuf builders for test data
- Verify correct method calls to FirestoreService

**Run Tests**:
```bash
gradle test
```

#### 2. Integration Tests
**Status**: ⚠️ Deferred to Firebase Emulator testing

**Reason**: Firestore classes are final (cannot be mocked with standard Mockito in Java 21)

**Future Plan**:
- Set up Firebase Emulator for local integration testing
- Test full flow: gRPC → Service → Firestore → Response
- Test with real Firestore instance (emulated)

#### 3. Manual Testing with grpcui
**Tool**: grpcui (Swagger-like UI for gRPC)

**Setup**:
```bash
# Install grpcui (Go-based tool)
go install github.com/fullstorydev/grpcui/cmd/grpcui@latest

# Start backend
gradle run

# Start grpcui (in separate terminal)
grpcui -plaintext localhost:8080
```

**Access**: http://localhost:8081 (or configured port)

**Test Scenarios**:
- ✅ List all methods via Server Reflection
- ✅ Test Create with valid data
- ✅ Test GetAll with pagination
- ✅ Test GetById with existing/non-existing ID
- ✅ Test Update with valid/invalid data
- ✅ Test Delete with existing/non-existing ID

### Frontend Testing

#### Unit Tests
**Status**: ❌ Not yet implemented

**Planned Coverage**:
- Component rendering tests (FlashCard, Card, CardStack)
- User interaction tests (flip, drag, add, delete)
- gRPC service layer tests (mock gRPC client)
- Error handling tests
- Loading state tests

**Tools**: Jest, React Testing Library

**Target**: >70% component coverage

---

## Deployment

### Backend Deployment

#### Development Mode
```bash
# Start gRPC server
gradle run

# Server runs on http://localhost:8080
# gRPC-Web and gRPC both accessible
```

#### Production Deployment (Options)

**Option 1: Docker Container**
```dockerfile
FROM eclipse-temurin:21-jre
COPY build/libs/worldmap.jar /app/worldmap.jar
COPY firebase-credentials.json /app/firebase-credentials.json
EXPOSE 8080
CMD ["java", "-jar", "/app/worldmap.jar"]
```

**Option 2: Cloud Run (Google Cloud)**
- Package as Docker container
- Deploy to Cloud Run
- Configure environment variables (Firebase credentials)
- Auto-scaling enabled

**Option 3: Kubernetes**
- Helm chart for gRPC service
- ConfigMap for Firebase credentials (encrypted)
- Service on port 8080
- Ingress with gRPC support

### Frontend Deployment

#### Development Mode
```bash
cd frontend
npm install
npm run dev

# Vite dev server on http://localhost:3000
# Auto-reload on code changes
```

#### Production Deployment (Options)

**Option 1: Vercel** (Recommended)
```bash
npm run build
vercel deploy
```
- Environment variable: `REACT_APP_GRPC_URL=https://api.example.com`
- Automatic CDN distribution
- Serverless functions support

**Option 2: Netlify**
```bash
npm run build
netlify deploy --prod --dir=dist
```
- Configure environment variables in Netlify dashboard

**Option 3: S3 + CloudFront**
```bash
npm run build
aws s3 sync dist/ s3://my-flashcard-app/
aws cloudfront create-invalidation --distribution-id XXX --paths "/*"
```

### Environment Variables

**Backend** (`application.properties`):
```properties
firebase.enabled=true
firebase.credentials.path=firebase-credentials.json
grpc.port=8080
```

**Frontend** (`.env.production`):
```bash
REACT_APP_GRPC_URL=https://api.example.com
```

---

## Future Enhancements

### Short-Term (Next 1-2 Sprints)

1. **Complete gRPC-Web Integration** ❌
   - Replace REST calls with gRPC-Web in ChineseVocabCollection
   - Add pagination controls
   - Implement update functionality
   - Test full CRUD flow

2. **Setup grpcui for Development** ❌
   - Install grpcui tool
   - Document usage in README
   - Create startup script

3. **French Flash Cards** ❌
   - Create protobuf definition
   - Implement backend service (follow Chinese pattern)
   - Implement frontend UI
   - Test full flow

4. **Separate Frontend Hosting** ❌
   - Remove Jetty static file serving
   - Configure Vite dev server with proxy
   - Update deployment documentation

### Medium-Term (Next 3-6 Months)

5. **Advanced Features**
   - Audio pronunciation (TTS or audio files)
   - Spaced repetition algorithm (SRS)
   - Progress tracking and statistics
   - Flashcard difficulty rating
   - Study sessions with timers

6. **Additional Languages**
   - Spanish flashcards
   - Japanese flashcards (with Hiragana/Katakana/Kanji)
   - German flashcards

7. **User Authentication**
   - Firebase Authentication
   - User-specific flashcard collections
   - Cloud sync across devices

8. **Enhanced Testing**
   - Firebase Emulator integration tests
   - End-to-end tests (Cypress or Playwright)
   - Performance testing (load testing gRPC endpoints)

### Long-Term (6+ Months)

9. **Mobile Apps**
   - React Native app (iOS/Android)
   - Use same gRPC backend
   - Offline mode with local storage

10. **AI Features**
    - AI-generated flashcards from text input
    - Speech recognition for pronunciation practice
    - Personalized learning recommendations

11. **Community Features**
    - Share flashcard decks
    - Public deck marketplace
    - Collaborative learning

---

## References

### Related Files
- Task Definition: [tasks/FLASHCARD_TASK.md](../tasks/FLASHCARD_TASK.md)
- README: [README.md](../README.md)
- Proto Definition: [proto/chinese_card.proto](../proto/chinese_card.proto)
- Frontend Service: [frontend/src/services/README.md](../frontend/src/services/README.md)

### External Documentation
- [gRPC Documentation](https://grpc.io/docs/)
- [Protocol Buffers Guide](https://protobuf.dev/)
- [gRPC-Web Documentation](https://github.com/grpc/grpc-web)
- [Armeria Documentation](https://armeria.dev/docs/)
- [Firebase Firestore Documentation](https://firebase.google.com/docs/firestore)
- [React Documentation](https://react.dev/)

---

**Last Updated**: November 15, 2025
**Version**: 1.0
**Authors**: Development Team
**Status**: Active Development
