'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Preview from "@/components/Preview";
import { usePreviewStore } from '@/store/previewStore';

export default function HeaderPage() {
  const updateHeader = usePreviewStore((state) => state.updateHeader);
  const headerData = usePreviewStore((state) => state.siteData.header);
  const [localData, setLocalData] = useState(headerData);

  const handleChange = (field, value) => {
    const newData = {
      ...localData,
      [field]: value
    };
    setLocalData(newData);
    updateHeader(newData);
  };

  // Sync with store when headerData changes
  useEffect(() => {
    setLocalData(headerData);
  }, [headerData]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold mb-6">Гарчиг & Текст</h1>

      <div className="grid grid-cols-2 gap-6">
        {/* Preview Section - Left Side */}
        <Preview />

        {/* Settings Section - Right Side */}
        <div className="space-y-6">
          <div className="rounded-lg border bg-card p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Үндсэн гарчиг</Label>
                <Input
                  id="title"
                  value={localData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Вэбсайтын нэр..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subtitle">Дэд гарчиг</Label>
                <Input
                  id="subtitle"
                  value={localData.subtitle}
                  onChange={(e) => handleChange('subtitle', e.target.value)}
                  placeholder="Дэд гарчиг..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Тайлбар</Label>
                <textarea
                  id="description"
                  value={localData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Тайлбар текст..."
                  className="w-full min-h-[100px] rounded-md border bg-background px-3 py-2 text-sm"
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