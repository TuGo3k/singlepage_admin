import { usePreviewStore } from '@/store/previewStore';
import { useState, useRef, useEffect } from 'react';
import { sectionTypes } from '@/app/templates/page';
import { FaFacebook, FaPhone } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { PiMapPinFill } from 'react-icons/pi';
import { BsInstagram } from 'react-icons/bs';
import ViewportToggle from './ViewportToggle';

// Import section components
import { HeroSectionPreview as HeroSection } from './sections/HeroSection';
import { BannerSectionPreview as BannerSection } from './sections/BannerSection';
import { CardsSectionPreview as CardsSection } from './sections/CardsSection';
import { HistorySectionPreview as HistorySection } from './sections/HistorySection';
import { FeaturesSectionPreview as FeaturesSection } from './sections/FeaturesSection';
import { ContactSectionPreview as ContactSection } from './sections/ContactSection';
import FooterSection from './sections/FooterSection';

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
        return <FooterSection section={section} />;
      case 'contact':
        return <ContactSection siteData={siteData} content={section.content} isMobile={isMobile} />;
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
