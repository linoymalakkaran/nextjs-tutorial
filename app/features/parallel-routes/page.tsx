export default function ParallelRoutesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Parallel Routes</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Render multiple pages in the same layout simultaneously
        </p>
      </div>

      <div className="bg-fuchsia-50 dark:bg-fuchsia-900/20 border border-fuchsia-200 dark:border-fuchsia-800 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">What are Parallel Routes?</h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="mr-2">🔀</span>
            <span><strong>Multiple Slots:</strong> Render independent routes in the same layout</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🔀</span>
            <span><strong>@folder Convention:</strong> Use @folder syntax for named slots</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🔀</span>
            <span><strong>Independent Navigation:</strong> Each slot can have its own loading/error states</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🔀</span>
            <span><strong>Conditional Rendering:</strong> Show/hide slots based on conditions</span>
          </li>
        </ul>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-4">Example Use Cases</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-lg border border-fuchsia-200 dark:border-fuchsia-700">
            <h4 className="font-semibold mb-2">Dashboard Layout</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Analytics panel + Team members sidebar rendered in parallel
            </p>
          </div>
          <div className="p-4 bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-lg border border-fuchsia-200 dark:border-fuchsia-700">
            <h4 className="font-semibold mb-2">Social Media Feed</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Main feed + Trending sidebar + Notifications panel
            </p>
          </div>
          <div className="p-4 bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-lg border border-fuchsia-200 dark:border-fuchsia-700">
            <h4 className="font-semibold mb-2">E-commerce</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Product list + Filters + Cart summary
            </p>
          </div>
          <div className="p-4 bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-lg border border-fuchsia-200 dark:border-fuchsia-700">
            <h4 className="font-semibold mb-2">Admin Panel</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              User table + Activity log + Statistics
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">File Structure</h3>
        <pre className="text-sm">
{`app/
├── layout.tsx
└── dashboard/
    ├── layout.tsx          # Defines slots
    ├── page.tsx            # Main content
    ├── @analytics/         # Named slot
    │   └── page.tsx
    ├── @team/              # Named slot
    │   └── page.tsx
    └── @notifications/     # Named slot
        └── page.tsx

// All three slots render simultaneously in dashboard`}
        </pre>
      </div>

      <div className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Layout Implementation</h3>
        <pre className="text-sm">
{`// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,        // Default slot (page.tsx)
  analytics,       // @analytics slot
  team,            // @team slot
  notifications,   // @notifications slot
}) {
  return (
    <div className="dashboard-grid">
      <div className="main-content">
        {children}
      </div>
      <aside className="sidebar">
        {team}
        {notifications}
      </aside>
      <section className="analytics">
        {analytics}
      </section>
    </div>
  )
}

// Each slot can have its own:
// - loading.tsx
// - error.tsx
// - not-found.tsx`}
        </pre>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-4">Slot Props</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Named slots are passed as props to the parent layout:
        </p>
        <div className="space-y-2 text-sm font-mono">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-700">
            @analytics → analytics prop
          </div>
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-700">
            @team → team prop
          </div>
          <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded border border-purple-200 dark:border-purple-700">
            @notifications → notifications prop
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded">
            page.tsx → children prop (default slot)
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Conditional Rendering</h3>
        <pre className="text-sm">
{`// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
  analytics,
  team,
}: {
  children: React.ReactNode
  analytics: React.ReactNode
  team: React.ReactNode
}) {
  const user = await getUser()
  
  return (
    <div>
      <main>{children}</main>
      
      {/* Only show analytics to admins */}
      {user.role === 'admin' && (
        <aside>{analytics}</aside>
      )}
      
      {/* Always show team */}
      <aside>{team}</aside>
    </div>
  )
}`}
        </pre>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">✅ Benefits</h3>
          <ul className="text-sm space-y-1">
            <li>• Independent loading states</li>
            <li>• Separate error boundaries</li>
            <li>• Conditional slot rendering</li>
            <li>• Complex UI layouts</li>
            <li>• Parallel data fetching</li>
          </ul>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">🎯 Perfect For</h3>
          <ul className="text-sm space-y-1">
            <li>• Dashboard layouts</li>
            <li>• Split-screen UIs</li>
            <li>• Admin panels</li>
            <li>• Multi-pane applications</li>
            <li>• Complex data displays</li>
          </ul>
        </div>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2">💡 Key Points</h3>
        <ul className="space-y-2">
          <li>• Use @ prefix for slot folders (e.g., @analytics)</li>
          <li>• Slots are not URL segments - they don't affect the URL</li>
          <li>• Each slot can have its own loading and error states</li>
          <li>• Slots can be conditionally rendered in the layout</li>
          <li>• Create default.tsx for unmatched routes in slots</li>
        </ul>
      </div>
    </div>
  )
}
