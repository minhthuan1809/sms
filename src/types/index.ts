// Authentication types
export interface LoginForm {
  username: string;
  password: string;
}

// SMS types
export interface SMSForm {
  phoneNumbers: string[];
  message: string;
  sender: string;
  scheduleTime?: string;
}

export interface SMSRecord {
  id: string;
  phoneNumber: string;
  message: string;
  status: 'success' | 'failed' | 'pending';
  sender: string;
  sentAt: string;
  deliveryStatus: 'delivered' | 'failed' | 'pending';
}

export interface TopSender {
  sender: string;
  totalSent: number;
  successRate: number;
  percentage: number;
}

// Menu types
export interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
}

// User types
export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
} 