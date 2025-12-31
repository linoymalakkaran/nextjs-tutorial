import { Metadata } from 'next'

// Static metadata
export const metadata: Metadata = {
  title: 'Metadata API - Next.js Learning',
  description: 'Learn how to add SEO-friendly metadata to your Next.js pages',
  keywords: ['Next.js', 'Metadata', 'SEO', 'Meta tags'],
  authors: [{ name: 'Next.js Team', url: 'https://nextjs.org' }],
  openGraph: {
    title: 'Metadata API Demo',
    description: 'Comprehensive metadata configuration example',
    url: 'https://example.com/features/metadata',
    siteName: 'Next.js Learning',
    images: [
      {
        url: 'https://picsum.photos/1200/630',
        width: 1200,
        height: 630,
        alt: 'Metadata API Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Metadata API - Next.js',
    description: 'Learn metadata configuration in Next.js',
    images: ['https://picsum.photos/1200/630'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function MetadataPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Metadata API</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Configure SEO-friendly metadata for better discoverability
        </p>
      </div>

      <div className="bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">What is the Metadata API?</h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="mr-2">🎯</span>
            <span><strong>SEO Optimization:</strong> Define titles, descriptions, and keywords</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🎯</span>
            <span><strong>Social Sharing:</strong> Open Graph and Twitter Card metadata</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🎯</span>
            <span><strong>Type-Safe:</strong> TypeScript support for metadata objects</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🎯</span>
            <span><strong>Dynamic or Static:</strong> Export metadata object or generateMetadata function</span>
          </li>
        </ul>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-4">Current Page Metadata</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Open browser DevTools and check the {'<head>'} section to see these meta tags
        </p>
        <div className="space-y-3">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
            <p className="text-sm text-gray-600 dark:text-gray-400">Title</p>
            <p className="font-semibold">Metadata API - Next.js Learning</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
            <p className="text-sm text-gray-600 dark:text-gray-400">Description</p>
            <p className="font-semibold">Learn how to add SEO-friendly metadata to your Next.js pages</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
            <p className="text-sm text-gray-600 dark:text-gray-400">Open Graph</p>
            <p className="font-semibold">Configured for social media sharing</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Static Metadata Example</h3>
        <pre className="text-sm">
{`import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Page Title',
  description: 'Page description for SEO',
  keywords: ['nextjs', 'react', 'seo'],
  authors: [{ name: 'John Doe' }],
  openGraph: {
    title: 'My Page Title',
    description: 'Shared on social media',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Page Title',
    images: ['/twitter-image.jpg'],
  },
}

export default function Page() {
  return <div>My Page</div>
}`}
        </pre>
      </div>

      <div className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Dynamic Metadata Example</h3>
        <pre className="text-sm">
{`// For dynamic routes with data fetching
export async function generateMetadata({ params }) {
  const post = await fetchPost(params.id)
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      images: [post.coverImage],
    },
  }
}

export default function Post({ params }) {
  return <article>...</article>
}`}
        </pre>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4">Basic Metadata Fields</h3>
          <ul className="text-sm space-y-2">
            <li><code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">title</code> - Page title</li>
            <li><code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">description</code> - Meta description</li>
            <li><code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">keywords</code> - SEO keywords</li>
            <li><code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">authors</code> - Content authors</li>
            <li><code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">robots</code> - Search engine directives</li>
            <li><code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">viewport</code> - Viewport settings</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4">Social Media Fields</h3>
          <ul className="text-sm space-y-2">
            <li><code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">openGraph</code> - Open Graph protocol</li>
            <li><code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">twitter</code> - Twitter Cards</li>
            <li><code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">facebook</code> - Facebook specific</li>
            <li><code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">images</code> - Preview images</li>
          </ul>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-4">Template Titles</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Create consistent titles across your site with templates
        </p>
        <div className="bg-gray-900 text-gray-100 rounded p-4 overflow-x-auto">
          <pre className="text-sm">
{`// layout.tsx
export const metadata = {
  title: {
    template: '%s | My Site',
    default: 'My Site',
  },
}

// page.tsx
export const metadata = {
  title: 'About', // → "About | My Site"
}`}
          </pre>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">✅ Benefits</h3>
          <ul className="text-sm space-y-1">
            <li>• Better SEO ranking</li>
            <li>• Rich social media previews</li>
            <li>• Type-safe configuration</li>
            <li>• Automatic deduplication</li>
            <li>• Parent-child merging</li>
          </ul>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">🎨 Use Cases</h3>
          <ul className="text-sm space-y-1">
            <li>• Blog posts</li>
            <li>• Product pages</li>
            <li>• Landing pages</li>
            <li>• Documentation sites</li>
            <li>• Any public content</li>
          </ul>
        </div>
      </div>

      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2">💡 Pro Tips</h3>
        <ul className="space-y-2">
          <li>• Use generateMetadata for dynamic content</li>
          <li>• Define title templates in root layout for consistency</li>
          <li>• Include Open Graph images (1200x630px recommended)</li>
          <li>• Test with social media debuggers before deployment</li>
          <li>• Child metadata merges with and overrides parent metadata</li>
        </ul>
      </div>
    </div>
  )
}
