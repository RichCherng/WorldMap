# Chinese Sentence Card Task

**Description:** Implement a new flash card feature for Chinese sentences, similar to the Chinese vocabulary flash cards but designed specifically for full sentences to help users learn Chinese grammar, sentence structure, and contextual usage.

**Branch:** TBD (to be created when starting implementation)

**Date Started:** November 17, 2025

**Status Legend:** ❌ Not Started | 🔄 In Progress | ✅ Completed

---

## Goal

Create a flash card system for Chinese sentences that allows users to:

- Learn complete Chinese sentences with their English translations
- Study sentence structure and grammar patterns
- Practice reading comprehension with full sentences
- Build contextual understanding beyond individual vocabulary

The feature should mirror the functionality of the existing Chinese vocabulary flash cards but be adapted for sentence-level learning.

---

## Tasks

- ✅ **Define Chinese Sentence Card Data Structure**
  - **Description:** Create TypeScript interface and data model for Chinese sentence flash cards
  - **Branch:** TBD
  - **Subtasks:**
    - ✅ Create ChineseSentenceCardData interface with fields:
      - ✅ id: string
      - ✅ chineseSentence: string (full sentence in Chinese characters)
      - ✅ pinyin: string (romanization of the sentence)
      - ✅ englishTranslation: string
      - ✅ collectionId?: string (optional grouping)
      - ✅ difficulty?: string (e.g., beginner, intermediate, advanced)
      - ✅ grammarNotes?: string (optional notes about grammar patterns)
      - ✅ audioUrl?: string (optional audio pronunciation)
      - ✅ createdAt?: Date
      - ✅ updatedAt?: Date
    - ✅ Create proto definition for backend compatibility (`proto/chinese_sentence_card.proto`)
    - ✅ Create Technical Documentation (`tech_doc/CHINESE_SENTENCE_CARD_FEATURE.md`)
    - ✅ Define Firestore collection structure
  - **Files to create:**
    - `frontend/src/components/FlashCard/Language/ChineseSentenceCard.tsx`
  - **Date:** November 17, 2025

- ❌ **Implement Chinese Sentence Card Component**

  - **Description:** Create the visual flash card component for displaying Chinese sentences
  - **Branch:** TBD
  - **Subtasks:**
    - ❌ Create ChineseSentenceCard.tsx component
    - ❌ Implement card front: Display Chinese sentence
    - ❌ Implement card back: Display pinyin, English translation, and optional grammar notes
    - ❌ Add flip animation (reuse from Chinese vocab cards if possible)
    - ❌ Handle long sentences with appropriate text wrapping
    - ❌ Make component responsive (mobile, tablet, desktop)
    - ❌ Add optional audio playback button (if audioUrl provided)
  - **Requirements:**
    - ❌ Card should follow same design pattern as ChineseCard component
    - ❌ Font size should be appropriate for sentence length (adaptive)
    - ❌ Support both simplified and traditional Chinese characters
    - ❌ Gracefully handle missing optional fields (grammar notes, audio)
  - **Files to create:**
    - `frontend/src/components/FlashCard/Language/ChineseSentenceCard.tsx`
    - `frontend/src/components/FlashCard/Language/ChineseSentenceCard.css`
  - **Date:** November 17, 2025

- ❌ **Create Firestore Database Operations**

  - **Description:** Implement CRUD operations for Chinese sentence cards in Firestore
  - **Branch:** TBD
  - **Subtasks:**
    - ❌ Create chineseSentenceCardData.ts file in data layer
    - ❌ Implement `getChineseSentenceCards(collectionId?: string)` function
    - ❌ Implement `addChineseSentenceCard(card: ChineseSentenceCardData)` function
    - ❌ Implement `updateChineseSentenceCard(id: string, updates: Partial<ChineseSentenceCardData>)` function
    - ❌ Implement `deleteChineseSentenceCard(id: string)` function
    - ❌ Implement `shuffleChineseSentenceCards(cards: ChineseSentenceCardData[])` function
    - ❌ Add error handling for all database operations
    - ❌ Add TypeScript types for all function parameters and return values
  - **Files to create:**
    - `frontend/src/data/chineseSentenceCardData.ts`
  - **Date:** November 17, 2025

- ❌ **Build Sentence Vocabulary Collection Page**

  - **Description:** Create a page to manage and display collections of Chinese sentence flash cards
  - **Branch:** TBD
  - **Subtasks:**
    - ❌ Create ChineseSentenceVocabCollection.tsx component
    - ❌ Implement sentence list view with all sentences in collection
    - ❌ Add "Add New Sentence" button and modal
    - ❌ Add edit functionality for existing sentences
    - ❌ Add delete functionality with confirmation
    - ❌ Integrate with CardStack component for flash card display
    - ❌ Implement shuffle functionality (default shuffle on load)
    - ❌ Add search/filter functionality (optional)
    - ❌ Show sentence count and progress tracking
  - **Files to create:**
    - `frontend/src/Pages/FlashCard/VocabCollections/ChineseSentenceVocabCollection.tsx`
  - **Date:** November 17, 2025

- ❌ **Create Add/Edit Sentence Modal**

  - **Description:** Build modal dialog for adding and editing Chinese sentence cards
  - **Branch:** TBD
  - **Subtasks:**
    - ❌ Create modal component with form fields:
      - ❌ Chinese sentence input (textarea for multi-line if needed)
      - ❌ Pinyin input (textarea)
      - ❌ English translation input (textarea)
      - ❌ Grammar notes input (optional, textarea)
      - ❌ Difficulty selector (dropdown: beginner/intermediate/advanced)
      - ❌ Audio URL input (optional)
    - ❌ Add form validation (required fields)
    - ❌ Implement save handler
    - ❌ Implement cancel handler
    - ❌ Add loading states during save
    - ❌ Show success/error messages
    - ❌ Support both "add new" and "edit existing" modes
  - **Requirements:**
    - ❌ Chinese sentence, pinyin, and English translation are required
    - ❌ Grammar notes and audio URL are optional
    - ❌ Form should clear after successful save (in add mode)
    - ❌ Form should populate with existing data (in edit mode)
  - **Date:** November 17, 2025

- ❌ **Integrate with Flash Card Page Navigation**

  - **Description:** Add navigation option to access Chinese sentence cards from main flash card page
  - **Branch:** TBD
  - **Subtasks:**
    - ❌ Add "Chinese Sentences" option to flash card page menu
    - ❌ Update routing to include sentence card route
    - ❌ Add navigation link/button to switch between vocab and sentence modes
    - ❌ Ensure consistent UI/UX with existing navigation pattern
    - ❌ Test navigation flow between different card types
  - **Files to modify:**
    - `frontend/src/Pages/FlashCard/FlashCardPage.tsx`
    - Routing configuration file (TBD)
  - **Date:** November 17, 2025

- ❌ **Add Sentence Collections Management**

  - **Description:** Allow users to organize sentences into different collections/categories
  - **Branch:** TBD
  - **Subtasks:**
    - ❌ Create collection selector UI component
    - ❌ Implement create new collection functionality
    - ❌ Implement collection naming and description
    - ❌ Allow filtering sentences by collection
    - ❌ Add ability to move sentences between collections
    - ❌ Display collection statistics (count, progress)
  - **Requirements:**
    - ❌ Collections are optional (sentences can exist without collection)
    - ❌ Default collection option available
    - ❌ Collection names must be unique
  - **Date:** November 17, 2025

- ❌ **Implement Progress Tracking**

  - **Description:** Track user progress and mastery of sentence cards
  - **Branch:** TBD
  - **Subtasks:**
    - ❌ Add progress tracking fields to data model:
      - ❌ lastReviewed: Date
      - ❌ reviewCount: number
      - ❌ masteryLevel: number (0-5 scale)
    - ❌ Implement marking cards as "known" or "learning"
    - ❌ Add visual indicators for mastery level
    - ❌ Track review statistics
    - ❌ Implement spaced repetition algorithm (optional, future enhancement)
  - **Date:** November 17, 2025

- ❌ **Testing and Quality Assurance**
  - **Description:** Test all functionality and ensure quality standards
  - **Branch:** TBD
  - **Subtasks:**
    - ❌ Test adding new sentence cards
    - ❌ Test editing existing sentence cards
    - ❌ Test deleting sentence cards
    - ❌ Test card flip animation and display
    - ❌ Test shuffle functionality
    - ❌ Test with various sentence lengths (short, medium, long)
    - ❌ Test responsive design on mobile, tablet, desktop
    - ❌ Test with missing optional fields (grammar notes, audio)
    - ❌ Test database operations (create, read, update, delete)
    - ❌ Test navigation between vocab and sentence cards
    - ❌ Test error handling and edge cases
    - ❌ Verify accessibility standards
  - **Date:** November 17, 2025

---

## Technical Considerations

- **Reuse existing components:** Leverage CardStack, flip animations, and UI patterns from Chinese vocabulary cards
- **Database structure:** Use Firestore collections similar to vocab cards for consistency
- **Data separation:** Keep sentence cards separate from vocab cards in the database
- **Performance:** Handle large collections efficiently (consider pagination for 100+ sentences)
- **Accessibility:** Ensure screen reader support, keyboard navigation, and proper ARIA labels
- **Mobile-first design:** Optimize for mobile viewing since sentences may be longer than single words
- **Font sizing:** Implement adaptive font sizing based on sentence length to maintain readability

## Architecture Notes

- **Component hierarchy:**

  ```
  FlashCardPage
    └── ChineseSentenceVocabCollection
        ├── CardStack
        │   └── ChineseSentenceCard
        └── VocabList (for sentence management)
            └── Add/Edit Sentence Modal
  ```

- **Data flow:**
  - Firestore ← chineseSentenceCardData.ts ← ChineseSentenceVocabCollection ← ChineseSentenceCard

## Definition of Done

- ✅ Chinese sentence card component created and displays correctly
- ✅ Firestore CRUD operations implemented and tested
- ✅ Add/edit/delete functionality works for sentence cards
- ✅ Shuffle functionality works and shuffles by default on load
- ✅ Navigation integrated with main flash card page
- ✅ Responsive design works on all screen sizes
- ✅ All required fields validated, optional fields handled gracefully
- ✅ Code follows project architecture and conventions
- ✅ Testing completed and all edge cases handled
- ✅ Documentation updated (README, technical docs)

## Future Enhancements (Out of Scope)

- Audio generation integration (text-to-speech)
- Import sentences from files (CSV, JSON)
- Export sentence collections
- Sentence breakdown (word-by-word analysis)
- Grammar pattern highlighting
- Spaced repetition algorithm
- Study statistics dashboard
- Sentence difficulty auto-detection

## Notes

- This task builds upon the existing Chinese vocabulary flash card infrastructure
- Maintain consistency with existing card design and user experience
- Consider user feedback from vocabulary card implementation
- Link related tasks: [CHINESE_FLASHCARD_TASK.md](CHINESE_FLASHCARD_TASK.md) and [CHINESE_FLASHCARD_TASK2.md](CHINESE_FLASHCARD_TASK2.md)

## Related Documentation

- [Technical Documentation](tech_doc/CHINESE_SENTENCE_CARD_FEATURE.md)
- Reference: Chinese vocabulary card technical documentation (if exists)

---

**Created:** November 17, 2025
**Last Updated:** November 17, 2025
