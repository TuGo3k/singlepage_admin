import { usePreviewStore } from '@/store/previewStore';
import { useState, useRef, useEffect } from 'react';
import { sectionTypes } from '@/app/templates/page';
import { FaFacebook, FaPhone } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { PiMapPinFill } from 'react-icons/pi';
import { BsInstagram } from 'react-icons/bs';
import ViewportToggle from './ViewportToggle';
import ThemeSelector from './ThemeSelector';
import { getThemeById } from '@/data/themePresets';

// Import section components
import { HeroSectionPreview as HeroSection } from './sections/HeroSection';
import { BannerSectionPreview as BannerSection } from './sections/BannerSection';
import { CardsSectionPreview as CardsSection } from './sections/CardsSection';
import { HistorySectionPreview as HistorySection } from './sections/HistorySection';
import { FeaturesSectionPreview as FeaturesSection } from './sections/FeaturesSection';
import { ContactSectionPreview as ContactSection } from './sections/ContactSection';
import FooterSection from './sections/FooterSection';

// Enhanced navigation header with scroll effects
const NavigationHeader = ({ style, media, currentSection, setCurrentSection, sections, isMobile, hasMargin, previewMarginActive, theme }) => {
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
      className={`sticky top-0 z-40 transition-all duration-300 backdrop-blur-md shadow-lg`}
      style={{ 
        background: theme?.colors?.contactBg || (isScrolled ? 'rgba(255,255,255,0.95)' : 'white'),
        color: theme?.colors?.text || 'inherit',
        borderBottomColor: isScrolled ? style?.primaryColor + '20' : 'transparent',
        borderBottomWidth: '1px',
        marginTop: hasMargin ? '40px' : undefined,
        marginBottom: hasMargin ? '40px' : undefined
      }}
    >
      <div className={`${isMobile ? 'px-3' : 'px-10'} py-2`}>
        <div className="flex items-center justify-between"
              style={previewMarginActive && !isMobile ? { marginLeft: '8%', marginRight: '8%' } : undefined}
        >
          {/* Logo upload + preview */}
          <div className="flex items-center gap-2">
            <div className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} border rounded-lg flex items-center justify-center cursor-pointer relative group`} onClick={() => logoInputRef.current.click()}>
              <img 
                src={media.logo} 
                alt="Logo" 
                className={`${isMobile ? 'w-6 h-6' : 'w-10 h-10'} object-contain rounded-lg`}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <svg 
                className={`${isMobile ? 'w-5 h-5' : 'w-8 h-8'} text-white absolute inset-0 m-auto opacity-0 group-hover:opacity-80 transition-opacity pointer-events-none`} 
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
            <nav className="flex items-center gap-6">
              {navigationItems.map((item) => (
                <div key={item.id} className="relative group">
                  <button
                    onClick={() => setCurrentSection(item.id)}
                    className={`relative px-2 py-1 text-xs font-medium transition-all duration-200 hover:scale-105`}
                    style={{
                      color: currentSection === item.id 
                        ? (theme?.colors?.primary || '#3B82F6')
                        : (theme?.colors?.text || '#374151')
                    }}
                  >
                    {item.label}
                    {currentSection === item.id && (
                      <div 
                        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                        style={{ background: theme?.colors?.primary || '#3B82F6' }}
                      />
                    )}
                  </button>
                  {/* Дэд ангилалууд dropdown */}
                  {item.subCategories && item.subCategories.length > 0 && (
                    <div
                      className="absolute left-0 top-full min-w-[150px] border rounded-lg shadow-lg z-20 hidden group-hover:block mt-1"
                      style={{
                        background: theme?.colors?.cardBg || '#fff',
                        color: theme?.colors?.text || '#1F2937',
                        borderColor: theme?.colors?.accent || '#E5E7EB'
                      }}
                    >
                      <ul className="py-2">
                        {item.subCategories.map(sub => (
                          <li key={sub.id}>
                            <button
                              onClick={() => setCurrentSection(`subcat-${sub.id}`)}
                              className="block w-full text-left px-4 py-2 text-xs hover:scale-105 transition-all duration-200"
                              style={{
                                background: currentSection === `subcat-${sub.id}` 
                                  ? `${theme?.colors?.primary}20` || 'rgba(59, 130, 246, 0.1)'
                                  : 'transparent',
                                color: currentSection === `subcat-${sub.id}`
                                  ? (theme?.colors?.primary || '#3B82F6')
                                  : (theme?.colors?.text || '#1F2937')
                              }}
                            >
                              • {sub.name}
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
              className="p-1.5 rounded-lg transition-colors"
              style={{
                color: theme?.colors?.text || '#374151'
              }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          )}
        </div>

        {/* Mobile Navigation Menu */}
        {isMobile && (
          <>
            {/* Overlay */}
            {mobileMenuOpen && (
              <div 
                className="fixed inset-0 z-40 transition-opacity duration-300"
                style={{ 
                  backgroundColor: theme?.colors?.text ? `${theme.colors.text}80` : 'rgba(0, 0, 0, 0.5)'
                }}
                onClick={() => setMobileMenuOpen(false)}
              />
            )}
            {/* Sidebar */}
            <div className={`fixed top-0 right-0 h-full w-64 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
              mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{ 
              backgroundColor: theme?.colors?.cardBg || '#FFFFFF',
              color: theme?.colors?.text || '#1F2937'
            }}>
              <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-white">
                <h3 className="text-lg font-semibold" style={{ color: theme?.colors?.text || '#374151' }}>
                  Цэс
                </h3>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg transition-colors"
                  style={{ color: theme?.colors?.text || '#374151' }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav className="flex flex-col p-4"
                   style={{ 
                     backgroundColor: theme?.colors?.cardBg || '#FFFFFF'
                   }}>
                {navigationItems.map((item) => (
                  <div key={item.id} className="mb-2">
                    <button
                      onClick={() => {
                        setCurrentSection(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`text-left px-3 py-3 rounded-lg transition-all duration-200 text-sm w-full hover:scale-105`}
                      style={{
                        backgroundColor: currentSection === item.id
                          ? `${theme?.colors?.primary}20` || 'rgba(59, 130, 246, 0.1)'
                          : 'transparent',
                        color: currentSection === item.id
                          ? (theme?.colors?.primary || '#3B82F6')
                          : (theme?.colors?.text || '#374151')
                      }}
                    >
                      {item.label}
                    </button>
                    {/* Дэд ангилалууд */}
                    {item.subCategories && item.subCategories.length > 0 && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.subCategories.map((subItem) => (
                          <button
                            key={subItem.id}
                            onClick={() => {
                              setCurrentSection(`subcat-${subItem.id}`);
                              setMobileMenuOpen(false);
                            }}
                            className={`text-left px-3 py-2 rounded-lg transition-all duration-200 text-xs w-full hover:scale-105`}
                            style={{
                              backgroundColor: currentSection === `subcat-${subItem.id}`
                                ? `${theme?.colors?.primary}15` || 'rgba(59, 130, 246, 0.08)'
                                : 'transparent',
                              color: currentSection === `subcat-${subItem.id}`
                                ? (theme?.colors?.primary || '#3B82F6')
                                : (theme?.colors?.text || '#374151')
                            }}
                          >
                            • {subItem.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </>
        )}
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

export default function Preview({ previewMarginActive = false }) {
  const siteData = usePreviewStore((state) => state.siteData);
  const { header, style, media, contact, template } = siteData;
  
  const [viewMode, setViewMode] = useState('desktop');
  const [currentSection, setCurrentSection] = useState('hero');
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTheme, setCurrentTheme] = useState('theme-1');
  
  const isMobile = viewMode === 'mobile';
  
  // Get current theme data
  const themeData = getThemeById(currentTheme);

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

  // Handle theme change
  const handleThemeChange = (themeId) => {
    setCurrentTheme(themeId);
    // Update the store's themeId so navbar gets the correct theme
    if (style) {
      const updatedStyle = { ...style, themeId };
      // Update the store with new theme
      usePreviewStore.getState().updateStyle(updatedStyle);
    }
  };

  const renderSection = (section) => {
    switch (section.type) {
      case 'hero':
        return <HeroSection content={section.content} layout={section.content.layout} style={style} isMobile={isMobile} theme={currentTheme} />;
      case 'banner':
        return <BannerSection content={section.content} layout={section.layout} style={style} isMobile={isMobile} theme={currentTheme} />;
      case 'cards':
        return <CardsSection content={section.content} layout={section.layout} style={style} settings={section.settings} isMobile={isMobile} viewMode={viewMode} theme={currentTheme} />;
      case 'history':
        return <HistorySection content={section.content} style={style} isMobile={isMobile} viewMode={viewMode} theme={currentTheme} />;
      case 'features':
        return <FeaturesSection content={section.content} settings={section.settings} style={style} isMobile={isMobile} viewMode={viewMode} theme={currentTheme} />;
      case 'footer':
        return <FooterSection section={section} theme={currentTheme} />;
      case 'contact':
        return <ContactSection siteData={siteData} content={section.content} isMobile={isMobile} settings={section.settings} theme={currentTheme} />;
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
      {/* Theme Selector */}
      <div className="flex justify-between items-center">
        <ViewportToggle viewMode={viewMode} setViewMode={setViewMode} />
        <ThemeSelector
          currentTheme={currentTheme}
          onThemeChange={handleThemeChange}
        />
      </div>
      
      {/* Main Layout */}
      <div className="flex justify-center">
        {/* Preview Container */}
        <div className={containerClasses}>
          <div 
            className="h-full flex flex-col"
            style={{ backgroundColor: themeData.colors.background }}
          >
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
              theme={themeData}
            />

            {/* Main Content */}
            <div 
              className="flex-1 overflow-y-auto scrollbar-thin"
              style={{ 
                backgroundColor: themeData.colors.background,
                backgroundImage: themeData.colors.background2 ? `linear-gradient(to bottom, ${themeData.colors.background}, ${themeData.colors.background2})` : undefined,
                scrollbarColor: `${themeData.colors.accent} ${themeData.colors.background}`,
                scrollbarWidth: 'thin'
              }}
            >
              {template.sections.map(section => (
                (section.type === 'contact' || (section.type === 'hero' && section.content?.layout === 'image-background')) ? (
                  <div key={section.id} className=" animate-fadeInUp">
                    {renderSection(section)}
                  </div>
                ) : (
                  <div
                    key={section.id}
                    className={` animate-fadeInUp ${getHorizontalPaddingClasses(section)}`}
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
