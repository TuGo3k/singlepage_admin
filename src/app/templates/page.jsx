'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import Preview from "@/components/Preview";
import { usePreviewStore } from '@/store/previewStore';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FaPhoneAlt, FaHome, FaEnvelope } from "react-icons/fa";
import sectionTypes from '@/data/sectionTypes';
import AddSectionButton from "@/components/ui/AddSectionButton";
import AddFeaturesButton from "@/components/ui/AddFeaturesButton";
import PreviewMarginToggleButton from "@/components/ui/PreviewMarginToggleButton";

export default function TemplatesPage() {
  const { updateTemplate, addSection, updateSection, deleteSection, reorderSections, updateMedia, setSiteData } = usePreviewStore();
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

  const handleUpdateCardLayout = useCallback((sectionId, layout, cardCount) => {
    const section = templateData.sections.find(s => s.id === sectionId);
    if (section) {
      // Layout бүрийн default картын тоо
      let defaultCardCount = 3;
      if (layout === 'grid-4') defaultCardCount = 4;
      if (layout === 'carousel') defaultCardCount = 3;

      // cardCount байхгүй бол default-ыг авна
      const requiredCards = cardCount || defaultCardCount;

      // Get current cards
      const currentCards = section.content.cards || [];
      let updatedCards = [...currentCards];

      if (currentCards.length < requiredCards) {
        for (let i = currentCards.length; i < requiredCards; i++) {
          updatedCards.push({
            id: `card${Date.now()}-${i}`,
            title: `Карт ${i + 1}`,
            description: 'Тайлбар',
            image: '/placeholder.jpg'
          });
        }
      } else if (currentCards.length > requiredCards) {
        updatedCards = currentCards.slice(0, requiredCards);
      }

      handleUpdateSection(sectionId, {
        layout,
        content: {
          ...section.content,
          cards: updatedCards
        }
      });
    }
  }, [templateData.sections, handleUpdateSection]);

  const handleAddCard = useCallback((sectionId) => {
    const section = templateData.sections.find(s => s.id === sectionId);
    if (section && section.content.cards) {
      const currentCardCount = section.content.cards.length;
      let maxCards = 0;

      // Set maximum cards based on layout
      switch (section.layout) {
        case 'grid-3':
          maxCards = 9;
          break;
        case 'grid-4':
          maxCards = 12;
          break;
        case 'carousel':
          maxCards = 10;
          break;
        default:
          maxCards = 9; // Default to grid-3 limit
      }

      // Check if we've reached the limit
      if (currentCardCount >= maxCards) {
        alert(`Та хамгийн ихдээ ${maxCards} карт нэмэх боломжтой.`);
        return;
      }

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
    } else if (type === 'features') {
      defaultContent.cards = [
        {
          id: 'price1',
          title: 'Basic',
          description: 'Энгийн багцын үйлчилгээ',
          price: '29,000₮',
          image: '/price-basic.jpg'
        },
        {
          id: 'price2',
          title: 'Standard',
          description: 'Стандарт багцын үйлчилгээ',
          price: '49,000₮',
          image: '/price-standard.jpg'
        },
        {
          id: 'price3',
          title: 'Premium',
          description: 'Премиум багцын үйлчилгээ',
          price: '99,000₮',
          image: '/price-premium.jpg'
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

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('siteData');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.template && parsed.media) {
        setSiteData(parsed);
      }
    }
  }, [setSiteData]);

  // Save to localStorage when templateData or mediaData changes
  useEffect(() => {
    localStorage.setItem('siteData', JSON.stringify({ template: templateData, media: mediaData }));
  }, [templateData, mediaData]);

  const [showSaved, setShowSaved] = useState(false);

  // Notify on save
  const handleSaveSection = (sectionId, updates) => {
    handleUpdateSection(sectionId, updates);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  // State for preview margin
  const [previewMarginActive, setPreviewMarginActive] = useState(false);

  const [selectedDesign, setSelectedDesign] = useState('Дизайн 1');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-4">
      {showSaved && (
        <div
          className={`fixed top-6 right-6 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg
            transition-all duration-500
            ${showSaved ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
          `}
        >
          Амжилттай хадгалагдлаа
        </div>
      )}
      <h1 className="text-2xl font-semibold mb-6">Загварууд</h1>

      <div className="flex  gap-6">
        <Preview previewMarginActive={previewMarginActive} />
        <div className="space-y-6 w-1/4">
          <div className="rounded-lg border bg-card">
            <div className="p-4 border-b flex justify-between items-center">
              <div className="flex items-center gap-2">
                <h2 className="font-medium">Хэсгүүд</h2>
                <PreviewMarginToggleButton onClick={() => setPreviewMarginActive(v => !v)} previewMarginActive={previewMarginActive} />
              </div>
              <AddSectionButton 
                onClick={() => setShowAddSection(true)}
                className="text-sm"
              />
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
                          <div className="flex gap-1 ml-auto">
                            <button
                              disabled={index === 0}
                              onClick={e => {
                                e.stopPropagation();
                                if (index === 0) return;
                                const newSections = [...templateData.sections];
                                [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
                                reorderSections(newSections);
                              }}
                              className={`px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs ${index === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                            >
                              ↑
                            </button>
                            <button
                              disabled={index === templateData.sections.length - 1}
                              onClick={e => {
                                e.stopPropagation();
                                if (index === templateData.sections.length - 1) return;
                                const newSections = [...templateData.sections];
                                [newSections[index + 1], newSections[index]] = [newSections[index], newSections[index + 1]];
                                reorderSections(newSections);
                              }}
                              className={`px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs ${index === templateData.sections.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                            >
                              ↓
                            </button>
                          </div>
                          <svg className={`w-4 h-4 ml-2 transition-transform ${activeSectionId === section.id ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
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
                                   
                                      </>
                                    )}
                                    {/* {section.type === 'banner' && (
                                      <button
                                        onClick={() => {
                                          setEditingSectionId(section.id);
                                          fileInputRef.current?.click();
                                        }}
                                        className="text-blue-500 hover:text-blue-700 text-sm"
                                      >
                                        Баннер зураг оруулах
                                      </button>
                                    )} */}
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
                                <button
                                  onClick={() => handleSaveSection(section.id, { content: { ...section.content } })}
                                  className="px-4 py-2 rounded bg-green-600 text-white text-sm hover:bg-green-700 transition-colors"
                                >
                                  Хадгалах
                                </button>
                              </div>
                              <div className="space-y-4">
                                {section.type === 'hero' && (
                                  <div className="mt-4 space-y-3">
                                    {/* Text alignment controls */}
                                    <div className="space-y-3">
                                      <div>
                                        <label className="block text-xs text-gray-500 mb-1">Гарчигийн байршил</label>
                                        <select
                                          value={section.content.titleAlignment || 'center'}
                                          onChange={e => handleSaveSection(section.id, { content: { ...section.content, titleAlignment: e.target.value } })}
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
                                          onChange={e => handleSaveSection(section.id, { content: { ...section.content, descriptionAlignment: e.target.value } })}
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
                                          onChange={e => handleSaveSection(section.id, { content: { ...section.content, buttonAlignment: e.target.value } })}
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
                                          onChange={() => handleUpdateSection(section.id, { content: { ...section.content, layout: 'image-right' } })}
                                        />
                                        <span className="ml-1">Зураг баруун</span>
                                      </label>
                                      <label className="inline-flex items-center mr-4 text-xs">
                                        <input
                                          type="radio"
                                          name={`hero-layout-${section.id}`}
                                          checked={section.content.layout === 'image-left'}
                                          onChange={() => handleUpdateSection(section.id, { content: { ...section.content, layout: 'image-left' } })}
                                        />
                                        <span className="ml-1">Зураг зүүн</span>
                                      </label>
                                      <label className="inline-flex items-center text-xs">
                                        <input
                                          type="radio"
                                          name={`hero-layout-${section.id}`}
                                          checked={section.content.layout === 'image-background'}
                                          onChange={() => handleUpdateSection(section.id, { content: { ...section.content, layout: 'image-background' } })}
                                        />
                                        <span className="ml-1">Зураг ард</span>
                                      </label>
                                    </div>
                                  </div>
                                )}

                                {section.type === 'banner' && (
                                  <div className="space-y-4">
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Зураг</label>
                                      <div className="flex items-center gap-2">
                                        <input
                                          type="text"
                                          value={section.content.image}
                                          onChange={(e) => handleSaveSection(section.id, { content: { ...section.content, image: e.target.value } })}
                                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                          placeholder="Зургийн URL"
                                        />
                                        <button
                                          onClick={() => {
                                            setEditingSectionId(section.id);
                                            fileInputRef.current?.click();
                                          }}
                                          className="px-3 py-2 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500"
                                        >
                                          Зураг оруулах
                                        </button>
                                        <button
                                          onClick={() => handleSaveSection(section.id, { content: { ...section.content, image: '' } })}
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
                                        onChange={(e) => handleSaveSection(section.id, { content: { ...section.content, title: e.target.value } })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                        placeholder="Гарчиг"
                                      />
                                      <div className="mt-2 flex gap-2">
                                        <label className="inline-flex items-center text-xs">
                                          <input
                                            type="radio"
                                            name={`title-alignment-${section.id}`}
                                            checked={(section.content.titleAlignment || 'center') === 'left'}
                                            onChange={() => updateSection(section.id, { content: { ...section.content, titleAlignment: 'left' } })}
                                          />
                                          <span className="ml-1">Зүүн</span>
                                        </label>
                                        <label className="inline-flex items-center text-xs">
                                          <input
                                            type="radio"
                                            name={`title-alignment-${section.id}`}
                                            checked={(section.content.titleAlignment || 'center') === 'center'}
                                            onChange={() => updateSection(section.id, { content: { ...section.content, titleAlignment: 'center' } })}
                                          />
                                          <span className="ml-1">Төв</span>
                                        </label>
                                        <label className="inline-flex items-center text-xs">
                                          <input
                                            type="radio"
                                            name={`title-alignment-${section.id}`}
                                            checked={(section.content.titleAlignment || 'center') === 'right'}
                                            onChange={() => updateSection(section.id, { content: { ...section.content, titleAlignment: 'right' } })}
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
                                        onChange={(e) => handleSaveSection(section.id, { content: { ...section.content, subtitle: e.target.value } })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                        placeholder="Дэд гарчиг"
                                      />
                                      <div className="mt-2 flex gap-2">
                                        <label className="inline-flex items-center text-xs">
                                          <input
                                            type="radio"
                                            name={`subtitle-alignment-${section.id}`}
                                            checked={(section.content.subtitleAlignment || 'center') === 'left'}
                                            onChange={() => updateSection(section.id, { content: { ...section.content, subtitleAlignment: 'left' } })}
                                          />
                                          <span className="ml-1">Зүүн</span>
                                        </label>
                                        <label className="inline-flex items-center text-xs">
                                          <input
                                            type="radio"
                                            name={`subtitle-alignment-${section.id}`}
                                            checked={(section.content.subtitleAlignment || 'center') === 'center'}
                                            onChange={() => updateSection(section.id, { content: { ...section.content, subtitleAlignment: 'center' } })}
                                          />
                                          <span className="ml-1">Төв</span>
                                        </label>
                                        <label className="inline-flex items-center text-xs">
                                          <input
                                            type="radio"
                                            name={`subtitle-alignment-${section.id}`}
                                            checked={(section.content.subtitleAlignment || 'center') === 'right'}
                                            onChange={() => updateSection(section.id, { content: { ...section.content, subtitleAlignment: 'right' } })}
                                          />
                                          <span className="ml-1">Баруун</span>
                                        </label>
                                      </div>
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Тайлбар</label>
                                      <textarea
                                        value={section.content.description}
                                        onChange={(e) => handleSaveSection(section.id, { content: { ...section.content, description: e.target.value } })}
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
                                            onChange={() => updateSection(section.id, { content: { ...section.content, descriptionAlignment: 'left' } })}
                                          />
                                          <span className="ml-1">Зүүн</span>
                                        </label>
                                        <label className="inline-flex items-center text-xs">
                                          <input
                                            type="radio"
                                            name={`description-alignment-${section.id}`}
                                            checked={(section.content.descriptionAlignment || 'center') === 'center'}
                                            onChange={() => updateSection(section.id, { content: { ...section.content, descriptionAlignment: 'center' } })}
                                          />
                                          <span className="ml-1">Төв</span>
                                        </label>
                                        <label className="inline-flex items-center text-xs">
                                          <input
                                            type="radio"
                                            name={`description-alignment-${section.id}`}
                                            checked={(section.content.descriptionAlignment || 'center') === 'right'}
                                            onChange={() => updateSection(section.id, { content: { ...section.content, descriptionAlignment: 'right' } })}
                                          />
                                          <span className="ml-1">Баруун</span>
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {section.type === 'cards' && (
                                  <div className="space-y-4">
                                    {/* Save button */}
                               

                                    {/* Section title input */}
                                    <div className="mb-4">
                                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Хэсгийн гарчиг
                                      </label>
                                      <input
                                        type="text"
                                        value={section.content.title || ''}
                                        onChange={(e) => handleSaveSection(section.id, {
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
                                              onChange={(e) => handleSaveSection(section.id, { settings: { ...section.settings, cardsToShow: parseInt(e.target.value) } })}
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
                                              onChange={(e) => handleSaveSection(section.id, { settings: { ...section.settings, autoplay: e.target.checked } })}
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
                                                onChange={(e) => handleSaveSection(section.id, { settings: { ...section.settings, interval: parseInt(e.target.value) * 1000 } })}
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
                                          onChange={e => handleSaveSection(section.id, { settings: { ...section.settings, cardSize: e.target.value } })}
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
                                          onChange={e => handleSaveSection(section.id, { settings: { ...section.settings, imageHeight: e.target.value } })}
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
                                          onChange={e => handleSaveSection(section.id, { settings: { ...section.settings, textSize: e.target.value } })}
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
                                          onChange={e => handleSaveSection(section.id, { settings: { ...section.settings, textAlign: e.target.value } })}
                                          className="block w-full text-xs rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1"
                                        >
                                          <option value="left">Зүүн</option>
                                          <option value="center">Төв</option>
                                          <option value="right">Баруун</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {section.type === 'history' && (
                                  <div className="relative">
                                    {/* <button
                                      onClick={() => handleUpdateSection(section.id, { content: { ...section.content } })}
                                      className="px-4 py-2 rounded bg-green-600 text-white text-sm hover:bg-green-700 absolute right-0 top-0 z-10"
                                    >
                                      Хадгалах
                                    </button> */}
                                    {/* Subtype Tabs */}
                                    <div className="flex gap-2 mb-4 items-center">
                                      {['timeline', 'text'].map(subtype => (
                                        <button
                                          key={subtype}
                                          onClick={() => handleSaveSection(section.id, { content: { ...section.content, subtype } })}
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
                                          onClick={() => handleSaveSection(section.id, { content: { ...section.content, layout: layout.id } })}
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
                                           handleSaveSection(section.id, { content: { ...section.content, items: newItems } });
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
                                            onChange={(e) => handleSaveSection(section.id, {
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
                                                        handleSaveSection(section.id, { content: { ...section.content, items: newItems } });
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
                                                      handleSaveSection(section.id, { content: { ...section.content, items: newItems } });
                                                    }}
                                                    placeholder="Гарчиг"
                                                    className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm"
                                                  />
                                                  <input
                                                    type="text"
                                                    value={item.year}
                                                    onChange={e => {
                                                      const newItems = section.content.items.map(it => it.id === item.id ? { ...it, year: e.target.value } : it);
                                                      handleSaveSection(section.id, { content: { ...section.content, items: newItems } });
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
                                                    handleSaveSection(section.id, { content: { ...section.content, items: newItems } });
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
                                                    handleSaveSection(section.id, { content: { ...section.content, items } });
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
                                                    handleSaveSection(section.id, { content: { ...section.content, items } });
                                                  }}
                                                  className={`px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs ${idx === section.content.items.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                                                >
                                                  ↓
                                                </button>
                                                <button
                                                  onClick={() => {
                                                    const items = section.content.items.filter(it => it.id !== item.id);
                                                    handleSaveSection(section.id, { content: { ...section.content, items } });
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
                                            onChange={(e) => handleSaveSection(section.id, {
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
                                              handleSaveSection(section.id, { content: { ...section.content, texts: newTexts } });
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
                                                      handleSaveSection(section.id, { content: { ...section.content, texts: newTexts } });
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
                                                      handleSaveSection(section.id, { content: { ...section.content, texts: newTexts } });
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
                                                      handleSaveSection(section.id, { content: { ...section.content, texts: newTexts } });
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
                                                      handleSaveSection(section.id, { content: { ...section.content, texts: newTexts } });
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
                                                      handleSaveSection(section.id, { content: { ...section.content, texts: newTexts } });
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
                                                      handleSaveSection(section.id, { content: { ...section.content, texts: newTexts } });
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
                                                  handleSaveSection(section.id, { content: { ...section.content, texts: newTexts } });
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
                                                    handleSaveSection(section.id, { content: { ...section.content, texts: newTexts } });
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
                                                    handleSaveSection(section.id, { content: { ...section.content, texts: newTexts } });
                                                  }}
                                                  placeholder="Он / Жил"
                                                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm"
                                                />
                                              )}
                                              <textarea
                                                value={item.description}
                                                onChange={e => {
                                                  const newTexts = section.content.texts.map(it => it.id === item.id ? { ...it, description: e.target.value } : it);
                                                  handleSaveSection(section.id, { content: { ...section.content, texts: newTexts } });
                                                }}
                                                placeholder="Тайлбар"
                                                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm resize-none"
                                                rows={3}
                                              />
                                              <div className="flex gap-2 justify-end mt-2">
                                                <button
                                                  onClick={() => {
                                                    const newTexts = section.content.texts.filter(it => it.id !== item.id);
                                                    handleSaveSection(section.id, { content: { ...section.content, texts: newTexts } });
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
                                )}
                                {section.type === 'features' && (
                                  <div className="space-y-4">
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Хэсгийн гарчиг</label>
                                      <input
                                        type="text"
                                        value={section.content.title || ''}
                                        onChange={(e) => handleSaveSection(section.id, {
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
                                        onChange={(e) => handleSaveSection(section.id, {
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
                                              onClick={() => handleSaveSection(section.id, { settings: { ...section.settings, pricePosition: pos } })}
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
                                        onChange={(e) => handleSaveSection(section.id, { settings: { ...section.settings, priceSize: e.target.value } })}
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
                                        onChange={(e) => handleSaveSection(section.id, { settings: { ...section.settings, cardSize: e.target.value } })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                      >
                                        <option value="small">Жижиг</option>
                                        <option value="medium">Дунд</option>
                                        <option value="large">Том</option>
                                      </select>
                                    </div>
                                  </div>
                                )}
                                {section.type === 'contact' && (
                                  <div className="space-y-4">
                                    {/* Dropdown button for design selection */}
                                    <div className="mb-2 relative w-48" ref={dropdownRef}>
                                      <button
                                        type="button"
                                        className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm flex justify-between items-center text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        onClick={() => setDropdownOpen((open) => !open)}
                                      >
                                        {selectedDesign}
                                        <svg className={`w-4 h-4 ml-2 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                      </button>
                                      {dropdownOpen && (
                                        <div className="absolute z-10 mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                                          {['Дизайн 1', 'Дизайн 2', 'Дизайн 3'].map(option => (
                                            <button
                                              key={option}
                                              className={`w-full text-left px-4 py-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 ${selectedDesign === option ? 'bg-blue-100 dark:bg-blue-900/40 font-semibold' : ''}`}
                                              onClick={() => {
                                                setSelectedDesign(option);
                                                setDropdownOpen(false);
                                                handleSaveSection(section.id, { content: { ...section.content, footerDesign: option } });
                                              }}
                                            >
                                              {option}
                                            </button>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                    {/* End dropdown */}
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Гарчиг</label>
                                      <input
                                        type="text"
                                        value={section.content?.title || ''}
                                        onChange={(e) => handleSaveSection(section.id, { content: { ...section.content, title: e.target.value } })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                        placeholder="Гарчиг"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Тайлбар</label>
                                      <textarea
                                        value={section.content?.description || ''}
                                        onChange={(e) => handleSaveSection(section.id, { content: { ...section.content, description: e.target.value } })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                        rows={3}
                                        placeholder="Тайлбар"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">И-мэйл гарчиг</label>
                                      <input
                                        type="text"
                                        value={section.content?.emailTitle || ''}
                                        onChange={(e) => handleSaveSection(section.id, { content: { ...section.content, emailTitle: e.target.value } })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                        placeholder="И-мэйл гарчиг"
                                      />
                                    </div>
                                  
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Утасны гарчиг</label>
                                      <input
                                        type="text"
                                        value={section.content?.phoneTitle || ''}
                                        onChange={(e) => handleSaveSection(section.id, { content: { ...section.content, phoneTitle: e.target.value } })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                        placeholder="Утасны гарчиг"
                                      />
                                    </div>
                                 
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Хаягны гарчиг</label>
                                      <input
                                        type="text"
                                        value={section.content?.addressTitle || ''}
                                        onChange={(e) => handleSaveSection(section.id, { content: { ...section.content, addressTitle: e.target.value } })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                        placeholder="Хаягны гарчиг"
                                      />
                                    </div>
                                
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Сошиал медиа гарчиг</label>
                                      <input
                                        type="text"
                                        value={section.content?.socialTitle || ''}
                                        onChange={(e) => handleSaveSection(section.id, { content: { ...section.content, socialTitle: e.target.value } })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                        placeholder="Сошиал медиа гарчиг"
                                      />
                                    </div>
                              
                                  </div>
                                )}
                                {section.type === 'footer' && (
                                  <div className="space-y-4">
                                    {section.content?.footerDesign === "Дизайн 2" ? (
                                      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-6">
                                        <div className="flex flex-col md:flex-row gap-6">
                                          <div className="relative bg-white rounded-2xl shadow-lg p-8 w-72 text-center transition transform hover:-translate-y-1 hover:shadow-2xl">
                                            <div className="mb-4 flex justify-center">
                                              <FaPhoneAlt className="text-4xl text-pink-400" />
                                            </div>
                                            <h3 className="text-xl font-semibold text-neutral-800 mb-2">Phone</h3>
                                            <p className="text-neutral-600 whitespace-pre-line">{section.content?.phone || ""}</p>
                                          </div>
                                          <div className="relative bg-white rounded-2xl shadow-lg p-8 w-72 text-center transition transform hover:-translate-y-1 hover:shadow-2xl">
                                            <div className="mb-4 flex justify-center">
                                              <FaHome className="text-4xl text-red-400" />
                                            </div>
                                            <h3 className="text-xl font-semibold text-neutral-800 mb-2">Address</h3>
                                            <p className="text-neutral-600 whitespace-pre-line">{section.content?.address || ""}</p>
                                          </div>
                                          <div className="relative bg-white rounded-2xl shadow-lg p-8 w-72 text-center transition transform hover:-translate-y-1 hover:shadow-2xl">
                                            <div className="mb-4 flex justify-center">
                                              <FaEnvelope className="text-4xl text-yellow-400" />
                                            </div>
                                            <h3 className="text-xl font-semibold text-neutral-800 mb-2">Email</h3>
                                            <p className="text-neutral-600 whitespace-pre-line">{section.content?.email || ""}</p>
                                          </div>
                                        </div>
                                      </div>
                                    ) : (
                                      <footer className="w-full bg-gray-900 py-10 px-4 rounded-xl shadow-lg mt-8">
                                        <div className="max-w-4xl mx-auto">
                                          <h2 className="text-2xl md:text-3xl font-bold text-center text-indigo-400 mb-2">{section.content?.title || 'Холбоо барих'}</h2>
                                          {section.content?.description && <p className="text-center text-gray-300 mb-8">{section.content.description}</p>}
                                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                            {/* И-мэйл */}
                                            {section.content?.email && (
                                              <div className="flex flex-col items-center bg-gray-800 rounded-lg p-6 border border-gray-700">
                                                <div className="bg-indigo-500 p-3 rounded-full mb-3">
                                                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12l-4-4-4 4m8 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6" />
                                                  </svg>
                                                </div>
                                                <div className="text-lg font-semibold text-white mb-1">И-мэйл</div>
                                                <div className="text-gray-400 text-sm">{section.content.email}</div>
                                              </div>
                                            )}
                                            {/* Утас */}
                                            {section.content?.phone && (
                                              <div className="flex flex-col items-center bg-gray-800 rounded-lg p-6 border border-gray-700">
                                                <div className="bg-green-500 p-3 rounded-full mb-3">
                                                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                  </svg>
                                                </div>
                                                <div className="text-lg font-semibold text-white mb-1">Утас</div>
                                                <div className="text-gray-400 text-sm">{section.content.phone}</div>
                                              </div>
                                            )}
                                            {/* Байршил */}
                                            {section.content?.address && (
                                              <div className="flex flex-col items-center bg-gray-800 rounded-lg p-6 border border-gray-700">
                                                <div className="bg-red-500 p-3 rounded-full mb-3">
                                                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 10c-4.418 0-8-4.03-8-9 0-4.418 3.582-8 8-8s8 3.582 8 8c0 4.97-3.582 9-8 9z" />
                                                  </svg>
                                                </div>
                                                <div className="text-lg font-semibold text-white mb-1">Байршил</div>
                                                <div className="text-gray-400 text-sm">{section.content.address}</div>
                                              </div>
                                            )}
                                          </div>
                                          {(section.content?.facebook || section.content?.instagram) && (
                                            <div className="flex justify-center gap-4 mt-4">
                                              {section.content?.facebook && (
                                                <a href={section.content.facebook} className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full" target="_blank" rel="noopener noreferrer">
                                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.632.771-1.632 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z"/></svg>
                                                </a>
                                              )}
                                              {section.content?.instagram && (
                                                <a href={section.content.instagram} className="bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-full" target="_blank" rel="noopener noreferrer">
                                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4" fill="#fff"/></svg>
                                                </a>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                      </footer>
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
