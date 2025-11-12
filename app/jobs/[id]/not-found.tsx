export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Job Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          This job posting may have been removed or is no longer available.
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-[#0A66C2] text-white rounded-md hover:bg-[#0A66C2]/90 transition-colors"
        >
          Browse All Jobs
        </a>
      </div>
    </div>
  )
}
