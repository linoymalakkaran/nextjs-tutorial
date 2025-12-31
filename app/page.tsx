import Link from 'next/link'

export default function Home() {
  const features = [
    {
      title: '1. Server Components',
      description: 'Default React Server Components for better performance',
      href: '/features/server-components',
      category: 'Rendering'
    },
    {
      title: '2. Client Components',
      description: 'Interactive components with useState, useEffect, and event handlers',
      href: '/features/client-components',
      category: 'Rendering'
    },
    {
      title: '3. Server Actions',
      description: 'Server-side form handling and mutations without API routes',
      href: '/features/server-actions',
      category: 'Data Mutations'
    },
    {
      title: '4. API Routes',
      description: 'RESTful API endpoints in the app directory',
      href: '/features/api-routes',
      category: 'API'
    },
    {
      title: '5. Dynamic Routes',
      description: 'Dynamic segments and catch-all routes',
      href: '/features/dynamic-routes',
      category: 'Routing'
    },
    {
      title: '6. Static Site Generation (SSG)',
      description: 'Pre-rendered pages at build time with generateStaticParams',
      href: '/features/ssg',
      category: 'Rendering'
    },
    {
      title: '7. Server-Side Rendering (SSR)',
      description: 'Dynamic rendering on each request',
      href: '/features/ssr',
      category: 'Rendering'
    },
    {
      title: '8. Incremental Static Regeneration (ISR)',
      description: 'Update static pages after build with revalidation',
      href: '/features/isr',
      category: 'Rendering'
    },
    {
      title: '9. Image Optimization',
      description: 'Next.js Image component with automatic optimization',
      href: '/features/image-optimization',
      category: 'Optimization'
    },
    {
      title: '10. Metadata API',
      description: 'SEO-friendly metadata generation',
      href: '/features/metadata',
      category: 'SEO'
    },
    {
      title: '11. Loading States',
      description: 'Loading UI and Suspense boundaries',
      href: '/features/loading',
      category: 'UX'
    },
    {
      title: '12. Error Handling',
      description: 'Error boundaries and error pages',
      href: '/features/error-handling',
      category: 'UX'
    },
    {
      title: '13. Parallel Routes',
      description: 'Render multiple pages in the same layout simultaneously',
      href: '/features/parallel-routes',
      category: 'Advanced Routing'
    },
    {
      title: '14. Intercepting Routes',
      description: 'Intercept routes to show modals or overlays',
      href: '/features/intercepting-routes',
      category: 'Advanced Routing'
    },
    {
      title: '15. Route Groups',
      description: 'Organize routes without affecting URL structure',
      href: '/features/route-groups',
      category: 'Routing'
    },
    {
      title: '16. Middleware',
      description: 'Run code before request completion',
      href: '/middleware-demo',
      category: 'Advanced'
    },
    {
      title: '17. TanStack Query (React Query)',
      description: 'Powerful data fetching and caching for client components',
      href: '/features/tanstack-query',
      category: 'State Management'
    },
    {
      title: '18. Zustand State Management',
      description: 'Lightweight and fast state management solution',
      href: '/features/zustand',
      category: 'State Management'
    },
    {
      title: '19. Database Queries',
      description: 'Server-side database patterns and best practices',
      href: '/features/database-queries',
      category: 'Data'
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Next.js Learning Hub
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Explore all major Next.js features through interactive examples. 
          Each module is designed to help you understand and implement these features in your projects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Link
            key={feature.href}
            href={feature.href}
            className="group block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                {feature.category}
              </span>
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {feature.description}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li className="flex items-start">
            <span className="mr-2">📚</span>
            Click on any feature card to see a working example
          </li>
          <li className="flex items-start">
            <span className="mr-2">💻</span>
            Review the code in each module to understand implementation
          </li>
          <li className="flex items-start">
            <span className="mr-2">🔧</span>
            Experiment by modifying the code and see changes in real-time
          </li>
          <li className="flex items-start">
            <span className="mr-2">📖</span>
            Each feature includes comments explaining key concepts
          </li>
          <li className="flex items-start">
            <span className="mr-2">📘</span>
            <Link href="/docs" className="text-blue-600 dark:text-blue-400 hover:underline">
              View comprehensive documentation
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
