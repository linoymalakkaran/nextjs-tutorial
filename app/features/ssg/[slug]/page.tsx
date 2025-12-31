// Static Site Generation (SSG) Example
// This page is pre-rendered at BUILD TIME

import Link from 'next/link'

// This function generates static params at build time
export async function generateStaticParams() {
  // In a real app, fetch from CMS/database
  const posts = ['introduction', 'getting-started', 'advanced-topics']
  
  return posts.map((slug) => ({
    slug: slug,
  }))
}

// Mock function to simulate data fetching
async function getPostData(slug: string) {
  return {
    slug,
    title: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    content: `This is the content for ${slug}. This page was pre-rendered at build time!`,
    author: 'John Doe',
    date: '2024-01-15',
    readTime: '5 min read'
  }
}

export default async function SSGPage({
  params,
}: {
  params: { slug: string }
}) {
  // This data fetch happens at BUILD TIME, not on request
  const post = await getPostData(params.slug)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Static Site Generation (SSG)</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Pages generated at build time with generateStaticParams
        </p>
      </div>

      <div className="bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">What is SSG?</h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="mr-2">⚡</span>
            <span><strong>Pre-rendered at Build:</strong> HTML generated once during build</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">⚡</span>
            <span><strong>Lightning Fast:</strong> Served from CDN, no server processing</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">⚡</span>
            <span><strong>SEO Perfect:</strong> Fully rendered HTML for crawlers</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">⚡</span>
            <span><strong>Cost Effective:</strong> Minimal server resources needed</span>
          </li>
        </ul>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">{post.title}</h2>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 space-x-4">
            <span>By {post.author}</span>
            <span>•</span>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </div>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg">{post.content}</p>
        </div>

        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
          <p className="text-sm">
            ✅ <strong>This page was pre-rendered at build time</strong> - not on each request!
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-4">Available Static Pages</h3>
        <div className="space-y-2">
          <Link
            href="/features/ssg/introduction"
            className="block p-3 bg-cyan-50 dark:bg-cyan-900/20 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 rounded border border-cyan-200 dark:border-cyan-700 transition-colors"
          >
            Introduction
          </Link>
          <Link
            href="/features/ssg/getting-started"
            className="block p-3 bg-cyan-50 dark:bg-cyan-900/20 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 rounded border border-cyan-200 dark:border-cyan-700 transition-colors"
          >
            Getting Started
          </Link>
          <Link
            href="/features/ssg/advanced-topics"
            className="block p-3 bg-cyan-50 dark:bg-cyan-900/20 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 rounded border border-cyan-200 dark:border-cyan-700 transition-colors"
          >
            Advanced Topics
          </Link>
        </div>
      </div>

      <div className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Code Example</h3>
        <pre className="text-sm">
{`// app/blog/[slug]/page.tsx

// Generate static params at build time
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts')
    .then(res => res.json())
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// This runs at BUILD TIME for each generated param
export default async function BlogPost({ params }) {
  const post = await fetch(\`https://api.example.com/posts/\${params.slug}\`)
    .then(res => res.json())
  
  return <article>{post.content}</article>
}

// Result: All blog post pages pre-rendered at build time!`}
        </pre>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">✅ Best For</h3>
          <ul className="text-sm space-y-1">
            <li>• Marketing pages</li>
            <li>• Blog posts</li>
            <li>• Documentation</li>
            <li>• Product listings</li>
            <li>• Landing pages</li>
          </ul>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">⚠️ Not Ideal For</h3>
          <ul className="text-sm space-y-1">
            <li>• Real-time data</li>
            <li>• User-specific content</li>
            <li>• Frequently changing data</li>
            <li>• Millions of pages</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
