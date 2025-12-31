'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { createPost, deletePost } from './actions'

function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg transition-colors"
    >
      {pending ? 'Creating...' : 'Create Post'}
    </button>
  )
}

export default function ServerActionsPage() {
  const [state, formAction] = useFormState(createPost, { message: '', posts: [] })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Server Actions</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Server-side mutations without API routes - introduced in Next.js 13.4
        </p>
      </div>

      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">What are Server Actions?</h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="mr-2">🚀</span>
            <span><strong>Server-side functions:</strong> Run securely on the server</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🚀</span>
            <span><strong>Form handling:</strong> Progressive enhancement with forms</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🚀</span>
            <span><strong>No API routes needed:</strong> Simpler data mutations</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🚀</span>
            <span><strong>Type-safe:</strong> Full TypeScript support</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🚀</span>
            <span><strong>Automatic revalidation:</strong> Update cached data easily</span>
          </li>
        </ul>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-4">Create a Post</h2>
        <form action={formAction} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Post Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
              placeholder="Enter post title..."
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-2">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
              placeholder="Enter post content..."
            />
          </div>
          <SubmitButton />
        </form>
        
        {state.message && (
          <div className="mt-4 p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg">
            <p className="text-green-800 dark:text-green-200">{state.message}</p>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-4">Your Posts</h2>
        {state.posts.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No posts yet. Create one above!</p>
        ) : (
          <div className="space-y-4">
            {state.posts.map((post: any) => (
              <div key={post.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{post.title}</h3>
                  <form action={deletePost}>
                    <input type="hidden" name="id" value={post.id} />
                    <button
                      type="submit"
                      className="text-red-600 hover:text-red-700 dark:text-red-400 text-sm"
                    >
                      Delete
                    </button>
                  </form>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{post.content}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                  Created: {new Date(post.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Code Example</h3>
        <pre className="text-sm">
{`// actions.ts - Server Actions file
'use server'

import { revalidatePath } from 'next/cache'

export async function createPost(formData: FormData) {
  const title = formData.get('title')
  const content = formData.get('content')
  
  // Database operations here
  await db.post.create({ data: { title, content } })
  
  // Revalidate the page to show new data
  revalidatePath('/posts')
  
  return { success: true }
}

// Component using the action
export default function Page() {
  return (
    <form action={createPost}>
      <input name="title" />
      <button type="submit">Create</button>
    </form>
  )
}`}
        </pre>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2">⚡ Key Benefits</h3>
        <ul className="space-y-2">
          <li>• No need to create separate API routes</li>
          <li>• Automatic handling of loading and error states</li>
          <li>• Works without JavaScript (progressive enhancement)</li>
          <li>• Built-in CSRF protection</li>
          <li>• Optimistic updates support with useOptimistic</li>
        </ul>
      </div>
    </div>
  )
}
