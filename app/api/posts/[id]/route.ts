import { NextResponse } from 'next/server'

const posts = [
  { id: 1, title: 'Getting Started with Next.js', author: 'John Doe', likes: 42, createdAt: '2024-01-15' },
  { id: 2, title: 'React Server Components Explained', author: 'Jane Smith', likes: 38, createdAt: '2024-01-16' },
  { id: 3, title: 'TanStack Query Best Practices', author: 'Bob Johnson', likes: 51, createdAt: '2024-01-17' },
  { id: 4, title: 'State Management in 2024', author: 'Alice Brown', likes: 29, createdAt: '2024-01-18' },
  { id: 5, title: 'Building Scalable APIs', author: 'Charlie Wilson', likes: 64, createdAt: '2024-01-19' },
]

// GET /api/posts/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await new Promise(resolve => setTimeout(resolve, 500))

  const post = posts.find(p => p.id === parseInt(params.id))

  if (!post) {
    return NextResponse.json(
      { success: false, error: 'Post not found' },
      { status: 404 }
    )
  }

  return NextResponse.json({
    success: true,
    data: post,
  })
}

// PATCH /api/posts/[id] - Like a post
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const post = posts.find(p => p.id === parseInt(params.id))

  if (!post) {
    return NextResponse.json(
      { success: false, error: 'Post not found' },
      { status: 404 }
    )
  }

  post.likes += 1

  return NextResponse.json({
    success: true,
    data: post,
  })
}
