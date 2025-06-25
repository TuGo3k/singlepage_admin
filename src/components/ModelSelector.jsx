import { useState } from 'react';
import { getModelsByType, getModelById } from '@/data/modelStyles';

export default function ModelSelector({ 
  sectionType, 
  currentModel, 
  onModelChange, 
  className = "" 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const models = getModelsByType(sectionType);
  const currentModelData = getModelById(sectionType, currentModel);

  return (
    <div className={`relative ${className}`}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Загварын сонголт
      </label>
      
      {/* Model Preview */}
      <div className="mb-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">
              {currentModelData?.name}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {currentModelData?.description}
            </p>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
          >
            Сонгох
          </button>
        </div>
      </div>

      {/* Model Selection Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          <div className="p-4">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Загварууд
            </h3>
            <div className="space-y-3">
              {Object.entries(models).map(([modelId, modelData]) => (
                <div
                  key={modelId}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    currentModel === modelId
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                  onClick={() => {
                    onModelChange(modelId);
                    setIsOpen(false);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                        {modelData.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {modelData.description}
                      </p>
                    </div>
                    {currentModel === modelId && (
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  {/* Visual Preview */}
                  <div className="mt-3 p-3 bg-gray-100 dark:bg-gray-700 rounded border">
                    <div className={`${modelData.className || modelData.cardClass} ${modelData.hoverEffect || ''}`}>
                      <div className={`${modelData.iconClass || ''} text-blue-500`}>
                        {sectionType === 'cards' ? '📦' : '📞'}
                      </div>
                      <div className={`${modelData.titleClass || ''}`}>
                        {sectionType === 'cards' ? 'Бүтээгдэхүүн' : 'Холбоо барих'}
                      </div>
                      <div className={`${modelData.descriptionClass || modelData.detailClass || ''}`}>
                        {sectionType === 'cards' ? 'Тайлбар текст' : 'Дэлгэрэнгүй мэдээлэл'}
                      </div>
                      {sectionType === 'cards' && (
                        <div className={`${modelData.priceClass || ''}`}>
                          ₮99,999
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

// Model Preview Component for Cards
export function CardsModelPreview({ modelId, cardData }) {
  const model = getModelById('cards', modelId);
  
  return (
    <div className={`${model.className} ${model.hoverEffect}`}>
      <img 
        src={cardData?.image || '/placeholder.jpg'} 
        alt={cardData?.title}
        className={model.imageClass}
      />
      <h3 className={model.titleClass}>
        {cardData?.title || 'Бүтээгдэхүүн'}
      </h3>
      <p className={model.descriptionClass}>
        {cardData?.description || 'Тайлбар текст'}
      </p>
      {cardData?.price && (
        <div className={model.priceClass}>
          {cardData.price}
        </div>
      )}
    </div>
  );
}

// Model Preview Component for Contact
export function ContactModelPreview({ modelId, contactData }) {
  const model = getModelById('contact', modelId);
  
  return (
    <div className={model.className}>
      <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
        <div className={model.cardClass}>
          <div className={model.iconClass}>
            📞
          </div>
          <h3 className={model.titleClass}>
            {contactData?.phoneTitle || 'Утас'}
          </h3>
          <p className={model.detailClass}>
            {contactData?.phone || '+976 99999999'}
          </p>
        </div>
      </div>
    </div>
  );
} 