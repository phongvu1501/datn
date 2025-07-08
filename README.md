# 🛒 CMS Quản Lý Sản Phẩm

Dự án xây dựng hệ thống CMS (Content Management System) quản lý sản phẩm với đầy đủ chức năng:

- Đăng ký, đăng nhập sử dụng **JWT**
- Bảo mật mật khẩu bằng **bcrypt**
- CRUD sản phẩm
- Tìm kiếm, phân trang phía server
- Giao diện chế độ **Sáng / Tối (Dark Mode)**

---

## 📁 Cấu trúc dự án

```
cms-product-management/
├── backend/     # Sails.js API
├── frontend/    # React UI
└── README.md
```

---

## 🚀 1. Hướng dẫn cài đặt & chạy

### 1.1. Yêu cầu môi trường

- **Node.js** >= 18
- **MongoDB** (local hoặc Atlas)
- **Yarn** hoặc **npm**
- **Sails.js** (global):
  ```bash
  npm install -g sails
  ```

---

### 1.2. Backend (Sails.js)

```bash
cd backend
npm install
```

🔧 Cấu hình `config/datastores.js` hoặc `.env`:

```js
module.exports.datastores = {
  default: {
    adapter: 'sails-mongo',
    url: 'mongodb://localhost:27017/product_cms'
  },
};
```

👉 Chạy server backend:

```bash
sails lift
```

---

### 1.3. Frontend (React)

```bash
cd frontend
npm install
```

👉 Chạy giao diện React:

```bash
npm run dev
```

Truy cập tại: [http://localhost:5173](http://localhost:5173)

---

## 🔐 2. Tính năng đã triển khai

### Người dùng:
- ✅ Đăng ký, Đăng nhập, Đăng xuất
- ✅ Mã hóa mật khẩu bằng **bcrypt**
- ✅ Xác thực người dùng bằng **JWT**
- ✅ Lưu token vào `localStorage`
- ✅ Gửi token tự động trong mỗi request

### Sản phẩm:
- ✅ Tạo, sửa, xóa, hiển thị danh sách
- ✅ Tìm kiếm theo tên (server-side)
- ✅ Phân trang (server-side)
- ✅ Hiển thị ảnh sản phẩm (nếu có)

### Giao diện:
- ✅ Giao diện đơn giản với **Bootstrap**
- ✅ Chuyển đổi **Dark / Light Mode**

---

## 📦 3. Cấu trúc backend

```
backend/
├── api/
│   ├── controllers/
│   │   ├── ProductController.js
│   │   └── UserController.js
│   ├── models/
│   │   ├── Product.js
│   │   └── User.js
│   ├── policies/
│   │   └── isAuthenticated.js
│   └── helpers/
│       ├── generate-jwt.js
│       └── compare-password.js
├── config/
│   ├── routes.js
│   └── datastores.js
```

---

## 💡 4. Gợi ý phát triển tiếp theo

### 🎯 Tính năng nâng cao
- [ ] Phân quyền người dùng (Admin / Người dùng)
- [ ] Refresh Token để giữ đăng nhập lâu dài
- [ ] Quản lý khách hàng và đơn hàng
- [ ] Upload ảnh sản phẩm lên **Cloudinary** hoặc **S3**
- [ ] Biểu đồ thống kê (sử dụng Chart.js, Recharts)
- [ ] Hệ thống thông báo realtime (WebSocket, Pusher)

### 🌍 Triển khai production
- Đóng gói frontend bằng:
  ```bash
  npm run build
  ```
- Dùng `nginx` để serve frontend & reverse proxy API
- Chạy backend bằng **PM2**:
  ```bash
  pm2 start app.js
  ```

---

## 📫 Liên hệ & Đóng góp

Nếu bạn có bất kỳ đóng góp hoặc thắc mắc nào, vui lòng tạo issue hoặc pull request tại repo GitHub.


