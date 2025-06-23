'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Preview from "@/components/Preview";
import { usePreviewStore } from '@/store/previewStore';

export default function ContactPage() {
  const updateSection = usePreviewStore((state) => state.updateSection);
  const templateSections = usePreviewStore((state) => state.siteData.template.sections);
  const contactData = usePreviewStore((state) => state.siteData.contact);
  // Find the contact section
  const contactSection = templateSections.find(section => section.type === 'contact');
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    address: '',
    facebook: '',
    instagram: ''
  });
  const [selectedDesign, setSelectedDesign] = useState('Дизайн 1');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (contactSection && contactSection.content) {
      setFormData({
        email: contactSection.content.email || '',
        phone: contactSection.content.phone || '',
        address: contactSection.content.address || '',
        facebook: contactSection.content.facebook || '',
        instagram: contactSection.content.instagram || ''
      });
    }
  }, [contactSection]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    if (contactSection) {
      updateSection(contactSection.id, {
        content: {
          ...contactSection.content,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          facebook: formData.facebook,
          instagram: formData.instagram
        }
      });
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold mb-2">Холбоо Барих</h1>
      {/* Dropdown button for design selection */}
      <div className="mb-4 relative w-48" ref={dropdownRef}>
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
                onClick={() => { setSelectedDesign(option); setDropdownOpen(false); }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
      {/* End dropdown */}
      <div className="flex gap-6">
        {/* Preview Section - Left Side */}
        <Preview />

        {/* Settings Section - Right Side */}
        <div className="space-y-6 w-1/3">
          <div className="rounded-lg border bg-card p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">И-мэйл</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="И-мэйл"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Утас</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Утас"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Хаяг</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Хаяг"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave}>Хадгалах</Button>
          </div>
        </div>
      </div>
    </div>
  );
} 
