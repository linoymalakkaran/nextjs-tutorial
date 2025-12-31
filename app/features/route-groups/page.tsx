import Link from 'next/link'

export default function RouteGroupsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Route Groups</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Organize routes without affecting the URL structure
        </p>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">What are Route Groups?</h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="mr-2">📁</span>
            <span><strong>(folder) Convention:</strong> Parentheses create a route group</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">📁</span>
            <span><strong>URL Omission:</strong> Group name is NOT included in the URL</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">📁</span>
            <span><strong>Organization:</strong> Organize routes by feature, team, or purpose</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">📁</span>
            <span><strong>Multiple Layouts:</strong> Different layouts for different sections</span>
          </li>
        </ul>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-4">File Structure Example</h3>
        <div className="bg-gray-900 text-gray-100 rounded p-4 overflow-x-auto">
          <pre className="text-sm">
{`app/
├── (marketing)/          # Group: Marketing pages
│   ├── layout.tsx        # Marketing layout
│   ├── page.tsx          # / (home)
│   ├── about/
│   │   └── page.tsx      # /about
│   └── contact/
│       └── page.tsx      # /contact
│
├── (shop)/               # Group: Shopping pages
│   ├── layout.tsx        # Shop layout
│   ├── products/
│   │   └── page.tsx      # /products
│   └── cart/
│       └── page.tsx      # /cart
│
└── (dashboard)/          # Group: Dashboard pages
    ├── layout.tsx        # Dashboard layout
    ├── settings/
    │   └── page.tsx      # /settings
    └── profile/
        └── page.tsx      # /profile

Note: (group) names are NOT in the URL!
/about NOT /(marketing)/about`}
          </pre>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Marketing Group</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Public-facing pages with marketing layout
          </p>
          <div className="space-y-2">
            <Link href="/" className="block p-2 bg-white dark:bg-gray-700 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
              Home (/)
            </Link>
            <div className="block p-2 bg-white dark:bg-gray-700 rounded text-gray-500">
              About (/about)
            </div>
            <div className="block p-2 bg-white dark:bg-gray-700 rounded text-gray-500">
              Contact (/contact)
            </div>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Shop Group</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            E-commerce pages with shop layout
          </p>
          <div className="space-y-2">
            <div className="block p-2 bg-white dark:bg-gray-700 rounded text-gray-500">
              Products (/products)
            </div>
            <div className="block p-2 bg-white dark:bg-gray-700 rounded text-gray-500">
              Cart (/cart)
            </div>
            <div className="block p-2 bg-white dark:bg-gray-700 rounded text-gray-500">
              Checkout (/checkout)
            </div>
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Dashboard Group</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Protected pages with dashboard layout
          </p>
          <div className="space-y-2">
            <div className="block p-2 bg-white dark:bg-gray-700 rounded text-gray-500">
              Settings (/settings)
            </div>
            <div className="block p-2 bg-white dark:bg-gray-700 rounded text-gray-500">
              Profile (/profile)
            </div>
            <div className="block p-2 bg-white dark:bg-gray-700 rounded text-gray-500">
              Analytics (/analytics)
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Multiple Layouts Example</h3>
        <pre className="text-sm">
{`// app/(marketing)/layout.tsx
export default function MarketingLayout({ children }) {
  return (
    <div>
      <MarketingHeader />
      {children}
      <MarketingFooter />
    </div>
  )
}

// app/(dashboard)/layout.tsx
export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main>{children}</main>
    </div>
  )
}

// Different layouts, same root (/)`}
        </pre>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-4">Organization Strategies</h3>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
            <h4 className="font-semibold mb-2">By Feature</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
              (auth), (blog), (shop), (admin)
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
            <h4 className="font-semibold mb-2">By Access Level</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
              (public), (protected), (admin)
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
            <h4 className="font-semibold mb-2">By Layout</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
              (marketing), (app), (dashboard)
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
            <h4 className="font-semibold mb-2">By Team</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
              (team-a), (team-b), (shared)
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Opting Out of Root Layout</h3>
        <pre className="text-sm">
{`app/
├── layout.tsx              # Root layout
├── (shop)/
│   ├── layout.tsx          # Uses root layout
│   └── products/page.tsx
└── (auth)/
    ├── layout.tsx          # Add <html> & <body> to opt out
    ├── login/page.tsx
    └── register/page.tsx

// app/(auth)/layout.tsx - Completely separate layout
export default function AuthLayout({ children }) {
  return (
    <html>
      <body className="auth-theme">
        {children}
      </body>
    </html>
  )
}

// Now (auth) routes have a completely different layout tree`}
        </pre>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">✅ Benefits</h3>
          <ul className="text-sm space-y-1">
            <li>• Clean file organization</li>
            <li>• Multiple root layouts</li>
            <li>• Group by feature/team</li>
            <li>• No URL impact</li>
            <li>• Shared layouts per group</li>
          </ul>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">🎯 Use Cases</h3>
          <ul className="text-sm space-y-1">
            <li>• Different layouts for sections</li>
            <li>• Organize large codebases</li>
            <li>• Team-based organization</li>
            <li>• Feature-based grouping</li>
            <li>• Access level separation</li>
          </ul>
        </div>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2">⚠️ Important Notes</h3>
        <ul className="space-y-2">
          <li>• Group names are NOT part of the URL path</li>
          <li>• Routes across groups shouldn't resolve to the same URL</li>
          <li>• You can have multiple root layouts with groups</li>
          <li>• Groups can be nested</li>
          <li>• Each group can have its own layout, loading, error files</li>
        </ul>
      </div>

      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2">💡 Pro Tips</h3>
        <ul className="space-y-2">
          <li>• Use route groups early - harder to refactor later</li>
          <li>• Group by layout needs first, then by feature</li>
          <li>• Keep group names descriptive and consistent</li>
          <li>• Document your grouping strategy for the team</li>
          <li>• Combine with parallel routes for complex layouts</li>
        </ul>
      </div>
    </div>
  )
}
