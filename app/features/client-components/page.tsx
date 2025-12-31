// Client Component - uses 'use client' directive
// This tells Next.js this component needs JavaScript on the client
'use client'

import { useState, useEffect } from 'react'

export default function ClientComponentsPage() {
  // Client-side state management
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')
  const [time, setTime] = useState(new Date().toLocaleTimeString())

  // useEffect - only works in Client Components
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Event handlers - only work in Client Components
  const handleClick = () => {
    setCount(count + 1)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Client Components</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Client Components add interactivity with browser APIs and React hooks
        </p>
      </div>

      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">When to Use Client Components</h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="mr-2">🎯</span>
            <span><strong>Interactivity:</strong> Event handlers (onClick, onChange, etc.)</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🎯</span>
            <span><strong>State & Effects:</strong> useState, useEffect, useReducer</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🎯</span>
            <span><strong>Browser APIs:</strong> localStorage, window, document</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🎯</span>
            <span><strong>Custom Hooks:</strong> Any hook that uses state or effects</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🎯</span>
            <span><strong>React Context:</strong> Context providers and consumers</span>
          </li>
        </ul>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Interactive Counter */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4">Counter (useState)</h3>
          <div className="text-center">
            <p className="text-5xl font-bold mb-4 text-blue-600 dark:text-blue-400">{count}</p>
            <button
              onClick={handleClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Increment
            </button>
          </div>
        </div>

        {/* Real-time Clock */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4">Clock (useEffect)</h3>
          <div className="text-center">
            <p className="text-3xl font-mono mb-4 text-purple-600 dark:text-purple-400">{time}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Updates every second</p>
          </div>
        </div>

        {/* Input Field */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4">Input (onChange)</h3>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type something..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-2 dark:bg-gray-700"
          />
          <p className="text-sm">You typed: <strong>{text || '(nothing yet)'}</strong></p>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Key Characteristics</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-green-600 dark:text-green-400 mb-2">✓ Can Use</h3>
            <ul className="text-sm space-y-1">
              <li>• All React hooks</li>
              <li>• Event handlers</li>
              <li>• Browser APIs</li>
              <li>• Third-party libraries</li>
              <li>• React Context</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-yellow-600 dark:text-yellow-400 mb-2">⚠ Limitations</h3>
            <ul className="text-sm space-y-1">
              <li>• Cannot be async</li>
              <li>• Increases bundle size</li>
              <li>• Requires hydration</li>
              <li>• No direct backend access</li>
              <li>• Runs on client side</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Code Example</h3>
        <pre className="text-sm">
{`'use client' // Must have this directive at the top

import { useState } from 'react'

export default function ClientComponent() {
  const [count, setCount] = useState(0)
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  )
}

// The 'use client' directive tells Next.js to render
// this component on the client with JavaScript`}
        </pre>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2">💡 Best Practice</h3>
        <p>
          Use Server Components by default and only add 'use client' when you need interactivity.
          Keep Client Components small and leaf nodes in your component tree for optimal performance.
        </p>
      </div>
    </div>
  )
}
