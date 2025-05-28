import { usePreviewStore } from '@/store/previewStore';
import { useState, useRef, useEffect } from 'react';

const HeroSection = ({ content, layout, style }) => {
  const isImageRight = layout === 'image-right';
  const isImageBackground = layout === 'image-background';

  if (isImageBackground) {
    return (
      <div 
        className="relative h-[400px] w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${content.image})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-center">
          <div className="max-w-2xl px-4">
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: style.headerFont }}>
              {content.title}
            </h2>
            <p className="mb-6" style={{ fontFamily: style.bodyFont }}>
              {content.description}
            </p>
            {content.buttonText && (
              <button 
                className="px-6 py-2 rounded-md"
                style={{ backgroundColor: style.primaryColor }}
              >
                {content.buttonText}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-8 p-8 ${isImageRight ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className="flex-1 space-y-4">
        <h2 className="text-3xl font-bold" style={{ fontFamily: style.headerFont }}>
          {content.title}
        </h2>
        <p style={{ fontFamily: style.bodyFont, color: style.secondaryColor }}>
          {content.description}
        </p>
        {content.buttonText && (
          <button 
            className="px-6 py-2 rounded-md text-white"
            style={{ backgroundColor: style.primaryColor }}
          >
            {content.buttonText}
          </button>
        )}
      </div>
      <div className="flex-1">
        <img 
          src={content.image} 
          alt={content.title}
          className="w-full h-[300px] object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

const BannerSection = ({ content, layout, style }) => {
  const isFull = layout === 'full-width';
  const hasOverlay = layout === 'with-overlay';

  return (
    <div 
      className={`relative ${isFull ? 'w-full' : 'container mx-auto'} h-[200px] bg-cover bg-center`}
      style={{ backgroundImage: `url(${content.background})` }}
    >
      <div className={`absolute inset-0 flex items-center justify-center text-center
        ${hasOverlay ? 'bg-black bg-opacity-50 text-white' : ''}`}
      >
        <div>
          <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: style.headerFont }}>
            {content.title}
          </h3>
          {content.subtitle && (
            <p style={{ fontFamily: style.bodyFont }}>
              {content.subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const CardsSection = ({ content, layout, style, settings }) => {
  const isCarousel = layout === 'carousel';
  const gridClass = layout === 'grid-4' ? 'grid-cols-4' : 'grid-cols-3';
  const carouselRef = useRef(null);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeCardId, setActiveCardId] = useState(null);
  const [containerWidth, setContainerWidth] = useState(0);

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

  // Calculate card width based on cardsToShow
  const getCardWidth = () => {
    const cardsToShow = settings?.cardsToShow || 3;
    if (!containerWidth) return 280; // Default width

    const gap = 24; // 1.5rem gap between cards
    const padding = 48; // 1.5rem padding on each side
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

  const CardContent = ({ card, isActive }) => (
    <div 
      className={`p-4 transition-all duration-300 ease-in-out ${
        isActive ? 'h-auto' : 'h-16 overflow-hidden'
      }`}
    >
      <h4 
        className={`font-bold mb-2 transition-all duration-300 ${
          isActive ? 'text-base' : 'text-sm line-clamp-1'
        }`} 
        style={{ fontFamily: style.headerFont }}
      >
        {card.title}
      </h4>
      <p 
        className={`transition-all duration-300 ${
          isActive 
            ? 'text-sm opacity-100' 
            : 'text-xs opacity-60 line-clamp-1'
        }`}
        style={{ color: style.secondaryColor, fontFamily: style.bodyFont }}
      >
        {card.description}
      </p>
    </div>
  );

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
      <div className="px-6 py-8" ref={containerRef}>
        <h3 className="text-2xl font-bold mb-8 text-center" style={{ fontFamily: style.headerFont }}>
          {content.title}
        </h3>
        <div 
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto pb-4 cursor-grab select-none scrollbar-hide"
          style={{ 
            scrollBehavior: 'smooth', 
            WebkitOverflowScrolling: 'touch',
            scrollSnapType: 'x mandatory'
          }}
        >
          {content.cards.map(card => (
            <div 
              key={card.id}
              onClick={(e) => handleCardClick(card.id, e)}
              className={`flex-none border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg ${
                activeCardId === card.id ? 'shadow-lg scale-[1.02]' : ''
              }`}
              style={{ 
                borderColor: style.primaryColor,
                width: `${getCardWidth()}px`,
                scrollSnapAlign: 'start'
              }}
            >
              <div className="relative aspect-[4/3]">
                <img 
                  src={card.image} 
                  alt={card.title}
                  className="w-full h-full object-cover"
                  draggable="false"
                />
                <div 
                  className={`absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 ${
                    activeCardId === card.id ? 'opacity-0' : 'opacity-100'
                  }`}
                />
              </div>
              <div 
                className={`p-4 transition-all duration-300 ease-in-out ${
                  activeCardId === card.id ? 'h-auto' : 'h-[4.5rem] overflow-hidden'
                }`}
              >
                <h4 
                  className={`font-bold mb-2 transition-all duration-300 ${
                    activeCardId === card.id ? 'text-base' : 'text-sm line-clamp-1'
                  }`} 
                  style={{ fontFamily: style.headerFont }}
                >
                  {card.title}
                </h4>
                <p 
                  className={`transition-all duration-300 ${
                    activeCardId === card.id 
                      ? 'text-sm opacity-100' 
                      : 'text-xs opacity-60 line-clamp-2'
                  }`}
                  style={{ color: style.secondaryColor, fontFamily: style.bodyFont }}
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

  return (
    <div className="p-8">
      <h3 className="text-2xl font-bold mb-6 text-center" style={{ fontFamily: style.headerFont }}>
        {content.title}
      </h3>
      <div className={`grid ${gridClass} gap-6`}>
        {content.cards.map(card => (
          <div 
            key={card.id}
            onClick={(e) => handleCardClick(card.id, e)}
            className={`border rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-lg ${
              activeCardId === card.id ? 'shadow-lg' : ''
            }`}
            style={{ borderColor: style.primaryColor }}
          >
            <div className="relative">
              <img 
                src={card.image} 
                alt={card.title}
                className="w-full h-[200px] object-cover"
              />
              <div 
                className={`absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 ${
                  activeCardId === card.id ? 'opacity-0' : 'opacity-100'
                }`}
              />
            </div>
            <CardContent card={card} isActive={activeCardId === card.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Preview() {
  const siteData = usePreviewStore((state) => state.siteData);
  const { header, style, media, contact, template } = siteData;

  const renderSection = (section) => {
    switch (section.type) {
      case 'hero':
        return <HeroSection content={section.content} layout={section.layout} style={style} />;
      case 'banner':
        return <BannerSection content={section.content} layout={section.layout} style={style} />;
      case 'cards':
        return <CardsSection content={section.content} layout={section.layout} style={style} settings={section.settings} />;
      default:
        return null;
    }
  };

  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <div className="bg-white dark:bg-gray-800">
        {/* Header Section */}
        <div 
          className="h-16 border-b flex items-center px-6"
          style={{ 
            backgroundColor: style.primaryColor,
            fontFamily: style.headerFont
          }}
        >
          <div className="h-8 flex items-center">
            <img 
              src={media.logo} 
              alt="Logo" 
              className="h-full object-contain"
            />
          </div>
        </div>

        {/* Dynamic Sections */}
        <div className="overflow-y-auto max-h-[600px]">
          {template.sections.map(section => (
            <div key={section.id} className="border-b last:border-b-0">
              {renderSection(section)}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="border-t p-6 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-md mx-auto text-center">
            <h3 
              className="text-lg font-semibold mb-4"
              style={{ color: style.primaryColor, fontFamily: style.headerFont }}
            >
              Холбоо Барих
            </h3>
            <div className="space-y-2 text-sm" style={{ color: style.secondaryColor }}>
              {contact.email && (
                <div className="flex items-center justify-center gap-2">
                  <span>📧</span>
                  <span>{contact.email}</span>
                </div>
              )}
              {contact.phone && (
                <div className="flex items-center justify-center gap-2">
                  <span>📞</span>
                  <span>{contact.phone}</span>
                </div>
              )}
              {contact.address && (
                <div className="flex items-center justify-center gap-2">
                  <span>📍</span>
                  <span>{contact.address}</span>
                </div>
              )}
              <div className="flex items-center justify-center gap-4 mt-4">
                {contact.facebook && (
                  <a 
                    href={contact.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Facebook
                  </a>
                )}
                {contact.instagram && (
                  <a 
                    href={contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-600 hover:text-pink-700"
                  >
                    Instagram
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 