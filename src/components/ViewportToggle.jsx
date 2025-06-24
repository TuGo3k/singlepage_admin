const ViewportToggle = ({ viewMode, setViewMode }) => (
  <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1 mb-4">
    <button
      onClick={() => setViewMode('desktop')}
      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        viewMode === 'desktop' 
          ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' 
          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
      }`}
    >
      Desktop
    </button>
    <button
      onClick={() => setViewMode('mobile')}
      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        viewMode === 'mobile' 
          ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' 
          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
      }`}
    >
      Mobile
    </button>
  </div>
);

export default ViewportToggle; 