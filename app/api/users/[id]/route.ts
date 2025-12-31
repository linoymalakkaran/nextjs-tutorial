import { NextResponse } from 'next/server'

// Mock data - same as in users/route.ts
const users = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
]

// GET /api/users/[id] - Get user by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params
  
  // Find user
  const user = users.find(u => u.id === id)
  
  if (!user) {
    return NextResponse.json(
      { success: false, error: 'User not found' },
      { status: 404 }
    )
  }

  return NextResponse.json({
    success: true,
    data: user,
  })
}

// DELETE /api/users/[id] - Delete user
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params
  
  const index = users.findIndex(u => u.id === id)
  
  if (index === -1) {
    return NextResponse.json(
      { success: false, error: 'User not found' },
      { status: 404 }
    )
  }

  users.splice(index, 1)

  return NextResponse.json({
    success: true,
    message: 'User deleted successfully',
  })
}

// PATCH /api/users/[id] - Update user
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params
  const body = await request.json()
  
  const user = users.find(u => u.id === id)
  
  if (!user) {
    return NextResponse.json(
      { success: false, error: 'User not found' },
      { status: 404 }
    )
  }

  // Update user fields
  Object.assign(user, body)

  return NextResponse.json({
    success: true,
    data: user,
  })
}
