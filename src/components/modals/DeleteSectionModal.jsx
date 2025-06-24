import { Button } from "@/components/ui/button";

export default function DeleteSectionModal({ onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-medium mb-4">Хэсгийг устгах</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Та энэ хэсгийг устгахдаа итгэлтэй байна уу? Энэ үйлдлийг буцаах боломжгүй.
        </p>
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            className="text-sm"
          >
            Болих
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            className="text-sm bg-red-500 hover:bg-red-600 text-white"
          >
            Устгах
          </Button>
        </div>
      </div>
    </div>
  );
} 