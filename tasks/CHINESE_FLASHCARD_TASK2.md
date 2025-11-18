# Chinese Flash Card Task 2

**Description:** Enhancing the Chinese Flash Card feature with UI/UX improvements, page organization, and shuffle functionality

**Branch:** `chinese-flash-card`

**Date Started:** November 17, 2025

**Status Legend:** ❌ Not Started | 🔄 In Progress | ✅ Completed

---

## Tasks ##

- ❌ **Updating Vocab List UI Component**
    - **Description:** Improve the vocabulary list interface to provide a better user experience when browsing and managing vocabulary items
    - **Branch:** `chinese-flash-card`
    - **Subtasks:**
        - ❌ Review current Vocab List UI implementation
        - ❌ Identify areas for improvement (styling, layout, interactivity)
        - ❌ Update component design with enhanced visuals
        - ❌ Implement responsive design for mobile and desktop views
        - ❌ Add sorting/filtering capabilities (if applicable)
        - ❌ Test UI changes across different screen sizes
    - **Files to modify:**
        - TBD (to be identified during implementation)
    - **Date:** November 17, 2025

- ❌ **Add Image URL Field in Edit Modal**
    - **Description:** Add functionality to include image URLs in vocabulary cards through the edit modal
    - **Branch:** `chinese-flash-card`
    - **Purpose:** Allow users to associate images with vocabulary words for better visual learning
    - **Subtasks:**
        - ❌ Add input field for image URL in the vocabulary edit modal
        - ❌ Validate image URL format (check for valid URL structure)
        - ❌ Display image preview if URL is provided
        - ❌ Update backend/database schema if needed to store image URL
        - ❌ Handle image loading states (loading, error, success)
        - ❌ Test image URL functionality with valid and invalid URLs
        - ❌ Add ability to clear/remove image URL
    - **Requirements:**
        - ❌ Image URL field should be optional
        - ❌ Display preview of image before saving
        - ❌ Handle broken/invalid image URLs gracefully
        - ❌ Validate URL format client-side
        - ❌ Store image URL in database
        - ❌ Display image on flashcard if URL is present
    - **Files to modify:**
        - TBD (to be identified during implementation)
    - **Date:** November 17, 2025

- ❌ **Organizing Web Page**
    - **Description:** Restructure the web page layout to improve overall organization, navigation, and user flow
    - **Branch:** `chinese-flash-card`
    - **Subtasks:**
        - ❌ Review current page structure and layout
        - ❌ Identify pain points in navigation and organization
        - ❌ Design improved page layout/structure
        - ❌ Reorganize components and sections logically
        - ❌ Ensure consistent styling and spacing
        - ❌ Implement navigation improvements (if needed)
        - ❌ Test user flow and accessibility
    - **Files to modify:**
        - TBD (to be identified during implementation)
    - **Date:** November 17, 2025

- ✅ **Add Example Usage Field**
    - **Description:** Add functionality to include example sentences/usage for vocabulary words in both the edit modal and flashcard display
    - **Branch:** `chinese-flash-card`
    - **Purpose:** Provide contextual examples to help users better understand how to use vocabulary words in real sentences
    - **Subtasks:**
        - ✅ **Update proto definition (REQUIRED - FIRST STEP)**
            - **File:** [proto/chinese_card.proto](proto/chinese_card.proto#L10-L18)
            - **Why this is first:** Proto defines the canonical data contract and serves as documentation
            - **Current Architecture:** Frontend uses Direct Firestore communication (not gRPC backend)
            - ✅ Add `string example_usage = 8;` to ChineseFlashCard message only
            - **Note:** No need to update CreateChineseFlashCardRequest or UpdateChineseFlashCardRequest since we're not using gRPC for CRUD operations
            - ✅ Regenerate frontend types from proto: `cd frontend && npm run generate:proto`
        - ✅ **Update data structure**
            - **File:** [frontend/src/components/FlashCard/Language/ChineseCard.tsx](frontend/src/components/FlashCard/Language/ChineseCard.tsx#L6-L14)
            - ✅ Add `exampleUsage?: string;` to ChineseCardData interface
        - ✅ **Add example usage field in edit modal**
            - **File:** [frontend/src/Pages/FlashCard/VocabCollections/VocabList.tsx](frontend/src/Pages/FlashCard/VocabCollections/VocabList.tsx#L176-L276)
            - ✅ Add textarea field for example usage in EditVocabDialog component
            - ✅ Add state: `const [exampleUsageText, setExampleUsageText] = useState(item.exampleUsage || "");`
            - ✅ Make field optional (not required)
            - ✅ Support multi-line input for longer examples
            - ✅ Update handleSave() to include exampleUsage in the save payload
        - ✅ **Display example usage on flashcard back**
            - **File:** [frontend/src/components/FlashCard/Language/ChineseCard.tsx](frontend/src/components/FlashCard/Language/ChineseCard.tsx#L20-L42)
            - ✅ Add example usage section to the back of the flashcard below pinyin
            - ✅ Conditionally render: `{data.exampleUsage && <div className="example-usage"><p>{data.exampleUsage}</p></div>}`
            - ✅ Handle cases where no example is provided (hide section gracefully)
            - ✅ Ensure proper text wrapping and formatting for longer examples
        - ✅ **Add styling**
            - **File:** [frontend/src/components/FlashCard/Language/ChineseCard.css](frontend/src/components/FlashCard/Language/ChineseCard.css)
            - ✅ Add `.example-usage` class for styling
            - ✅ Style example section to be visually distinct from other card content
            - ✅ Ensure responsive design (mobile breakpoint at 300px)
            - ✅ Handle long examples gracefully without breaking layout
        - ✅ **Update database operations**
            - **File:** [frontend/src/Pages/FlashCard/VocabCollections/ChineseVocabCollection.tsx](frontend/src/Pages/FlashCard/VocabCollections/ChineseVocabCollection.tsx#L109-L145)
            - ✅ Update handleEditVocab to include exampleUsage field
            - ✅ Update handleAddVocab to include exampleUsage field
            - **File:** [frontend/src/data/chineseCardData.ts](frontend/src/data/chineseCardData.ts#L78-L98)
            - ✅ Ensure updateChineseCard handles exampleUsage field
            - ✅ Ensure addChineseCard handles exampleUsage field
            - ✅ Firestore will automatically store the new field (no schema change needed)
        - ✅ **Testing and validation**
            - ✅ Test with various example lengths (short, medium, long)
            - ✅ Test with no example provided (field should not appear)
            - ✅ Verify responsive design on different screen sizes
            - ✅ Test saving new cards with example usage
            - ✅ Test editing existing cards to add/update/remove example usage
            - ✅ Test retrieving examples from Firestore database
    - **Requirements:**
        - ✅ Example usage field should be optional
        - ✅ Support both Chinese and English examples (free text input)
        - ✅ Display example on back of flashcard only when provided
        - ✅ Store example usage in Firestore database
        - ✅ Maintain consistent styling with existing flashcard design
        - ✅ Handle long examples gracefully without breaking layout
    - **Implementation Notes:**
        - No character limit initially - keep it flexible for user needs
        - Example usage appears below pinyin on card back
        - Firestore is schema-less, so adding the field doesn't require migration
        - **Architecture:** Using Direct Firestore communication (not gRPC backend)
        - Proto definition updated for documentation and canonical data contract
    - **Files to modify:**
        - [proto/chinese_card.proto](proto/chinese_card.proto) - Proto definition (data contract documentation)
        - [frontend/src/components/FlashCard/Language/ChineseCard.tsx](frontend/src/components/FlashCard/Language/ChineseCard.tsx) - Interface & display
        - [frontend/src/Pages/FlashCard/VocabCollections/VocabList.tsx](frontend/src/Pages/FlashCard/VocabCollections/VocabList.tsx) - Edit modal form
        - [frontend/src/Pages/FlashCard/VocabCollections/ChineseVocabCollection.tsx](frontend/src/Pages/FlashCard/VocabCollections/ChineseVocabCollection.tsx) - Edit/Add handlers
        - [frontend/src/data/chineseCardData.ts](frontend/src/data/chineseCardData.ts) - Database operations
        - [frontend/src/components/FlashCard/Language/ChineseCard.css](frontend/src/components/FlashCard/Language/ChineseCard.css) - Styling
    - **Date:** November 17, 2025

- ❌ **Add Shuffle Deck Feature**
    - **Description:** Implement shuffle functionality to randomize the order of flashcards in the deck
    - **Branch:** `chinese-flash-card`
    - **Purpose:** Allow users to shuffle cards for better learning by preventing memorization of card order
    - **Architecture:** Shuffle logic lives in data layer (`chineseCardData.ts`) to maintain separation of concerns
    - **Subtasks:**
        - ❌ **Add shuffle function to data layer**
            - **File:** [frontend/src/data/chineseCardData.ts](frontend/src/data/chineseCardData.ts)
            - ❌ Create `shuffleChineseCards(cards: ChineseCardData[]): ChineseCardData[]` function
            - ❌ Use Fisher-Yates (Knuth) shuffle algorithm for unbiased randomization
            - ❌ Function should return a new shuffled array (immutable)
        - ❌ **Update CardStack to accept shuffle prop**
            - **File:** [frontend/src/components/FlashCard/CardStack.tsx](frontend/src/components/FlashCard/CardStack.tsx)
            - ❌ Add optional `onShuffle?: () => void` callback prop
            - ❌ Expose shuffle capability without implementing shuffle logic
        - ❌ **Implement shuffle in ChineseVocabCollection**
            - **File:** [frontend/src/Pages/FlashCard/VocabCollections/ChineseVocabCollection.tsx](frontend/src/Pages/FlashCard/VocabCollections/ChineseVocabCollection.tsx)
            - ❌ Import `shuffleChineseCards` from data layer
            - ❌ Create `handleShuffle()` function
            - ❌ Update local state with shuffled cards
            - ❌ **Shuffle cards by default on component mount**
            - ❌ Automatically shuffle cards when vocabulary collection is loaded
        - ❌ **Add shuffle button to UI**
            - **File:** [frontend/src/Pages/FlashCard/FlashCardPage.tsx](frontend/src/Pages/FlashCard/FlashCardPage.tsx)
            - ❌ Add shuffle button with icon
            - ❌ Position button near the card stack
            - ❌ Style button to match existing UI design
        - ❌ **Connect shuffle button to data layer**
            - ❌ Pass shuffle handler from ChineseVocabCollection to FlashCardPage
            - ❌ Call shuffle function when button is clicked
            - ❌ Optional: Add shuffle animation/transition
        - ❌ **Add visual feedback**
            - ❌ Show brief animation or toast notification when shuffle occurs
            - ❌ Optional: Disable shuffle button temporarily during shuffle animation
    - **Requirements:**
        - ❌ Shuffle logic implemented in data layer (not in UI components)
        - ❌ Cards should be shuffled by default when vocabulary collection loads
        - ❌ Shuffle should randomize all cards in the current deck
        - ❌ Shuffle should maintain card data integrity
        - ❌ Shuffle function should be pure (no side effects)
        - ❌ Button should be easily accessible and intuitive
        - ❌ Shuffle should work with any number of cards
        - ❌ Animation should be smooth and not jarring
    - **Files to modify:**
        - [frontend/src/data/chineseCardData.ts](frontend/src/data/chineseCardData.ts)
        - [frontend/src/components/FlashCard/CardStack.tsx](frontend/src/components/FlashCard/CardStack.tsx)
        - [frontend/src/Pages/FlashCard/VocabCollections/ChineseVocabCollection.tsx](frontend/src/Pages/FlashCard/VocabCollections/ChineseVocabCollection.tsx)
        - [frontend/src/Pages/FlashCard/FlashCardPage.tsx](frontend/src/Pages/FlashCard/FlashCardPage.tsx)
    - **Date:** November 17, 2025

---

## Technical Considerations
- Maintain consistency with existing design system
- Ensure backward compatibility with existing features
- Follow React/component best practices
- Consider performance implications of UI changes
- Ensure accessibility standards are met

## Definition of Done
- ✅ Vocab List UI component is updated with improved visuals and functionality
- ✅ Web page is reorganized with better layout and navigation
- ✅ All changes are responsive and work on mobile/tablet/desktop
- ✅ Code is tested and reviewed
- ✅ No breaking changes to existing functionality
- ✅ Documentation updated if necessary

## Notes
- Review with user before implementing major layout changes
- Consider user feedback from previous implementation
- Link to [CHINESE_FLASHCARD_TASK.md](CHINESE_FLASHCARD_TASK.md) for context on previous work

## Related Documentation
- TBD: Link to technical documentation in `tech_doc/` (to be created/updated)
