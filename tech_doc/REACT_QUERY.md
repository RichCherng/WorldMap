# React Query (TanStack Query) - Technical Documentation

**Created:** November 15, 2025
**Status:** Reference Documentation
**Official Docs:** https://tanstack.com/query/latest

---

## Overview

**React Query** (now **TanStack Query**) is a powerful data-fetching and server state management library for React applications. It provides automatic caching, background refetching, optimistic updates, and eliminates the need to manually manage loading/error states.

### Key Problem It Solves

Traditional React treats server data like client state (using `useState`), which leads to:
- Manual cache management
- Stale data issues
- Repetitive loading/error state code
- No automatic refetching
- Complex optimistic update logic

React Query treats **server state** as fundamentally different from **client state**, providing a declarative API for data fetching.

---

## Installation

```bash
npm install @tanstack/react-query
# or
yarn add @tanstack/react-query
```

**Bundle Size:** ~13 KB gzipped
**Dependencies:** None (peer dependency: React 16.8+)

---

## Core Concepts

### 1. Server State vs. Client State

**Server State:**
- Data that lives on the server (database, API)
- Needs to be fetched, cached, synchronized
- Can become stale and needs refetching
- Examples: Flashcards from backend, user profile, product list

**Client State:**
- UI-only state (form inputs, modal open/closed, selected tab)
- Lives only in the browser
- Managed by `useState`, `useReducer`, or other state tools

**React Query manages server state. Use `useState` for client state.**

---

### 2. Query Keys

Query keys uniquely identify queries and are used for caching, refetching, and invalidation.

```typescript
// Simple key
useQuery({ queryKey: ['flashcards'], queryFn: getAllFlashcards });

// Key with parameters
useQuery({ queryKey: ['flashcard', id], queryFn: () => getFlashcardById(id) });

// Hierarchical keys
useQuery({ queryKey: ['flashcards', 'chinese', { page: 1 }], queryFn: fetchChinese });

// Key format: [scope, identifier, filters/params]
```

**Best Practice:** Use array format with hierarchical structure for easy invalidation.

---

### 3. useQuery Hook

Fetches data and provides automatic caching, refetching, and state management.

```typescript
const {
  data,           // The fetched data
  isLoading,      // Initial loading state (no cached data)
  isFetching,     // Any fetch (initial or background)
  isError,        // Error occurred
  error,          // Error object
  isSuccess,      // Data successfully fetched
  refetch         // Manual refetch function
} = useQuery({
  queryKey: ['flashcards'],
  queryFn: () => getAllFlashcards(1, 1000),
  staleTime: 5 * 60 * 1000,      // Data fresh for 5 minutes
  cacheTime: 10 * 60 * 1000,     // Cache persists for 10 minutes
  refetchOnWindowFocus: true,    // Refetch when user returns to tab
  refetchOnReconnect: true,      // Refetch when internet reconnects
  retry: 3,                      // Retry failed requests 3 times
  enabled: true                  // Run query immediately (or conditionally)
});
```

---

### 4. useMutation Hook

Handles create, update, delete operations with automatic cache invalidation.

```typescript
const mutation = useMutation({
  mutationFn: createFlashcard,
  onSuccess: () => {
    // Invalidate and refetch flashcards after creating new one
    queryClient.invalidateQueries(['flashcards']);
  },
  onError: (error) => {
    console.error('Failed to create flashcard:', error);
  }
});

// Usage
mutation.mutate(newFlashcard);
```

---

## Key Features

### 1. Automatic Caching

```typescript
// Component A fetches flashcards
function FlashCardPage() {
  const { data } = useQuery({ queryKey: ['flashcards'], queryFn: getAllFlashcards });
  // Makes API call, caches result
}

// Component B uses same data (NO additional API call!)
function FlashCardStats() {
  const { data } = useQuery({ queryKey: ['flashcards'], queryFn: getAllFlashcards });
  // Uses cached data instantly!
}
```

**Result:** Single API call, multiple components access cached data.

---

### 2. Automatic Background Refetching

React Query automatically refetches data when:
- User returns to browser tab (`refetchOnWindowFocus`)
- Internet connection is restored (`refetchOnReconnect`)
- Query becomes stale after `staleTime`
- Periodic polling (`refetchInterval`)

```typescript
const { data } = useQuery({
  queryKey: ['flashcards'],
  queryFn: getAllFlashcards,
  staleTime: 5 * 60 * 1000,      // Fresh for 5 minutes
  refetchOnWindowFocus: true,     // Refetch on tab focus
  refetchInterval: 30000          // Poll every 30 seconds (optional)
});
```

**Use case:** User opens flashcard app, switches tabs for 10 minutes, returns → data automatically refreshes.

---

### 3. Optimistic Updates

Update UI immediately before server responds, rollback on error.

```typescript
const addFlashcard = useMutation({
  mutationFn: createFlashcard,

  onMutate: async (newCard) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries(['flashcards']);

    // Get current flashcards
    const previousCards = queryClient.getQueryData(['flashcards']);

    // Optimistically update cache
    queryClient.setQueryData(['flashcards'], (old) => [...old, newCard]);

    // Return context for rollback
    return { previousCards };
  },

  onError: (err, newCard, context) => {
    // Rollback on error
    queryClient.setQueryData(['flashcards'], context.previousCards);
  },

  onSettled: () => {
    // Refetch to sync with server
    queryClient.invalidateQueries(['flashcards']);
  }
});
```

**User Experience:** Card appears instantly, syncs with server in background.

---

### 4. Loading & Error States

Built-in state management eliminates manual `useState` for loading/error.

```typescript
const { data, isLoading, isError, error, isFetching } = useQuery({
  queryKey: ['flashcards'],
  queryFn: getAllFlashcards
});

if (isLoading) return <Spinner />; // Initial load
if (isError) return <Error message={error.message} />;

return <CardStack cards={data} />;
```

**States:**
- `isLoading` - Initial fetch (no cached data)
- `isFetching` - Any fetch (initial or background)
- `isRefetching` - Background refetch specifically
- `isError` - Error occurred
- `isSuccess` - Data successfully fetched

---

### 5. Pagination & Infinite Scrolling

```typescript
// Infinite scrolling
const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage
} = useInfiniteQuery({
  queryKey: ['flashcards'],
  queryFn: ({ pageParam = 1 }) => getAllFlashcards(pageParam, 20),
  getNextPageParam: (lastPage, pages) => {
    return lastPage.hasMore ? pages.length + 1 : undefined;
  }
});

// Load more button
<button onClick={fetchNextPage} disabled={!hasNextPage}>
  {isFetchingNextPage ? 'Loading...' : 'Load More'}
</button>
```

---

### 6. Dependent Queries

Run queries conditionally based on other data.

```typescript
// Fetch user first
const user = useQuery(['user'], getUser);

// Only fetch flashcards after user loaded
const flashcards = useQuery(
  ['flashcards', user.data?.id],
  () => getFlashcardsForUser(user.data.id),
  { enabled: !!user.data } // Only run if user.data exists
);
```

---

## Setup

### 1. Create QueryClient

```typescript
// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,     // 5 minutes
      cacheTime: 10 * 60 * 1000,    // 10 minutes
      retry: 3,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FlashCardPage />
      <ReactQueryDevtools initialIsOpen={false} /> {/* Dev tools */}
    </QueryClientProvider>
  );
}
```

---

### 2. Create Custom Hooks

Encapsulate query logic in custom hooks for reusability.

```typescript
// hooks/useFlashcards.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllFlashcards, createFlashcard, updateFlashcard, deleteFlashcard } from '@/services/chineseFlashcardGrpcService';

export function useFlashcards() {
  return useQuery({
    queryKey: ['flashcards'],
    queryFn: () => getAllFlashcards(1, 1000),
    select: (response) => {
      // Transform gRPC response to ChineseCardData
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

export function useAddFlashcard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFlashcard,
    onSuccess: () => {
      queryClient.invalidateQueries(['flashcards']);
    }
  });
}

export function useUpdateFlashcard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateFlashcard(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['flashcards']);
    }
  });
}

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

---

### 3. Use in Components

```typescript
// FlashCardPage.tsx
import { useFlashcards, useAddFlashcard, useDeleteFlashcard } from '@/hooks/useFlashcards';

function FlashCardPage() {
  const { data: cards = [], isLoading, error } = useFlashcards();
  const addCard = useAddFlashcard();
  const deleteCard = useDeleteFlashcard();

  if (isLoading) return <Spinner />;
  if (error) return <Error message={error.message} />;

  return (
    <div>
      <CardStack cards={cards} />

      <button
        onClick={() => addCard.mutate(newCardData)}
        disabled={addCard.isLoading}
      >
        {addCard.isLoading ? 'Adding...' : 'Add Card'}
      </button>

      {addCard.isError && <Error message={addCard.error.message} />}
    </div>
  );
}
```

---

## Best Practices

### 1. Use Query Keys Consistently

```typescript
// ✅ Good - Hierarchical, predictable
['flashcards']
['flashcards', 'chinese']
['flashcards', 'chinese', { filter: 'hsk1' }]
['flashcard', id]

// ❌ Bad - Inconsistent, hard to invalidate
['getFlashcards']
['flashcard_list']
[{ type: 'flashcards' }]
```

### 2. Extract to Custom Hooks

Don't use `useQuery` directly in components. Create custom hooks for reusability.

### 3. Handle Loading States Properly

```typescript
// ✅ Good - Check both loading and error
if (isLoading) return <Spinner />;
if (isError) return <Error />;
return <CardStack cards={data} />;

// ❌ Bad - No loading state
return <CardStack cards={data || []} />;
```

### 4. Invalidate Queries After Mutations

Always invalidate relevant queries after create/update/delete.

```typescript
// ✅ Good
onSuccess: () => {
  queryClient.invalidateQueries(['flashcards']);
}

// ❌ Bad - No invalidation, stale data
onSuccess: () => {
  console.log('Card created');
}
```

### 5. Use Select for Data Transformation

Transform data in `select` option, not in components.

```typescript
// ✅ Good - Transform in query
useQuery({
  queryKey: ['flashcards'],
  queryFn: getAllFlashcards,
  select: (data) => data.map(transformCard)
});

// ❌ Bad - Transform in component (runs on every render)
const { data } = useQuery(['flashcards'], getAllFlashcards);
const transformed = data?.map(transformCard);
```

---

## When to Use React Query

### ✅ Use React Query When:

1. **Multiple API endpoints** - Fetching from many different APIs
2. **Real-time data** - Need automatic background refetching
3. **Collaborative apps** - Multiple users, data changes frequently
4. **Complex caching** - Need fine-grained cache control
5. **Optimistic updates** - Want instant UI feedback
6. **Offline support** - Need retry logic and queue mutations

### ❌ Don't Use React Query When:

1. **Simple CRUD app** - Just fetching data once per page load
2. **Single API call** - Only one fetch operation
3. **Static data** - Data rarely changes
4. **Over-engineering** - Adding complexity for no benefit

---

## React Query vs. Manual State Management

| Feature | Manual (`useState`) | React Query |
|---------|---------------------|-------------|
| **Caching** | Manual implementation | Automatic |
| **Refetching** | Manual `useEffect` | Automatic (window focus, reconnect) |
| **Loading states** | Manual `useState(loading)` | Built-in `isLoading` |
| **Error handling** | Manual `try/catch` + `useState(error)` | Built-in `isError` |
| **Optimistic updates** | Manual state manipulation | Built-in with rollback |
| **Stale data** | Potential issue | Automatic invalidation |
| **Bundle size** | ~0 KB | ~13 KB (gzipped) |
| **Setup complexity** | Low | Medium |
| **Learning curve** | Easy | Medium |
| **Code maintainability** | More boilerplate | Less boilerplate |

---

## Debugging with DevTools

React Query includes powerful DevTools for debugging queries and mutations.

```typescript
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

<QueryClientProvider client={queryClient}>
  <App />
  <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
</QueryClientProvider>
```

**Features:**
- View all queries and their states
- See cached data
- Manually trigger refetch
- View query timelines
- Inspect mutations

---

## Common Patterns

### Pattern 1: Prefetching Data

```typescript
// Prefetch flashcards on hover
const queryClient = useQueryClient();

<Link
  to="/flashcards"
  onMouseEnter={() => {
    queryClient.prefetchQuery(['flashcards'], getAllFlashcards);
  }}
>
  Go to Flashcards
</Link>
```

### Pattern 2: Polling

```typescript
// Poll for new flashcards every 30 seconds
useQuery({
  queryKey: ['flashcards'],
  queryFn: getAllFlashcards,
  refetchInterval: 30000 // 30 seconds
});
```

### Pattern 3: Conditional Fetching

```typescript
// Only fetch if user is logged in
const { data } = useQuery({
  queryKey: ['flashcards'],
  queryFn: getAllFlashcards,
  enabled: !!user.isLoggedIn
});
```

---

## Migration Guide

### From Manual State to React Query

**Before:**
```typescript
const [cards, setCards] = useState<ChineseCardData[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  setLoading(true);
  getAllFlashcards(1, 1000)
    .then(response => {
      const mapped = response.getFlashcardsList().map(mapCard);
      setCards(mapped);
    })
    .catch(err => setError(err.message))
    .finally(() => setLoading(false));
}, []);
```

**After:**
```typescript
const { data: cards = [], isLoading, error } = useQuery({
  queryKey: ['flashcards'],
  queryFn: () => getAllFlashcards(1, 1000),
  select: (response) => response.getFlashcardsList().map(mapCard)
});
```

**Lines of Code:** 16 → 6
**Manual State:** 3 `useState` → 0
**Error Handling:** Manual `try/catch` → Built-in
**Caching:** None → Automatic

---

## Performance Optimization

### 1. Parallel Queries

Fetch multiple queries simultaneously.

```typescript
// Both queries run in parallel
const flashcards = useQuery(['flashcards'], getAllFlashcards);
const userStats = useQuery(['stats'], getUserStats);
```

### 2. Selective Refetching

Only refetch what's needed.

```typescript
// Refetch only flashcards, not all queries
queryClient.invalidateQueries(['flashcards']);

// Refetch specific flashcard
queryClient.invalidateQueries(['flashcard', id]);
```

### 3. Structural Sharing

React Query uses structural sharing to minimize re-renders.

```typescript
// If data hasn't changed, component doesn't re-render
const { data } = useQuery(['flashcards'], getAllFlashcards);
```

---

## References

- **Official Docs:** https://tanstack.com/query/latest
- **GitHub:** https://github.com/TanStack/query
- **Examples:** https://tanstack.com/query/latest/docs/react/examples
- **Video Tutorial:** https://www.youtube.com/watch?v=DocXo3gqGdI (Tanner Linsley)

---

## Related Files

- Task File: [tasks/REACTQUERY_TASK.md](../tasks/REACTQUERY_TASK.md)
- Current Implementation: [frontend/src/Pages/FlashCard/VocabCollections/ChineseVocabCollection.tsx](../frontend/src/Pages/FlashCard/VocabCollections/ChineseVocabCollection.tsx)
- gRPC Service: [frontend/src/services/chineseFlashcardGrpcService.ts](../frontend/src/services/chineseFlashcardGrpcService.ts)

---

**Last Updated:** November 15, 2025
