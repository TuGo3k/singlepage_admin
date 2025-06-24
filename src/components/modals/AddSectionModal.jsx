import { Button } from "@/components/ui/button";

export default function AddSectionModal({ sectionTypes, onAddSection, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-medium mb-4">Шинэ хэсэг нэмэх</h3>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(sectionTypes).map(([type, { name, icon, layouts }]) => (
            <button
              key={type}
              className="flex items-center gap-2 p-3 border rounded-lg hover:border-blue-500 transition-colors text-left"
              onClick={() => onAddSection(type, layouts[0].id)}
            >
              <span className="text-gray-500">{icon}</span>
              <div>
                <div className="font-medium text-sm">{name}</div>
                <div className="text-xs text-gray-500">{layouts.length} загвар</div>
              </div>
            </button>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <Button
            variant="outline"
            onClick={onCancel}
            className="text-sm"
          >
            Болих
          </Button>
        </div>
      </div>
    </div>
  );
} 