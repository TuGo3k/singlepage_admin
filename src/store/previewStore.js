import { create } from 'zustand';

const initialData = {
  header: {
    title: 'Миний Вэбсайт',
    subtitle: 'Тавтай морил',
    description: 'Энэ бол миний вэбсайтын тайлбар текст.',
  },
  style: {
    primaryColor: '#3B82F6',
    secondaryColor: '#6B7280',
    backgroundColor: '#FFFFFF',
    headerFont: 'Inter',
    bodyFont: 'Arial',
    borderRadius: '8',
  },
  media: {
    logo: '/logo.png',
    heroImage: '/placeholder.jpg',
    sections: [],
  },
  contact: {
    email: 'info@example.com',
    phone: '+976 99999999',
    address: 'Улаанбаатар хот',
    facebook: 'https://facebook.com/',
    instagram: 'https://instagram.com/'
  },
  template: {
    id: 'template1',
    layout: 'simple',
    sections: [
      {
        id: 'section1',
        type: 'hero',
        layout: 'image-right',
        content: {
          title: 'Гарчиг',
          description: 'Тайлбар текст',
          image: '/placeholder.jpg',
          buttonText: 'Дэлгэрэнгүй',
          buttonLink: '#'
        }
      },
      {
        id: 'section2',
        type: 'banner',
        layout: 'full-width',
        content: {
          title: 'Баннер',
          subtitle: 'Дэд гарчиг',
          background: '/banner-bg.jpg'
        }
      },
      {
        id: 'section3',
        type: 'cards',
        layout: 'grid-3',
        settings: {
          cardsToShow: 3,
          autoplay: true,
          interval: 5000
        },
        content: {
          title: 'Үйлчилгээнүүд',
          cards: [
            {
              id: 'card1',
              title: 'Үйлчилгээ 1',
              description: 'Тайлбар',
              image: '/service1.jpg'
            },
            {
              id: 'card2',
              title: 'Үйлчилгээ 2',
              description: 'Тайлбар',
              image: '/service2.jpg'
            }
          ]
        }
      }
    ]
  }
};

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
})); 