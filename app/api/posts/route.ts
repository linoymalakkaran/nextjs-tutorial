import { NextResponse } from 'next/server'

// Mock posts data
const posts = [
  { id: 1, title: 'Getting Started with Next.js', author: 'John Doe', likes: 42, createdAt: '2024-01-15' },
  { id: 2, title: 'React Server Components Explained', author: 'Jane Smith', likes: 38, createdAt: '2024-01-16' },
  { id: 3, title: 'TanStack Query Best Practices', author: 'Bob Johnson', likes: 51, createdAt: '2024-01-17' },
  { id: 4, title: 'State Management in 2024', author: 'Alice Brown', likes: 29, createdAt: '2024-01-18' },
  { id: 5, title: 'Building Scalable APIs', author: 'Charlie Wilson', likes: 64, createdAt: '2024-01-19' },
]

// GET /api/posts
export async function GET(request: Request) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')

  return NextResponse.json({
    success: true,
    data: posts,
    pagination: {
      page,
      limit,
      total: posts.length,
    },
  })
}

// POST /api/posts
export async function POST(request: Request) {
  const body = await request.json()

  const newPost = {
    id: posts.length + 1,
    title: body.title,
    author: body.author || 'Anonymous',
    likes: 0,
    createdAt: new Date().toISOString().split('T')[0],
  }

  posts.unshift(newPost)

  return NextResponse.json({
    success: true,
    data: newPost,
  }, { status: 201 })
}
