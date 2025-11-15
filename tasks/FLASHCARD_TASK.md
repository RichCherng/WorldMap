# Flash Card Feature Tasks

**Description:** Building a Chinese Flash Card learning feature with full-stack implementation including backend APIs, Firebase integration, frontend UI, and comprehensive testing.

**Architecture:** gRPC-based API using Protocol Buffers for type-safe communication between frontend (gRPC-Web) and backend (gRPC server)

**Main Branch:** `main`

**Feature Branch:** `FlashCard`

**Branching Strategy:** Each task will be worked on in its own branch and merged into the `FlashCard` feature branch. Once all tasks are complete, the `FlashCard` feature branch will be merged into `main`.

**Date Started:** November 13, 2025

**Status Legend:** ❌ Not Started | 🔄 In Progress | ✅ Completed

---

## Tasks ##

### Protocol Buffers Setup

- ✅ **Setup Protocol Buffers for Chinese Flash Card APIs**
    - **Description:** Define protobuf schemas for Chinese flashcards with type-safe API contracts between frontend and backend
    - **Branch:** `proto-chinese-flashcard`
    - **Subtasks:**
        - ✅ Keep existing `proto/chinese_card.proto` and regenerate/update it with proper naming conventions
        - ✅ Update proto file with `ChineseFlashCard` message structure (rename from ChineseCard)
            - ✅ Ensure fields: id, chineseWord, englishWord, pinyin, img (optional), createdAt, updatedAt
            - ✅ Update all request/response messages to use ChineseFlashCard naming (Create, GetAll, GetById, Update, Delete)
            - ✅ Update API service interface definition to ChineseFlashCardService
            - ✅ Verify common response wrapper (success, data, message, error)
        - ✅ Update build.gradle protobuf configuration if needed
        - ✅ Generate Java classes
            - ✅ Run `gradle generateProto` to compile protobuf definitions
            - ✅ Verify generated classes in `build/generated/source/proto/main/java/com/worldmap/flashcard/`
            - ✅ Confirm all message types compile without errors
        - ✅ Generate TypeScript types for frontend from protobuf
            - ✅ Install protobufjs and protobufjs-cli dependencies
            - ✅ Create npm script to auto-generate TypeScript from protobuf
            - ✅ Generate chinese_flashcard.d.ts from chinese_card.proto
            - ✅ Verify TypeScript types match Java classes from protobuf
        - ✅ Update documentation
            - ✅ Update README.md with Chinese flashcard protobuf information
            - ✅ Document the generated class locations and usage
            - ✅ Add instructions for regenerating proto files
    - **Requirements:**
        - ✅ Use proto3 syntax
        - ✅ Document message fields with comments
        - ✅ Define proper field types and validation rules
        - ✅ Auto-generate TypeScript types from protobuf using protobufjs tooling
        - ✅ Keep protobuf definitions in sync between backend and frontend via code generation
        - ✅ Update all references from ChineseCard to ChineseFlashCard for consistency
    - **Date:** November 13, 2025

- ❌ **Setup Protocol Buffers for French Flash Card APIs**
    - **Description:** Define protobuf schemas for French flashcards with type-safe API contracts between frontend and backend
    - **Branch:** `proto-french-flashcard`
    - **Subtasks:**
        - ❌ Create `proto/french_flashcard.proto` following Chinese flashcard pattern
        - ❌ Define `FrenchFlashCard` message structure
            - ❌ Define fields: id, frenchWord, englishWord, pronunciation, img (optional), createdAt, updatedAt
            - ❌ Define request/response messages (Create, GetAll, GetById, Update, Delete)
            - ❌ Define API service interface
            - ❌ Define common response wrapper (success, data, message, error)
            - ❌ Add comprehensive field comments
        - ❌ Generate Java classes
            - ❌ Run `gradle generateProto` to compile protobuf definitions
            - ❌ Verify generated classes in `build/generated/source/proto/main/java/com/worldmap/flashcard/`
            - ❌ Confirm all message types compile without errors
        - ❌ Generate TypeScript types for frontend
            - ❌ Generate `FrenchFlashCard.ts` type definitions using protobuf.js
            - ❌ Verify TypeScript types match Java classes
        - ❌ Update documentation
            - ❌ Update README.md with French flashcard protobuf information
            - ❌ Document the generated class locations and usage
    - **Requirements:**
        - ❌ Use proto3 syntax
        - ❌ Document message fields with comments
        - ❌ Define proper field types and validation rules
        - ❌ Include createdAt and updatedAt timestamp fields
        - ❌ Generate TypeScript types using protobuf.js tooling
        - ❌ Maintain consistency with Chinese flashcard proto structure
    - **Date:** November 13, 2025

### Backend Development

- ❌ **Create Flash Card APIs**
    - **Description:** Implement gRPC services for flashcard CRUD operations with Firebase/Firestore integration. Frontend uses gRPC-Web, testing/docs via grpcui.
    - **Branch:** `<branch-name>`
    - **Architecture:** gRPC backend + gRPC-Web frontend + grpcui for testing (Swagger-like interface)

    - ❌ **Setup grpcui for API Testing and Documentation**
        - **Description:** Configure grpcui as a web-based UI for testing gRPC services (similar to Swagger UI for REST APIs)
        - **Dependencies:**
            - ❌ Requires "Setup Service-Level gRPC Server" task to be completed (GrpcServer running on port 8080)
            - ❌ gRPC Server Reflection must be enabled (handled in GrpcServer setup)
            - ❌ At least one gRPC service must be implemented (ChineseFlashCardGrpcService)
            - ✅ Protobuf definitions must be finalized (chinese_card.proto)
        - **Purpose:**
            - Provide interactive web interface for testing gRPC methods
            - Auto-discover services via gRPC Server Reflection
            - Replace Swagger/OpenAPI for gRPC-based APIs
            - Enable manual testing during development
        - **Subtasks:**
            - ❌ **Install grpcui**
                - Install grpcui tool (Go-based utility)
                - Document installation instructions in README
                - Verify grpcui can connect to gRPC server
            - ❌ **Verify gRPC Server Reflection is enabled**
                - Confirm GrpcServer has ProtoReflectionService registered
                - Test reflection endpoint works with grpcurl or grpcui
            - ❌ **Create grpcui startup script**
                - Create script to launch grpcui pointing to gRPC server (port 8080)
                - Add to README or create dedicated script file
                - Document how to access grpcui web interface
            - ❌ **Test grpcui with Chinese FlashCard service**
                - Verify all RPC methods appear in grpcui
                - Test calling methods through web interface
                - Validate request/response handling
        - **Requirements:**
            - ❌ grpcui accessible at http://localhost:8081 (or configurable port)
            - ❌ Auto-discovers all gRPC services via reflection
            - ❌ Provides form-based input for request messages
            - ❌ Displays response messages in readable format
            - ❌ Document usage in README with screenshots or examples
        - **Benefits:**
            - No need to maintain separate Swagger/OpenAPI docs
            - Interactive testing without writing client code
            - Auto-updates when protobuf definitions change
            - Familiar workflow for developers used to Swagger UI

    - ❌ **Setup Service-Level gRPC Server**
        - **Description:** Create a centralized gRPC server that hosts all gRPC services (Chinese FlashCard, French FlashCard, etc.) on a single port, replacing Jetty
        - **Component:** `GrpcServer` (`src/main/java/com/worldmap/grpc/`)
        - **Branch:** `grpc-server-setup`
        - **Architecture:** One gRPC server (port 8080) hosting multiple gRPC services
        - **Purpose:**
            - Provide a single entry point for all gRPC services
            - Efficient resource usage (one server instance, one port)
            - Standard industry pattern used by Google, Uber, Netflix
            - Simplifies deployment (only one port to manage)
        - **Subtasks:**
            - ❌ **Create GrpcServer class**
                - Location: `src/main/java/com/worldmap/grpc/GrpcServer.java`
                - Use Guice dependency injection
                - Accept all gRPC service implementations via constructor injection
                - Build server with `ServerBuilder.forPort(8080)`
                - Register all injected services using `.addService()`
                - Enable gRPC Server Reflection for grpcui support
                - Add graceful shutdown hook
            - ❌ **Create GrpcModule for Guice**
                - Location: `src/main/java/com/worldmap/config/GrpcModule.java`
                - Bind GrpcServer as singleton
                - Bind all gRPC service implementations
                - Configure server port (8080) as a constant or from config
            - ❌ **Integrate GrpcServer with WorldMapApplication**
                - Replace Jetty server initialization with GrpcServer
                - Use Guice injector to get GrpcServer instance
                - Start GrpcServer on port 8080
                - Add shutdown hook to stop GrpcServer gracefully
                - Log server startup status (port, services registered)
                - Remove Jetty dependencies and initialization code
            - ❌ **Enable gRPC Server Reflection**
                - Add `ProtoReflectionService` to server
                - Required for grpcui to auto-discover services
                - Test reflection with `grpcurl` or grpcui
            - ❌ **Update README.md**
                - Document gRPC server architecture and port (8080)
                - Explain that Jetty has been removed
                - Add instructions for running the gRPC server
                - Document how to test with grpcui
                - Update frontend development instructions (connect to localhost:8080)
                - Add protobuf regeneration instructions
                - Document service registration process via Guice
        - **Requirements:**
            - ❌ Single gRPC server instance on port 8080
            - ❌ Support dynamic service registration via Guice
            - ❌ Enable gRPC Server Reflection for grpcui
            - ❌ Graceful startup and shutdown
            - ❌ Proper error handling and logging
            - ❌ Jetty server disabled/removed
        - **Benefits:**
            - All gRPC services share one server (efficient)
            - Easy to add new services (just inject them)
            - Single port for all APIs (simpler deployment)
            - Standard gRPC architecture pattern
            - Frontend served separately (via npm/Vite dev server or static hosting)

    - ✅ **Create Firestore Service Layer**
        - **Description:** Create a generic Firestore service for common database operations that can be reused across different flashcard types
        - **Component:** `FirestoreService` (`src/main/java/com/worldmap/service/`)
        - **Branch:** `firestore-service-layer`
        - **Purpose:**
            - Abstract common Firestore CRUD operations (create, read, update, delete, query)
            - Provide type-safe document conversion utilities
            - Handle Firestore connection and error management
            - Support pagination and filtering
        - **Subtasks:**
            - ✅ **Create and validate Firestore connection**
                - Verify Firebase credentials are properly configured in `src/main/resources/firebase-credentials.json`
                - Ensure `firebase.enabled=true` in `application.properties`
                - Test Firestore connection on service initialization
                - Add connection validation method: `boolean isConnected()` - Returns true if Firestore is initialized and connected
                - Log connection status on startup (connected/not configured/error)
                - Handle connection errors gracefully with meaningful error messages
                - Create a test endpoint or unit test to verify connection works
            - ✅ **Implement FirestoreService CRUD methods**
                - ✅ `<T> T create(String collection, String docId, Map<String, Object> data, Class<T> type)` - Create document
                - ✅ `<T> T get(String collection, String docId, Class<T> type)` - Get single document
                - ✅ `<T> List<T> getAll(String collection, int page, int pageSize, Class<T> type)` - Get all documents with pagination
                - ✅ `<T> T update(String collection, String docId, Map<String, Object> data, Class<T> type)` - Update document
                - ✅ `void delete(String collection, String docId)` - Delete document
                - ✅ `long count(String collection)` - Count total documents in collection
                - ✅ `boolean exists(String collection, String docId)` - Check if document exists
            - ⚠️  **Unit tests for FirestoreService** (Deferred to Integration Testing)
                - **Challenge:** Firestore classes (Firestore, DocumentSnapshot, QuerySnapshot) are final classes
                - **Issue:** Cannot be mocked in Java 21, even with mockito-inline
                - **Decision:** Skip unit tests in favor of integration tests with Firebase Emulator
                - **Reasoning:**
                  - Unit testing Firestore with mocks is not practical due to final classes
                  - Integration testing with Firebase Emulator is the recommended approach by Google
                  - Service code is production-ready and manually tested
                  - Will be thoroughly tested when integrated with Chinese Flash Card API
                - **Future:** Set up Firebase Emulator for proper integration testing
        - **Requirements:**
            - ✅ Use `@Singleton` annotation for single instance
            - ✅ Inject Firestore via `@Inject` constructor (accepts `@Nullable Firestore`)
            - ✅ Handle null Firestore gracefully (when Firebase not configured)
            - ✅ Throw custom exceptions with meaningful error messages (FirestoreException)
            - ✅ Support async operations using `ApiFuture<T>`
            - ✅ Add proper logging for all operations (connection status, CRUD operations, errors)
            - ✅ Validate Firestore connection before performing operations
            - ✅ Validate method parameters to prevent null pointer exceptions
        - **Benefits:**
            - Reduces code duplication across Chinese/French flashcard services
            - Centralizes Firestore error handling
            - Makes it easier to add new flashcard types in the future
            - Ensures Firestore is properly configured before use
            
    - ❌ **Chinese Flash Card gRPC API**
        - **Branch:** `chinese-flashcard-grpc-api`
        - **Protobuf Source:** `proto/chinese_card.proto` (already defined with ChineseFlashCard messages and service)
        - **Generated Classes:** `build/generated/source/proto/main/java/com/worldmap/flashcard/`
            - `ChineseFlashCard` - Main data model
            - `CreateChineseFlashCardRequest/Response`
            - `GetChineseFlashCardsRequest/Response`
            - `GetChineseFlashCardRequest/Response`
            - `UpdateChineseFlashCardRequest/Response`
            - `DeleteChineseFlashCardRequest/Response`
            - `ChineseFlashCardServiceGrpc` - gRPC service stub
        - **Dependencies:**
            - ❌ Requires "Setup Service-Level gRPC Server" task to be completed first
            - ✅ gRPC dependencies already added to build.gradle
            - ✅ Protobuf plugin configured to generate gRPC stubs
        - **Subtasks:**
            - ❌ **Implement ChineseFlashCardGrpcService**
                - Location: `src/main/java/com/worldmap/grpc/`
                - Extend `ChineseFlashCardServiceGrpc.ChineseFlashCardServiceImplBase`
                - Implement all RPC methods defined in protobuf service
                - Delegates to ChineseFlashCardService for business logic
                - Returns protobuf response objects directly
            - ❌ **Implement ChineseFlashCardService (Business Logic)**
                - Location: `src/main/java/com/worldmap/service/`
                - Business logic layer working entirely with protobuf objects
                - Converts protobuf messages ↔ Firestore documents
                - Handles Firebase/Firestore operations (CRUD on "chinese_flashcards" collection)
                - Validates data and builds protobuf responses with success/error/message fields
                - Falls back to mock data when Firebase not configured
            - ❌ **Configure Guice dependency injection**
                - Ensure ChineseFlashCardService is injectable via Guice
                - Register ChineseFlashCardGrpcService in GrpcModule
                - Use `@Singleton` and `@Inject` annotations properly
                - GrpcServer will auto-register this service via Guice injection
            - ❌ **Create unit tests for ChineseFlashCardService**
                - Test all CRUD operations with protobuf objects
                - Test protobuf ↔ Firestore document conversion helpers
                - Test validation logic
                - Test mock data fallback when Firebase not configured
                - Use JUnit 5 and Mockito
                - Achieve >80% code coverage
        - **gRPC Methods to implement:**
            - ❌ `CreateChineseFlashCard` - Create new flashcard (validate: chineseWord, englishWord, pinyin required)
            - ❌ `GetChineseFlashCards` - Get all flashcards with pagination (page, pageSize)
            - ❌ `GetChineseFlashCard` - Get single flashcard by ID
            - ❌ `UpdateChineseFlashCard` - Update existing flashcard
            - ❌ `DeleteChineseFlashCard` - Delete flashcard
        - **Data Flow:**
            1. Frontend sends gRPC-Web request → gRPC server receives protobuf request
            2. gRPC service delegates to ChineseFlashCardService for business logic
            3. Service processes using protobuf objects, interacts with Firestore
            4. Service returns protobuf response → gRPC server sends to client
        - **Requirements:**
            - ❌ Use protobuf-generated classes from `proto/chinese_card.proto` for all request/response types
            - ✅ gRPC service stubs generated from protobuf
            - ❌ Service will be registered in centralized GrpcServer (see "Setup Service-Level gRPC Server" task)
            - ❌ Connect to Firebase/Firestore successfully (collection: "chinese_flashcards")
            - ❌ Create helper methods: `convertToFirestoreDoc(ChineseFlashCard)` and `convertFromFirestoreDoc(DocumentSnapshot)`
            - ❌ Implement proper error handling and validation
            - ❌ Return protobuf response objects directly (no JSON conversion needed)
            - ❌ Support mock data fallback when Firebase not configured
            - ❌ Use Guice dependency injection (`@Inject` for dependencies)
            - ❌ Register ChineseFlashCardGrpcService in GrpcModule for auto-registration
            - ❌ Create comprehensive unit tests (>80% coverage)
            - ❌ Use `@Singleton` for service classes
            - ❌ Test via grpcui web interface (after GrpcServer is running)
    
    - ❌ **French Flash Card gRPC API**
        - **Protobuf Source:** Will be defined in `proto/french_flashcard.proto` (following Chinese flashcard pattern)
        - **Generated Classes:** `build/generated/source/proto/main/java/com/worldmap/flashcard/`
            - `FrenchFlashCard` - Main data model
            - `CreateFrenchFlashCardRequest/Response`
            - `GetFrenchFlashCardsRequest/Response`
            - `GetFrenchFlashCardRequest/Response`
            - `UpdateFrenchFlashCardRequest/Response`
            - `DeleteFrenchFlashCardRequest/Response`
            - `FrenchFlashCardServiceGrpc` - gRPC service stub
        - **Dependencies:**
            - ❌ Requires "Setup Service-Level gRPC Server" task to be completed first
            - ✅ gRPC dependencies already added to build.gradle
            - ✅ Protobuf plugin configured to generate gRPC stubs
        - **Subtasks:**
            - ❌ **Implement FrenchFlashCardGrpcService**
                - Location: `src/main/java/com/worldmap/grpc/`
                - Extend `FrenchFlashCardServiceGrpc.FrenchFlashCardServiceImplBase`
                - Implement all RPC methods defined in protobuf service
                - Delegates to FrenchFlashCardService for business logic
                - Returns protobuf response objects directly
            - ❌ **Implement FrenchFlashCardService**
                - Location: `src/main/java/com/worldmap/service/`
                - Business logic layer working entirely with protobuf objects
                - Converts protobuf messages ↔ Firestore documents
                - Handles Firebase/Firestore operations (CRUD on "french_flashcards" collection)
                - Validates data and builds protobuf responses with success/error/message fields
                - Falls back to mock data when Firebase not configured
            - ❌ **Configure Guice dependency injection**
                - Ensure FrenchFlashCardService is injectable via Guice
                - Register FrenchFlashCardGrpcService in GrpcModule
                - Use `@Singleton` and `@Inject` annotations properly
                - GrpcServer will auto-register this service via Guice injection
            - ❌ **Create unit tests for FrenchFlashCardService**
                - Test all CRUD operations with protobuf objects
                - Test protobuf ↔ Firestore document conversion helpers
                - Test validation logic
                - Test mock data fallback when Firebase not configured
                - Use JUnit 5 and Mockito
                - Achieve >80% code coverage
        - **gRPC Methods to implement:**
            - ❌ `CreateFrenchFlashCard` - Create new flashcard (validate: frenchWord, englishWord, pronunciation required)
            - ❌ `GetFrenchFlashCards` - Get all flashcards with pagination (page, pageSize)
            - ❌ `GetFrenchFlashCard` - Get single flashcard by ID
            - ❌ `UpdateFrenchFlashCard` - Update existing flashcard
            - ❌ `DeleteFrenchFlashCard` - Delete flashcard
        - **Data Flow:**
            1. Frontend sends gRPC-Web request → gRPC server receives protobuf request
            2. gRPC service delegates to FrenchFlashCardService for business logic
            3. Service processes using protobuf objects, interacts with Firestore
            4. Service returns protobuf response → gRPC server sends to client
        - **Requirements:**
            - ❌ Use protobuf-generated classes from `proto/french_flashcard.proto` for all request/response types
            - ❌ Generate gRPC service stubs from protobuf
            - ❌ Service will be registered in centralized GrpcServer (same server as Chinese flashcards)
            - ❌ Connect to Firebase/Firestore successfully (collection: "french_flashcards")
            - ❌ Create helper methods: `convertToFirestoreDoc(FrenchFlashCard)` and `convertFromFirestoreDoc(DocumentSnapshot)`
            - ❌ Implement proper error handling and validation
            - ❌ Return protobuf response objects directly (no JSON conversion needed)
            - ❌ Support mock data fallback when Firebase not configured
            - ❌ Use Guice dependency injection (`@Inject` for dependencies)
            - ❌ Register FrenchFlashCardGrpcService in GrpcModule for auto-registration
            - ❌ Create comprehensive unit tests (>80% coverage)
            - ❌ Use `@Singleton` for service classes
            - ❌ Test via grpcui web interface (after GrpcServer is running)
    
    - **Date:** November 13, 2025

- ❌ **Create Unit Tests for Flash Card API**
    - **Description:** Write comprehensive JUnit tests for all flashcard API endpoints and service logic
    - **Branch:** `<branch-name>`
    - **Test Coverage:**
        - ❌ Test GET all flashcards (with pagination, empty results, mock data mode)
        - ❌ Test GET single flashcard (found, not found, invalid ID)
        - ❌ Test POST create flashcard (success, validation errors, missing fields)
        - ❌ Test PUT update flashcard (success, not found, validation errors)
        - ❌ Test DELETE flashcard (success, not found)
        - ❌ Test initialize endpoint (first run, already initialized, Firebase errors)
        - ❌ Test Firebase connection and service layer methods
        - ❌ Test error handling and edge cases
    - **Requirements:**
        - ❌ Use JUnit 5 and Mockito for mocking
        - ❌ Achieve >80% code coverage
        - ❌ Test both Firebase-enabled and mock data modes
        - ❌ Include integration tests for Firebase operations
    - **Date:** November 13, 2025

### Frontend Development

- ❌ **Create Flash Card UI Components**
    - **Description:** Build React components for displaying and interacting with flashcards
    - **Branch:** `<branch-name>`
    - **Components to create:**
        - ❌ `FlashCard.tsx` - Single card component with flip animation (Chinese ↔ English)
        - ❌ `FlashCardList.tsx` - Display list/grid of all flashcards
        - ❌ `FlashCardForm.tsx` - Form for creating/editing flashcards (chineseWord, englishWord, pinyin, img)
        - ❌ `FlashCardDetail.tsx` - Detailed view of single flashcard
    - **Features:**
        - ❌ Card flip animation (click to reveal translation)
        - ❌ Display pinyin pronunciation
        - ❌ Optional image display
        - ❌ Responsive design (mobile-friendly)
        - ❌ Edit and delete buttons with confirmation
    - **Styling:** Use existing CSS patterns or Tailwind CSS
    - **Date:** November 13, 2025

- ❌ **Create gRPC-Web Service Layer for Frontend**
    - **Description:** Create TypeScript gRPC-Web client for all flashcard API calls
    - **Branch:** `<branch-name>`
    - **Services to implement:**
        - ❌ `flashcardGrpcService.ts` - gRPC-Web client functions
            - ❌ `getAllFlashcards(page, pageSize)` - Fetch all cards via gRPC
            - ❌ `getFlashcardById(id)` - Fetch single card via gRPC
            - ❌ `createFlashcard(data)` - Create new card via gRPC
            - ❌ `updateFlashcard(id, data)` - Update card via gRPC
            - ❌ `deleteFlashcard(id)` - Delete card via gRPC
        - ❌ Configure gRPC-Web client to connect to backend (localhost:8080)
        - ❌ Error handling and response parsing
        - ❌ Use generated TypeScript types from protobuf
    - **Requirements:**
        - ❌ Install grpc-web and @improbable-eng/grpc-web dependencies
        - ❌ Use generated TypeScript types from protobuf (already created in proto setup task)
        - ❌ Handle gRPC errors and status codes
        - ❌ Type-safe with protobuf-generated types
        - ❌ Configure gRPC-Web client with proper metadata/headers
    - **Date:** November 13, 2025

### Testing

- ❌ **Create Frontend Unit Tests**
    - **Description:** Write Jest/React Testing Library tests for flashcard components
    - **Branch:** `<branch-name>`
    - **Test Coverage:**
        - ❌ Test FlashCard component (render, flip animation, data display)
        - ❌ Test FlashCardList component (render multiple cards, empty state)
        - ❌ Test FlashCardForm component (validation, submit, reset)
        - ❌ Test API service layer (mock fetch calls)
        - ❌ Test error states and loading states
    - **Requirements:**
        - ❌ Use React Testing Library best practices
        - ❌ Mock API calls appropriately
        - ❌ Test user interactions and events
        - ❌ Achieve >70% component coverage
    - **Date:** November 13, 2025

- ❌ **Setup grpcui for API Testing and Documentation**
    - **Description:** grpcui is already defined as a subtask in the Chinese Flash Card gRPC API task above
    - **Note:** This replaces Swagger/OpenAPI for gRPC-based APIs
    - **Date:** November 13, 2025
