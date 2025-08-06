// SMS Sender options
export const SENDER_OPTIONS = [
  { value: 'SMS_SYSTEM', label: 'SMS System' },
  { value: 'CUSTOMER_SERVICE', label: 'Customer Service' },
  { value: 'MARKETING', label: 'Marketing' },
];

// SMS Status colors
export const STATUS_COLORS = {
  success: 'green',
  failed: 'red',
  pending: 'orange',
  delivered: 'green',
} as const;

// SMS Status labels
export const STATUS_LABELS = {
  success: 'Thành công',
  failed: 'Thất bại',
  pending: 'Đang xử lý',
  delivered: 'Đã gửi',
} as const;

// Demo credentials
export const DEMO_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
};

// Local storage keys
export const STORAGE_KEYS = {
  IS_LOGGED_IN: 'isLoggedIn',
  USER_INFO: 'userInfo',
} as const;

// API endpoints (for future use)
export const API_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  SEND_SMS: '/api/sms/send',
  SMS_HISTORY: '/api/sms/history',
  SMS_STATS: '/api/sms/stats',
} as const; 