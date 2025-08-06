# 📋 Cấu trúc chi tiết SMS System

## 🏗️ Kiến trúc tổng thể

```
┌─────────────────────────────────────────────────────────────┐
│                    App.tsx (Root)                         │
│  ┌─────────────────┐  ┌─────────────────────────────────┐ │
│  │   Login.tsx     │  │      ProtectedRoute.tsx        │ │
│  │   (Public)      │  │        Dashboard.tsx           │ │
│  └─────────────────┘  │  ┌─────────────────────────────┐ │
│                       │  │        Sidebar              │ │
│                       │  │  ┌─────────────────────────┐ │ │
│                       │  │  │     Header             │ │ │
│                       │  │  └─────────────────────────┘ │ │
│                       │  │  ┌─────────────────────────┐ │ │
│                       │  │  │     Content Area       │ │ │
│                       │  │  │  ┌─────────────────────┐ │ │ │
│                       │  │  │  │   SMSSender.tsx    │ │ │ │
│                       │  │  │  │   SMSHistory.tsx   │ │ │ │
│                       │  │  │  │   SMSStats.tsx     │ │ │ │
│                       │  │  │  └─────────────────────┘ │ │ │
│                       │  │  └─────────────────────────┘ │ │
│                       │  └─────────────────────────────┘ │
│                       └─────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 📂 Chi tiết từng Component

### 🔐 **Login.tsx** - Authentication Layer
```
┌─────────────────────────────────────┐
│           Login Form                │
│  ┌───────────────────────────────┐  │
│  │  Username Input              │  │
│  │  Password Input              │  │
│  │  Login Button                │  │
│  │  Demo: admin/admin123        │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

### 🏠 **Dashboard.tsx** - Main Layout
```
┌─────────────────────────────────────────────────────────────┐
│                    Header                                  │
│  [Logo] SMS System                    [User] [Dropdown]   │
├─────────────────────────────────────────────────────────────┤
│ Sidebar │                    Content Area                 │
│ ┌─────┐ │  ┌─────────────────────────────────────────────┐ │
│ │Menu │ │  │                                             │ │
│ │├Send│ │  │                                             │ │
│ │├Hist│ │  │                                             │ │
│ │└Stat│ │  │                                             │ │
│ └─────┘ │  └─────────────────────────────────────────────┘ │
└─────────┴──────────────────────────────────────────────────┘
```

### 📤 **SMSSender.tsx** - SMS Form
```
┌─────────────────────────────────────────────────────────────┐
│                    SMS Sender Form                        │
├─────────────────────────────────────────────────────────────┤
│ Main Form (16 cols) │        Options (8 cols)           │
│ ┌─────────────────┐ │  ┌─────────────────────────────────┐ │
│ │ Sender Select   │ │  │ Upload Phone Numbers           │ │
│ │ Schedule Time   │ │  │ File: .txt, .csv              │ │
│ │ Phone Numbers   │ │  │                               │ │
│ │ Message Content │ │  │ Notes & Guidelines            │ │
│ │ [160 chars max] │ │  │                               │ │
│ └─────────────────┘ │  └─────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│              [Reset] [Send SMS (X messages)]              │
└─────────────────────────────────────────────────────────────┘
```

### 📋 **SMSHistory.tsx** - History Table
```
┌─────────────────────────────────────────────────────────────┐
│                    SMS History                            │
├─────────────────────────────────────────────────────────────┤
│ Search & Filters                                          │
│ [Search] [Date Range] [Status] [Sender] [Export]         │
├─────────────────────────────────────────────────────────────┤
│                    Data Table                             │
│ ┌─────┬─────────────┬─────────────┬─────────┬──────────┐ │
│ │ ID  │ Phone       │ Message     │ Sender  │ Status   │ │
│ ├─────┼─────────────┼─────────────┼─────────┼──────────┤ │
│ │ 1   │ 0123456789  │ Welcome...  │ System  │ Success  │ │
│ │ 2   │ 0987654321  │ Thank you   │ Service │ Success  │ │
│ │ 3   │ 0555666777  │ Promotion   │ Marketing│ Failed   │ │
│ └─────┴─────────────┴─────────────┴─────────┴──────────┘ │
├─────────────────────────────────────────────────────────────┤
│                    Pagination                             │
└─────────────────────────────────────────────────────────────┘
```

### 📊 **SMSStats.tsx** - Statistics Dashboard
```
┌─────────────────────────────────────────────────────────────┐
│                    SMS Statistics                         │
├─────────────────────────────────────────────────────────────┤
│                    Main Stats                             │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌──────┐ │
│ │ Total Sent  │ │ Success %   │ │ Failed %    │ │Pending│ │
│ │   1,250     │ │   94.5%     │ │   3.2%      │ │ 2.3%  │ │
│ └─────────────┘ └─────────────┘ └─────────────┘ └──────┘ │
├─────────────────────────────────────────────────────────────┤
│                    Charts & Tables                        │
│ ┌─────────────────────┐ ┌─────────────────────────────┐   │
│ │   Progress Circle   │ │   Time-based Stats         │   │
│ │    [94.5%]         │ │   Today: 45 SMS            │   │
│ │                     │ │   Week: 320 SMS            │   │
│ │                     │ │   Month: 1,250 SMS         │   │
│ └─────────────────────┘ └─────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│                    Top Senders Table                      │
│ ┌─────────────┬─────────────┬─────────────┬─────────────┐ │
│ │ Sender      │ Total Sent  │ Success %   │ Percentage  │ │
│ ├─────────────┼─────────────┼─────────────┼─────────────┤ │
│ │ SMS System  │     450     │   96.2%     │ [████████]  │ │
│ │ Customer    │     380     │   93.8%     │ [██████  ]  │ │
│ │ Marketing   │     420     │   91.5%     │ [███████ ]  │ │
│ └─────────────┴─────────────┴─────────────┴─────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow

```
1. User Input → Validation → API Call → Success/Error Toast
2. Login → localStorage.setItem() → Redirect to Dashboard
3. Dashboard → Menu Selection → Component Rendering
4. SMS Form → Phone Numbers → Message Count → Send → History
5. History → Search/Filter → Table Display → Export
6. Stats → Mock Data → Charts/Tables → Real-time Updates
```

## 🎨 UI Components Hierarchy

```
Ant Design Components:
├── Layout (Dashboard)
│   ├── Sider (Sidebar)
│   ├── Header (Top bar)
│   └── Content (Main area)
├── Form (SMSSender)
│   ├── Input/TextArea
│   ├── Select
│   ├── Upload
│   └── Button
├── Table (SMSHistory)
│   ├── Columns
│   ├── Pagination
│   └── Search/Filter
└── Statistics (SMSStats)
    ├── Statistic
    ├── Progress
    └── Card
```

## 🔐 Authentication Flow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Login     │───▶│  Validate   │───▶│  Success    │
│   Form      │    │  Credentials│    │  Redirect   │
└─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │
       ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Error     │    │  Loading    │    │  Dashboard  │
│   Message   │    │  State      │    │  Protected  │
└─────────────┘    └─────────────┘    └─────────────┘
```

## 📱 Responsive Breakpoints

```
Desktop (≥1024px): Sidebar fixed, full layout
Tablet (768px-1023px): Collapsible sidebar
Mobile (<768px): Sidebar overlay, stacked layout
```

## 🎯 Key Features Summary

| Component | Primary Function | Key Features |
|-----------|-----------------|--------------|
| Login | Authentication | Form validation, demo credentials |
| Dashboard | Layout & Navigation | Sidebar, header, content area |
| SMSSender | SMS Composition | Multi-phone, file upload, scheduling |
| SMSHistory | Data Display | Search, filter, pagination, export |
| SMSStats | Analytics | Charts, tables, real-time stats |
| ProtectedRoute | Security | Route protection, auth check | 