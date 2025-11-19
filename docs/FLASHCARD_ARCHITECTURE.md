# Flashcard Feature Architecture

**Last Updated**: November 19, 2025
**Status**: Production Ready
**Architecture**: Serverless (Frontend + Firestore)

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture Diagram](#architecture-diagram)
3. [Technology Stack](#technology-stack)
4. [Frontend Architecture](#frontend-architecture)
5. [Data Flow](#data-flow)
6. [Data Model](#data-model)
7. [Error Handling](#error-handling)
8. [Testing Strategy](#testing-strategy)
9. [Development Workflow](#development-workflow)
10. [Future Enhancements](#future-enhancements)

---

## Overview

The Flashcard feature is a multi-language vocabulary learning application that allows users to create, manage, and study flashcards across different languages. While the initial implementation focuses on Chinese language learning, the architecture is designed with **language-agnostic components** that can be reused for other languages (Spanish, French, Japanese, etc.).

The feature uses a serverless architecture where the React frontend communicates directly with Firebase Firestore via a clean Data Layer pattern.

**Key Features**:
- ✅ Create, Read, Update, Delete (CRUD) flashcards
- ✅ Interactive card flipping animations
- ✅ Language-specific features (e.g., Pinyin for Chinese)
- ✅ Optional image support
- ✅ Real-time data persistence with Firestore
- ✅ Clean Data Layer pattern for separation of concerns
- ✅ **Reusable component architecture** for multi-language support

**Design Philosophy**:
- **Generic Core Components**: UI components like `CardStack` and card flipping logic are language-independent
- **Language-Specific Implementations**: Language-specific components (e.g., `ChineseCard`) extend the core functionality
- **Scalable Data Model**: Protobuf definitions can be extended for additional languages while maintaining type safety

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
│  │ - Provides clean CRUD interface                             │  │
│  │ - Handles business logic (default values, validation)       │  │
│  │ - Maps Firestore documents ↔ Application types              │  │
│  └──────────────┬───────────────────────────────────────────────┘  │
│                 │ Calls Generic Service                             │
│                 ↓                                                   │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ FirestoreService (Generic)                                   │  │
│  │ - createDocument(collection, data)                           │  │
│  │ - getAllDocuments(collection)                                │  │
│  │ - updateDocument(collection, id, data)                       │  │
│  │ - deleteDocument(collection, id)                             │  │
│  │                                                              │  │
│  │ Responsibilities:                                            │  │
│  │ - Wraps Firebase SDK                                         │  │
│  │ - Handles error formatting                                   │  │
│  │ - Manages timestamps                                         │  │
│  └──────────────┬───────────────────────────────────────────────┘  │
│                 │                                                   │
└─────────────────┼───────────────────────────────────────────────────┘
                  │ Firebase SDK (HTTPS / WebSockets)
                  ↓
┌─────────────────────────────────────────────────────────────────────┐
│                 CLOUD INFRASTRUCTURE (Firebase)                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ Cloud Firestore (NoSQL Database)                             │  │
│  │ - Collection: chinese_flash_cards                            │  │
│  │ - Real-time updates                                          │  │
│  │ - Automatic scaling                                          │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Frontend
- **Language**: TypeScript
- **Framework**: React 18
- **Build Tool**: Vite
- **State Management**: React Hooks (useState, useEffect)
- **Animation**: Framer Motion
- **Styling**: CSS Modules / Tailwind

### Backend / Database (Serverless)
- **Platform**: Firebase
- **Database**: Cloud Firestore (NoSQL)
- **SDK**: Firebase JS SDK v9 (Modular)

---

## Frontend Architecture

### 1. Data Layer Pattern

The application uses a **Data Layer** pattern to separate database logic from UI logic. This ensures that components remain pure and focused on presentation, while data operations are encapsulated in dedicated modules.

### 2. Data Layer (`src/data/chineseCardData.ts`)

This module is the single source of truth for Chinese Flashcard operations.

**Key Functions**:
- `fetchChineseCards()`: Retrieves all cards.
- `addChineseCard(data)`: Creates a new card with default fields (e.g., `isSelected: true`).
- `updateChineseCard(id, data)`: Updates specific fields; handles special logic like deleting optional fields.
- `deleteChineseCard(id)`: Removes a card.

**TypeScript Interface**:
```typescript
export interface ChineseCardData {
  id: string;
  chineseWord: string;
  englishWord: string;
  pinyin: string;
  img?: string;
  exampleUsage?: string;
  isSelected?: boolean;
  createdAt?: number;
  updatedAt?: number;
}
```

### 3. Firestore Service (`src/services/firestoreService.ts`)

A generic wrapper around the Firebase SDK that provides consistent error handling and typing for all collections in the application.

**Features**:
- **Type Safety**: Uses generics (`<T>`) to ensure return types match expected interfaces.
- **Timestamp Management**: Automatically adds `createdAt` and `updatedAt` timestamps.
- **Error Handling**: Catches SDK errors and formats them for the UI.

### 4. Component Reusability for Multi-Language Support

The architecture is designed to maximize code reuse across different language implementations:

**Reusable Components** (Language-Agnostic):
- `CardStack.tsx`: Manages card display, drag interactions, and stacking logic
- `FlashCardPage.tsx`: Page layout and navigation
- Generic animation utilities (Framer Motion configurations)
- `FirestoreService`: Generic database operations

**Language-Specific Components**:
- `ChineseCard.tsx`: Displays Chinese-specific fields (pinyin, Chinese characters)
- `ChineseVocabCollection.tsx`: Form validation for Chinese vocabulary
- `chineseCardData.ts`: Data layer with Chinese-specific business logic

**Extension Pattern for New Languages**:
To add a new language (e.g., Spanish):
1. Define a new Protobuf message (e.g., `SpanishFlashCard`) in `proto/spanish_card.proto`
2. Create a language-specific card component (e.g., `SpanishCard.tsx`)
3. Create a data layer module (e.g., `spanishCardData.ts`) using the same pattern as `chineseCardData.ts`
4. Reuse `CardStack`, `FlashCardPage`, and `FirestoreService` without modification
5. Add a new Firestore collection (e.g., `spanish_flash_cards`)

This pattern ensures:
- **Consistency**: All languages use the same core UI/UX
- **Maintainability**: Bug fixes to core components benefit all languages
- **Scalability**: Adding new languages requires minimal code duplication

---

## Data Flow

### CREATE Flow (Add New Flashcard)

1. **UI**: User submits form in `ChineseVocabCollection`.
2. **Data Layer**: `addChineseCard(data)` is called.
   - Cleans data (removes undefined).
   - Sets defaults (e.g., `isSelected = true`).
3. **Service**: `createDocument('chinese_flash_cards', cleanData)` is called.
   - Adds timestamps.
   - Generates unique ID.
   - Writes to Firestore.
4. **Update**: Returns the created object; UI updates local state.

### READ Flow (Fetch All Flashcards)

1. **UI**: Component mounts and calls `fetchChineseCards()`.
2. **Data Layer**: Calls `getAllDocuments('chinese_flash_cards')`.
3. **Service**: Queries Firestore collection.
4. **Update**: Returns array of `ChineseCardData`; UI renders `CardStack`.

### UPDATE Flow (Edit Flashcard)

1. **UI**: User edits a card.
2. **Data Layer**: `updateChineseCard(id, changes)` is called.
   - Checks for fields that need deletion (e.g., empty `exampleUsage`).
   - Uses `deleteField()` for field removal.
3. **Service**: `updateDocument(...)` writes changes to Firestore.
   - Updates `updatedAt`.
4. **Update**: UI reflects changes immediately.

---

## Data Model

The data model is defined by the Protocol Buffer file `proto/chinese_card.proto`, which serves as the single source of truth for the schema.

**Source of Truth**: `proto/chinese_card.proto`

```protobuf
message ChineseFlashCard {
  int64 id = 1;                    // Unique identifier
  string chinese_word = 2;         // Chinese characters
  string english_word = 3;         // English translation
  string pinyin = 4;               // Romanized pronunciation
  string img = 5;                  // Optional image URL
  int64 created_at = 6;            // Unix timestamp
  int64 updated_at = 7;            // Unix timestamp
  string example_usage = 8;        // Optional example sentence
}
```

**Firestore Mapping**:
The application maps these Protobuf fields to Firestore document fields (camelCase):

| Protobuf Field | Firestore Field | Type | Notes |
|---|---|---|---|
| `id` | `id` | string | Auto-generated by Firestore |
| `chinese_word` | `chineseWord` | string | |
| `english_word` | `englishWord` | string | |
| `pinyin` | `pinyin` | string | |
| `img` | `img` | string | Optional |
| `example_usage` | `exampleUsage` | string | Optional |
| `created_at` | `createdAt` | number | Timestamp |
| `updated_at` | `updatedAt` | number | Timestamp |
| - | `isSelected` | boolean | UI-specific state (not in Proto) |

**Collection**: `chinese_flash_cards`

---

## Error Handling

Errors are handled at the Service layer and propagated to the UI.

**Strategy**:
1. **Firestore SDK**: Throws network or permission errors.
2. **Service Layer**: Catches errors, logs them to console, and re-throws or formats them.
3. **UI Layer**: Components wrap async calls in `try/catch` blocks and display user-friendly error messages (e.g., using an error banner).

---

## Testing Strategy

### Unit Tests (Planned)
- **Components**: To be implemented. Will test rendering and user interactions.
- **Data Layer**: To be implemented. Will mock `firestoreService` to test business logic.

---

## Development Workflow

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   - Starts Vite server on `localhost:5173` (or similar).

3. **Environment Setup**:
   - Ensure `.env` contains valid Firebase configuration keys.

---

## Future Enhancements

### Multi-Language Expansion
- **Spanish Flashcards**: Implement using the same component architecture pattern
- **Japanese Flashcards**: Add support for Kanji, Hiragana, Katakana fields
- **French/German/Other Languages**: Leverage reusable components for rapid implementation
- **Language Switcher**: UI to toggle between different language flashcard collections

### Feature Enhancements
- **Authentication**: Integrate Firebase Auth to support per-user flashcard collections
- **Spaced Repetition**: Implement an algorithm (like SM-2) to schedule card reviews based on user performance
- **Audio Pronunciation**: Add text-to-speech or audio file support for pronunciation practice
- **Progress Tracking**: Analytics dashboard showing learning progress per language
