const sectionTypes = {
  hero: {
    name: 'Үндсэн хэсэг',
    description: 'Баннер болон гол мессеж',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    layouts: [
      { id: 'image-right', name: 'Зураг баруун', icon: '⭢', preview: 'Текст зүүн, зураг баруун' },
      { id: 'image-left', name: 'Зураг зүүн', icon: '⭠', preview: 'Зураг зүүн, текст баруун' },
      { id: 'image-background', name: 'Зураг арын', icon: '▣', preview: 'Зураг дээр текст' },
    ]
  },
  banner: {
    name: 'Баннер',
    description: 'Өндөр анхаарал татах хэсэг',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
      </svg>
    ),
    layouts: [
      { id: 'full-width', name: 'Бүтэн', icon: '━', preview: 'Дэлгэцийн бүтэн өргөн' },
      { id: 'contained', name: 'Хязгаартай', icon: '│', preview: 'Контейнер дотор' },
      { id: 'with-overlay', name: 'Давхарласан', icon: '▦', preview: 'Зураг дээр давхарга' },
    ]
  },
  cards: {
    name: 'Картууд',
    description: 'Үйлчилгээ, бүтээгдэхүүн',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    layouts: [
      { id: 'grid-3', name: '3 багана', icon: '⋮⋮⋮', preview: '3 багананд хуваасан' },
      { id: 'grid-4', name: '4 багана', icon: '::::', preview: '4 багананд хуваасан' },
      { id: 'carousel', name: 'Гүйдэг', icon: '⇄', preview: 'Гүйдэг харуулалт' },
    ]
  },
  features: {
    name: 'Үнэ тариф',
    description: '3 төрлийн үнийн сонголт',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    layouts: [
      { id: 'price-basic', name: 'Basic', icon: '₮', preview: 'Basic тариф' },
      { id: 'price-standard', name: 'Standard', icon: '₮₮', preview: 'Standard тариф' },
      { id: 'price-premium', name: 'Premium', icon: '₮₮₮', preview: 'Premium тариф' },
    ],
    settings: {
      pricePosition: 'center', // 'top', 'center', 'bottom'
      priceSize: 'medium', // 'small', 'medium', 'large'
      priceAlignment: 'center', // 'left', 'center', 'right'
    }
  },
  history: {
    name: 'Түүх',
    description: 'Компаний түүх, хөгжлийн замнал',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    layouts: [
      {
        id: 'timeline',
        name: 'Цагийн хэлхээ',
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2" />
          </svg>
        ),
        preview: 'Цагийн дарааллаар'
      },
      {
        id: 'cards',
        name: 'Картууд',
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <rect x="3" y="7" width="7" height="10" rx="2" strokeWidth="2" />
            <rect x="14" y="7" width="7" height="10" rx="2" strokeWidth="2" />
          </svg>
        ),
        preview: 'Карт хэлбэрээр'
      },
      {
        id: 'story',
        name: 'Түүх',
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 19.5A2.5 2.5 0 016.5 17H20" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4.5A2.5 2.5 0 016.5 7H20" />
            <rect x="4" y="7" width="16" height="10" rx="2" strokeWidth="2" />
          </svg>
        ),
        preview: 'Түүх хэлбэрээр'
      },
      {
        id: 'grid',
        name: 'Торон',
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <rect x="3" y="3" width="7" height="7" rx="1" strokeWidth="2" />
            <rect x="14" y="3" width="7" height="7" rx="1" strokeWidth="2" />
            <rect x="3" y="14" width="7" height="7" rx="1" strokeWidth="2" />
            <rect x="14" y="14" width="7" height="7" rx="1" strokeWidth="2" />
          </svg>
        ),
        preview: 'Торон байрлал'
      },
    ]
  },
  footer: {
    name: 'Footer',
    description: 'Хуудасны доод хэсэг',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <rect x="3" y="17" width="18" height="4" rx="2" strokeWidth="2" />
        <rect x="3" y="3" width="18" height="4" rx="2" strokeWidth="2" />
      </svg>
    ),
    layouts: [
      { id: 'simple', name: 'Энгийн', icon: '━', preview: 'Энгийн footer' },
      { id: 'columns-2', name: '2 багана', icon: '||', preview: '2 баганатай' },
      { id: 'columns-3', name: '3 багана', icon: '|||', preview: '3 баганатай' },
      { id: 'newsletter', name: 'Бүртгүүлэх формтой', icon: '✉️', preview: 'Имэйл бүртгүүлэх' },
      { id: 'social', name: 'Social icon-уудтай', icon: '◎', preview: 'Social icon-уудтай' },
      { id: 'contact', name: 'Холбоо барих', icon: '☎️', preview: 'Холбоо барих мэдээлэлтэй' },
      { id: 'logo', name: 'Логотой', icon: '🏢', preview: 'Лого бүхий' },
      { id: 'centered', name: 'Төвлөрсөн', icon: '⎯', preview: 'Төвлөрсөн текст' },
      { id: 'app', name: 'App татах холбоостой', icon: '📱', preview: 'App Store, Play badge' },
      { id: 'phone', name: 'Утас', icon: '📞', preview: 'Утас харагдах' },
      { id: 'location', name: 'Байршил', icon: '📍', preview: 'Байршил харагдах' }
    ]
  },
  contact: {
    name: 'Холбоо барих',
    description: 'Холбоо барих мэдээлэл',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    layouts: [
      { id: 'default', name: 'Энгийн', icon: '📞', preview: 'Холбоо барих мэдээлэл' }
    ]
  },
};

export default sectionTypes; 