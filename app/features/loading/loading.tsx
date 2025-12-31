export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div>
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
      </div>

      <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-6">
        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
        </div>
      </div>

      <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-8">
        <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-6">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-6">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      </div>

      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      </div>
    </div>
  )
}
