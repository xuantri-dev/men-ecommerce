export interface ProductFormValues {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  featured: boolean;
  isHidden: boolean;
  images: File[];
  sizes: string[];
  colors: string[];
}
