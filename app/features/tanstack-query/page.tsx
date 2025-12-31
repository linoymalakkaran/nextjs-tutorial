'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

// Type definitions
interface Post {
  id: number
  title: string
  author: string
  likes: number
  createdAt: string
}

// API functions
async function fetchPosts(): Promise<Post[]> {
  const res = await fetch('/api/posts')
  const data = await res.json()
  return data.data
}

async function likePost(postId: number): Promise<Post> {
  const res = await fetch(`/api/posts/${postId}`, {
    method: 'PATCH',
  })
  const data = await res.json()
  return data.data
}

export default function TanStackQueryPage() {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null)
  const queryClient = useQueryClient()

  // Query for fetching posts
  const { data: posts, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 30000, // Consider data fresh for 30 seconds
  })

  // Mutation for liking a post
  const likeMutation = useMutation({
    mutationFn: likePost,
    onSuccess: (data) => {
      // Optimistically update the cache
      queryClient.setQueryData(['posts'], (old: Post[] | undefined) => {
        if (!old) return []
        return old.map(post => 
          post.id === data.id ? data : post
        )
      })
    },
  })

  const handleLike = (postId: number) => {
    likeMutation.mutate(postId)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">TanStack Query (React Query)</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Powerful asynchronous state management for client components
        </p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">What is TanStack Query?</h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="mr-2">🔄</span>
            <span><strong>Data Fetching:</strong> Simplified async data fetching with caching</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🔄</span>
            <span><strong>Cache Management:</strong> Automatic background updates and stale data handling</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🔄</span>
            <span><strong>Optimistic Updates:</strong> Update UI before server confirms</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🔄</span>
            <span><strong>Mutations:</strong> Handle POST, PUT, DELETE with automatic cache invalidation</span>
          </li>
        </ul>
      </div>

      {/* Posts List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Blog Posts (Cached)</h2>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
          >
            Refetch Data
          </button>
        </div>

        {isLoading && (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
            <p className="text-red-700 dark:text-red-400">
              Error: {error instanceof Error ? error.message : 'Failed to fetch posts'}
            </p>
          </div>
        )}

        {posts && (
          <div className="space-y-4">
            {posts.map(post => (
              <div
                key={post.id}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">{post.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      by {post.author} • {post.createdAt}
                    </p>
                  </div>
                  <button
                    onClick={() => handleLike(post.id)}
                    disabled={likeMutation.isPending}
                    className="flex items-center space-x-2 px-3 py-1 bg-pink-100 dark:bg-pink-900/30 hover:bg-pink-200 dark:hover:bg-pink-900/50 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <span>❤️</span>
                    <span className="font-semibold">{post.likes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
          <p className="text-sm">
            💡 <strong>Try this:</strong> Click "Like" on any post. The UI updates instantly (optimistic update),
            then TanStack Query syncs with the server in the background!
          </p>
        </div>
      </div>

      {/* Key Features */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4">Query Features</h3>
          <ul className="text-sm space-y-2">
            <li>✅ Automatic caching</li>
            <li>✅ Background refetching</li>
            <li>✅ Stale-while-revalidate</li>
            <li>✅ Window focus refetching</li>
            <li>✅ Request deduplication</li>
            <li>✅ Pagination & infinite scroll</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4">Mutation Features</h3>
          <ul className="text-sm space-y-2">
            <li>✅ Optimistic updates</li>
            <li>✅ Auto cache invalidation</li>
            <li>✅ Retry on failure</li>
            <li>✅ Loading states</li>
            <li>✅ Error handling</li>
            <li>✅ Side effects (onSuccess, onError)</li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Code Example - useQuery</h3>
        <pre className="text-sm">
{`'use client'

import { useQuery } from '@tanstack/react-query'

export default function PostsList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await fetch('/api/posts')
      return res.json()
    },
    staleTime: 60000, // 1 minute
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading posts</div>

  return (
    <ul>
      {data.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}`}
        </pre>
      </div>

      <div className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Code Example - useMutation</h3>
        <pre className="text-sm">
{`'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function LikeButton({ postId }) {
  const queryClient = useQueryClient()
  
  const mutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(\`/api/posts/\${id}/like\`, {
        method: 'POST'
      })
      return res.json()
    },
    onSuccess: () => {
      // Invalidate and refetch posts
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  return (
    <button 
      onClick={() => mutation.mutate(postId)}
      disabled={mutation.isPending}
    >
      {mutation.isPending ? 'Liking...' : 'Like'}
    </button>
  )
}`}
        </pre>
      </div>

      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2">💡 When to Use TanStack Query</h3>
        <ul className="space-y-2">
          <li>• Fetching data in Client Components</li>
          <li>• Need automatic caching and background updates</li>
          <li>• Handling complex async state (loading, error, success)</li>
          <li>• Optimistic UI updates</li>
          <li>• Pagination or infinite scroll</li>
          <li>• Real-time data that needs periodic refetching</li>
        </ul>
      </div>
    </div>
  )
}
