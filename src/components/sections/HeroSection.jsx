import { useState, useCallback, useEffect } from 'react';

export default function HeroSection({ section, onUpdateSection, onSaveSection }) {
  // Category management state
  const [heroCategories, setHeroCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedCategoryForSub, setSelectedCategoryForSub] = useState(null);
  const [newSubCategoryName, setNewSubCategoryName] = useState('');
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);

  // Load existing categories from hero section
  useEffect(() => {
    if (section && section.categories) {
      setHeroCategories(section.categories);
    }
  }, [section]);

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory = {
        id: Date.now(),
        name: newCategoryName.trim(),
        subCategories: []
      };
      const updatedCategories = [...heroCategories, newCategory];
      setHeroCategories(updatedCategories);
      
      onUpdateSection(section.id, {
        categories: updatedCategories
      });
      
      setNewCategoryName('');
    }
  };

  const handleAddSubCategory = (categoryId) => {
    if (newSubCategoryName.trim()) {
      const updatedCategories = heroCategories.map(category => 
        category.id === categoryId 
          ? {
              ...category,
              subCategories: [
                ...category.subCategories,
                {
                  id: Date.now(),
                  name: newSubCategoryName.trim(),
                  parentId: categoryId
                }
              ]
            }
          : category
      );
      setHeroCategories(updatedCategories);
      
      onUpdateSection(section.id, {
        categories: updatedCategories
      });
      
      setNewSubCategoryName('');
      setSelectedCategoryForSub(null);
    }
  };

  const handleDeleteCategory = (categoryId) => {
    const updatedCategories = heroCategories.filter(cat => cat.id !== categoryId);
    setHeroCategories(updatedCategories);
    
    onUpdateSection(section.id, {
      categories: updatedCategories
    });
  };

  const handleDeleteSubCategory = (categoryId, subCategoryId) => {
    const updatedCategories = heroCategories.map(category =>
      category.id === categoryId
        ? {
            ...category,
            subCategories: category.subCategories.filter(sub => sub.id !== subCategoryId)
          }
        : category
    );
    setHeroCategories(updatedCategories);
    
    onUpdateSection(section.id, {
      categories: updatedCategories
    });
  };

  return (
    <div className="mt-4 space-y-3">
      {/* Text alignment controls */}
      <div className="space-y-3">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Гарчигийн байршил</label>
          <select
            value={section.content.titleAlignment || 'center'}
            onChange={e => onSaveSection(section.id, { content: { ...section.content, titleAlignment: e.target.value } })}
            className="block w-full text-xs rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1"
          >
            <option value="left">Зүүн</option>
            <option value="center">Төв</option>
            <option value="right">Баруун</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Тайлбарын байршил</label>
          <select
            value={section.content.descriptionAlignment || 'center'}
            onChange={e => onSaveSection(section.id, { content: { ...section.content, descriptionAlignment: e.target.value } })}
            className="block w-full text-xs rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1"
          >
            <option value="left">Зүүн</option>
            <option value="center">Төв</option>
            <option value="right">Баруун</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Товчны байршил</label>
          <select
            value={section.content.buttonAlignment || 'center'}
            onChange={e => onSaveSection(section.id, { content: { ...section.content, buttonAlignment: e.target.value } })}
            className="block w-full text-xs rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1"
          >
            <option value="left">Зүүн</option>
            <option value="center">Төв</option>
            <option value="right">Баруун</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Ангилалууд</h4>
        <button
          onClick={() => setShowAddCategoryForm(!showAddCategoryForm)}
          className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
            showAddCategoryForm 
              ? 'bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400' 
              : 'bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400'
          }`}
        >
          {showAddCategoryForm ? (
            <>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Болих
            </>
          ) : (
            <>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Ангилал нэмэх
            </>
          )}
        </button>
      </div>

      {/* Add Category Form */}
      {showAddCategoryForm && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Ангиллын нэр..."
                className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
              />
            </div>
            <button
              onClick={() => {
                handleAddCategory();
                setShowAddCategoryForm(false);
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Хадгалах
            </button>
          </div>
        </div>
      )}

      {/* Categories List */}
      <div className="space-y-2">
        {heroCategories.map((category) => (
          <div key={category.id} className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all">
            {/* Main Category */}
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {category.name}
                </span>
                {category.subCategories && category.subCategories.length > 0 && (
                  <span className="inline-flex items-center px-1.5 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                    {category.subCategories.length}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setSelectedCategoryForSub(selectedCategoryForSub === category.id ? null : category.id)}
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-green-700 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 rounded-md transition-colors"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  {selectedCategoryForSub === category.id ? 'Болих' : 'Дэд'}
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Add Subcategory Form */}
            {selectedCategoryForSub === category.id && (
              <div className="px-3 pb-3">
                <div className="bg-green-50 dark:bg-green-900/10 rounded-lg p-3 border border-green-200 dark:border-green-800">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSubCategoryName}
                      onChange={(e) => setNewSubCategoryName(e.target.value)}
                      placeholder="Дэд ангиллын нэр..."
                      className="flex-1 px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-green-300 dark:border-green-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddSubCategory(category.id)}
                    />
                    <button
                      onClick={() => handleAddSubCategory(category.id)}
                      className="px-3 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                    >
                      Нэмэх
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Subcategories List */}
            {category.subCategories && category.subCategories.length > 0 && (
              <div className="px-3 pb-3">
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-2 border border-gray-200 dark:border-gray-700">
                  <div className="space-y-1">
                    {category.subCategories.map((subCategory) => (
                      <div key={subCategory.id} className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md border border-gray-100 dark:border-gray-700 group">
                        <div className="flex items-center gap-2">
                          <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            {subCategory.name}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteSubCategory(category.id, subCategory.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-all"
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        
        {heroCategories.length === 0 && !showAddCategoryForm && (
          <div className="text-center py-8 px-4">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Ангилал байхгүй байна
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Дээрх "Нэмэх" товчлуур дарж эхлээрэй
            </p>
          </div>
        )}
      </div>

      {/* Байршил сонголт */}
      <div className="mb-2">
        <span className="text-sm font-medium mr-3">Байршил:</span>
        <label className="inline-flex items-center mr-4 text-xs">
          <input
            type="radio"
            name={`hero-layout-${section.id}`}
            checked={(section.content.layout || 'image-right') === 'image-right'}
            onChange={() => onUpdateSection(section.id, { content: { ...section.content, layout: 'image-right' } })}
          />
          <span className="ml-1">Зураг баруун</span>
        </label>
        <label className="inline-flex items-center mr-4 text-xs">
          <input
            type="radio"
            name={`hero-layout-${section.id}`}
            checked={section.content.layout === 'image-left'}
            onChange={() => onUpdateSection(section.id, { content: { ...section.content, layout: 'image-left' } })}
          />
          <span className="ml-1">Зураг зүүн</span>
        </label>
        <label className="inline-flex items-center text-xs">
          <input
            type="radio"
            name={`hero-layout-${section.id}`}
            checked={section.content.layout === 'image-background'}
            onChange={() => onUpdateSection(section.id, { content: { ...section.content, layout: 'image-background' } })}
          />
          <span className="ml-1">Зураг ард</span>
        </label>
      </div>
    </div>
  );
} 