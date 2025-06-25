// Model Styles for different sections
export const modelStyles = {
  cards: {
    "model-1": {
      name: "Сонгодог карт",
      description: "Энгийн, цэвэрхэн загвар",
      className: "bg-white rounded-lg shadow-md p-6 border border-gray-200",
      imageClass: "w-full h-48 object-cover rounded-lg mb-4",
      titleClass: "text-xl font-bold text-gray-800 mb-2",
      descriptionClass: "text-gray-600 mb-4",
      priceClass: "text-2xl font-bold text-blue-600",
      hoverEffect: "hover:shadow-lg transition-shadow duration-300"
    },
    "model-2": {
      name: "Градиент карт",
      description: "Градиент өнгөтэй загвар",
      className: "bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 text-white",
      imageClass: "w-full h-48 object-cover rounded-lg mb-4",
      titleClass: "text-xl font-bold text-white mb-2",
      descriptionClass: "text-blue-100 mb-4",
      priceClass: "text-2xl font-bold text-yellow-300",
      hoverEffect: "hover:scale-105 transition-transform duration-300"
    },
    "model-3": {
      name: "Хатуу загвар",
      description: "Хатуу өнгөтэй, модерн загвар",
      className: "bg-gray-900 rounded-2xl shadow-xl p-8 text-white border-2 border-gray-700",
      imageClass: "w-full h-52 object-cover rounded-xl mb-6",
      titleClass: "text-2xl font-bold text-white mb-3",
      descriptionClass: "text-gray-300 mb-6",
      priceClass: "text-3xl font-bold text-green-400",
      hoverEffect: "hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
    },
    "model-4": {
      name: "Цэвэрхэн карт",
      description: "Цагаан өнгөтэй, энгийн загвар",
      className: "bg-white rounded-2xl shadow-lg p-8 border border-gray-100",
      imageClass: "w-full h-48 object-cover rounded-xl mb-6",
      titleClass: "text-xl font-semibold text-gray-800 mb-3",
      descriptionClass: "text-gray-600 mb-6",
      priceClass: "text-2xl font-bold text-indigo-600",
      hoverEffect: "hover:shadow-xl hover:border-indigo-200 transition-all duration-300"
    },
    "model-5": {
      name: "Хэт модерн",
      description: "Хэт модерн, glassmorphism загвар",
      className: "bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20",
      imageClass: "w-full h-52 object-cover rounded-2xl mb-6",
      titleClass: "text-2xl font-bold text-gray-800 mb-3",
      descriptionClass: "text-gray-600 mb-6",
      priceClass: "text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent",
      hoverEffect: "hover:bg-white/20 hover:scale-105 transition-all duration-300"
    }
  },
  
  contact: {
    "model-1": {
      name: "Сонгодог холбоо барих",
      description: "Энгийн, цэвэрхэн загвар",
      className: "bg-gray-900 text-white py-12 px-4 rounded-xl shadow-lg",
      cardClass: "bg-gray-800 rounded-lg p-6 border border-gray-700",
      iconClass: "text-3xl mb-4",
      titleClass: "text-lg font-semibold text-white mb-2",
      detailClass: "text-gray-300",
      socialClass: "bg-blue-600 hover:bg-blue-700 p-3 rounded-full text-white transition-colors"
    },
    "model-2": {
      name: "Градиент холбоо барих",
      description: "Градиент өнгөтэй загвар",
      className: "bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16 px-6 rounded-2xl shadow-2xl",
      cardClass: "bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20",
      iconClass: "text-4xl mb-6",
      titleClass: "text-xl font-bold text-white mb-3",
      detailClass: "text-blue-100",
      socialClass: "bg-white/20 hover:bg-white/30 p-4 rounded-full text-white transition-all duration-300"
    },
    "model-3": {
      name: "Хатуу загвар",
      description: "Хатуу өнгөтэй, модерн загвар",
      className: "bg-black text-white py-20 px-8",
      cardClass: "bg-gray-900 rounded-2xl p-10 border-2 border-gray-700 shadow-xl",
      iconClass: "text-5xl mb-8",
      titleClass: "text-2xl font-bold text-white mb-4",
      detailClass: "text-gray-300 text-lg",
      socialClass: "bg-red-600 hover:bg-red-700 p-4 rounded-full text-white transition-colors"
    },
    "model-4": {
      name: "Цэвэрхэн холбоо барих",
      description: "Цагаан өнгөтэй, энгийн загвар",
      className: "bg-white text-gray-800 py-16 px-6 rounded-2xl shadow-lg border border-gray-200",
      cardClass: "bg-gray-50 rounded-xl p-8 border border-gray-200 shadow-md",
      iconClass: "text-3xl mb-6 text-blue-600",
      titleClass: "text-xl font-semibold text-gray-800 mb-3",
      detailClass: "text-gray-600",
      socialClass: "bg-blue-600 hover:bg-blue-700 p-3 rounded-full text-white transition-colors"
    },
    "model-5": {
      name: "Contact Cards",
      description: "ContactCards загвар",
      className: " flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-6",
      cardClass: "relative bg-white rounded-2xl shadow-lg p-8 w-72 text-center transition transform hover:-translate-y-1 hover:shadow-2xl",
      iconClass: "text-4xl mb-4",
      titleClass: "text-xl font-semibold text-neutral-800 mb-2",
      detailClass: "text-neutral-600 whitespace-pre-line",
      socialClass: "bg-blue-600 hover:bg-blue-700 p-3 rounded-full text-white transition-colors"
    }
  }
};

// Helper function to get model by ID
export const getModelById = (sectionType, modelId) => {
  return modelStyles[sectionType]?.[modelId] || modelStyles[sectionType]?.["model-1"];
};

// Helper function to get all models for a section type
export const getModelsByType = (sectionType) => {
  return modelStyles[sectionType] || {};
};

// Default models
export const defaultModels = {
  cards: "model-1",
  contact: "model-1"
}; 