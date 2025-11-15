# Flash Card Feature Tasks

**Description:** Building a Chinese Flash Card learning feature with full-stack implementation including backend APIs, Firebase integration, frontend UI, and comprehensive testing.

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
    - **Description:** Implement RESTful API endpoints for flashcard CRUD operations with Firebase/Firestore integration
    - **Branch:** `<branch-name>`
    
    - ❌ **Chinese Flash Card API**
        - **Endpoints to implement:**
            - ❌ `GET /api/flashcards/chinese` - Get all flashcards with pagination (page, pageSize)
            - ❌ `GET /api/flashcards/chinese/{id}` - Get single flashcard by ID
            - ❌ `POST /api/flashcards/chinese` - Create new flashcard (validate: chineseWord, englishWord, pinyin required)
            - ❌ `PUT /api/flashcards/chinese/{id}` - Update existing flashcard
            - ❌ `DELETE /api/flashcards/chinese/{id}` - Delete flashcard
            - ❌ `POST /api/flashcards/chinese/initialize` - Initialize Firebase with default data
        - **Data Model:** ChineseFlashCard (id, chineseWord, englishWord, pinyin, img?)
        - **Requirements:**
            - ❌ Connect to Firebase/Firestore successfully (collection: "chinese_flashcards")
            - ❌ Implement proper error handling and validation
            - ❌ Return standardized JSON responses with success/error structure
            - ❌ Support mock data fallback when Firebase not configured
            - ❌ Use Guice dependency injection for service layer
            - ❌ Use protobuf-generated classes for data model
    
    - ❌ **French Flash Card API**
        - **Endpoints to implement:**
            - ❌ `GET /api/flashcards/french` - Get all flashcards with pagination (page, pageSize)
            - ❌ `GET /api/flashcards/french/{id}` - Get single flashcard by ID
            - ❌ `POST /api/flashcards/french` - Create new flashcard (validate: frenchWord, englishWord, pronunciation required)
            - ❌ `PUT /api/flashcards/french/{id}` - Update existing flashcard
            - ❌ `DELETE /api/flashcards/french/{id}` - Delete flashcard
            - ❌ `POST /api/flashcards/french/initialize` - Initialize Firebase with default data
        - **Data Model:** FrenchFlashCard (id, frenchWord, englishWord, pronunciation, img?)
        - **Requirements:**
            - ❌ Connect to Firebase/Firestore successfully (collection: "french_flashcards")
            - ❌ Implement proper error handling and validation
            - ❌ Return standardized JSON responses with success/error structure
            - ❌ Support mock data fallback when Firebase not configured
            - ❌ Use Guice dependency injection for service layer
            - ❌ Use protobuf-generated classes for data model
    
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

- ❌ **Create API Service Layer for Frontend**
    - **Description:** Create TypeScript service functions for all flashcard API calls
    - **Branch:** `<branch-name>`
    - **Services to implement:**
        - ❌ `flashcardService.ts` - API client functions
            - ❌ `getAllFlashcards(page, pageSize)` - Fetch all cards
            - ❌ `getFlashcardById(id)` - Fetch single card
            - ❌ `createFlashcard(data)` - Create new card
            - ❌ `updateFlashcard(id, data)` - Update card
            - ❌ `deleteFlashcard(id)` - Delete card
            - ❌ `initializeFlashcards()` - Initialize with default data
        - ❌ Error handling and response parsing
        - ❌ TypeScript interfaces matching backend data model
    - **Requirements:**
        - ❌ Use fetch or axios consistently
        - ❌ Handle network errors and API errors
        - ❌ Type-safe with proper TypeScript types
        - ❌ Add request/response interceptors if needed
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

- ❌ **Create Swagger page**
    - **Description:** Set up API documentation using Swagger/OpenAPI
    - **Branch:** `<branch-name>`
    - **Date:** November 13, 2025
