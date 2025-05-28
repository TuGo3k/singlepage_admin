'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Preview from "@/components/Preview";
import { usePreviewStore } from '@/store/previewStore';

export default function MediaPage() {
  const updateMedia = usePreviewStore((state) => state.updateMedia);
  const mediaData = usePreviewStore((state) => state.siteData.media);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [mediaFiles, setMediaFiles] = useState([
    {
      id: 1,
      name: 'Нүүр хуудасны зураг',
      size: '1.2 MB',
      type: 'image/jpeg',
      uploadDate: '2024-03-15',
      url: '/placeholder.jpg',
      location: 'heroImage'
    },
    {
      id: 2,
      name: 'Лого',
      size: '256 KB',
      type: 'image/png',
      uploadDate: '2024-03-03',
      url: '/logo.png',
      location: 'logo'
    },
  ]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      
      const newFile = {
        id: Date.now(),
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        type: file.type,
        uploadDate: new Date().toISOString().split('T')[0],
        url: fileUrl,
        location: 'heroImage' // По умолчанию новые изображения идут в hero секцию
      };

      setMediaFiles(prev => [...prev, newFile]);
      setSelectedFile(newFile);
      
      // Update preview store
      updateMedia({
        ...mediaData,
        [newFile.location]: fileUrl
      });
    }
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    const fileToDelete = mediaFiles.find(file => file.id === id);
    if (fileToDelete) {
      // Remove from preview if it was being used
      if (mediaData[fileToDelete.location] === fileToDelete.url) {
        updateMedia({
          ...mediaData,
          [fileToDelete.location]: ''
        });
      }
    }
    setMediaFiles(prev => prev.filter(file => file.id !== id));
    if (selectedFile?.id === id) {
      setSelectedFile(null);
    }
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    // Update preview when selecting a file
    updateMedia({
      ...mediaData,
      [file.location]: file.url
    });
  };

  const handleLocationChange = (file, newLocation) => {
    // Update the file's location
    const updatedFiles = mediaFiles.map(f => {
      if (f.id === file.id) {
        return { ...f, location: newLocation };
      }
      return f;
    });
    setMediaFiles(updatedFiles);

    // Update preview store
    updateMedia({
      ...mediaData,
      [newLocation]: file.url
    });
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold mb-6">Зураг & Медиа</h1>

      <div className="grid grid-cols-2 gap-6">
        {/* Preview Section - Left Side */}
        <Preview />

        {/* Settings Section - Right Side */}
        <div className="space-y-6">
          <div className="rounded-lg border bg-card">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h2 className="font-medium">Зургийн сан</h2>
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button 
                    variant="default"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Зураг Нэмэх
                  </Button>
                </div>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Зураг</TableHead>
                  <TableHead>Нэр</TableHead>
                  <TableHead>Байршил</TableHead>
                  <TableHead className="text-right">Үйлдэл</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mediaFiles.map((file) => (
                  <TableRow 
                    key={file.id}
                    className={`cursor-pointer hover:bg-muted/50 ${selectedFile?.id === file.id ? 'bg-muted/50' : ''}`}
                    onClick={() => handleFileSelect(file)}
                  >
                    <TableCell>
                      <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                        <img
                          src={file.url}
                          alt={file.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    </TableCell>
                    <TableCell>{file.name}</TableCell>
                    <TableCell>
                      <select
                        value={file.location}
                        onChange={(e) => handleLocationChange(file, e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                      >
                        <option value="logo">Лого</option>
                        <option value="heroImage">Нүүр зураг</option>
                      </select>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={(e) => handleDelete(file.id, e)}
                      >
                        Устгах
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
} 