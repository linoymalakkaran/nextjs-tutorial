import Link from 'next/link'

export default function InterceptingRoutesPage() {
  const photos = [
    { id: '1', title: 'Mountain Landscape', url: 'https://picsum.photos/400/300?random=1' },
    { id: '2', title: 'Ocean View', url: 'https://picsum.photos/400/300?random=2' },
    { id: '3', title: 'City Skyline', url: 'https://picsum.photos/400/300?random=3' },
    { id: '4', title: 'Forest Path', url: 'https://picsum.photos/400/300?random=4' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Intercepting Routes</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Show content in modals or overlays while preserving the URL
        </p>
      </div>

      <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">What are Intercepting Routes?</h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="mr-2">🎭</span>
            <span><strong>Route Interception:</strong> Show different UI for same route depending on navigation</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🎭</span>
            <span><strong>Modal Patterns:</strong> Open content in modal on client navigation, full page on direct visit</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🎭</span>
            <span><strong>Shareable URLs:</strong> Modal content has its own URL</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🎭</span>
            <span><strong>Back Button:</strong> Closing modal navigates back correctly</span>
          </li>
        </ul>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-4">Example: Photo Gallery</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Click on a photo to see it in a modal. Refresh the page to see the full photo page.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map(photo => (
            <Link
              key={photo.id}
              href={`/features/intercepting-routes/photo/${photo.id}`}
              className="group block relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700 hover:border-rose-500 dark:hover:border-rose-400 transition-colors"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-end p-2">
                <p className="text-white font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  {photo.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Intercepting Conventions</h3>
        <pre className="text-sm">
{`(.) - Same level
(..) - One level up
(..)(..) - Two levels up
(...) - From root

Example:
app/
├── feed/
│   ├── page.tsx
│   ├── (..)photo/          # Intercept /photo from /feed
│   │   └── [id]/
│   │       └── page.tsx    # Shows modal
│   └── ...
└── photo/
    └── [id]/
        └── page.tsx        # Full page (direct visit)`}
        </pre>
      </div>

      <div className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Implementation Example</h3>
        <pre className="text-sm">
{`// app/feed/(..)photo/[id]/page.tsx (Intercepted - Modal)
import Modal from '@/components/Modal'

export default function PhotoModal({ params }) {
  const photo = await getPhoto(params.id)
  
  return (
    <Modal>
      <img src={photo.url} alt={photo.title} />
      <h2>{photo.title}</h2>
    </Modal>
  )
}

// app/photo/[id]/page.tsx (Full Page)
export default function PhotoPage({ params }) {
  const photo = await getPhoto(params.id)
  
  return (
    <div className="full-page">
      <img src={photo.url} alt={photo.title} />
      <h1>{photo.title}</h1>
      <p>{photo.description}</p>
    </div>
  )
}

// Navigation from /feed: Shows modal
// Direct visit to /photo/1: Shows full page
// Shareable URL: /photo/1`}
        </pre>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4">Client Navigation</h3>
          <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded border border-rose-200 dark:border-rose-700">
            <p className="text-sm mb-2">When you navigate from within the app:</p>
            <p className="font-mono text-sm">(..)photo/[id] → Modal</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4">Direct Visit</h3>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-700">
            <p className="text-sm mb-2">When you visit URL directly:</p>
            <p className="font-mono text-sm">photo/[id] → Full Page</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-4">Common Use Cases</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
            <h4 className="font-semibold mb-2">Photo Galleries</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Modal on navigation, full page on refresh
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
            <h4 className="font-semibold mb-2">Login/Signup</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Modal from any page, dedicated page if bookmarked
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
            <h4 className="font-semibold mb-2">Shopping Cart</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Overlay from product page, full page if navigated directly
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
            <h4 className="font-semibold mb-2">Share Dialog</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Modal with shareable URL
            </p>
          </div>
        </div>
      </div>

      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2">✅ Benefits</h3>
        <ul className="space-y-2">
          <li>• Better UX with modals that have unique URLs</li>
          <li>• Shareable modal content</li>
          <li>• Proper back button behavior</li>
          <li>• SEO-friendly (full page on direct access)</li>
          <li>• Progressive enhancement</li>
        </ul>
      </div>

      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2">💡 Pro Tips</h3>
        <ul className="space-y-2">
          <li>• Combine with parallel routes for complex modal layouts</li>
          <li>• Use router.back() to close modals</li>
          <li>• Ensure both intercepted and full page routes exist</li>
          <li>• Test both navigation methods (client nav + direct visit)</li>
          <li>• Consider accessibility when implementing modals</li>
        </ul>
      </div>
    </div>
  )
}
