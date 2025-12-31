---
title: Zustand State Management
---

# Zustand State Management

## Purpose
Zustand is a small, fast, and scalable state management solution for React. It provides a simple API for managing global state without the complexity of Redux or Context API.

## Why Use Zustand?

### Benefits
- **Minimal Boilerplate**: Create stores with just a few lines
- **No Context Provider**: Use stores directly without wrapping
- **TypeScript First**: Excellent TypeScript support
- **Small Bundle**: ~1KB gzipped
- **Middleware Support**: Built-in persist, devtools, immer
- **React 18 Ready**: Full support for concurrent features
- **No Re-render Issues**: Only subscribing components re-render

## When to Use

### ✅ Use Zustand For:
- **Global App State**: Theme, user preferences, auth status
- **Shopping Cart**: E-commerce cart management
- **UI State**: Modals, sidebars, notifications
- **Form State**: Complex multi-step forms
- **User Preferences**: Settings that persist across sessions
- **Client-side Cache**: Caching API responses
- **Cross-component Communication**: Sharing state without props

### ❌ Don't Use Zustand For:
- **Server State**: Use TanStack Query for API data
- **URL State**: Use Next.js routing (searchParams)
- **Local Component State**: Use useState for simple state
- **Form Inputs**: Use react-hook-form or native form state

## Use Cases

### 1. Global Theme Management
```tsx
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((state) => ({
        theme: state.theme === 'light' ? 'dark' : 'light'
      })),
    }),
    { name: 'theme-storage' }
  )
)

// Usage
function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore()
  return <button onClick={toggleTheme}>{theme}</button>
}
```

### 2. Shopping Cart
```tsx
interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  clearCart: () => void
  total: number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) => set((state) => ({
    items: [...state.items, item]
  })),
  removeItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  })),
  clearCart: () => set({ items: [] }),
  get total() {
    return get().items.reduce((sum, item) => sum + item.price, 0)
  },
}))
```

### 3. Authentication State
```tsx
export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
      isAuthenticated: () => get().token !== null,
    }),
    { name: 'auth-storage' }
  )
)
```

## Core Concepts

### Creating a Store
```tsx
import { create } from 'zustand'

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}))
```

### Using the Store
```tsx
function Counter() {
  // Subscribe to entire store
  const { count, increment } = useStore()
  
  // Or subscribe to specific values
  const count = useStore((state) => state.count)
  const increment = useStore((state) => state.increment)
  
  return <button onClick={increment}>{count}</button>
}
```

### TypeScript Support
```tsx
interface BearStore {
  bears: number
  increase: (by: number) => void
}

const useStore = create<BearStore>((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}))
```

## Middleware

### 1. Persist (localStorage)
```tsx
import { persist, createJSONStorage } from 'zustand/middleware'

const useStore = create(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
    }),
    {
      name: 'counter-storage', // localStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
)
```

### 2. Devtools
```tsx
import { devtools } from 'zustand/middleware'

const useStore = create(
  devtools((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
  }))
)
```

### 3. Immer (Immutability)
```tsx
import { immer } from 'zustand/middleware/immer'

const useStore = create(
  immer((set) => ({
    nested: { count: 0 },
    increment: () => set((state) => {
      state.nested.count++  // Mutate directly with immer
    }),
  }))
)
```

### 4. Combine Middleware
```tsx
const useStore = create(
  devtools(
    persist(
      immer((set) => ({
        // your state
      })),
      { name: 'storage' }
    )
  )
)
```

## Patterns

### Computed Values
```tsx
const useStore = create((set, get) => ({
  items: [],
  get total() {
    return get().items.reduce((sum, item) => sum + item.price, 0)
  },
}))
```

### Async Actions
```tsx
const useStore = create((set) => ({
  users: [],
  loading: false,
  fetchUsers: async () => {
    set({ loading: true })
    const users = await fetch('/api/users').then(r => r.json())
    set({ users, loading: false })
  },
}))
```

### Subscribe Outside Components
```tsx
const unsub = useStore.subscribe(
  (state) => state.count,
  (count) => console.log('Count changed:', count)
)

// Cleanup
unsub()
```

### Get State Outside Components
```tsx
const count = useStore.getState().count
useStore.getState().increment()
```

## Comparison

| Feature | Zustand | Redux | Context API | useState |
|---------|---------|-------|-------------|----------|
| Boilerplate | ✅ Minimal | ❌ Heavy | ⚠️ Medium | ✅ Minimal |
| Bundle Size | ✅ ~1KB | ❌ ~12KB | ✅ Built-in | ✅ Built-in |
| TypeScript | ✅ Excellent | ✅ Good | ⚠️ Manual | ✅ Good |
| Devtools | ✅ Yes | ✅ Yes | ❌ No | ❌ No |
| Learning Curve | ✅ Easy | ❌ Steep | ✅ Easy | ✅ Easy |
| Performance | ✅ Fast | ✅ Fast | ⚠️ Re-render issues | ✅ Fast |
| Middleware | ✅ Built-in | ✅ Many | ❌ No | ❌ No |
| Global State | ✅ Yes | ✅ Yes | ⚠️ Provider needed | ❌ Local only |

## Best Practices

1. **Keep Stores Focused**: One responsibility per store
```tsx
// Good: Separate stores
const useAuthStore = create(...)
const useCartStore = create(...)
const useThemeStore = create(...)

// Bad: One giant store
const useAppStore = create(...) // Everything in one
```

2. **Use Selectors**: Only subscribe to what you need
```tsx
// Good: Specific selector
const count = useStore((state) => state.count)

// Bad: Subscribe to everything
const { count } = useStore()
```

3. **Avoid Nested Objects**: Keep state flat when possible
```tsx
// Good: Flat
const useStore = create((set) => ({
  firstName: '',
  lastName: '',
  email: '',
}))

// Avoid: Deeply nested
const useStore = create((set) => ({
  user: {
    profile: {
      name: {
        first: '',
        last: ''
      }
    }
  }
}))
```

4. **Use TypeScript**: Get full type safety
5. **Name Actions Clearly**: Use verb-based names (add, remove, update)
6. **Persist Important Data**: Use persist middleware for user data
7. **Reset on Logout**: Clear sensitive data when user logs out

## Performance Tips

1. **Shallow Equality**: Use shallow for object comparisons
```tsx
import shallow from 'zustand/shallow'

const { x, y } = useStore(
  (state) => ({ x: state.x, y: state.y }),
  shallow
)
```

2. **Split Stores**: Multiple small stores perform better than one large store
3. **Batch Updates**: Group related updates
```tsx
set((state) => ({
  ...state,
  field1: value1,
  field2: value2,
}))
```

4. **Memoize Selectors**: For expensive computations
```tsx
const items = useStore(
  useCallback((state) => expensiveComputation(state.data), [])
)
```

## Learn More
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Zustand Examples](https://github.com/pmndrs/zustand/tree/main/examples)
