import Link from 'next/link'

export default function DynamicRoutesPage() {
  const posts = [
    { id: '1', title: 'First Post' },
    { id: '2', title: 'Second Post' },
    { id: '3', title: 'Third Post' },
  ]

  const categories = ['technology', 'design', 'business']

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Dynamic Routes</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Create pages with dynamic segments using [folder] convention
        </p>
      </div>

      <div className="bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Dynamic Route Types</h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="mr-2">🔗</span>
            <span><strong>[folder]:</strong> Single dynamic segment (e.g., /posts/[id])</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🔗</span>
            <span><strong>[...folder]:</strong> Catch-all segments (e.g., /blog/[...slug])</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🔗</span>
            <span><strong>[[...folder]]:</strong> Optional catch-all (matches / too)</span>
          </li>
        </ul>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4">Single Dynamic Segment</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Click to view individual posts with [id] parameter
          </p>
          <div className="space-y-2">
            {posts.map(post => (
              <Link
                key={post.id}
                href={`/features/dynamic-routes/${post.id}`}
                className="block p-3 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded border border-blue-200 dark:border-blue-700 transition-colors"
              >
                <p className="font-semibold">{post.title}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Route: /posts/{post.id}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4">Catch-All Segments</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Navigate nested paths with [...slug] parameter
          </p>
          <div className="space-y-2">
            {categories.map(category => (
              <Link
                key={category}
                href={`/features/dynamic-routes/blog/${category}/2024/post-1`}
                className="block p-3 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded border border-purple-200 dark:border-purple-700 transition-colors"
              >
                <p className="font-semibold capitalize">{category} Posts</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Route: /blog/{category}/2024/post-1
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Code Example - Single Segment</h3>
        <pre className="text-sm">
{`// app/posts/[id]/page.tsx
export default function PostPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  return <div>Post ID: {params.id}</div>
}

// URL: /posts/123 → params.id = "123"`}
        </pre>
      </div>

      <div className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Code Example - Catch-All</h3>
        <pre className="text-sm">
{`// app/blog/[...slug]/page.tsx
export default function BlogPage({ 
  params 
}: { 
  params: { slug: string[] } 
}) {
  return <div>Slug: {params.slug.join('/')}</div>
}

// URL: /blog/a/b/c → params.slug = ["a", "b", "c"]`}
        </pre>
      </div>

      <div className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Code Example - Optional Catch-All</h3>
        <pre className="text-sm">
{`// app/shop/[[...slug]]/page.tsx
export default function ShopPage({ 
  params 
}: { 
  params: { slug?: string[] } 
}) {
  return <div>Path: {params.slug?.join('/') || 'home'}</div>
}

// URL: /shop → params.slug = undefined
// URL: /shop/category → params.slug = ["category"]
// URL: /shop/category/item → params.slug = ["category", "item"]`}
        </pre>
      </div>

      <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2">💡 Use Cases</h3>
        <ul className="space-y-2">
          <li>• <strong>[id]:</strong> User profiles, product pages, blog posts</li>
          <li>• <strong>[...slug]:</strong> Documentation sites, nested categories</li>
          <li>• <strong>[[...slug]]:</strong> Optional nested routes with fallback</li>
        </ul>
      </div>
    </div>
  )
}
