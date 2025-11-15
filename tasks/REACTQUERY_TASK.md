# React Query Migration Task

**Description:** Migrate Chinese FlashCard data management from manual state management (Container Component pattern) to React Query (TanStack Query) for improved caching, automatic refetching, and optimistic updates.

**Technical Documentation:** [tech_doc/REACT_QUERY.md](../tech_doc/REACT_QUERY.md) - Comprehensive React Query reference including concepts, setup, patterns, and best practices

**Priority:** Low (Future Enhancement)

**Current Status:** Deferred - Current implementation works well for simple use case

**Motivation:** React Query will provide better UX when we add:
- Real-time collaboration (multiple users editing flashcards)
- Automatic background sync
- Offline support with retry logic
- More complex caching requirements

**Main Branch:** `main`

**Feature Branch:** `react-query-migration`

**Date Started:** Not started yet

**Status Legend:** ❌ Not Started | 🔄 In Progress | ✅ Completed

---

## Prerequisites

Before starting this migration, ensure:
- ✅ Current gRPC-Web integration is complete and stable
- ✅ All CRUD operations (Create, Read, Update, Delete) working
- ✅ No critical bugs in current implementation
- ⚠️ Decision to migrate is based on actual need (not premature optimization)

---

## Tasks

### **Phase 1: Setup React Query**

- ❌ **Install React Query Dependencies**
    - **Branch:** `react-query-setup`
    - **Description:** Install TanStack Query and DevTools
    - **Subtasks:**
        - ❌ Install `@tanstack/react-query` package
        - ❌ Install `@tanstack/react-query-devtools` (dev dependency)
        - ❌ Verify package versions are compatible with React 18+
        - ❌ Update package.json and package-lock.json
    - **Commands:**
        ```bash
        cd frontend
        npm install @tanstack/react-query
        npm install --save-dev @tanstack/react-query-devtools
        ```
    - **Date:** TBD

- ❌ **Configure QueryClient and Provider**
    - **Branch:** `react-query-setup`
    - **Description:** Set up QueryClient with optimal defaults and wrap App with QueryClientProvider
    - **File to modify:** [frontend/src/App.tsx](../frontend/src/App.tsx) (or main entry point)
    - **Subtasks:**
        - ❌ Create QueryClient instance with default options
            - Set `staleTime: 5 * 60 * 1000` (5 minutes)
            - Set `cacheTime: 10 * 60 * 1000` (10 minutes)
            - Set `retry: 3`
            - Set `refetchOnWindowFocus: true`
            - Set `refetchOnReconnect: true`
        - ❌ Wrap App component with `<QueryClientProvider>`
        - ❌ Add `<ReactQueryDevtools>` component for debugging (dev only)
        - ❌ Test: Verify DevTools appear in bottom corner of browser
    - **Example:**
        ```typescript
        import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
        import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

        const queryClient = new QueryClient({
          defaultOptions: {
            queries: {
              staleTime: 5 * 60 * 1000,
              cacheTime: 10 * 60 * 1000,
              retry: 3,
              refetchOnWindowFocus: true,
              refetchOnReconnect: true
            }
          }
        });

        function App() {
          return (
            <QueryClientProvider client={queryClient}>
              <YourApp />
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          );
        }
        ```
    - **Date:** TBD

---

### **Phase 2: Create Custom Hooks**

- ❌ **Create useFlashcards Hook (READ)**
    - **Branch:** `react-query-hooks`
    - **Description:** Create custom hook for fetching all flashcards using React Query
    - **File to create:** [frontend/src/hooks/useFlashcards.ts](../frontend/src/hooks/useFlashcards.ts)
    - **Subtasks:**
        - ❌ Create `useFlashcards()` hook using `useQuery`
        - ❌ Set queryKey: `['flashcards']`
        - ❌ Call `getAllFlashcards(1, 1000)` in queryFn
        - ❌ Use `select` option to transform gRPC response to ChineseCardData
        - ❌ Export hook for use in components
    - **Example:**
        ```typescript
        import { useQuery } from '@tanstack/react-query';
        import { getAllFlashcards } from '@/services/chineseFlashcardGrpcService';
        import { ChineseCardData } from '@/components/FlashCard/Language/ChineseCard';

        export function useFlashcards() {
          return useQuery({
            queryKey: ['flashcards'],
            queryFn: () => getAllFlashcards(1, 1000),
            select: (response) => {
              return response.getFlashcardsList().map(card => ({
                id: card.getId(),
                chineseWord: card.getChineseword(),
                englishWord: card.getEnglishword(),
                pinyin: card.getPinyin(),
                img: card.getImg()
              }));
            }
          });
        }
        ```
    - **Date:** TBD

- ❌ **Create useAddFlashcard Hook (CREATE)**
    - **Branch:** `react-query-hooks`
    - **Description:** Create custom hook for adding flashcards with automatic cache invalidation
    - **File to modify:** [frontend/src/hooks/useFlashcards.ts](../frontend/src/hooks/useFlashcards.ts)
    - **Subtasks:**
        - ❌ Create `useAddFlashcard()` hook using `useMutation`
        - ❌ Call `createFlashcard()` in mutationFn
        - ❌ Invalidate `['flashcards']` query on success
        - ❌ Add optimistic update logic (optional enhancement)
    - **Example:**
        ```typescript
        export function useAddFlashcard() {
          const queryClient = useQueryClient();

          return useMutation({
            mutationFn: createFlashcard,
            onSuccess: () => {
              queryClient.invalidateQueries(['flashcards']);
            }
          });
        }
        ```
    - **Date:** TBD

- ❌ **Create useUpdateFlashcard Hook (UPDATE)**
    - **Branch:** `react-query-hooks`
    - **Description:** Create custom hook for updating flashcards
    - **File to modify:** [frontend/src/hooks/useFlashcards.ts](../frontend/src/hooks/useFlashcards.ts)
    - **Subtasks:**
        - ❌ Create `useUpdateFlashcard()` hook using `useMutation`
        - ❌ Call `updateFlashcard(id, data)` in mutationFn
        - ❌ Invalidate `['flashcards']` query on success
        - ❌ Add optimistic update logic (optional enhancement)
    - **Example:**
        ```typescript
        export function useUpdateFlashcard() {
          const queryClient = useQueryClient();

          return useMutation({
            mutationFn: ({ id, data }) => updateFlashcard(id, data),
            onSuccess: () => {
              queryClient.invalidateQueries(['flashcards']);
            }
          });
        }
        ```
    - **Date:** TBD

- ❌ **Create useDeleteFlashcard Hook (DELETE)**
    - **Branch:** `react-query-hooks`
    - **Description:** Create custom hook for deleting flashcards
    - **File to modify:** [frontend/src/hooks/useFlashcards.ts](../frontend/src/hooks/useFlashcards.ts)
    - **Subtasks:**
        - ❌ Create `useDeleteFlashcard()` hook using `useMutation`
        - ❌ Call `deleteFlashcard(id)` in mutationFn
        - ❌ Invalidate `['flashcards']` query on success
    - **Example:**
        ```typescript
        export function useDeleteFlashcard() {
          const queryClient = useQueryClient();

          return useMutation({
            mutationFn: deleteFlashcard,
            onSuccess: () => {
              queryClient.invalidateQueries(['flashcards']);
            }
          });
        }
        ```
    - **Date:** TBD

---

### **Phase 3: Migrate ChineseVocabCollection**

- ❌ **Replace Manual State with React Query Hooks**
    - **Branch:** `react-query-migration`
    - **Description:** Refactor ChineseVocabCollection to use React Query hooks instead of manual useState/useEffect
    - **File to modify:** [frontend/src/Pages/FlashCard/VocabCollections/ChineseVocabCollection.tsx](../frontend/src/Pages/FlashCard/VocabCollections/ChineseVocabCollection.tsx)
    - **Subtasks:**
        - ❌ Remove manual state: `useState<ChineseCardData[]>([])`, `useState(loading)`, `useState(error)`
        - ❌ Remove `useEffect` for fetching cards
        - ❌ Import and use `useFlashcards()` hook
        - ❌ Replace `handleAddVocab` logic with `useAddFlashcard()` mutation
        - ❌ Replace `handleDeleteVocab` logic with `useDeleteFlashcard()` mutation
        - ❌ Update render props to use React Query states: `isLoading`, `error`
        - ❌ Simplify error handling (React Query handles retries automatically)
    - **Before (Current):**
        ```typescript
        const [cards, setCards] = useState<ChineseCardData[]>([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState<string | null>(null);

        useEffect(() => {
          fetchChineseCards()
            .then(data => setCards(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
        }, []);
        ```
    - **After (React Query):**
        ```typescript
        const { data: cards = [], isLoading, error } = useFlashcards();
        const addCard = useAddFlashcard();
        const deleteCard = useDeleteFlashcard();
        ```
    - **Date:** TBD

- ❌ **Update Add/Delete Handlers**
    - **Branch:** `react-query-migration`
    - **Description:** Simplify CRUD handlers using mutation hooks
    - **File to modify:** [frontend/src/Pages/FlashCard/VocabCollections/ChineseVocabCollection.tsx](../frontend/src/Pages/FlashCard/VocabCollections/ChineseVocabCollection.tsx)
    - **Subtasks:**
        - ❌ Update `handleAddVocab` to use `addCard.mutate()`
        - ❌ Remove manual state updates (React Query handles cache automatically)
        - ❌ Update `handleDeleteVocab` to use `deleteCard.mutate()`
        - ❌ Remove manual error handling (use mutation.isError)
        - ❌ Add loading states from mutations (`addCard.isLoading`)
    - **Before:**
        ```typescript
        const handleAddVocab = async (vocab) => {
          const newCard = await addChineseCard(vocab);
          setCards([...cards, newCard]);
        };
        ```
    - **After:**
        ```typescript
        const handleAddVocab = (vocab) => {
          addCard.mutate({
            chineseWord: vocab.native,
            englishWord: vocab.translation,
            pinyin: vocab.pronunciation
          });
        };
        ```
    - **Date:** TBD

---

### **Phase 4: Testing & Optimization**

- ❌ **Test Basic Functionality**
    - **Branch:** `react-query-migration`
    - **Description:** Verify all CRUD operations work with React Query
    - **Subtasks:**
        - ❌ Start backend: `gradle run` (port 8080)
        - ❌ Start frontend: `npm start` (port 3000)
        - ❌ Test: Fetch flashcards on page load
        - ❌ Test: Add new flashcard → verify auto-refetch
        - ❌ Test: Delete flashcard → verify auto-refetch
        - ❌ Test: Update flashcard → verify auto-refetch
        - ❌ Open React Query DevTools → verify queries/mutations appear
        - ❌ Test: Switch browser tabs → verify refetch on focus
        - ❌ Test: Disable network → verify retry logic
    - **Date:** TBD

- ❌ **Add Optimistic Updates (Optional Enhancement)**
    - **Branch:** `react-query-optimistic`
    - **Description:** Implement optimistic UI updates for instant feedback
    - **Subtasks:**
        - ❌ Add optimistic update to `useAddFlashcard` (show card immediately)
        - ❌ Add rollback logic on error
        - ❌ Add optimistic update to `useDeleteFlashcard` (remove card immediately)
        - ❌ Test: Verify cards appear/disappear instantly
        - ❌ Test: Verify rollback on network error
    - **Date:** TBD

- ❌ **Performance Testing**
    - **Branch:** `react-query-migration`
    - **Description:** Compare performance before/after React Query migration
    - **Subtasks:**
        - ❌ Measure initial page load time (before vs after)
        - ❌ Measure bundle size increase (~13 KB expected)
        - ❌ Test cache hit rate (multiple components accessing same data)
        - ❌ Verify no unnecessary re-renders (use React DevTools Profiler)
        - ❌ Document performance metrics
    - **Date:** TBD

---

### **Phase 5: Cleanup & Documentation**

- ❌ **Remove Old Code**
    - **Branch:** `react-query-migration`
    - **Description:** Clean up manual state management code
    - **Subtasks:**
        - ❌ Remove unused `useState` calls from ChineseVocabCollection
        - ❌ Remove manual `useEffect` for fetching
        - ❌ Remove manual error/loading state management
        - ❌ Verify no other components use old pattern
        - ❌ Delete or mark as deprecated: [chineseCardService.ts](../frontend/src/services/chineseCardService.ts) (if not already done)
    - **Date:** TBD

- ❌ **Update Documentation**
    - **Branch:** `react-query-migration`
    - **Description:** Document React Query integration
    - **Subtasks:**
        - ❌ Update README.md with React Query setup instructions
        - ❌ Document custom hooks in [hooks/useFlashcards.ts](../frontend/src/hooks/useFlashcards.ts)
        - ❌ Add code comments explaining query keys and invalidation
        - ❌ Update [tech_doc/FLASHCARD_FEATURE.md](../tech_doc/FLASHCARD_FEATURE.md) with React Query architecture
        - ❌ Create migration guide for other features
    - **Date:** TBD

---

## Benefits of Migration

### User Experience
- ✅ **Instant UI feedback** - Optimistic updates show changes immediately
- ✅ **Always fresh data** - Automatic refetch on tab focus/reconnect
- ✅ **Better error handling** - Automatic retries with exponential backoff
- ✅ **Offline-first UX** - Queue mutations when offline, sync when online

### Developer Experience
- ✅ **Less boilerplate** - No manual loading/error state management
- ✅ **Automatic caching** - Share data across components without prop drilling
- ✅ **DevTools** - Debug queries and cache easily
- ✅ **Type-safe** - Full TypeScript support

### Code Quality
- ✅ **Reduced lines of code** - 30-50% less code for data fetching
- ✅ **Separation of concerns** - Data fetching logic in custom hooks
- ✅ **Easier testing** - Mock queries easily with `react-query/testing`

---

## Trade-offs

### Pros
- ✅ Industry-standard solution (used by Microsoft, Amazon, Google)
- ✅ Automatic caching and refetching
- ✅ Excellent TypeScript support
- ✅ Great documentation and community

### Cons
- ❌ +13 KB bundle size (gzipped)
- ❌ Learning curve for team members unfamiliar with React Query
- ❌ Migration effort (estimated 2-4 hours)
- ❌ Additional dependency to maintain

---

## Success Criteria

- ✅ All CRUD operations work without breaking existing UX
- ✅ No performance regression (page load time, bundle size acceptable)
- ✅ DevTools working and queryKey strategy documented
- ✅ Automatic refetching working (window focus, reconnect)
- ✅ Error handling and retry logic working
- ✅ Code review approved by team
- ✅ Documentation updated

---

## Related Files

- Technical Documentation: [tech_doc/REACT_QUERY.md](../tech_doc/REACT_QUERY.md)
- Current Implementation: [frontend/src/Pages/FlashCard/VocabCollections/ChineseVocabCollection.tsx](../frontend/src/Pages/FlashCard/VocabCollections/ChineseVocabCollection.tsx)
- gRPC Service: [frontend/src/services/chineseFlashcardGrpcService.ts](../frontend/src/services/chineseFlashcardGrpcService.ts)
- Main Task File: [tasks/FLASHCARD_TASK.md](../tasks/FLASHCARD_TASK.md)

---

**Last Updated:** November 15, 2025
