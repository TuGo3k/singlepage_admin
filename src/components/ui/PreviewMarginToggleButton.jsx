import React from "react";

export default function PreviewMarginToggleButton({ onClick, previewMarginActive }) {
  return (
    <button
      type="button"
      className="flex items-center gap-1 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs hover:bg-gray-50 dark:hover:bg-gray-700 ml-2"
      title="Padding тохиргоо"
      onClick={onClick}
    >
      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <rect x="4" y="7" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
        <rect x="1" y="7" width="2" height="10" rx="1" fill="currentColor"/>
        <rect x="21" y="7" width="2" height="10" rx="1" fill="currentColor"/>
      </svg>
      Ард нь зайтай
    </button>
  );
} 