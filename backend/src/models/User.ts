import mongoose, { Document, Model, Schema } from "mongoose";

interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  role: number;
}

const UserSchema: Schema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Nhập thiếu tên đầy đủ"],
    },
    email: {
      type: String,
      required: [true, "Nhập thiếu email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Nhập thiếu mật khẩu"],
    },
    role: {
      type: Number,
      enum: [0, 1, 2],
      // Mặc định là user
      default: 2,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
