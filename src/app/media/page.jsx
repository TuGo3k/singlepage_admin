'use client';

import { useState, useRef } from 'react';
import { usePreviewStore } from '@/store/previewStore';

export default function MediaPage() {
  const updateMedia = usePreviewStore((state) => state.updateMedia);
  const mediaData = usePreviewStore((state) => state.siteData.media);
  
  const files = (mediaData.library || []).map((file, idx) => ({
    ...file,
    id: file.id || idx + 1,
    type: file.type || (file.url?.match(/\.(jpg|jpeg|png|gif|webp)$/) ? 'image' : 'other'),
    size: file.size || '',
  }));
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [filterType, setFilterType] = useState('all');
  const fileInputRef = useRef(null);

  const filteredFiles = files.filter(file => 
    filterType === 'all' || file.type === filterType
  );

  const getFileIcon = (type) => {
    switch (type) {
      case 'image':
        return '🖼️';
      case 'video':
        return '🎬';
      case 'audio':
        return '🎵';
      default:
        return '📄';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    uploadedFiles.forEach((file, index) => {
      const newFile = {
        id: files.length + index + 1,
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'other',
        url: URL.createObjectURL(file),
        uploadDate: new Date().toISOString().split('T')[0]
      };
      setFiles(prev => [...prev, newFile]);
    });
  };

  const deleteFile = (fileId) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
    if (selectedFile && selectedFile.id === fileId) {
      setSelectedFile(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Медиа Удирдлага</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Зураг, видео болон бусад файлуудаа удирдаарай
              </p>
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Файл нэмэх
            </button>
          </div>
        </div>

        {/* Stats & Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-2V4a1 1 0 00-1-1H6a1 1 0 00-1 1v5m14 2v7a1 1 0 01-1 1H6a1 1 0 01-1-1v-7" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{files.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Нийт файл</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{files.filter(f => f.type === 'image').length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Зураг</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{files.filter(f => f.type === 'video').length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Видео</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2v0" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">23.4 MB</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Нийт хэмжээ</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Бүх файл</option>
              <option value="image">Зураг</option>
              <option value="video">Видео</option>
              <option value="audio">Дуу авиа</option>
            </select>
          </div>
        </div>

        {/* File Grid/List */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredFiles.map((file) => (
                  <div
                    key={file.id}
                    onClick={() => setSelectedFile(file)}
                    className={`group relative bg-white dark:bg-gray-800 rounded-xl border-2 transition-all duration-200 cursor-pointer hover:shadow-lg ${
                      selectedFile?.id === file.id 
                        ? 'border-blue-500 shadow-lg' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="aspect-square p-4 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-t-xl">
                      {file.type === 'image' ? (
                        <img 
                          src={file.url} 
                          alt={file.name} 
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <div className="text-4xl">{getFileIcon(file.type)}</div>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {file.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {file.size}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteFile(file.id);
                      }}
                      className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredFiles.map((file) => (
                    <div
                      key={file.id}
                      onClick={() => setSelectedFile(file)}
                      className={`flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
                        selectedFile?.id === file.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{getFileIcon(file.type)}</div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                            {file.name}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {file.uploadDate} • {file.size}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteFile(file.id);
                        }}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* File Details Panel */}
          <div className="lg:col-span-1">
            {selectedFile ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Файлын мэдээлэл
                </h3>
                
                <div className="space-y-4">
                  <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                    {selectedFile.type === 'image' ? (
                      <img 
                        src={selectedFile.url} 
                        alt={selectedFile.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-4xl">{getFileIcon(selectedFile.type)}</div>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        Файлын нэр
                      </label>
                      <p className="text-sm text-gray-900 dark:text-white mt-1">
                        {selectedFile.name}
                      </p>
                    </div>
                    
                    <div>
                      <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        Хэмжээ
                      </label>
                      <p className="text-sm text-gray-900 dark:text-white mt-1">
                        {selectedFile.size}
                      </p>
                    </div>
                    
                    <div>
                      <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        Төрөл
                      </label>
                      <p className="text-sm text-gray-900 dark:text-white mt-1 capitalize">
                        {selectedFile.type}
                      </p>
                    </div>
                    
                    <div>
                      <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        Нэмсэн огноо
                      </label>
                      <p className="text-sm text-gray-900 dark:text-white mt-1">
                        {selectedFile.uploadDate}
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                      Вэбсайтад хэрэглэх
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 text-center">
                <div className="text-gray-400 dark:text-gray-500 mb-4">
                  <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  Файл сонгоход дэлгэрэнгүй мэдээлэл харагдана
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*,audio/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
    </div>
  );
} 
