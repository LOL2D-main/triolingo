# Triolingo Download Store

Website chính thức tải ứng dụng **Triolingo** chuẩn phong cách Google Play Store.

## Cấu trúc thư mục:
- `index.html`: Trang chủ Store với 3 nền tảng (Windows, Android, Apple), 8 ảnh chụp màn hình thực tế, thống kê và hệ thống đánh giá sao (không cần đăng nhập).
- `windows.html`: Trang chi tiết tải bản Windows `.exe` (114 MB) kèm hướng dẫn cài đặt 3 bước.
- `android.html`: Trang chi tiết tải bản Android (APK & Google Play).
- `apple.html`: Hướng dẫn chi tiết tạo App Safari ra màn hình chính trên iPhone & iPad với 4 bước minh họa.
- `style.css`: Toàn bộ CSS phong cách Google Play Store, responsive, không emoji, sạch và tối ưu.
- `app.js`: Xử lý đánh giá sao, bình luận không cần đăng nhập, lưu trữ localStorage, nút hữu ích.
- `screenshots/`: 8 hình ảnh chụp thực tế các màn hình của Triolingo.
- `assets/`: Biểu tượng, mascot và logo.
- `server.js`: Máy chủ web siêu nhẹ (Node.js thuần, 0 dependency) để chạy cục bộ hoặc deploy.

## Cách sử dụng:
1. **Mở trực tiếp:** Bạn có thể nhấp đúp trực tiếp vào file `index.html` trong Windows Explorer để xem ngay trên trình duyệt mà không cần cài thêm bất cứ thứ gì.
2. **Khởi chạy máy chủ nội bộ:**
   ```bash
   node server.js
   # hoặc
   npm start
   ```
   Mở trình duyệt truy cập: `http://localhost:8080`
