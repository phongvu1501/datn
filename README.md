#  CMS Quản Lý Sản Phẩm

Dự án xây dựng hệ thống CMS (Content Management System) quản lý sản phẩm với đầy đủ chức năng:

- Đăng ký, đăng nhập sử dụng **JWT**
- Bảo mật mật khẩu bằng **bcrypt**
- CRUD sản phẩm
- Tìm kiếm, phân trang phía server
- Giao diện chế độ **Sáng / Tối (Dark Mode)**

---

##  1. Tính năng đã triển khai

### Người dùng:
-  Đăng ký, Đăng nhập, Đăng xuất
-  Mã hóa mật khẩu bằng **bcrypt**
-  Xác thực người dùng bằng **JWT**
-  Lưu token vào `localStorage`
-  Gửi token tự động trong mỗi request

### Sản phẩm:
-  Tạo, sửa, xóa, hiển thị danh sách
-  Tìm kiếm theo tên (server-side)
-  Phân trang (server-side)
-  Hiển thị ảnh sản phẩm (nếu có)

### Giao diện:
-  Giao diện đơn giản với **Bootstrap**
-  Chuyển đổi **Dark / Light Mode**

---

##  2 Gợi ý phát triển tiếp theo

###  Tính năng nâng cao
- [ ] Phân quyền người dùng (Admin / Người dùng)
- [ ] Refresh Token để giữ đăng nhập lâu dài
- [ ] Quản lý khách hàng và đơn hàng
- [ ] Upload ảnh sản phẩm lên **Cloudinary** hoặc **S3**
- [ ] Biểu đồ thống kê (sử dụng Chart.js, Recharts)
- [ ] Hệ thống thông báo realtime (WebSocket, Pusher)

---

##  Liên hệ & Đóng góp

Nếu bạn có bất kỳ đóng góp hoặc thắc mắc nào, vui lòng tạo issue hoặc pull request tại repo GitHub.


