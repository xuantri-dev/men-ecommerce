"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";

interface ConfirmDeleteModalProps {
  productName: string;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  productName,
  onClose,
  onConfirm,
  loading = false,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-60 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-xl font-semibold text-center mb-4">Xác nhận xóa</h2>
        <p className="text-center text-gray-700 mb-6">
          Bạn có chắc chắn muốn xóa sản phẩm{" "}
          <span className="font-bold text-red-600">{productName}</span> không?
          Hành động này không thể hoàn tác.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400"
          >
            {loading ? "Đang xóa..." : "Xóa"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
