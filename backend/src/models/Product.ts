import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  // Lưu ObjectId của danh mục
  category: mongoose.Types.ObjectId;
  sizes: string[];
  colors: string[];
  images: string[];
  featured: boolean;
  stock: number;
  isHidden: boolean;
}

const ProductSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, "Nhập thiếu tên cho sản phẩm này."],
  },
  description: {
    type: String,
    required: [true, "Nhập thiếu mô tả cho sản phẩm này."],
  },
  price: {
    type: Number,
    required: [true, "Nhập thiếu giá cho sản phẩm này."],
  },
  category: {
    // Tham chiếu đến Category
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Nhập thiếu danh mục cho sản phẩm này."],
  },
  sizes: {
    type: [String],
    required: [true, "Nhập thiếu kích thước cho sản phẩm này."],
  },
  colors: {
    type: [String],
    required: [true, "Nhập thiếu màu sắc cho sản phẩm này."],
  },
  images: {
    type: [String],
    required: [true, "Nhập thiếu hình ảnh cho sản phẩm này."],
  },
  featured: { type: Boolean, default: false },
  stock: {
    type: Number,
    required: [true, "Nhập thiếu số lượng tồn kho cho sản phẩm này."],
  },
  isHidden: {
    type: Boolean,
    // Mặc định sản phẩm khi tạo mới là false (không bị ẩn), không thể tạo là true
    // Có thể cập nhật sau này
    default: false,
  },
});

export default mongoose.model<IProduct>("Product", ProductSchema);
