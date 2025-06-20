'use client';

import { useState, useEffect } from 'react';
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
      <h1 className="text-2xl font-semibold mb-6">Холбоо Барих</h1>

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
