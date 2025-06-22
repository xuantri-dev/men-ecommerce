"use client";

import { useState, useEffect } from "react";
import { Category } from "@/types/category";
import { Product } from "@/types/product";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { ProductFormValues } from "@/types/forms/product";
import { updateProduct } from "@/services/product.service";
import Image from "next/image";

interface EditProductFormProps {
  categories: Category[];
  initialProduct: Product;
  onClose: () => void;
  onUpdate: (product: Product) => void;
}

const schema = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên sản phẩm"),
  description: Yup.string().required("Vui lòng nhập mô tả sản phẩm"),
  price: Yup.number().required().min(0),
  stock: Yup.number().required().min(0),
  category: Yup.string().required("Vui lòng chọn danh mục"),
  featured: Yup.boolean().required(),
  isHidden: Yup.boolean().required(),
  images: Yup.array().of(Yup.mixed<File>().required()).default([]),
  sizes: Yup.array().of(Yup.string().required()).required(),
  colors: Yup.array().of(Yup.string().required()).required(),
});

const EditProductForm: React.FC<EditProductFormProps> = ({
  categories,
  initialProduct,
  onClose,
  onUpdate,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: initialProduct.name,
      description: initialProduct.description,
      price: initialProduct.price,
      stock: initialProduct.stock,
      category: initialProduct.category,
      featured: initialProduct.featured,
      isHidden: initialProduct.isHidden,
      images: [],
      sizes: initialProduct.sizes || [],
      colors: initialProduct.colors || [],
    },
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>(
    initialProduct.images || []
  );
  const [sizesInput, setSizesInput] = useState("");
  const [colorsInput, setColorsInput] = useState("");

  // const images = watch("images");
  const sizes = watch("sizes");
  const colors = watch("colors");

  useEffect(() => {
    if (errors) {
      Object.values(errors).forEach((err) => {
        if (err?.message) toast.error(err.message);
      });
    }
  }, [errors]);

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(
      (file) => file instanceof File
    );
    setValue("images", files);
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleAddTag = (
    type: "sizes" | "colors",
    inputValue: string,
    setInputValue: (v: string) => void
  ) => {
    if (!inputValue.trim()) return;
    const newValue = [...(watch(type) || []), inputValue.trim()];
    setValue(type, newValue);
    setInputValue("");
  };

  const handleRemoveTag = (type: "sizes" | "colors", index: number) => {
    const updated = [...(watch(type) || [])];
    updated.splice(index, 1);
    setValue(type, updated);
  };

  const onSubmit = async (data: ProductFormValues) => {
    try {
      const token = localStorage.getItem("token") || "";

      const formData = new FormData();
      formData.append("name", data.name || initialProduct.name);
      formData.append(
        "description",
        data.description || initialProduct.description
      );
      formData.append("price", String(data.price ?? initialProduct.price));
      formData.append("stock", String(data.stock ?? initialProduct.stock));
      formData.append("category", data.category || initialProduct.category);
      formData.append(
        "featured",
        String(data.featured ?? initialProduct.featured)
      );
      formData.append(
        "isHidden",
        String(data.isHidden ?? initialProduct.isHidden)
      );
      formData.append(
        "sizes",
        JSON.stringify(data.sizes?.length ? data.sizes : initialProduct.sizes)
      );
      formData.append(
        "colors",
        JSON.stringify(
          data.colors?.length ? data.colors : initialProduct.colors
        )
      );

      if (data.images.length > 0) {
        data.images.forEach((file) => {
          formData.append("images", file);
        });
      }

      const updatedProduct = await updateProduct(
        initialProduct._id,
        formData,
        token
      );

      onUpdate(updatedProduct);
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Không thể cập nhật sản phẩm.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-60 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Chỉnh sửa sản phẩm</h2>

        <div className="space-y-6">
          {/* Thông tin cơ bản */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên sản phẩm
              </label>
              <input
                {...register("name")}
                placeholder="Tên sản phẩm"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mô tả sản phẩm
              </label>
              <textarea
                {...register("description")}
                placeholder="Mô tả sản phẩm"
                rows={2}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Giá (VND)
              </label>
              <input
                type="number"
                {...register("price")}
                placeholder="Giá"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tồn kho
              </label>
              <input
                type="number"
                {...register("stock")}
                placeholder="Tồn kho"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Danh mục
              </label>
              <select
                {...register("category")}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 cursor-pointer"
              >
                <option value="">-- Chọn danh mục --</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Hình ảnh */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ảnh mới
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImagesChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 cursor-pointer"
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

          {/* Sizes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sizes
            </label>
            <div className="flex items-center gap-2">
              <input
                value={sizesInput}
                onChange={(e) => setSizesInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag("sizes", sizesInput, setSizesInput);
                  }
                }}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                placeholder="Nhập size và Enter"
              />
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {sizes.map((size, index) => (
                <span
                  key={index}
                  className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  {size}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag("sizes", index)}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Colors
            </label>
            <div className="flex items-center gap-2">
              <input
                value={colorsInput}
                onChange={(e) => setColorsInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag("colors", colorsInput, setColorsInput);
                  }
                }}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                placeholder="Nhập màu và Enter"
              />
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {colors.map((color, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  {color}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag("colors", index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Tùy chọn */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                {...register("featured")}
                className="h-4 w-4 text-indigo-600 border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              />
              Nổi bật
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                {...register("isHidden")}
                className="h-4 w-4 text-indigo-600 border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              />
              Ẩn sản phẩm
            </label>
          </div>

          {/* Nút submit */}
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="w-full py-2 px-4 rounded-lg text-white font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 text-sm disabled:bg-indigo-400 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? "Đang cập nhật..." : "Lưu thay đổi"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductForm;
