export default function MiddlewareDemoPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Middleware</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Run code before a request is completed
        </p>
      </div>

      <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">What is Middleware?</h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="mr-2">⚙️</span>
            <span><strong>Request Interception:</strong> Run code before request reaches the page</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">⚙️</span>
            <span><strong>Edge Runtime:</strong> Runs on edge network for low latency</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">⚙️</span>
            <span><strong>Request/Response:</strong> Modify headers, redirect, rewrite</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">⚙️</span>
            <span><strong>Runs on ALL routes:</strong> Unless configured with matcher</span>
          </li>
        </ul>
      </div>

      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">✓ This page passed through middleware!</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Check your browser's developer console. The middleware added a custom header
          and logged this request. Open DevTools → Network → Select this page → Headers
          to see <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">x-middleware-executed</code>
        </p>
      </div>

      <div className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">middleware.ts File</h3>
        <pre className="text-sm">
{`// middleware.ts (root of project, not in app/)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Log request
  console.log('Middleware:', request.nextUrl.pathname)
  
  // Add custom header
  const response = NextResponse.next()
  response.headers.set('x-middleware-executed', 'true')
  
  return response
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}`}
        </pre>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-4">Common Use Cases</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-700">
            <h4 className="font-semibold mb-2">Authentication</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Redirect unauthenticated users to login
            </p>
          </div>
          <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-700">
            <h4 className="font-semibold mb-2">Redirects</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Redirect based on locale, device, or user type
            </p>
          </div>
          <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-700">
            <h4 className="font-semibold mb-2">Rewrites</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              A/B testing, feature flags, proxying
            </p>
          </div>
          <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-700">
            <h4 className="font-semibold mb-2">Headers</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Add custom headers, CORS, security headers
            </p>
          </div>
          <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-700">
            <h4 className="font-semibold mb-2">Cookies</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Set or read cookies before page loads
            </p>
          </div>
          <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-700">
            <h4 className="font-semibold mb-2">Rate Limiting</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Throttle requests from specific IPs
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Authentication Example</h3>
        <pre className="text-sm">
{`// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if user is authenticated
  const token = request.cookies.get('auth-token')
  
  // Protect /dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      // Redirect to login if no token
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  
  // Allow request to continue
  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard/:path*',
}`}
        </pre>
      </div>

      <div className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Internationalization Example</h3>
        <pre className="text-sm">
{`// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'fr', 'de', 'es']

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Check if pathname is missing locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(\`/\${locale}/\`) && pathname !== \`/\${locale}\`
  )
  
  if (pathnameIsMissingLocale) {
    // Get locale from header or default to 'en'
    const locale = request.headers.get('accept-language')?.split(',')[0] || 'en'
    
    // Redirect to URL with locale
    return NextResponse.redirect(
      new URL(\`/\${locale}\${pathname}\`, request.url)
    )
  }
}`}
        </pre>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-4">Middleware Response Types</h3>
        <div className="space-y-3">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
            <code className="font-semibold">NextResponse.next()</code>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Continue to the next middleware or route handler
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
            <code className="font-semibold">NextResponse.redirect()</code>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Redirect to a different URL
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
            <code className="font-semibold">NextResponse.rewrite()</code>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Serve a different URL while keeping the original URL in the browser
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
            <code className="font-semibold">NextResponse.json()</code>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Return a JSON response directly from middleware
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">✅ Advantages</h3>
          <ul className="text-sm space-y-1">
            <li>• Runs on Edge (low latency)</li>
            <li>• Before page renders</li>
            <li>• Modify request/response</li>
            <li>• Centralized logic</li>
            <li>• Works for all routes</li>
          </ul>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">⚠️ Limitations</h3>
          <ul className="text-sm space-y-1">
            <li>• Edge Runtime only</li>
            <li>• No Node.js APIs</li>
            <li>• Limited response size</li>
            <li>• Keep it lightweight</li>
            <li>• No database queries (usually)</li>
          </ul>
        </div>
      </div>

      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2">💡 Best Practices</h3>
        <ul className="space-y-2">
          <li>• Keep middleware fast - it runs on every matching request</li>
          <li>• Use matcher config to limit which routes run middleware</li>
          <li>• Avoid heavy computations or database calls</li>
          <li>• Use environment variables for configuration</li>
          <li>• Test redirects and rewrites thoroughly</li>
          <li>• Return NextResponse.next() to continue the request</li>
        </ul>
      </div>
    </div>
  )
}
