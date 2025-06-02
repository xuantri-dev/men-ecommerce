import axios from "axios";

// Gọi API danh sách sản phẩm
export const fetchProducts = async (token?: string) => {
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
export const fetchFeaturedProducts = async () => {
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
