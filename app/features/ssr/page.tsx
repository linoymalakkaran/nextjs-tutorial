// Server-Side Rendering (SSR) Example
// This page is rendered on EACH REQUEST

// Force dynamic rendering (no caching)
export const dynamic = 'force-dynamic'

async function getServerData() {
  // This runs on EVERY REQUEST
  return {
    timestamp: new Date().toISOString(),
    requestTime: new Date().toLocaleString(),
    serverInfo: 'This data was fetched fresh on the server for this specific request',
    random: Math.random(),
  }
}

export default async function SSRPage() {
  // Fetched fresh on every request
  const data = await getServerData()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Server-Side Rendering (SSR)</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Dynamic rendering on each request for fresh data
        </p>
      </div>

      <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">What is SSR?</h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="mr-2">🔄</span>
            <span><strong>Per-Request Rendering:</strong> Fresh HTML generated for each request</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🔄</span>
            <span><strong>Always Fresh:</strong> Data is never stale</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🔄</span>
            <span><strong>SEO Friendly:</strong> Fully rendered HTML for crawlers</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🔄</span>
            <span><strong>User-Specific:</strong> Can render personalized content</span>
          </li>
        </ul>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-6">Live Server Data</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Request Time</p>
            <p className="text-lg font-semibold">{data.requestTime}</p>
          </div>
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Timestamp (ISO)</p>
            <p className="text-sm font-mono">{data.timestamp}</p>
          </div>
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Random Number</p>
            <p className="text-lg font-semibold">{data.random.toFixed(6)}</p>
          </div>
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Rendering Mode</p>
            <p className="text-lg font-semibold text-orange-600 dark:text-orange-400">Dynamic (SSR)</p>
          </div>
        </div>
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
          <p className="text-sm">
            🔄 <strong>Refresh this page</strong> to see the data update. Each request generates new values!
          </p>
        </div>
      </div>

      <div className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Code Example</h3>
        <pre className="text-sm">
{`// app/dashboard/page.tsx

// Force dynamic rendering (opt-out of caching)
export const dynamic = 'force-dynamic'

async function getUserData() {
  // This runs on EVERY REQUEST, not at build time
  const res = await fetch('https://api.example.com/user', {
    cache: 'no-store' // Don't cache this request
  })
  return res.json()
}

export default async function DashboardPage() {
  const user = await getUserData()
  
  return (
    <div>
      <h1>Welcome back, {user.name}!</h1>
      <p>Last login: {new Date().toLocaleString()}</p>
    </div>
  )
}

// Each page visit generates fresh HTML with current data`}
        </pre>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">✅ Best For</h3>
          <ul className="text-sm space-y-1">
            <li>• User dashboards</li>
            <li>• Real-time data</li>
            <li>• Personalized content</li>
            <li>• Authentication pages</li>
            <li>• Fresh data requirements</li>
          </ul>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">⚠️ Trade-offs</h3>
          <ul className="text-sm space-y-1">
            <li>• Slower than SSG</li>
            <li>• Server processing on each request</li>
            <li>• Higher server costs</li>
            <li>• Can't serve from CDN edge</li>
          </ul>
        </div>
      </div>

      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2">💡 When to Use</h3>
        <p>
          Use SSR when you need fresh data on every request or personalized content. 
          If data doesn't change often, consider ISR instead for better performance.
        </p>
      </div>
    </div>
  )
}
