'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Preview from "@/components/Preview";
import { usePreviewStore } from '@/store/previewStore';

export default function StylePage() {
  const updateStyle = usePreviewStore((state) => state.updateStyle);
  const styleData = usePreviewStore((state) => state.siteData.style);
  const [localData, setLocalData] = useState(styleData || {});
  const [styleMode, setStyleMode] = useState('all'); // 'all' or 'individual'
  const [perSectionData, setPerSectionData] = useState({}); // { hero: {...}, banner: {...}, features: {...} }
  const [openSection, setOpenSection] = useState(null);

  const sectionList = [
    { key: 'hero', label: 'Үндсэн хэсэг' },
    { key: 'banner', label: 'Баннер' },
    { key: 'features', label: 'Үнэ тариф' },
    // ... add more if needed ...
  ];

  const handleChange = (field, value) => {
    const newData = {
      ...localData,
      [field]: value
    };
    setLocalData(newData);
    updateStyle(newData);
  };

  const handlePerSectionChange = (section, key, value) => {
    setPerSectionData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  // Sync with store when styleData changes
  useEffect(() => {
    setLocalData(styleData);
  }, [styleData]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold mb-6">Загвар & Өнгө</h1>

      <div className="flex gap-6">
        {/* Preview Section - Left Side */}
        <Preview />

        {/* Settings Section - Right Side */}
        <div className="space-y-6 w-1/3">
          <div className='w-full flex items-center gap-4 mb-4 '>
            <h2>Загвар</h2>
            <div className="flex gap-2 ml-auto">
              <button
                className={`px-4 py-2 rounded ${styleMode === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                onClick={() => setStyleMode('all')}
                type="button"
              >
                Бүгд
              </button>
              <button
                className={`px-4 py-2 rounded ${styleMode === 'individual' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                onClick={() => setStyleMode('individual')}
                type="button"
              >
                Нэг бүрчлэн
              </button>
            </div>

            <div className="px-4 py-2 rounded bg-green-600 text-white text-sm hover:bg-green-700 ">
                          <button>Хадгалах</button>
                        </div>

          </div>

          {styleMode === 'all' && (
            <div className="rounded-lg border bg-card p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Үндсэн өнгө</Label>
                    <div className="flex gap-2">
                      <Input
                        id="primaryColor"
                        type="color"
                        value={localData?.primaryColor || '#3B82F6'}
                        onChange={(e) => handleChange('primaryColor', e.target.value)}
                        className="w-12 h-9 p-1"
                      />
                      <Input
                        value={localData?.primaryColor || '#3B82F6'}
                        onChange={(e) => handleChange('primaryColor', e.target.value)}
                        placeholder="#000000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Туслах өнгө</Label>
                    <div className="flex gap-2">
                      <Input
                        id="secondaryColor"
                        type="color"
                        value={localData?.secondaryColor || '#6B7280'}
                        onChange={(e) => handleChange('secondaryColor', e.target.value)}
                        className="w-12 h-9 p-1"
                      />
                      <Input
                        value={localData?.secondaryColor || '#6B7280'}
                        onChange={(e) => handleChange('secondaryColor', e.target.value)}
                        placeholder="#000000"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="backgroundColor">Арын өнгө</Label>
                  <div className="flex gap-2">
                    <Input
                      id="backgroundColor"
                      type="color"
                      value={localData?.backgroundColor || '#FFFFFF'}
                      onChange={(e) => handleChange('backgroundColor', e.target.value)}
                      className="w-12 h-9 p-1"
                    />
                    <Input
                      value={localData?.backgroundColor || '#FFFFFF'}
                      onChange={(e) => handleChange('backgroundColor', e.target.value)}
                      placeholder="#000000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="headerFont">Гарчгийн фонт</Label>
                    <select
                      id="headerFont"
                      value={localData?.headerFont || 'Inter'}
                      onChange={(e) => handleChange('headerFont', e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="Inter">Inter</option>
                      <option value="Arial">Arial</option>
                      <option value="Roboto">Roboto</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bodyFont">Текстийн фонт</Label>
                    <select
                      id="bodyFont"
                      value={localData?.bodyFont || 'Arial'}
                      onChange={(e) => handleChange('bodyFont', e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="Arial">Arial</option>
                      <option value="Inter">Inter</option>
                      <option value="Roboto">Roboto</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="borderRadius">Булангийн радиус (px)</Label>
                  <Input
                    id="borderRadius"
                    type="number"
                    min="0"
                    max="20"
                    value={localData?.borderRadius || '8'}
                    onChange={(e) => handleChange('borderRadius', e.target.value)}
                  />
                </div>

                {/* Text Colors Section */}
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-sm font-medium">Текстийн өнгө</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="headingColor">Гарчгийн өнгө</Label>
                    <div className="flex gap-2">
                      <Input
                        id="headingColor"
                        type="color"
                        value={localData?.headingColor || '#1F2937'}
                        onChange={(e) => handleChange('headingColor', e.target.value)}
                        className="w-12 h-9 p-1"
                      />
                      <Input
                        value={localData?.headingColor || '#1F2937'}
                        onChange={(e) => handleChange('headingColor', e.target.value)}
                        placeholder="#000000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bodyTextColor">Текстийн өнгө</Label>
                    <div className="flex gap-2">
                      <Input
                        id="bodyTextColor"
                        type="color"
                        value={localData?.bodyTextColor || '#4B5563'}
                        onChange={(e) => handleChange('bodyTextColor', e.target.value)}
                        className="w-12 h-9 p-1"
                      />
                      <Input
                        value={localData?.bodyTextColor || '#4B5563'}
                        onChange={(e) => handleChange('bodyTextColor', e.target.value)}
                        placeholder="#000000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="linkColor">Холбоосын өнгө</Label>
                    <div className="flex gap-2">
                      <Input
                        id="linkColor"
                        type="color"
                        value={localData?.linkColor || '#2563EB'}
                        onChange={(e) => handleChange('linkColor', e.target.value)}
                        className="w-12 h-9 p-1"
                      />
                      <Input
                        value={localData?.linkColor || '#2563EB'}
                        onChange={(e) => handleChange('linkColor', e.target.value)}
                        placeholder="#000000"
                      />
                    </div>
                  </div>
                </div>

                {/* Text Sizes Section */}
             
              </div>

          <div className="flex justify-end mt-4">
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => {
                if (perSectionData.features) {
                  updateStyle({
                    ...styleData,
                    ...perSectionData.features,
                  });
                }
              }}
            >
              Хадгалах
            </Button>
          </div>








            </div>
          )}

          {styleMode === 'individual' && (
            <div className="space-y-2">
              {sectionList.map(section => (
                <div key={section.key} className="rounded-lg border bg-card mb-2">
                  <button
                    className={`w-full flex justify-between items-center px-4 py-3 font-semibold text-left bg-gray-100 dark:bg-gray-800`}
                    onClick={() => setOpenSection(openSection === section.key ? null : section.key)}
                    type="button"
                  >
                    {section.label}
                    <span>{openSection === section.key ? '▲' : '▼'}</span>
                  </button>
                  <div
                    className={`transition-all duration-300 overflow-hidden ${openSection === section.key ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    {openSection === section.key && (
                      <div className="p-4 border-t">
                        <div className="space-y-2">
                          <Label htmlFor={`primaryColor-${section.key}`}>Үндсэн өнгө</Label>
                          <div className="flex gap-2">
                            <Input
                              id={`primaryColor-${section.key}`}
                              type="color"
                              value={perSectionData[section.key]?.primaryColor || '#3B82F6'}
                              onChange={(e) => handlePerSectionChange(section.key, 'primaryColor', e.target.value)}
                              className="w-12 h-9 p-1"
                            />
                            <Input
                              value={perSectionData[section.key]?.primaryColor || '#3B82F6'}
                              onChange={(e) => handlePerSectionChange(section.key, 'primaryColor', e.target.value)}
                              placeholder="#000000"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`secondaryColor-${section.key}`}>Туслах өнгө</Label>
                          <div className="flex gap-2">
                            <Input
                              id={`secondaryColor-${section.key}`}
                              type="color"
                              value={perSectionData[section.key]?.secondaryColor || '#6B7280'}
                              onChange={(e) => handlePerSectionChange(section.key, 'secondaryColor', e.target.value)}
                              className="w-12 h-9 p-1"
                            />
                            <Input
                              value={perSectionData[section.key]?.secondaryColor || '#6B7280'}
                              onChange={(e) => handlePerSectionChange(section.key, 'secondaryColor', e.target.value)}
                              placeholder="#000000"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`backgroundColor-${section.key}`}>Арын өнгө</Label>
                          <div className="flex gap-2">
                            <Input
                              id={`backgroundColor-${section.key}`}
                              type="color"
                              value={perSectionData[section.key]?.backgroundColor || '#FFFFFF'}
                              onChange={(e) => handlePerSectionChange(section.key, 'backgroundColor', e.target.value)}
                              className="w-12 h-9 p-1"
                            />
                            <Input
                              value={perSectionData[section.key]?.backgroundColor || '#FFFFFF'}
                              onChange={(e) => handlePerSectionChange(section.key, 'backgroundColor', e.target.value)}
                              placeholder="#000000"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`headerFont-${section.key}`}>Гарчгийн фонт</Label>
                          <select
                            id={`headerFont-${section.key}`}
                            value={perSectionData[section.key]?.headerFont || 'Inter'}
                            onChange={(e) => handlePerSectionChange(section.key, 'headerFont', e.target.value)}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          >
                            <option value="Inter">Inter</option>
                            <option value="Arial">Arial</option>
                            <option value="Roboto">Roboto</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`bodyFont-${section.key}`}>Текстийн фонт</Label>
                          <select
                            id={`bodyFont-${section.key}`}
                            value={perSectionData[section.key]?.bodyFont || 'Arial'}
                            onChange={(e) => handlePerSectionChange(section.key, 'bodyFont', e.target.value)}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          >
                            <option value="Arial">Arial</option>
                            <option value="Inter">Inter</option>
                            <option value="Roboto">Roboto</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`borderRadius-${section.key}`}>Булангийн радиус (px)</Label>
                          <Input
                            id={`borderRadius-${section.key}`}
                            type="number"
                            min="0"
                            max="20"
                            value={perSectionData[section.key]?.borderRadius || '8'}
                            onChange={(e) => handlePerSectionChange(section.key, 'borderRadius', e.target.value)}
                          />
                        </div>
                        <div className="space-y-4 pt-4 border-t">
                          <h3 className="text-sm font-medium">Текстийн өнгө</h3>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`headingColor-${section.key}`}>Гарчгийн өнгө</Label>
                            <div className="flex gap-2">
                              <Input
                                id={`headingColor-${section.key}`}
                                type="color"
                                value={perSectionData[section.key]?.headingColor || '#1F2937'}
                                onChange={(e) => handlePerSectionChange(section.key, 'headingColor', e.target.value)}
                                className="w-12 h-9 p-1"
                              />
                              <Input
                                value={perSectionData[section.key]?.headingColor || '#1F2937'}
                                onChange={(e) => handlePerSectionChange(section.key, 'headingColor', e.target.value)}
                                placeholder="#000000"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`bodyTextColor-${section.key}`}>Текстийн өнгө</Label>
                            <div className="flex gap-2">
                              <Input
                                id={`bodyTextColor-${section.key}`}
                                type="color"
                                value={perSectionData[section.key]?.bodyTextColor || '#4B5563'}
                                onChange={(e) => handlePerSectionChange(section.key, 'bodyTextColor', e.target.value)}
                                className="w-12 h-9 p-1"
                              />
                              <Input
                                value={perSectionData[section.key]?.bodyTextColor || '#4B5563'}
                                onChange={(e) => handlePerSectionChange(section.key, 'bodyTextColor', e.target.value)}
                                placeholder="#000000"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`linkColor-${section.key}`}>Холбоосын өнгө</Label>
                            <div className="flex gap-2">
                              <Input
                                id={`linkColor-${section.key}`}
                                type="color"
                                value={perSectionData[section.key]?.linkColor || '#2563EB'}
                                onChange={(e) => handlePerSectionChange(section.key, 'linkColor', e.target.value)}
                                className="w-12 h-9 p-1"
                              />
                              <Input
                                value={perSectionData[section.key]?.linkColor || '#2563EB'}
                                onChange={(e) => handlePerSectionChange(section.key, 'linkColor', e.target.value)}
                                placeholder="#000000"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`priceBadgeTextColor-${section.key}`}>Үнийн badge-ийн текстийн өнгө</Label>
                          <div className="flex gap-2">
                            <Input
                              id={`priceBadgeTextColor-${section.key}`}
                              type="color"
                              value={perSectionData[section.key]?.priceBadgeTextColor || '#2563EB'}
                              onChange={(e) => handlePerSectionChange(section.key, 'priceBadgeTextColor', e.target.value)}
                              className="w-12 h-9 p-1"
                            />
                            <Input
                              value={perSectionData[section.key]?.priceBadgeTextColor || '#2563EB'}
                              onChange={(e) => handlePerSectionChange(section.key, 'priceBadgeTextColor', e.target.value)}
                              placeholder="#000000"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`priceBadgeBgColor-${section.key}`}>Үнийн badge-ийн background өнгө</Label>
                          <div className="flex gap-2">
                            <Input
                              id={`priceBadgeBgColor-${section.key}`}
                              type="color"
                              value={perSectionData[section.key]?.priceBadgeBgColor || '#E5E7EB'}
                              onChange={(e) => handlePerSectionChange(section.key, 'priceBadgeBgColor', e.target.value)}
                              className="w-12 h-9 p-1"
                            />
                            <Input
                              value={perSectionData[section.key]?.priceBadgeBgColor || '#E5E7EB'}
                              onChange={(e) => handlePerSectionChange(section.key, 'priceBadgeBgColor', e.target.value)}
                              placeholder="#000000"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`priceBadgeBlur-${section.key}`}>Үнийн badge blur (px)</Label>
                          <Input
                            id={`priceBadgeBlur-${section.key}`}
                            type="number"
                            min="0"
                            max="10"
                            value={perSectionData[section.key]?.priceBadgeBlur || 0}
                            onChange={(e) => handlePerSectionChange(section.key, 'priceBadgeBlur', e.target.value)}
                          />
                        </div>
                        <div className="flex justify-end mt-4">
                          <Button
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => {
                              if (perSectionData.features) {
                                updateStyle({
                                  ...styleData,
                                  ...perSectionData.features,
                                });
                              }
                            }}
                          >
                            Хадгалах
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
} 