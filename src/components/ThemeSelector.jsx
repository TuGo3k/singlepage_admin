import { useState } from 'react';
import { getAllThemes, getThemeById } from '@/data/themePresets';

export default function ThemeSelector({ currentTheme, onThemeChange, className = "" }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const themes = getAllThemes();
  const currentThemeData = getThemeById(currentTheme);

  return (
    <>
      {/* Theme Selector Button */}
      <div className={className}>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
          </svg>
          <span className="font-medium">Загвар сонгох</span>
          <span className="text-sm opacity-80">({currentThemeData?.name})</span>
        </button>
      </div>

      {/* Theme Selection Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh]  z-50">
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Загвар сонгох
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Бүх хэсгүүдийн загварыг нэг дор сонгох
              </p>
            </div>

            {/* Theme Grid */}
            <div className="p-6   h-[80vh] relative">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6  overflow-scroll h-full">
                {Object.entries(themes).map(([themeId, themeData]) => (
                  <div
                    key={themeId}
                    className={`relative group cursor-pointer rounded-xl  border-2 transition-all  duration-300 ${
                      currentTheme === themeId
                        ? 'border-blue-500 shadow-lg scale-105'
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md'
                    }`}
                    onClick={() => {
                      onThemeChange(themeId);
                      setIsModalOpen(false);
                    }}
                  >
                    {/* Theme Preview */}
                    <div className="aspect-[4/3] relative overflow-hidden ">
                      {/* Background */}
                      <div 
                        className="absolute inset-0 flex flex-col"
                        style={{ 
                          background: themeData.colors.background,
                          backgroundImage: themeData.colors.background.includes('gradient') ? themeData.colors.background : undefined
                        }}
                      />
                      
                      {/* Cards Preview */}
                      <div className="absolute inset-0 p-4  flex items-center justify-center">
                        <div className="flex flex-col gap-2 w-full h-full">
                          {/* Card 1 */}
                          <div className={`${themeData.cards.className} p-2 text-xs h-full`}>
                            <div className={`${themeData.cards.imageClass} bg-gray-300 rounded h-[6vh]`} />
                            <div className={themeData.cards.titleClass}>Карт</div>
                          </div>
                          
                        
                        </div>
                      </div>

                      {/* Contact Preview */}
                      <div className="absolute bottom-2 right-2 flex items-center justify-center">
                        <div className={`${themeData.contact.cardClass} p-2  w-16 h-16 flex items-center justify-center`}>
                          <div className={` ${themeData.contact.iconClass}`}>📞</div>
                        </div>
                      </div>

                      {/* Selected Indicator */}
                      {currentTheme === themeId && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Theme Info */}
                    <div className="p-4 bg-white dark:bg-gray-800">
                      <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
                        {themeData.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {themeData.description}
                      </p>
                      
                      {/* Color Palette */}
                      <div className="flex gap-1 mt-3">
                        {Object.entries(themeData.colors).slice(0, 4).map(([colorName, colorValue]) => (
                          <div
                            key={colorName}
                            className="w-4 h-4 rounded-full border border-gray-200 dark:border-gray-600"
                            style={{ backgroundColor: colorValue }}
                            title={`${colorName}: ${colorValue}`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-blue-500/10  opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-lg">
                        <span className="text-sm font-medium text-gray-800 dark:text-white">
                          Сонгох
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white dark:bg-gray-800 px-6 py-4 border-t border-gray-200 dark:border-gray-700 rounded-b-2xl">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Одоогийн загвар: <span className="font-medium">{currentThemeData?.name}</span>
                </p>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Хаах
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 