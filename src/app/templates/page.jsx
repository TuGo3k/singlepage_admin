'use client';
import { useState, useCallback, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import Preview from "@/components/Preview";
import { usePreviewStore } from '@/store/previewStore';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import sectionTypes from '@/data/sectionTypes';
import AddSectionButton from "@/components/ui/AddSectionButton";
import AddFeaturesButton from "@/components/ui/AddFeaturesButton";
import PreviewMarginToggleButton from "@/components/ui/PreviewMarginToggleButton";
import DeleteSectionModal from "@/components/modals/DeleteSectionModal";
import AddSectionModal from "@/components/modals/AddSectionModal";

// Import section components
import HeroSection from "@/components/sections/HeroSection";
import BannerSection from "@/components/sections/BannerSection";
import CardsSection from "@/components/sections/CardsSection";
import HistorySection from "@/components/sections/HistorySection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import ContactSection from "@/components/sections/ContactSection";
import FooterSection from "@/components/sections/FooterSection";

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
                                  <HeroSection
                                    section={section}
                                    onUpdateSection={handleUpdateSection}
                                    onSaveSection={handleSaveSection}
                                  />
                                )}

                                {section.type === 'banner' && (
                                  <BannerSection
                                    section={section}
                                    onSaveSection={handleSaveSection}
                                    onImageUpload={(sectionId) => {
                                      setEditingSectionId(sectionId);
                                      fileInputRef.current?.click();
                                    }}
                                    fileInputRef={fileInputRef}
                                  />
                                )}

                                {section.type === 'cards' && (
                                  <CardsSection
                                    section={section}
                                    onSaveSection={handleSaveSection}
                                    onUpdateCardLayout={handleUpdateCardLayout}
                                    onAddCard={handleAddCard}
                                  />
                                )}

                                {section.type === 'history' && (
                                  <HistorySection
                                    section={section}
                                    onSaveSection={handleSaveSection}
                                  />
                                )}

                                {section.type === 'features' && (
                                  <FeaturesSection
                                    section={section}
                                    onSaveSection={handleSaveSection}
                                  />
                                )}

                                {section.type === 'contact' && (
                                  <ContactSection
                                    section={section}
                                    onSaveSection={handleSaveSection}
                                  />
                                )}

                                {section.type === 'footer' && (
                                  <FooterSection
                                    section={section}
                                  />
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
            <DeleteSectionModal
              onCancel={() => setDeletingSectionId(null)}
              onConfirm={confirmDeleteSection}
            />
          )}

          {showAddSection && (
            <AddSectionModal
              sectionTypes={sectionTypes}
              onAddSection={handleAddSection}
              onCancel={() => setShowAddSection(false)}
            />
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
