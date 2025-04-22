// khai báo biến chứa đường dẫn đến hình ảnh sản phẩm
// Đường dẫn này sẽ được sử dụng để hiển thị hình ảnh sản phẩm trong ứng dụng
// láy đường dẫn đến hình ảnh sản phẩm từ biến môi trường NEXT_PUBLIC_IMAGE_URL trong file .env.local
// Nếu biến môi trường này không được định nghĩa, nó sẽ sử dụng đường dẫn mặc định là http://localhost:5000
const BASE_IMAGE_URL =
  process.env.NEXT_PUBLIC_IMAGE_URL || "http://localhost:5000";

// Hàm getImageUrl nhận vào một đường dẫn hình ảnh và trả về đường dẫn đầy đủ đến hình ảnh đó
// Nếu không có đường dẫn hình ảnh, nó sẽ trả về đường dẫn đến hình ảnh mặc định là /placeholder.png
// path?: string: đối số path là string tùy chọn (có thể undefined/null)
// : string: kết quả trả về là kiểu string (một URL ảnh đầy đủ)
export const getImageUrl = (path?: string): string => {
  // Nếu không có đường dẫn hình ảnh, trả về đường dẫn đến hình ảnh mặc định
  if (!path) return "/error.png";
  // Trả về đường dẫn đầy đủ đến hình ảnh bằng cách nối BASE_IMAGE_URL với đường dẫn hình ảnh
  return `${BASE_IMAGE_URL}${path}`;
};
