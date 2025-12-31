# Server Actions

## Purpose
Server Actions are asynchronous server-side functions that can be called directly from Client Components. They eliminate the need for creating API routes for simple form submissions and data mutations.

## Why Use Server Actions?

### Benefits
- **No API Routes Needed**: Call server functions directly from components
- **Progressive Enhancement**: Forms work without JavaScript
- **Automatic Serialization**: Data is automatically serialized/deserialized
- **Type-Safe**: Full TypeScript support with type inference
- **Built-in Revalidation**: Easily revalidate cached data
- **Secure**: Server code never exposed to client

## When to Use

### ✅ Use Server Actions For:
- **Form Submissions**: Contact forms, sign-up forms, settings
- **Data Mutations**: Create, update, delete operations
- **File Uploads**: Handle file uploads securely
- **Database Operations**: Insert, update, delete records
- **Revalidation**: Trigger cache revalidation after mutations
- **Protected Operations**: Operations requiring authentication

### ❌ Don't Use Server Actions For:
- **Data Fetching**: Use Server Components or TanStack Query instead
- **Real-time Updates**: Use WebSockets or polling
- **Complex APIs**: Use API routes for REST/GraphQL APIs
- **External Integrations**: Use API routes for better control

## Use Cases

### 1. Contact Form
```tsx
// actions.ts
'use server'

export async function submitContactForm(formData: FormData) {
  const email = formData.get('email')
  const message = formData.get('message')
  
  await sendEmail({ email, message })
  return { success: true }
}

// ContactForm.tsx
<form action={submitContactForm}>
  <input name="email" type="email" required />
  <textarea name="message" required />
  <button type="submit">Send</button>
</form>
```

### 2. Todo List (Create/Update/Delete)
```tsx
'use server'
import { revalidatePath } from 'next/cache'

export async function addTodo(formData: FormData) {
  const title = formData.get('title')
  await db.todo.create({ data: { title } })
  revalidatePath('/todos')
}

export async function toggleTodo(id: string) {
  await db.todo.update({
    where: { id },
    data: { completed: { not: true } }
  })
  revalidatePath('/todos')
}
```

### 3. User Settings Update
```tsx
'use server'

export async function updateSettings(userId: string, data: Settings) {
  await db.user.update({
    where: { id: userId },
    data
  })
  revalidatePath('/settings')
  return { success: true }
}
```

## Key Features

### The 'use server' Directive
Mark functions as Server Actions:
```tsx
'use server' // At top of file - all exports are Server Actions

export async function myAction() {
  // Server-side code
}

// Or inline:
export default function Component() {
  async function myAction() {
    'use server' // Inline Server Action
    // Server-side code
  }
  return <form action={myAction}>...</form>
}
```

### Progressive Enhancement
Forms work without JavaScript:
```tsx
// This form works even if JS is disabled!
<form action={serverAction}>
  <input name="email" />
  <button type="submit">Submit</button>
</form>
```

### Automatic Revalidation
```tsx
'use server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function updatePost(id: string, data: Post) {
  await db.post.update({ where: { id }, data })
  
  // Revalidate specific path
  revalidatePath('/posts')
  
  // Or revalidate by tag
  revalidateTag('posts')
}
```

## Form Handling Patterns

### 1. With useFormState (Next.js 14+)
```tsx
'use client'
import { useFormState } from 'react-dom'
import { submitForm } from './actions'

export default function Form() {
  const [state, formAction] = useFormState(submitForm, { message: '' })
  
  return (
    <form action={formAction}>
      <input name="email" />
      <button type="submit">Submit</button>
      {state.message && <p>{state.message}</p>}
    </form>
  )
}
```

### 2. With useFormStatus
```tsx
'use client'
import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  )
}
```

### 3. With useTransition
```tsx
'use client'
import { useTransition } from 'react'
import { deletePost } from './actions'

export default function DeleteButton({ id }) {
  const [isPending, startTransition] = useTransition()
  
  return (
    <button
      onClick={() => startTransition(() => deletePost(id))}
      disabled={isPending}
    >
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  )
}
```

## Validation & Error Handling

### With Zod
```tsx
'use server'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export async function register(formData: FormData) {
  const data = {
    email: formData.get('email'),
    password: formData.get('password')
  }
  
  const result = schema.safeParse(data)
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors }
  }
  
  await createUser(result.data)
  return { success: true }
}
```

## Comparison

| Feature | Server Actions | API Routes |
|---------|---------------|------------|
| Boilerplate | ✅ Minimal | ❌ More code |
| Type Safety | ✅ Excellent | ⚠️ Manual |
| Forms | ✅ Direct integration | ❌ Manual fetch |
| Progressive Enhancement | ✅ Yes | ❌ Requires JS |
| Revalidation | ✅ Built-in | ❌ Manual |
| Complex APIs | ❌ Limited | ✅ Full control |

## Best Practices

1. **Always Validate**: Never trust client data, validate on server
2. **Use FormData**: Leverage native FormData API
3. **Handle Errors**: Return error states, don't throw
4. **Revalidate**: Update cache after mutations
5. **Keep Functions Small**: One responsibility per action
6. **Use TypeScript**: Get full type safety
7. **Authentication**: Check auth in every action
8. **Rate Limiting**: Implement rate limiting for public actions

## Security Considerations

### Authentication
```tsx
'use server'
import { auth } from '@/lib/auth'

export async function deletePost(id: string) {
  const user = await auth()
  if (!user) throw new Error('Unauthorized')
  
  await db.post.delete({ where: { id, userId: user.id } })
}
```

### Input Validation
Always validate and sanitize inputs:
```tsx
'use server'

export async function createPost(formData: FormData) {
  const title = formData.get('title')
  
  if (!title || typeof title !== 'string') {
    return { error: 'Invalid title' }
  }
  
  if (title.length < 3 || title.length > 100) {
    return { error: 'Title must be 3-100 characters' }
  }
  
  await db.post.create({ data: { title } })
}
```

## Learn More
- [Next.js Server Actions Docs](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [React Server Functions](https://react.dev/reference/react/use-server)
