# Phase 4: Vocabulary Page Redesign Implementation Plan

**Goal:** Create a dedicated vocabulary management page with split view layout - vocabulary list on the left and item detail preview card on the right.

**Estimated Time:** 8-10 hours

---

## Overview

Phase 4 creates a modern vocabulary management experience:
1. Create dedicated vocabulary page (separate from flashcard study view)
2. Implement split view layout (list + detail preview)
3. Redesign vocabulary list to match `vocab_list_button_select.png`
4. Create item detail preview card matching `vocab_item_detail.png`
5. Add smooth transitions and animations
6. Apply design system styling throughout

**Design References:** 
- `vocab_list_button_select.png` - List view with buttons
- `vocab_item_detail.png` - Detail preview card

---

## Proposed Layout

```
┌─────────────────────────────────────────────────────────────┐
│                    Vocabulary Management                     │
├──────────────────────────────────┬──────────────────────────┤
│                                  │                          │
│    Item Detail Preview           │   Vocabulary List        │
│    (Left Panel)                  │   (Right Panel)          │
│                                  │                          │
│    ┌──────────────────────┐      │   ┌────────────────┐     │
│    │  你好                 │      │   │ 你好 (nǐ hǎo)  │     │
│    │  Chinese Characters   │◄─────┼───│ Hello          │     │
│    │                      │      │   │ [★] [Edit]     │     │
│    │  nǐ hǎo              │      │   └────────────────┘     │
│    │  Pinyin              │      │                          │
│    │                      │      │   ┌────────────────┐     │
│    │  Hello               │      │   │ 谢谢 (xièxie)  │     │
│    │  English             │      │   │ Thank you      │     │
│    │                      │      │   │ [☆] [Edit]     │     │
│    │  Example: 你好世界    │      │   └────────────────┘     │
│    │                      │      │                          │
│    └──────────────────────┘      │   ...                    │
│                                  │                          │
└──────────────────────────────────┴──────────────────────────┘
```

---

## Implementation Steps

### Step 1: Add Mode Switching to FlashCard Page
- Add state to track current mode: `'study' | 'vocabulary'`
- Create mode toggle button/tabs in FlashCardPage
- Style toggle button with design system
- Position toggle at top of page
- Default to 'study' mode

### Step 2: Create Vocabulary Page Component
- Create `VocabularyPage.tsx` in `Pages/Vocabulary/`
- Set up split view layout with CSS Grid or Flexbox
- Left panel: 60% width, detail preview
- Right panel: 40% width, scrollable list
- Add responsive breakpoints (stack on mobile)

### Step 3: Conditional Rendering in FlashCardPage
- Show flashcard stack when mode is 'study'
- Show VocabularyPage component when mode is 'vocabulary'
- Smooth transition between modes
- Preserve state when switching modes

### Step 4: Redesign Vocabulary List Panel
- Update list item design to match `vocab_list_button_select.png`
- Compact list items with:
  - Chinese word + pinyin on one line
  - English translation on second line
  - Action buttons (star, edit) on the right
- Add selection state (highlight selected item)
- Implement smooth scroll behavior

### Step 5: Create Item Detail Preview Card
- Create `VocabDetailCard.tsx` component
- Design matching `vocab_item_detail.png`:
  - Large Chinese characters at top
  - Pinyin below
  - English translation
  - Example usage section
  - Card styling with shadows and rounded corners
- Use design system variables for styling

### Step 6: Implement Selection Logic
- Track selected item in state
- Click on list item updates detail preview
- Smooth transition when switching items
- Default to first item on page load

### Step 7: Style with Design System
- Apply design system colors, spacing, typography
- Use `var(--bg-secondary)` for cards
- Use `var(--radius-xl)` for rounded corners
- Use `var(--shadow-lg)` for card shadows
- Style mode toggle button with gradient when active
- Ensure consistent spacing throughout

### Step 8: Add Animations
- Fade-in animation for detail card when item changes
- Smooth scroll in list
- Hover effects on list items
- Button hover animations
- Mode switch transition animation

### Step 9: Make Responsive
- Desktop: Side-by-side layout (60/40 split)
- Tablet: Adjust panel widths
- Mobile: Stack vertically (detail on top, list below)
- Test on different screen sizes

### Step 10: Integrate with Existing System
- Connect VocabularyPage to ChineseVocabCollection data
- Ensure edit/delete functionality works
- Test data flow
- Verify mode switching preserves data

### Step 11: Polish and Test
- Verify design matches mockups
- Test all interactions
- Check responsive behavior
- Ensure smooth performance
- Test mode switching

### Step 12: Update FlashCardPage for Favorite Filtering
- Filter cards by favorite state using local array filter
- Show only favorited cards in study mode
- Add card counter display (styled with design system)
- Handle case when no cards favorited (show all)
- Display counter: "Studying X favorited cards" or "Studying all X cards"

### Step 13: Enhance Flashcard Styling
- Update `ChineseCard.css` with design system variables
- Apply modern card styling from `flashcard_study_view.png`:
  - Use `var(--bg-secondary)` for card background
  - Use `var(--radius-xl)` for border radius
  - Use `var(--shadow-xl)` for card shadow
  - Update typography with design system font sizes
  - Improve spacing with design system spacing variables
- Add card counter styling
- Enhance card flip animation smoothness
- **Design Review:** Verify card appearance matches `flashcard_study_view.png`:
  - Check card dimensions (350x450px)
  - Check font sizes (Chinese: 48px, Pinyin: 18px, English: 20px)
  - Check progress indicator style
  - Check shadow depth and hover effects
- Test card appearance matches mockup

---

## Success Criteria

- [ ] Mode toggle button in FlashCard page
- [ ] Can switch between Study Mode and Vocabulary List Mode
- [ ] Study Mode shows flashcard stack
- [ ] Vocabulary List Mode shows split view
- [ ] Split view layout works on desktop (60/40 split)
- [ ] List design matches `vocab_list_button_select.png`
- [ ] Detail card matches `vocab_item_detail.png`
- [ ] Clicking list item updates detail preview
- [ ] Smooth animations and transitions
- [ ] Mode switching is smooth with no flicker
- [ ] Responsive on all screen sizes
- [ ] Design system variables used throughout
- [ ] Edit and delete functionality preserved
- [ ] No console errors

---

## Next Steps After Phase 4

1. Commit changes
2. Test thoroughly
3. Update task documentation
4. Begin Phase 5: Favorite Functionality
