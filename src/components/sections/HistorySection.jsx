import sectionTypes from '@/data/sectionTypes';
import { getThemeById } from '@/data/themePresets';

// Preview version of HistorySection
export const HistorySectionPreview = ({ content, style, isMobile, viewMode, theme = 'theme-1' }) => {
  // Get theme styles
  const themeData = getThemeById(theme);
  const cardStyles = themeData.cards;

  const selectedSubtype = content.subtype || 'timeline';
  const selectedLayout = content.layout || (selectedSubtype === 'timeline' ? 'timeline' : 'text-left');

  const renderTimeline = () => (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-600 to-purple-600" />
      {content.items.map((item, index) => (
        <div key={item.id} className={`relative mb-12 ${index % 2 === 0 ? 'pr-1/2' : 'pl-1/2'}`}>
          {/* Year badge */}
          <div className={`absolute top-0 ${index % 2 === 0 ? 'right-1/2 mr-8' : 'left-1/2 ml-8'} transform -translate-y-1/2`}>
            <div className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>
              {item.year}
            </div>
          </div>
          {/* Content card */}
          <div className={`${index % 2 === 0 ? 'mr-8' : 'ml-8'} ${cardStyles.className} ${cardStyles.hoverEffect}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative h-48 md:h-full">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className={cardStyles.imageClass}
                />
              </div>
              <div className="p-6">
                <h4 className={cardStyles.titleClass} style={{ fontFamily: style?.headerFont || 'Inter, Arial, sans-serif' }}>
                  {item.title}
                </h4>
                <p className={cardStyles.descriptionClass} style={{ fontFamily: style?.bodyFont || 'Arial, sans-serif' }}>
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCards = () => (
    <div className={`grid w-full ${viewMode === 'mobile' ? 'grid-cols-1 gap-2' : 'md:grid-cols-3 gap-6'}`}>
      {content.items.map(item => (
        <div key={item.id} className={`${cardStyles.className} ${cardStyles.hoverEffect}`}>
          <div className="relative h-48">
            <img 
              src={item.image} 
              alt={item.title}
              className={cardStyles.imageClass}
            />
            <div className={`absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>
              {item.year}
            </div>
          </div>
          <div className="p-6">
            <h4 className={cardStyles.titleClass} style={{ fontFamily: style?.headerFont || 'Inter, Arial, sans-serif' }}>
              {item.title}
            </h4>
            <p className={cardStyles.descriptionClass} style={{ fontFamily: style?.bodyFont || 'Arial, sans-serif' }}>
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderStory = () => (
    <div className="space-y-12">
      {content.items.map((item, index) => (
        <div key={item.id} className="flex flex-col md:flex-row gap-8 items-center">
          <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
            <div className="relative">
              <img 
                src={item.image} 
                alt={item.title}
                className={`${cardStyles.imageClass} ${cardStyles.hoverEffect}`}
              />
              <div className={`absolute -top-4 -left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-bold ${isMobile ? 'text-base' : 'text-lg'}`}>
                {item.year}
              </div>
            </div>
          </div>
          <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
            <h4 className={cardStyles.titleClass} style={{ fontFamily: style?.headerFont || 'Inter, Arial, sans-serif' }}>
              {item.title}
            </h4>
            <p className={cardStyles.descriptionClass} style={{ fontFamily: style?.bodyFont || 'Arial, sans-serif' }}>
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderGrid = () => (
    <div className={`grid ${viewMode === 'mobile' ? 'grid-cols-1 gap-4' : 'md:grid-cols-2 gap-8'}`}>
      {content.items.map(item => (
        <div key={item.id} className={`${cardStyles.className} ${cardStyles.hoverEffect}`}>
          <div className="relative">
            <img 
              src={item.image} 
              alt={item.title}
              className={cardStyles.imageClass}
            />
            <div className={`absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>
              {item.year}
            </div>
          </div>
          <div className="p-6">
            <h4 className={cardStyles.titleClass} style={{ fontFamily: style?.headerFont || 'Inter, Arial, sans-serif' }}>
              {item.title}
            </h4>
            <p className={cardStyles.descriptionClass} style={{ fontFamily: style?.bodyFont || 'Arial, sans-serif' }}>
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  // New: Render for text subtype
  const renderText = () => {
    return (
      <div className="max-w-2xl mx-auto">
        {content.texts?.map(item => (
          <div key={item.id} className="mb-8">
            <h4 
              className={`text-xl font-bold mb-2 ${
                item.textAlignment === 'center' ? 'text-center' : item.textAlignment === 'right' ? 'text-right' : 'text-left'
              }`} 
              style={{ 
                fontFamily: style?.headerFont || 'Inter, Arial, sans-serif',
                color: themeData.colors?.primary || '#3B82F6'
              }}
            >
              {item.title}
            </h4>
            <p 
              className={`whitespace-normal break-words ${
                item.descriptionAlignment === 'center' ? 'text-center' : item.descriptionAlignment === 'right' ? 'text-right' : 'text-left'
              }`} 
              style={{ 
                fontFamily: style?.bodyFont || 'Arial, sans-serif',
                color: themeData.colors?.text || '#1F2937'
              }}
            >
              {item.description}
            </p>
            {item.year && <div className="text-xs mt-1" style={{ color: themeData.colors?.secondary || '#6B7280' }}>{item.year}</div>}
          </div>
        ))}
      </div>
    );
  };

  const renderContent = () => {
    if (selectedSubtype === 'text') {
      return renderText();
    }
    switch (selectedLayout) {
      case 'timeline':
        return renderTimeline();
      case 'cards':
        return renderCards();
      case 'story':
        return renderStory();
      case 'grid':
        return renderGrid();
      default:
        return renderTimeline();
    }
  };

  return (
    <div className={`${isMobile ? 'p-4' : 'p-8'}`}>
      {content.title && content.title.trim() !== '' && (
        <div className="text-center mb-6">
          <h3 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold mb-2`} 
              style={{ 
                fontFamily: style?.headerFont || 'Inter, Arial, sans-serif',
                color: themeData.colors?.primary || '#3B82F6'
              }}>
            {content.title}
          </h3>
          {content.subtitle && (
            <p className={`${isMobile ? 'text-base' : 'text-lg'}`} 
               style={{ 
                 fontFamily: style?.bodyFont || 'Arial, sans-serif',
                 color: themeData.colors?.text || '#1F2937'
               }}>
              {content.subtitle}
            </p>
          )}
        </div>
      )}
      {renderContent()}
    </div>
  );
};

// Default export for admin panel (existing functionality)
export default function HistorySection({ section, onSaveSection }) {
  return (
    <div className="relative">
      {/* Subtype Tabs */}
      <div className="flex gap-2 mb-4 items-center">
        {['timeline', 'text'].map(subtype => (
          <button
            key={subtype}
            onClick={() => onSaveSection(section.id, { content: { ...section.content, subtype } })}
            className={`px-3 py-1 rounded-md text-sm font-medium border  transition-colors ${
              (section.content.subtype || 'timeline') === subtype
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {subtype === 'timeline' ? 'Тимлайн' : 'Текст'}
          </button>
        ))}
      </div>

      {/* Layouts for selected subtype */}
      <div className="flex gap-2 mb-4 flex-nowrap overflow-x-auto items-center">
        <div className="flex gap-2">
        {(section.content.subtype || 'timeline') === 'timeline' && sectionTypes.history.layouts.map(layout => (
          <button
            key={layout.id}
            onClick={() => onSaveSection(section.id, { content: { ...section.content, layout: layout.id } })}
            className={`px-3 py-1 rounded-md text-sm font-medium border transition-colors flex items-center gap-2 ${
              section.content.layout === layout.id
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <span className="align-middle flex-shrink-0">{layout.icon}</span>
            <span className="align-middle">{layout.name}</span>
          </button>
        ))}
        </div>
       {(section.content.subtype || 'timeline') === 'timeline' && (
         <button
           onClick={() => {
             const newItems = [
               ...(section.content.items || []),
               {
                 id: `history${Date.now()}`,
                 year: '',
                 title: '',
                 description: '',
                 image: ''
               }
             ];
             onSaveSection(section.id, { content: { ...section.content, items: newItems } });
           }}
           className="px-4 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700 ml-auto"
         >
           + Нэмэх
         </button>
       )}
      </div>

      {/* Timeline items: зөвхөн subtype нь timeline үед */}
      {(section.content.subtype || 'timeline') === 'timeline' && (
        <div className="mt-4">
          {/* Хэсгийн гарчиг */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Хэсгийн гарчиг
            </label>
            <input
              type="text"
              value={section.content.title || ''}
              onChange={(e) => onSaveSection(section.id, {
                content: {
                  ...section.content,
                  title: e.target.value
                }
              })}
              placeholder="Түүх хэсгийн гарчиг оруулах..."
              className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="space-y-6 max-h-96 overflow-y-auto pr-2">
            {section.content.items?.map((item, idx) => (
              <div key={item.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 relative">
                {/* Top row: photo left, inputs right */}
                <div className="flex items-start gap-4">
                  {/* Image upload/preview */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-40 aspect-[16/9] bg-gray-100 border rounded flex items-center justify-center overflow-hidden">
                      <img src={item.image} alt="item" className="w-full h-full object-cover" />
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      id={`history-item-image-${section.id}-${item.id}`}
                      onChange={e => {
                        const file = e.target.files[0];
                        if (file) {
                          const url = URL.createObjectURL(file);
                          const newItems = section.content.items.map(it => it.id === item.id ? { ...it, image: url } : it);
                          onSaveSection(section.id, { content: { ...section.content, items: newItems } });
                        }
                      }}
                    />
                    <label htmlFor={`history-item-image-${section.id}-${item.id}`} className="px-2 py-1 bg-blue-500 text-white rounded text-xs cursor-pointer hover:bg-blue-600">Зураг оруулах</label>
                  </div>
                  {/* Inputs: title and year stacked */}
                  <div className="flex-1 flex flex-col gap-2">
                    <input
                      type="text"
                      value={item.title}
                      onChange={e => {
                        const newItems = section.content.items.map(it => it.id === item.id ? { ...it, title: e.target.value } : it);
                        onSaveSection(section.id, { content: { ...section.content, items: newItems } });
                      }}
                      placeholder="Гарчиг"
                      className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm"
                    />
                    <input
                      type="text"
                      value={item.year}
                      onChange={e => {
                        const newItems = section.content.items.map(it => it.id === item.id ? { ...it, year: e.target.value } : it);
                        onSaveSection(section.id, { content: { ...section.content, items: newItems } });
                      }}
                      placeholder="Он / Жил"
                      className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm"
                    />
                  </div>
                </div>
                {/* Description textarea below */}
                <div className="mt-4">
                  <textarea
                    value={item.description || ''}
                    onChange={e => {
                      const newItems = section.content.items.map(it => it.id === item.id ? { ...it, description: e.target.value } : it);
                      onSaveSection(section.id, { content: { ...section.content, items: newItems } });
                    }}
                    placeholder="Тайлбар"
                    className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm resize-none"
                    rows={3}
                  />
                </div>
                {/* Controls: up/down/delete */}
                <div className="flex gap-2 mt-2">
                  <button
                    disabled={idx === 0}
                    onClick={() => {
                      if (idx === 0) return;
                      const items = [...section.content.items];
                      [items[idx - 1], items[idx]] = [items[idx], items[idx - 1]];
                      onSaveSection(section.id, { content: { ...section.content, items } });
                    }}
                    className={`px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs ${idx === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                  >
                    ↑
                  </button>
                  <button
                    disabled={idx === section.content.items.length - 1}
                    onClick={() => {
                      if (idx === section.content.items.length - 1) return;
                      const items = [...section.content.items];
                      [items[idx + 1], items[idx]] = [items[idx], items[idx + 1]];
                      onSaveSection(section.id, { content: { ...section.content, items } });
                    }}
                    className={`px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs ${idx === section.content.items.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => {
                      const items = section.content.items.filter(it => it.id !== item.id);
                      onSaveSection(section.id, { content: { ...section.content, items } });
                    }}
                    className="px-2 py-1 rounded bg-red-500 text-white text-xs hover:bg-red-600"
                  >
                    Устгах
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Текст талбар: зөвхөн subtype нь text үед */}
      {(section.content.subtype || 'timeline') === 'text' && (
        <div className="mt-4">
          {/* Хэсгийн гарчиг */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Хэсгийн гарчиг
            </label>
            <input
              type="text"
              value={section.content.title || ''}
              onChange={(e) => onSaveSection(section.id, {
                content: {
                  ...section.content,
                  title: e.target.value
                }
              })}
              placeholder="Текст хэсгийн гарчиг оруулах..."
              className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {/* Text items */}
          <div className="space-y-4">
            {section.content.texts?.map((textItem, idx) => (
              <div key={textItem.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={textItem.title || ''}
                    onChange={e => {
                      const newTexts = section.content.texts.map(it => it.id === textItem.id ? { ...it, title: e.target.value } : it);
                      onSaveSection(section.id, { content: { ...section.content, texts: newTexts } });
                    }}
                    placeholder="Гарчиг"
                    className="flex-1 px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm"
                  />
                  <input
                    type="text"
                    value={textItem.year || ''}
                    onChange={e => {
                      const newTexts = section.content.texts.map(it => it.id === textItem.id ? { ...it, year: e.target.value } : it);
                      onSaveSection(section.id, { content: { ...section.content, texts: newTexts } });
                    }}
                    placeholder="Он"
                    className="w-20 px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm"
                  />
                </div>
                <textarea
                  value={textItem.description || ''}
                  onChange={e => {
                    const newTexts = section.content.texts.map(it => it.id === textItem.id ? { ...it, description: e.target.value } : it);
                    onSaveSection(section.id, { content: { ...section.content, texts: newTexts } });
                  }}
                  placeholder="Тайлбар"
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm resize-none"
                  rows={3}
                />
                <div className="flex gap-2 mt-2">
                  <button
                    disabled={idx === 0}
                    onClick={() => {
                      if (idx === 0) return;
                      const texts = [...section.content.texts];
                      [texts[idx - 1], texts[idx]] = [texts[idx], texts[idx - 1]];
                      onSaveSection(section.id, { content: { ...section.content, texts } });
                    }}
                    className={`px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs ${idx === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                  >
                    ↑
                  </button>
                  <button
                    disabled={idx === section.content.texts.length - 1}
                    onClick={() => {
                      if (idx === section.content.texts.length - 1) return;
                      const texts = [...section.content.texts];
                      [texts[idx + 1], texts[idx]] = [texts[idx], texts[idx + 1]];
                      onSaveSection(section.id, { content: { ...section.content, texts } });
                    }}
                    className={`px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs ${idx === section.content.texts.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => {
                      const texts = section.content.texts.filter(it => it.id !== textItem.id);
                      onSaveSection(section.id, { content: { ...section.content, texts } });
                    }}
                    className="px-2 py-1 rounded bg-red-500 text-white text-xs hover:bg-red-600"
                  >
                    Устгах
                  </button>
                </div>
              </div>
            ))}
            
            <button
              onClick={() => {
                const newTexts = [
                  ...(section.content.texts || []),
                  {
                    id: `text${Date.now()}`,
                    title: '',
                    description: '',
                    year: ''
                  }
                ];
                onSaveSection(section.id, { content: { ...section.content, texts: newTexts } });
              }}
              className="w-full px-4 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
            >
              + Текст нэмэх
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 