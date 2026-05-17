# SkyPark - Parking Management UI

SkyPark là giao diện mô phỏng hệ thống quản lý bãi giữ xe, được xây dựng bằng **ReactJS** và **Vite**. Dự án tập trung vào phần UI/UX cho các vai trò chính trong hệ thống như quản lý bãi xe, nhân viên bãi xe, người gửi xe và quản trị viên hệ thống.

## Mục tiêu dự án

Dự án được tạo ra nhằm mô phỏng quy trình vận hành của một hệ thống quản lý bãi giữ xe hiện đại, bao gồm theo dõi slot đỗ xe, xử lý xe vào/ra, quản lý bảng giá, báo cáo doanh thu và xử lý các trường hợp ngoại lệ.

## Công nghệ sử dụng

- ReactJS
- Vite
- JavaScript
- Tailwind CSS
- Lucide React
- Recharts
- React Router DOM

## Chức năng chính

### Parking Manager

- Xem dashboard tổng quan tình trạng bãi xe
- Quản lý thông tin tòa nhà gửi xe
- Quản lý loại phương tiện
- Quản lý phân tầng theo loại xe
- Theo dõi slot đỗ xe và trạng thái slot
- Quản lý bảng giá và chính sách tính phí
- Xem báo cáo lượt xe vào/ra, doanh thu và tỷ lệ lấp đầy
- Theo dõi các trường hợp nâng cao như mất vé, sai biển số, quá giờ hoặc chưa thanh toán

### Parking Staff

- Hỗ trợ xử lý xe vào bãi
- Nhập hoặc kiểm tra biển số xe
- Tạo lượt gửi xe
- Xử lý xe ra bãi
- Theo dõi và xử lý các trường hợp ngoại lệ

### Driver / User

- Xem thông tin bãi xe
- Gửi xe
- Đặt chỗ trước
- Theo dõi lượt gửi xe hiện tại
- Thanh toán phí gửi xe
- Gửi phản hồi cho hệ thống

### System Admin

- Quản lý tài khoản người dùng
- Phân quyền theo vai trò
- Cấu hình thông tin hệ thống

## Cấu trúc thư mục

```txt
parking-management/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   └── ui.jsx
│   ├── content/
│   │   ├── Admin.jsx
│   │   ├── Manager.jsx
│   │   ├── Staff.jsx
│   │   └── User.jsx
│   ├── data/
│   │   └── mock.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── package.json
├── vite.config.js
└── README.md
```

## Giải thích thư mục chính

| Thư mục / File | Vai trò |
|---|---|
| `src/main.jsx` | Điểm bắt đầu của React app, render component `App` vào HTML |
| `src/App.jsx` | Quản lý layout chính, sidebar, role hiện tại và menu đang chọn |
| `src/components/ui.jsx` | Chứa các component UI dùng lại như Card, Button, Input, Table |
| `src/content/` | Chứa giao diện riêng cho từng vai trò trong hệ thống |
| `src/data/mock.js` | Chứa dữ liệu giả dùng để hiển thị giao diện demo |
| `src/index.css` | Chứa style global và cấu hình Tailwind CSS |

## Cách cài đặt và chạy dự án

### 1. Clone repository

```bash
git clone https://github.com/thanhphuongk18/parking-management.git
```

### 2. Di chuyển vào thư mục project

```bash
cd parking-management
```

### 3. Cài đặt thư viện

```bash
npm install
```

### 4. Chạy project ở môi trường development

```bash
npm run dev
```

Sau đó mở trình duyệt và truy cập địa chỉ được Vite hiển thị trong terminal, thường là:

```txt
http://localhost:5173
```

## Các lệnh thường dùng

| Lệnh | Ý nghĩa |
|---|---|
| `npm install` | Cài đặt thư viện cần thiết |
| `npm run dev` | Chạy project ở local |
| `npm run build` | Build project để chuẩn bị deploy |
| `npm run preview` | Xem thử bản build |
| `npm run lint` | Kiểm tra lỗi lint trong code |

## Flow chạy code

```txt
npm run dev
   ↓
Vite khởi chạy project
   ↓
main.jsx render App.jsx
   ↓
App.jsx xác định role hiện tại
   ↓
App.jsx lấy danh sách menu theo role
   ↓
Người dùng chọn role hoặc menu
   ↓
State trong App.jsx thay đổi
   ↓
React render lại giao diện tương ứng
   ↓
Nội dung được lấy từ ManagerContent, StaffContent, UserContent hoặc AdminContent
```

## Trạng thái dữ liệu

Hiện tại dự án đang sử dụng **mock data** trong file `src/data/mock.js`. Điều này có nghĩa là dữ liệu chỉ dùng để demo giao diện, chưa kết nối backend hoặc database thật.

Trong tương lai có thể nâng cấp thêm:

- API backend để đăng nhập và phân quyền thật
- Database để lưu thông tin xe, slot, lượt gửi và hóa đơn
- Chức năng CRUD cho slot, loại xe, bảng giá và tài khoản
- Xác thực người dùng bằng JWT hoặc session
- Deploy project lên Vercel, Netlify hoặc server riêng

## Ghi chú

Đây là project UI prototype phục vụ học tập và trình bày ý tưởng hệ thống quản lý bãi giữ xe. Project chưa phải là hệ thống production hoàn chỉnh, nhưng đã có cấu trúc tốt để tiếp tục mở rộng thành ứng dụng thực tế.
