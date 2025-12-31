// Dynamic route with [id] parameter

export default function PostDetailPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-2">Post #{params.id}</h1>
        <p className="text-blue-100">Dynamic route parameter demonstration</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-4">Route Information</h2>
        <div className="space-y-3">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
            <p className="text-sm text-gray-600 dark:text-gray-400">URL Parameter</p>
            <p className="text-lg font-mono font-semibold">{params.id}</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
            <p className="text-sm text-gray-600 dark:text-gray-400">File Path</p>
            <p className="text-sm font-mono">app/features/dynamic-routes/[id]/page.tsx</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
            <p className="text-sm text-gray-600 dark:text-gray-400">Full URL</p>
            <p className="text-sm font-mono">/features/dynamic-routes/{params.id}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-gray-100 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">How This Works</h3>
        <pre className="text-sm">
{`// File: app/features/dynamic-routes/[id]/page.tsx

export default function PostDetailPage({
  params,
}: {
  params: { id: string }
}) {
  // params.id contains the dynamic segment
  // For URL: /features/dynamic-routes/123
  // params.id will be "123"
  
  return <div>Post ID: {params.id}</div>
}`}
        </pre>
      </div>

      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2">✨ Key Points</h3>
        <ul className="space-y-2">
          <li>• The [id] folder creates a dynamic route segment</li>
          <li>• The value is accessible via params.id</li>
          <li>• This works for any value: /posts/1, /posts/abc, /posts/hello</li>
          <li>• Great for detail pages, profiles, and unique content</li>
        </ul>
      </div>
    </div>
  )
}
