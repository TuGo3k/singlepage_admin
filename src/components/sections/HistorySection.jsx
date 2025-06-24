import sectionTypes from '@/data/sectionTypes';

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
              placeholder="Түүх хэсгийн гарчиг оруулах..."
              className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center mb-4">
            <h4 className="text-lg font-semibold text-blue-600 mr-4">Текстүүд</h4>
            <button
              onClick={() => {
                const newTexts = [
                  ...(section.content.texts || []),
                  { id: `text${Date.now()}`, title: '', description: '', year: '' }
                ];
                onSaveSection(section.id, { content: { ...section.content, texts: newTexts } });
              }}
              className="px-4 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700 font-semibold shadow md:ml-4"
            >
              + Текст нэмэх
            </button>
          </div>
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {section.content.texts?.map((item, idx) => (
              <div key={item.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 flex flex-col gap-2 border border-blue-200 dark:border-blue-700">
                <div className="flex gap-4 mb-2 items-center">
                  <span className="text-xs text-gray-500">Гарчиг байрлал:</span>
                  <label className="flex items-center gap-1 text-xs">
                    <input
                      type="radio"
                      name={`textAlignment-${section.id}-${item.id}`}
                      checked={(item.textAlignment || 'left') === 'left'}
                      onChange={() => {
                        const newTexts = section.content.texts.map(it => it.id === item.id ? { ...it, textAlignment: 'left' } : it);
                        onSaveSection(section.id, { content: { ...section.content, texts: newTexts } });
                      }}
                    />
                    Зүүн
                  </label>
                  <label className="flex items-center gap-1 text-xs">
                    <input
                      type="radio"
                      name={`textAlignment-${section.id}-${item.id}`}
                      checked={item.textAlignment === 'center'}
                      onChange={() => {
                        const newTexts = section.content.texts.map(it => it.id === item.id ? { ...it, textAlignment: 'center' } : it);
                        onSaveSection(section.id, { content: { ...section.content, texts: newTexts } });
                      }}
                    />
                    Төв
                  </label>
                  <label className="flex items-center gap-1 text-xs">
                    <input
                      type="radio"
                      name={`textAlignment-${section.id}-${item.id}`}
                      checked={item.textAlignment === 'right'}
                      onChange={() => {
                        const newTexts = section.content.texts.map(it => it.id === item.id ? { ...it, textAlignment: 'right' } : it);
                        onSaveSection(section.id, { content: { ...section.content, texts: newTexts } });
                      }}
                    />
                    Баруун
                  </label>
                </div>
                <div className="flex gap-4 mb-2 items-center">
                  <span className="text-xs text-gray-500">Тайлбар байрлал:</span>
                  <label className="flex items-center gap-1 text-xs">
                    <input
                      type="radio"
                      name={`descriptionAlignment-${section.id}-${item.id}`}
                      checked={(item.descriptionAlignment || 'left') === 'left'}
                      onChange={() => {
                        const newTexts = section.content.texts.map(it => it.id === item.id ? { ...it, descriptionAlignment: 'left' } : it);
                        onSaveSection(section.id, { content: { ...section.content, texts: newTexts } });
                      }}
                    />
                    Зүүн
                  </label>
                  <label className="flex items-center gap-1 text-xs">
                    <input
                      type="radio"
                      name={`descriptionAlignment-${section.id}-${item.id}`}
                      checked={item.descriptionAlignment === 'center'}
                      onChange={() => {
                        const newTexts = section.content.texts.map(it => it.id === item.id ? { ...it, descriptionAlignment: 'center' } : it);
                        onSaveSection(section.id, { content: { ...section.content, texts: newTexts } });
                      }}
                    />
                    Төв
                  </label>
                  <label className="flex items-center gap-1 text-xs">
                    <input
                      type="radio"
                      name={`descriptionAlignment-${section.id}-${item.id}`}
                      checked={item.descriptionAlignment === 'right'}
                      onChange={() => {
                        const newTexts = section.content.texts.map(it => it.id === item.id ? { ...it, descriptionAlignment: 'right' } : it);
                        onSaveSection(section.id, { content: { ...section.content, texts: newTexts } });
                      }}
                    />
                    Баруун
                  </label>
                </div>
                <input
                  type="text"
                  value={item.title}
                  onChange={e => {
                    const newTexts = section.content.texts.map(it => it.id === item.id ? { ...it, title: e.target.value } : it);
                    onSaveSection(section.id, { content: { ...section.content, texts: newTexts } });
                  }}
                  placeholder="Гарчиг"
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm font-semibold"
                />
                <label className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={!!item.showYear}
                    onChange={e => {
                      const newTexts = section.content.texts.map(it => it.id === item.id ? { ...it, showYear: e.target.checked, year: e.target.checked ? it.year : '' } : it);
                      onSaveSection(section.id, { content: { ...section.content, texts: newTexts } });
                    }}
                  />
                  Он/Жил оруулах
                </label>
                {item.showYear && (
                  <input
                    type="text"
                    value={item.year}
                    onChange={e => {
                      const newTexts = section.content.texts.map(it => it.id === item.id ? { ...it, year: e.target.value } : it);
                      onSaveSection(section.id, { content: { ...section.content, texts: newTexts } });
                    }}
                    placeholder="Он / Жил"
                    className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm"
                  />
                )}
                <textarea
                  value={item.description}
                  onChange={e => {
                    const newTexts = section.content.texts.map(it => it.id === item.id ? { ...it, description: e.target.value } : it);
                    onSaveSection(section.id, { content: { ...section.content, texts: newTexts } });
                  }}
                  placeholder="Тайлбар"
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm resize-none"
                  rows={3}
                />
                <div className="flex gap-2 justify-end mt-2">
                  <button
                    onClick={() => {
                      const newTexts = section.content.texts.filter(it => it.id !== item.id);
                      onSaveSection(section.id, { content: { ...section.content, texts: newTexts } });
                    }}
                    className="px-4 py-2 rounded bg-red-500 text-white text-sm hover:bg-red-600 font-semibold shadow"
                  >
                    Устгах
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 