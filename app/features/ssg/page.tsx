import Link from 'next/link'

export default function SSGIndexPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Static Site Generation (SSG)</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Pre-render pages at build time for maximum performance
        </p>
      </div>

      <div className="bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">How SSG Works</h2>
        <p className="mb-4">
          Static Site Generation creates HTML pages at build time. These pages are then served
          from a CDN, making them incredibly fast to load.
        </p>
        <div className="bg-white dark:bg-gray-800 rounded p-4">
          <p className="text-sm font-mono">
            Build Time → Generate HTML → Deploy to CDN → Serve to Users (instantly!)
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-4">Try Static Pages</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Click on any page below to see SSG in action. These pages were generated at build time:
        </p>
        <div className="space-y-2">
          <Link
            href="/features/ssg/introduction"
            className="block p-4 bg-cyan-50 dark:bg-cyan-900/20 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 rounded border border-cyan-200 dark:border-cyan-700 transition-colors"
          >
            <h4 className="font-semibold">Introduction</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Learn the basics of SSG</p>
          </Link>
          <Link
            href="/features/ssg/getting-started"
            className="block p-4 bg-cyan-50 dark:bg-cyan-900/20 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 rounded border border-cyan-200 dark:border-cyan-700 transition-colors"
          >
            <h4 className="font-semibold">Getting Started</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Start using SSG in your projects</p>
          </Link>
          <Link
            href="/features/ssg/advanced-topics"
            className="block p-4 bg-cyan-50 dark:bg-cyan-900/20 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 rounded border border-cyan-200 dark:border-cyan-700 transition-colors"
          >
            <h4 className="font-semibold">Advanced Topics</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Master advanced SSG techniques</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
