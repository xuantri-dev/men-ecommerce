// khai báo cấu trúc của một sản phẩm để đảm bảo tính nhất quán và đúng đắn của dữ liệu trong dự án
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  sizes: string[];
  colors: string[];
  images: string[];
  featured: boolean;
  stock: number;
  isHidden: boolean;
}
