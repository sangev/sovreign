export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl max-w-sm mx-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              JULIUS is thinking...
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Finding the exact conversation snippet
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}