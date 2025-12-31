import Image from 'next/image'

export default function ImageOptimizationPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Image Optimization</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Next.js Image component with automatic optimization
        </p>
      </div>

      <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Image Component Benefits</h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="mr-2">🖼️</span>
            <span><strong>Automatic Optimization:</strong> Serves WebP/AVIF when supported</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🖼️</span>
            <span><strong>Lazy Loading:</strong> Images load only when in viewport</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🖼️</span>
            <span><strong>Responsive:</strong> Serves appropriate size for device</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🖼️</span>
            <span><strong>No Layout Shift:</strong> Prevents CLS with dimensions</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🖼️</span>
            <span><strong>Priority Loading:</strong> Preload important images</span>
          </li>
        </ul>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Fixed Size Image */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4">Fixed Size Image</h3>
          <div className="relative mb-4">
            <Image
              src="https://picsum.photos/400/300"
              alt="Fixed size example"
              width={400}
              height={300}
              className="rounded-lg"
            />
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded text-sm font-mono">
            width=&#123;400&#125; height=&#123;300&#125;
          </div>
        </div>

        {/* Responsive Image with fill */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4">Responsive (Fill Container)</h3>
          <div className="relative h-[300px] mb-4">
            <Image
              src="https://picsum.photos/800/600"
              alt="Responsive fill example"
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded text-sm font-mono">
            fill objectFit="cover"
          </div>
        </div>

        {/* Priority Image */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4">Priority Image</h3>
          <div className="relative mb-4">
            <Image
              src="https://picsum.photos/400/250"
              alt="Priority loading example"
              width={400}
              height={250}
              priority
              className="rounded-lg"
            />
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded text-sm">
            <strong>priority</strong> - Preloaded for above-the-fold images
          </div>
        </div>

        {/* Placeholder Blur */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4">With Blur Placeholder</h3>
          <div className="relative mb-4">
            <Image
              src="https://picsum.photos/400/250?blur=2"
              alt="Blur placeholder example"
              width={400}
              height={250}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
              className="rounded-lg"
            />
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded text-sm">
            <strong>placeholder="blur"</strong> - Shows blur while loading
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Code Examples</h3>
        <pre className="text-sm">
{`import Image from 'next/image'

// 1. Fixed size
<Image 
  src="/photo.jpg" 
  alt="Description" 
  width={500} 
  height={300} 
/>

// 2. Fill container (responsive)
<div className="relative h-64">
  <Image 
    src="/photo.jpg" 
    alt="Description" 
    fill 
    className="object-cover" 
  />
</div>

// 3. Priority (above the fold)
<Image 
  src="/hero.jpg" 
  alt="Hero" 
  width={1200} 
  height={600} 
  priority 
/>

// 4. With blur placeholder
<Image 
  src="/photo.jpg" 
  alt="Description" 
  width={500} 
  height={300} 
  placeholder="blur" 
  blurDataURL="data:image/..." 
/>`}
        </pre>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-4">Image Props Reference</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="border-b-2 border-gray-200 dark:border-gray-700">
              <tr>
                <th className="text-left p-2">Prop</th>
                <th className="text-left p-2">Type</th>
                <th className="text-left p-2">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="p-2 font-mono">src</td>
                <td className="p-2">string</td>
                <td className="p-2">Image source (local or remote)</td>
              </tr>
              <tr>
                <td className="p-2 font-mono">alt</td>
                <td className="p-2">string</td>
                <td className="p-2">Alt text (required for accessibility)</td>
              </tr>
              <tr>
                <td className="p-2 font-mono">width</td>
                <td className="p-2">number</td>
                <td className="p-2">Image width in pixels</td>
              </tr>
              <tr>
                <td className="p-2 font-mono">height</td>
                <td className="p-2">number</td>
                <td className="p-2">Image height in pixels</td>
              </tr>
              <tr>
                <td className="p-2 font-mono">fill</td>
                <td className="p-2">boolean</td>
                <td className="p-2">Fill parent container (responsive)</td>
              </tr>
              <tr>
                <td className="p-2 font-mono">priority</td>
                <td className="p-2">boolean</td>
                <td className="p-2">Preload image (disable lazy loading)</td>
              </tr>
              <tr>
                <td className="p-2 font-mono">placeholder</td>
                <td className="p-2">string</td>
                <td className="p-2">"blur" | "empty"</td>
              </tr>
              <tr>
                <td className="p-2 font-mono">quality</td>
                <td className="p-2">number</td>
                <td className="p-2">1-100 (default: 75)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">✅ Benefits</h3>
          <ul className="text-sm space-y-1">
            <li>• Smaller file sizes (20-80% reduction)</li>
            <li>• Automatic modern formats</li>
            <li>• Lazy loading by default</li>
            <li>• No cumulative layout shift</li>
            <li>• Better Core Web Vitals</li>
          </ul>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">⚙️ Configuration</h3>
          <ul className="text-sm space-y-1">
            <li>• Configure in next.config.js</li>
            <li>• Add remote patterns for external images</li>
            <li>• Customize loader for custom CDN</li>
            <li>• Set default quality and formats</li>
          </ul>
        </div>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2">⚠️ Important</h3>
        <ul className="space-y-2">
          <li>• Always provide width and height (or use fill) to prevent layout shift</li>
          <li>• Use priority prop for above-the-fold images</li>
          <li>• Configure remotePatterns in next.config.js for external images</li>
          <li>• Consider using placeholder="blur" for better UX</li>
        </ul>
      </div>
    </div>
  )
}
