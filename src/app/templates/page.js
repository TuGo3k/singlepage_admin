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
  },
  history: {
    name: 'Түүх',
    description: 'Компаний түүх, хөгжлийн замнал',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    layouts: [
      {
        id: 'timeline',
        name: 'Цагийн хэлхээ',
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2" />
          </svg>
        ),
        preview: 'Цагийн дарааллаар'
      },
      {
        id: 'cards',
        name: 'Картууд',
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <rect x="3" y="7" width="7" height="10" rx="2" strokeWidth="2" />
            <rect x="14" y="7" width="7" height="10" rx="2" strokeWidth="2" />
          </svg>
        ),
        preview: 'Карт хэлбэрээр'
      },
      {
        id: 'story',
        name: 'Түүх',
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 19.5A2.5 2.5 0 016.5 17H20" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4.5A2.5 2.5 0 016.5 7H20" />
            <rect x="4" y="7" width="16" height="10" rx="2" strokeWidth="2" />
          </svg>
        ),
        preview: 'Түүх хэлбэрээр'
      },
      {
        id: 'grid',
        name: 'Торон',
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <rect x="3" y="3" width="7" height="7" rx="1" strokeWidth="2" />
            <rect x="14" y="3" width="7" height="7" rx="1" strokeWidth="2" />
            <rect x="3" y="14" width="7" height="7" rx="1" strokeWidth="2" />
            <rect x="14" y="14" width="7" height="7" rx="1" strokeWidth="2" />
          </svg>
        ),
        preview: 'Торон байрлал'
      },
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
  const [activeSectionId, setActiveSectionId] = useState(null);

  // Category management state
  const [heroCategories, setHeroCategories] = useState([]); // Start with empty array
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedCategoryForSub, setSelectedCategoryForSub] = useState(null);
  const [newSubCategoryName, setNewSubCategoryName] = useState('');
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);

  // Лого upload state
  const logoInputRef = useRef();

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
    } else if (type === 'history') {
      defaultContent.layout = 'timeline';
      defaultContent.items = [
        {
          id: 'history1',
          year: '2020',
          title: 'Компани байгуулагдсан',
          description: 'Манай компани анх байгуулагдсан түүх',
          image: '/history1.jpg'
        },
        {
          id: 'history2',
          year: '2021',
          title: 'Шинэ үйлчилгээ нэвтрүүлсэн',
          description: 'Хэрэглэгчдэд шинэ үйлчилгээг санал болгосон',
          image: '/history2.jpg'
        }
      ];
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

  const handleImageUpload = useCallback((sectionId, event, usageType = 'section') => {
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
          usedIn: usageType === 'section' ? sectionId : usageType
        };
        updateMedia({
          ...mediaData,
          library: [...(mediaData.library || []), newMediaFile]
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

  const [cardsLayout, setCardsLayout] = useState('grid-2'); // grid-2, grid-4, carousel

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
                      <div key={section.id} className="mb-2">
                        <div
                          className={`flex items-center gap-2 cursor-pointer rounded-lg px-3 py-2 transition-all border border-gray-200 dark:border-gray-700 ${activeSectionId === section.id ? 'bg-blue-50 dark:bg-blue-900/10' : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                          onClick={() => setActiveSectionId(activeSectionId === section.id ? null : section.id)}
                        >
                          {sectionTypes[section.type].icon}
                          <span className="font-medium text-gray-900 dark:text-white">{sectionTypes[section.type].name}</span>
                          <svg className={`w-4 h-4 ml-auto transition-transform ${activeSectionId === section.id ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </div>
                        <div className={`overflow-hidden transition-all duration-300 ${activeSectionId === section.id ? 'max-h-[1000px] py-2' : 'max-h-0 py-0'}`}>
                          {activeSectionId === section.id && (
                            <div className="p-3">
                              <div className="flex justify-between items-center mb-3">
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-2">
                                    <div className="cursor-grab">
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
                                    {section.type === 'banner' && (
                                      <button
                                        onClick={() => {
                                          setEditingSectionId(section.id);
                                          fileInputRef.current?.click();
                                        }}
                                        className="text-blue-500 hover:text-blue-700 text-sm"
                                      >
                                        Баннер зураг оруулах
                                      </button>
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
                              </div>
                              <div className="space-y-4">
                                {section.type === 'hero' && (
                                  <div className="mt-4 space-y-3">
                                    {/* Лого upload input */}
                                    <div className="flex items-center gap-3 mb-3">
                                      <input
                                        type="file"
                                        accept="image/*"
                                        ref={logoInputRef}
                                        onChange={e => {
                                          const file = e.target.files[0];
                                          if (file) {
                                            const url = URL.createObjectURL(file);
                                            updateMedia({
                                              ...mediaData,
                                              logo: url,
                                              library: [...(mediaData.library || []), {
                                                id: Date.now(),
                                                url,
                                                name: file.name,
                                                usedIn: 'logo',
                                                uploadDate: new Date().toISOString()
                                              }]
                                            });
                                          }
                                        }}
                                        className="hidden"
                                        id="header-logo-upload"
                                      />
                                      
                                      <label htmlFor="header-logo-upload" className="flex items-center gap-3 cursor-pointer group">
                                        {mediaData.logo ? (
                                          <img src={mediaData.logo} alt="logo" className="w-10 h-10 object-contain rounded-lg border border-gray-300 dark:border-gray-600 group-hover:border-blue-500 transition" />
                                        ) : (
                                          <svg className="w-7 h-7 text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg group-hover:border-blue-500 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                        )}
                                        <span className="text-sm text-blue-600 dark:text-blue-400 group-hover:underline">Лого оруулах</span>
                                      </label>
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

                                {section.type === 'banner' && (
                                  <div className="mt-4 space-y-3">
                                    <div className="relative group">
                                      {section.content?.image ? (
                                        <img 
                                          src={section.content.image} 
                                          alt="Banner" 
                                          className="w-full h-32 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                                        />
                                      ) : (
                                        <div 
                                          onClick={() => {
                                            setEditingSectionId(section.id);
                                            fileInputRef.current?.click();
                                          }}
                                          className="w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors"
                                        >
                                          <div className="text-center">
                                            <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Баннер зураг оруулах</p>
                                          </div>
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

                                {section.type === 'cards' && (
                                  <div className="space-y-4">
                                    {/* Layout сонголт */}
                                    <div className="flex gap-2 mb-2">
                                      <button
                                        onClick={() => setCardsLayout('grid-2')}
                                        className={`px-3 py-1 rounded-md text-xs font-medium border ${cardsLayout === 'grid-2' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'}`}
                                      >2 багана</button>
                                      <button
                                        onClick={() => setCardsLayout('grid-4')}
                                        className={`px-3 py-1 rounded-md text-xs font-medium border ${cardsLayout === 'grid-4' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'}`}
                                      >4 багана</button>
                                      <button
                                        onClick={() => setCardsLayout('carousel')}
                                        className={`px-3 py-1 rounded-md text-xs font-medium border ${cardsLayout === 'carousel' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'}`}
                                      >Swipe/Carousel</button>
                                    </div>
                                    {/* Картуудыг харуулах хэсэг */}
                                    {cardsLayout === 'grid-2' && (
                                      <div className="grid grid-cols-2 gap-4">
                                        {section.content.cards.map(card => (
                                          <div key={card.id} className="border rounded-lg p-4 bg-white dark:bg-gray-800">
                                            <img src={card.image} alt={card.title} className="w-full h-32 object-cover rounded mb-2" />
                                            <div className="font-bold mb-1">{card.title}</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">{card.description}</div>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                    {cardsLayout === 'grid-4' && (
                                      <div className="grid grid-cols-4 gap-4">
                                        {section.content.cards.map(card => (
                                          <div key={card.id} className="border rounded-lg p-4 bg-white dark:bg-gray-800">
                                            <img src={card.image} alt={card.title} className="w-full h-32 object-cover rounded mb-2" />
                                            <div className="font-bold mb-1">{card.title}</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">{card.description}</div>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                    {cardsLayout === 'carousel' && (
                                      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                                        {section.content.cards.map(card => (
                                          <div key={card.id} className="min-w-[220px] max-w-xs border rounded-lg p-4 bg-white dark:bg-gray-800">
                                            <img src={card.image} alt={card.title} className="w-full h-32 object-cover rounded mb-2" />
                                            <div className="font-bold mb-1">{card.title}</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">{card.description}</div>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                )}

                                {section.type === 'history' && (
                                  <div className="relative">
                                    <button
                                      onClick={() => handleUpdateSection(section.id, { content: { ...section.content } })}
                                      className="px-4 py-2 rounded bg-green-600 text-white text-sm hover:bg-green-700 absolute right-0 top-0 z-10"
                                    >
                                      Хадгалах
                                    </button>
                                    {/* Subtype Tabs */}
                                    <div className="flex gap-2 mb-4 items-center">
                                      {['timeline', 'text'].map(subtype => (
                                        <button
                                          key={subtype}
                                          onClick={() => handleUpdateSection(section.id, { content: { ...section.content, subtype } })}
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
                                          onClick={() => handleUpdateSection(section.id, { content: { ...section.content, layout: layout.id } })}
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
                                           handleUpdateSection(section.id, { content: { ...section.content, items: newItems } });
                                         }}
                                         className="px-4 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700 ml-auto"
                                       >
                                         + Нэмэх
                                       </button>
                                     )}
                                    </div>
                                    {/* Timeline items: зөвхөн subtype нь timeline үед */}
                                    {(section.content.subtype || 'timeline') === 'timeline' && (
                                      <div className="space-y-6 max-h-96 overflow-y-auto pr-2">
                                        {section.content.items.map((item, idx) => (
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
                                                      handleUpdateSection(section.id, { content: { ...section.content, items: newItems } });
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
                                                    handleUpdateSection(section.id, { content: { ...section.content, items: newItems } });
                                                  }}
                                                  placeholder="Гарчиг"
                                                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm"
                                                />
                                                <input
                                                  type="text"
                                                  value={item.year}
                                                  onChange={e => {
                                                    const newItems = section.content.items.map(it => it.id === item.id ? { ...it, year: e.target.value } : it);
                                                    handleUpdateSection(section.id, { content: { ...section.content, items: newItems } });
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
                                                  handleUpdateSection(section.id, { content: { ...section.content, items: newItems } });
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
                                                  handleUpdateSection(section.id, { content: { ...section.content, items } });
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
                                                  handleUpdateSection(section.id, { content: { ...section.content, items } });
                                                }}
                                                className={`px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs ${idx === section.content.items.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                                              >
                                                ↓
                                              </button>
                                              <button
                                                onClick={() => {
                                                  const items = section.content.items.filter(it => it.id !== item.id);
                                                  handleUpdateSection(section.id, { content: { ...section.content, items } });
                                                }}
                                                className="px-2 py-1 rounded bg-red-500 text-white text-xs hover:bg-red-600"
                                              >
                                                Устгах
                                              </button>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                    {/* Текст талбар: зөвхөн subtype нь text үед */}
                                    {(section.content.subtype || 'timeline') === 'text' && (
                                      <div className="mt-4">
                                        {/* Гарчиг оруулах input */}
                                        <div className="flex items-center mb-2">
                                          <input
                                            type="text"
                                            value={section.content.title || ''}
                                            onChange={e => handleUpdateSection(section.id, { content: { ...section.content, title: e.target.value } })}
                                            placeholder="Гарчиг оруулах..."
                                            className="flex-1 px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm mr-2"
                                          />
                                          <button
                                            onClick={() => {
                                              const newTexts = [
                                                ...(section.content.texts || []),
                                                { id: `text${Date.now()}`, title: '', description: '', year: '' }
                                              ];
                                              handleUpdateSection(section.id, { content: { ...section.content, texts: newTexts } });
                                            }}
                                            className="px-4 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
                                          >
                                            + Нэмэх
                                          </button>
                                        </div>
                                        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                                          {section.content.texts?.map((item, idx) => (
                                            <div key={item.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 flex flex-col gap-2">
                                              {/* Байрлал сонголт - карт дотор хамгийн дээр */}
                                              <div className="flex gap-4 mb-1">
                                                <label className="flex items-center gap-1 text-xs">
                                                  <input
                                                    type="radio"
                                                    name={`textAlignment-${section.id}-${item.id}`}
                                                    checked={(item.textAlignment || 'left') === 'left'}
                                                    onChange={() => {
                                                      const newTexts = section.content.texts.map(it => it.id === item.id ? { ...it, textAlignment: 'left' } : it);
                                                      handleUpdateSection(section.id, { content: { ...section.content, texts: newTexts } });
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
                                                      handleUpdateSection(section.id, { content: { ...section.content, texts: newTexts } });
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
                                                      handleUpdateSection(section.id, { content: { ...section.content, texts: newTexts } });
                                                    }}
                                                  />
                                                  Баруун
                                                </label>
                                              </div>
                                              {/* Гарчиг талбар */}
                                              <input
                                                type="text"
                                                value={item.title}
                                                onChange={e => {
                                                  const newTexts = section.content.texts.map(it => it.id === item.id ? { ...it, title: e.target.value } : it);
                                                  handleUpdateSection(section.id, { content: { ...section.content, texts: newTexts } });
                                                }}
                                                placeholder="Гарчиг"
                                                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm"
                                              />
                                              {/* Он/Жил оруулах сонголт */}
                                              <label className="flex items-center gap-2 text-xs">
                                                <input
                                                  type="checkbox"
                                                  checked={!!item.showYear}
                                                  onChange={e => {
                                                    const newTexts = section.content.texts.map(it => it.id === item.id ? { ...it, showYear: e.target.checked, year: e.target.checked ? it.year : '' } : it);
                                                    handleUpdateSection(section.id, { content: { ...section.content, texts: newTexts } });
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
                                                    handleUpdateSection(section.id, { content: { ...section.content, texts: newTexts } });
                                                  }}
                                                  placeholder="Он / Жил"
                                                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm"
                                                />
                                              )}
                                              {/* Тайлбар талбар */}
                                              <textarea
                                                value={item.description}
                                                onChange={e => {
                                                  const newTexts = section.content.texts.map(it => it.id === item.id ? { ...it, description: e.target.value } : it);
                                                  handleUpdateSection(section.id, { content: { ...section.content, texts: newTexts } });
                                                }}
                                                placeholder="Тайлбар"
                                                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm resize-none"
                                                rows={3}
                                              />
                                              <div className="flex gap-2 justify-end mt-2">
                                                <button
                                                  onClick={() => {
                                                    const newTexts = section.content.texts.filter(it => it.id !== item.id);
                                                    handleUpdateSection(section.id, { content: { ...section.content, texts: newTexts } });
                                                  }}
                                                  className="px-4 py-2 rounded bg-red-500 text-white text-sm hover:bg-red-600"
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
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
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