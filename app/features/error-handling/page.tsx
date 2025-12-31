'use client'

import { useState } from 'react'

export default function ErrorHandlingPage() {
  const [shouldError, setShouldError] = useState(false)

  if (shouldError) {
    throw new Error('This is a demo error triggered by the button!')
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Error Handling</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Graceful error boundaries with error.tsx
        </p>
      </div>

      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Error Boundaries in Next.js</h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="mr-2">🛡️</span>
            <span><strong>error.tsx:</strong> Catch errors in route segments</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🛡️</span>
            <span><strong>Automatic Recovery:</strong> Isolate errors to affected segments</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🛡️</span>
            <span><strong>Reset Functionality:</strong> Try again without full page reload</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🛡️</span>
            <span><strong>User-Friendly:</strong> Show custom error UI instead of blank screen</span>
          </li>
        </ul>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-4">Try Error Handling</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Click the button below to trigger an error. The error.tsx boundary will catch it
          and display a friendly error message.
        </p>
        
        <button
          onClick={() => setShouldError(true)}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Trigger Error
        </button>
      </div>

      <div className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">error.tsx Example</h3>
        <pre className="text-sm">
{`// app/dashboard/error.tsx
'use client' // Error boundaries must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  )
}

// This catches errors in:
// - app/dashboard/page.tsx
// - app/dashboard/layout.tsx (except root)
// - Child routes and components`}
        </pre>
      </div>

      <div className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">global-error.tsx Example</h3>
        <pre className="text-sm">
{`// app/global-error.tsx
'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <h2>Application Error</h2>
        <button onClick={reset}>Try again</button>
      </body>
    </html>
  )
}

// Catches errors in root layout
// Must include <html> and <body> tags`}
        </pre>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4">error.tsx</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            For route segment errors
          </p>
          <ul className="text-sm space-y-2">
            <li>✓ Catches route errors</li>
            <li>✓ Must be Client Component</li>
            <li>✓ Receives error and reset</li>
            <li>✓ Per-segment isolation</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4">global-error.tsx</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            For root layout errors
          </p>
          <ul className="text-sm space-y-2">
            <li>✓ Catches root errors</li>
            <li>✓ Wraps entire app</li>
            <li>✓ Must include HTML/body</li>
            <li>✓ Production only (dev has overlay)</li>
          </ul>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-4">Error Hierarchy</h3>
        <div className="space-y-2 text-sm font-mono">
          <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded">
            app/layout.tsx ← Caught by global-error.tsx
          </div>
          <div className="pl-6">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-700">
              app/dashboard/layout.tsx ← Caught by app/dashboard/error.tsx
            </div>
            <div className="pl-6 mt-2">
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-700">
                app/dashboard/page.tsx ← Caught by app/dashboard/error.tsx
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2">⚠️ Important Notes</h3>
        <ul className="space-y-2">
          <li>• error.tsx must be a Client Component ('use client')</li>
          <li>• It catches errors in the same segment and below</li>
          <li>• It does NOT catch errors in the same segment's layout</li>
          <li>• Use global-error.tsx to catch errors in root layout</li>
          <li>• In development, you'll see the error overlay instead</li>
        </ul>
      </div>

      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2">💡 Best Practices</h3>
        <ul className="space-y-2">
          <li>• Log errors to a monitoring service (Sentry, LogRocket, etc.)</li>
          <li>• Provide clear error messages for users</li>
          <li>• Include a reset/retry button</li>
          <li>• Consider adding a "Report Issue" option</li>
          <li>• Test error boundaries in production mode</li>
        </ul>
      </div>
    </div>
  )
}
