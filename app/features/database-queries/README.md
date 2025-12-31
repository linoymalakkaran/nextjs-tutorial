# Server-Side Database Queries

## Purpose
Server-Side Database Queries in Next.js allow you to query databases directly from Server Components, eliminating the need for API routes and reducing latency.

## Why Use Server-Side Database Queries?

### Benefits
- **Direct Access**: Query databases directly in components
- **Better Performance**: Lower latency (server-to-database)
- **Security**: Database credentials never exposed to client
- **Cost-Effective**: Reduce API calls and infrastructure costs
- **Type Safety**: Full TypeScript support with ORMs
- **Simplified Architecture**: No need for separate API layer
- **SEO-Friendly**: Content available for search engines

## When to Use

### ✅ Use Server-Side Queries For:
- **Initial Page Data**: Data needed on first render
- **SEO-Critical Content**: Blog posts, product pages, documentation
- **Static Content**: Data that changes infrequently
- **Admin Dashboards**: Internal tools with sensitive data
- **Reports**: Data-heavy pages with analytics
- **Server Components**: Any data fetching in Server Components

### ❌ Don't Use Server-Side Queries For:
- **Real-time Updates**: Use WebSockets or polling instead
- **User Interactions**: Use Client Components + API/Server Actions
- **Frequent Mutations**: Use TanStack Query for optimistic updates
- **Client-Side Filtering**: Let client handle local filtering

## Use Cases

### 1. Blog with Posts and Authors
```tsx
// app/blog/page.tsx
import { prisma } from '@/lib/prisma'

async function getPosts() {
  return await prisma.post.findMany({
    include: {
      author: {
        select: { name: true, avatar: true }
      }
    },
    orderBy: { createdAt: 'desc' },
    take: 10
  })
}

export default async function BlogPage() {
  const posts = await getPosts()
  
  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>By {post.author.name}</p>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  )
}
```

### 2. E-commerce Product Page
```tsx
import { db } from '@/lib/db'

async function getProduct(id: string) {
  return await db.query(`
    SELECT p.*, c.name as category
    FROM products p
    JOIN categories c ON p.category_id = c.id
    WHERE p.id = $1
  `, [id])
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)
  
  return <ProductDetails product={product} />
}
```

### 3. Dashboard with Parallel Queries
```tsx
async function getDashboardData() {
  const [users, revenue, orders, products] = await Promise.all([
    getUserCount(),
    getTotalRevenue(),
    getOrderStats(),
    getTopProducts()
  ])
  
  return { users, revenue, orders, products }
}

export default async function Dashboard() {
  const data = await getDashboardData()
  
  return <DashboardView data={data} />
}
```

## Database Options

### 1. PostgreSQL with Vercel Postgres
```tsx
import { sql } from '@vercel/postgres'

export async function getUsers() {
  const { rows } = await sql`
    SELECT id, name, email 
    FROM users 
    WHERE active = true
    ORDER BY created_at DESC
  `
  return rows
}
```

### 2. Prisma ORM (Recommended)
```tsx
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getUser(id: string) {
  return await prisma.user.findUnique({
    where: { id },
    include: {
      posts: true,
      profile: true
    }
  })
}
```

### 3. Drizzle ORM
```tsx
import { db } from '@/lib/drizzle'
import { users, posts } from '@/lib/schema'
import { eq } from 'drizzle-orm'

export async function getUserPosts(userId: string) {
  return await db
    .select()
    .from(posts)
    .where(eq(posts.userId, userId))
}
```

### 4. MongoDB
```tsx
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI)

export async function getDocuments() {
  const db = client.db('myapp')
  return await db.collection('posts').find({}).toArray()
}
```

## Query Patterns

### Sequential Queries
```tsx
// Run one after another
async function getData() {
  const user = await getUser()
  const posts = await getUserPosts(user.id)
  return { user, posts }
}
```

### Parallel Queries
```tsx
// Run simultaneously for better performance
async function getData() {
  const [users, posts, comments] = await Promise.all([
    getUsers(),
    getPosts(),
    getComments()
  ])
  return { users, posts, comments }
}
```

### Conditional Queries
```tsx
async function getData(userId?: string) {
  if (userId) {
    return await getUserData(userId)
  }
  return await getPublicData()
}
```

### Paginated Queries
```tsx
async function getPosts(page: number, limit: number = 10) {
  const offset = (page - 1) * limit
  
  return await prisma.post.findMany({
    skip: offset,
    take: limit,
    orderBy: { createdAt: 'desc' }
  })
}
```

## Best Practices

### 1. Connection Pooling
```tsx
// lib/db.ts
import { Pool } from 'pg'

// Reuse connections
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // Maximum connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

export { pool }
```

### 2. Query Optimization
```tsx
// Good: Fetch only needed fields
const users = await prisma.user.findMany({
  select: {
    id: true,
    name: true,
    email: true
  }
})

// Bad: Fetch everything
const users = await prisma.user.findMany()
```

### 3. Avoid N+1 Queries
```tsx
// Good: Single query with join
const posts = await prisma.post.findMany({
  include: { author: true }
})

// Bad: N+1 queries
const posts = await prisma.post.findMany()
for (const post of posts) {
  post.author = await prisma.user.findUnique({ where: { id: post.authorId } })
}
```

### 4. Error Handling
```tsx
async function getUser(id: string) {
  try {
    return await prisma.user.findUniqueOrThrow({
      where: { id }
    })
  } catch (error) {
    if (error.code === 'P2025') {
      notFound() // Next.js 404 page
    }
    throw error
  }
}
```

### 5. Caching
```tsx
import { cache } from 'react'

// Cache function results during request
export const getUser = cache(async (id: string) => {
  return await prisma.user.findUnique({ where: { id } })
})

// Or use Next.js revalidation
export async function getPosts() {
  const posts = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 } // Cache for 1 hour
  })
  return posts.json()
}
```

## Security

### 1. SQL Injection Prevention
```tsx
// Good: Parameterized queries
const { rows } = await sql`
  SELECT * FROM users WHERE id = ${userId}
`

// Bad: String concatenation
const { rows } = await sql`
  SELECT * FROM users WHERE id = '${userId}'
`
```

### 2. Authentication
```tsx
import { auth } from '@/lib/auth'

async function getPrivateData() {
  const user = await auth()
  if (!user) throw new Error('Unauthorized')
  
  return await prisma.data.findMany({
    where: { userId: user.id }
  })
}
```

### 3. Row-Level Security
```tsx
async function getUserPosts(userId: string, currentUserId: string) {
  return await prisma.post.findMany({
    where: {
      userId,
      OR: [
        { public: true },
        { userId: currentUserId } // User can see their own private posts
      ]
    }
  })
}
```

## Performance Tips

### 1. Use Indexes
```sql
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
```

### 2. Batch Operations
```tsx
// Good: Single query
await prisma.user.createMany({
  data: users
})

// Bad: Multiple queries
for (const user of users) {
  await prisma.user.create({ data: user })
}
```

### 3. Projection
```tsx
// Fetch only needed columns
const users = await prisma.user.findMany({
  select: {
    id: true,
    name: true,
    // Don't fetch unused fields
  }
})
```

### 4. Limit Results
```tsx
// Always paginate large datasets
const posts = await prisma.post.findMany({
  take: 20,
  skip: page * 20
})
```

## Comparison

| Approach | Server Queries | API Routes | TanStack Query |
|----------|---------------|------------|----------------|
| Use Case | Initial data | Public APIs | Client updates |
| Latency | ✅ Lowest | ⚠️ Medium | ⚠️ Medium |
| Security | ✅ High | ⚠️ Requires auth | ⚠️ Requires auth |
| Caching | ✅ Built-in | ❌ Manual | ✅ Built-in |
| SEO | ✅ Excellent | ❌ Poor | ❌ Poor |
| Real-time | ❌ No | ✅ Yes | ✅ Yes |
| Boilerplate | ✅ Minimal | ⚠️ More code | ⚠️ More code |

## Database Setup

### Prisma Setup
```bash
# Install
npm install prisma @prisma/client

# Initialize
npx prisma init

# Create schema (prisma/schema.prisma)
# Then migrate
npx prisma migrate dev

# Generate client
npx prisma generate
```

### Vercel Postgres
```bash
npm install @vercel/postgres

# Set env var
# DATABASE_URL="postgres://..."
```

### MongoDB
```bash
npm install mongodb

# Set env var
# MONGODB_URI="mongodb+srv://..."
```

## Monitoring

### Query Logging
```tsx
const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
})
```

### Performance Monitoring
```tsx
prisma.$on('query', (e) => {
  console.log('Query: ' + e.query)
  console.log('Duration: ' + e.duration + 'ms')
})
```

## Learn More
- [Prisma Documentation](https://www.prisma.io/docs)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Drizzle ORM](https://orm.drizzle.team)
