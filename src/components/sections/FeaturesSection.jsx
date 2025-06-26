import { getThemeById } from '@/data/themePresets';

// Preview version of FeaturesSection
export const FeaturesSectionPreview = ({ content, settings, style, isMobile, viewMode, theme = 'theme-1' }) => {
  // Get theme styles
  const themeData = getThemeById(theme);
  const cardStyles = themeData.cards;

  const getPriceSizeClass = (size) => {
    switch (size) {
      case 'small': return isMobile ? 'text-base' : 'text-lg md:text-xl';
      case 'large': return isMobile ? 'text-2xl' : 'text-3xl md:text-4xl';
      default: return isMobile ? 'text-lg' : 'text-2xl md:text-3xl';
    }
  };

  const getPricePositionClass = (position) => {
    switch (position) {
      case 'top-left': return 'top-4 left-4';
      case 'top': return 'top-4 left-1/2 -translate-x-1/2';
      case 'top-right': return 'top-4 right-4';
      case 'center-left': return 'top-1/2 left-4 -translate-y-1/2';
      case 'center': return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
      case 'center-right': return 'top-1/2 right-4 -translate-y-1/2';
      case 'bottom-left': return 'bottom-4 left-4';
      case 'bottom': return 'bottom-4 left-1/2 -translate-x-1/2';
      case 'bottom-right': return 'bottom-4 right-4';
      default: return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
    }
  };

  const getCardSizeClass = (size) => {
    switch (size) {
      case 'small': return isMobile ? 'h-[140px]' : 'h-[220px]';
      case 'large': return isMobile ? 'h-[220px]' : 'h-[400px]';
      case 'medium':
      default: return isMobile ? 'h-[180px]' : 'h-[300px]';
    }
  };

  const getImageHeightClass = (size) => {
    switch (size) {
      case 'small': return isMobile ? 'h-16' : 'h-24';
      case 'large': return isMobile ? 'h-32' : 'h-48';
      case 'medium':
      default: return isMobile ? 'h-24' : 'h-32';
    }
  };

  return (
    <div className={`${isMobile ? 'p-2' : 'p-6'}`}>
      <h3 className={`${isMobile ? 'text-base' : 'text-xl'} font-bold mb-2 text-center`} style={{ fontFamily: style?.headerFont || 'Inter, Arial, sans-serif' }}>
        {content.title}
      </h3>
      {content.description && (
        <p className={`${isMobile ? 'text-xs' : 'text-center text-gray-500 dark:text-gray-400 mb-4'} text-center text-gray-500 dark:text-gray-400 mb-4`} style={{ fontFamily: style?.bodyFont || 'Arial, sans-serif' }}>
          {content.description}
        </p>
      )}
      <div className={`grid ${viewMode === 'mobile' ? 'grid-cols-1 gap-2' : 'md:grid-cols-3 gap-8'}`}>
        {(content.cards || []).map(card => (
          <div 
            key={card.id}
            className={`${cardStyles.className} ${cardStyles.hoverEffect} ${getCardSizeClass(card.cardSize || settings?.cardSize)} ${isMobile ? 'p-2' : ''} flex flex-col`}
          >
            <div className={`relative w-full ${getImageHeightClass(card.cardSize || settings?.cardSize)} flex-shrink-0`}>
              <img 
                src={card.image} 
                alt={card.title}
                className="w-full h-full object-cover rounded-lg"
              />
              {card.price && (
                <div 
                  className={`absolute ${getPricePositionClass(card.pricePosition || settings?.pricePosition)}`}
                >
                  <span 
                    className={`${getPriceSizeClass(card.priceSize || settings?.priceSize)} font-bold rounded-full px-4 md:px-6 py-1 md:py-2 shadow-md`}
                    style={{
                      color: style?.priceBadgeTextColor || '#2563EB',
                      background: style?.priceBadgeBgColor || '#E5E7EB',
                      backdropFilter: style?.priceBadgeBlur ? `blur(${style.priceBadgeBlur}px)` : undefined,
                      WebkitBackdropFilter: style?.priceBadgeBlur ? `blur(${style.priceBadgeBlur}px)` : undefined,
                    }}
                  >
                    {card.price}
                  </span>
                </div>
              )}
            </div>
            <div className="p-2 md:p-4 flex-1 flex flex-col justify-center">
              <h4 
                className={cardStyles.titleClass}
                style={{ fontFamily: style?.headerFont || 'Inter, Arial, sans-serif' }}
              >
                {card.title}
              </h4>
              <p 
                className={`${cardStyles.descriptionClass} flex-1`}
                style={{ fontFamily: style?.bodyFont || 'Arial, sans-serif' }}
              >
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Default export for admin panel (existing functionality)
export default function FeaturesSection({ section, onSaveSection }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Хэсгийн гарчиг</label>
        <input
          type="text"
          value={section.content.title || ''}
          onChange={(e) => onSaveSection(section.id, {
            content: {
              ...section.content,
              title: e.target.value
            }
          })}
          placeholder="Хэсгийн гарчиг оруулах..."
          className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Хэсгийн тайлбар</label>
        <textarea
          value={section.content.description || ''}
          onChange={(e) => onSaveSection(section.id, {
            content: {
              ...section.content,
              description: e.target.value
            }
          })}
          placeholder="Тайлбар оруулах..."
          className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={2}
        />
      </div>
    
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Үнийн байршил</label>
        <div className="inline-grid grid-cols-3 gap-1">
          {[
            ['top-left', 'top', 'top-right'],
            ['center-left', 'center', 'center-right'],
            ['bottom-left', 'bottom', 'bottom-right'],
          ].map((row, rowIdx) => (
            row.map((pos, colIdx) => (
              <button
                key={pos}
                type="button"
                onClick={() => onSaveSection(section.id, { settings: { ...section.settings, pricePosition: pos } })}
                className={`w-10 h-10 flex items-center justify-center rounded-full border text-lg
                  ${section.settings?.pricePosition === pos ? 'bg-blue-500 text-white border-blue-600' : 'bg-gray-100 text-gray-700 border-gray-300'}
                `}
                title={pos}
              >
                {pos === 'top-left' && '↖️'}
                {pos === 'top' && '⬆️'}
                {pos === 'top-right' && '↗️'}
                {pos === 'center-left' && '⬅️'}
                {pos === 'center' && '⏺️'}
                {pos === 'center-right' && '➡️'}
                {pos === 'bottom-left' && '↙️'}
                {pos === 'bottom' && '⬇️'}
                {pos === 'bottom-right' && '↘️'}
              </button>
            ))
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Үнийн хэмжээ</label>
        <select
          value={section.settings?.priceSize || 'medium'}
          onChange={(e) => onSaveSection(section.id, { settings: { ...section.settings, priceSize: e.target.value } })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="small">Жижиг</option>
          <option value="medium">Дунд</option>
          <option value="large">Том</option>
        </select>
      </div>
   
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Картын хэмжээ</label>
        <select
          value={section.settings?.cardSize || 'medium'}
          onChange={(e) => onSaveSection(section.id, { settings: { ...section.settings, cardSize: e.target.value } })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="small">Жижиг</option>
          <option value="medium">Дунд</option>
          <option value="large">Том</option>
        </select>
      </div>
    </div>
  );
} 