import mongoose, { Document, Model, Schema } from "mongoose";

interface ICategory extends Document {
  name: string;
  slug: string;
  image: string;
}

const CategorySchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nhập thiếu tên danh mục"],
      unique: true,
    },
    slug: {
      type: String,
      required: [true, "Nhập thiếu slug danh mục"],
    },
    image: {
      type: String,
      required: [true, "Nhập thiếu hình ảnh danh mục"],
    },
  },
  {
    timestamps: false,
  }
);

const Category: Model<ICategory> =
  mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);

export default Category;
