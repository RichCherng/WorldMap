# Flash Card Feature - Overview

**Description:** Multi-language Flash Card learning system with full-stack implementation including backend APIs, Firebase integration, frontend UI, and comprehensive testing.

**Architecture:** gRPC-based API using Protocol Buffers for type-safe communication between frontend (gRPC-Web) and backend (gRPC server)

**Technical Documentation:** [tech_doc/FLASHCARD_FEATURE.md](../tech_doc/FLASHCARD_FEATURE.md) - Comprehensive technical reference including architecture, data flow, API reference, and deployment guide

**Main Branch:** `main`

**Feature Branch:** `FlashCard`

**Branching Strategy:** Each task will be worked on in its own branch and merged into the `FlashCard` feature branch. Once all tasks are complete, the `FlashCard` feature branch will be merged into `main`.

**Date Started:** November 13, 2025

**Status Legend:** ❌ Not Started | 🔄 In Progress | ✅ Completed

---

## Language-Specific Task Files

This feature has been split into language-specific task files for better organization:

- **[Chinese Flash Card Tasks](CHINESE_FLASHCARD_TASK.md)** - 🔄 In Progress
  - Backend API: ✅ Complete
  - Frontend Integration: ✅ Complete
  - Testing: ❌ Pending

- **[French Flash Card Tasks](FRENCH_FLASHCARD_TASK.md)** - ❌ Not Started
  - Can reuse infrastructure from Chinese implementation
  - Follow same patterns and architecture

---

## Shared Infrastructure (Completed)

These components are shared across all language implementations:

### ✅ Service-Level gRPC Server
- **Component:** `GrpcServer` (`src/main/java/com/worldmap/grpc/`)
- **Purpose:** Centralized gRPC server hosting all flashcard services on port 8080
- **Features:**
  - Dynamic service registration via Guice Multibinder
  - gRPC Server Reflection for grpcui support
  - gRPC Health Checking protocol
  - Graceful startup and shutdown
- **Benefits:** All language flashcard APIs share one server instance

### ✅ Firestore Service Layer
- **Component:** `FirestoreService` (`src/main/java/com/worldmap/service/`)
- **Purpose:** Generic Firestore service for common database operations
- **Features:**
  - CRUD operations: create, read, update, delete
  - Pagination and filtering support
  - Connection validation
  - Proper error handling with custom exceptions
- **Benefits:** Reusable across all flashcard types, centralizes database logic

### ✅ Frontend gRPC-Web Infrastructure
- **Location:** `frontend/src/services/`
- **Components:**
  - `grpcService.ts` - Generic error handling and configuration
  - Generated TypeScript client stubs from protobuf
- **Features:**
  - Official `grpc-web` library integration
  - Environment-based configuration (REACT_APP_GRPC_URL)
  - Consistent error handling with user-friendly messages
  - Type-safe API calls with generated protobuf types

### ✅ Reusable UI Components
- **Location:** `frontend/src/components/FlashCard/`
- **Components:**
  - `FlashCard.tsx` - Main wrapper component
  - `Card.tsx` - Base card with flip animation (Framer Motion)
  - `CardStack.tsx` - Stack container with drag functionality
- **Features:**
  - Card flip animation (double-click to flip)
  - Drag to reorder cards
  - Random rotation for natural stack appearance
  - Responsive design

### ✅ Data Layer Pattern
- **Pattern:** Clean separation between data operations and UI components
- **Architecture:**
  ```
  Data Layer (e.g., chineseCardData.ts)
    ├── Fetches data from gRPC service
    ├── Maps protobuf responses to TypeScript types
    ├── Provides clean CRUD interface
    └── Exports typed functions
  
  UI Components (e.g., ChineseVocabCollection.tsx)
    ├── Calls data layer functions
    ├── Manages UI state only
    └── Renders UI (no gRPC/protobuf knowledge)
  ```
- **Benefits:** Single responsibility, easier testing, type safety, reusability

---

## Common Tasks (Applicable to All Languages)

### ❌ Setup grpcui for API Testing
- **Description:** Web-based UI for testing all gRPC services
- **Purpose:** Interactive testing interface (similar to Swagger UI)
- **Status:** Infrastructure ready, needs installation and documentation
- **See:** Both language-specific task files for details

### ❌ Frontend Hosting Separation
- **Description:** Run frontend independently from Java backend
- **Purpose:** Modern SPA architecture with faster development
- **Status:** Not started
- **Applies to:** All flashcard implementations

---

## Architecture Overview

### Backend Data Flow
```
Frontend (gRPC-Web)
    ↓ protobuf request
GrpcServer (port 8080)
    ↓ routes to
LanguageFlashCardGrpcService
    ↓ delegates to
LanguageFlashCardService (business logic + validation)
    ↓ uses
FirestoreService (generic Firestore operations)
    ↓ interacts with
Firestore (language-specific collections)
```

### Frontend Data Flow
```
UI Component (e.g., ChineseVocabCollection)
    ↓ calls
Data Layer (e.g., chineseCardData.ts)
    ↓ uses
gRPC-Web Service (e.g., chineseFlashcardGrpcService.ts)
    ↓ makes request to
Backend gRPC Server (port 8080)
```

---

## Adding a New Language

To add a new language flashcard system:

1. **Create protobuf definition** in `proto/[language]_flashcard.proto`
   - Follow existing pattern (Chinese/French)
   - Define message types and service interface

2. **Generate backend code**: `gradle generateProto`

3. **Implement backend services:**
   - `[Language]FlashCardGrpcService.java` (gRPC layer)
   - `[Language]FlashCardService.java` (business logic)
   - Register in `GrpcModule` via Multibinder

4. **Generate frontend code**: `cd frontend && npm run generate:grpc-web`

5. **Implement frontend services:**
   - `[language]FlashcardGrpcService.ts` (gRPC-Web wrapper)
   - `[language]CardData.ts` (data layer)

6. **Create UI components:**
   - `[Language]Card.tsx` (language-specific card layout)
   - `[Language]VocabCollection.tsx` (collection management)
   - Reuse existing Card, CardStack, FlashCard components

7. **Create unit tests** for both backend and frontend

8. **Update documentation** in README.md and tech docs

---

## References

- **Main Task Overview:** [TASK.md](../TASK.md)
- **Chinese Flashcard Tasks:** [CHINESE_FLASHCARD_TASK.md](CHINESE_FLASHCARD_TASK.md)
- **French Flashcard Tasks:** [FRENCH_FLASHCARD_TASK.md](FRENCH_FLASHCARD_TASK.md)
- **Technical Documentation:** [tech_doc/FLASHCARD_FEATURE.md](../tech_doc/FLASHCARD_FEATURE.md)
- **Guice DI Patterns:** [docs/GUICE_DEPENDENCY_INJECTION.md](../docs/GUICE_DEPENDENCY_INJECTION.md)
- **React Query Migration:** [REACTQUERY_TASK.md](REACTQUERY_TASK.md) (future enhancement)
