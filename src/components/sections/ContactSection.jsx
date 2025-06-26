import { useState, useRef, useEffect } from 'react';
import { FaFacebook, FaPhone } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { PiMapPinFill } from 'react-icons/pi';
import { BsInstagram } from 'react-icons/bs';
import ModelSelector from '../ModelSelector';
import { getThemeById } from '@/data/themePresets';

// Preview version of ContactSection
export const ContactSectionPreview = ({ siteData, content, isMobile, settings, theme = 'theme-1' }) => {
  // Get theme styles
  const themeData = getThemeById(theme);

  return (
    <div 
      className={themeData.contact.className}
      style={{
        background: themeData.colors?.contactBg || '#1F2937'
      }}
    >
      <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-indigo-400 mb-2`}>
        {content?.title || 'Бидэнтэй холбогдох'}
      </h2>
      <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-300 mb-8`}>
        {content?.description || 'Танай асуулт, санал хүсэлтийг бидэнд илгээнэ үү. Бид танд хурдан хариулах болно.'}
      </p>

      <div className={`flex flex-col ${isMobile ? 'gap-4' : 'md:flex-row gap-6'} justify-center items-center mb-10`}>
        {/* Email */}
        <div className={`${themeData.contact.cardClass} ${isMobile ? 'w-full' : 'w-72'} ${isMobile ? 'text-center' : 'text-left'}`}>
          <div className={`${themeData.contact.iconClass} text-blue-400 ${isMobile ? 'justify-center' : ''}`}>
            <MdEmail />
          </div>
          <h3 className={`${themeData.contact.titleClass}`}>
            {content?.emailTitle || siteData?.contact?.emailTitle || 'И-мэйл'}
          </h3>
          <p className={`${themeData.contact.detailClass}`}>
            {content?.email || siteData?.contact?.email || 'info@example.com'}
          </p>
        </div>

        {/* Phone */}
        <div className={`${themeData.contact.cardClass} ${isMobile ? 'w-full' : 'w-72'} ${isMobile ? 'text-center' : 'text-left'}`}>
          <div className={`${themeData.contact.iconClass} text-green-400 ${isMobile ? 'justify-center' : ''}`}>
            <FaPhone />
          </div>
          <h3 className={`${themeData.contact.titleClass}`}>
            {content?.phoneTitle || siteData?.contact?.phoneTitle || 'Утас'}
          </h3>
          <p className={`${themeData.contact.detailClass}`}>
            {content?.phone || siteData?.contact?.phone || '+976 99999999'}
          </p>
        </div>

        {/* Address */}
        <div className={`${themeData.contact.cardClass} ${isMobile ? 'w-full' : 'w-72'} ${isMobile ? 'text-center' : 'text-left'}`}>
          <div className={`${themeData.contact.iconClass} text-purple-400 ${isMobile ? 'justify-center' : ''}`}>
            <PiMapPinFill />
          </div>
          <h3 className={`${themeData.contact.titleClass}`}>
            {content?.addressTitle || siteData?.contact?.addressTitle || 'Хаяг'}
          </h3>
          <p className={`${themeData.contact.detailClass}`}>
            {content?.address || siteData?.contact?.address || 'Улаанбаатар хот'}
          </p>
        </div>
      </div>

      {/* Social */}
      <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-300 mb-4`}>
        {content?.socialTitle || siteData?.contact?.socialTitle || 'Биднийг дагаарай'}
      </p>
      <div className={`flex justify-center gap-4 ${isMobile ? 'text-xl' : 'text-2xl'}`}>
        <a href={content?.facebook || siteData?.contact?.facebook || '#'} className={themeData.contact.socialClass}>
          <FaFacebook />
        </a>
        <a href={content?.instagram || siteData?.contact?.instagram || '#'} className={themeData.contact.socialClass}>
          <BsInstagram />
        </a>
      </div>
    </div>
  );
};

// Default export for admin panel (existing functionality)
export default function ContactSection({ section, onSaveSection }) {
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
      {/* Model Selector */}
      <ModelSelector
        sectionType="contact"
        currentModel={section.settings?.model || "model-1"}
        onModelChange={(modelId) => onSaveSection(section.id, { 
          settings: { ...section.settings, model: modelId } 
        })}
        className="mb-6"
      />

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
                  onSaveSection(section.id, { content: { ...section.content, footerDesign: option } });
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Гарчиг</label>
        <input
          type="text"
          value={section.content?.title || ''}
          onChange={(e) => onSaveSection(section.id, { content: { ...section.content, title: e.target.value } })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="Гарчиг"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Тайлбар</label>
        <textarea
          value={section.content?.description || ''}
          onChange={(e) => onSaveSection(section.id, { content: { ...section.content, description: e.target.value } })}
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
          onChange={(e) => onSaveSection(section.id, { content: { ...section.content, emailTitle: e.target.value } })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="И-мэйл гарчиг"
        />
      </div>
    
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Утасны гарчиг</label>
        <input
          type="text"
          value={section.content?.phoneTitle || ''}
          onChange={(e) => onSaveSection(section.id, { content: { ...section.content, phoneTitle: e.target.value } })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="Утасны гарчиг"
        />
      </div>
   
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Хаягны гарчиг</label>
        <input
          type="text"
          value={section.content?.addressTitle || ''}
          onChange={(e) => onSaveSection(section.id, { content: { ...section.content, addressTitle: e.target.value } })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="Хаягны гарчиг"
        />
      </div>
  
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Сошиал медиа гарчиг</label>
        <input
          type="text"
          value={section.content?.socialTitle || ''}
          onChange={(e) => onSaveSection(section.id, { content: { ...section.content, socialTitle: e.target.value } })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="Сошиал медиа гарчиг"
        />
      </div>
    </div>
  );
} 