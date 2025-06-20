'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Preview from "@/components/Preview";
import { usePreviewStore } from '@/store/previewStore';

export default function HeaderPage() {
  const updateHeader = usePreviewStore((state) => state.updateHeader);
  const updateSection = usePreviewStore((state) => state.updateSection);
  const deleteSection = usePreviewStore((state) => state.deleteSection);
  const addSection = usePreviewStore((state) => state.addSection);
  const siteData = usePreviewStore((state) => state.siteData);
  const headerData = siteData.header;
  const [localData, setLocalData] = useState(headerData);
  const [editing, setEditing] = useState({}); // {sectionId, field, cardId}
  const [editValue, setEditValue] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [editCategoryValue, setEditCategoryValue] = useState("");

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

  // Засах товч дарсан үед
  const handleEdit = (sectionId, field, value, cardId) => {
    setEditing({ sectionId, field, cardId });
    setEditValue(value);
  };

  // Хадгалах
  const handleSave = (section, field, cardId) => {
    if (cardId) {
      // Картын текст засах
      const newCards = section.content.cards.map(card =>
        card.id === cardId ? { ...card, [field]: editValue } : card
      );
      updateSection(section.id, {
        content: { ...section.content, cards: newCards }
      });
    } else {
      // Энгийн текст засах
      updateSection(section.id, {
        content: { ...section.content, [field]: editValue }
      });
    }
    setEditing({});
    setEditValue("");
  };

  // Устгах
  const handleDelete = (section, field, cardId) => {
    if (cardId) {
      // Карт устгах
      const newCards = section.content.cards.filter(card => card.id !== cardId);
      updateSection(section.id, {
        content: { ...section.content, cards: newCards }
      });
    } else {
      // Энгийн текст устгах
      const newContent = { ...section.content };
      delete newContent[field];
      updateSection(section.id, { content: newContent });
    }
  };

  // Карт нэмэх
  const handleAddCard = (section) => {
    const newCard = {
      id: `card${Date.now()}`,
      title: 'Шинэ карт',
      description: '',
      image: '/placeholder.jpg'
    };
    updateSection(section.id, {
      content: {
        ...section.content,
        cards: [...(section.content.cards || []), newCard]
      }
    });
  };

  // Текст нэмэх (гарчиг, тайлбар, товч)
  const handleAddField = (section, field) => {
    updateSection(section.id, {
      content: {
        ...section.content,
        [field]: field === 'buttonText' ? 'Шинэ товч' : 'Шинэ текст'
      }
    });
  };

  // Ангилал нэмэх
  const handleAddCategory = (section) => {
    if (!newCategory.trim()) return;
    const categories = section.content.categories || [];
    updateSection(section.id, {
      content: {
        ...section.content,
        categories: [...categories, { id: Date.now(), name: newCategory.trim() }]
      }
    });
    setNewCategory("");
  };

  // Ангилал устгах
  const handleDeleteCategory = (section, categoryId) => {
    const categories = (section.content.categories || []).filter(cat => cat.id !== categoryId);
    updateSection(section.id, {
      content: {
        ...section.content,
        categories
      }
    });
  };

  // Ангилал засах
  const handleEditCategory = (section, categoryId) => {
    setEditingCategory(categoryId);
    const cat = (section.content.categories || []).find(cat => cat.id === categoryId);
    setEditCategoryValue(cat?.name || "");
  };

  const handleSaveCategory = (section, categoryId) => {
    const categories = (section.content.categories || []).map(cat =>
      cat.id === categoryId ? { ...cat, name: editCategoryValue } : cat
    );
    updateSection(section.id, {
      content: {
        ...section.content,
        categories
      }
    });
    setEditingCategory(null);
    setEditCategoryValue("");
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold mb-6">Гарчиг & Текст</h1>

      <div className="grid grid-cols-2 gap-6">
        {/* Preview Section - Left Side */}
        <Preview />

        {/* Settings Section - Right Side */}
        <div className="space-y-6">
          {/* Минималист preview текстүүдийн блок */}
          <div className="space-y-2">
            {siteData.template.sections.map(section => (
              <div key={section.id} className="bg-transparent border border-gray-700/30 rounded-lg p-3">
                {section.type === 'hero' ? (
                  <>
                    {/* Загвар (layout) + Ангилал нэгтгэсэн блок */}
                    <div className="mb-2">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-base font-medium text-blue-500 lowercase">Үндсэн хэсэг</span>
                        {/* Layout сонголтууд */}
                        <button
                          className={`text-xs px-2 py-0.5 rounded border ${section.layout === 'image-right' ? 'bg-blue-500 text-white' : 'border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20'}`}
                          onClick={() => updateSection(section.id, { layout: 'image-right' })}
                        >→ Зураг баруун</button>
                        <button
                          className={`text-xs px-2 py-0.5 rounded border ${section.layout === 'image-left' ? 'bg-blue-500 text-white' : 'border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20'}`}
                          onClick={() => updateSection(section.id, { layout: 'image-left' })}
                        >← Зураг зүүн</button>
                        <button
                          className={`text-xs px-2 py-0.5 rounded border ${section.layout === 'image-background' ? 'bg-blue-500 text-white' : 'border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20'}`}
                          onClick={() => updateSection(section.id, { layout: 'image-background' })}
                        >▣ Зураг арын</button>
                      </div>
                      {/* Ангилал хэсэг */}
                      <div className="flex gap-2 mb-2">
                        <input
                          value={newCategory}
                          onChange={e => setNewCategory(e.target.value)}
                          placeholder="Ангиллын нэр..."
                          className="w-40 px-2 py-1 text-sm bg-transparent border-b border-gray-400 focus:border-blue-400 outline-none"
                          onKeyDown={e => e.key === 'Enter' && handleAddCategory(section)}
                        />
                        <button
                          className="text-xs text-blue-500 px-2 py-0.5 rounded border border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                          onClick={() => handleAddCategory(section)}
                        >Нэмэх</button>
                      </div>
                      <ul className="space-y-1">
                        {(section.content.categories || []).length === 0 && (
                          <li className="text-xs text-gray-500 italic">Ангилал байхгүй байна</li>
                        )}
                        {(section.content.categories || []).map(cat => (
                          <li key={cat.id} className="flex items-center gap-2 text-xs group">
                            {editingCategory === cat.id ? (
                              <>
                                <input
                                  value={editCategoryValue}
                                  onChange={e => setEditCategoryValue(e.target.value)}
                                  className="w-32 bg-transparent border-b border-gray-400 focus:border-blue-400 outline-none"
                                  autoFocus
                                />
                                <button className="text-green-500 text-xs" onClick={() => handleSaveCategory(section, cat.id)}>OK</button>
                                <button className="text-gray-400 text-xs" onClick={() => setEditingCategory(null)}>✕</button>
                              </>
                            ) : (
                              <>
                                <span className="text-gray-200">{cat.name}</span>
                                <button className="p-0.5 text-gray-400 hover:text-blue-500" onClick={() => handleEditCategory(section, cat.id)}>✎</button>
                                <button className="p-0.5 text-gray-400 hover:text-red-500" onClick={() => handleDeleteCategory(section, cat.id)}>×</button>
                              </>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-base font-medium text-blue-500 lowercase">{section.type}</span>
                    <button
                      className="text-xs text-blue-500 px-2 py-0.5 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition"
                      onClick={() => handleAddField(section, 'title')}
                    >+ Текст</button>
                  </div>
                )}
                <div className="space-y-1">
                  {['title', 'subtitle', 'description', 'buttonText'].map(field => (
                    <div key={field} className="flex items-center gap-1 text-sm">
                      <span className="w-20 text-gray-400">{field === 'title' ? 'Гарчиг' : field === 'subtitle' ? 'Дэд' : field === 'description' ? 'Тайлбар' : 'Товч'}:</span>
                      {editing.sectionId === section.id && editing.field === field ? (
                        <input
                          value={editValue}
                          onChange={e => setEditValue(e.target.value)}
                          className="w-32 bg-transparent border-b border-gray-400 focus:border-blue-400 outline-none text-sm"
                          autoFocus
                        />
                      ) : (
                        <span className="text-gray-200">{section.content?.[field]}</span>
                      )}
                      {section.content?.[field] && editing.sectionId !== section.id && (
                        <>
                          <button
                            className="p-0.5 text-gray-400 hover:text-blue-500"
                            title="Засах"
                            onClick={() => handleEdit(section.id, field, section.content[field])}
                          >✎</button>
                          <button
                            className="p-0.5 text-gray-400 hover:text-red-500"
                            title="Устгах"
                            onClick={() => handleDelete(section, field)}
                          >×</button>
                        </>
                      )}
                      {editing.sectionId === section.id && editing.field === field && (
                        <button
                          className="ml-1 text-xs text-green-500"
                          onClick={() => handleSave(section, field)}
                        >OK</button>
                      )}
                    </div>
                  ))}
                </div>
                {/* Картууд */}
                {section.content?.cards && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-400">Картууд:</span>
                      <button
                        className="text-xs text-blue-500 px-2 py-0.5 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition"
                        onClick={() => handleAddCard(section)}
                      >+ Карт</button>
                    </div>
                    <ul className="space-y-1">
                      {section.content.cards.map(card => (
                        <li key={card.id} className="flex items-center gap-2 text-xs">
                          <span className="w-16 text-gray-400">Гарчиг:</span>
                          {editing.sectionId === section.id && editing.cardId === card.id && editing.field === 'title' ? (
                            <input value={editValue} onChange={e => setEditValue(e.target.value)}
                              className="w-20 bg-transparent border-b border-gray-400 focus:border-blue-400 outline-none"
                              autoFocus />
                          ) : (
                            <span className="text-gray-200">{card.title}</span>
                          )}
                          {editing.sectionId === section.id && editing.cardId === card.id && editing.field === 'title' ? (
                            <button className="ml-1 text-xs text-green-500"
                              onClick={() => handleSave(section, 'title', card.id)}>OK</button>
                          ) : (
                            <>
                              <button className="p-0.5 text-gray-400 hover:text-blue-500"
                                title="Засах"
                                onClick={() => handleEdit(section.id, 'title', card.title, card.id)}>✎</button>
                              <button className="p-0.5 text-gray-400 hover:text-red-500"
                                title="Устгах"
                                onClick={() => handleDelete(section, 'title', card.id)}>×</button>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
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
