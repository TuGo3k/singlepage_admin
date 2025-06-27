import { useState, useCallback, useEffect, useRef } from 'react';
import { getThemeById } from '@/data/themePresets';

// Preview version of HeroSection
export const HeroSectionPreview = ({ content, layout, style, isMobile, theme = 'theme-1' }) => {
  // Get theme styles
  const themeData = getThemeById(theme);
  
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const isImageRight = layout === 'image-right';
  const isImageBackground = layout === 'image-background';

  if (isImageBackground) {
    const titleAlign = content.titleAlignment || 'center';
    const descAlign = content.descriptionAlignment || 'center';
    const buttonAlign = content.buttonAlignment || 'center';
    let titleAlignClass = 'text-center';
    let descAlignClass = 'text-center';
    let buttonAlignClass = 'justify-center';
    if (titleAlign === 'left') titleAlignClass = 'text-left';
    if (titleAlign === 'right') titleAlignClass = 'text-right';
    if (descAlign === 'left') descAlignClass = 'text-left';
    if (descAlign === 'right') descAlignClass = 'text-right';
    if (buttonAlign === 'left') buttonAlignClass = 'justify-start';
    if (buttonAlign === 'right') buttonAlignClass = 'justify-end';
    return (
      <div 
        ref={sectionRef}
        className={`relative ${isMobile ? 'h-[500px]' : 'h-[600px]'} w-full bg-cover bg-center bg-fixed overflow-hidden`}
        style={{ backgroundImage: `url(${content.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        <div className={`absolute inset-0 flex items-center ${isMobile ? 'px-4' : 'px-8'}`}>
          <div className="max-w-2xl mx-auto bg-black/70 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10">
            <h1
              className={`${isMobile ? 'text-2xl' : 'text-4xl'} font-extrabold uppercase tracking-wider mb-4 drop-shadow-lg ${titleAlignClass}`}
              style={{ 
                fontFamily: style?.headerFont || 'Inter, Arial, sans-serif', 
                letterSpacing: '0.08em',
                color: themeData.colors?.primary || '#3B82F6'
              }}
            >
              {content.title}
            </h1>
            <p
              className={`${isMobile ? 'text-base' : 'text-lg'} mb-8 italic pl-4 ${descAlignClass}`}
              style={{ 
                fontFamily: style?.bodyFont || 'Arial, sans-serif', 
                color: themeData.colors?.text || '#1F2937'
              }}
            >
              {content.description}
            </p>
            {content.buttonText && (
              <div className={`flex flex-wrap gap-4 ${buttonAlignClass}`}>
                <button
                  className="px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg backdrop-blur-md hover:scale-105 hover:shadow-2xl transition-all duration-200"
                >
                  {content.buttonText}
                </button>
                <button
                  className="px-8 py-3 rounded-xl font-semibold border-2 backdrop-blur-md hover:scale-105 hover:shadow-2xl transition-all duration-200"
                  style={{
                    borderColor: themeData.colors?.primary || '#3B82F6',
                    color: themeData.colors?.primary || '#3B82F6',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }}
                >
                  Дэлгэрэнгүй
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-8 p-8 ${
      isMobile ? 'flex-col text-center' : isImageRight ? 'flex-row' : 'flex-row-reverse'
    }`}>
      <div className={`${isMobile ? 'w-full' : 'flex-1'} space-y-4`}>
        <h2 
          className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold ${content.titleAlignment === 'left' ? 'text-left' : content.titleAlignment === 'right' ? 'text-right' : 'text-center'}`} 
          style={{ 
            fontFamily: style?.headerFont || 'Inter, Arial, sans-serif',
            color: themeData.colors?.primary || '#3B82F6'
          }}
        >
          {content.title}
        </h2>
        <p 
          className={`${content.descriptionAlignment === 'left' ? 'text-left' : content.descriptionAlignment === 'right' ? 'text-right' : 'text-center'}`}
          style={{ 
            fontFamily: style?.bodyFont || 'Arial, sans-serif', 
            color: themeData.colors?.text || '#1F2937'
          }}
        >
          {content.description}
        </p>
        {content.buttonText && (
          <div className={`flex ${content.buttonAlignment === 'left' ? 'justify-start' : content.buttonAlignment === 'right' ? 'justify-end' : 'justify-center'}`}>
            <button 
              className={`${isMobile ? 'px-6 py-3' : 'px-6 py-2'} rounded-md text-white btn-enhanced`}
              style={{ backgroundColor: themeData.colors?.primary || '#3B82F6' }}
            >
              {content.buttonText}
            </button>
          </div>
        )}
      </div>
      <div className={`${isMobile ? 'w-full' : 'flex-1'}`}>
        <img 
          src={content.image} 
          alt={content.title}
          className={`w-full ${isMobile ? 'h-[250px]' : 'h-[600px]'} object-cover rounded-lg shadow-lg`}
        />
      </div>
    </div>
  );
};

// Default export for admin panel (existing functionality)
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
                  className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  title="Дэд ангилал нэмэх"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  title="Ангилал устгах"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Add Sub Category Form */}
            {selectedCategoryForSub === category.id && (
              <div className="px-3 pb-3 border-t border-gray-100 dark:border-gray-700">
                <div className="flex gap-2 pt-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={newSubCategoryName}
                      onChange={(e) => setNewSubCategoryName(e.target.value)}
                      placeholder="Дэд ангиллын нэр..."
                      className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddSubCategory(category.id)}
                    />
                  </div>
                  <button
                    onClick={() => handleAddSubCategory(category.id)}
                    className="px-3 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Нэмэх
                  </button>
                </div>
              </div>
            )}

            {/* Sub Categories */}
            {category.subCategories && category.subCategories.length > 0 && (
              <div className="border-t border-gray-100 dark:border-gray-700">
                {category.subCategories.map((subCategory) => (
                  <div key={subCategory.id} className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {subCategory.name}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteSubCategory(category.id, subCategory.id)}
                      className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                      title="Дэд ангилал устгах"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 