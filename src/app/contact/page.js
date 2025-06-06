'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Preview from "@/components/Preview";
import { usePreviewStore } from '@/store/previewStore';

export default function ContactPage() {
  const updateContact = usePreviewStore((state) => state.updateContact);
  const contactData = usePreviewStore((state) => state.siteData.contact);
  const [localData, setLocalData] = useState(contactData || {});

  const handleChange = (field, value) => {
    const newData = {
      ...localData,
      [field]: value
    };
    setLocalData(newData);
    updateContact(newData);
  };

  // Sync with store when contactData changes
  useEffect(() => {
    setLocalData(contactData);
  }, [contactData]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold mb-6">Холбоо Барих</h1>

      <div className="grid grid-cols-2 gap-6">
        {/* Preview Section - Left Side */}
        <Preview />

        {/* Settings Section - Right Side */}
        <div className="space-y-6">
          <div className="rounded-lg border bg-card p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Имэйл хаяг</Label>
                <Input
                  id="email"
                  type="email"
                  value={localData?.email || ''}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="info@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Утасны дугаар</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={localData?.phone || ''}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+976 99999999"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Хаяг</Label>
                <Input
                  id="address"
                  value={localData?.address || ''}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="Улаанбаатар хот"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook хаяг</Label>
                <Input
                  id="facebook"
                  type="url"
                  value={localData?.facebook || ''}
                  onChange={(e) => handleChange('facebook', e.target.value)}
                  placeholder="https://facebook.com/"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram хаяг</Label>
                <Input
                  id="instagram"
                  type="url"
                  value={localData?.instagram || ''}
                  onChange={(e) => handleChange('instagram', e.target.value)}
                  placeholder="https://instagram.com/"
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