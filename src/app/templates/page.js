'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import Preview from "@/components/Preview";
import { usePreviewStore } from '@/store/previewStore';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const sectionTypes = {
  hero: {
    name: 'Үндсэн хэсэг',
    description: 'Баннер болон гол мессеж',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    layouts: [
      { id: 'image-right', name: 'Зураг баруун', icon: '⭢', preview: 'Текст зүүн, зураг баруун' },
      { id: 'image-left', name: 'Зураг зүүн', icon: '⭠', preview: 'Зураг зүүн, текст баруун' },
      { id: 'image-background', name: 'Зураг арын', icon: '▣', preview: 'Зураг дээр текст' },
    ]
  },
  banner: {
    name: 'Баннер',
    description: 'Өндөр анхаарал татах хэсэг',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
      </svg>
    ),
    layouts: [
      { id: 'full-width', name: 'Бүтэн', icon: '━', preview: 'Дэлгэцийн бүтэн өргөн' },
      { id: 'contained', name: 'Хязгаартай', icon: '│', preview: 'Контейнер дотор' },
      { id: 'with-overlay', name: 'Давхарласан', icon: '▦', preview: 'Зураг дээр давхарга' },
    ]
  },
  cards: {
    name: 'Картууд',
    description: 'Үйлчилгээ, бүтээгдэхүүн',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    layouts: [
      { id: 'grid-3', name: '3 багана', icon: '⋮⋮⋮', preview: '3 багананд хуваасан' },
      { id: 'grid-4', name: '4 багана', icon: '::::', preview: '4 багананд хуваасан' },
      { id: 'carousel', name: 'Гүйдэг', icon: '⇄', preview: 'Гүйдэг харуулалт' },
    ]
  },
  features: {
    name: 'Онцлогууд',
    description: 'Давуу тал, онцлогууд',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    layouts: [
      { id: 'list', name: 'Жагсаалт', icon: '≡', preview: 'Доошоо эрэмбэлсэн' },
      { id: 'grid', name: 'Торон', icon: '▦', preview: 'Торон байрлал' },
      { id: 'alternating', name: 'Ээлжилсэн', icon: '⇄', preview: 'Ээлжилсэн байрлал' },
    ]
  }
};

export default function TemplatesPage() {
  const { updateTemplate, addSection, updateSection, deleteSection, reorderSections, updateMedia } = usePreviewStore();
  const templateData = usePreviewStore((state) => state.siteData.template);
  const mediaData = usePreviewStore((state) => state.siteData.media);
  const [showAddSection, setShowAddSection] = useState(false);
  const [editingCardId, setEditingCardId] = useState(null);
  const [deletingSectionId, setDeletingSectionId] = useState(null);
  const fileInputRef = useRef(null);
  const [editingSectionId, setEditingSectionId] = useState(null);

  // Category management state
  const [heroCategories, setHeroCategories] = useState([]); // Start with empty array
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedCategoryForSub, setSelectedCategoryForSub] = useState(null);
  const [newSubCategoryName, setNewSubCategoryName] = useState('');
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);

  // Load existing categories from hero section
  useEffect(() => {
    const heroSection = templateData.sections.find(s => s.type === 'hero');
    if (heroSection && heroSection.categories) {
      setHeroCategories(heroSection.categories);
    }
  }, [templateData.sections]);

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory = {
        id: Date.now(),
        name: newCategoryName.trim(),
        subCategories: [] // Initialize with empty subcategories
      };
      const updatedCategories = [...heroCategories, newCategory];
      setHeroCategories(updatedCategories);
      
      // Save to the first hero section
      const heroSection = templateData.sections.find(s => s.type === 'hero');
      if (heroSection) {
        handleUpdateSection(heroSection.id, {
          categories: updatedCategories
        });
      }
      
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
      
      // Save to the first hero section
      const heroSection = templateData.sections.find(s => s.type === 'hero');
      if (heroSection) {
        handleUpdateSection(heroSection.id, {
          categories: updatedCategories
        });
      }
      
      setNewSubCategoryName('');
      setSelectedCategoryForSub(null);
    }
  };

  const handleDeleteCategory = (categoryId) => {
    const updatedCategories = heroCategories.filter(cat => cat.id !== categoryId);
    setHeroCategories(updatedCategories);
    
    // Save to the first hero section
    const heroSection = templateData.sections.find(s => s.type === 'hero');
    if (heroSection) {
      handleUpdateSection(heroSection.id, {
        categories: updatedCategories
      });
    }
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
    
    // Save to the first hero section
    const heroSection = templateData.sections.find(s => s.type === 'hero');
    if (heroSection) {
      handleUpdateSection(heroSection.id, {
        categories: updatedCategories
      });
    }
  };

  const handleUpdateSection = useCallback((sectionId, updates) => {
    updateSection(sectionId, updates);
  }, [updateSection]);

  const handleUpdateCards = useCallback((sectionId, cards) => {
    const section = templateData.sections.find(s => s.id === sectionId);
    if (section) {
      handleUpdateSection(sectionId, {
        content: {
          ...section.content,
          cards
        }
      });
    }
  }, [templateData.sections, handleUpdateSection]);

  const handleAddCard = useCallback((sectionId) => {
    const section = templateData.sections.find(s => s.id === sectionId);
    if (section && section.content.cards) {
      const newCard = {
        id: `card${Date.now()}`,
        title: 'Шинэ карт',
        description: 'Тайлбар',
        image: '/placeholder.jpg'
      };
      handleUpdateCards(sectionId, [...section.content.cards, newCard]);
    }
  }, [templateData.sections, handleUpdateCards]);

  const handleDeleteCard = useCallback((sectionId, cardId) => {
    const section = templateData.sections.find(s => s.id === sectionId);
    if (section && section.content.cards) {
      handleUpdateCards(
        sectionId,
        section.content.cards.filter(card => card.id !== cardId)
      );
    }
  }, [templateData.sections, handleUpdateCards]);

  const handleUpdateCard = useCallback((sectionId, cardId, updates) => {
    const section = templateData.sections.find(s => s.id === sectionId);
    if (section && section.content.cards) {
      handleUpdateCards(
        sectionId,
        section.content.cards.map(card =>
          card.id === cardId ? { ...card, ...updates } : card
        )
      );
    }
  }, [templateData.sections, handleUpdateCards]);

  const handleDeleteSection = useCallback((sectionId) => {
    setDeletingSectionId(sectionId);
  }, []);

  const confirmDeleteSection = useCallback(() => {
    if (deletingSectionId) {
      deleteSection(deletingSectionId);
      setDeletingSectionId(null);
    }
  }, [deletingSectionId, deleteSection]);

  const handleAddSection = useCallback((type, layout) => {
    const defaultContent = {
      title: 'Шинэ гарчиг',
      description: 'Тайлбар текст оруулна уу',
      image: '/placeholder.jpg',
      buttonText: 'Товчлуур',
      buttonLink: '#'
    };

    if (type === 'cards') {
      defaultContent.cards = [
        {
          id: 'card1',
          title: 'Карт 1',
          description: 'Тайлбар',
          image: '/service1.jpg'
        },
        {
          id: 'card2',
          title: 'Карт 2',
          description: 'Тайлбар',
          image: '/service2.jpg'
        },
        {
          id: 'card3',
          title: 'Карт 3',
          description: 'Тайлбар',
          image: '/service3.jpg'
        }
      ];
    } else if (type === 'banner') {
      defaultContent.background = '/banner-bg.jpg';
      defaultContent.subtitle = 'Дэд гарчиг';
    } else if (type === 'hero') {
      defaultContent.buttonText = 'Дэлгэрэнгүй';
      defaultContent.buttonLink = '#';
    }

    const newSection = {
      id: `section${Date.now()}`,
      type,
      layout,
      content: defaultContent
    };
    
    addSection(newSection);
    setShowAddSection(false);
  }, [addSection]);

  const handleDragEnd = useCallback((result) => {
    if (!result.destination) return;

    const { source, destination, type } = result;

    // If we're dragging sections
    if (type === 'section') {
      const items = Array.from(templateData.sections);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
      reorderSections(items);
    }
    // If we're dragging cards within a section
    else if (type === 'card') {
      const sectionId = source.droppableId;
      const section = templateData.sections.find(s => s.id === sectionId);
      if (section && section.content.cards) {
        const cards = Array.from(section.content.cards);
        const [reorderedCard] = cards.splice(source.index, 1);
        cards.splice(destination.index, 0, reorderedCard);
        handleUpdateCards(sectionId, cards);
      }
    }
  }, [templateData.sections, reorderSections, handleUpdateCards]);

  const handleImageUpload = useCallback((sectionId, event) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      const section = templateData.sections.find(s => s.id === sectionId);
      
      if (section) {
        // Add to media library
        const newMediaFile = {
          id: Date.now(),
          name: file.name,
          size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
          type: file.type,
          uploadDate: new Date().toISOString().split('T')[0],
          url: fileUrl,
          location: 'sections'
        };

        // Update media store
        updateMedia({
          ...mediaData,
          sections: [...(mediaData.sections || []), newMediaFile]
        });

        // Update section content
        handleUpdateSection(sectionId, {
          content: {
            ...section.content,
            image: fileUrl
          }
        });
      }
    }
  }, [templateData.sections, mediaData, updateMedia, handleUpdateSection]);

  const handleUpdateSectionSettings = useCallback((sectionId, settings) => {
    const section = templateData.sections.find(s => s.id === sectionId);
    if (section) {
      handleUpdateSection(sectionId, {
        settings: {
          ...(section.settings || {}),
          ...settings
        }
      });
    }
  }, [templateData.sections, handleUpdateSection]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold mb-6">Загварууд</h1>

      <div className="grid grid-cols-2 gap-6">
        <Preview />
        <div className="space-y-6">
          <div className="rounded-lg border bg-card">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="font-medium">Хэсгүүд</h2>
              <Button 
                variant="outline" 
                onClick={() => setShowAddSection(true)}
                className="text-sm"
              >
                + Хэсэг нэмэх
              </Button>
            </div>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="sections" type="section">
                {(provided) => (
                  <div 
                    className="p-4 space-y-4"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {templateData.sections.map((section, index) => (
                      <Draggable 
                        key={section.id} 
                        draggableId={section.id} 
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`border rounded-lg p-3 ${
                              snapshot.isDragging ? 'shadow-lg bg-gray-50 dark:bg-gray-800' : ''
                            }`}
                          >
                            <div className="flex justify-between items-center mb-3">
                              <div className="flex items-center gap-2">
                                <div {...provided.dragHandleProps} className="cursor-grab">
                                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                                  </svg>
                                </div>
                                {sectionTypes[section.type].icon}
                                <span className="text-sm font-medium">{sectionTypes[section.type].name}</span>
                              </div>
                              <div className="flex gap-2">
                                {section.type === 'hero' && (
                                  <>
                                    <button
                                      onClick={() => {
                                        setEditingSectionId(section.id);
                                        fileInputRef.current?.click();
                                      }}
                                      className="text-blue-500 hover:text-blue-700 text-sm"
                                    >
                                      Зураг оруулах
                                    </button>
                                    <button
                                      onClick={() => setShowAddCategoryForm(!showAddCategoryForm)}
                                      className="text-green-500 hover:text-green-700 text-sm"
                                    >
                                      {showAddCategoryForm ? 'Болих' : '+ Ангилал нэмэх'}
                                    </button>
                                  </>
                                )}
                                {section.type === 'cards' && (
                                  <button
                                    onClick={() => handleAddCard(section.id)}
                                    className="text-blue-500 hover:text-blue-700 text-sm"
                                  >
                                    + Карт нэмэх
                                  </button>
                                )}
                                <button
                                  onClick={() => handleDeleteSection(section.id)}
                                  className="p-1 text-red-500 hover:text-red-700 text-sm"
                                >
                                  ×
                                </button>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div className="flex gap-2">
                                {sectionTypes[section.type].layouts.map(layout => (
                                  <button
                                    key={layout.id}
                                    onClick={() => handleUpdateSection(section.id, { layout: layout.id })}
                                    className={`px-2 py-1 text-xs rounded-md flex items-center gap-1 transition-colors
                                      ${section.layout === layout.id 
                                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
                                      }`}
                                  >
                                    <span className="text-base leading-none">{layout.icon}</span>
                                    <span>{layout.name}</span>
                                  </button>
                                ))}
                              </div>

                              {section.type === 'hero' && (
                                <div className="mt-4 space-y-3">
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
                                          Нэмэх
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
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                              </svg>
                                              {selectedCategoryForSub === category.id ? 'Болих' : 'Дэд'}
                                            </button>
                                            <button
                                              onClick={() => handleDeleteCategory(category.id)}
                                              className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                                            >
                                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
                                </div>
                              )}

                              {section.type === 'cards' && section.layout === 'carousel' && (
                                <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-md space-y-3">
                                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Гүйдэг тохиргоо</h4>
                                  <div className="space-y-2">
                                    <div>
                                      <label className="text-sm text-gray-600 dark:text-gray-400">
                                        Харагдах картын тоо
                                      </label>
                                      <select
                                        value={(section.settings?.cardsToShow || 3).toString()}
                                        onChange={(e) => handleUpdateSectionSettings(section.id, {
                                          cardsToShow: parseInt(e.target.value)
                                        })}
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
                                        onChange={(e) => handleUpdateSectionSettings(section.id, {
                                          autoplay: e.target.checked
                                        })}
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
                                          onChange={(e) => handleUpdateSectionSettings(section.id, {
                                            interval: parseInt(e.target.value) * 1000
                                          })}
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

                              {section.type === 'cards' && section.content.cards && (
                                <Droppable droppableId={section.id} type="card">
                                  {(provided) => (
                                    <div 
                                      {...provided.droppableProps}
                                      ref={provided.innerRef}
                                      className="mt-4 space-y-2"
                                    >
                                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Картууд ({section.content.cards.length})
                                      </div>
                                      <div className="grid grid-cols-2 gap-3">
                                        {section.content.cards.map((card, cardIndex) => (
                                          <Draggable
                                            key={card.id}
                                            draggableId={card.id}
                                            index={cardIndex}
                                          >
                                            {(provided, snapshot) => (
                                              <div 
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                className={`border rounded-lg overflow-hidden transition-all duration-200 ${
                                                  editingCardId === card.id ? 'shadow-lg bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'
                                                } ${snapshot.isDragging ? 'shadow-xl' : ''}`}
                                              >
                                                <div className="flex items-center justify-between p-2 border-b">
                                                  <div className="flex items-center gap-2">
                                                    <div {...provided.dragHandleProps} className="cursor-grab">
                                                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                                                      </svg>
                                                    </div>
                                                    <span className="text-sm font-medium">Карт {cardIndex + 1}</span>
                                                  </div>
                                                  <div className="flex gap-2">
                                                    <button
                                                      onClick={() => setEditingCardId(editingCardId === card.id ? null : card.id)}
                                                      className="text-blue-500 hover:text-blue-700"
                                                    >
                                                      {editingCardId === card.id ? '✓' : '✎'}
                                                    </button>
                                                    <button
                                                      onClick={() => handleDeleteCard(section.id, card.id)}
                                                      className="text-red-500 hover:text-red-700"
                                                    >
                                                      ×
                                                    </button>
                                                  </div>
                                                </div>
                                                {editingCardId === card.id ? (
                                                  <div className="p-2 space-y-2">
                                                    <input
                                                      value={card.title}
                                                      onChange={(e) => handleUpdateCard(section.id, card.id, { title: e.target.value })}
                                                      placeholder="Гарчиг"
                                                      className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:border-blue-500"
                                                    />
                                                    <textarea
                                                      value={card.description}
                                                      onChange={(e) => handleUpdateCard(section.id, card.id, { description: e.target.value })}
                                                      placeholder="Тайлбар"
                                                      rows={3}
                                                      className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:border-blue-500"
                                                    />
                                                  </div>
                                                ) : (
                                                  <div className="p-2">
                                                    <div className="text-sm font-medium truncate">{card.title}</div>
                                                    <div className="text-xs text-gray-500 truncate">{card.description}</div>
                                                  </div>
                                                )}
                                              </div>
                                            )}
                                          </Draggable>
                                        ))}
                                        {provided.placeholder}
                                      </div>
                                    </div>
                                  )}
                                </Droppable>
                              )}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>

          {deletingSectionId && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
                <h3 className="text-lg font-medium mb-4">Хэсгийг устгах</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Та энэ хэсгийг устгахдаа итгэлтэй байна уу? Энэ үйлдлийг буцаах боломжгүй.
                </p>
                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setDeletingSectionId(null)}
                    className="text-sm"
                  >
                    Болих
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={confirmDeleteSection}
                    className="text-sm bg-red-500 hover:bg-red-600 text-white"
                  >
                    Устгах
                  </Button>
                </div>
              </div>
            </div>
          )}

          {showAddSection && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
                <h3 className="text-lg font-medium mb-4">Шинэ хэсэг нэмэх</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(sectionTypes).map(([type, { name, icon, layouts }]) => (
                    <button
                      key={type}
                      className="flex items-center gap-2 p-3 border rounded-lg hover:border-blue-500 transition-colors text-left"
                      onClick={() => handleAddSection(type, layouts[0].id)}
                    >
                      <span className="text-gray-500">{icon}</span>
                      <div>
                        <div className="font-medium text-sm">{name}</div>
                        <div className="text-xs text-gray-500">{layouts.length} загвар</div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddSection(false)}
                    className="text-sm"
                  >
                    Болих
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          if (editingSectionId) {
            handleImageUpload(editingSectionId, e);
            setEditingSectionId(null);
          }
        }}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
} 