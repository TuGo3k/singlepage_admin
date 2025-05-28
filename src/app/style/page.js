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
  const [localData, setLocalData] = useState(styleData);

  const handleChange = (field, value) => {
    const newData = {
      ...localData,
      [field]: value
    };
    setLocalData(newData);
    updateStyle(newData);
  };

  // Sync with store when styleData changes
  useEffect(() => {
    setLocalData(styleData);
  }, [styleData]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold mb-6">Загвар & Өнгө</h1>

      <div className="grid grid-cols-2 gap-6">
        {/* Preview Section - Left Side */}
        <Preview />

        {/* Settings Section - Right Side */}
        <div className="space-y-6">
          <div className="rounded-lg border bg-card p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Үндсэн өнгө</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={localData.primaryColor}
                      onChange={(e) => handleChange('primaryColor', e.target.value)}
                      className="w-12 h-9 p-1"
                    />
                    <Input
                      value={localData.primaryColor}
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
                      value={localData.secondaryColor}
                      onChange={(e) => handleChange('secondaryColor', e.target.value)}
                      className="w-12 h-9 p-1"
                    />
                    <Input
                      value={localData.secondaryColor}
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
                    value={localData.backgroundColor}
                    onChange={(e) => handleChange('backgroundColor', e.target.value)}
                    className="w-12 h-9 p-1"
                  />
                  <Input
                    value={localData.backgroundColor}
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
                    value={localData.headerFont}
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
                    value={localData.bodyFont}
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
                  value={localData.borderRadius}
                  onChange={(e) => handleChange('borderRadius', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button>Хадгалах</Button>
          </div>
        </div>
      </div>
    </div>
  );
} 