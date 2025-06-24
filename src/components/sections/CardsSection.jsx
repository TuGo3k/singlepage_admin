import { useCallback } from 'react';

export default function CardsSection({ section, onSaveSection, onUpdateCardLayout, onAddCard }) {
  const handleUpdateCardLayout = useCallback((sectionId, layout, cardCount) => {
    onUpdateCardLayout(sectionId, layout, cardCount);
  }, [onUpdateCardLayout]);

  return (
    <div className="space-y-4">
      {/* Section title input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
          placeholder="Хэсгийн гарчиг оруулах..."
          className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Layout сонголт */}
      <div className="flex gap-2 mb-2">
        <button
          onClick={() => handleUpdateCardLayout(section.id, 'grid-3')}
          className={`px-3 py-1 rounded-md text-xs font-medium border ${section.layout === 'grid-3' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'}`}
        >3 багана</button>
        <button
          onClick={() => handleUpdateCardLayout(section.id, 'grid-4')}
          className={`px-3 py-1 rounded-md text-xs font-medium border ${section.layout === 'grid-4' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'}`}
        >4 багана</button>
        <button
          onClick={() => handleUpdateCardLayout(section.id, 'carousel')}
          className={`px-3 py-1 rounded-md text-xs font-medium border ${section.layout === 'carousel' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'}`}
        >Гүйдэг</button>
      </div>

      {/* Card count selection for 3-column layout */}
      {section.layout === 'grid-3' && (
        <div className="flex gap-2 mb-2">
          <button onClick={() => handleUpdateCardLayout(section.id, 'grid-3', 3)} className={`px-3 py-1 rounded-md text-xs font-medium border ${section.content.cards.length === 3 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'}`}>3 карт</button>
          <button onClick={() => handleUpdateCardLayout(section.id, 'grid-3', 6)} className={`px-3 py-1 rounded-md text-xs font-medium border ${section.content.cards.length === 6 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'}`}>6 карт</button>
          <button onClick={() => handleUpdateCardLayout(section.id, 'grid-3', 9)} className={`px-3 py-1 rounded-md text-xs font-medium border ${section.content.cards.length === 9 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'}`}>9 карт</button>
        </div>
      )}

      {/* Card count selection for 4-column layout */}
      {section.layout === 'grid-4' && (
        <div className="flex gap-2 mb-2">
          <button onClick={() => handleUpdateCardLayout(section.id, 'grid-4', 4)} className={`px-3 py-1 rounded-md text-xs font-medium border ${section.content.cards.length === 4 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'}`}>4 карт</button>
          <button onClick={() => handleUpdateCardLayout(section.id, 'grid-4', 8)} className={`px-3 py-1 rounded-md text-xs font-medium border ${section.content.cards.length === 8 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'}`}>8 карт</button>
          <button onClick={() => handleUpdateCardLayout(section.id, 'grid-4', 12)} className={`px-3 py-1 rounded-md text-xs font-medium border ${section.content.cards.length === 12 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'}`}>12 карт</button>
        </div>
      )}

      {/* Carousel settings */}
      {section.layout === 'carousel' && (
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-md space-y-3">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Гүйдэг тохиргоо</h4>
          <div className="space-y-2">
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">
                Харагдах картын тоо
              </label>
              <select
                value={(section.settings?.cardsToShow || 3).toString()}
                onChange={(e) => onSaveSection(section.id, { settings: { ...section.settings, cardsToShow: parseInt(e.target.value) } })}
                className="mt-1 block w-full text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-1"
              >
                <option value="1">1 карт</option>
                <option value="2">2 карт</option>
                <option value="3">3 карт</option>
                <option value="4">4 карт</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`autoplay-${section.id}`}
                checked={section.settings?.autoplay ?? true}
                onChange={(e) => onSaveSection(section.id, { settings: { ...section.settings, autoplay: e.target.checked } })}
                className="rounded border-gray-300 dark:border-gray-600"
              />
              <label 
                htmlFor={`autoplay-${section.id}`}
                className="text-sm text-gray-600 dark:text-gray-400"
              >
                Автоматаар гүйлгэх
              </label>
            </div>
            {section.settings?.autoplay && (
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">
                  Гүйх хурд (секунд)
                </label>
                <select
                  value={(section.settings?.interval || 5000) / 1000}
                  onChange={(e) => onSaveSection(section.id, { settings: { ...section.settings, interval: parseInt(e.target.value) * 1000 } })}
                  className="mt-1 block w-full text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-1"
                >
                  <option value="3">3 секунд</option>
                  <option value="5">5 секунд</option>
                  <option value="7">7 секунд</option>
                  <option value="10">10 секунд</option>
                </select>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Card count indicator */}
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        {(() => {
          const currentCount = section.content.cards.length;
          let maxCount = 0;
          switch (section.layout) {
            case 'grid-3': maxCount = 9; break;
            case 'grid-4': maxCount = 12; break;
            case 'carousel': maxCount = 10; break;
            default: maxCount = 9;
          }
          return `Картууд: ${currentCount}/${maxCount}`;
        })()}
      </div>

      {/* Card size and text size settings */}
      <div className="flex gap-4 mb-2">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Картын хэмжээ</label>
          <select
            value={section.settings?.cardSize || 'medium'}
            onChange={e => onSaveSection(section.id, { settings: { ...section.settings, cardSize: e.target.value } })}
            className="block w-full text-xs rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1"
          >
            <option value="small">Жижиг</option>
            <option value="medium">Дунд</option>
            <option value="large">Том</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Зургийн өндөр</label>
          <select
            value={section.settings?.imageHeight || 'medium'}
            onChange={e => onSaveSection(section.id, { settings: { ...section.settings, imageHeight: e.target.value } })}
            className="block w-full text-xs rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1"
          >
            <option value="small">Жижиг</option>
            <option value="medium">Дунд</option>
            <option value="large">Том</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Текстийн хэмжээ</label>
          <select
            value={section.settings?.textSize || 'base'}
            onChange={e => onSaveSection(section.id, { settings: { ...section.settings, textSize: e.target.value } })}
            className="block w-full text-xs rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1"
          >
            <option value="xs">XS</option>
            <option value="sm">Жижиг</option>
            <option value="base">Дунд</option>
            <option value="lg">Том</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Текстийн байршил</label>
          <select
            value={section.settings?.textAlign || 'center'}
            onChange={e => onSaveSection(section.id, { settings: { ...section.settings, textAlign: e.target.value } })}
            className="block w-full text-xs rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1"
          >
            <option value="left">Зүүн</option>
            <option value="center">Төв</option>
            <option value="right">Баруун</option>
          </select>
        </div>
      </div>
    </div>
  );
} 