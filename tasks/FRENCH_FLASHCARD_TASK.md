# French Flash Card Feature Tasks

**Description:** Building a French Flash Card learning feature with full-stack implementation including backend APIs, Firebase integration, frontend UI, and comprehensive testing.

**Architecture:** gRPC-based API using Protocol Buffers for type-safe communication between frontend (gRPC-Web) and backend (gRPC server)

**Main Branch:** `main`

**Feature Branch:** `FlashCard`

**Language:** French

**Branching Strategy:** Each task will be worked on in its own branch and merged into the `FlashCard` feature branch. Once all tasks are complete, the `FlashCard` feature branch will be merged into `main`.

**Date Started:** November 13, 2025

**Status Legend:** ❌ Not Started | 🔄 In Progress | ✅ Completed

---

## Tasks ##

### Protocol Buffers Setup

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
        - ❌ Protobuf definition created and code generated
        - ❌ All 5 gRPC methods implemented and working
        - ❌ Service registered in GrpcServer via Guice (runs on same server as Chinese flashcards)
        - ❌ Firestore integration working (create, read, update, delete)
        - ❌ Mock data fallback with French vocabulary examples
        - ❌ Unit tests passing with >80% coverage
        - ❌ Manual testing via grpcui successful

    - **Notes:**
        - Follow exact same pattern as Chinese Flash Card implementation
        - Use only protobuf objects (no POJOs)
        - Use FirestoreService for all DB operations
        - Collection name: "french_flashcards"
        - Both Chinese and French services run on the same GrpcServer instance (port 8080)
        - grpcui will show both services in the same interface

    - **Date:** November 13, 2025

- ❌ **Migrate Backend to Google Cloud Functions**
    - **Description:** Convert the Java gRPC backend for French flashcards into serverless Google Cloud Functions
    - **Branch:** `french-flashcard-cloud-functions`
    - **Purpose:** Same benefits as Chinese flashcard Cloud Functions - serverless, auto-scaling, cost-effective
    - **Architecture:** Frontend → Cloud Functions (HTTP/HTTPS) → Firestore
    - **Dependencies:**
        - ✅ Google Cloud Project configured (shared with Chinese flashcards)
        - ✅ Cloud Functions API enabled
        - ❌ French flashcard protobuf or data model defined
        - ❌ Firestore collection `french_flashcards` configured
    
    - **Subtasks:**
        - ❌ **Create Cloud Functions for French Flashcards**
            - Follow same pattern as Chinese flashcard functions
            - Implement 5 functions:
                1. `createFrenchFlashcard` - POST /flashcards/french
                2. `getFrenchFlashcards` - GET /flashcards/french
                3. `getFrenchFlashcard` - GET /flashcards/french/:id
                4. `updateFrenchFlashcard` - PUT /flashcards/french/:id
                5. `deleteFrenchFlashcard` - DELETE /flashcards/french/:id
            - Validate required fields (frenchWord, englishWord, pronunciation)
            - Collection: `french_flashcards`
        
        - ❌ **Create Request/Response DTOs**
            - `CreateFrenchFlashcardRequest`
            - `UpdateFrenchFlashcardRequest`
            - `FrenchFlashcardResponse`
            - Follow same structure as Chinese flashcard DTOs
        
        - ❌ **Deploy Cloud Functions**
            - Deploy all 5 functions to same region as Chinese functions
            - Use consistent naming: `frenchFlashcard` prefix
            - Configure CORS for browser requests
        
        - ❌ **Update Frontend to Use Cloud Functions**
            - **File:** `frontend/src/services/frenchFlashcardHttpService.ts`
            - Implement HTTP service layer
            - Update data layer with feature flag support
            - All CRUD operations use Cloud Functions endpoints
        
        - ❌ **Add to CI/CD Pipeline**
            - Add French flashcard functions to `cloudbuild.yaml`
            - Automated deployment on push
        
        - ❌ **Update Documentation**
            - Document French flashcard Cloud Functions endpoints
            - Add to deployment guide
    
    - **Requirements:**
        - ❌ All 5 Cloud Functions deployed and working
        - ❌ Frontend integrated with Cloud Functions
        - ❌ Same features as Chinese flashcard implementation
    
    - **Note:** This task reuses most of the Cloud Functions infrastructure from Chinese flashcards. Only need to create French-specific functions and update frontend.
    
    - **Date:** November 17, 2025

- ❌ **Setup grpcui for API Testing and Documentation**
    - **Description:** Configure grpcui as a web-based UI for testing gRPC services (similar to Swagger UI for REST APIs)
    - **Note:** This is a shared task with Chinese flashcards - grpcui will test both services
    - **Dependencies:**
        - ✅ Requires "Setup Service-Level gRPC Server" task to be completed (GrpcServer running on port 8080)
        - ✅ gRPC Server Reflection must be enabled (handled in GrpcServer setup)
        - ❌ French Flash Card gRPC service must be implemented
        - ✅ Protobuf definitions must be finalized
    - **Purpose:**
        - Provide interactive web interface for testing gRPC methods
        - Auto-discover services via gRPC Server Reflection
        - Replace Swagger/OpenAPI for gRPC-based APIs
        - Enable manual testing during development
    - **Subtasks:**
        - ❌ **Install grpcui** (if not already done)
            - Install grpcui tool (Go-based utility)
            - Document installation instructions in README
            - Verify grpcui can connect to gRPC server
        - ❌ **Test grpcui with French FlashCard service**
            - Verify all RPC methods appear in grpcui
            - Test calling methods through web interface
            - Validate request/response handling
            - Verify both Chinese and French services appear together
    - **Date:** November 13, 2025

### Frontend Development

- ❌ **Create gRPC-Web Service Layer for French Flash Cards**
    - **Description:** Implement gRPC-Web client for French flashcard API calls using Google's grpc-web library with TypeScript
    - **Branch:** `french-flash-card`
    - **Approach:** Follow same pattern as Chinese flashcard gRPC-Web service
    - **Architecture:** Browser → gRPC-Web (HTTP/1.1) → Armeria (native gRPC-Web support) → gRPC Server (port 8080)

    - **Subtasks:**
        - ❌ **Generate gRPC-Web TypeScript client stubs for French**
            - Run `npm run generate:grpc-web` after protobuf is created
            - Verify generated files in `src/types/grpc-web/`:
                - `french_flashcard_pb.js` (message types)
                - `french_flashcard_pb.d.ts` (TypeScript definitions)
                - `French_flashcardServiceClientPb.ts` (service client)

        - ❌ **Implement frenchFlashcardGrpcService.ts**
            - **File:** `frontend/src/services/frenchFlashcardGrpcService.ts`
            - **Implementation:**
                - Import generated `FrenchFlashCardServiceClient`
                - Create client instance pointing to `GRPC_SERVER_URL`
                - Implement 5 wrapper functions (all wrapped with `withErrorHandling()`):
                    1. `getAllFlashcards(page: number, pageSize: number)` - Returns Promise<GetFrenchFlashCardsResponse>
                    2. `getFlashcardById(id: number)` - Returns Promise<GetFrenchFlashCardResponse>
                    3. `createFlashcard(data)` - Returns Promise<CreateFrenchFlashCardResponse>
                    4. `updateFlashcard(id: number, data)` - Returns Promise<UpdateFrenchFlashCardResponse>
                    5. `deleteFlashcard(id: number)` - Returns Promise<DeleteFrenchFlashCardResponse>
                - Handle gRPC errors with proper StatusCode mapping
                - Export typed functions for components to use

    - **Requirements:**
        - ❌ Use same `grpcService.ts` helper for error handling
        - ❌ Use same environment variable (`REACT_APP_GRPC_URL`)
        - ❌ Type-safe with generated protobuf types
        - ❌ Error handling with proper TypeScript error types (RpcError, StatusCode)
        - ❌ Follow exact same pattern as `chineseFlashcardGrpcService.ts`

    - **Date:** November 17, 2025

- ❌ **Create French Flash Card UI Components**
    - **Description:** Build React components for displaying and interacting with French flashcards
    - **Branch:** `french-flash-card`
    - **Components to create:**
        - ❌ `FrenchCard.tsx` - French-specific card layout (similar to ChineseCard.tsx)
        - ❌ `FrenchVocabCollection.tsx` - Collection management component (similar to ChineseVocabCollection.tsx)
    - **Features to implement:**
        - ❌ Card flip animation (double-click to flip)
        - ❌ Display pronunciation guide on card back
        - ❌ Optional image display on card front
        - ❌ Responsive design with configurable dimensions
        - ❌ Drag to reorder cards in stack
        - ❌ Random rotation for natural card stack appearance
        - ❌ Add, edit, and delete vocabulary with UI feedback
        - ❌ Animated vocabulary list with gradients
    - **Reuse existing components:**
        - ✅ `FlashCard.tsx` - Main wrapper component (already exists)
        - ✅ `Card.tsx` - Base card component with flip animation (already exists)
        - ✅ `CardStack.tsx` - Stack container with drag functionality (already exists)
    - **Date:** November 17, 2025

- ❌ **Integrate French Flash Card UI with gRPC-Web Service**
    - **Description:** Connect French flashcard UI with gRPC-Web service using a clean Data Layer architecture
    - **Branch:** `french-flashcard-grpc-integration`
    - **Architecture Decision:** Create a **Data Layer** (`frenchCardData.ts`) that handles all data operations and protobuf mapping
    - **Architecture Pattern:**
        ```
        frenchCardData.ts (Data Layer)
          ├── Fetches data from gRPC service
          ├── Maps protobuf responses to FrenchCardData
          ├── Provides clean CRUD interface
          └── Exports typed functions

        FrenchVocabCollection.tsx (UI Component)
          ├── Calls data layer functions
          ├── Manages UI state only
          └── Renders UI (no gRPC/protobuf knowledge)
        ```
    - **Subtasks:**
        - ❌ **Create Data Layer (`frenchCardData.ts`)**
            - **File:** `frontend/src/data/frenchCardData.ts`
            - **Implementation:**
                - Import gRPC service functions
                - Create `fetchFrenchCards()` async function
                - Create `addFrenchCard()` async function
                - Create `updateFrenchCard()` async function
                - Create `deleteFrenchCard()` async function
                - Create `shuffleFrenchCards()` function (Fisher-Yates algorithm)
                - Map protobuf FrenchFlashCard to FrenchCardData type
                - Handle errors and provide user-friendly messages
        - ❌ **Implement CRUD operations in FrenchVocabCollection**
            - **File:** `frontend/src/Pages/FlashCard/VocabCollections/FrenchVocabCollection.tsx`
            - Import data layer functions
            - Implement `handleAddVocab()` using `addFrenchCard()`
            - Implement `handleEditVocab()` using `updateFrenchCard()`
            - Implement `handleDeleteVocab()` using `deleteFrenchCard()`
            - Implement `handleShuffle()` using `shuffleFrenchCards()`
            - Add loading states during API calls
            - Add error banner for failed operations
        - ❌ **Update FlashCardPage to support French cards**
            - Add language selector or separate route for French flashcards
            - Conditionally render ChineseVocabCollection or FrenchVocabCollection
    - **Requirements:**
        - ❌ All flashcard operations (Create, Read, Update, Delete) use data layer
        - ❌ Data layer handles all gRPC communication and protobuf mapping
        - ❌ UI components only work with `FrenchCardData` type
        - ❌ Proper error handling with user-friendly messages
        - ❌ Loading states during API calls
        - ❌ Data persists to backend (Firestore or mock data)
    - **Date:** November 17, 2025

- ❌ **Add Shuffle Deck Feature for French Cards**
    - **Description:** Implement shuffle functionality for French flashcards
    - **Note:** Same implementation as Chinese shuffle, but for French cards
    - **Subtasks:**
        - ❌ Add `shuffleFrenchCards()` to data layer
        - ❌ Implement shuffle handler in FrenchVocabCollection
        - ❌ Add shuffle button to UI
        - ❌ Connect shuffle button to data layer
        - ❌ Add visual feedback
    - **Date:** November 17, 2025

- ❌ **Direct Firestore Integration (Frontend-only Alternative)**
    - **Description:** Enable frontend to communicate directly with Firestore for French flashcards, bypassing the Java backend
    - **Branch:** `french-flashcard-firestore-direct`
    - **Purpose:** Same as Chinese flashcard direct integration - reduce backend dependency, faster iteration, lower latency
    - **Architecture:** Browser → Firebase SDK → Firestore (direct connection)
    - **Dependencies:**
        - ✅ Firebase SDK installed (shared with Chinese flashcards)
        - ✅ Firebase project configured
        - ❌ Firestore security rules for `french_flashcards` collection
    - **Subtasks:**
        - ❌ **Configure Firestore Security Rules for French Flashcards**
            - Add rules for `french_flashcards` collection
            - Validate required fields (frenchWord, englishWord, pronunciation)
            - Follow same pattern as Chinese flashcard rules
        
        - ❌ **Create Firestore Data Service**
            - **File:** `frontend/src/services/frenchFlashcardFirestoreService.ts`
            - Follow same pattern as `chineseFlashcardFirestoreService.ts`
            - Collection reference: `collection(firestore, 'french_flashcards')`
            - Implement CRUD methods for French flashcards
            - Use Firestore converters for FrenchCardData type
        
        - ❌ **Update Data Layer**
            - **File:** `frontend/src/data/frenchCardData.ts`
            - Import Firestore service
            - Map Firestore documents to FrenchCardData
            - Support feature flag to switch between gRPC and Firestore
        
        - ❌ **Add Real-time Updates (Optional)**
            - Use Firestore's `onSnapshot()` for real-time listeners
            - Implement in `FrenchVocabCollection.tsx`
        
        - ❌ **Update Documentation**
            - Document French flashcard Firestore setup
            - Add to Firebase security rules documentation
    
    - **Requirements:**
        - ❌ Firestore security rules for `french_flashcards` collection
        - ❌ All CRUD operations work with Firestore
        - ❌ Same features as Chinese flashcard implementation
    
    - **Note:** This task can reuse most of the Firebase infrastructure from Chinese flashcards. Only need to create French-specific service and update data layer.
    
    - **Date:** November 17, 2025

### Testing

- ❌ **Create Frontend Unit Tests for French Flash Cards**
    - **Description:** Write Jest/React Testing Library tests for French flashcard components
    - **Branch:** `<branch-name>`
    - **Test Coverage:**
        - ❌ Test FrenchCard component (render, flip animation, data display)
        - ❌ Test FrenchVocabCollection component (CRUD operations, error handling)
        - ❌ Test data layer functions (fetch, add, update, delete, shuffle)
        - ❌ Test API service layer (mock gRPC calls)
        - ❌ Test error states and loading states
    - **Requirements:**
        - ❌ Use React Testing Library best practices
        - ❌ Mock gRPC service appropriately
        - ❌ Test user interactions and events
        - ❌ Achieve >70% component coverage
    - **Date:** November 17, 2025

---

## Summary

**Completed Tasks:** None (all tasks depend on Chinese flashcard infrastructure which is complete)

**In Progress:** None

**Not Started:** All tasks (Protocol Buffers, Backend API, Frontend gRPC Service, UI Components, Integration, Testing)

**Next Steps:**
1. Create French flashcard protobuf definition
2. Implement French Flash Card gRPC API (backend)
3. Generate gRPC-Web client stubs for frontend
4. Create French flashcard UI components
5. Integrate with gRPC-Web service using data layer pattern
6. Add shuffle feature
7. Create comprehensive unit tests

**Dependencies:**
- ✅ GrpcServer infrastructure ready (shared with Chinese flashcards)
- ✅ FirestoreService layer ready (shared with Chinese flashcards)
- ✅ Frontend gRPC-Web infrastructure ready
- ✅ UI component library ready (Card, CardStack, FlashCard components)
- ✅ Data layer pattern established (can follow Chinese flashcard example)
