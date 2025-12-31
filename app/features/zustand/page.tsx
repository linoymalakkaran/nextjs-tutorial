'use client'

import { useTaskStore, useUserStore, useCounterStore } from '@/stores/useStore'
import { useState } from 'react'

export default function ZustandPage() {
  const [taskInput, setTaskInput] = useState('')
  
  // Zustand hooks
  const { tasks, addTask, toggleTask, deleteTask, clearCompleted } = useTaskStore()
  const { theme, notifications, setTheme, toggleNotifications } = useUserStore()
  const { count, increment, decrement, reset } = useCounterStore()

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (taskInput.trim()) {
      addTask(taskInput.trim())
      setTaskInput('')
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Zustand State Management</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Simple, fast, and scalable state management for React
        </p>
      </div>

      <div className="bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">What is Zustand?</h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="mr-2">🐻</span>
            <span><strong>Lightweight:</strong> Minimal boilerplate, small bundle size</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🐻</span>
            <span><strong>No Context Provider:</strong> Use stores directly without wrapping</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🐻</span>
            <span><strong>TypeScript First:</strong> Excellent TypeScript support</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🐻</span>
            <span><strong>Middleware:</strong> Built-in persist, devtools, and more</span>
          </li>
        </ul>
      </div>

      {/* Simple Counter Example */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-2xl font-semibold mb-4">Simple Counter</h3>
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={decrement}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
          >
            -
          </button>
          <div className="text-5xl font-bold text-violet-600 dark:text-violet-400 min-w-[100px] text-center">
            {count}
          </div>
          <button
            onClick={increment}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors"
          >
            +
          </button>
        </div>
        <div className="mt-4 text-center">
          <button
            onClick={reset}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors"
          >
            Reset
          </button>
        </div>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
          This counter state is shared across all components using this store
        </p>
      </div>

      {/* Task Manager with Persistence */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-2xl font-semibold mb-4">Task Manager (Persisted)</h3>
        
        <form onSubmit={handleAddTask} className="flex space-x-2 mb-4">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors"
          >
            Add
          </button>
        </form>

        {tasks.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            No tasks yet. Add one above!
          </p>
        ) : (
          <>
            <div className="space-y-2 mb-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="w-5 h-5 rounded"
                  />
                  <span
                    className={`flex-1 ${
                      task.completed
                        ? 'line-through text-gray-500 dark:text-gray-400'
                        : ''
                    }`}
                  >
                    {task.title}
                  </span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm transition-colors"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {tasks.filter(t => !t.completed).length} active tasks
              </span>
              <button
                onClick={clearCompleted}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded text-sm transition-colors"
              >
                Clear Completed
              </button>
            </div>
          </>
        )}

        <div className="mt-4 p-4 bg-violet-50 dark:bg-violet-900/20 rounded-lg border border-violet-200 dark:border-violet-700">
          <p className="text-sm">
            💾 <strong>Persistent Storage:</strong> Your tasks are saved to localStorage automatically.
            Refresh the page and they'll still be here!
          </p>
        </div>
      </div>

      {/* User Preferences */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-2xl font-semibold mb-4">User Preferences</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Theme</label>
            <div className="flex space-x-2">
              {(['light', 'dark', 'system'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                    theme === t
                      ? 'bg-violet-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span className="font-medium">Enable Notifications</span>
            <button
              onClick={toggleNotifications}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifications ? 'bg-violet-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
            <p className="text-sm">
              ⚙️ <strong>Current Settings:</strong>
              <br />
              Theme: {theme} | Notifications: {notifications ? 'On' : 'Off'}
            </p>
          </div>
        </div>
      </div>

      {/* Code Examples */}
      <div className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Code Example - Create Store</h3>
        <pre className="text-sm">
{`import { create } from 'zustand'

interface CounterStore {
  count: number
  increment: () => void
  decrement: () => void
}

export const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}))

// Use in component
function Counter() {
  const { count, increment } = useCounterStore()
  return <button onClick={increment}>{count}</button>
}`}
        </pre>
      </div>

      <div className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Code Example - With Persistence</h3>
        <pre className="text-sm">
{`import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useTaskStore = create(
  persist(
    (set) => ({
      tasks: [],
      addTask: (task) => set((state) => ({ 
        tasks: [...state.tasks, task] 
      })),
    }),
    {
      name: 'task-storage', // localStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
)`}
        </pre>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">✅ Advantages</h3>
          <ul className="text-sm space-y-1">
            <li>• Minimal boilerplate code</li>
            <li>• No Context Provider needed</li>
            <li>• Great TypeScript support</li>
            <li>• Small bundle size (~1KB)</li>
            <li>• Built-in middleware</li>
            <li>• React 18 compatible</li>
          </ul>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">🎯 Best For</h3>
          <ul className="text-sm space-y-1">
            <li>• Global app state</li>
            <li>• User preferences</li>
            <li>• Shopping carts</li>
            <li>• UI state (modals, sidebars)</li>
            <li>• Form state (complex forms)</li>
            <li>• Client-side caching</li>
          </ul>
        </div>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2">💡 Zustand vs Other Solutions</h3>
        <div className="space-y-2 text-sm">
          <p><strong>vs Redux:</strong> Much simpler, less boilerplate, similar patterns</p>
          <p><strong>vs Context:</strong> Better performance, no provider hell, simpler API</p>
          <p><strong>vs useState:</strong> Global state, persists across components</p>
          <p><strong>vs TanStack Query:</strong> For UI state, not async server data</p>
        </div>
      </div>
    </div>
  )
}
