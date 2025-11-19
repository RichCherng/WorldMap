# Chinese Sentence Flash Card Feature - Technical Documentation

## Overview

The Chinese Sentence Flash Card feature extends the existing vocabulary flashcard system to support full sentences. This allows users to study Chinese sentence structure, grammar, and context in addition to individual words.

## Architecture

The feature follows the same architecture as the Chinese Vocabulary Flash Cards:

1.  **Frontend**: React components interacting with a Data Layer.
2.  **Data Layer**: Abstraction for data operations, currently using direct Firestore integration but designed for future gRPC migration.
3.  **Backend**: gRPC services (planned/future) and Firestore for persistence.

### Data Flow (Current Implementation)

```
UI Components (ChineseSentenceVocabCollection)
       ↓
Data Layer (chineseSentenceCardData.ts)
       ↓
Firestore Service (frontend/src/services/firestoreService.ts)
       ↓
Firebase Firestore (Collection: chinese_sentence_cards)
```

## Protocol Buffers

The implementation uses **direct Firestore access** from the frontend (no gRPC). Protocol Buffers are maintained only for documentation and type generation purposes.

### Proto Definition

**File**: `proto/chinese_sentence_card.proto`

```protobuf
syntax = "proto3";

package worldmap.flashcard;

option java_multiple_files = true;
option java_package = "com.worldmap.flashcard";

// Chinese Sentence FlashCard message
// Note: This feature uses direct Firestore communication from the frontend,
// not gRPC. This proto definition is maintained for:
// - Documentation of the data structure
// - Type generation for TypeScript/Java
// - Potential future backend integration
message ChineseSentenceCard {
  string id = 1;
  string chineseSentence = 2;
  string pinyin = 3;
  string englishTranslation = 4;
  string collectionId = 5;
  string difficulty = 6; // "beginner", "intermediate", "advanced"
  string grammarNotes = 7;
  string audioUrl = 8;
  int64 createdAt = 9;
  int64 updatedAt = 10;
}
```

**Note**: Request/response messages and gRPC service definitions have been removed as they are not needed for the direct Firestore implementation.

## Data Model

The frontend TypeScript interface mirrors the protobuf definition:

```typescript
export interface ChineseSentenceCardData {
  id: string;
  chineseSentence: string;
  pinyin: string;
  englishTranslation: string;
  collectionId?: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
  grammarNotes?: string;
  audioUrl?: string;
  createdAt?: number;
  updatedAt?: number;
}
```

## Implementation Details

### Firestore Collection

- **Name**: `chinese_sentence_cards`
- **Document ID**: Auto-generated string or timestamp-based ID.

### Frontend Components

- `ChineseSentenceCard.tsx`: Display component.
- `ChineseSentenceVocabCollection.tsx`: Management interface.

