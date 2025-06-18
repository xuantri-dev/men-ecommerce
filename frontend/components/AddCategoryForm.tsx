"use client";

import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Category } from "@/types/category";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

interface AddCategoryFormProps {
  onClose: () => void;
  onAdd: (category: Category) => void;
}

interface CategoryFormValues {
  name: string;
  image: File;
}

const schema = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên danh mục"),
  image: Yup.mixed<File>()
    .required("Vui lòng chọn hình ảnh")
    .test(
      "fileType",
      "Ảnh không hợp lệ",
      (value) => value instanceof File && value.type.startsWith("image/")
    ),
});

const AddCategoryForm: React.FC<AddCategoryFormProps> = ({
  onClose,
  onAdd,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      image: undefined,
    },
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (errors) {
      Object.values(errors).forEach((err) => {
        if (err?.message) toast.error(err.message);
      });
    }
  }, [errors]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setValue("image", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      const token = localStorage.getItem("token");
      if (!token || token === "null") {
        toast.error("Bạn chưa đăng nhập. Không thể gửi yêu cầu.");
        return;
      }

      const formData = new FormData();
      formData.append("name", data.name);
      if (data.image) formData.append("image", data.image);

      const res = await fetch("http://localhost:5000/api/categories/addcate", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Thêm danh mục thất bại");

      const result = await res.json();
      onAdd(result.result);
      toast.success("Thêm danh mục thành công!");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Không thể thêm danh mục.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-60 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Thêm danh mục mới</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên danh mục
            </label>
            <input
              {...register("name")}
              placeholder="Nhập tên danh mục"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hình ảnh
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 cursor-pointer"
            />
            {imagePreview && (
              <div className="mt-3">
                <Image
                  src={imagePreview}
                  alt="preview"
                  width={100}
                  height={100}
                  className="rounded border object-cover"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 rounded-lg text-white font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 text-sm disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Đang thêm..." : "Thêm danh mục"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryForm;
