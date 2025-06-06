// Lấy danh sách sản phẩm, chi tiết sản phẩm, thêm/sửa/xóa
import axios from "axios";
import { Product } from "@/types/product";

// Gọi API danh sách sản phẩm
export const fetchProducts = async (token?: string): Promise<Product[]> => {
  try {
    const response = await axios.get("http://localhost:5000/api/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data) throw new Error("No data found");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// khai báo hàm fetchFeaturedProducts để lấy danh sách sản phẩm nổi bật từ API
// Hàm này sẽ trả về một Promise chứa dữ liệu sản phẩm nổi bật
export const fetchFeaturedProducts = async (): Promise<Product[]> => {
  // sử dụng try và catch để xử lý lỗi khi thực hiện yêu cầu
  try {
    // thực hiện yêu cầu GET đến API để lấy danh sách sản phẩm nổi bật
    const response = await axios.get(
      "http://localhost:5000/api/products/featured"
    );

    // kiểm tra xem phản hồi có dữ liệu hay không
    if (!response.data) {
      throw new Error("No data found");
    }
    // nếu có dữ liệu, trả về dữ liệu sản phẩm
    return response.data;
  } catch (error) {
    console.error("Error fetching featured products:", error);
    throw error;
  }
};

// Lấy chi tiết sản phẩm theo ID
export const fetchProductById = async (id: string): Promise<Product> => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/products/${id}`
    );

    if (!response.data) {
      throw new Error("No product data found");
    }

    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};

export const deleteProduct = async (id: string, token: string) => {
  const res = await fetch(
    `http://localhost:5000/api/products/deletepro/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Không thể xóa sản phẩm");
  }

  return res.json();
};

export const toggleProductVisibility = async (id: string, token: string) => {
  const res = await fetch(
    `http://localhost:5000/api/products/${id}/toggle-visibility`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!res.ok) throw new Error("Toggle visibility failed");
  return res.json();
};

export const toggleProductFeatured = async (id: string, token: string) => {
  const res = await fetch(
    `http://localhost:5000/api/products/${id}/toggle-featured`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!res.ok) throw new Error("Toggle featured failed");
  return res.json();
};

// Cập nhật sản phẩm
export const updateProduct = async (
  id: string,
  data: FormData,
  token: string
): Promise<Product> => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/products/updateproduct/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }
    );

    if (!res.ok) {
      throw new Error("Cập nhật sản phẩm thất bại");
    }

    const updatedProduct = await res.json();
    if (!updatedProduct) {
      throw new Error("Không có dữ liệu sản phẩm được trả về");
    }

    return updatedProduct;
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error);
    throw error;
  }
};
