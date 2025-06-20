'use client';

import { useState } from 'react';
import { usePreviewStore } from '@/store/previewStore';
import Link from 'next/link';

export default function Home() {
  const siteData = usePreviewStore((state) => state.siteData);
  const [stats] = useState({
    totalSections: siteData.template.sections.length,
    mediaFiles: siteData.media.sections?.length || 0,
    lastUpdated: new Date().toLocaleDateString('mn-MN')
  });

  const quickActions = [
    {
      title: 'Шинэ хэсэг нэмэх',
      description: 'Вэбсайтдаа шинэ section нэмэх',
      href: '/templates',
      icon: '🔧',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Зураг оруулах',
      description: 'Медиа файл удирдах',
      href: '/media',
      icon: '🖼️',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Загвар өөрчлөх',
      description: 'Сайтын дизайн тохируулах',
      href: '/style',
      icon: '🎨',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Холбоо барих',
      description: 'Холбоо барих мэдээлэл',
      href: '/contact',
      icon: '📧',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.586V5l-1-1z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Вэбсайт Үүсгэгч
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Танай бизнест зориулсан гоё, хурдан, хэрэглэхэд хялбар вэбсайт хийж байна
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Нийт хэсгүүд</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalSections}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Медиа файлууд</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.mediaFiles}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Сүүлд зассан</h3>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{stats.lastUpdated}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Түргэн үйлдлүүд</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className="group relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className="relative">
                  <div className="text-3xl mb-4">{action.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {action.description}
                  </p>
                  <div className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                    Эхлэх
                    <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Current Site Preview */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Одоогийн сайт</h2>
              <Link
                href="/templates"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Засах
              </Link>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-2 p-3 border-b border-gray-200 dark:border-gray-600">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="ml-4 text-sm text-gray-500 dark:text-gray-400 font-mono">
                    {siteData.header?.title || ''}
                  </div>
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {siteData.header?.title || ''}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {siteData.header?.subtitle || ''}
                  </p>
                  <div className="inline-flex px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
                    Дэлгэрэнгүй
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          <p className="text-sm">
            Танай амжилттай бизнесийн гүтгэ болох вэбсайт үүсгэж байна 🚀
          </p>
        </div>
      </div>
    </div>
  );
} 