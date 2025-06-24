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