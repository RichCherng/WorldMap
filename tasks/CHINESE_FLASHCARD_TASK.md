# Chinese Flash Card Feature Tasks

**Description:** Building a Chinese Flash Card learning feature with full-stack implementation including backend APIs, Firebase integration, frontend UI, and comprehensive testing.

**Architecture:** gRPC-based API using Protocol Buffers for type-safe communication between frontend (gRPC-Web) and backend (gRPC server)

**Technical Documentation:** [tech_doc/FLASHCARD_FEATURE.md](../tech_doc/FLASHCARD_FEATURE.md) - Comprehensive technical reference including architecture, data flow, API reference, and deployment guide

**Main Branch:** `main`

**Feature Branch:** `FlashCard`

**Language:** Chinese (Mandarin)

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

### Backend Development

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

    - **Implementation Files Created:**
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

        - ✅ **Implement ChineseFlashCardService (Business Logic Layer)**
            - **File:** `src/main/java/com/worldmap/service/ChineseFlashCardService.java`
            - **Purpose:** Business logic, validation, and Firestore integration
            - **Implementation:**
                - Annotate with `@Singleton`
                - Inject `FirestoreService` and `ApplicationConfig` via `@Inject` constructor
                - Collection name: `"chinese_flashcards"` (from ApplicationConfig or constant)
                - Implement 5 business methods returning protobuf response objects
                - Validate required fields (chineseWord, englishWord, pinyin)
                - Use FirestoreService for all CRUD operations
                - Generate unique IDs using `System.currentTimeMillis()` or UUID
                - Set createdAt and updatedAt timestamps
                - Conversion helpers: `toFirestoreDoc()` and `fromFirestoreDoc()`
                - Mock data fallback when Firestore is null
                - Error handling with try-catch and error responses

        - ✅ **Register Service in GrpcModule**
            - **File:** `src/main/java/com/worldmap/guice/modules/GrpcModule.java`
            - Multibinder registration for ChineseFlashCardGrpcService
            - GrpcServer automatically registers and serves this service

        - ✅ **Create Unit Tests**
            - **File:** `src/test/java/com/worldmap/service/ChineseFlashCardServiceTest.java`
            - **Test Coverage:** 21 tests passed (>80% code coverage)
                - Test `create()` - success, validation errors, Firestore errors
                - Test `getAll()` - with results, empty results, pagination
                - Test `getById()` - found, not found
                - Test `update()` - success, not found, validation errors
                - Test `delete()` - success, not found
                - Test conversion helpers (toFirestoreDoc, fromFirestoreDoc)
                - Test Firestore not configured scenarios
            - **Setup:** Mock FirestoreService using Mockito

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

    - **Date:** November 13, 2025

- ❌ **Migrate Backend to Google Cloud Functions**
    - **Description:** Convert the Java gRPC backend into serverless Google Cloud Functions for improved scalability, reduced costs, and simplified deployment
    - **Branch:** `chinese-flashcard-cloud-functions`
    - **Purpose:**
        - Serverless architecture - no server management
        - Auto-scaling based on demand
        - Pay-per-use pricing (only pay for actual requests)
        - Automatic HTTPS endpoints
        - Built-in load balancing and high availability
        - Easier deployment and CI/CD integration
    - **Architecture:** Frontend → Cloud Functions (HTTP/HTTPS) → Firestore
    - **Trade-offs:**
        - ⚠️ **Cold Start:** First request may be slower (~1-3 seconds)
        - ⚠️ **Stateless:** No in-memory state between requests
        - ⚠️ **Execution Limits:** Max 60 seconds for HTTP functions (9 minutes for background)
        - ✅ **Cost:** Much cheaper for low-medium traffic
        - ✅ **Scalability:** Automatically handles traffic spikes
        - ✅ **Maintenance:** No server patches or upgrades needed
    - **Migration Strategy:** Phased approach - create Cloud Functions alongside existing gRPC server, gradually migrate
    
    - **Subtasks:**
        - ❌ **Setup Google Cloud Project**
            - Create or configure Google Cloud Project
            - Enable Cloud Functions API
            - Enable Cloud Build API (for deployment)
            - Set up billing account
            - Install Google Cloud SDK (`gcloud` CLI)
            - Authenticate: `gcloud auth login`
            - Set project: `gcloud config set project PROJECT_ID`
        
        - ❌ **Design Cloud Functions Architecture**
            - **Option 1: One Function Per Operation** (Recommended)
                - `createChineseFlashcard` - POST /flashcards/chinese
                - `getChineseFlashcards` - GET /flashcards/chinese
                - `getChineseFlashcard` - GET /flashcards/chinese/:id
                - `updateChineseFlashcard` - PUT /flashcards/chinese/:id
                - `deleteChineseFlashcard` - DELETE /flashcards/chinese/:id
                - Benefits: Independent scaling, smaller cold starts, easier debugging
            - **Option 2: Single Function with Routing**
                - One function handles all routes
                - Internal routing based on HTTP method and path
                - Benefits: Simpler deployment, shared code
            - **Recommended:** Option 1 for better scalability and monitoring
        
        - ❌ **Create Cloud Functions (Java 17/21)**
            - **Framework:** Use Cloud Functions Framework for Java
            - **Dependencies:** Add to `pom.xml` or `build.gradle`:
                ```gradle
                dependencies {
                    implementation 'com.google.cloud.functions:functions-framework-api:1.1.0'
                    implementation 'com.google.cloud:google-cloud-firestore:3.25.2'
                    implementation 'com.google.code.gson:gson:2.10.1'
                }
                ```
            - **Implement Each Function:**
                1. **CreateChineseFlashcard:**
                    ```java
                    public class CreateChineseFlashcard implements HttpFunction {
                        private final Firestore firestore;
                        
                        public CreateChineseFlashcard() {
                            this.firestore = FirestoreOptions.getDefaultInstance().getService();
                        }
                        
                        @Override
                        public void service(HttpRequest request, HttpResponse response) {
                            // Parse JSON request body
                            // Validate required fields
                            // Generate ID and timestamps
                            // Save to Firestore
                            // Return JSON response
                        }
                    }
                    ```
                2. **GetChineseFlashcards:** Query Firestore with pagination
                3. **GetChineseFlashcard:** Get single document by ID
                4. **UpdateChineseFlashcard:** Update existing document
                5. **DeleteChineseFlashcard:** Delete document by ID
            - **Validation:** Reuse validation logic from existing `ChineseFlashCardService`
            - **Error Handling:** Return proper HTTP status codes and error messages
            - **CORS:** Configure CORS headers for browser requests
        
        - ❌ **Add Request/Response DTOs**
            - Create POJOs for JSON serialization/deserialization
            - **Request DTOs:**
                - `CreateChineseFlashcardRequest`
                - `UpdateChineseFlashcardRequest`
                - `GetFlashcardsRequest` (query params)
            - **Response DTOs:**
                - `ChineseFlashcardResponse`
                - `FlashcardListResponse` (with pagination)
                - `ErrorResponse`
            - Use Gson or Jackson for JSON mapping
        
        - ❌ **Configure CORS and Security**
            - Add CORS headers to all responses:
                ```java
                response.appendHeader("Access-Control-Allow-Origin", "*");
                response.appendHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
                response.appendHeader("Access-Control-Allow-Headers", "Content-Type");
                ```
            - Handle OPTIONS preflight requests
            - Add authentication (optional):
                - Use Firebase Authentication tokens
                - Verify tokens in Cloud Functions
                - Extract user ID for multi-tenant support
        
        - ❌ **Deploy Cloud Functions**
            - Create deployment script for each function:
                ```bash
                gcloud functions deploy createChineseFlashcard \
                  --gen2 \
                  --runtime=java17 \
                  --region=us-central1 \
                  --source=. \
                  --entry-point=com.worldmap.functions.CreateChineseFlashcard \
                  --trigger-http \
                  --allow-unauthenticated \
                  --set-env-vars GOOGLE_CLOUD_PROJECT=your-project-id
                ```
            - Deploy all 5 functions
            - Note URLs for each function (e.g., `https://us-central1-PROJECT.cloudfunctions.net/createChineseFlashcard`)
            - Test each endpoint with `curl` or Postman
        
        - ❌ **Update Frontend to Use Cloud Functions**
            - **Option 1: Create HTTP service layer**
                - **File:** `frontend/src/services/chineseFlashcardHttpService.ts`
                - Replace gRPC calls with HTTP fetch/axios calls
                - Example:
                    ```typescript
                    export async function createFlashcard(data: CreateFlashcardData) {
                        const response = await fetch(
                            `${CLOUD_FUNCTIONS_URL}/createChineseFlashcard`,
                            {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(data)
                            }
                        );
                        return await response.json();
                    }
                    ```
            - **Option 2: Update data layer with feature flag**
                - Add environment variable: `REACT_APP_USE_CLOUD_FUNCTIONS`
                - Toggle between gRPC, Cloud Functions, or direct Firestore
            - Update all CRUD operations to use HTTP endpoints
        
        - ❌ **Add Monitoring and Logging**
            - Use Google Cloud Logging (automatic for Cloud Functions)
            - Add structured logging:
                ```java
                import java.util.logging.Logger;
                private static final Logger logger = Logger.getLogger(CreateChineseFlashcard.class.getName());
                logger.info("Creating flashcard: " + data.getChineseWord());
                ```
            - Set up Cloud Monitoring dashboards:
                - Request count per function
                - Error rate
                - Latency (p50, p95, p99)
                - Cold start frequency
            - Configure alerts for errors and high latency
        
        - ❌ **Optimize for Cold Starts**
            - Keep functions small and focused
            - Minimize dependencies
            - Use lazy initialization for expensive resources
            - Consider minimum instances (costs more but reduces cold starts):
                ```bash
                gcloud functions deploy FUNCTION_NAME \
                  --min-instances=1  # Keeps 1 instance warm
                ```
            - Implement warmup requests from Cloud Scheduler (optional)
        
        - ❌ **Setup CI/CD Pipeline**
            - Create `cloudbuild.yaml` for automated deployments:
                ```yaml
                steps:
                  - name: 'gradle'
                    args: ['build']
                  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
                    args:
                      - gcloud
                      - functions
                      - deploy
                      - createChineseFlashcard
                      - --source=.
                      - --runtime=java17
                ```
            - Connect to GitHub repository
            - Trigger deployments on push to main branch
            - Add staging environment for testing
        
        - ❌ **Update Documentation**
            - Document Cloud Functions architecture
            - Add deployment instructions
            - Document environment variables and configuration
            - Add troubleshooting guide for common issues
            - Document costs and pricing considerations
            - Add local development/testing guide
    
    - **Requirements:**
        - ❌ Google Cloud Project with billing enabled
        - ❌ All 5 CRUD operations as separate Cloud Functions
        - ❌ Proper CORS configuration for browser requests
        - ❌ JSON request/response format
        - ❌ Error handling with appropriate HTTP status codes
        - ❌ Firestore integration working
        - ❌ Frontend updated to use Cloud Functions
        - ❌ Monitoring and logging configured
    
    - **Optional Enhancements:**
        - ❌ Firebase Authentication integration
        - ❌ Rate limiting with Cloud Armor
        - ❌ Caching with Cloud CDN or Memorystore
        - ❌ API Gateway for unified endpoint
        - ❌ Minimum instances for reduced cold starts
        - ❌ Cloud Scheduler for warmup requests
    
    - **Cost Considerations:**
        - **Pricing:** ~$0.40 per million invocations + compute time
        - **Free Tier:** 2 million invocations/month, 400,000 GB-seconds
        - **Estimate:** For 10,000 requests/day with 200ms avg:
            - Monthly: ~300,000 requests
            - Cost: Free tier covers most usage
            - Likely $0-5/month for small to medium apps
        - **Comparison:** Much cheaper than running a server 24/7
    
    - **When to Use Cloud Functions:**
        - ✅ Variable or unpredictable traffic
        - ✅ Want zero server management
        - ✅ Cost optimization for low-medium traffic
        - ✅ Simple CRUD operations
        - ✅ Event-driven architecture
        - ❌ Need very low latency (cold starts)
        - ❌ Long-running operations (>60 seconds)
        - ❌ High sustained traffic (dedicated server may be cheaper)
    
    - **When to Keep gRPC Backend:**
        - ✅ Need persistent connections
        - ✅ Streaming operations
        - ✅ Complex business logic requiring state
        - ✅ Very high sustained traffic
        - ✅ Microsecond-level latency requirements
    
    - **Migration Path:**
        1. Create Cloud Functions alongside existing gRPC server
        2. Test thoroughly in staging environment
        3. Use feature flag to gradually migrate users
        4. Monitor performance and costs
        5. Eventually deprecate gRPC server (optional)
    
    - **Date:** November 17, 2025

- ❌ **Setup grpcui for API Testing and Documentation**
    - **Description:** Configure grpcui as a web-based UI for testing gRPC services (similar to Swagger UI for REST APIs)
    - **Dependencies:**
        - ✅ Requires "Setup Service-Level gRPC Server" task to be completed (GrpcServer running on port 8080)
        - ✅ gRPC Server Reflection must be enabled (handled in GrpcServer setup)
        - ✅ At least one gRPC service must be implemented (ChineseFlashCardGrpcService)
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

### Frontend Development

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
            - ✅ Output directory: `src/types/grpc-web/`

        - ✅ **Generate gRPC-Web TypeScript client stubs**
            - ✅ Run `npm run generate:grpc-web`
            - ✅ Verify generated files (chinese_card_pb.js, chinese_card_pb.d.ts, Chinese_cardServiceClientPb.ts)
            - ✅ Add generated files to .gitignore (regenerate on build)

        - ✅ **Add gRPC-Web support to Java backend**
            - ✅ Add Armeria gRPC library to build.gradle
            - ✅ Update GrpcServer.java to use Armeria (native gRPC-Web support)
            - ✅ Configure CORS for browser requests
            - ✅ Build successful with new dependencies

        - ✅ **Implement grpcService.ts and chineseFlashcardGrpcService.ts**
            - ✅ Created generic service layer (`src/services/grpcService.ts`)
            - ✅ Created Chinese flashcard service (`src/services/chineseFlashcardGrpcService.ts`)
            - ✅ Created comprehensive README (`src/services/README.md`)
            - ✅ Implemented 5 wrapper functions with error handling
            - ✅ Environment-based configuration (REACT_APP_GRPC_URL)

        - ✅ **Configure gRPC-Web client**
            - ✅ Set base URL via environment variable
            - ✅ Created `.env.development` and `.env.example`
            - ✅ Added global error handling via `withErrorHandling()` wrapper
            - ✅ Error handler provides user-friendly messages based on gRPC StatusCode

    - **Date:** November 14-15, 2025

- ✅ **Create Flash Card UI Components**
    - **Description:** Build React components for displaying and interacting with flashcards
    - **Branch:** `chinese-flash-card`
    - **Components created:**
        - ✅ `FlashCard.tsx` - Main wrapper component
        - ✅ `Card.tsx` - Base card component with flip animation using Framer Motion
        - ✅ `CardStack.tsx` - Stack container with drag functionality
        - ✅ `ChineseCard.tsx` - Chinese-specific card layout
        - ✅ `FlashCardPage.tsx` - Full page implementation
        - ✅ `ChineseVocabCollection.tsx` - Collection management component
    - **Features implemented:**
        - ✅ Card flip animation (double-click to flip, smooth 90-degree transition)
        - ✅ Display pinyin pronunciation on card back
        - ✅ Optional image display on card front
        - ✅ Responsive design with configurable dimensions
        - ✅ Drag to reorder cards in stack
        - ✅ Random rotation for natural card stack appearance
        - ✅ Add and delete vocabulary with UI feedback
        - ✅ Animated vocabulary list with gradients
    - **Date:** November 13, 2025

- ✅ **Integrate Flash Card UI with gRPC-Web Service**
    - **Description:** Replace REST API calls with gRPC-Web service integration using a clean Data Layer architecture for separation of concerns
    - **Branch:** `flashcard-grpc-integration`
    - **Architecture Decision:** Create a **Data Layer** (`chineseCardData.ts`) that handles all data operations (fetch, add, update, delete) and protobuf mapping. UI components (`ChineseVocabCollection`) only handle display and user interactions.
    - **Architecture Pattern:**
        ```
        chineseCardData.ts (Data Layer)
          ├── Fetches data from gRPC service
          ├── Maps protobuf responses to ChineseCardData
          ├── Provides clean CRUD interface
          └── Exports typed functions

        ChineseVocabCollection.tsx (UI Component)
          ├── Calls data layer functions
          ├── Manages UI state only
          └── Renders UI (no gRPC/protobuf knowledge)
        ```
    - **Subtasks:**
        - ✅ **Phase 1: Implement READ operation (Fetch all cards)**
            - ✅ Step 1: Create Data Layer Function (`chineseCardData.ts`)
            - ✅ Step 2: Update UI Component (`ChineseVocabCollection.tsx`)
            - ✅ Step 3: Fix gRPC Dependency Conflicts
                - ✅ Upgraded gRPC dependencies from 1.60.0 to 1.68.1
                - ✅ Upgraded Armeria, Firebase Admin SDK, Google Cloud Firestore
                - ✅ Removed all gRPC exclusions
                - ✅ Server starts successfully, Firestore connection working
        - ✅ **Phase 2: Implement CREATE operation (Add card)**
            - ✅ Step 1: Create Data Layer Function
            - ✅ Step 2: Update UI Component
            - ✅ Added visible error banner UI for failed operations
        - ✅ **Phase 3: Implement UPDATE operation (Edit card)**
            - ✅ Step 1: Create Data Layer Function
            - ✅ Step 2: Update UI Component
        - ✅ **Phase 4: Implement DELETE operation (Remove card)**
            - ✅ Step 1: Create Data Layer Function
            - ✅ Step 2: Update UI Component
        - ✅ **Phase 5: Cleanup and documentation**
            - ✅ Deprecate old service file (chineseCardService.ts)
            - ✅ Update documentation
            - ✅ Final testing
    - **Date:** November 17, 2025

- ❌ **Add Shuffle Deck Feature**
    - **Description:** Implement shuffle functionality to randomize the order of flashcards in the deck
    - **Branch:** `chinese-flash-card` (or create new branch)
    - **Purpose:** Allow users to shuffle cards for better learning by preventing memorization of card order
    - **Architecture:** Shuffle logic lives in data layer (`chineseCardData.ts`) to maintain separation of concerns
    - **Subtasks:**
        - ❌ **Add shuffle function to data layer**
            - **File:** `frontend/src/data/chineseCardData.ts`
            - Create `shuffleChineseCards(cards: ChineseCardData[]): ChineseCardData[]` function
            - Use Fisher-Yates (Knuth) shuffle algorithm for unbiased randomization
            - Function should return a new shuffled array (immutable)
        - ❌ **Update CardStack to accept shuffle prop**
            - **File:** `frontend/src/components/FlashCard/CardStack.tsx`
            - Add optional `onShuffle?: () => void` callback prop
            - Expose shuffle capability without implementing shuffle logic
        - ❌ **Implement shuffle in ChineseVocabCollection**
            - **File:** `frontend/src/Pages/FlashCard/VocabCollections/ChineseVocabCollection.tsx`
            - Import `shuffleChineseCards` from data layer
            - Create `handleShuffle()` function
            - Update local state with shuffled cards
        - ❌ **Add shuffle button to UI**
            - **File:** `frontend/src/Pages/FlashCard/FlashCardPage.tsx`
            - Add shuffle button with icon
            - Position button near the card stack
            - Style button to match existing UI design
        - ❌ **Connect shuffle button to data layer**
            - Pass shuffle handler from ChineseVocabCollection to FlashCardPage
            - Call shuffle function when button is clicked
            - Optional: Add shuffle animation/transition
        - ❌ **Add visual feedback**
            - Show brief animation or toast notification when shuffle occurs
            - Optional: Disable shuffle button temporarily during shuffle animation
    - **Requirements:**
        - ❌ Shuffle logic implemented in data layer (not in UI components)
        - ❌ Shuffle should randomize all cards in the current deck
        - ❌ Shuffle should maintain card data integrity
        - ❌ Shuffle function should be pure (no side effects)
        - ❌ Button should be easily accessible and intuitive
        - ❌ Shuffle should work with any number of cards
        - ❌ Animation should be smooth and not jarring
    - **Date:** November 17, 2025

- ❌ **Direct Firestore Integration (Frontend-only Alternative)**
    - **Description:** Enable frontend to communicate directly with Firestore, bypassing the Java backend for flashcard operations
    - **Branch:** `chinese-flashcard-firestore-direct`
    - **Purpose:**
        - Reduce backend dependency for simple CRUD operations
        - Faster development iteration (no backend deployment needed)
        - Lower latency for database operations
        - Enable offline-first capabilities with Firestore SDK
        - Simplify architecture for MVP/prototyping
    - **Architecture:** Browser → Firebase SDK → Firestore (direct connection)
    - **Trade-offs:**
        - ⚠️ **Security:** Firestore security rules must be carefully configured
        - ⚠️ **Business Logic:** Validation and business rules move to frontend or Firestore rules
        - ⚠️ **Consistency:** No centralized backend for complex operations
        - ✅ **Simplicity:** Fewer moving parts, easier deployment
        - ✅ **Real-time:** Native Firestore real-time listeners
        - ✅ **Offline:** Built-in offline support
    - **Subtasks:**
        - ❌ **Install Firebase SDK**
            - Install `firebase` npm package
            - Configure Firebase in frontend project
            - Create `firebaseConfig.ts` with Firebase project credentials
            - Initialize Firebase app and Firestore instance
            - Document Firebase project setup in README
        
        - ❌ **Configure Firestore Security Rules**
            - Create Firestore security rules for `chinese_flashcards` collection
            - Rules should:
                - Allow authenticated users to read/write their own flashcards
                - Validate required fields (chineseWord, englishWord, pinyin)
                - Prevent malicious data (XSS, injection)
                - Set reasonable size limits
            - Example rules:
                ```javascript
                rules_version = '2';
                service cloud.firestore {
                  match /databases/{database}/documents {
                    match /chinese_flashcards/{cardId} {
                      allow read, write: if request.auth != null;
                      allow create: if request.resource.data.chineseWord is string
                                   && request.resource.data.englishWord is string
                                   && request.resource.data.pinyin is string;
                    }
                  }
                }
                ```
            - Test rules in Firebase Console emulator
            - Document security considerations in README
        
        - ❌ **Create Firestore Data Service**
            - **File:** `frontend/src/services/chineseFlashcardFirestoreService.ts`
            - **Purpose:** Direct Firestore operations using Firebase SDK
            - **Implementation:**
                - Import Firestore from Firebase SDK
                - Collection reference: `collection(firestore, 'chinese_flashcards')`
                - Implement CRUD methods:
                    1. `getAllFlashcards()` - Query all documents, return ChineseCardData[]
                    2. `getFlashcardById(id: string)` - Get single document
                    3. `createFlashcard(data)` - Add document with auto-generated ID
                    4. `updateFlashcard(id: string, data)` - Update existing document
                    5. `deleteFlashcard(id: string)` - Delete document
                - Use Firestore converters for type safety:
                    ```typescript
                    const chineseCardConverter = {
                      toFirestore: (card: ChineseCardData) => ({ ... }),
                      fromFirestore: (snapshot, options) => ({ ... })
                    };
                    ```
                - Handle Firestore-specific errors
                - Add real-time listener option: `onFlashcardsChange(callback)`
        
        - ❌ **Update Data Layer to Use Firestore Service**
            - **File:** `frontend/src/data/chineseCardData.ts`
            - **Option 1:** Replace gRPC service with Firestore service
            - **Option 2:** Add feature flag to switch between gRPC and Firestore
            - **Implementation:**
                - Import Firestore service instead of gRPC service
                - Map Firestore documents to ChineseCardData
                - Handle Firestore timestamps (convert to numbers)
                - Maintain same interface for UI components
            - **Feature Flag Example:**
                ```typescript
                const USE_FIRESTORE_DIRECT = process.env.REACT_APP_USE_FIRESTORE_DIRECT === 'true';
                
                export async function fetchChineseCards(): Promise<ChineseCardData[]> {
                  if (USE_FIRESTORE_DIRECT) {
                    return await firestoreService.getAllFlashcards();
                  } else {
                    return await grpcService.getAllFlashcards();
                  }
                }
                ```
        
        - ❌ **Add Real-time Updates (Optional Enhancement)**
            - Use Firestore's `onSnapshot()` for real-time listeners
            - Update UI automatically when data changes in Firestore
            - Implement in `ChineseVocabCollection.tsx`:
                ```typescript
                useEffect(() => {
                  const unsubscribe = onFlashcardsChange((cards) => {
                    setCards(cards);
                  });
                  return () => unsubscribe();
                }, []);
                ```
            - Handle connection state (online/offline)
            - Show real-time sync indicator in UI
        
        - ❌ **Add Authentication (Optional but Recommended)**
            - Install Firebase Authentication
            - Add sign-in methods (Google, Email/Password, Anonymous)
            - Protect flashcard routes with auth check
            - Associate flashcards with user IDs
            - Update Firestore rules to enforce user ownership:
                ```javascript
                match /chinese_flashcards/{cardId} {
                  allow read, write: if request.auth != null 
                                     && request.auth.uid == resource.data.userId;
                }
                ```
        
        - ❌ **Add Offline Support**
            - Enable Firestore offline persistence:
                ```typescript
                enableIndexedDbPersistence(firestore)
                  .catch((err) => console.error('Offline persistence failed:', err));
                ```
            - Handle offline state in UI
            - Show offline indicator
            - Queue operations when offline
            - Sync when connection restored
        
        - ❌ **Update Documentation**
            - Document Firebase setup steps in README
            - Add environment variables for Firebase config
            - Document Firestore security rules
            - Add troubleshooting guide for Firebase issues
            - Document trade-offs: when to use gRPC vs direct Firestore
            - Create decision matrix for choosing approach
    
    - **Requirements:**
        - ❌ Firebase project created and configured
        - ❌ Firestore security rules properly configured
        - ❌ All CRUD operations work directly with Firestore
        - ❌ Type-safe Firestore converters
        - ❌ Error handling for Firebase-specific errors
        - ❌ Environment variables for Firebase configuration
        - ❌ Documentation for setup and security
    
    - **Optional Enhancements:**
        - ❌ Real-time listeners for live updates
        - ❌ Firebase Authentication integration
        - ❌ Offline persistence enabled
        - ❌ Feature flag to toggle between gRPC and Firestore
    
    - **When to Use This Approach:**
        - ✅ Rapid prototyping or MVP
        - ✅ Simple CRUD operations without complex business logic
        - ✅ Need real-time updates
        - ✅ Want offline-first capabilities
        - ✅ Small team, want to reduce backend maintenance
        - ❌ Complex business logic or validation
        - ❌ Need centralized control and auditing
        - ❌ Multi-service architecture (prefer gRPC for consistency)
    
    - **When to Use gRPC Backend (Current Approach):**
        - ✅ Complex business logic and validation
        - ✅ Centralized control and security
        - ✅ Multi-service architecture
        - ✅ Need server-side processing
        - ✅ Better for production enterprise applications
    
    - **Date:** November 17, 2025

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
        - ❌ **Configure Vite dev server for development**
        - ❌ **Update frontend configuration**
        - ❌ **Document production deployment options**
        - ❌ **Update README.md**
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

---

## Summary

**Completed Tasks:** Protocol Buffers Setup, gRPC Server Setup, Firestore Service Layer, Chinese Flash Card gRPC API, gRPC-Web Service Layer, UI Components, Full gRPC Integration

**In Progress:** None

**Not Started:** grpcui setup, Shuffle Deck Feature, Frontend Hosting Separation, Frontend Unit Tests

**Next Steps:**
1. Set up grpcui for API testing
2. Implement shuffle deck feature
3. Separate frontend hosting from backend
4. Create comprehensive frontend unit tests
