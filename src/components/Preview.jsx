import { usePreviewStore } from '@/store/previewStore';
import { useState, useRef, useEffect } from 'react';
import { sectionTypes } from '@/app/templates/page';
import { FaFacebook, FaPhone } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { PiMapPinFill } from 'react-icons/pi';
import { BsInstagram } from 'react-icons/bs';

// Mobile/Desktop view toggle
const ViewportToggle = ({ viewMode, setViewMode }) => (
  <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1 mb-4">
    <button
      onClick={() => setViewMode('desktop')}
      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        viewMode === 'desktop' 
          ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' 
          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
      }`}
    >
      Desktop
    </button>
    <button
      onClick={() => setViewMode('mobile')}
      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        viewMode === 'mobile' 
          ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' 
          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
      }`}
    >
      Mobile
    </button>
  </div>
);

// Enhanced navigation header with scroll effects
const NavigationHeader = ({ style, media, currentSection, setCurrentSection, sections, isMobile, hasMargin, previewMarginActive }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const logoInputRef = useRef();
  const { updateMedia } = usePreviewStore();

  // Лого upload хийхэд previewStore-д хадгална
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      updateMedia({
        ...media,
        logo: url,
        library: [...(media.library || []), {
          id: Date.now(),
          url,
          name: file.name,
          usedIn: 'logo',
          uploadDate: new Date().toISOString()
        }]
      });
    }
  };

  // Hero section-аас ангилал, дэд ангилал авах (хамгийн уян хатан)
  const heroSection = sections.find(s => s.type === 'hero');
  let categories = [];
  if (heroSection) {
    if (Array.isArray(heroSection.categories) && heroSection.categories.length > 0) {
      categories = heroSection.categories;
    } else if (heroSection.content && Array.isArray(heroSection.content.categories) && heroSection.content.categories.length > 0) {
      categories = heroSection.content.categories;
    }
    // subCategories property байхгүй бол хоосон массив болгоно
    categories = categories.map(cat => ({
      ...cat,
      subCategories: Array.isArray(cat.subCategories) ? cat.subCategories : []
    }));
  }
  // Navigation items-д зөвхөн хэрэглэгчийн ангилал, дэд ангилал нэмэх
  const navigationItems = categories.map(cat => ({
    id: `cat-${cat.id}`,
    label: cat.name,
    subCategories: cat.subCategories
  }));

  return (
    <div 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-lg' : 'bg-white dark:bg-gray-800'
      }`}
      style={{ 
        borderBottomColor: isScrolled ? style?.primaryColor + '20' : 'transparent',
        borderBottomWidth: '1px',
        marginTop: hasMargin ? '40px' : undefined,
        marginBottom: hasMargin ? '40px' : undefined
      }}
    >
      <div className={`${isMobile ? 'px-4' : 'px-10'} py-3`}>
        <div className="flex items-center justify-between"
              style={previewMarginActive && !isMobile ? { marginLeft: '8%', marginRight: '8%' } : undefined}
        >
          {/* Logo upload + preview */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center cursor-pointer relative group" onClick={() => logoInputRef.current.click()}>
              <img 
                src={media.logo} 
                alt="Logo" 
                className="w-10 h-10 object-contain rounded-lg"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <svg 
                className="w-8 h-8 text-white absolute inset-0 m-auto opacity-0 group-hover:opacity-80 transition-opacity pointer-events-none" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <input
                type="file"
                accept="image/*"
                ref={logoInputRef}
                onChange={handleLogoUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="flex items-center gap-8">
              {navigationItems.map((item) => (
                <div key={item.id} className="relative group">
                  <button
                    onClick={() => setCurrentSection(item.id)}
                    className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 ${
                      currentSection === item.id
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    {item.label}
                    {currentSection === item.id && (
                      <div 
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                      />
                    )}
                  </button>
                  {/* Дэд ангилал байгаа бол dropdown */}
                  {item.subCategories && item.subCategories.length > 0 && (
                    <div className="absolute left-0 top-full min-w-[120px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20 hidden group-hover:block">
                      <ul className="py-2">
                        {item.subCategories.map(sub => (
                          <li key={sub.id}>
                            <button
                              onClick={() => setCurrentSection(`subcat-${sub.id}`)}
                              className="block w-full text-left px-4 py-2 text-xs text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                            >
                              {sub.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          )}

          {/* Mobile menu button */}
          {isMobile && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          )}
        </div>

        {/* Mobile Navigation Menu */}
        {isMobile && mobileMenuOpen && (
          <div className="mt-4 pb-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col space-y-2 pt-4">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-4 py-3 rounded-lg transition-colors ${
                    currentSection === item.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

// Enhanced hero section with parallax and animations
const HeroSection = ({ content, layout, style, isMobile }) => {
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
              className={`${isMobile ? 'text-2xl' : 'text-4xl'} font-extrabold uppercase tracking-wider mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent drop-shadow-lg ${titleAlignClass}`}
              style={{ fontFamily: style?.headerFont || 'Inter, Arial, sans-serif', letterSpacing: '0.08em' }}
            >
              {content.title}
            </h1>
            <p
              className={`${isMobile ? 'text-base' : 'text-lg'} mb-8 text-gray-200 italic pl-4 ${descAlignClass}`}
              style={{ fontFamily: style?.bodyFont || 'Arial, sans-serif', color: style?.secondaryColor || '#6B7280' }}
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
                  className="px-8 py-3 rounded-xl font-semibold border-2 border-white/80 text-white/90 bg-white/10 hover:bg-white/20 hover:text-blue-700 transition-all duration-200"
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
          style={{ fontFamily: style?.headerFont || 'Inter, Arial, sans-serif' }}
        >
          {content.title}
        </h2>
        <p 
          className={`${content.descriptionAlignment === 'left' ? 'text-left' : content.descriptionAlignment === 'right' ? 'text-right' : 'text-center'}`}
          style={{ fontFamily: style?.bodyFont || 'Arial, sans-serif', color: style?.secondaryColor || '#6B7280' }}
        >
          {content.description}
        </p>
        {content.buttonText && (
          <div className={`flex ${content.buttonAlignment === 'left' ? 'justify-start' : content.buttonAlignment === 'right' ? 'justify-end' : 'justify-center'}`}>
            <button 
              className={`${isMobile ? 'px-6 py-3' : 'px-6 py-2'} rounded-md text-white btn-enhanced`}
              style={{ backgroundColor: style?.primaryColor || '#3B82F6' }}
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

const BannerSection = ({ content, layout, style, isMobile }) => {
  const isFull = layout === 'full-width';
  const hasOverlay = layout === 'with-overlay';

  return (
    <div 
      className={`relative ${isFull ? 'w-full' : 'container mx-auto'} ${isMobile ? 'h-[200px]' : 'h-[250px]'} bg-cover bg-center`}
      style={{ 
        backgroundImage: content.image ? `url(${content.image})` : content.background ? `url(${content.background})` : 'none',
        backgroundColor: !content.image && !content.background ? '#f3f4f6' : 'transparent'
      }}
    >
      <div className={`absolute inset-0 flex items-center justify-center ${hasOverlay ? 'bg-black bg-opacity-50 text-white' : ''}`}
      >
        <div className={`${isMobile ? 'px-4 w-full' : 'px-8 w-full'} flex flex-col gap-1`}>
          <div style={{ width: '100%' }}>
            <h3 
              className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-2`} 
              style={{ 
                fontFamily: style?.headerFont || 'Inter, Arial, sans-serif',
                textAlign: content.titleAlignment || 'center',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                width: '100%'
              }}
            >
              {content.title}
            </h3>
          </div>
          {content.subtitle && (
            <div style={{ width: '100%' }}>
              <p 
                className={`${isMobile ? 'text-sm' : 'text-base'}`} 
                style={{ 
                  fontFamily: style?.bodyFont || 'Arial, sans-serif',
                  textAlign: content.subtitleAlignment || 'center',
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                  width: '100%'
                }}
              >
                {content.subtitle}
              </p>
            </div>
          )}
          {content.description && (
            <div style={{ width: '100%' }}>
              <p 
                className={`${isMobile ? 'text-xs' : 'text-sm'} mt-2`} 
                style={{ 
                  fontFamily: style?.bodyFont || 'Arial, sans-serif',
                  textAlign: content.descriptionAlignment || 'center',
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                  width: '100%'
                }}
              >
                {content.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CardsSection = ({ content, layout, style, settings, isMobile, viewMode }) => {
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
          {content.cards.map(card => (
            <div 
              key={card.id}
              onClick={(e) => handleCardClick(card.id, e)}
              className={`flex-none border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg ${
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
      <div className={`grid ${viewMode === 'mobile' ? 'grid-cols-1 gap-2' : 'md:grid-cols-3 gap-6'}`}>
        {content.cards.map(card => (
          <div 
            key={card.id}
            onClick={(e) => handleCardClick(card.id, e)}
            className={`border rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-lg ${
              activeCardId === card.id ? 'shadow-lg' : ''
            } ${cardSizeClass} flex flex-col justify-center items-center text-center`}
            style={{ borderColor: style?.primaryColor || '#3B82F6' }}
          >
            <div className={`relative w-full flex items-center justify-center ${imageHeightClass}`}>
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
                    className={`${getPriceSizeClass(card.priceSize || settings?.priceSize)} font-bold rounded-full px-6 py-2 shadow-md`}
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
                className={`font-bold mb-2 transition-all duration-300 ${textSizeClass} ${textAlignClass} ${activeCardId === card.id ? '' : 'line-clamp-1'}`}
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
};

const HistorySection = ({ content, style, isMobile, viewMode }) => {
  const selectedSubtype = content.subtype || 'timeline';
  const selectedLayout = content.layout || (selectedSubtype === 'timeline' ? 'timeline' : 'text-left');

  const renderTimeline = () => (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-600 to-purple-600" />
      {content.items.map((item, index) => (
        <div key={item.id} className={`relative mb-12 ${index % 2 === 0 ? 'pr-1/2' : 'pl-1/2'}`}>
          {/* Year badge */}
          <div className={`absolute top-0 ${index % 2 === 0 ? 'right-1/2 mr-8' : 'left-1/2 ml-8'} transform -translate-y-1/2`}>
            <div className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>
              {item.year}
            </div>
          </div>
          {/* Content card */}
          <div className={`${index % 2 === 0 ? 'mr-8' : 'ml-8'} bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative h-48 md:h-full">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h4 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold mb-2`} style={{ fontFamily: style?.headerFont || 'Inter, Arial, sans-serif' }}>
                  {item.title}
                </h4>
                <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600 dark:text-gray-400`} style={{ fontFamily: style?.bodyFont || 'Arial, sans-serif' }}>
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCards = () => (
    <div className={`grid w-full ${viewMode === 'mobile' ? 'grid-cols-1 gap-2' : 'md:grid-cols-3 gap-6'}`}>
      {content.items.map(item => (
        <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-48">
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>
              {item.year}
            </div>
          </div>
          <div className="p-6">
            <h4 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold mb-2`} style={{ fontFamily: style?.headerFont || 'Inter, Arial, sans-serif' }}>
              {item.title}
            </h4>
            <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600 dark:text-gray-400`} style={{ fontFamily: style?.bodyFont || 'Arial, sans-serif' }}>
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderStory = () => (
    <div className="space-y-12">
      {content.items.map((item, index) => (
        <div key={item.id} className="flex flex-col md:flex-row gap-8 items-center">
          <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
            <div className="relative">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
              <div className={`absolute -top-4 -left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-bold ${isMobile ? 'text-base' : 'text-lg'}`}>
                {item.year}
              </div>
            </div>
          </div>
          <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
            <h4 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-4`} style={{ fontFamily: style?.headerFont || 'Inter, Arial, sans-serif' }}>
              {item.title}
            </h4>
            <p className={`${isMobile ? 'text-base' : 'text-lg'} text-gray-600 dark:text-gray-400`} style={{ fontFamily: style?.bodyFont || 'Arial, sans-serif' }}>
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderGrid = () => (
    <div className={`grid ${viewMode === 'mobile' ? 'grid-cols-1 gap-4' : 'md:grid-cols-2 gap-8'}`}>
      {content.items.map(item => (
        <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="relative">
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-64 object-cover"
            />
            <div className={`absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>
              {item.year}
            </div>
          </div>
          <div className="p-6">
            <h4 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold mb-2`} style={{ fontFamily: style?.headerFont || 'Inter, Arial, sans-serif' }}>
              {item.title}
            </h4>
            <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600 dark:text-gray-400`} style={{ fontFamily: style?.bodyFont || 'Arial, sans-serif' }}>
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  // New: Render for text subtype
  const renderText = () => {
    return (
      <div className="max-w-2xl mx-auto">
        {content.texts?.map(item => (
          <div key={item.id} className="mb-8">
            <h4 
              className={`text-xl font-bold mb-2 ${
                item.textAlignment === 'center' ? 'text-center' : item.textAlignment === 'right' ? 'text-right' : 'text-left'
              }`} 
              style={{ fontFamily: style?.headerFont || 'Inter, Arial, sans-serif' }}
            >
              {item.title}
            </h4>
            <p 
              className={`text-gray-600 dark:text-gray-400 whitespace-normal break-words ${
                item.descriptionAlignment === 'center' ? 'text-center' : item.descriptionAlignment === 'right' ? 'text-right' : 'text-left'
              }`} 
              style={{ fontFamily: style?.bodyFont || 'Arial, sans-serif' }}
            >
              {item.description}
            </p>
            {item.year && <div className="text-xs text-gray-400 mt-1">{item.year}</div>}
          </div>
        ))}
      </div>
    );
  };

  const renderContent = () => {
    if (selectedSubtype === 'text') {
      return renderText();
    }
    switch (selectedLayout) {
      case 'timeline':
        return renderTimeline();
      case 'cards':
        return renderCards();
      case 'story':
        return renderStory();
      case 'grid':
        return renderGrid();
      default:
        return renderTimeline();
    }
  };

  return (
    <div className={`${isMobile ? 'p-4' : 'p-8'}`}>
      {content.title && content.title.trim() !== '' && (
        <div className="text-center mb-6">
          <h3 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold mb-2`} style={{ fontFamily: style?.headerFont || 'Inter, Arial, sans-serif' }}>
            {content.title}
          </h3>
          {content.subtitle && (
            <p className={`${isMobile ? 'text-base' : 'text-lg'} text-gray-600 dark:text-gray-400`} style={{ fontFamily: style?.bodyFont || 'Arial, sans-serif' }}>
              {content.subtitle}
            </p>
          )}
        </div>
      )}
      {renderContent()}
    </div>
  );
};

const ContactSection = ({ siteData, content, isMobile }) => {
  return (
    <div className={`bg-[#111827] text-white ${isMobile ? 'py-8 px-4' : 'py-12 px-4'} text-center`}>
      <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-indigo-400 mb-2`}>
        {content?.title || 'Бидэнтэй холбогдох'}
      </h2>
      <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-300 mb-8`}>
        {content?.description || 'Танай асуулт, санал хүсэлтийг бидэнд илгээнэ үү. Бид танд хурдан хариулах болно.'}
      </p>

      <div className={`flex flex-col ${isMobile ? 'gap-4' : 'md:flex-row gap-6'} justify-center items-center mb-10`}>
        {/* Email */}
        <div className={`bg-[#1f2937] rounded-xl p-6 ${isMobile ? 'w-full' : 'w-72'} ${isMobile ? 'text-center' : 'text-left'} shadow-md border border-gray-700`}>
          <div className={`flex items-center mb-4 text-blue-400 ${isMobile ? 'text-xl justify-center' : 'text-2xl'}`}>
            <MdEmail />
          </div>
          <h3 className={`font-semibold ${isMobile ? 'text-base' : 'text-lg'} mb-1`}>
            {content?.emailTitle || siteData?.contact?.emailTitle || 'И-мэйл'}
          </h3>
          <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-300`}>
            {content?.email || siteData?.contact?.email || 'info@example.com'}
          </p>
        </div>

        {/* Phone */}
        <div className={`bg-[#1f2937] rounded-xl p-6 ${isMobile ? 'w-full' : 'w-72'} ${isMobile ? 'text-center' : 'text-left'} shadow-md border border-gray-700`}>
          <div className={`flex items-center mb-4 text-green-400 ${isMobile ? 'text-xl justify-center' : 'text-2xl'}`}>
            <FaPhone />
          </div>
          <h3 className={`font-semibold ${isMobile ? 'text-base' : 'text-lg'} mb-1`}>
            {content?.phoneTitle || siteData?.contact?.phoneTitle || 'Утас'}
          </h3>
          <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-300`}>
            {content?.phone || siteData?.contact?.phone || '+976 99999999'}
          </p>
        </div>

        {/* Address */}
        <div className={`bg-[#1f2937] rounded-xl p-6 ${isMobile ? 'w-full' : 'w-72'} ${isMobile ? 'text-center' : 'text-left'} shadow-md border border-gray-700`}>
          <div className={`flex items-center mb-4 text-purple-400 ${isMobile ? 'text-xl justify-center' : 'text-2xl'}`}>
            <PiMapPinFill />
          </div>
          <h3 className={`font-semibold ${isMobile ? 'text-base' : 'text-lg'} mb-1`}>
            {content?.addressTitle || siteData?.contact?.addressTitle || 'Хаяг'}
          </h3>
          <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-300`}>
            {content?.address || siteData?.contact?.address || 'Улаанбаатар хот'}
          </p>
        </div>
      </div>

      {/* Social */}
      <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-300 mb-4`}>
        {content?.socialTitle || siteData?.contact?.socialTitle || 'Биднийг дагаарай'}
      </p>
      <div className={`flex justify-center gap-4 ${isMobile ? 'text-xl' : 'text-2xl'}`}>
        <a href={content?.facebook || siteData?.contact?.facebook || '#'} className="bg-blue-600 p-3 rounded-full text-white hover:bg-blue-700 transition">
          <FaFacebook />
        </a>
        <a href={content?.instagram || siteData?.contact?.instagram || '#'} className="bg-pink-500 p-3 rounded-full text-white hover:bg-pink-600 transition">
          <BsInstagram />
        </a>
      </div>
    </div>
  );
};

// Add horizontal padding configuration
const getHorizontalPaddingClasses = (section) => {
  const padding = section.horizontalPadding || 'default';
  switch (padding) {
    case 'none':
      return 'px-0';
    case 'small':
      return 'px-4';
    case 'medium':
      return 'px-8';
    case 'large':
      return 'px-16';
    case 'default':
    default:
      return 'px-8';
  }
};

const FeaturesSection = ({ content, settings, style, isMobile, viewMode }) => {
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

  const getCardSizeClass = (size) => {
    switch (size) {
      case 'small': return isMobile ? 'h-[140px]' : 'h-[220px]';
      case 'large': return isMobile ? 'h-[220px]' : 'h-[400px]';
      case 'medium':
      default: return isMobile ? 'h-[180px]' : 'h-[300px]';
    }
  };

  return (
    <div className={`${isMobile ? 'p-2' : 'p-6'}`}>
      <h3 className={`${isMobile ? 'text-base' : 'text-xl'} font-bold mb-2 text-center`} style={{ fontFamily: style?.headerFont || 'Inter, Arial, sans-serif' }}>
        {content.title}
      </h3>
      {content.description && (
        <p className={`${isMobile ? 'text-xs' : 'text-center text-gray-500 dark:text-gray-400 mb-4'} text-center text-gray-500 dark:text-gray-400 mb-4`} style={{ fontFamily: style?.bodyFont || 'Arial, sans-serif' }}>
          {content.description}
        </p>
      )}
      <div className={`grid ${viewMode === 'mobile' ? 'grid-cols-1 gap-2' : 'md:grid-cols-2 gap-8'}`}>
        {content.cards.map(card => (
          <div 
            key={card.id}
            className={`border rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-lg flex flex-col ${getCardSizeClass(card.cardSize || settings?.cardSize)} ${isMobile ? 'p-2' : ''}`}
            style={{ borderColor: style?.primaryColor || '#3B82F6' }}
          >
            <div className="relative w-full h-32 md:h-48">
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
                    className={`${getPriceSizeClass(card.priceSize || settings?.priceSize)} font-bold rounded-full px-4 md:px-6 py-1 md:py-2 shadow-md`}
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
            <div className="p-2 md:p-4 flex-1">
              <h4 
                className={`${isMobile ? 'text-sm' : 'text-base'} font-bold mb-2`}
                style={{ fontFamily: style?.headerFont || 'Inter, Arial, sans-serif' }}
              >
                {card.title}
              </h4>
              <p 
                className={`${isMobile ? 'text-xs' : 'text-gray-600 dark:text-gray-400'}`}
                style={{ fontFamily: style?.bodyFont || 'Arial, sans-serif' }}
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

export default function Preview({ previewMarginActive = false }) {
  const siteData = usePreviewStore((state) => state.siteData);
  const { header, style, media, contact, template } = siteData;
  
  const [viewMode, setViewMode] = useState('desktop');
  const [currentSection, setCurrentSection] = useState('hero');
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const isMobile = viewMode === 'mobile';
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [viewMode]);
  
  // Handle scroll for parallax and effects
  useEffect(() => {
    const handleScroll = (e) => {
      setScrollY(e.target.scrollTop);
    };
    
    return () => {};
  }, []);

  const renderSection = (section) => {
    switch (section.type) {
      case 'hero':
        return <HeroSection content={section.content} layout={section.content.layout} style={style} isMobile={isMobile} />;
      case 'banner':
        return <BannerSection content={section.content} layout={section.layout} style={style} isMobile={isMobile} />;
      case 'cards':
        return <CardsSection content={section.content} layout={section.layout} style={style} settings={section.settings} isMobile={isMobile} viewMode={viewMode} />;
      case 'history':
        return <HistorySection content={section.content} style={style} isMobile={isMobile} viewMode={viewMode} />;
      case 'features':
        return <FeaturesSection content={section.content} settings={section.settings} style={style} isMobile={isMobile} viewMode={viewMode} />;
      case 'footer':
        // Modern contact/footer layout
        const c = section.content;
        // Layout-based rendering
        if (section.layout === 'phone') {
          return (
            <footer className="w-full bg-gray-900 py-10 px-4 rounded-xl shadow-lg mt-8">
              <div className="max-w-2xl mx-auto flex flex-col items-center gap-2">
                <div className="flex items-center gap-3 text-white text-lg font-semibold">
                  <span className="inline-block bg-green-600 p-2 rounded-full"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg></span>
                  {c.phone || '+976 99999999'}
                </div>
              </div>
            </footer>
          );
        }
        if (section.layout === 'social') {
          return (
            <footer className="w-full bg-gray-900 py-10 px-4 rounded-xl shadow-lg mt-8">
              <div className="max-w-2xl mx-auto flex flex-col items-center gap-2">
                <div className="text-white text-lg font-semibold mb-2">Биднийг дагаарай</div>
                <div className="flex gap-4">
                  {c.facebook && (
                    <a href={c.facebook} className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full" target="_blank" rel="noopener noreferrer">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.632.771-1.632 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z"/></svg>
                    </a>
                  )}
                  {c.instagram && (
                    <a href={c.instagram} className="bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full" target="_blank" rel="noopener noreferrer">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4" fill="#fff"/></svg>
                    </a>
                  )}
                </div>
              </div>
            </footer>
          );
        }
        if (section.layout === 'location') {
          return (
            <footer className="w-full bg-gray-900 py-10 px-4 rounded-xl shadow-lg mt-8">
              <div className="max-w-2xl mx-auto flex flex-col items-center gap-2">
                <div className="flex items-center gap-3 text-white text-lg font-semibold">
                  <span className="inline-block bg-red-600 p-2 rounded-full"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 10c-4.418 0-8-4.03-8-9 0-4.418 3.582-8 8-8s8 3.582 8 8c0 4.97-3.582 9-8 9z" /></svg></span>
                  {c.address || 'Улаанбаатар хот'}
                </div>
              </div>
            </footer>
          );
        }
        // Default/old layouts
        return (
          <footer className="w-full bg-gray-900 py-10 px-4 rounded-xl shadow-lg mt-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center text-indigo-400 mb-2">{c.title || 'Холбоо барих'}</h2>
              {c.description && <p className="text-center text-gray-300 mb-8">{c.description}</p>}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* И-мэйл */}
                {c.email && (
                  <div className="flex flex-col items-center bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="bg-indigo-500 p-3 rounded-full mb-3">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12l-4-4-4 4m8 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6" />
                      </svg>
                    </div>
                    <div className="text-lg font-semibold text-white mb-1">И-мэйл</div>
                    <div className="text-gray-400 text-sm">{c.email}</div>
                  </div>
                )}
                {/* Утас */}
                {c.phone && (
                  <div className="flex flex-col items-center bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="bg-green-500 p-3 rounded-full mb-3">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="text-lg font-semibold text-white mb-1">Утас</div>
                    <div className="text-gray-400 text-sm">{c.phone}</div>
                  </div>
                )}
                {/* Байршил */}
                {c.address && (
                  <div className="flex flex-col items-center bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="bg-red-500 p-3 rounded-full mb-3">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 10c-4.418 0-8-4.03-8-9 0-4.418 3.582-8 8-8s8 3.582 8 8c0 4.97-3.582 9-8 9z" />
                      </svg>
                    </div>
                    <div className="text-lg font-semibold text-white mb-1">Байршил</div>
                    <div className="text-gray-400 text-sm">{c.address}</div>
                  </div>
                )}
              </div>
              {(c?.facebook || c?.instagram) && (
                <div className="flex justify-center gap-4 mt-4">
                  {c?.facebook && (
                    <a href={c.facebook} className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full" target="_blank" rel="noopener noreferrer">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.632.771-1.632 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z"/></svg>
                    </a>
                  )}
                  {c?.instagram && (
                    <a href={c.instagram} className="bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-full" target="_blank" rel="noopener noreferrer">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4" fill="#fff"/></svg>
                    </a>
                  )}
                </div>
              )}
            </div>
          </footer>
        );
      case 'contact':
        return (
          <ContactSection
            siteData={siteData}
            content={section.content}
            isMobile={isMobile}
          />
        );
      default:
        return null;
    }
  };

  const containerClasses = isMobile 
    ? "w-[375px] h-[812px] mx-auto rounded-[2.5rem] border-8 border-gray-800 bg-gray-800 overflow-hidden shadow-2xl phone-frame" 
    : "w-full h-[1000px] rounded-lg border bg-card overflow-y-auto shadow-lg";

  if (isLoading) {
    return (
      <div className="space-y-4">
        <ViewportToggle viewMode={viewMode} setViewMode={setViewMode} />
        <div className="flex justify-center">
          <div className={containerClasses}>
            <div className="bg-gray-100 dark:bg-gray-800 h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-lg mx-auto mb-4 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32 mx-auto animate-pulse"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20 mx-auto animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-3/4">
      {/* Viewport Toggle */}
      <ViewportToggle viewMode={viewMode} setViewMode={setViewMode} />
      
      {/* Main Layout */}
      <div className="flex justify-center">
        {/* Preview Container */}
        <div className={containerClasses}>
          <div className="bg-white dark:bg-gray-800 h-full flex flex-col">
            {/* Enhanced Navigation Header */}
            <NavigationHeader 
              style={style} 
              media={media} 
              currentSection={currentSection}
              setCurrentSection={setCurrentSection}
              sections={template.sections}
              isMobile={isMobile}
              hasMargin={template.sections.find(s => s.type === 'hero')?.settings?.hasMargin}
              previewMarginActive={previewMarginActive}
            />

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
              {template.sections.map(section => (
                (section.type === 'contact' || (section.type === 'hero' && section.content?.layout === 'image-background')) ? (
                  <div key={section.id} className="border-b last:border-b-0 animate-fadeInUp">
                    {renderSection(section)}
                  </div>
                ) : (
                  <div
                    key={section.id}
                    className={`border-b last:border-b-0 animate-fadeInUp ${getHorizontalPaddingClasses(section)}`}
                    style={previewMarginActive && !isMobile ? { marginLeft: '8%', marginRight: '8%' } : undefined}
                  >
                    {renderSection(section)}
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
