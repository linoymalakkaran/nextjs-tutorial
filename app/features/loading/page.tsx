// Simulate slow data fetching
async function getSlowData() {
  await new Promise(resolve => setTimeout(resolve, 3000))
  return {
    message: 'Data loaded successfully!',
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
    loadTime: '3 seconds'
  }
}

export default async function LoadingPage() {
  const data = await getSlowData()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Loading States</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Instant loading UI with loading.tsx and Suspense
        </p>
      </div>

      <div className="bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">How Loading Works</h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="mr-2">⏳</span>
            <span><strong>loading.tsx:</strong> Automatic loading UI for entire route</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">⏳</span>
            <span><strong>Suspense:</strong> Granular loading boundaries for components</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">⏳</span>
            <span><strong>Instant Feedback:</strong> Shows immediately while data loads</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">⏳</span>
            <span><strong>Streaming:</strong> Progressive rendering with React 18</span>
          </li>
        </ul>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Data Loaded!</h2>
            <p className="text-gray-600 dark:text-gray-400">{data.message}</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          {data.items.map((item, index) => (
            <div key={index} className="p-4 bg-sky-50 dark:bg-sky-900/20 rounded-lg border border-sky-200 dark:border-sky-700">
              <p className="font-semibold">{item}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
          <p className="text-sm">
            ⏱️ This content took <strong>{data.loadTime}</strong> to load. During that time,
            you saw a loading skeleton from loading.tsx!
          </p>
        </div>
      </div>

      <div className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">loading.tsx Example</h3>
        <pre className="text-sm">
{`// app/dashboard/loading.tsx
export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
      <div className="h-64 bg-gray-300 rounded"></div>
    </div>
  )
}

// This loading component is shown automatically while
// app/dashboard/page.tsx is loading its data`}
        </pre>
      </div>

      <div className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Suspense Example</h3>
        <pre className="text-sm">
{`import { Suspense } from 'react'

export default function Page() {
  return (
    <div>
      <h1>My Page</h1>
      
      {/* Wrap slow components in Suspense */}
      <Suspense fallback={<LoadingSkeleton />}>
        <SlowComponent />
      </Suspense>
      
      {/* This renders immediately */}
      <FastComponent />
    </div>
  )
}

// SlowComponent can be async and fetch data
async function SlowComponent() {
  const data = await fetchData()
  return <div>{data}</div>
}`}
        </pre>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4">loading.tsx</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Route-level loading UI
          </p>
          <ul className="text-sm space-y-2">
            <li>✓ Wraps entire page</li>
            <li>✓ Shows during initial load</li>
            <li>✓ Automatic with file convention</li>
            <li>✓ One per route segment</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4">{'<Suspense>'}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Component-level loading UI
          </p>
          <ul className="text-sm space-y-2">
            <li>✓ Granular control</li>
            <li>✓ Multiple per page</li>
            <li>✓ Streaming support</li>
            <li>✓ Progressive rendering</li>
          </ul>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-4">Common Loading Patterns</h3>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
            <h4 className="font-semibold mb-2">Skeleton Screens</h4>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 animate-pulse"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6 animate-pulse"></div>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
            <h4 className="font-semibold mb-2">Spinner</h4>
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2">💡 Best Practices</h3>
        <ul className="space-y-2">
          <li>• Use loading.tsx for route-level loading UI</li>
          <li>• Use Suspense for component-level streaming</li>
          <li>• Make loading states match the content layout</li>
          <li>• Consider skeleton screens over spinners for better UX</li>
          <li>• Combine instant static content with streamed dynamic content</li>
        </ul>
      </div>
    </div>
  )
}
