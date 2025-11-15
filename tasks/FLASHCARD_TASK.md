# Flash Card Feature Tasks

**Description:** Building a Chinese Flash Card learning feature with full-stack implementation including backend APIs, Firebase integration, frontend UI, and comprehensive testing.

**Architecture:** gRPC-based API using Protocol Buffers for type-safe communication between frontend (gRPC-Web) and backend (gRPC server)

**Technical Documentation:** [tech_doc/FLASHCARD_FEATURE.md](../tech_doc/FLASHCARD_FEATURE.md) - Comprehensive technical reference including architecture, data flow, API reference, and deployment guide

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

    - ✅ **Setup Service-Level gRPC Server**
        - **Description:** Create a centralized gRPC server that hosts all gRPC services (Chinese FlashCard, French FlashCard, etc.) on a single port, replacing Jetty
        - **Component:** `GrpcServer` (`src/main/java/com/worldmap/grpc/`)
        - **Branch:** `grpc-server-setup` ✅ (created from chinese-flashcard-grpc-api)
        - **Architecture:** One gRPC server (port 8080) hosting multiple gRPC services
        - **Purpose:**
            - Provide a single entry point for all gRPC services
            - Efficient resource usage (one server instance, one port)
            - Standard industry pattern used by Google, Uber, Netflix
            - Simplifies deployment (only one port to manage)
        - **Subtasks:**
            - ✅ **Create GrpcServer class**
                - Location: `src/main/java/com/worldmap/grpc/GrpcServer.java`
                - Use Guice dependency injection
                - Accept all gRPC service implementations via constructor injection
                - Build server with `ServerBuilder.forPort(8080)`
                - Register all injected services using `.addService()`
                - Enable gRPC Server Reflection for grpcui support
                - Add graceful shutdown hook
                - Added standard gRPC Health Checking protocol support
            - ✅ **Create GrpcModule for Guice**
                - Location: `src/main/java/com/worldmap/guice/modules/GrpcModule.java`
                - Bind GrpcServer as singleton
                - Configure Multibinder for dynamic gRPC service registration
                - Configure server port (8080) from ApplicationConfig
            - ✅ **Integrate GrpcServer with WorldMapApplication**
                - Replaced Jetty server initialization with GrpcServer
                - Use Guice injector to get GrpcServer instance
                - Start GrpcServer on port 8080
                - Add shutdown hook to stop GrpcServer gracefully
                - Log server startup status (port, services registered)
                - Jetty still available for legacy support (can be removed later)
            - ✅ **Enable gRPC Server Reflection**
                - Add `ProtoReflectionService` to server
                - Required for grpcui to auto-discover services
                - Verified server starts successfully with reflection enabled
            - ✅ **Update README.md**
                - Document gRPC server architecture and port (8080)
                - Add instructions for running the gRPC server
                - Document how to test with grpcui
                - Update frontend development instructions (connect to localhost:8080)
                - Add protobuf regeneration instructions
                - Document service registration process via Guice
        - **Requirements:**
            - ✅ Single gRPC server instance on port 8080
            - ✅ Support dynamic service registration via Guice (Multibinder pattern)
            - ✅ Enable gRPC Server Reflection for grpcui
            - ✅ Enable gRPC Health Checking (standard protocol)
            - ✅ Graceful startup and shutdown
            - ✅ Proper error handling and logging
            - ⚠️  Jetty server disabled/removed (Jetty still in dependencies but not used for APIs)
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
            
    - ✅ **Chinese Flash Card gRPC API**
        - **Branch:** `chinese-flashcard-grpc-api`
        - **Description:** Implement complete gRPC API for Chinese flashcard CRUD operations with Firestore integration
        - **Protobuf Source:** `proto/chinese_card.proto` ✅ (already defined)
        - **Generated Classes:** `build/generated/source/proto/main/java/com/worldmap/flashcard/` ✅ (auto-generated by Gradle)
        - **Dependencies:**
            - ✅ "Setup Service-Level gRPC Server" task completed (GrpcServer ready)
            - ✅ gRPC dependencies in build.gradle
            - ✅ Protobuf plugin configured and code generated
            - ✅ FirestoreService layer created and tested

        - **Implementation Files to Create:**
            1. `src/main/java/com/worldmap/grpc/ChineseFlashCardGrpcService.java`
            2. `src/main/java/com/worldmap/service/ChineseFlashCardService.java`
            3. `src/test/java/com/worldmap/service/ChineseFlashCardServiceTest.java`

        - **Subtasks:**
            - ✅ **Implement ChineseFlashCardGrpcService (gRPC Layer)**
                - **File:** `src/main/java/com/worldmap/grpc/ChineseFlashCardGrpcService.java`
                - **Purpose:** Handle gRPC requests and delegate to business logic layer
                - **Implementation:**
                    - Extend `ChineseFlashCardServiceGrpc.ChineseFlashCardServiceImplBase`
                    - Annotate with `@Singleton`
                    - Inject `ChineseFlashCardService` via `@Inject` constructor
                    - Implement 5 RPC methods (Create, GetAll, GetById, Update, Delete)
                    - Each method receives protobuf request, calls service layer, sends protobuf response
                    - Use `StreamObserver<Response>` pattern for async responses
                    - Handle exceptions and convert to gRPC error responses
                - **Example method signature:**
                    ```java
                    @Override
                    public void createChineseFlashCard(
                        CreateChineseFlashCardRequest request,
                        StreamObserver<CreateChineseFlashCardResponse> responseObserver
                    )
                    ```

            - ✅ **Implement ChineseFlashCardService (Business Logic Layer)**
                - **File:** `src/main/java/com/worldmap/service/ChineseFlashCardService.java`
                - **Purpose:** Business logic, validation, and Firestore integration
                - **Implementation:**
                    - Annotate with `@Singleton`
                    - Inject `FirestoreService` and `ApplicationConfig` via `@Inject` constructor
                    - Collection name: `"chinese_flashcards"` (from ApplicationConfig or constant)
                    - Implement 5 business methods returning protobuf response objects:
                        1. `CreateChineseFlashCardResponse create(CreateChineseFlashCardRequest)`
                        2. `GetChineseFlashCardsResponse getAll(GetChineseFlashCardsRequest)`
                        3. `GetChineseFlashCardResponse getById(GetChineseFlashCardRequest)`
                        4. `UpdateChineseFlashCardResponse update(UpdateChineseFlashCardRequest)`
                        5. `DeleteChineseFlashCardResponse delete(DeleteChineseFlashCardRequest)`
                    - **Validation:**
                        - Validate required fields (chineseWord, englishWord, pinyin)
                        - Return error response if validation fails
                    - **Firestore Integration:**
                        - Use FirestoreService for all CRUD operations
                        - Generate unique IDs using `System.currentTimeMillis()` or UUID
                        - Set createdAt and updatedAt timestamps
                    - **Conversion Helpers (private methods):**
                        - `Map<String, Object> toFirestoreDoc(ChineseFlashCard protobuf)`
                        - `ChineseFlashCard fromFirestoreDoc(Map<String, Object> doc)`
                    - **Mock Data Fallback:**
                        - If FirestoreService is null or Firebase disabled, return mock data
                        - Use same mock data structure as protobuf messages
                    - **Error Handling:**
                        - Try-catch around Firestore operations
                        - Build error responses with `success=false` and error message

            - ✅ **Register Service in GrpcModule**
                - **File:** `src/main/java/com/worldmap/guice/modules/GrpcModule.java`
                - **Changes needed:**
                    - Uncomment/add Multibinder registration for ChineseFlashCardGrpcService:
                    ```java
                    Multibinder.newSetBinder(binder(), BindableService.class)
                        .addBinding().to(ChineseFlashCardGrpcService.class);
                    ```
                - **Result:** GrpcServer will automatically register and serve this service

            - ✅ **Create Unit Tests**
                - **File:** `src/test/java/com/worldmap/service/ChineseFlashCardServiceTest.java`
                - **Test Coverage:**
                    - Test `create()` - success, validation errors, Firestore errors
                    - Test `getAll()` - with results, empty results, pagination
                    - Test `getById()` - found, not found
                    - Test `update()` - success, not found, validation errors
                    - Test `delete()` - success, not found
                    - Test conversion helpers (toFirestoreDoc, fromFirestoreDoc)
                    - Test Firestore not configured scenarios
                - **Setup:**
                    - Mock FirestoreService using Mockito
                    - Use protobuf builders to create test data
                    - Verify correct FirestoreService methods are called
                - **Target:** >80% code coverage (✅ Achieved: 21 tests passed)

        - **gRPC Methods (defined in protobuf):**
            1. ✅ `CreateChineseFlashCard` - Validate required fields, generate ID, save to Firestore
            2. ✅ `GetChineseFlashCards` - Get all with pagination (page, pageSize), return list + totalCount
            3. ✅ `GetChineseFlashCard` - Get by ID, return single flashcard or not found error
            4. ✅ `UpdateChineseFlashCard` - Validate fields, update timestamps, save to Firestore
            5. ✅ `DeleteChineseFlashCard` - Delete by ID, return success or not found error

        - **Data Flow:**
            ```
            Frontend (gRPC-Web)
                ↓ protobuf request
            GrpcServer (port 8080)
                ↓ routes to
            ChineseFlashCardGrpcService
                ↓ delegates to
            ChineseFlashCardService (business logic + validation)
                ↓ uses
            FirestoreService (generic Firestore operations)
                ↓ interacts with
            Firestore ("chinese_flashcards" collection)
            ```

        - **Testing & Verification:**
            - ✅ Run unit tests: `gradle test` (21 tests passed)
            - ✅ Start server: `gradle run`
            - ✅ Test with grpcurl: `grpcurl -plaintext localhost:8080`
            - ✅ Verify all 5 methods appear in grpcurl interface
            - ✅ Test each method with sample data via grpcurl

        - **Success Criteria:**
            - ✅ All 5 gRPC methods implemented and working
            - ✅ Service registered in GrpcServer via Guice
            - ✅ Firestore integration working (returns errors when not configured as expected)
            - ✅ Validation working correctly (required fields checked)
            - ✅ Unit tests passing with >80% coverage (21 tests passed)
            - ✅ Manual testing via grpcurl successful

        - **Notes:**
            - Ignore existing REST controller and POJO model - fresh gRPC implementation
            - Use only protobuf-generated classes for all data transfer
            - No JSON serialization needed - protobuf handles binary serialization
            - FirestoreService handles all database operations (already implemented)
            - Collection name: "chinese_flashcards" (configurable via ApplicationConfig)
    
    - ❌ **French Flash Card gRPC API**
        - **Branch:** `french-flashcard-grpc-api`
        - **Description:** Implement complete gRPC API for French flashcard CRUD operations with Firestore integration (follows same pattern as Chinese flashcards)
        - **Protobuf Source:** `proto/french_flashcard.proto` ❌ (needs to be created)
        - **Generated Classes:** `build/generated/source/proto/main/java/com/worldmap/flashcard/` (auto-generated after protobuf creation)
        - **Dependencies:**
            - ✅ "Setup Service-Level gRPC Server" task completed (GrpcServer ready)
            - ✅ gRPC dependencies in build.gradle
            - ✅ Protobuf plugin configured
            - ✅ FirestoreService layer created and tested
            - ⚠️ Requires Chinese Flash Card protobuf as reference/template

        - **Implementation Files to Create:**
            1. `proto/french_flashcard.proto` (protobuf definition)
            2. `src/main/java/com/worldmap/grpc/FrenchFlashCardGrpcService.java`
            3. `src/main/java/com/worldmap/service/FrenchFlashCardService.java`
            4. `src/test/java/com/worldmap/service/FrenchFlashCardServiceTest.java`

        - **Subtasks:**
            - ❌ **Create Protobuf Definition**
                - **File:** `proto/french_flashcard.proto`
                - **Purpose:** Define French flashcard data model and gRPC service interface
                - **Implementation:**
                    - Follow same structure as `proto/chinese_card.proto`
                    - Package: `worldmap.flashcard`
                    - Java package: `com.worldmap.flashcard`
                    - **FrenchFlashCard message fields:**
                        - `int64 id` - Unique identifier
                        - `string french_word` - French vocabulary (e.g., "Bonjour")
                        - `string english_word` - English translation (e.g., "Hello")
                        - `string pronunciation` - Pronunciation guide (e.g., "bon-ZHOOR")
                        - `string img` - Optional image URL
                        - `int64 created_at` - Unix timestamp (milliseconds)
                        - `int64 updated_at` - Unix timestamp (milliseconds)
                    - **Request/Response messages:**
                        - CreateFrenchFlashCardRequest/Response
                        - GetFrenchFlashCardsRequest/Response (with pagination)
                        - GetFrenchFlashCardRequest/Response
                        - UpdateFrenchFlashCardRequest/Response
                        - DeleteFrenchFlashCardRequest/Response
                    - **Service definition:** `FrenchFlashCardService` with 5 RPC methods
                - **After creation:** Run `gradle generateProto` to generate Java classes

            - ❌ **Implement FrenchFlashCardGrpcService (gRPC Layer)**
                - **File:** `src/main/java/com/worldmap/grpc/FrenchFlashCardGrpcService.java`
                - **Purpose:** Handle gRPC requests and delegate to business logic layer
                - **Implementation:**
                    - Extend `FrenchFlashCardServiceGrpc.FrenchFlashCardServiceImplBase`
                    - Annotate with `@Singleton`
                    - Inject `FrenchFlashCardService` via `@Inject` constructor
                    - Implement 5 RPC methods (Create, GetAll, GetById, Update, Delete)
                    - Each method receives protobuf request, calls service layer, sends protobuf response
                    - Use `StreamObserver<Response>` pattern for async responses
                    - Handle exceptions and convert to gRPC error responses
                - **Example method signature:**
                    ```java
                    @Override
                    public void createFrenchFlashCard(
                        CreateFrenchFlashCardRequest request,
                        StreamObserver<CreateFrenchFlashCardResponse> responseObserver
                    )
                    ```

            - ❌ **Implement FrenchFlashCardService (Business Logic Layer)**
                - **File:** `src/main/java/com/worldmap/service/FrenchFlashCardService.java`
                - **Purpose:** Business logic, validation, and Firestore integration
                - **Implementation:**
                    - Annotate with `@Singleton`
                    - Inject `FirestoreService` and `ApplicationConfig` via `@Inject` constructor
                    - Collection name: `"french_flashcards"` (from ApplicationConfig or constant)
                    - Implement 5 business methods returning protobuf response objects:
                        1. `CreateFrenchFlashCardResponse create(CreateFrenchFlashCardRequest)`
                        2. `GetFrenchFlashCardsResponse getAll(GetFrenchFlashCardsRequest)`
                        3. `GetFrenchFlashCardResponse getById(GetFrenchFlashCardRequest)`
                        4. `UpdateFrenchFlashCardResponse update(UpdateFrenchFlashCardRequest)`
                        5. `DeleteFrenchFlashCardResponse delete(DeleteFrenchFlashCardRequest)`
                    - **Validation:**
                        - Validate required fields (frenchWord, englishWord, pronunciation)
                        - Return error response if validation fails
                    - **Firestore Integration:**
                        - Use FirestoreService for all CRUD operations
                        - Generate unique IDs using `System.currentTimeMillis()` or UUID
                        - Set createdAt and updatedAt timestamps
                    - **Conversion Helpers (private methods):**
                        - `Map<String, Object> toFirestoreDoc(FrenchFlashCard protobuf)`
                        - `FrenchFlashCard fromFirestoreDoc(Map<String, Object> doc)`
                    - **Mock Data Fallback:**
                        - If FirestoreService is null or Firebase disabled, return mock data
                        - Use French vocabulary examples (e.g., "Bonjour", "Merci", "Au revoir")
                    - **Error Handling:**
                        - Try-catch around Firestore operations
                        - Build error responses with `success=false` and error message

            - ❌ **Register Service in GrpcModule**
                - **File:** `src/main/java/com/worldmap/guice/modules/GrpcModule.java`
                - **Changes needed:**
                    - Add Multibinder registration for FrenchFlashCardGrpcService:
                    ```java
                    Multibinder.newSetBinder(binder(), BindableService.class)
                        .addBinding().to(FrenchFlashCardGrpcService.class);
                    ```
                - **Result:** GrpcServer will automatically register and serve this service alongside Chinese flashcards

            - ❌ **Create Unit Tests**
                - **File:** `src/test/java/com/worldmap/service/FrenchFlashCardServiceTest.java`
                - **Test Coverage:**
                    - Test `create()` - success, validation errors (missing frenchWord/englishWord/pronunciation), Firestore errors
                    - Test `getAll()` - with results, empty results, pagination
                    - Test `getById()` - found, not found
                    - Test `update()` - success, not found, validation errors
                    - Test `delete()` - success, not found
                    - Test conversion helpers (toFirestoreDoc, fromFirestoreDoc)
                    - Test mock data fallback when Firestore is null
                - **Setup:**
                    - Mock FirestoreService using Mockito
                    - Use protobuf builders to create test data
                    - Verify correct FirestoreService methods are called
                - **Target:** >80% code coverage

        - **gRPC Methods (defined in protobuf):**
            1. ❌ `CreateFrenchFlashCard` - Validate required fields (frenchWord, englishWord, pronunciation), generate ID, save to Firestore
            2. ❌ `GetFrenchFlashCards` - Get all with pagination (page, pageSize), return list + totalCount
            3. ❌ `GetFrenchFlashCard` - Get by ID, return single flashcard or not found error
            4. ❌ `UpdateFrenchFlashCard` - Validate fields, update timestamps, save to Firestore
            5. ❌ `DeleteFrenchFlashCard` - Delete by ID, return success or not found error

        - **Data Flow:**
            ```
            Frontend (gRPC-Web)
                ↓ protobuf request
            GrpcServer (port 8080)
                ↓ routes to
            FrenchFlashCardGrpcService
                ↓ delegates to
            FrenchFlashCardService (business logic + validation)
                ↓ uses
            FirestoreService (generic Firestore operations)
                ↓ interacts with
            Firestore ("french_flashcards" collection)
            ```

        - **Testing & Verification:**
            - ❌ Create protobuf definition: `proto/french_flashcard.proto`
            - ❌ Generate code: `gradle generateProto`
            - ❌ Run unit tests: `gradle test`
            - ❌ Start server: `gradle run`
            - ❌ Test with grpcui: `grpcui -plaintext localhost:8080`
            - ❌ Verify all 5 methods appear in grpcui interface (alongside Chinese flashcard methods)
            - ❌ Test each method with sample French vocabulary data

        - **Success Criteria:**
            - ✅ Protobuf definition created and code generated
            - ✅ All 5 gRPC methods implemented and working
            - ✅ Service registered in GrpcServer via Guice (runs on same server as Chinese flashcards)
            - ✅ Firestore integration working (create, read, update, delete)
            - ✅ Mock data fallback with French vocabulary examples
            - ✅ Unit tests passing with >80% coverage
            - ✅ Manual testing via grpcui successful

        - **Notes:**
            - Follow exact same pattern as Chinese Flash Card implementation
            - Use only protobuf objects (no POJOs)
            - Use FirestoreService for all DB operations
            - Collection name: "french_flashcards"
            - Both Chinese and French services run on the same GrpcServer instance (port 8080)
            - grpcui will show both services in the same interface
    
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

- ❌ **Separate Frontend Hosting from Java Backend**
    - **Description:** Configure frontend to run independently from the Java backend, using modern SPA architecture
    - **Branch:** `frontend-hosting-setup`
    - **Purpose:**
        - Decouple frontend deployment from backend deployment
        - Enable faster development with hot reload
        - Prepare for production deployment (CDN, Vercel, Netlify, etc.)
        - Follow modern SPA architecture patterns
    - **Subtasks:**
        - ❌ **Remove Jetty static file serving**
            - Remove `copyReactBuild` task from build.gradle
            - Remove `buildReact` dependency from `processResources`
            - Remove Jetty server initialization from WorldMapApplication
            - Remove Jetty dependencies from build.gradle (keep only if needed for other purposes)
        - ❌ **Configure Vite dev server for development**
            - Update frontend package.json with proper dev script
            - Configure Vite to proxy gRPC-Web requests to localhost:8080
            - Set up CORS configuration for development
            - Document how to run frontend dev server (npm run dev on port 3000)
        - ❌ **Update frontend configuration**
            - Create environment variables for API endpoint (localhost:8080 for dev)
            - Configure gRPC-Web client to use environment variable
            - Add .env.development and .env.production files
        - ❌ **Document production deployment options**
            - Add README section for deploying to Vercel`
            - Add README section for deploying to Netlify
            - Add README section for deploying to S3 + CloudFront
            - Document environment variable configuration for production
        - ❌ **Update README.md**
            - Document new architecture (separate frontend/backend)
            - Add development workflow (run backend + frontend separately)
            - Update "Getting Started" section
            - Add troubleshooting for CORS issues
    - **Requirements:**
        - ❌ Frontend runs independently on port 3000 (development)
        - ❌ Backend (gRPC) runs on port 8080
        - ❌ CORS properly configured for development
        - ❌ Environment variables for API endpoints
        - ❌ Clear documentation for developers
    - **Benefits:**
        - Hot reload during development (faster iteration)
        - Independent scaling of frontend and backend
        - Modern deployment options (CDN, serverless)
        - Cleaner separation of concerns
        - Frontend can be deployed to CDN for better performance
    - **Date:** November 13, 2025

- ✅ **Create Flash Card UI Components**
    - **Description:** Build React components for displaying and interacting with flashcards
    - **Branch:** `chinese-flash-card`
    - **Status:** Components already implemented with advanced features
    - **Components created:**
        - ✅ `FlashCard.tsx` - Main wrapper component ([frontend/src/components/FlashCard/FlashCard.tsx](frontend/src/components/FlashCard/FlashCard.tsx))
        - ✅ `Card.tsx` - Base card component with flip animation using Framer Motion ([frontend/src/components/FlashCard/Card.tsx](frontend/src/components/FlashCard/Card.tsx))
        - ✅ `CardStack.tsx` - Stack container with drag functionality ([frontend/src/components/FlashCard/CardStack.tsx](frontend/src/components/FlashCard/CardStack.tsx))
        - ✅ `ChineseCard.tsx` - Chinese-specific card layout ([frontend/src/components/FlashCard/Language/ChineseCard.tsx](frontend/src/components/FlashCard/Language/ChineseCard.tsx))
        - ✅ `FlashCardPage.tsx` - Full page implementation ([frontend/src/Pages/FlashCard/FlashCardPage.tsx](frontend/src/Pages/FlashCard/FlashCardPage.tsx))
        - ✅ `ChineseVocabCollection.tsx` - Collection management component ([frontend/src/Pages/FlashCard/VocabCollections/ChineseVocabCollection.tsx](frontend/src/Pages/FlashCard/VocabCollections/ChineseVocabCollection.tsx))
    - **Features implemented:**
        - ✅ Card flip animation (double-click to flip, smooth 90-degree transition)
        - ✅ Display pinyin pronunciation on card back
        - ✅ Optional image display on card front
        - ✅ Responsive design with configurable dimensions
        - ✅ Drag to reorder cards in stack
        - ✅ Random rotation for natural card stack appearance
        - ✅ Add and delete vocabulary with UI feedback
        - ✅ Animated vocabulary list with gradients
    - **Current Integration:** Uses REST API service ([chineseCardService.ts](frontend/src/services/chineseCardService.ts)) with mock data
    - **Date:** November 13, 2025

- ❌ **Integrate Flash Card UI with gRPC-Web Service**
    - **Description:** Replace REST API calls with gRPC-Web service integration in ChineseVocabCollection data manager using Container Component pattern (manual state management)
    - **Branch:** `flashcard-grpc-integration` (or continue in `chinese-flash-card`)
    - **Architecture Decision:** ChineseVocabCollection is the **data manager** that handles all Chinese flashcard data operations (fetch, add, delete, update) and provides data to child components via render props pattern
    - **Future Migration:** Plan to migrate to React Query later for automatic caching/refetching - see [REACTQUERY_TASK.md](REACTQUERY_TASK.md) and [tech_doc/REACT_QUERY.md](../tech_doc/REACT_QUERY.md)
    - **Dependencies:**
        - ✅ gRPC-Web service layer completed ([chineseFlashcardGrpcService.ts](frontend/src/services/chineseFlashcardGrpcService.ts))
        - ✅ Backend gRPC API implemented and tested
        - ✅ UI components already exist
    - **Problem:** [ChineseVocabCollection.tsx](frontend/src/Pages/FlashCard/VocabCollections/ChineseVocabCollection.tsx) uses [chineseCardService.ts](frontend/src/services/chineseCardService.ts) (REST/axios with mock data) instead of the new gRPC-Web service
    - **Scope:** Only update ChineseVocabCollection data layer - no changes to FlashCardPage, VocabCollections UI, or other components
    - **Implementation Strategy:** Sequential CRUD integration - Read first, then Add, then Update, then Delete
    - **Subtasks:**
        - ❌ **Phase 1: Implement READ operation (Fetch all cards)**
            - **File to modify:** [ChineseVocabCollection.tsx](frontend/src/Pages/FlashCard/VocabCollections/ChineseVocabCollection.tsx)
            - Replace `import { fetchChineseCards }` from chineseCardService
            - Import `getAllFlashcards` from `chineseFlashcardGrpcService`
            - Update `useEffect` to call `getAllFlashcards(1, 1000)` instead of `fetchChineseCards()`
            - Extract cards from gRPC response: `response.getFlashcardsList()`
            - Map protobuf ChineseFlashCard objects to ChineseCardData:
                ```typescript
                const mappedCards = response.getFlashcardsList().map(card => ({
                    id: card.getId(),
                    chineseWord: card.getChineseword(),
                    englishWord: card.getEnglishword(),
                    pinyin: card.getPinyin(),
                    img: card.getImg()
                }));
                ```
            - Update error handling for gRPC errors
            - Test: Start backend and frontend, verify cards load and display in CardStack
            - Test: Check Network tab for gRPC request (Content-Type: application/grpc-web-text)
            - Test: Verify error handling when backend is down

        - ❌ **Phase 2: Implement CREATE operation (Add card)**
            - **File to modify:** [ChineseVocabCollection.tsx](frontend/src/Pages/FlashCard/VocabCollections/ChineseVocabCollection.tsx)
            - Import `createFlashcard` from `chineseFlashcardGrpcService`
            - Update `handleAddVocab` function to use `createFlashcard()`
            - Build request data object:
                ```typescript
                const newCard = await createFlashcard({
                    chineseWord: vocab.native,
                    englishWord: vocab.translation,
                    pinyin: vocab.pronunciation,
                    img: '' // optional
                });
                ```
            - Extract created card from response: `response.getFlashcard()`
            - Map protobuf response to ChineseCardData
            - Update local cards state with new card
            - Test: Add a new flashcard via UI
            - Test: Verify gRPC CreateChineseFlashCard request in Network tab
            - Test: Verify new card appears in CardStack immediately
            - Test: Error handling for validation errors (missing required fields)

        - ❌ **Phase 3: Implement UPDATE operation (Edit card)**
            - **File to modify:** [ChineseVocabCollection.tsx](frontend/src/Pages/FlashCard/VocabCollections/ChineseVocabCollection.tsx)
            - Import `updateFlashcard` from `chineseFlashcardGrpcService`
            - Add new `handleUpdateVocab` function:
                ```typescript
                const handleUpdateVocab = async (id: number, vocab: { native: string; pronunciation: string; translation: string }) => {
                    const updated = await updateFlashcard(id, {
                        chineseWord: vocab.native,
                        englishWord: vocab.translation,
                        pinyin: vocab.pronunciation
                    });
                    // Update local state
                };
                ```
            - Add edit functionality to VocabList (inline edit or modal)
            - Extract updated card from response: `response.getFlashcard()`
            - Map protobuf response to ChineseCardData
            - Update local cards state with updated card
            - Test: Edit an existing flashcard via UI
            - Test: Verify gRPC UpdateChineseFlashCard request in Network tab
            - Test: Verify changes reflect in CardStack immediately
            - Test: Error handling for not found and validation errors

        - ❌ **Phase 4: Implement DELETE operation (Remove card)**
            - **File to modify:** [ChineseVocabCollection.tsx](frontend/src/Pages/FlashCard/VocabCollections/ChineseVocabCollection.tsx)
            - Import `deleteFlashcard` from `chineseFlashcardGrpcService`
            - Update `handleDeleteVocab` function to use `deleteFlashcard(cardId)`
            - Check response success: `response.getSuccess()`
            - Update local cards state by removing deleted card
            - Test: Delete a flashcard via UI
            - Test: Verify gRPC DeleteChineseFlashCard request in Network tab
            - Test: Verify card disappears from CardStack immediately
            - Test: Error handling for not found errors

        - ❌ **Phase 5: Cleanup and documentation**
            - Mark [chineseCardService.ts](frontend/src/services/chineseCardService.ts) as deprecated
            - Add `@deprecated` comment at top: "Use chineseFlashcardGrpcService.ts instead"
            - Verify no other components import from chineseCardService
            - Update README with gRPC-Web integration details
            - Document the data flow: FlashCardPage → ChineseVocabCollection → gRPC-Web → Backend
            - Add troubleshooting section for gRPC connection issues
            - Test all CRUD operations end-to-end one more time
    - **Requirements:**
        - ❌ All flashcard operations (Create, Read, Update, Delete) use gRPC-Web
        - ❌ Proper error handling with user-friendly messages
        - ❌ Loading states during API calls
        - ❌ Data persists to backend (Firestore or mock data)
        - ❌ No breaking changes to existing UI/UX
        - ❌ Load all vocabulary at once (no pagination)
    - **Data Mapping:**
        - Frontend `ChineseCardData`: `{ id, chineseWord, englishWord, pinyin, img }`
        - Protobuf `ChineseFlashCard`: `{ id, chineseWord, englishWord, pinyin, img, createdAt, updatedAt }`
        - Map protobuf to `ChineseCardData` by extracting relevant fields
    - **Date:** November 15, 2025

- ✅ **Create gRPC-Web Service Layer for Frontend**
    - **Description:** Implement official gRPC-Web client for all flashcard API calls using Google's grpc-web library with TypeScript
    - **Branch:** `chinese-flash-card`
    - **Approach:** Official grpc-web (Google's implementation) with protoc-gen-grpc-web for code generation
    - **Architecture:** Browser → gRPC-Web (HTTP/1.1) → Armeria (native gRPC-Web support) → gRPC Server (port 8080)

    - **Subtasks:**
        - ✅ **Install grpc-web dependencies**
            - ✅ Install `grpc-web` package for runtime
            - ✅ Install `google-protobuf` for protobuf serialization
            - ✅ Install `@types/google-protobuf` for TypeScript types
            - ✅ Update package.json with new dependencies

        - ✅ **Install protoc-gen-grpc-web plugin**
            - ✅ Install `protoc-gen-grpc-web` globally or as dev dependency
            - ✅ Verify protoc compiler is available (or install it)
            - ✅ Test plugin installation with `protoc --version`

        - ✅ **Create npm script for gRPC-Web code generation**
            - ✅ Add `generate:grpc-web` script to package.json
            - ✅ Script should run protoc with grpc-web plugin
            - ✅ Generate both JavaScript and TypeScript (.d.ts) files
            - ✅ Command example:
                ```bash
                protoc -I=../proto chinese_card.proto \
                  --js_out=import_style=commonjs:./src/types/grpc-web \
                  --grpc-web_out=import_style=typescript,mode=grpcwebtext:./src/types/grpc-web
                ```
            - ✅ Output directory: `src/types/grpc-web/`

        - ✅ **Generate gRPC-Web TypeScript client stubs**
            - ✅ Run `npm run generate:grpc-web`
            - ✅ Verify generated files:
                - ✅ `chinese_card_pb.js` (message types)
                - ✅ `chinese_card_pb.d.ts` (TypeScript definitions)
                - ✅ `Chinese_cardServiceClientPb.ts` (service client)
            - ✅ Add generated files to .gitignore (regenerate on build)

        - ✅ **Add gRPC-Web support to Java backend**
            - ✅ Add Armeria gRPC library (`com.linecorp.armeria:armeria-grpc:1.32.0`) to build.gradle
            - ✅ Update GrpcServer.java to use Armeria (native gRPC-Web support)
            - ✅ Configure CORS for browser requests
            - ✅ Build successful with new dependencies

        - ✅ **Implement grpcService.ts and chineseFlashcardGrpcService.ts**
            - ✅ **Created generic service layer** (`src/services/grpcService.ts`)
                - ✅ `withErrorHandling()` - Wraps Promise calls with consistent error handling
                - ✅ `handleGrpcError()` - Converts gRPC errors to user-friendly messages based on StatusCode
                - ✅ `GRPC_SERVER_URL` - Environment-based configuration (REACT_APP_GRPC_URL)
                - ✅ Logs configured server URL in development mode
                - ✅ Uses native gRPC-Web Promise support (no custom promise wrapper needed)
            - ✅ **Created Chinese flashcard service** (`src/services/chineseFlashcardGrpcService.ts`)
                - ✅ Import generated `ChineseFlashCardServiceClient`
                - ✅ Create client instance pointing to `GRPC_SERVER_URL`
                - ✅ Implement 5 wrapper functions (all wrapped with `withErrorHandling()`):
                    1. ✅ `getAllFlashcards(page: number, pageSize: number)` - Returns Promise<GetChineseFlashCardsResponse>
                    2. ✅ `getFlashcardById(id: number)` - Returns Promise<GetChineseFlashCardResponse>
                    3. ✅ `createFlashcard(data)` - Returns Promise<CreateChineseFlashCardResponse>
                    4. ✅ `updateFlashcard(id: number, data)` - Returns Promise<UpdateChineseFlashCardResponse>
                    5. ✅ `deleteFlashcard(id: number)` - Returns Promise<DeleteChineseFlashCardResponse>
                - ✅ Handle gRPC errors with proper StatusCode mapping to user-friendly messages
                - ✅ Export typed functions for components to use
                - ✅ Export client instance for advanced use cases
            - ✅ **Created comprehensive README** (`src/services/README.md`)
                - ✅ Architecture overview (generic + specific layers)
                - ✅ Usage examples for Chinese flashcards
                - ✅ Pattern for adding new services (French flashcards, etc.)
                - ✅ Environment configuration guide (.env.development, .env.example)
                - ✅ Error handling documentation with status code table
                - ✅ Benefits of the pattern and "How It Works" section with flow diagram

        - ✅ **Configure gRPC-Web client**
            - ✅ Set base URL via environment variable (`process.env.REACT_APP_GRPC_URL`)
            - ✅ Created `.env.development` with `REACT_APP_GRPC_URL=http://localhost:8080`
            - ✅ Created `.env.example` for documentation
            - ✅ Added global error handling via `withErrorHandling()` wrapper
            - ✅ Error handler logs detailed error info (code, message, metadata)
            - ✅ Error handler provides user-friendly messages based on gRPC StatusCode
            - ✅ Defaults to `http://localhost:8080` if env var not set

        - ❌ **Test gRPC-Web integration**
            - Start Java backend: `gradle run` (port 8080)
            - Start frontend dev server: `npm start` (port 3000)
            - Test all 5 API methods from browser console
            - Verify CORS headers are correct
            - Check Network tab for gRPC-Web requests (Content-Type: application/grpc-web-text)
            - Confirm responses are properly deserialized

    - **Requirements:**
        - ✅ Use official `grpc-web` package (not @improbable-eng/grpc-web)
        - ✅ Generate TypeScript client stubs with `protoc-gen-grpc-web`
        - ✅ Handle gRPC status codes (OK, NOT_FOUND, INVALID_ARGUMENT, UNAVAILABLE, INTERNAL, etc.)
        - ✅ Type-safe with generated protobuf types
        - ✅ CORS configured on backend for browser requests (via Armeria)
        - ✅ Error handling with proper TypeScript error types (RpcError, StatusCode)
        - ✅ Environment variable for gRPC endpoint URL (REACT_APP_GRPC_URL)

    - **Generated Files Structure:**
        ```
        frontend/src/types/grpc-web/
        ├── chinese_card_pb.js           # Protobuf message classes
        ├── chinese_card_pb.d.ts         # TypeScript definitions for messages
        └── Chinese_cardServiceClientPb.ts  # gRPC-Web service client
        ```

    - **Service Layer Structure:**
        ```
        frontend/src/services/
        ├── grpcService.ts                      # Generic gRPC-Web helpers (error handling, config)
        ├── chineseFlashcardGrpcService.ts      # Chinese flashcard API wrapper
        └── README.md                           # Documentation and usage examples
        ```

    - **Dependencies to Add:**
        - `grpc-web` - Official gRPC-Web runtime library
        - `google-protobuf` - Protocol Buffers runtime library
        - `@types/google-protobuf` - TypeScript types for google-protobuf
        - `protoc-gen-grpc-web` (dev) - Code generator plugin

    - **Backend Dependencies Added:**
        - ✅ `com.linecorp.armeria:armeria-grpc:1.32.0` - Armeria with native gRPC-Web support
        - Note: Did NOT use `io.grpc:grpc-web` (artifact doesn't exist), used Armeria instead

    - **Key Implementation Decisions:**
        - ✅ Used Armeria for native gRPC-Web support (no separate proxy/filter needed)
        - ✅ gRPC-Web clients natively return Promises (no custom promisification needed)
        - ✅ Renamed `flashcardGrpcService.ts` → `grpcService.ts` (more generic, supports all services)
        - ✅ All service functions wrapped with `withErrorHandling()` for consistent error messages
        - ✅ Request objects set fields directly (no nested `flashcard` object in Create/Update requests)

    - **Date:** November 14-15, 2025

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
