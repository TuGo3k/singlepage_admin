import { create } from 'zustand';
import initialData from '@/data/initialData';

export const usePreviewStore = create((set) => ({
  siteData: initialData,
  updateHeader: (headerData) => 
    set((state) => ({
      siteData: {
        ...state.siteData,
        header: headerData
      }
    })),
  updateStyle: (styleData) =>
    set((state) => ({
      siteData: {
        ...state.siteData,
        style: styleData
      }
    })),
  updateMedia: (mediaData) =>
    set((state) => ({
      siteData: {
        ...state.siteData,
        media: mediaData
      }
    })),
  updateContact: (contactData) =>
    set((state) => ({
      siteData: {
        ...state.siteData,
        contact: contactData
      }
    })),
  updateTemplate: (templateData) =>
    set((state) => ({
      siteData: {
        ...state.siteData,
        template: templateData
      }
    })),
  addSection: (sectionData) =>
    set((state) => ({
      siteData: {
        ...state.siteData,
        template: {
          ...state.siteData.template,
          sections: [...state.siteData.template.sections, sectionData]
        }
      }
    })),
  updateSection: (sectionId, sectionData) =>
    set((state) => ({
      siteData: {
        ...state.siteData,
        template: {
          ...state.siteData.template,
          sections: state.siteData.template.sections.map(section =>
            section.id === sectionId ? { ...section, ...sectionData } : section
          )
        }
      }
    })),
  deleteSection: (sectionId) =>
    set((state) => ({
      siteData: {
        ...state.siteData,
        template: {
          ...state.siteData.template,
          sections: state.siteData.template.sections.filter(section => section.id !== sectionId)
        }
      }
    })),
  reorderSections: (newOrder) =>
    set((state) => ({
      siteData: {
        ...state.siteData,
        template: {
          ...state.siteData.template,
          sections: newOrder
        }
      }
    })),
  setSiteData: (data) => set({ siteData: data }),
})); 