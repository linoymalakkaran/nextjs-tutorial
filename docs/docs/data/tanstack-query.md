---
title: TanStack Query
---

# TanStack Query (React Query)

## Purpose
TanStack Query is a powerful data fetching and caching library for React applications. It manages server state, providing automatic caching, background refetching, and optimistic updates.

## Why Use TanStack Query?

### Benefits
- **Automatic Caching**: Smart caching with configurable strategies
- **Background Refetching**: Keep data fresh automatically
- **Optimistic Updates**: Update UI before server responds
- **Retry Logic**: Automatic retries on failure
- **Loading/Error States**: Built-in state management
- **Pagination/Infinite Scroll**: First-class support
- **Devtools**: Powerful debugging tools

## When to Use

### ✅ Use TanStack Query For:
- **Client-Side Data Fetching**: Fetching data in Client Components
- **Real-time Data**: Data that changes frequently
- **User-Specific Data**: Data based on user interactions
- **Infinite Scroll**: Paginated data loading
- **Mutations with Optimistic Updates**: Like buttons, favorites
- **Complex Caching**: When you need fine-grained cache control
- **API Integrations**: REST APIs, GraphQL endpoints

### ❌ Don't Use TanStack Query For:
- **Initial Page Data**: Use Server Components for SSR
- **Static Data**: Data that rarely changes
- **Simple Forms**: Use Server Actions for simpler mutations
- **SEO-Critical Content**: Use Server Components for better SEO

## Use Cases

### 1. User Dashboard with Live Data
```tsx
'use client'
import { useQuery } from '@tanstack/react-query'

export default function Dashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const res = await fetch('/api/dashboard')
      return res.json()
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  })
  
  if (isLoading) return <Skeleton />
  if (error) return <Error />
  return <DashboardView data={data} />
}
```

### 2. Social Media Feed with Optimistic Updates
```tsx
const { mutate } = useMutation({
  mutationFn: (postId) => fetch(`/api/posts/${postId}/like`, { method: 'POST' }),
  onMutate: async (postId) => {
    // Optimistically update UI
    await queryClient.cancelQueries({ queryKey: ['posts'] })
    const previousPosts = queryClient.getQueryData(['posts'])
    
    queryClient.setQueryData(['posts'], (old) =>
      old.map(post =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    )
    
    return { previousPosts }
  },
  onError: (err, postId, context) => {
    // Rollback on error
    queryClient.setQueryData(['posts'], context.previousPosts)
  },
})
```

### 3. Infinite Scroll Product List
```tsx
const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage
} = useInfiniteQuery({
  queryKey: ['products'],
  queryFn: ({ pageParam = 0 }) =>
    fetch(`/api/products?page=${pageParam}`).then(res => res.json()),
  getNextPageParam: (lastPage) => lastPage.nextPage,
})
```

## Core Concepts

### QueryKey
Unique identifier for cached data:
```tsx
queryKey: ['posts'] // All posts
queryKey: ['posts', postId] // Specific post
queryKey: ['posts', { status: 'published' }] // Filtered posts
```

### QueryFn
Function that fetches your data:
```tsx
queryFn: async () => {
  const response = await fetch('/api/data')
  if (!response.ok) throw new Error('Failed')
  return response.json()
}
```

### Stale Time
How long data is considered fresh:
```tsx
staleTime: 5 * 60 * 1000 // 5 minutes
```

### Cache Time (gcTime)
How long unused data stays in cache:
```tsx
gcTime: 10 * 60 * 1000 // 10 minutes
```

## Key Hooks

### useQuery - Data Fetching
```tsx
const { data, isLoading, error, refetch } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  staleTime: 60000,
})
```

### useMutation - Data Updates
```tsx
const mutation = useMutation({
  mutationFn: createTodo,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] })
  },
})

mutation.mutate({ title: 'New Todo' })
```

### useInfiniteQuery - Pagination
```tsx
const {
  data,
  fetchNextPage,
  hasNextPage
} = useInfiniteQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  getNextPageParam: (lastPage) => lastPage.nextCursor,
})
```

## Caching Strategies

### 1. Stale While Revalidate
```tsx
useQuery({
  queryKey: ['data'],
  queryFn: fetchData,
  staleTime: 5 * 60 * 1000, // 5 min fresh
  gcTime: 10 * 60 * 1000, // 10 min in cache
})
```

### 2. Polling/Refetching
```tsx
useQuery({
  queryKey: ['data'],
  queryFn: fetchData,
  refetchInterval: 30000, // Every 30 seconds
  refetchOnWindowFocus: true, // On tab focus
})
```

### 3. Manual Refetch
```tsx
const { refetch } = useQuery({ queryKey: ['data'], queryFn: fetchData })

<button onClick={() => refetch()}>Refresh</button>
```

## Comparison

| Feature | TanStack Query | Server Components | useState + useEffect |
|---------|---------------|-------------------|---------------------|
| Caching | ✅ Automatic | ✅ Built-in | ❌ Manual |
| Loading States | ✅ Built-in | ⚠️ Suspense | ❌ Manual |
| Refetching | ✅ Automatic | ❌ On navigation | ❌ Manual |
| Optimistic Updates | ✅ Built-in | ❌ Complex | ❌ Complex |
| SSR | ⚠️ Requires setup | ✅ Native | ❌ No |
| Client-side | ✅ Perfect | ❌ Server-only | ✅ Yes |

## Best Practices

1. **Use Query Keys Wisely**: Create consistent, hierarchical query keys
```tsx
['users'] // All users
['users', userId] // Single user
['users', userId, 'posts'] // User's posts
```

2. **Set Appropriate Stale Times**: Balance freshness and performance
```tsx
staleTime: 0, // Always refetch (live data)
staleTime: 30000, // 30 seconds (frequently changing)
staleTime: 5 * 60 * 1000, // 5 minutes (stable data)
staleTime: Infinity, // Never stale (static data)
```

3. **Invalidate on Mutations**: Keep data in sync
```tsx
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ['users'] })
}
```

4. **Use Optimistic Updates**: Better UX for mutations
5. **Enable Devtools**: Use React Query Devtools in development
6. **Handle Errors Gracefully**: Show meaningful error messages
7. **Prefetch Data**: Prefetch data for better UX
```tsx
await queryClient.prefetchQuery({ queryKey: ['post', id], queryFn: fetchPost })
```

## Advanced Patterns

### Dependent Queries
```tsx
const { data: user } = useQuery({ queryKey: ['user'], queryFn: fetchUser })

const { data: posts } = useQuery({
  queryKey: ['posts', user?.id],
  queryFn: () => fetchUserPosts(user.id),
  enabled: !!user, // Only run when user exists
})
```

### Parallel Queries
```tsx
const users = useQuery({ queryKey: ['users'], queryFn: fetchUsers })
const posts = useQuery({ queryKey: ['posts'], queryFn: fetchPosts })
const comments = useQuery({ queryKey: ['comments'], queryFn: fetchComments })
```

### Query Cancellation
```tsx
queryFn: async ({ signal }) => {
  const response = await fetch('/api/data', { signal })
  return response.json()
}
```

## Performance Tips

1. **Select Transformations**: Transform data efficiently
```tsx
useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  select: (data) => data.filter(todo => !todo.completed),
})
```

2. **Structural Sharing**: Automatically prevents unnecessary re-renders
3. **Query Splitting**: Split large queries into smaller ones
4. **Disable Queries**: Disable queries when not needed
```tsx
enabled: isAuthenticated && userId !== null
```

## Learn More
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [TanStack Query Devtools](https://tanstack.com/query/latest/docs/devtools)
