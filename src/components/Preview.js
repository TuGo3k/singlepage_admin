import { usePreviewStore } from '@/store/previewStore';
import { useState, useRef, useEffect } from 'react';

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
const NavigationHeader = ({ style, media, currentSection, setCurrentSection, sections, isMobile }) => {
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
        borderBottomColor: isScrolled ? style.primaryColor + '20' : 'transparent',
        borderBottomWidth: '1px'
      }}
    >
      <div className={`${isMobile ? 'px-4' : 'px-6'} py-3`}>
        <div className="flex items-center justify-between">
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
                    <div className="absolute left-0 top-full mt-2 min-w-[120px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20 hidden group-hover:block">
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
    return (
      <div 
        ref={sectionRef}
        className={`relative ${isMobile ? 'h-[500px]' : 'h-[600px]'} w-full bg-cover bg-center bg-fixed overflow-hidden`}
        style={{ backgroundImage: `url(${content.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        <div className={`absolute inset-0 flex items-center ${isMobile ? 'px-4' : 'px-8'}`}>
          <div className={`max-w-2xl text-white transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <h1 className={`${isMobile ? 'text-3xl' : 'text-5xl'} font-bold mb-6 leading-tight`} style={{ fontFamily: style.headerFont }}>
              {content.title}
            </h1>
            <p className={`${isMobile ? 'text-lg' : 'text-xl'} mb-8 text-gray-100`} style={{ fontFamily: style.bodyFont }}>
              {content.description}
            </p>
            {content.buttonText && (
              <div className="flex flex-wrap gap-4">
                <button 
                  className={`${isMobile ? 'px-6 py-3' : 'px-8 py-4'} bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
                >
                  {content.buttonText}
                </button>
                <button 
                  className={`${isMobile ? 'px-6 py-3' : 'px-8 py-4'} border-2 border-white text-white hover:bg-white hover:text-gray-900 rounded-lg font-medium transition-all duration-200`}
                >
                  Дэлгэрэнгүй
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Floating elements for visual interest */}
        <div className="absolute bottom-8 right-8 animate-bounce">
          <svg className="w-8 h-8 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-8 p-8 ${
      isMobile ? 'flex-col text-center' : isImageRight ? 'flex-row' : 'flex-row-reverse'
    }`}>
      <div className={`${isMobile ? 'w-full' : 'flex-1'} space-y-4`}>
        <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold`} style={{ fontFamily: style.headerFont }}>
          {content.title}
        </h2>
        <p style={{ fontFamily: style.bodyFont, color: style.secondaryColor }}>
          {content.description}
        </p>
        {content.buttonText && (
          <button 
            className={`${isMobile ? 'px-6 py-3' : 'px-6 py-2'} rounded-md text-white btn-enhanced`}
            style={{ backgroundColor: style.primaryColor }}
          >
            {content.buttonText}
          </button>
        )}
      </div>
      <div className={`${isMobile ? 'w-full' : 'flex-1'}`}>
        <img 
          src={content.image} 
          alt={content.title}
          className={`w-full ${isMobile ? 'h-[250px]' : 'h-[300px]'} object-cover rounded-lg shadow-lg`}
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
      style={{ backgroundImage: `url(${content.image || content.background})` }}
    >
      <div className={`absolute inset-0 flex items-center justify-center text-center
        ${hasOverlay ? 'bg-black bg-opacity-50 text-white' : ''}`}
      >
        <div className={`${isMobile ? 'px-4' : 'px-8'}`}>
          <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-2`} style={{ fontFamily: style.headerFont }}>
            {content.title}
          </h3>
          {content.subtitle && (
            <p className={`${isMobile ? 'text-sm' : 'text-base'}`} style={{ fontFamily: style.bodyFont }}>
              {content.subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const CardsSection = ({ content, layout, style, settings, isMobile }) => {
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
      <div className={`${isMobile ? 'px-4 py-6' : 'px-6 py-8'}`} ref={containerRef}>
        <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-6 text-center`} style={{ fontFamily: style.headerFont }}>
          {content.title}
        </h3>
        <div 
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto pb-4 cursor-grab select-none scrollbar-hide"
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
                width: isMobile ? '280px' : `${getCardWidth()}px`,
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
                <div 
                  className={`absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 ${
                    activeCardId === card.id ? 'opacity-0' : 'opacity-100'
                  }`}
                />
              </div>
              <div 
                className={`p-4 transition-all duration-300 ease-in-out ${
                  activeCardId === card.id ? 'h-auto' : isMobile ? 'h-[4rem] overflow-hidden' : 'h-[4.5rem] overflow-hidden'
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

  // Responsive grid classes
  const getGridClass = () => {
    if (isMobile) return 'grid-cols-1';
    if (layout === 'grid-4') return 'grid-cols-2 lg:grid-cols-4';
    return 'grid-cols-2 lg:grid-cols-3';
  };

  return (
    <div className={`${isMobile ? 'p-4' : 'p-8'}`}>
      <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-6 text-center`} style={{ fontFamily: style.headerFont }}>
        {content.title}
      </h3>
      <div className={`grid ${getGridClass()} gap-6`}>
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
                className={`w-full ${isMobile ? 'h-[180px]' : 'h-[200px]'} object-cover`}
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

const HistorySection = ({ content, style, isMobile }) => {
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
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
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
                <h4 className="text-xl font-bold mb-2" style={{ fontFamily: style.headerFont }}>
                  {item.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400" style={{ fontFamily: style.bodyFont }}>
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {content.items.map(item => (
        <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-48">
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
              {item.year}
            </div>
          </div>
          <div className="p-6">
            <h4 className="text-xl font-bold mb-2" style={{ fontFamily: style.headerFont }}>
              {item.title}
            </h4>
            <p className="text-gray-600 dark:text-gray-400" style={{ fontFamily: style.bodyFont }}>
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
              <div className="absolute -top-4 -left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg text-lg font-bold">
                {item.year}
              </div>
            </div>
          </div>
          <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
            <h4 className="text-2xl font-bold mb-4" style={{ fontFamily: style.headerFont }}>
              {item.title}
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-lg" style={{ fontFamily: style.bodyFont }}>
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {content.items.map(item => (
        <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="relative">
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
              {item.year}
            </div>
          </div>
          <div className="p-6">
            <h4 className="text-xl font-bold mb-2" style={{ fontFamily: style.headerFont }}>
              {item.title}
            </h4>
            <p className="text-gray-600 dark:text-gray-400" style={{ fontFamily: style.bodyFont }}>
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  // New: Render for text subtype
  const renderText = () => {
    let align = 'text-left';
    if (selectedLayout === 'text-center') align = 'text-center';
    if (selectedLayout === 'text-right') align = 'text-right';
    return (
      <div className={`max-w-2xl mx-auto ${align}`}>
        {content.items.map(item => (
          <div key={item.id} className="mb-8">
            <h4 className="text-xl font-bold mb-2" style={{ fontFamily: style.headerFont }}>{item.title}</h4>
            <p className="text-gray-600 dark:text-gray-400" style={{ fontFamily: style.bodyFont }}>{item.description}</p>
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
      <div className="text-center mb-6">
        <h3 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold mb-2`} style={{ fontFamily: style.headerFont }}>
          {content.title}
        </h3>
        {content.subtitle && (
          <p className={`${isMobile ? 'text-base' : 'text-lg'} text-gray-600 dark:text-gray-400`} style={{ fontFamily: style.bodyFont }}>
            {content.subtitle}
          </p>
        )}
      </div>
      {renderContent()}
    </div>
  );
};

export default function Preview() {
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
        return <HeroSection content={section.content} layout={section.layout} style={style} isMobile={isMobile} />;
      case 'banner':
        return <BannerSection content={section.content} layout={section.layout} style={style} isMobile={isMobile} />;
      case 'cards':
        return <CardsSection content={section.content} layout={section.layout} style={style} settings={section.settings} isMobile={isMobile} />;
      case 'history':
        return <HistorySection content={section.content} style={style} isMobile={isMobile} />;
      default:
        return null;
    }
  };

  const containerClasses = isMobile 
    ? "w-[375px] h-[812px] mx-auto rounded-[2.5rem] border-8 border-gray-800 bg-gray-800 overflow-hidden shadow-2xl phone-frame" 
    : "w-full h-[600px] rounded-lg border bg-card overflow-hidden shadow-lg";

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
    <div className="space-y-4">
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
            />

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
              {template.sections.map(section => (
                <div key={section.id} className="border-b last:border-b-0 animate-fadeInUp">
                  {renderSection(section)}
                </div>
              ))}

              {/* Enhanced Contact Section */}
              <div className="border-t bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 animate-fadeInUp">
                <div className={`${isMobile ? 'p-6' : 'p-12'} max-w-4xl mx-auto`}>
                  <div className="text-center mb-8">
                    <h3 
                      className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}
                      style={{ fontFamily: style.headerFont }}
                    >
                      Бидэнтэй холбогдох
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                      Танай асуулт, санал хүсэлтийг бидэнд илгээнэ үү. Бид танд хурдан хариулах болно.
                    </p>
                  </div>
                  
                  <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-6 mb-8`}>
                    {contact.email && (
                      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                          <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">И-мэйл</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{contact.email}</p>
                      </div>
                    )}
                    
                    {contact.phone && (
                      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                          <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Утас</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{contact.phone}</p>
                      </div>
                    )}
                    
                    {contact.address && (
                      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                          <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Хаяг</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{contact.address}</p>
                      </div>
                    )}
                  </div>

                  {/* Social Media Links */}
                  {(contact.facebook || contact.instagram) && (
                    <div className="text-center">
                      <p className="text-gray-600 dark:text-gray-400 mb-4">Биднийг дагаарай</p>
                      <div className="flex justify-center gap-4">
                        {contact.facebook && (
                          <a 
                            href={contact.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center transition-colors btn-enhanced"
                          >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.367-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                          </a>
                        )}
                        {contact.instagram && (
                          <a 
                            href={contact.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg flex items-center justify-center transition-colors btn-enhanced"
                          >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM18.68 11.987c0 3.678-2.983 6.661-6.661 6.661-3.678 0-6.661-2.983-6.661-6.661 0-3.678 2.983-6.661 6.661-6.661 3.678 0 6.661 2.983 6.661 6.661z"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}