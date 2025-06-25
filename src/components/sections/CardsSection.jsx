import { useCallback, useState, useRef, useEffect } from 'react';
import ModelSelector from '../ModelSelector';
import { getThemeById } from '@/data/themePresets';

// Preview version of CardsSection
export const CardsSectionPreview = ({ content, layout, style, settings, isMobile, viewMode, theme = 'theme-1' }) => {
  const isCarousel = layout === 'carousel';
  const gridClass = layout === 'grid-4' ? 'grid-cols-4' : 'grid-cols-3';
  const carouselRef = useRef(null);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeCardId, setActiveCardId] = useState(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Get theme styles
  const themeData = getThemeById(theme);

  // Card size classes
  const cardSize = settings?.cardSize || 'medium';
  const textSize = settings?.textSize || 'base';
  const imageHeight = settings?.imageHeight || 'medium';
  let cardSizeClass = '';
  let imageHeightClass = '';
  switch (cardSize) {
    case 'small': cardSizeClass = isMobile ? 'h-[180px]' : 'h-[220px]'; break;
    case 'large': cardSizeClass = isMobile ? 'h-[320px]' : 'h-[400px]'; break;
    case 'medium':
    default: cardSizeClass = isMobile ? 'h-[240px]' : 'h-[300px]'; break;
  }
  switch (imageHeight) {
    case 'small': imageHeightClass = isMobile ? 'h-[80px]' : 'h-[120px]'; break;
    case 'large': imageHeightClass = isMobile ? 'h-[180px]' : 'h-[240px]'; break;
    case 'medium':
    default: imageHeightClass = isMobile ? 'h-[120px]' : 'h-[160px]'; break;
  }
  const textSizeClass = `text-${textSize}`;
  const textAlign = settings?.textAlign || 'center';
  let textAlignClass = 'text-center';
  if (textAlign === 'left') textAlignClass = 'text-left';
  if (textAlign === 'right') textAlignClass = 'text-right';

  // Helper functions for price positioning and sizing
  const getPriceSizeClass = (size) => {
    switch (size) {
      case 'small': return isMobile ? 'text-base' : 'text-lg md:text-xl';
      case 'large': return isMobile ? 'text-2xl' : 'text-3xl md:text-4xl';
      default: return isMobile ? 'text-lg' : 'text-2xl md:text-3xl';
    }
  };

  const getPricePositionClass = (position) => {
    switch (position) {
      case 'top-left': return 'top-4 left-4';
      case 'top': return 'top-4 left-1/2 -translate-x-1/2';
      case 'top-right': return 'top-4 right-4';
      case 'center-left': return 'top-1/2 left-4 -translate-y-1/2';
      case 'center': return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
      case 'center-right': return 'top-1/2 right-4 -translate-y-1/2';
      case 'bottom-left': return 'bottom-4 left-4';
      case 'bottom': return 'bottom-4 left-1/2 -translate-x-1/2';
      case 'bottom-right': return 'bottom-4 right-4';
      default: return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
    }
  };

  // Update container width on mount and resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Autoplay for carousel
  useEffect(() => {
    if (!isCarousel || !settings?.autoplay) return;
    if (isDragging) return;
    const interval = settings?.interval || 5000;
    const cardsToShow = settings?.cardsToShow || 3;
    const totalCards = content.cards.length;
    if (totalCards <= cardsToShow) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => {
        const next = prev + 1;
        if (next > totalCards - cardsToShow) return 0;
        return next;
      });
    }, interval);
    return () => clearInterval(timer);
  }, [isCarousel, settings?.autoplay, settings?.interval, settings?.cardsToShow, content.cards.length, isDragging]);

  // Scroll carousel on currentIndex change
  useEffect(() => {
    if (!isCarousel || !carouselRef.current) return;
    const cardsToShow = settings?.cardsToShow || 3;
    const cardWidth = getCardWidth();
    carouselRef.current.scrollTo({
      left: currentIndex * (cardWidth + 16), // 16px gap
      behavior: 'smooth',
    });
  }, [currentIndex, isCarousel, settings?.cardsToShow, containerWidth]);

  // Reset currentIndex if cards change
  useEffect(() => {
    setCurrentIndex(0);
  }, [content.cards.length, settings?.cardsToShow]);

  // Calculate card width based on cardsToShow
  const getCardWidth = () => {
    const cardsToShow = settings?.cardsToShow || 3;
    if (!containerWidth) return 220;

    const gap = 16;
    const padding = 32;
    const availableWidth = containerWidth - padding - (gap * (cardsToShow - 1));
    return Math.floor(availableWidth / cardsToShow);
  };

  const handleMouseDown = (e) => {
    if (!isCarousel) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    if (!isCarousel) return;
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    if (!isCarousel) return;
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isCarousel || !isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleCardClick = (cardId, e) => {
    if (isDragging) return;
    setActiveCardId(activeCardId === cardId ? null : cardId);
  };

  useEffect(() => {
    if (!isCarousel) return;
    
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('mousedown', handleMouseDown);
      carousel.addEventListener('mouseleave', handleMouseLeave);
      carousel.addEventListener('mouseup', handleMouseUp);
      carousel.addEventListener('mousemove', handleMouseMove);

      return () => {
        carousel.removeEventListener('mousedown', handleMouseDown);
        carousel.removeEventListener('mouseleave', handleMouseLeave);
        carousel.removeEventListener('mouseup', handleMouseUp);
        carousel.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [isCarousel, isDragging, startX, scrollLeft]);

  if (isCarousel) {
    return (
      <div className={`${isMobile ? 'px-3 py-4' : 'px-4 py-6'}`} ref={containerRef}>
        <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold mb-4 text-center`} style={{ fontFamily: style?.headerFont || 'Inter, Arial, sans-serif' }}>
          {content.title}
        </h3>
        <div 
          ref={carouselRef}
          className="flex gap-3 overflow-x-auto pb-3 cursor-grab select-none scrollbar-hide"
          style={{ 
            scrollBehavior: 'smooth', 
            WebkitOverflowScrolling: 'touch',
            scrollSnapType: 'x mandatory'
          }}
        >
          {(content.cards || []).map(card => (
            <div 
              key={card.id}
              onClick={(e) => handleCardClick(card.id, e)}
              className={`flex-none border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                activeCardId === card.id ? 'shadow-lg scale-[1.02]' : ''
              }`}
              style={{ 
                borderColor: style?.primaryColor || '#3B82F6',
                width: isMobile ? '220px' : `${getCardWidth()}px`,
                scrollSnapAlign: 'start'
              }}
            >
              <div className={`relative ${isMobile ? 'aspect-[3/2]' : 'aspect-[4/3]'}`}>
                <img 
                  src={card.image} 
                  alt={card.title}
                  className="w-full h-full object-cover"
                  draggable="false"
                />
                {card.price && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-semibold text-lg md:text-xl text-blue-600 bg-white/80 rounded-full px-4 py-2 shadow-md">
                      {card.price}
                    </span>
                  </div>
                )}
                <div 
                  className={`absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 ${
                    activeCardId === card.id ? 'opacity-0' : 'opacity-100'
                  }`}
                />
              </div>
              <div 
                className={`p-3 transition-all duration-300 ease-in-out ${
                  activeCardId === card.id ? 'h-auto' : isMobile ? 'h-[3.5rem] overflow-hidden' : 'h-[4rem] overflow-hidden'
                }`}
              >
                <h4 
                  className={`font-bold mb-1 transition-all duration-300 ${textSizeClass} ${textAlignClass} ${activeCardId === card.id ? '' : 'line-clamp-1'}`} 
                  style={{ fontFamily: style?.headerFont || 'Inter, Arial, sans-serif' }}
                >
                  {card.title}
                </h4>
                <p 
                  className={`transition-all duration-300 ${textSizeClass} ${textAlignClass} ${activeCardId === card.id ? 'opacity-100' : 'opacity-60 line-clamp-2'}`}
                  style={{ color: style?.secondaryColor || '#6B7280', fontFamily: style?.bodyFont || 'Arial, sans-serif' }}
                >
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Responsive grid classes
  const getGridClass = () => {
    if (isMobile) return 'grid-cols-1';
    if (layout === 'grid-4') return 'grid-cols-2 lg:grid-cols-4';
    return 'grid-cols-2 lg:grid-cols-3';
  };

  return (
    <div className={`${isMobile ? 'p-3' : 'p-6'}`}>
      <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold mb-2 text-center`} style={{ fontFamily: style?.headerFont || 'Inter, Arial, sans-serif' }}>
        {content.title}
      </h3>
      {content.description && (
        <p className="text-center text-gray-500 dark:text-gray-400 mb-4" style={{ fontFamily: style?.bodyFont || 'Arial, sans-serif' }}>
          {content.description}
        </p>
      )}
      <div className={`grid ${viewMode === 'mobile' ? 'grid-cols-1 gap-2' : `${getGridClass()} gap-6`}`}>
        {(content.cards || []).map(card => (
          <div 
            key={card.id}
            onClick={(e) => handleCardClick(card.id, e)}
            className={`${themeData.cards.className} ${themeData.cards.hoverEffect} ${
              activeCardId === card.id ? 'shadow-lg' : ''
            } ${cardSizeClass} flex flex-col justify-center items-center text-center`}
            style={{ borderColor: style?.primaryColor || '#3B82F6' }}
          >
            <div className={`relative w-full flex items-center justify-center ${themeData.cards.imageClass || imageHeightClass}`}>
              <img 
                src={card.image} 
                alt={card.title}
                className="w-full h-full object-cover"
              />
              {card.price && (
                <div 
                  className={`absolute ${getPricePositionClass(card.pricePosition || settings?.pricePosition)}`}
                >
                  <span 
                    className={`${themeData.cards.priceClass || getPriceSizeClass(card.priceSize || settings?.priceSize)} font-bold rounded-full px-6 py-2 shadow-md`}
                    style={{
                      color: style?.priceBadgeTextColor || '#2563EB',
                      background: style?.priceBadgeBgColor || '#E5E7EB',
                      backdropFilter: style?.priceBadgeBlur ? `blur(${style.priceBadgeBlur}px)` : undefined,
                      WebkitBackdropFilter: style?.priceBadgeBlur ? `blur(${style.priceBadgeBlur}px)` : undefined,
                    }}
                  >
                    {card.price}
                  </span>
                </div>
              )}
            </div>
            <div className={`flex-1 flex flex-col justify-center px-2 py-3 w-full ${
              textAlign === 'left' ? 'items-start' : textAlign === 'right' ? 'items-end' : 'items-center'
            }`}>
              <h4 
                className={`${themeData.cards.titleClass || `font-bold mb-2 transition-all duration-300 ${textSizeClass} ${textAlignClass}`} ${activeCardId === card.id ? '' : 'line-clamp-1'}`}
                style={{ fontFamily: style?.headerFont || 'Inter, Arial, sans-serif' }}
              >
                {card.title}
              </h4>
              <p 
                className={`${themeData.cards.descriptionClass || `transition-all duration-300 ${textSizeClass} ${textAlignClass}`} ${activeCardId === card.id ? 'opacity-100' : 'opacity-60 line-clamp-2'}`}
                style={{ color: style?.secondaryColor || '#6B7280', fontFamily: style?.bodyFont || 'Arial, sans-serif' }}
              >
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Default export for admin panel (existing functionality)
export default function CardsSection({ section, onSaveSection, onUpdateCardLayout, onAddCard }) {
  const handleUpdateCardLayout = useCallback((sectionId, layout, cardCount) => {
    onUpdateCardLayout(sectionId, layout, cardCount);
  }, [onUpdateCardLayout]);

  return (
    <div className="space-y-4">
      {/* Model Selector */}
      <ModelSelector
        sectionType="cards"
        currentModel={section.settings?.model || "model-1"}
        onModelChange={(modelId) => onSaveSection(section.id, { 
          settings: { ...section.settings, model: modelId } 
        })}
        className="mb-6"
      />

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