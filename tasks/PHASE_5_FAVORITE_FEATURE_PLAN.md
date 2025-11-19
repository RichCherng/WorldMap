# Phase 5: Favorite Feature Implementation Plan

**Goal:** Add favorite/star functionality to vocabulary items for focused study mode filtering.

**Estimated Time:** 6-8 hours

**Note:** This phase builds on Phase 4 (Vocabulary Page Redesign). The favorite feature will be integrated into the redesigned vocabulary page.

---

## Overview

Phase 4 enhances the flashcard experience:
1. Improve flashcard study view styling with design system
2. Add star favorite button next to edit button in vocabulary list
3. Implement favorite state persistence to Firebase with optimistic updates
4. Filter study mode to show only favorited cards (using local state)
5. Add progress indicators with gradient styling
6. Enhance overall UI with animations

**Design Reference:** `flashcard_study_view.png`, `vocab_list_button_select.png`, `vocab_item_detail.png` mockups

---

## Key Implementation Details

### Protobuf Update
Add `bool favorite = 9;` to `chinese_card.proto` and regenerate types.

**Command to regenerate:**
```bash
cd frontend
npm run generate:proto
```

This will regenerate:
- `frontend/src/types/proto/chinese_flashcard.js`
- `frontend/src/types/proto/chinese_flashcard.d.ts`

The ChineseCardData interface will automatically include the `favorite?: boolean` field from the protobuf definition.

### Optimistic Updates
- UI updates immediately when user clicks star
- Firebase update happens in background
- No refetching needed - update local state directly

### Local State Filtering
- Filter favorited cards using `words.filter(w => w.favorite)`
- No Firebase query needed for filtering
- Better performance, no network calls

---

## Implementation Steps

### Step 1: Update Protobuf Definition
- Add `bool favorite = 9;` to `proto/chinese_card.proto`
- Run `npm run generate:proto` in frontend directory
- Verify generated TypeScript types include `favorite?: boolean`
- Check `frontend/src/types/proto/chinese_flashcard.d.ts`

### Step 2: Update Firebase Service
- Add `updateVocabFavorite(vocabId, favorite)` function
- Implement optimistic update pattern (caller updates UI first)
- Remove query-based filtering (use local state instead)

### Step 3: Update VocabList Component
- Import Star icon from lucide-react
- Add star button next to edit button
- Implement toggle favorite handler with optimistic update
- Update local state immediately before Firebase call

### Step 4: Update VocabList CSS
- Style icon buttons container
- Style star button (unselected and selected states)
- Add gradient background for selected state
- Add hover effects

### Step 5: Update ChineseVocabCollection
- Add handleToggleFavorite function with optimistic update
- Update local vocabulary state immediately
- Call Firebase update in background
- Handle errors gracefully (optionally revert on error)

### Step 6: Test Favorite Feature
- Test favoriting/unfavoriting cards
- Verify optimistic UI updates (immediate)
- Verify Firebase persistence (background)
- Test study mode filtering (local state)
- Check UI updates correctly
- Test error handling

---

## Success Criteria

- [ ] Star button appears next to edit button in vocabulary list
- [ ] Clicking star toggles favorite state
- [ ] Favorited state shows gradient background
- [ ] UI updates immediately (optimistic)
- [ ] Favorite persists to Firebase (background)
- [ ] Smooth animations and transitions
- [ ] No console errors
- [ ] Matches design mockup

**Note:** Study mode filtering and card styling are now part of Phase 4.

---

## Technical Notes

### State Management
- **Optimistic Updates**: Update UI immediately, Firebase in background
- Update local vocabulary state in parent component
- No refetching needed after favorite toggle
- Handle errors gracefully (optionally revert UI on error)

### Default Behavior
- New cards default to `favorite: false`
- If no cards favorited, show all cards in study mode
- Preserve existing functionality

### Performance
- Update Firebase only on favorite change
- Filter cards using local state (no Firebase query)
- Avoid unnecessary re-renders
- No network calls for filtering

---

## Next Steps After Phase 4

1. Commit changes
2. Test thoroughly
3. Update task documentation
4. Consider Phase 5 or Phase 6
