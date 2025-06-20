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
          image: '/banner-bg.jpg'
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
      },
      {
        id: 'section4',
        type: 'features',
        layout: 'price-basic',
        content: {
          title: 'Үнэ тариф',
          description: 'Манай үйлчилгээний тарифын сонголтууд',
          cards: [
            {
              id: 'price1',
              title: 'Basic',
              description: 'Энгийн багцын үйлчилгээ',
              price: '29,000₮',
              image: '/price-basic.jpg'
            },
            {
              id: 'price2',
              title: 'Standard',
              description: 'Стандарт багцын үйлчилгээ',
              price: '49,000₮',
              image: '/price-standard.jpg'
            },
            {
              id: 'price3',
              title: 'Premium',
              description: 'Премиум багцын үйлчилгээ',
              price: '99,000₮',
              image: '/price-premium.jpg'
            }
          ]
        }
      },
      {
        id: 'section5',
        type: 'history',
        layout: 'timeline',
        content: {
          title: 'Бидний түүх',
          subtitle: 'Амжилтын замнал',
          subtype: 'timeline',
          items: [
            {
              id: 'timeline1',
              title: 'Компани үүсэл',
              year: '2020',
              description: 'Манай компани анх үүсэж эхэлсэн он',
              image: '/placeholder.jpg'
            },
            {
              id: 'timeline2',
              title: 'Эхний бүтээгдэхүүн',
              year: '2021',
              description: 'Анхны бүтээгдэхүүн амжилттай гарч ирсэн',
              image: '/placeholder.jpg'
            },
            {
              id: 'timeline3',
              title: 'Хөгжлийн он',
              year: '2022',
              description: 'Компани хурдацтай хөгжиж эхэлсэн',
              image: '/placeholder.jpg'
            }
          ]
        }
      },
      {
        id: 'section6',
        type: 'contact',
        layout: 'default',
        content: {
          title: 'Бидэнтэй холбогдох',
          description: 'Танай асуулт, санал хүсэлтийг бидэнд илгээнэ үү',
          email: 'info@example.com',
          phone: '+976 99999999',
          address: 'Улаанбаатар хот',
          facebook: 'https://facebook.com/',
          instagram: 'https://instagram.com/'
        }
      }
    ]
  }
};

export default initialData; 
