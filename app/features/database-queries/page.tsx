import { Suspense } from 'react'

// Simulated database functions
// In a real app, these would connect to PostgreSQL, MongoDB, etc.

interface User {
  id: number
  name: string
  email: string
  role: string
}

interface Post {
  id: number
  title: string
  content: string
  authorId: number
  createdAt: string
}

// Simulate database with delay
async function simulateQuery<T>(data: T, delay = 1000): Promise<T> {
  await new Promise(resolve => setTimeout(resolve, delay))
  return data
}

// Mock database data
const mockUsers: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'admin' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'user' },
  { id: 3, name: 'Carol Williams', email: 'carol@example.com', role: 'user' },
]

const mockPosts: Post[] = [
  { id: 1, title: 'Getting Started with Next.js', content: 'Learn the basics...', authorId: 1, createdAt: '2024-01-01' },
  { id: 2, title: 'Server Components Deep Dive', content: 'Understanding RSC...', authorId: 1, createdAt: '2024-01-05' },
  { id: 3, title: 'Database Patterns in Next.js', content: 'Best practices...', authorId: 2, createdAt: '2024-01-10' },
]

// Database query functions (Server-side only)
async function getUsers(): Promise<User[]> {
  'use server' // This is a server-only function
  return simulateQuery(mockUsers, 800)
}

async function getUserById(id: number): Promise<User | undefined> {
  'use server'
  const users = await simulateQuery(mockUsers, 500)
  return users.find(user => user.id === id)
}

async function getPosts(): Promise<Post[]> {
  'use server'
  return simulateQuery(mockPosts, 600)
}

async function getPostsByAuthor(authorId: number): Promise<Post[]> {
  'use server'
  const posts = await simulateQuery(mockPosts, 700)
  return posts.filter(post => post.authorId === authorId)
}

async function getPostsWithAuthors() {
  'use server'
  const [posts, users] = await Promise.all([getPosts(), getUsers()])
  
  return posts.map(post => ({
    ...post,
    author: users.find(user => user.id === post.authorId)
  }))
}

// Server Components
async function UsersList() {
  const users = await getUsers()
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-2xl font-semibold mb-4">Users List</h3>
      <div className="space-y-3">
        {users.map(user => (
          <div key={user.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-lg">{user.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                user.role === 'admin' 
                  ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
                  : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
              }`}>
                {user.role}
              </span>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        ⏱️ Fetched from database in ~800ms
      </p>
    </div>
  )
}

async function PostsList() {
  const postsWithAuthors = await getPostsWithAuthors()
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-2xl font-semibold mb-4">Posts with Authors</h3>
      <div className="space-y-4">
        {postsWithAuthors.map(post => (
          <div key={post.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="font-semibold text-lg mb-2">{post.title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{post.content}</p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500 dark:text-gray-400">
                By {post.author?.name || 'Unknown'}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        ⚡ Parallel queries: Posts + Users fetched simultaneously
      </p>
    </div>
  )
}

async function UserPosts({ userId }: { userId: number }) {
  const [user, posts] = await Promise.all([
    getUserById(userId),
    getPostsByAuthor(userId)
  ])
  
  if (!user) return <div>User not found</div>
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-2xl font-semibold mb-2">{user.name}'s Posts</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{user.email}</p>
      {posts.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No posts yet</p>
      ) : (
        <div className="space-y-3">
          {posts.map(post => (
            <div key={post.id} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold">{post.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{post.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 animate-pulse">
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
      <div className="space-y-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function DatabaseQueriesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Server-Side Database Queries</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Efficient data fetching patterns with Next.js Server Components
        </p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Server-Side Data Fetching</h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="mr-2">🗄️</span>
            <span><strong>Direct Database Access:</strong> Query databases directly in Server Components</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🔒</span>
            <span><strong>Secure:</strong> Database credentials never exposed to client</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">⚡</span>
            <span><strong>Fast:</strong> Server-to-database latency is minimal</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">💰</span>
            <span><strong>Cost-Effective:</strong> Reduce API calls, bundle size</span>
          </li>
        </ul>
      </div>

      {/* Sequential Queries */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Sequential Queries</h2>
        <Suspense fallback={<LoadingSkeleton />}>
          <UsersList />
        </Suspense>
      </div>

      {/* Parallel Queries */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Parallel Queries</h2>
        <Suspense fallback={<LoadingSkeleton />}>
          <PostsList />
        </Suspense>
      </div>

      {/* Filtered Queries */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Filtered Queries</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Suspense fallback={<LoadingSkeleton />}>
            <UserPosts userId={1} />
          </Suspense>
          <Suspense fallback={<LoadingSkeleton />}>
            <UserPosts userId={2} />
          </Suspense>
        </div>
      </div>

      {/* Code Examples */}
      <div className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Example - Direct Database Query</h3>
        <pre className="text-sm">
{`// app/users/page.tsx (Server Component)
import { sql } from '@vercel/postgres'

async function getUsers() {
  const { rows } = await sql\`
    SELECT id, name, email, role 
    FROM users 
    ORDER BY created_at DESC
  \`
  return rows
}

export default async function UsersPage() {
  const users = await getUsers()
  
  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  )
}`}
        </pre>
      </div>

      <div className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Example - Parallel Queries</h3>
        <pre className="text-sm">
{`// Fetch multiple datasets in parallel
export default async function DashboardPage() {
  // These queries run in parallel!
  const [users, posts, comments] = await Promise.all([
    getUsers(),
    getPosts(),
    getComments()
  ])
  
  return (
    <Dashboard 
      users={users} 
      posts={posts} 
      comments={comments} 
    />
  )
}`}
        </pre>
      </div>

      <div className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Example - With Prisma ORM</h3>
        <pre className="text-sm">
{`import { prisma } from '@/lib/prisma'

async function getPostsWithAuthors() {
  return await prisma.post.findMany({
    include: {
      author: {
        select: { name: true, email: true }
      }
    },
    orderBy: { createdAt: 'desc' },
    take: 10
  })
}`}
        </pre>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">✅ Best Practices</h3>
          <ul className="text-sm space-y-1">
            <li>• Use connection pooling</li>
            <li>• Cache queries when possible</li>
            <li>• Use prepared statements</li>
            <li>• Fetch only needed data</li>
            <li>• Use indexes for performance</li>
            <li>• Handle errors gracefully</li>
          </ul>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">⚠️ Avoid</h3>
          <ul className="text-sm space-y-1">
            <li>• N+1 query problems</li>
            <li>• Fetching unnecessary data</li>
            <li>• Not using connection pools</li>
            <li>• Exposing sensitive data</li>
            <li>• Not handling timeouts</li>
            <li>• Ignoring SQL injection</li>
          </ul>
        </div>
      </div>

      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-3">🗄️ Database Options</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-semibold mb-2">SQL Databases</h4>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
              <li>• PostgreSQL</li>
              <li>• MySQL</li>
              <li>• SQLite</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">NoSQL Databases</h4>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
              <li>• MongoDB</li>
              <li>• Firebase</li>
              <li>• DynamoDB</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">ORMs/Tools</h4>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
              <li>• Prisma</li>
              <li>• Drizzle</li>
              <li>• TypeORM</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2">💡 When to Use Server-Side Queries</h3>
        <div className="space-y-2 text-sm">
          <p>✅ <strong>Use Server Components when:</strong> Data is needed on initial load, SEO is important, security is critical</p>
          <p>✅ <strong>Use Client + API when:</strong> Data changes based on user interaction, real-time updates needed</p>
          <p>✅ <strong>Use TanStack Query when:</strong> Complex caching, optimistic updates, background refetching needed</p>
        </div>
      </div>
    </div>
  )
}
