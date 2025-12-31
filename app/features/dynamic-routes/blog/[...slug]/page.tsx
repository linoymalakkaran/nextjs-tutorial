// Catch-all route with [...slug] parameter
// This catches ALL segments after /blog/

export default function BlogCatchAllPage({
  params,
}: {
  params: { slug: string[] }
}) {
  const pathParts = params.slug || []
  const fullPath = pathParts.join('/')

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-2">Catch-All Route</h1>
        <p className="text-purple-100">Matches any number of path segments</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-4">Captured Path Segments</h2>
        <div className="space-y-4">
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Full Path</p>
            <p className="text-lg font-mono font-semibold">/{fullPath}</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Segments Array ({pathParts.length} parts)
            </p>
            <div className="space-y-1">
              {pathParts.map((segment, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-xs bg-purple-200 dark:bg-purple-800 px-2 py-1 rounded">
                    [{index}]
                  </span>
                  <span className="font-mono">{segment}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-gray-100 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Code Implementation</h3>
        <pre className="text-sm">
{`// File: app/features/dynamic-routes/blog/[...slug]/page.tsx

export default function BlogCatchAllPage({
  params,
}: {
  params: { slug: string[] }
}) {
  // params.slug is an ARRAY of all segments
  // URL: /blog/tech/2024/post-1
  // params.slug = ["tech", "2024", "post-1"]
  
  return (
    <div>
      <h1>Path: {params.slug.join('/')}</h1>
      <p>Segments: {params.slug.length}</p>
    </div>
  )
}`}
        </pre>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Example URLs</h3>
          <ul className="text-sm space-y-1 font-mono">
            <li>• /blog/tech</li>
            <li>• /blog/tech/2024</li>
            <li>• /blog/tech/2024/post-1</li>
            <li>• /blog/a/b/c/d/e/f</li>
          </ul>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Use Cases</h3>
          <ul className="text-sm space-y-1">
            <li>• Documentation sites</li>
            <li>• File browsers</li>
            <li>• Nested categories</li>
            <li>• Multi-level navigation</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
