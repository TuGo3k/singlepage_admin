"use client";
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import ThemeToggle from '@/components/ThemeToggle';

export default function ClientLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isCollapsed={sidebarCollapsed} setIsCollapsed={setSidebarCollapsed} />
      <div className={`${sidebarCollapsed ? 'pl-16' : 'pl-72'} transition-all duration-300`}>
        <div className="min-h-screen">
          {/* Top Bar */}
          <div className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between h-16 px-6">
              <div className="flex items-center gap-4">
                <div className="hidden md:block">
                  <nav className="flex space-x-1" aria-label="Breadcrumb">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Вэбсайт үүсгэгч
                    </span>
                    <span className="text-sm text-gray-300 dark:text-gray-600">
                      /
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      Засах горим
                    </span>
                  </nav>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {/* Status Indicator */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full text-sm font-medium">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Онлайн
                </div>
                {/* Save Status */}
                <div className="hidden md:flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Хадгалагдсан
                </div>
                {/* Theme Toggle */}
                <ThemeToggle />
                {/* Preview Button */}
                <button className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm hover:shadow-md">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Үзэх
                </button>
                {/* Publish Button */}
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span className="hidden sm:inline">Нийтлэх</span>
                </button>
              </div>
            </div>
          </div>
          {/* Main Content */}
          <main className="relative">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
} 
