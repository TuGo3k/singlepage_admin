import { useRef } from 'react';
import { getThemeById } from '@/data/themePresets';

// Preview version of BannerSection
export const BannerSectionPreview = ({ content, layout, style, isMobile, theme = 'theme-1' }) => {
  // Get theme styles
  const themeData = getThemeById(theme);
  
  const isFull = layout === 'full-width';
  const hasOverlay = layout === 'with-overlay';

  return (
    <div 
      className={`relative ${isFull ? 'w-full' : 'container mx-auto'} ${isMobile ? 'h-[200px]' : 'h-[250px]'} bg-cover bg-center`}
      style={{ 
        backgroundImage: content.image ? `url(${content.image})` : content.background ? `url(${content.background})` : 'none',
        backgroundColor: !content.image && !content.background ? '#f3f4f6' : 'transparent'
      }}
    >
      <div className={`absolute inset-0 flex items-center justify-center ${hasOverlay ? 'bg-black bg-opacity-50 text-white' : ''}`}
      >
        <div className={`${isMobile ? 'px-4 w-full' : 'px-8 w-full'} flex flex-col gap-1`}>
          <div style={{ width: '100%' }}>
            <h3 
              className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-2`} 
              style={{ 
                fontFamily: style?.headerFont || 'Inter, Arial, sans-serif',
                textAlign: content.titleAlignment || 'center',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                width: '100%',
                color: hasOverlay ? '#FFFFFF' : (themeData.colors?.primary || '#3B82F6')
              }}
            >
              {content.title}
            </h3>
          </div>
          {content.subtitle && (
            <div style={{ width: '100%' }}>
              <p 
                className={`${isMobile ? 'text-sm' : 'text-base'}`} 
                style={{ 
                  fontFamily: style?.bodyFont || 'Arial, sans-serif',
                  textAlign: content.subtitleAlignment || 'center',
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                  width: '100%',
                  color: hasOverlay ? '#FFFFFF' : (themeData.colors?.text || '#1F2937')
                }}
              >
                {content.subtitle}
              </p>
            </div>
          )}
          {content.description && (
            <div style={{ width: '100%' }}>
              <p 
                className={`${isMobile ? 'text-xs' : 'text-sm'} mt-2`} 
                style={{ 
                  fontFamily: style?.bodyFont || 'Arial, sans-serif',
                  textAlign: content.descriptionAlignment || 'center',
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                  width: '100%',
                  color: hasOverlay ? '#FFFFFF' : (themeData.colors?.text || '#1F2937')
                }}
              >
                {content.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Default export for admin panel (existing functionality)
export default function BannerSection({ section, onSaveSection, onImageUpload, fileInputRef }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Зураг</label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={section.content.image}
            onChange={(e) => onSaveSection(section.id, { content: { ...section.content, image: e.target.value } })}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Зургийн URL"
          />
          <button
            onClick={() => {
              onImageUpload(section.id);
            }}
            className="px-3 py-2 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500"
          >
            Зураг оруулах
          </button>
          <button
            onClick={() => onSaveSection(section.id, { content: { ...section.content, image: '' } })}
            className="px-3 py-2 bg-red-100 dark:bg-red-700 text-red-700 dark:text-white rounded-lg hover:bg-red-200 dark:hover:bg-red-600"
          >
            Устгах
          </button>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Гарчиг</label>
        <input
          type="text"
          value={section.content.title}
          onChange={(e) => onSaveSection(section.id, { content: { ...section.content, title: e.target.value } })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="Гарчиг"
        />
        <div className="mt-2 flex gap-2">
          <label className="inline-flex items-center text-xs">
            <input
              type="radio"
              name={`title-alignment-${section.id}`}
              checked={(section.content.titleAlignment || 'center') === 'left'}
              onChange={() => onSaveSection(section.id, { content: { ...section.content, titleAlignment: 'left' } })}
            />
            <span className="ml-1">Зүүн</span>
          </label>
          <label className="inline-flex items-center text-xs">
            <input
              type="radio"
              name={`title-alignment-${section.id}`}
              checked={(section.content.titleAlignment || 'center') === 'center'}
              onChange={() => onSaveSection(section.id, { content: { ...section.content, titleAlignment: 'center' } })}
            />
            <span className="ml-1">Төв</span>
          </label>
          <label className="inline-flex items-center text-xs">
            <input
              type="radio"
              name={`title-alignment-${section.id}`}
              checked={(section.content.titleAlignment || 'center') === 'right'}
              onChange={() => onSaveSection(section.id, { content: { ...section.content, titleAlignment: 'right' } })}
            />
            <span className="ml-1">Баруун</span>
          </label>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Дэд гарчиг</label>
        <input
          type="text"
          value={section.content.subtitle}
          onChange={(e) => onSaveSection(section.id, { content: { ...section.content, subtitle: e.target.value } })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="Дэд гарчиг"
        />
        <div className="mt-2 flex gap-2">
          <label className="inline-flex items-center text-xs">
            <input
              type="radio"
              name={`subtitle-alignment-${section.id}`}
              checked={(section.content.subtitleAlignment || 'center') === 'left'}
              onChange={() => onSaveSection(section.id, { content: { ...section.content, subtitleAlignment: 'left' } })}
            />
            <span className="ml-1">Зүүн</span>
          </label>
          <label className="inline-flex items-center text-xs">
            <input
              type="radio"
              name={`subtitle-alignment-${section.id}`}
              checked={(section.content.subtitleAlignment || 'center') === 'center'}
              onChange={() => onSaveSection(section.id, { content: { ...section.content, subtitleAlignment: 'center' } })}
            />
            <span className="ml-1">Төв</span>
          </label>
          <label className="inline-flex items-center text-xs">
            <input
              type="radio"
              name={`subtitle-alignment-${section.id}`}
              checked={(section.content.subtitleAlignment || 'center') === 'right'}
              onChange={() => onSaveSection(section.id, { content: { ...section.content, subtitleAlignment: 'right' } })}
            />
            <span className="ml-1">Баруун</span>
          </label>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Тайлбар</label>
        <textarea
          value={section.content.description}
          onChange={(e) => onSaveSection(section.id, { content: { ...section.content, description: e.target.value } })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          rows={3}
          placeholder="Тайлбар"
        />
        <div className="mt-2 flex gap-2">
          <label className="inline-flex items-center text-xs">
            <input
              type="radio"
              name={`description-alignment-${section.id}`}
              checked={(section.content.descriptionAlignment || 'center') === 'left'}
              onChange={() => onSaveSection(section.id, { content: { ...section.content, descriptionAlignment: 'left' } })}
            />
            <span className="ml-1">Зүүн</span>
          </label>
          <label className="inline-flex items-center text-xs">
            <input
              type="radio"
              name={`description-alignment-${section.id}`}
              checked={(section.content.descriptionAlignment || 'center') === 'center'}
              onChange={() => onSaveSection(section.id, { content: { ...section.content, descriptionAlignment: 'center' } })}
            />
            <span className="ml-1">Төв</span>
          </label>
          <label className="inline-flex items-center text-xs">
            <input
              type="radio"
              name={`description-alignment-${section.id}`}
              checked={(section.content.descriptionAlignment || 'center') === 'right'}
              onChange={() => onSaveSection(section.id, { content: { ...section.content, descriptionAlignment: 'right' } })}
            />
            <span className="ml-1">Баруун</span>
          </label>
        </div>
      </div>
    </div>
  );
} 