// This is a React Server Component (RSC)
// Server Components are the DEFAULT in Next.js App Router
// They run ONLY on the server and can directly access backend resources

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Server Components - Next.js Learning',
  description: 'Learn about React Server Components in Next.js',
}

// Simulating a database or API call
async function getData() {
  // This runs on the SERVER only, never sent to client
  await new Promise(resolve => setTimeout(resolve, 1000))
  return {
    message: 'Data fetched directly on the server',
    timestamp: new Date().toISOString(),
    serverInfo: 'This component rendered on the server'
  }
}

export default async function ServerComponentsPage() {
  // Async components are only possible with Server Components
  const data = await getData()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Server Components</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          React Server Components (RSC) are the default in Next.js App Router
        </p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Benefits of Server Components</h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="mr-2">✅</span>
            <span><strong>Zero JavaScript to Client:</strong> Reduces bundle size</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">✅</span>
            <span><strong>Direct Backend Access:</strong> Database, filesystem, env variables</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">✅</span>
            <span><strong>Automatic Code Splitting:</strong> Better performance</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">✅</span>
            <span><strong>SEO Friendly:</strong> Content rendered on server</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">✅</span>
            <span><strong>Async/Await Support:</strong> Can be async functions</span>
          </li>
        </ul>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-4">Server-Side Data</h2>
        <div className="space-y-2">
          <p><strong>Message:</strong> {data.message}</p>
          <p><strong>Timestamp:</strong> {data.timestamp}</p>
          <p><strong>Info:</strong> {data.serverInfo}</p>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Key Characteristics</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-green-600 dark:text-green-400 mb-2">✓ Can Use</h3>
            <ul className="text-sm space-y-1">
              <li>• async/await</li>
              <li>• Direct database access</li>
              <li>• Server-only packages</li>
              <li>• Environment variables</li>
              <li>• Backend APIs</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-red-600 dark:text-red-400 mb-2">✗ Cannot Use</h3>
            <ul className="text-sm space-y-1">
              <li>• useState, useEffect</li>
              <li>• Event handlers (onClick, etc.)</li>
              <li>• Browser APIs</li>
              <li>• React Context</li>
              <li>• Custom hooks</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Code Example</h3>
        <pre className="text-sm">
{`// app/page.tsx - Server Component by default
async function getData() {
  const res = await fetch('https://api.example.com/data')
  return res.json()
}

export default async function Page() {
  const data = await getData() // Direct async/await
  return <div>{data.message}</div>
}

// No 'use client' directive needed - it's the default!`}
        </pre>
      </div>
    </div>
  )
}
