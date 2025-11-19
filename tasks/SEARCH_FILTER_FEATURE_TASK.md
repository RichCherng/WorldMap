# Search Filter Feature Task

**Description:** Implement client-side search/filter functionality for the vocabulary list to allow users to quickly find specific vocabulary cards by searching across Chinese characters, pinyin, or English translation.

**Branch:** `search-filter-feature`

**Date Started:** November 18, 2025

**Status Legend:** ❌ Not Started | 🔄 In Progress | ✅ Completed

---

## Goal

Enable users to search and filter their vocabulary list in real-time using a search input field. The search should work across multiple fields (Chinese, pinyin, English) and provide instant feedback with partial matching.

**Important:** This search filter is **contained within the VocabList component only** and does NOT impact the flashcard study mode.

---

## Tasks

### Phase 1: Add Search Input UI

- ❌ **Create Search Input Component**
  - **Description:** Add a search input field above the vocabulary list
  - **Branch:** `search-filter-feature`
  - **Subtasks:**
    - ❌ Add search input field above vocabulary list (below sort controls)
    - ❌ Add search icon (magnifying glass) inside input field
    - ❌ Add clear button (X icon) that appears when text exists
    - ❌ Style to match existing design system (similar to sort dropdown)
    - ❌ Add placeholder text: "Search by Chinese, pinyin, or English..."
    - ❌ Make input field responsive (full width on mobile)
  - **Requirements:**
    - ❌ Input should have appropriate ARIA labels for accessibility
    - ❌ Clear button only visible when search text exists
    - ❌ Focus state should be visually clear
    - ❌ Match existing component styling and spacing
  - **Files to modify:**
    - `frontend/src/Pages/FlashCard/VocabCollections/VocabList.tsx`
    - `frontend/src/Pages/FlashCard/VocabCollections/VocabList.css` (if needed)
  - **Date:** November 18, 2025

### Phase 2: Implement State Management

- ❌ **Add Search State**
  - **Description:** Set up React state for managing search query
  - **Branch:** `search-filter-feature`
  - **Subtasks:**
    - ❌ Add `searchQuery` state: `useState<string>("")`
    - ❌ Create controlled input component (value and onChange)
    - ❌ Implement handleSearchChange function
    - ❌ Implement handleClearSearch function
    - ❌ Ensure search always starts empty (not persisted)
  - **Requirements:**
    - ❌ Search state should reset to empty string on component unmount
    - ❌ Search should NOT be persisted to localStorage or URL params
    - ❌ State updates should trigger re-render
  - **Implementation Note:**
    ```typescript
    const [searchQuery, setSearchQuery] = useState<string>("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    };

    const handleClearSearch = () => {
      setSearchQuery("");
    };
    ```
  - **Date:** November 18, 2025

### Phase 3: Implement Filtering Logic

- ❌ **Create Filter Function**
  - **Description:** Implement client-side filtering logic with substring matching
  - **Branch:** `search-filter-feature`
  - **Subtasks:**
    - ❌ Create `filteredItems` using `useMemo` hook
    - ❌ Implement case-insensitive substring matching
    - ❌ Search across 3 fields: `native` (Chinese), `pronunciation` (pinyin), `translation` (English)
    - ❌ Return original items array when search query is empty
    - ❌ Use `.toLowerCase().includes()` for matching
  - **Requirements:**
    - ❌ Use **partial match (substring search)** - e.g., "你好" should match "你好吗"
    - ❌ Case-insensitive search
    - ❌ Search should match if ANY field contains the query
    - ❌ Empty/whitespace-only queries should return all items
    - ❌ Use `useMemo` with dependencies `[items, debouncedSearchQuery]`
  - **Implementation:**
    ```typescript
    const filteredItems = useMemo(() => {
      if (!debouncedSearchQuery.trim()) return items;

      const query = debouncedSearchQuery.toLowerCase();
      return items.filter(item =>
        item.native.toLowerCase().includes(query) ||
        item.pronunciation.toLowerCase().includes(query) ||
        item.translation.toLowerCase().includes(query)
      );
    }, [items, debouncedSearchQuery]);
    ```
  - **Date:** November 18, 2025

### Phase 4: Add Debouncing for Performance

- ❌ **Implement Debounce**
  - **Description:** Add debouncing to prevent excessive re-renders during fast typing
  - **Branch:** `search-filter-feature`
  - **Subtasks:**
    - ❌ Install `use-debounce` package OR implement custom debounce hook
    - ❌ Create `debouncedSearchQuery` with 300ms delay
    - ❌ Use debounced value in `filteredItems` useMemo
    - ❌ Test performance with large lists (100+ items)
  - **Requirements:**
    - ❌ Debounce delay: 300ms (configurable if needed)
    - ❌ Should prevent lag when typing quickly
    - ❌ No visible delay for user (feels instant)
  - **Implementation Option 1 (use-debounce package):**
    ```typescript
    import { useDebounce } from 'use-debounce';

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
    ```
  - **Implementation Option 2 (custom hook):**
    ```typescript
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");

    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedSearchQuery(searchQuery);
      }, 300);
      return () => clearTimeout(timer);
    }, [searchQuery]);
    ```
  - **Date:** November 18, 2025

### Phase 5: Add Results Count Display

- ❌ **Show Filtered Results Count**
  - **Description:** Display count of filtered results vs total items
  - **Branch:** `search-filter-feature`
  - **Subtasks:**
    - ❌ Add results count display element
    - ❌ Show "Showing X of Y cards" when filtering is active
    - ❌ Show "Y cards" when no filter is applied
    - ❌ Update count dynamically as user types
    - ❌ Style count display (subtle, non-intrusive)
  - **Requirements:**
    - ❌ Count should update in real-time (debounced)
    - ❌ Clear distinction between filtered vs total count
    - ❌ Text should be readable but not prominent
  - **Implementation:**
    ```typescript
    const resultsCount = filteredItems.length;
    const totalCount = items.length;

    // Display logic
    {searchQuery.trim() ? (
      <p className="results-count">Showing {resultsCount} of {totalCount} cards</p>
    ) : (
      <p className="results-count">{totalCount} cards</p>
    )}
    ```
  - **Date:** November 18, 2025

### Phase 6: Handle Empty Search Results

- ❌ **Add Empty State Message**
  - **Description:** Show user-friendly message when search returns no results
  - **Branch:** `search-filter-feature`
  - **Subtasks:**
    - ❌ Detect when `filteredItems.length === 0` and `searchQuery.trim().length > 0`
    - ❌ Display "No results found" message
    - ❌ Add helpful hint: "Try searching by Chinese, pinyin, or English"
    - ❌ Style empty state message (centered, friendly)
    - ❌ Optionally show current search query in message
  - **Requirements:**
    - ❌ Empty state only shows when actively searching (not when list is naturally empty)
    - ❌ Message should be clear and actionable
    - ❌ Should not disrupt layout
  - **Implementation:**
    ```typescript
    {filteredItems.length === 0 && searchQuery.trim() ? (
      <div className="empty-search-state">
        <p>No results found for "{searchQuery}"</p>
        <p className="hint">Try searching by Chinese, pinyin, or English</p>
      </div>
    ) : (
      // Render filtered items
    )}
    ```
  - **Date:** November 18, 2025

### Phase 7: Testing and Quality Assurance

- ❌ **Comprehensive Testing**
  - **Description:** Test all search functionality and edge cases
  - **Branch:** `search-filter-feature`
  - **Subtasks:**
    - ❌ Test searching by Chinese characters (partial and full match)
    - ❌ Test searching by pinyin (partial and full match)
    - ❌ Test searching by English (partial and full match)
    - ❌ Test case-insensitivity (uppercase, lowercase, mixed)
    - ❌ Test with special characters and punctuation
    - ❌ Test with empty search (should show all items)
    - ❌ Test with whitespace-only search (should show all items)
    - ❌ Test clear button functionality
    - ❌ Test with large vocabulary lists (100+ items)
    - ❌ Test debounce behavior (no lag during fast typing)
    - ❌ Test empty results state
    - ❌ Test results count accuracy
    - ❌ Test that search does NOT affect flashcard study mode
    - ❌ Test responsive design on mobile, tablet, desktop
    - ❌ Test keyboard accessibility (Tab, Enter, Escape)
  - **Edge Cases to Test:**
    - Empty vocabulary list
    - Single item in list
    - All items match search query
    - No items match search query
    - Search query longer than any field value
    - Unicode characters (Chinese, special symbols)
  - **Date:** November 18, 2025

---

## Technical Specifications

### Architecture
- **Component:** VocabList.tsx (existing component)
- **Approach:** Pure client-side filtering (no backend API calls)
- **Performance:** Debounced input + memoized filtering
- **Scope:** VocabList component only (does NOT affect flashcard study mode)

### State Structure
```typescript
// Search state
const [searchQuery, setSearchQuery] = useState<string>("");
const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

// Filtered items (memoized)
const filteredItems = useMemo(() => {
  if (!debouncedSearchQuery.trim()) return items;

  const query = debouncedSearchQuery.toLowerCase();
  return items.filter(item =>
    item.native.toLowerCase().includes(query) ||
    item.pronunciation.toLowerCase().includes(query) ||
    item.translation.toLowerCase().includes(query)
  );
}, [items, debouncedSearchQuery]);
```

### UI Components
1. **Search Input**
   - Input field with placeholder
   - Search icon (left side)
   - Clear button (right side, conditional)

2. **Results Count**
   - Display: "Showing X of Y cards" or "Y cards"
   - Positioned below search input

3. **Empty State**
   - Message: "No results found"
   - Hint: "Try searching by Chinese, pinyin, or English"

### Files to Modify
- `frontend/src/Pages/FlashCard/VocabCollections/VocabList.tsx` - Main implementation
- `frontend/src/Pages/FlashCard/VocabCollections/VocabList.css` - Styling (optional)

### Dependencies
- Option 1: Install `use-debounce` package
- Option 2: Implement custom debounce hook (no new dependencies)

---

## Requirements

### Functional Requirements
- ✅ Search input field always starts empty (not persisted)
- ✅ Case-insensitive search
- ✅ Partial match (substring search) - "你好" matches "你好吗"
- ✅ Search across 3 fields: Chinese (native), pinyin (pronunciation), English (translation)
- ✅ Real-time filtering (debounced for performance)
- ✅ Clear button resets search to empty
- ✅ Results count displays correctly
- ✅ Empty state message when no results
- ✅ Preserve original card order when search is cleared
- ✅ Search does NOT affect flashcard study mode

### Performance Requirements
- ✅ No lag with 100+ vocabulary items
- ✅ Debounced to prevent excessive re-renders
- ✅ Memoized filtering for optimization
- ✅ No unnecessary API calls (pure client-side)

### UI/UX Requirements
- ✅ Search input clearly visible and accessible
- ✅ Clear button visible only when text exists
- ✅ Results count updates dynamically
- ✅ Empty state handles gracefully with helpful message
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Keyboard accessible (Tab, Enter, Escape)
- ✅ Match existing design system styling

---

## Success Criteria

- ✅ Search input field is visible and functional
- ✅ Real-time filtering works across Chinese, pinyin, and English
- ✅ Case-insensitive partial matching works correctly
- ✅ Debounced to prevent performance issues
- ✅ Results count displays accurately
- ✅ Clear button works and resets search
- ✅ Empty state message displays when no results
- ✅ Search does NOT impact flashcard study mode
- ✅ No performance issues with 100+ vocabulary items
- ✅ All edge cases handled gracefully
- ✅ Code follows project conventions and best practices
- ✅ Responsive design works on all screen sizes
- ✅ Keyboard accessibility implemented

---

## Implementation Notes

### Why Client-Side Filtering?
- Vocabulary lists are typically small (< 1000 items)
- No need for backend queries
- Instant feedback for better UX
- Simpler implementation
- No additional API calls

### Why Debouncing?
- Prevents excessive re-renders during fast typing
- Optimizes performance for large lists
- Still feels instant to users (300ms is imperceptible)

### Why useMemo?
- Filtering can be expensive for large lists
- Prevents unnecessary recalculations
- Only recomputes when dependencies change (items or search query)

### Accessibility Considerations
- Proper ARIA labels for search input
- Clear button should be keyboard accessible
- Screen reader should announce results count
- Focus management for clear button

---

## Related Documentation

- [CHINESE_FLASHCARD_TASK2.md](CHINESE_FLASHCARD_TASK2.md) - Related UI improvements
- [CHINESE_FLASHCARD_TASK.md](CHINESE_FLASHCARD_TASK.md) - Original flashcard feature
- [VocabList Component](../frontend/src/Pages/FlashCard/VocabCollections/VocabList.tsx) - Component to modify

---

## Notes

- This feature is scoped to VocabList component only
- Does NOT affect the flashcard study mode or CardStack component
- Search is never persisted (always starts empty)
- Pure client-side implementation (no backend changes needed)
- Follows existing component patterns and design system

---

**Created:** November 18, 2025
**Last Updated:** November 18, 2025
