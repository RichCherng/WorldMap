# Checkbox Selection Feature for Flashcard Stack (Protobuf-Based)

## Overview
Add checkboxes next to each vocab item in VocabList to control which words are included in the flashcard stack. Selection state will persist in Firestore.

**Architecture Decision**: Use Protocol Buffers as the single source of truth for the data model to enable schema sharing across multiple services (frontend, backend microservices, mobile apps, etc.).

## Architectural Approach

### Why Protobuf?
- **Single Source of Truth**: Proto file defines canonical schema
- **Type Safety**: Generated TypeScript types ensure compile-time safety
- **Schema Sharing**: Same proto can be used by other microservices (Go, Java, Python, etc.)
- **Future-Proof**: Easy to add new services without duplicating data model definitions
- **Flexible Communication**: Use protobuf for types, but keep JSON for data transmission (REST, Firestore)

### Hybrid Architecture
```
Proto Definition (source of truth)
    ↓ (code generation)
TypeScript Proto Types
    ↓ (conversion layer)
Firestore JSON ↔ Component Types
    ↓
UI Components
```

**Key Insight**: Protobuf defines the schema, but data still flows as JSON through Firestore and REST APIs. This gives us the benefits of protobuf (type safety, schema versioning, cross-service compatibility) without requiring gRPC.

---

## Current System Analysis

### Current Data Flow
```
Firestore DB (chinese_flash_cards collection)
    ↓
chineseCardData.ts (Data layer with typed functions)
    ↓
ChineseVocabCollection.tsx (Fetches all cards, manages CRUD)
    ↓
VocabList.tsx (Displays vocab with search/filter/sort)
    ↓
FlashCardPage.tsx (Receives cards via render props)
    ↓
ChineseCardStack → FlashCard → CardStack (Displays flashcards)
```

### Target Data Flow (with Protobuf)
```
Proto Definition (chinese_card.proto)
    ↓ (npm run generate:proto)
Generated TypeScript Types (frontend/src/types/proto/)
    ↓
Conversion Layer (protoConversion.ts)
    ↓
Firestore DB (JSON) ↔ Data Layer (Proto Types)
    ↓
ChineseVocabCollection.tsx (Works with Proto Types)
    ↓
VocabList.tsx (Displays vocab)
    ↓
FlashCardPage.tsx (Receives Proto Types)
    ↓
ChineseCardStack (Uses Proto Types)
```

### Current Protobuf Schema
**File**: `proto/chinese_card.proto`

```protobuf
message ChineseFlashCard {
  int64 id = 1;
  string chinese_word = 2;
  string english_word = 3;
  string pinyin = 4;
  string img = 5;
  int64 created_at = 6;
  int64 updated_at = 7;
  string example_usage = 8;
  // MISSING: bool is_selected = 9;
}
```

### Current TypeScript Interface
**File**: `frontend/src/components/FlashCard/Language/ChineseCard.tsx`

```typescript
export interface ChineseCardData {
  id: string;  // String for Firestore compatibility
  chineseWord: string;
  englishWord: string;
  pinyin: string;
  img?: string;
  createdAt?: number;
  updatedAt?: number;
  exampleUsage?: string;
  isSelected?: boolean;  // Already added, but not in proto
}
```

### Current Behavior
- ALL vocab items automatically become flashcards
- No filtering mechanism between vocab storage and flashcard display
- VocabList has search/sort but doesn't affect flashcard stack
- TypeScript interface is the source of truth (will be replaced by proto)

---

## Implementation Plan

### Phase 1: Protobuf Schema Update

#### 1.1 Update Proto File
**File**: `proto/chinese_card.proto`

**Add to ChineseFlashCard message:**
```protobuf
bool is_selected = 9;  // Track if card is included in flashcard stack (default: true)
```

#### 1.2 Regenerate TypeScript Types
**Command**:
```bash
cd frontend && npm run generate:proto
```

**Generated Files**:
- `frontend/src/types/proto/chinese_flashcard.js` - JavaScript implementation
- `frontend/src/types/proto/chinese_flashcard.d.ts` - TypeScript definitions

**Generated Interface** (IChineseFlashCard):
```typescript
interface IChineseFlashCard {
  id?: (number|Long|null);
  chineseWord?: (string|null);
  englishWord?: (string|null);
  pinyin?: (string|null);
  img?: (string|null);
  createdAt?: (number|Long|null);
  updatedAt?: (number|Long|null);
  exampleUsage?: (string|null);
  isSelected?: (boolean|null);  // NEW
}
```

**Generated Class Methods**:
- `ChineseFlashCard.create(obj)` - Create proto instance
- `ChineseFlashCard.fromObject(obj)` - Convert plain JS object to proto
- `ChineseFlashCard.toObject(proto)` - Convert proto to plain JS object
- `ChineseFlashCard.toJSON()` - Convert to JSON-serializable object
- `ChineseFlashCard.encode/decode` - Binary serialization (not used for Firestore)

---

### Phase 2: Conversion Layer

#### 2.1 Create Protobuf Conversion Utilities
**File**: `frontend/src/utils/protoConversion.ts` (NEW FILE)

**Purpose**: Bridge between protobuf types and Firestore JSON

```typescript
import { worldmap } from '@/types/proto/chinese_flashcard';

/**
 * Protobuf type alias for better ergonomics
 */
export type ChineseCardProto = worldmap.flashcard.ChineseFlashCard;
export type IChineseCardProto = worldmap.flashcard.IChineseFlashCard;

/**
 * Convert Firestore JSON document to Protobuf instance
 *
 * Handles:
 * - Field name conversion (snake_case not needed, Firestore uses camelCase)
 * - Type conversion (string IDs, Long to number)
 * - Default values (missing isSelected = false for backward compatibility)
 */
export function firestoreToProto(data: any): ChineseCardProto {
  return worldmap.flashcard.ChineseFlashCard.fromObject({
    id: parseInt(data.id || '0'),  // Convert string ID to number
    chineseWord: data.chineseWord || '',
    englishWord: data.englishWord || '',
    pinyin: data.pinyin || '',
    img: data.img || '',
    createdAt: data.createdAt || 0,
    updatedAt: data.updatedAt || 0,
    exampleUsage: data.exampleUsage || '',
    isSelected: data.isSelected === true,  // Missing field = false (backward compatible)
  });
}

/**
 * Convert Protobuf instance to Firestore JSON document
 *
 * Handles:
 * - Proto to plain object conversion
 * - Long to Number conversion
 * - String ID conversion
 * - Removing default/empty values
 */
export function protoToFirestore(proto: ChineseCardProto): any {
  const obj = worldmap.flashcard.ChineseFlashCard.toObject(proto, {
    defaults: false,  // Don't include default values
    longs: Number,    // Convert Long to Number
  });

  // Build Firestore-friendly object
  const firestoreData: any = {
    chineseWord: obj.chineseWord,
    englishWord: obj.englishWord,
    pinyin: obj.pinyin,
  };

  // Only include optional fields if they have values
  if (obj.id) {
    firestoreData.id = obj.id.toString();  // Convert number to string for Firestore
  }

  if (obj.img) {
    firestoreData.img = obj.img;
  }

  if (obj.createdAt) {
    firestoreData.createdAt = obj.createdAt;
  }

  if (obj.updatedAt) {
    firestoreData.updatedAt = obj.updatedAt;
  }

  if (obj.exampleUsage) {
    firestoreData.exampleUsage = obj.exampleUsage;
  }

  // Only include isSelected if explicitly set (for backward compatibility)
  if (obj.isSelected === true) {
    firestoreData.isSelected = true;
  }

  return firestoreData;
}

/**
 * Convert array of Firestore documents to array of Proto instances
 */
export function firestoreArrayToProto(dataArray: any[]): ChineseCardProto[] {
  return dataArray.map(firestoreToProto);
}
```

#### 2.2 Why Conversion Layer?
- **Firestore uses JSON** with camelCase field names and string IDs
- **Protobuf uses** type-safe instances with number IDs
- **Conversion layer** handles these differences transparently
- **No gRPC needed**: We're using protobuf for types, not wire format

#### 2.3 Backward Compatibility Strategy
- **Missing `isSelected` field** → Treated as `false` (unselected)
- **`isSelected: true`** → Explicitly selected by user
- **No active migration needed** → Client handles both old and new data
- **Lazy write** → `isSelected` field added only when:
  - Creating new vocab items
  - User toggles checkbox
  - User edits existing vocab item

---

### Phase 3: Migrate Data Layer to Proto Types

#### 3.1 Update Data Layer
**File**: `frontend/src/data/chineseCardData.ts`

**Changes**:
1. Import proto types and conversion utilities
2. Update function signatures to use proto types
3. Use conversion layer for Firestore operations

```typescript
import { worldmap } from '@/types/proto/chinese_flashcard';
import { firestoreToProto, protoToFirestore, ChineseCardProto } from '@/utils/protoConversion';
// ... other imports

/**
 * Fetch all Chinese flashcards from Firestore
 * Returns proto types
 */
export async function fetchChineseCards(): Promise<ChineseCardProto[]> {
  try {
    const response = await getAllDocuments<any>(COLLECTION_NAME, { pageSize: 1000 });
    // Convert Firestore JSON to Proto types
    return response.data.map(firestoreToProto);
  } catch (error) {
    console.error('Data layer: Failed to fetch Chinese cards:', error);
    throw error;
  }
}

/**
 * Add a new Chinese flashcard to Firestore
 * Accepts partial proto data, returns full proto type
 */
export async function addChineseCard(data: {
  chineseWord: string;
  englishWord: string;
  pinyin: string;
  img?: string;
  exampleUsage?: string;
}): Promise<ChineseCardProto> {
  try {
    // Create proto instance with defaults
    const protoCard = worldmap.flashcard.ChineseFlashCard.create({
      chineseWord: data.chineseWord,
      englishWord: data.englishWord,
      pinyin: data.pinyin,
      img: data.img || '',
      exampleUsage: data.exampleUsage || '',
      isSelected: true,  // Default new cards to selected
    });

    // Convert to Firestore JSON
    const firestoreData = protoToFirestore(protoCard);

    // Save to Firestore
    const created = await createDocument<any>(COLLECTION_NAME, firestoreData);

    // Convert back to proto and return
    return firestoreToProto(created);
  } catch (error) {
    console.error('Data layer: Failed to add Chinese card:', error);
    throw error;
  }
}

/**
 * Update an existing Chinese flashcard
 * Accepts partial updates, returns updated proto type
 */
export async function updateChineseCard(
  id: string,
  data: {
    chineseWord?: string;
    englishWord?: string;
    pinyin?: string;
    img?: string;
    exampleUsage?: string;
    isSelected?: boolean;
  }
): Promise<ChineseCardProto> {
  try {
    // Build update data (only include provided fields)
    const cleanData: any = {};

    if (data.chineseWord !== undefined) cleanData.chineseWord = data.chineseWord;
    if (data.englishWord !== undefined) cleanData.englishWord = data.englishWord;
    if (data.pinyin !== undefined) cleanData.pinyin = data.pinyin;
    if (data.img !== undefined) cleanData.img = data.img;
    if (data.exampleUsage !== undefined) {
      cleanData.exampleUsage = data.exampleUsage || deleteField();
    }
    if (data.isSelected !== undefined) cleanData.isSelected = data.isSelected;

    // Update Firestore
    const updated = await updateDocument<any>(COLLECTION_NAME, id, cleanData);

    // Convert to proto and return
    return firestoreToProto(updated);
  } catch (error) {
    console.error('Data layer: Failed to update Chinese card:', error);
    throw error;
  }
}

// ... other functions remain similar
```

#### 3.2 Update Component Interface
**File**: `frontend/src/components/FlashCard/Language/ChineseCard.tsx`

**Options**:
1. **Remove ChineseCardData interface** and use proto types directly
2. **Keep as type alias** for backward compatibility

**Recommended approach** (type alias for smooth transition):
```typescript
import { worldmap } from '@/types/proto/chinese_flashcard';
import { CardData } from "../Card";
import './ChineseCard.css';

// Type alias for backward compatibility
export type ChineseCardData = worldmap.flashcard.IChineseFlashCard;

// Or use the class type directly
export type ChineseCardProto = worldmap.flashcard.ChineseFlashCard;

export default function ChineseCard(data: ChineseCardData): CardData {
  // Component logic remains the same
  // Proto types have same field names (camelCase)
  const front = (
    <div className="chinese-card-front">
      {data.img && <img src={data.img} alt={`card-${data.id}`} className="card-image" />}
      <h2 className="chinese-word">{data.chineseWord}</h2>
    </div>
  );
  // ... rest of component
}
```

---

### Phase 4: UI Components

#### 4.1 Update VocabList Component
**File**: `frontend/src/Pages/FlashCard/VocabCollections/VocabList.tsx`

**Changes**:
1. Update interface to accept proto types (or keep as-is if using type alias)
2. Add new props for selection state
3. Add Checkbox component

```typescript
interface VocabListProps {
  // ... existing props
  selectedItems?: Set<string>;
  onItemToggle?: (itemId: string, selected: boolean) => void;
}

// In the render:
<AnimatedItem ...>
  <div className="flex items-center gap-2">
    <Checkbox
      checked={selectedItems?.has(item.id) ?? true}
      onCheckedChange={(checked) =>
        onItemToggle?.(item.id, checked as boolean)
      }
      onClick={(e) => e.stopPropagation()}
    />
    <EditVocabDialog ... />
  </div>
</AnimatedItem>
```

---

### Phase 5: State Management

#### 5.1 Update ChineseVocabCollection
**File**: `frontend/src/Pages/FlashCard/VocabCollections/ChineseVocabCollection.tsx`

**Changes**:
1. Update to work with proto types
2. Add selection state management
3. Implement toggle handler
4. Filter selected cards

```typescript
import { worldmap } from '@/types/proto/chinese_flashcard';
import { ChineseCardProto } from '@/utils/protoConversion';

const ChineseVocabCollection = () => {
  const [cards, setCards] = useState<ChineseCardProto[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Initialize selection state from cards
  useEffect(() => {
    const initialSelected = new Set(
      cards
        .map(card => worldmap.flashcard.ChineseFlashCard.toObject(card))
        .filter(obj => obj.isSelected !== false)
        .map(obj => obj.id?.toString() || '')
    );
    setSelectedIds(initialSelected);
  }, [cards]);

  // Toggle selection handler
  const handleToggleSelection = async (itemId: string, selected: boolean) => {
    try {
      // Optimistic update
      setSelectedIds(prev => {
        const next = new Set(prev);
        if (selected) {
          next.add(itemId);
        } else {
          next.delete(itemId);
        }
        return next;
      });

      // Update Firestore
      await updateChineseCard(itemId, { isSelected: selected });

      // Refresh cards
      const updatedCards = await fetchChineseCards();
      setCards(updatedCards);
    } catch (err) {
      console.error('Failed to toggle selection:', err);
      // Revert optimistic update
      const revertedCards = await fetchChineseCards();
      setCards(revertedCards);
    }
  };

  // Filter selected cards for flashcard stack
  const selectedCards = cards.filter(card => {
    const obj = worldmap.flashcard.ChineseFlashCard.toObject(card);
    return selectedIds.has(obj.id?.toString() || '');
  });

  // Pass to children via render props
  return children(selectedCards, loading);
};
```

---

### Phase 6: Flashcard Stack Filtering

#### 6.1 Update FlashCardPage
**File**: `frontend/src/Pages/FlashCard/FlashCardPage.tsx`

**Changes**:
- Receive pre-filtered cards from ChineseVocabCollection
- Handle empty state

```typescript
<ChineseVocabCollection>
  {(cards, loading) => {
    if (loading) return <div>Loading...</div>;

    if (cards.length === 0) {
      return (
        <div className="empty-state">
          No cards selected. Please select vocab items to study.
        </div>
      );
    }

    return <ChineseCardStack words={cards} />;
  }}
</ChineseVocabCollection>
```

---

### Phase 7: UI Enhancements

#### 7.1 Selection Counter
Add to VocabCollection or VocabList header:
```typescript
<div className="text-sm text-muted-foreground">
  {selectedItems.size} of {items.length} cards selected for study
</div>
```

#### 7.2 Empty State Handling
Show helpful message when no cards selected

#### 7.3 Bulk Actions (Optional)
Add "Select All" / "Deselect All" buttons

---

## Files to Create/Modify

### New Files
1. ✅ `frontend/src/utils/protoConversion.ts` - Protobuf ↔ Firestore conversion utilities

### Files to Modify
1. ✅ `proto/chinese_card.proto` - Add `isSelected` field (field number 9)
2. ✅ `frontend/src/types/proto/*` - Regenerated automatically via npm script
3. ✅ `frontend/src/data/chineseCardData.ts` - Use proto types, conversion layer
4. ✅ `frontend/src/components/FlashCard/Language/ChineseCard.tsx` - Use proto types (or type alias)
5. ✅ `frontend/src/Pages/FlashCard/VocabCollections/ChineseVocabCollection.tsx` - Proto types + selection state
6. ✅ `frontend/src/Pages/FlashCard/VocabCollections/VocabList.tsx` - Checkbox UI
7. ✅ `frontend/src/Pages/FlashCard/FlashCardPage.tsx` - Handle filtered cards

### Files to Review (May Need Updates)
- Any component that imports `ChineseCardData` type
- Any component that works with Chinese card data

---

## Technical Considerations

### Protobuf + Firestore Integration
- **Storage Format**: Firestore still stores JSON documents
- **Type Safety**: Proto types enforce structure in TypeScript
- **Conversion**: Happens at data layer boundary (transparent to UI)
- **Performance**: No performance impact (conversion is lightweight)

### Field Name Conventions
- **Proto**: Uses snake_case by convention (`is_selected`)
- **Generated TS**: protobufjs generates camelCase (`isSelected`)
- **Firestore**: Uses camelCase (JavaScript convention)
- **Result**: Seamless integration, no manual field name conversion needed

### ID Handling
- **Firestore**: Uses string IDs (document IDs)
- **Proto**: Defines int64 id
- **Conversion**: String ↔ Number conversion in conversion layer
- **Trade-off**: Keep Firestore string IDs, convert for proto compatibility

### Type Conversion
- **Long Type**: Proto int64 → JavaScript Long object → Number
- **Optional Fields**: Proto optional → TypeScript optional (`?`)
- **Default Values**: Proto defaults (0, "", false) → Firestore undefined/null

### Performance
- **Optimistic Updates**: UI updates immediately before Firestore sync
- **Conversion Overhead**: Minimal (<1ms per card)
- **Client-Side Filtering**: Works well for <1000 items

### Error Handling
- Firestore errors: Revert optimistic updates
- Conversion errors: Log and show user-friendly message
- Migration errors: Don't block app, log warnings

---

## Benefits of Protobuf Approach

### Immediate Benefits
1. **Type Safety**: Compile-time checking for all card data
2. **Single Source of Truth**: Proto file is the canonical schema
3. **Documentation**: Proto file serves as living documentation
4. **Versioning**: Proto supports field numbering for backward compatibility

### Future Benefits
1. **Microservices**: Other services can import same proto file
2. **Code Generation**: Generate types for Go, Java, Python, etc.
3. **API Consistency**: REST APIs can return JSON matching proto schema
4. **Schema Evolution**: Add fields without breaking existing code (proto3 guarantees)
5. **Mobile Apps**: Share schema with iOS/Android apps

### No Downsides
- **No gRPC required**: Still use REST/JSON for communication
- **No Firestore changes**: Still store JSON documents
- **No performance cost**: Lightweight conversion
- **No complexity**: Conversion layer is simple and transparent

---

## Migration Strategy

### Backward Compatibility (No Active Migration)
- **Missing `isSelected` field** → Treated as `false` (unselected)
- **Client handles both cases**: Old data (no field) and new data (has field)
- **Lazy write approach**: `isSelected` added to Firestore only when:
  - User creates new vocab item (defaults to `true`)
  - User toggles checkbox (writes `true` or removes field for `false`)
  - User edits existing vocab item (preserves current selection)
- **User Experience**: Existing vocab appears unselected initially, user chooses what to study

### Rollout Plan
1. **Phase 1**: Update proto, regenerate types
2. **Phase 2**: Add conversion layer (backward compatible)
3. **Phase 3**: Migrate data layer to proto types
4. **Phase 4**: Add checkbox UI (new feature)
5. **Phase 5**: Users select vocab items, `isSelected` written to Firestore

### Rollback Plan
- Keep old TypeScript interface as type alias during transition
- If issues arise, can temporarily revert to direct Firestore access
- Proto types are additive (don't break existing code)

---

## Testing Checklist

### Protobuf Integration Tests
- [ ] Proto code generation works (`npm run generate:proto`)
- [ ] Conversion functions work correctly (firestoreToProto, protoToFirestore)
- [ ] Field names match between proto and Firestore
- [ ] Default values handled correctly
- [ ] ID conversion works (string ↔ number)

### Unit Tests
- [ ] VocabList renders checkboxes correctly
- [ ] Checkbox state reflects `selectedItems` prop
- [ ] `onItemToggle` called with correct parameters
- [ ] Selection state initializes from proto types

### Integration Tests
- [ ] Firestore document updates when checkbox toggled
- [ ] Proto types persist correctly to Firestore JSON
- [ ] Selection persists after page refresh
- [ ] Flashcard stack only shows selected cards
- [ ] Empty state shows when no cards selected
- [ ] Backward compatibility: Old docs without `isSelected` treated as unselected

### Manual Testing
- [ ] Toggle individual checkboxes
- [ ] Verify flashcard stack updates
- [ ] Test with empty selection
- [ ] Test with all items selected
- [ ] Verify persistence after refresh
- [ ] Test keyboard navigation
- [ ] Test on mobile/touch devices
- [ ] Verify proto types in DevTools

---

## Success Criteria

✅ Proto file updated with `isSelected` field
✅ TypeScript types generated from proto
✅ Conversion layer works correctly
✅ Data layer uses proto types internally
✅ Checkboxes appear next to each vocab item
✅ Toggling checkbox updates Firestore document
✅ Selection state persists across page refreshes
✅ Flashcard stack only shows selected vocab items
✅ Empty state displays when no items selected
✅ Backward compatible with existing vocab (no migration needed)
✅ No breaking changes to existing functionality
✅ Performance remains acceptable (<100ms toggle response)
✅ Schema ready for sharing with other services

---

## Future: Sharing Schema with Other Services

### Example: Backend Microservice (Go)

**1. Import proto file:**
```bash
# In Go backend project
cp /path/to/proto/chinese_card.proto ./proto/
```

**2. Generate Go types:**
```bash
protoc --go_out=. --go_opt=paths=source_relative proto/chinese_card.proto
```

**3. Use in Go code:**
```go
import pb "backend/proto"

// Read from same Firestore collection
card := &pb.ChineseFlashCard{
    ChineseWord: "你好",
    EnglishWord: "Hello",
    Pinyin: "nǐ hǎo",
    IsSelected: true,
}

// Convert to JSON for Firestore or REST API
jsonData, _ := json.Marshal(card)
```

**Result**: Frontend and backend use exact same data structure, guaranteed by proto schema.

---

## Related Files Reference

### Protobuf Files
- `/proto/chinese_card.proto` - Source of truth schema definition
- `/frontend/src/types/proto/chinese_flashcard.js` - Generated JavaScript
- `/frontend/src/types/proto/chinese_flashcard.d.ts` - Generated TypeScript types
- `/frontend/src/utils/protoConversion.ts` - Conversion utilities

### Components
- `/frontend/src/Pages/FlashCard/VocabCollections/VocabList.tsx` - Vocab list display
- `/frontend/src/Pages/FlashCard/VocabCollections/ChineseVocabCollection.tsx` - Data fetching
- `/frontend/src/Pages/FlashCard/VocabCollections/VocabCollection.tsx` - UI container
- `/frontend/src/Pages/FlashCard/FlashCardPage.tsx` - Flashcard display
- `/frontend/src/Pages/FlashCard/VocabCollections/components/EditVocabDialog.tsx` - Edit dialog

### Data Layer
- `/frontend/src/data/chineseCardData.ts` - Firestore CRUD operations (proto-based)
- `/frontend/src/services/firestoreService.ts` - Generic Firestore service

### Flashcard Components
- `/frontend/src/components/FlashCard/CardStack.tsx` - Card stack display
- `/frontend/src/components/FlashCard/Language/ChineseCard.tsx` - Chinese card logic

### Build Scripts
- `package.json` - Contains `generate:proto` script

---

**Created**: 2025-11-18
**Updated**: 2025-11-19 (Added Protobuf Architecture)
**Status**: Planning Complete, Ready for Implementation
**Estimated Effort**: 6-8 hours (includes protobuf migration)
