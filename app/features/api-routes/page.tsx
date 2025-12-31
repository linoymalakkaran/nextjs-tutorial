import Link from 'next/link'

export default function APIRoutesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">API Routes</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Create RESTful API endpoints in the App Router with Route Handlers
        </p>
      </div>

      <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">What are Route Handlers?</h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="mr-2">📡</span>
            <span><strong>API Endpoints:</strong> Create REST APIs in the app directory</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">📡</span>
            <span><strong>Multiple HTTP Methods:</strong> GET, POST, PUT, DELETE, PATCH</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">📡</span>
            <span><strong>Request/Response:</strong> Full control over HTTP requests</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">📡</span>
            <span><strong>Middleware Support:</strong> Authentication, validation, etc.</span>
          </li>
        </ul>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4">Available API Endpoints</h3>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-700">
              <span className="text-xs font-semibold text-green-700 dark:text-green-400">GET</span>
              <p className="text-sm mt-1 font-mono">/api/users</p>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-700">
              <span className="text-xs font-semibold text-green-700 dark:text-green-400">GET</span>
              <p className="text-sm mt-1 font-mono">/api/users/[id]</p>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-700">
              <span className="text-xs font-semibold text-blue-700 dark:text-blue-400">POST</span>
              <p className="text-sm mt-1 font-mono">/api/users</p>
            </div>
            <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded border border-orange-200 dark:border-orange-700">
              <span className="text-xs font-semibold text-orange-700 dark:text-orange-400">DELETE</span>
              <p className="text-sm mt-1 font-mono">/api/users/[id]</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4">Test the API</h3>
          <div className="space-y-3">
            <Link
              href="/api/users"
              target="_blank"
              className="block p-3 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded border border-blue-200 dark:border-blue-700 transition-colors"
            >
              <p className="font-semibold text-blue-700 dark:text-blue-400">Get All Users</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">GET /api/users</p>
            </Link>
            <Link
              href="/api/users/1"
              target="_blank"
              className="block p-3 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded border border-blue-200 dark:border-blue-700 transition-colors"
            >
              <p className="font-semibold text-blue-700 dark:text-blue-400">Get User by ID</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">GET /api/users/1</p>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Code Example - GET Route</h3>
        <pre className="text-sm">
{`// app/api/users/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  // Fetch data from database
  const users = await db.user.findMany()
  
  return NextResponse.json(users)
}

export async function POST(request: Request) {
  const body = await request.json()
  
  // Create user in database
  const user = await db.user.create({ data: body })
  
  return NextResponse.json(user, { status: 201 })
}`}
        </pre>
      </div>

      <div className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Code Example - Dynamic Route</h3>
        <pre className="text-sm">
{`// app/api/users/[id]/route.ts
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await db.user.findUnique({
    where: { id: params.id }
  })
  
  if (!user) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    )
  }
  
  return NextResponse.json(user)
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await db.user.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}`}
        </pre>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">HTTP Methods Supported</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold mb-2">Read Operations</h4>
            <ul className="text-sm space-y-1">
              <li>• GET - Retrieve data</li>
              <li>• HEAD - Get headers only</li>
              <li>• OPTIONS - Get allowed methods</li>
            </ul>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold mb-2">Write Operations</h4>
            <ul className="text-sm space-y-1">
              <li>• POST - Create resource</li>
              <li>• PUT - Replace resource</li>
              <li>• PATCH - Update resource</li>
            </ul>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold mb-2">Delete Operations</h4>
            <ul className="text-sm space-y-1">
              <li>• DELETE - Remove resource</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2">💡 When to Use</h3>
        <ul className="space-y-2">
          <li>• Building RESTful APIs for external consumption</li>
          <li>• Webhooks and third-party integrations</li>
          <li>• Complex request/response handling</li>
          <li>• Custom authentication flows</li>
          <li>• For simple mutations, consider Server Actions instead</li>
        </ul>
      </div>
    </div>
  )
}
