# Client Components

## Purpose
Client Components are React components that run in the browser. They enable interactivity, state management, and access to browser APIs.

## Why Use Client Components?

### Benefits
- **Interactivity**: Handle user interactions (clicks, typing, etc.)
- **State Management**: Use React hooks (useState, useEffect, etc.)
- **Browser APIs**: Access localStorage, geolocation, etc.
- **Real-time Updates**: WebSockets, subscriptions, live data
- **Animations**: Complex UI animations and transitions

## When to Use

### ✅ Use Client Components For:
- **Forms**: Input fields, form validation, submission
- **Interactive Widgets**: Carousels, modals, dropdowns, tabs
- **State Management**: Shopping carts, user preferences
- **Event Handlers**: onClick, onChange, onSubmit
- **Browser APIs**: localStorage, sessionStorage, geolocation
- **Third-party Libraries**: Many React libraries require client-side rendering

### ❌ Don't Use Client Components For:
- **Static Content**: Blog posts, documentation
- **Data Fetching (Initial)**: Use Server Components for initial data
- **SEO-Critical Content**: Use Server Components for better SEO

## Use Cases

### 1. Form with Validation
```tsx
'use client'
import { useState } from 'react'

export default function ContactForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.includes('@')) {
      setError('Invalid email')
      return
    }
    // Submit form
  }
  
  return <form onSubmit={handleSubmit}>...</form>
}
```

### 2. Interactive Counter
```tsx
'use client'
import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}
```

### 3. Theme Switcher
```tsx
'use client'
import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light')
  
  useEffect(() => {
    document.body.className = theme
  }, [theme])
  
  return <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
    Toggle Theme
  </button>
}
```

## Key Features

### The 'use client' Directive
Mark a component as a Client Component:
```tsx
'use client' // Must be at the top of the file

export default function MyComponent() {
  const [state, setState] = useState(0)
  return <div onClick={() => setState(s => s + 1)}>{state}</div>
}
```

### React Hooks
Full access to all React hooks:
- useState
- useEffect
- useContext
- useReducer
- useCallback
- useMemo
- useRef
- Custom hooks

### Browser APIs
Access to all browser APIs:
- localStorage/sessionStorage
- window, document
- fetch (client-side)
- Geolocation
- WebSockets

## Comparison

| Feature | Server Component | Client Component |
|---------|-----------------|------------------|
| `'use client'` | ❌ Not needed | ✅ Required |
| JavaScript Bundle | ❌ No | ✅ Yes |
| Can use hooks | ❌ No | ✅ Yes |
| Can be async | ✅ Yes | ❌ No |
| Event handlers | ❌ No | ✅ Yes |
| Browser APIs | ❌ No | ✅ Yes |

## Best Practices

1. **Add 'use client' at the Top**: Always add the directive at the very top
2. **Keep Components Small**: Split large components into smaller ones
3. **Push 'use client' Down**: Only mark interactive parts as client components
4. **Server Components as Props**: Pass Server Components as children/props
5. **Avoid Large Bundles**: Don't import heavy libraries unnecessarily

## Component Composition

### ✅ Good: Server Component wraps Client Component
```tsx
// app/page.tsx (Server Component)
import ClientButton from './ClientButton'

export default function Page() {
  const data = await fetchData() // Server-side
  return (
    <div>
      <h1>{data.title}</h1>
      <ClientButton /> {/* Interactive */}
    </div>
  )
}
```

### ✅ Good: Pass Server Component as children
```tsx
// ClientWrapper.tsx
'use client'

export default function ClientWrapper({ children }) {
  return <div className="interactive">{children}</div>
}

// page.tsx (Server Component)
<ClientWrapper>
  <ServerComponent /> {/* Still runs on server! */}
</ClientWrapper>
```

### ❌ Bad: Import Server Component in Client Component
```tsx
'use client'
import ServerComponent from './ServerComponent' // ❌ Will become client component

export default function MyComponent() {
  return <ServerComponent /> // Now runs on client
}
```

## Performance Tips

1. **Lazy Load**: Use dynamic imports for large client components
```tsx
const HeavyComponent = dynamic(() => import('./HeavyComponent'))
```

2. **Code Split**: Split large components into smaller chunks
3. **Memoize**: Use React.memo for expensive renders
4. **Debounce**: Debounce expensive operations (search, API calls)

## Learn More
- [Next.js Client Components Docs](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
- [React Hooks Documentation](https://react.dev/reference/react)
