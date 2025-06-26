// Theme Presets for all sections
export const themePresets = {
  "theme-1": {
    name: "Сонгодог Цагаан",
    description: "Цагаан өнгөтэй, цэвэрхэн загвар",
    colors: {
      primary: "#3B82F6",
      secondary: "#6B7280",
      background: "#FFFFFF",
      cardBg: "#F9FAFB",
      text: "#1F2937",
      accent: "#E5E7EB",
      contactBg: "#1F2937"
    },
    cards: {
      className: "bg-white rounded-lg shadow-md p-6 border border-gray-200",
      imageClass: "w-full h-48 object-cover rounded-lg mb-4",
      titleClass: "text-xl font-bold text-gray-800 mb-2",
      descriptionClass: "text-gray-600 mb-4",
      priceClass: "text-2xl font-bold text-blue-600",
      hoverEffect: "hover:shadow-lg transition-shadow duration-300"
    },
    contact: {
      className: "text-white py-12 px-4 rounded-xl shadow-lg flex flex-col items-center justify-center",
      cardClass: "bg-white flex flex-col items-center  rounded-lg px-2 py-4 border border-gray-700",
      iconClass: "text-3xl",
      titleClass: "text-lg font-semibold text-black mb-2",
      detailClass: "text-black  ",
      socialClass: "bg-blue-600 hover:bg-blue-700 p-3 rounded-full text-white transition-colors"
    },
    hero: {
      className: "bg-gradient-to-r from-blue-50 to-indigo-100",
      titleClass: "text-4xl font-bold text-gray-800",
      descriptionClass: "text-gray-600",
      buttonClass: "bg-blue-600 hover:bg-blue-700 text-white"
    },
    banner: {
      className: "bg-gradient-to-r from-blue-500 to-purple-600 text-white",
      titleClass: "text-3xl font-bold text-white",
      subtitleClass: "text-blue-100"
    },
    footer: {
      className: "bg-gray-900 text-white",
      cardClass: "bg-gray-800 rounded-lg p-2 border border-gray-700"
    }
  },
  
  "theme-2": {
    name: "Градиент Хөх",
    description: "Хөх градиент өнгөтэй загвар",
    colors: {
      primary: "#1E40AF",
      secondary: "#64748B",
      background: "#F1F5F9",
      cardBg: "#FFFFFF",
      text: "#1E293B",
      accent: "#DBEAFE",
      contactBg: "linear-gradient(to bottom right, #1E40AF, #7C3AED)"
    },
    cards: {
      className: "bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 text-white",
      imageClass: "w-full h-48 object-cover rounded-lg mb-4",
      titleClass: "text-xl font-bold text-white mb-2",
      descriptionClass: "text-blue-100 mb-4",
      priceClass: "text-2xl font-bold text-yellow-300",
      hoverEffect: "hover:scale-105 transition-transform duration-300"
    },
    contact: {
      className: "text-white py-16 px-6 rounded-2xl shadow-2xl flex flex-col items-center justify-center",
      cardClass: "bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20",
      iconClass: "text-4xl",
      titleClass: "text-xl font-bold text-white mb-3",
      detailClass: "text-blue-100",
      socialClass: "bg-white/20 hover:bg-white/30 p-4 rounded-full text-white transition-all duration-300"
    },
    hero: {
      className: "bg-gradient-to-br from-blue-600 to-purple-700 text-white",
      titleClass: "text-4xl font-bold text-white",
      descriptionClass: "text-blue-100",
      buttonClass: "bg-white text-blue-600 hover:bg-blue-50"
    },
    banner: {
      className: "bg-gradient-to-r from-indigo-600 to-purple-700 text-white",
      titleClass: "text-3xl font-bold text-white",
      subtitleClass: "text-indigo-100"
    },
    footer: {
      className: "bg-gradient-to-br from-blue-600 to-purple-700 text-white",
      cardClass: "bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20"
    }
  },
  
  "theme-3": {
    name: "Хатуу Хар",
    description: "Хар өнгөтэй, хатуу загвар",
    colors: {
      primary: "#EF4444",
      secondary: "#9CA3AF",
      background: "#1f2937",
      cardBg: "#111827",
      text: "#FFFFFF",
      accent: "#374151",
      contactBg: "#111827"
    },
    cards: {
      className: "bg-gray-900 rounded-2xl shadow-xl p-8 text-white border-2 border-gray-700",
      imageClass: "w-full h-48 object-cover rounded-xl mb-4",
      titleClass: "text-2xl font-bold text-white mb-3",
      descriptionClass: "text-gray-300 mb-6",
      priceClass: "text-3xl font-bold text-green-400",
      hoverEffect: "hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
    },
    contact: {
      className: "text-white py-20 px-8 flex flex-col items-center justify-center",
      cardClass: "bg-gray-900 rounded-2xl p-10 border-2 border-gray-700 shadow-xl",
      iconClass: "text-3xl ",
      titleClass: "text-2xl font-bold text-white mb-4",
      detailClass: "text-gray-300 text-lg",
      socialClass: "bg-[#374151] hover:bg-red-700 p-4 rounded-full text-white transition-colors"
    },
    hero: {
      className: "bg-black text-white",
      titleClass: "text-4xl font-bold text-white",
      descriptionClass: "text-gray-300",
      buttonClass: "bg-red-600 hover:bg-red-700 text-white"
    },
    banner: {
      className: "bg-black text-white",
      titleClass: "text-3xl font-bold text-white",
      subtitleClass: "text-gray-300"
    },
    footer: {
      className: "bg-black text-white",
      cardClass: "bg-gray-900 rounded-2xl p-10 border-2 border-gray-700"
    }
  },
  
  "theme-4": {
    name: "Ногоон Байгаль",
    description: "Ногоон өнгөтэй, байгалийн загвар",
    colors: {
      primary: "#059669",
      secondary: "#6B7280",
      background: "#FFFFFF",
      cardBg: "#FFFFFF",
      text: "#064E3B",
      accent: "#D1FAE5",
      contactBg: "#FFFFFF"
    },
    cards: {
      className: "border-green-200 bg-green-50 rounded-2xl shadow-lg p-8",
      imageClass: "w-full h-48 object-cover rounded-xl mb-4",
      titleClass: "text-xl font-semibold text-gray-800 mb-3",
      descriptionClass: "text-gray-600 mb-6",
      priceClass: "text-2xl font-bold text-green-600",
      hoverEffect: "hover:shadow-xl hover:border-green-200 transition-all duration-300"
    },
    contact: {
      className: "text-gray-800 py-16 px-6 rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center justify-center",
      cardClass: "bg-green-50 rounded-xl p-8 border border-green-200 shadow-md",
      iconClass: "text-3xl text-green-600",
      titleClass: "text-xl font-semibold text-gray-800 mb-3",
      detailClass: "text-gray-600",
      socialClass: "bg-green-600 hover:bg-green-700 p-3 rounded-full text-white transition-colors"
    },
    hero: {
      className: "bg-gradient-to-r from-green-50 to-emerald-100",
      titleClass: "text-4xl font-bold text-gray-800",
      descriptionClass: "text-gray-600",
      buttonClass: "bg-green-600 hover:bg-green-700 text-white"
    },
    banner: {
      className: "bg-gradient-to-r from-green-500 to-emerald-600 text-white",
      titleClass: "text-3xl font-bold text-white",
      subtitleClass: "text-green-100"
    },
    footer: {
      className: "bg-green-800 text-white",
      cardClass: "bg-green-700 rounded-xl p-8 border border-green-600"
    }
  },
  
  "theme-5": {
    name: "Contact Cards",
    description: "ContactCards загвар",
    colors: {
      primary: "#EC4899",
      secondary: "#8B5CF6",
      background: "#FDF2F8",
      cardBg: "#FFFFFF",
      text: "#1F2937",
      accent: "#FCE7F3",
      contactBg: "linear-gradient(135deg, #EC4899, #8B5CF6, #3B82F6)"
    },
    cards: {
      className: "bg-white rounded-2xl shadow-lg p-8 border border-gray-100",
      imageClass: "w-full h-48 object-cover rounded-xl mb-4",
      titleClass: "text-xl font-semibold text-gray-800 mb-3",
      descriptionClass: "text-gray-600 mb-6",
      priceClass: "text-2xl font-bold text-pink-600",
      hoverEffect: "hover:shadow-xl hover:border-pink-200 transition-all duration-300"
    },
    contact: {
      className: "flex flex-col items-center justify-center py-16 px-6",
      cardClass: "relative bg-white rounded-2xl shadow-lg p-8  text-center transition transform hover:-translate-y-1 hover:shadow-2xl",
      iconClass: "text-3xl ",
      titleClass: "text-xl font-semibold text-neutral-800 mb-2",
      detailClass: "text-neutral-600 whitespace-pre-line",
      socialClass: "bg-pink-500 hover:bg-pink-600 p-3 rounded-full text-white transition-colors"
    },
    hero: {
      className: "bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100",
      titleClass: "text-4xl font-bold text-gray-800",
      descriptionClass: "text-gray-600",
      buttonClass: "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
    },
    banner: {
      className: "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white",
      titleClass: "text-3xl font-bold text-white",
      subtitleClass: "text-pink-100"
    },
    footer: {
      className: "bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100",
      cardClass: "relative bg-white rounded-2xl shadow-lg p-8 text-center transition transform hover:-translate-y-1 hover:shadow-2xl"
    }
  },
  "theme-6": {
    name: "Градиент Хөх",
    description: "Хөх градиент өнгөтэй загвар",
    colors: {
      primary: "#1E40AF",
      secondary: "#64748B",
      background: "#ffffff",
      // background2: "#1f2937",
      cardBg: "#FFFFFF",
      text: "#1E293B",
      accent: "#DBEAFE",
      contactBg: "#1f2937"
    },
    cards: {
      className: "bg-gradient-to-br from-[#4b5563] to-[#e6edf3] rounded-xl shadow-lg p-6 text-white",
      imageClass: "w-full h-48 object-cover rounded-lg mb-4",
      titleClass: "text-xl font-bold text-white mb-2",
      descriptionClass: "text-blue-100 mb-4",
      priceClass: "text-2xl font-bold text-yellow-300",
      hoverEffect: "hover:scale-105 transition-transform duration-300"
    },
    contact: {
      className: "text-white py-16 px-6 rounded-2xl shadow-2xl flex flex-col items-center justify-center",
      cardClass: "bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20",
      iconClass: "text-4xl",
      titleClass: "text-xl font-bold text-white mb-3",
      detailClass: "text-blue-100",
      socialClass: "bg-white/20 hover:bg-white/30 p-4 rounded-full text-white transition-all duration-300"
    },
    hero: {
      className: "bg-gradient-to-br from-blue-600 to-purple-700 text-white",
      titleClass: "text-4xl font-bold text-white",
      descriptionClass: "text-blue-100",
      buttonClass: "bg-white text-blue-600 hover:bg-blue-50"
    },
    banner: {
      className: "bg-gradient-to-r from-indigo-600 to-purple-700 text-white",
      titleClass: "text-3xl font-bold text-white",
      subtitleClass: "text-indigo-100"
    },
    footer: {
      className: "bg-gradient-to-br from-blue-600 to-purple-700 text-white",
      cardClass: "bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20"
    }
  },
  "theme-7": {
    name: "Зөөлөн ногоон, шар",
    description: "Ногоон болон шар өнгөтэй загвар",
    colors: {
      primary: "#7a9489",
      secondary: "#e6dfcf",
      background: "#e6dfcf",
      // background2: "#1f2937",
      cardBg: "#c5dcca",
      text: "#7a9489",
      accent: "#DBEAFE",
      contactBg: "#7a9489"
    },
    cards: {
      className: "bg-[#c5dcca] rounded-xl shadow-lg p-6 text-[#7a9489]",
      imageClass: "w-full h-48 object-cover rounded-lg mb-4",
      titleClass: "text-xl font-bold text-[#7a9489] mb-2",
      descriptionClass: "text-blue-100 mb-4",
      priceClass: "text-2xl font-bold text-yellow-300",
      hoverEffect: "hover:scale-105 transition-transform duration-300"
    },
    contact: {
      className: "[#7a9489] py-16 px-6 rounded-2xl shadow-2xl flex flex-col items-center justify-center",
      cardClass: "bg-[#c5dcca] backdrop-blur-md rounded-xl p-8 border border-white/20",
      iconClass: "text-4xl",
      titleClass: "text-xl font-bold text-[#7a9489] mb-3",
      detailClass: "text-[#7a9489]",
      socialClass: "bg-white/20 hover:bg-white/30 p-4 rounded-full text-[#7a9489] transition-all duration-300"
    },
    hero: {
      className: " text-[#7a9489]",
      titleClass: "text-4xl font-bold text-[#7a9489]",
      descriptionClass: "text-blue-100",
      buttonClass: "bg-white text-blue-600 hover:bg-blue-50"
    },
    banner: {
      className: "bg-gradient-to-r from-indigo-600 to-purple-700 text-[#7a9489]",
      titleClass: "text-3xl font-bold text-[#7a9489]",
      subtitleClass: "text-"
    },
    footer: {
      className: "bg-gradient-to-br from-[#7f737f] to-[#c4bac5] text-[#7a9489]",
      cardClass: "bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20"
    }
  },
  "theme-8": {
    name: "Зөөлөн ногоон, шар",
    description: "Ногоон болон шар өнгөтэй загвар",
    colors: {
      primary: "#7a9489",
      secondary: "#e6dfcf",
      background: "#c5dcca",
      background2: "#7a9489",
      cardBg: "#c5dcca",
      text: "#7a9489",
      accent: "#DBEAFE",
      contactBg: "#7a9489"
    },
    cards: {
      className: "bg-[#c4bac5] rounded-xl shadow-lg p-6 text-[#e6dfcf]",
      imageClass: "w-full h-48 object-cover rounded-lg mb-4",
      titleClass: "text-xl font-bold text-[#e6dfcf] mb-2",
      descriptionClass: "text-blue-100 mb-4",
      priceClass: "text-2xl font-bold text-yellow-300",
      hoverEffect: "hover:scale-105 transition-transform duration-300"
    },
    contact: {
      className: "text-[#e6dfcf] py-16 px-6 rounded-2xl shadow-2xl flex flex-col items-center justify-center",
      cardClass: "bg-[#c4bac5] backdrop-blur-md rounded-xl p-8 border border-white/20",
      iconClass: "text-4xl",
      titleClass: "text-xl font-bold text-[#e6dfcf] mb-3",
      detailClass: "text-[#e6dfcf]",
      socialClass: "bg-white/20 hover:bg-white/30 p-4 rounded-full text-[#e6dfcf] transition-all duration-300"
    },
    hero: {
      className: " text-[#e6dfcf]",
      titleClass: "text-4xl font-bold text-[#e6dfcf]",
      descriptionClass: "text-blue-100",
      buttonClass: "bg-white text-blue-600 hover:bg-blue-50"
    },
    banner: {
      className: "bg-gradient-to-r from-indigo-600 to-purple-700 text-[#e6dfcf]",
      titleClass: "text-3xl font-bold text-[#e6dfcf]",
      subtitleClass: "text-"
    },
    footer: {
      className: "bg-gradient-to-br from-[#7f737f] to-[#c4bac5] text-[#e6dfcf]",
      cardClass: "bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20"
    }
  },
  "theme-9": {
    name: "Цэнхэр хослолууд",
    description: "Олон цэнхэр хослолууд",
    colors: {
      primary: "#7a9489",
      secondary: "#e6dfcf",
      background: "#98bcc7", 
      // background2: "#1f2937",
      cardBg: "#ece7e2",
      text: "#7a9489",
      accent: "#DBEAFE",
      contactBg: "#467b82"
    },
    cards: {
      className: "bg-[#6f949f] rounded-xl shadow-lg p-6 text-[#1f4b4e]",
      imageClass: "w-full h-48 object-cover rounded-lg mb-4",
      titleClass: "text-xl font-bold text-[#1f4b4e] mb-2",
      descriptionClass: "text-blue-100 mb-4",
      priceClass: "text-2xl font-bold text-yellow-300",
      hoverEffect: "hover:scale-105 transition-transform duration-300"
    },
    contact: {
      className: "text-[#1f4b4e] py-16 px-6 rounded-2xl shadow-2xl flex flex-col items-center justify-center",
      cardClass: "bg-[#98bcc7] backdrop-blur-md rounded-xl p-8 border border-white/20",
      iconClass: "text-4xl",
      titleClass: "text-xl font-bold text-[#1f4b4e] mb-3",
      detailClass: "text-[#1f4b4e]",
      socialClass: "bg-white/20 hover:bg-white/30 p-4 rounded-full text-[#1f4b4e] transition-all duration-300"
    },
    hero: {
      className: " text-[#1f4b4e]",
      titleClass: "text-4xl font-bold text-[#1f4b4e]",
      descriptionClass: "text-blue-100",
      buttonClass: "bg-white text-blue-600 hover:bg-blue-50"
    },
    banner: {
      className: "bg-gradient-to-r from-indigo-600 to-purple-700 text-[#1f4b4e]",
      titleClass: "text-3xl font-bold text-[#1f4b4e]",
      subtitleClass: "text-"
    },
    footer: {
      className: "bg-gradient-to-br from-[#7f737f] to-[#c4bac5] text-[#1f4b4e]",
      cardClass: "bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20"
    }
  },
  "theme-10": {
    name: "Цэнхэр хослолууд",
    description: "Олон цэнхэр хослолууд",
    colors: {
      primary: "#7a9489",
      secondary: "#e6dfcf",
      background: "#ffffff", 
      // background2: "#1f2937",
      cardBg: "#ece7e2",
      text: "#7a9489",
      accent: "#DBEAFE",
      contactBg: "linear-gradient(to bottom right, #d3a745, #faf49e, #c99250)"
    },
    cards: {
      className: "bg-gradient-to-br from-[#d3a745] via-[#faf49e] to-[#c99250]  rounded-xl shadow-lg p-6 text-[#1f4b4e]",
      imageClass: "w-full h-48 object-cover rounded-lg mb-4",
      titleClass: "text-xl font-bold text-[#1f4b4e] mb-2",
      descriptionClass: "text-blue-100 mb-4",
      priceClass: "text-2xl font-bold text-yellow-300",
      hoverEffect: "hover:scale-105 transition-transform duration-300"
    },
    contact: {
      className: "text-[#1f4b4e] bg-gradient-to-br from-[#d3a745] via-[#faf49e] to-[#c99250] py-16 px-6 rounded-2xl shadow-2xl flex flex-col items-center justify-center",
      cardClass: "bg-white backdrop-blur-md rounded-xl p-8 border border-white/20",
      iconClass: "text-4xl",
      titleClass: "text-xl font-bold text-[#1f4b4e] mb-3",
      detailClass: "text-[#1f4b4e]",
      socialClass: "bg-white/20 hover:bg-white/30 p-4 rounded-full text-[#1f4b4e] transition-all duration-300"
    },
    hero: {
      className: " text-[#1f4b4e]",
      titleClass: "text-4xl font-bold text-[#1f4b4e]",
      descriptionClass: "text-blue-100",
      buttonClass: "bg-white text-blue-600 hover:bg-blue-50"
    },
    banner: {
      className: "bg-gradient-to-r from-indigo-600 to-purple-700 text-[#1f4b4e]",
      titleClass: "text-3xl font-bold text-[#1f4b4e]",
      subtitleClass: "text-"
    },
    footer: {
      className: "bg-gradient-to-br from-[#7f737f] to-[#c4bac5] text-[#1f4b4e]",
      cardClass: "bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20"
    }
  },
};

// Helper function to get theme by ID
export const getThemeById = (themeId) => {
  return themePresets[themeId] || themePresets["theme-1"];
};

// Helper function to get all themes
export const getAllThemes = () => {
  return themePresets;
};

// Default theme
export const defaultTheme = "theme-1"; 