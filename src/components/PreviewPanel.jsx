'use client';

export default function PreviewPanel() {
  return (
    <div className="w-[600px] border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="h-16 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Сайтын Preview</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => window.open('http://localhost:3000', '_blank')}
            className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Шинэ цонхонд нээх
          </button>
          <button
            onClick={() => {
              const iframe = document.querySelector('iframe');
              if (iframe) iframe.src = iframe.src;
            }}
            className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>
      <div className="h-[calc(100vh-4rem)] w-full">
        <iframe
          src="http://localhost:3000"
          className="w-full h-full border-0"
          title="Website Preview"
        />
      </div>
    </div>
  );
} 
