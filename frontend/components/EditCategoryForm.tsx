"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Category } from "@/types/category";
import { CategoryFormValues } from "@/types/forms/category";
import Image from "next/image";

interface EditCategoryFormProps {
  initialCategory: Category;
  onClose: () => void;
  onUpdate: (category: Category) => void;
}

// Schema with optional image
const schema = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên danh mục"),
  image: Yup.mixed<File>()
    .nullable()
    .optional()
    .test(
      "fileType",
      "Chỉ chấp nhận ảnh",
      (file) =>
        !file || // Allow no file (optional)
        (file instanceof File &&
          ["image/jpeg", "image/png", "image/webp", "image/jpg"].includes(
            file.type
          ))
    ),
});

const EditCategoryForm: React.FC<EditCategoryFormProps> = ({
  initialCategory,
  onClose,
  onUpdate,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues>({
    resolver: yupResolver(schema) as Resolver<CategoryFormValues>,
    defaultValues: {
      name: initialCategory.name,
      image: undefined,
    },
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    if (initialCategory.image) {
      setImagePreviews([initialCategory.image]);
    }
  }, [initialCategory.image]);

  useEffect(() => {
    if (errors) {
      Object.values(errors).forEach((err) => {
        if (err?.message) toast.error(err.message);
      });
    }
  }, [errors]);

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file);
      setImagePreviews([URL.createObjectURL(file)]);
    }
  };

  const onSubmit: SubmitHandler<CategoryFormValues> = async (
    data: CategoryFormValues
  ) => {
    try {
      const token = localStorage.getItem("token") || "";
      const formData = new FormData();
      formData.append("name", data.name);
      if (data.image instanceof File) {
        formData.append("image", data.image);
      }

      const res = await fetch(
        `http://localhost:5000/api/categories/updatecate/${initialCategory._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Cập nhật danh mục thất bại");

      const updatedCategory = await res.json();
      onUpdate(updatedCategory.result);
      // toast.success("Cập nhật danh mục thành công!");
      console.log("Updated Category:", updatedCategory); // Debug log
      onUpdate(updatedCategory.result); // Gọi onUpdate với dữ liệu mới
      toast.success("Cập nhật danh mục thành công!");
      setTimeout(() => {
        onClose(); // Đóng modal sau khi toast hiển thị
      }, 1000);
    } catch (err) {
      console.error(err);
      toast.error("Không thể cập nhật danh mục.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-60 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Chỉnh sửa danh mục</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên danh mục
            </label>
            <input
              {...register("name")}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hình ảnh
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImagesChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm cursor-pointer"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {imagePreviews.map((url, idx) => (
                <div key={idx} className="relative w-16 h-16">
                  <Image
                    src={url}
                    alt={`preview-${idx}`}
                    width={64}
                    height={64}
                    className="object-cover rounded border border-gray-200"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 rounded-lg text-white font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Đang cập nhật..." : "Lưu thay đổi"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryForm;
