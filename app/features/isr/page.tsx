// Incremental Static Regeneration (ISR) Example
// Static page that can be updated after build with revalidation

// Revalidate every 10 seconds
export const revalidate = 10

async function getDataWithTimestamp() {
  // Simulate fetching data from an API or database
  return {
    timestamp: new Date().toISOString(),
    lastUpdated: new Date().toLocaleString(),
    content: 'This content was statically generated and will be revalidated periodically',
    pageViews: Math.floor(Math.random() * 10000),
    status: 'Active',
  }
}

export default async function ISRPage() {
  const data = await getDataWithTimestamp()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Incremental Static Regeneration (ISR)</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Best of both worlds: Static pages that update automatically
        </p>
      </div>

      <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">What is ISR?</h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="mr-2">⚡</span>
            <span><strong>Static + Dynamic:</strong> Static pages that regenerate in background</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">⚡</span>
            <span><strong>Automatic Updates:</strong> Content updates without redeploying</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">⚡</span>
            <span><strong>Fast Serving:</strong> Served from cache like static pages</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">⚡</span>
            <span><strong>Fresh Data:</strong> Revalidates on a schedule</span>
          </li>
        </ul>
      </div>

      <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-2">ISR in Action</h2>
        <p className="text-teal-100">This page revalidates every 10 seconds</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-6">Cached Data</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200 dark:border-teal-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Last Updated</p>
            <p className="text-lg font-semibold">{data.lastUpdated}</p>
          </div>
          <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200 dark:border-teal-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Timestamp</p>
            <p className="text-sm font-mono">{data.timestamp}</p>
          </div>
          <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200 dark:border-teal-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Page Views</p>
            <p className="text-lg font-semibold">{data.pageViews.toLocaleString()}</p>
          </div>
          <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200 dark:border-teal-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Status</p>
            <p className="text-lg font-semibold text-green-600 dark:text-green-400">{data.status}</p>
          </div>
        </div>
        <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
          <p className="text-sm">
            ⏱️ <strong>Revalidation Period:</strong> 10 seconds. The first user after 10 seconds 
            sees the stale page, but triggers a regeneration. Subsequent users get the updated page!
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-4">How ISR Works</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <h4 className="font-semibold">Initial Build</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Page is generated statically at build time
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <h4 className="font-semibold">Served from Cache</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Users get the cached version (fast!)
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <h4 className="font-semibold">Revalidation Trigger</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                After the revalidation time, next request triggers regeneration
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold">
              4
            </div>
            <div>
              <h4 className="font-semibold">Background Update</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Page regenerates in the background, new version replaces old
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Code Example</h3>
        <pre className="text-sm">
{`// app/blog/[slug]/page.tsx

// Revalidate this page every 60 seconds
export const revalidate = 60

async function getPost(slug: string) {
  const res = await fetch(\`https://api.example.com/posts/\${slug}\`)
  return res.json()
}

export default async function BlogPost({ params }) {
  const post = await getPost(params.slug)
  
  return <article>{post.content}</article>
}

// Result:
// - Page is static and served from cache
// - After 60 seconds, the next request triggers a regeneration
// - Updated page replaces the old cached version
// - No need to rebuild/redeploy the entire site!`}
        </pre>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">✅ Perfect For</h3>
          <ul className="text-sm space-y-1">
            <li>• E-commerce product pages</li>
            <li>• Blog posts with comments</li>
            <li>• News articles</li>
            <li>• Pricing pages</li>
            <li>• Content that updates periodically</li>
          </ul>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">🎯 Benefits</h3>
          <ul className="text-sm space-y-1">
            <li>• Fast page loads (static)</li>
            <li>• Fresh content automatically</li>
            <li>• No full site rebuilds</li>
            <li>• Scale to millions of pages</li>
            <li>• Low server costs</li>
          </ul>
        </div>
      </div>

      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2">💡 Pro Tip</h3>
        <p>
          You can also use on-demand revalidation with <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">revalidatePath()</code> or{' '}
          <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">revalidateTag()</code> to update specific pages 
          immediately when content changes (e.g., when you publish a new blog post).
        </p>
      </div>
    </div>
  )
}
