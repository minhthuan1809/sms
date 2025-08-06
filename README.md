# SMS System - Ứng dụng Gửi SMS

## 📁 Cấu trúc thư mục mới (Tổ chức theo chuẩn)

```
src/
├── pages/              # Các trang chính
│   └── Login.tsx       # Trang đăng nhập
├── layouts/            # Layout components
│   └── DashboardLayout.tsx  # Layout chính với sidebar
├── components/         # UI Components
│   ├── SMSSender.tsx   # Form gửi SMS
│   ├── SMSHistory.tsx  # Lịch sử SMS
│   └── SMSStats.tsx    # Thống kê SMS
├── routes/             # Routing & Navigation
│   └── ProtectedRoute.tsx  # Bảo vệ route cần đăng nhập
├── types/              # TypeScript type definitions
│   └── index.ts        # Tất cả interfaces và types
├── utils/              # Utility functions & constants
│   └── constants.ts    # Constants và configuration
├── hooks/              # Custom React hooks
│   └── useAuth.ts      # Authentication hook
├── App.tsx             # Component gốc với routing
├── App.css             # CSS tùy chỉnh
├── index.css           # CSS global với Tailwind
└── main.tsx           # Entry point
```

## 🎯 Chức năng từng thư mục

### 📄 **pages/** - Các trang chính
- **Login.tsx**: Trang đăng nhập với form validation
- Chứa các trang độc lập, có thể truy cập trực tiếp

### 🏗️ **layouts/** - Layout components
- **DashboardLayout.tsx**: Layout chính với sidebar navigation
- Chứa các layout tái sử dụng cho nhiều trang

### 🧩 **components/** - UI Components
- **SMSSender.tsx**: Form gửi SMS với validation
- **SMSHistory.tsx**: Bảng hiển thị lịch sử SMS
- **SMSStats.tsx**: Thống kê và biểu đồ
- Chứa các component UI có thể tái sử dụng

### 🛣️ **routes/** - Routing & Navigation
- **ProtectedRoute.tsx**: Bảo vệ route cần xác thực
- Chứa logic routing và navigation

### 📝 **types/** - TypeScript Definitions
- **index.ts**: Tất cả interfaces và types
- Định nghĩa types cho SMS, User, Menu, etc.

### 🔧 **utils/** - Utilities & Constants
- **constants.ts**: Constants, configuration, API endpoints
- Chứa các giá trị cố định và helper functions

### 🎣 **hooks/** - Custom React Hooks
- **useAuth.ts**: Authentication management
- Chứa các custom hooks tái sử dụng

## 🔄 Luồng hoạt động mới

```
1. User truy cập → pages/Login.tsx
2. Đăng nhập thành công → layouts/DashboardLayout.tsx
3. DashboardLayout render các components:
   - components/SMSSender.tsx
   - components/SMSHistory.tsx  
   - components/SMSStats.tsx
4. ProtectedRoute bảo vệ tất cả routes cần auth
```

## 🎨 UI/UX Features

### **Ant Design Components:**
- Layout, Menu, Card, Form, Input, Button
- Table, Tag, Select, DatePicker, Upload
- Statistic, Progress, Typography
- Message, Dropdown, Avatar

### **Tailwind CSS:**
- Responsive design
- Custom styling cho components
- Shadow, border radius, spacing
- Color scheme nhất quán

### **Sonner Toast:**
- Thông báo thành công/thất bại
- Rich colors và animations
- Position: top-right

## 🔧 Cấu hình

### **Dependencies:**
```json
{
  "antd": "^5.x.x",
  "@ant-design/icons": "^5.x.x", 
  "react-router-dom": "^6.x.x",
  "sonner": "^1.x.x",
  "tailwindcss": "^3.x.x"
}
```

### **Routing:**
- `/` → pages/Login.tsx
- `/dashboard` → layouts/DashboardLayout.tsx (protected)
- `*` → Redirect to login

### **Authentication:**
- Sử dụng localStorage để lưu trạng thái đăng nhập
- ProtectedRoute bảo vệ các route cần xác thực
- Auto redirect khi chưa đăng nhập

## 📱 Responsive Design

- **Desktop**: Sidebar cố định, content area rộng
- **Tablet**: Sidebar có thể thu gọn
- **Mobile**: Sidebar overlay, stacked layout

## 🚀 Cách chạy

```bash
npm install
npm run dev
```

**Demo account:**
- Username: admin
- Password: admin123

## 🏗️ Lợi ích của cấu trúc mới

### **Tách biệt rõ ràng:**
- **pages/**: Chỉ chứa các trang chính
- **layouts/**: Chỉ chứa layout components
- **components/**: Chỉ chứa UI components
- **routes/**: Chỉ chứa logic routing
- **types/**: Chỉ chứa type definitions
- **utils/**: Chỉ chứa utilities và constants
- **hooks/**: Chỉ chứa custom hooks

### **Dễ bảo trì:**
- Mỗi thư mục có mục đích rõ ràng
- Dễ tìm và sửa code
- Tái sử dụng components tốt hơn

### **Scalable:**
- Dễ thêm tính năng mới
- Dễ mở rộng team
- Dễ test từng phần
