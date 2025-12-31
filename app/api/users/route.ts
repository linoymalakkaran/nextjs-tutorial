import { NextResponse } from 'next/server'

// Mock data - in production, this would come from a database
const users = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
]

// GET /api/users - Get all users
export async function GET() {
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 500))

  return NextResponse.json({
    success: true,
    data: users,
    count: users.length,
  })
}

// POST /api/users - Create a new user
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Create new user (in production, save to database)
    const newUser = {
      id: String(users.length + 1),
      name: body.name,
      email: body.email,
      role: body.role || 'User',
    }

    users.push(newUser)

    return NextResponse.json(
      { success: true, data: newUser },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    )
  }
}
