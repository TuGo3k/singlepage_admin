import { useState, useRef, useEffect } from 'react';
import { FaFacebook, FaPhone } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { PiMapPinFill } from 'react-icons/pi';
import { BsInstagram } from 'react-icons/bs';

// Preview version of ContactSection
export const ContactSectionPreview = ({ siteData, content, isMobile }) => {
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
        <a href={content?.facebook || siteData?.contact?.facebook || '#'} className="bg-blue-600 p-3 rounded-full text-white transition-colors">
          <FaFacebook />
        </a>
        <a href={content?.instagram || siteData?.contact?.instagram || '#'} className="bg-pink-500 p-3 rounded-full text-white transition-colors">
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