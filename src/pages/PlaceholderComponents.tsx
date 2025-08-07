import React from 'react';
import { Card, Typography, Space } from 'antd';

const { Title } = Typography;

// Generic placeholder component
const PlaceholderComponent: React.FC<{ title: string }> = ({ title }) => (
  <Card>
    <Space direction="vertical" style={{ width: '100%' }}>
      <Title level={2}>{title}</Title>
      <p>This page is under development.</p>
    </Space>
  </Card>
);

// Export all placeholder components
export const Profile = () => <PlaceholderComponent title="Profile" />;
export const ChangePassword = () => <PlaceholderComponent title="Change Password" />;
export const Settings = () => <PlaceholderComponent title="Settings" />;

// SMS Management
export const SMSTemplates = () => <PlaceholderComponent title="SMS Templates" />;
export const SMSContacts = () => <PlaceholderComponent title="SMS Contacts" />;
export const SMSBulk = () => <PlaceholderComponent title="Bulk SMS" />;
export const SMSScheduled = () => <PlaceholderComponent title="Scheduled SMS" />;

// Analytics
export const Analytics = () => <PlaceholderComponent title="Analytics" />;
export const Reports = () => <PlaceholderComponent title="Reports" />;
export const Performance = () => <PlaceholderComponent title="Performance" />;

// Customers
export const CustomerList = () => <PlaceholderComponent title="Customer List" />;
export const CustomerGroups = () => <PlaceholderComponent title="Customer Groups" />;
export const CustomerImport = () => <PlaceholderComponent title="Customer Import" />;

// Campaigns
export const Campaigns = () => <PlaceholderComponent title="Campaigns" />;
export const CampaignDetail = () => <PlaceholderComponent title="Campaign Detail" />;
export const CampaignCreate = () => <PlaceholderComponent title="Create Campaign" />;

// Billing
export const Balance = () => <PlaceholderComponent title="Balance" />;
export const Transactions = () => <PlaceholderComponent title="Transactions" />;
export const Billing = () => <PlaceholderComponent title="Billing" />;
export const Pricing = () => <PlaceholderComponent title="Pricing" />;

// Settings
export const Security = () => <PlaceholderComponent title="Security" />;
export const APISettings = () => <PlaceholderComponent title="API Settings" />;
export const Notifications = () => <PlaceholderComponent title="Notifications" />;
export const Integrations = () => <PlaceholderComponent title="Integrations" />;

// Admin
export const UserManagement = () => <PlaceholderComponent title="User Management" />;
export const Roles = () => <PlaceholderComponent title="Roles" />;
export const SystemLogs = () => <PlaceholderComponent title="System Logs" />;
export const SystemSettings = () => <PlaceholderComponent title="System Settings" />;

// Support
export const Help = () => <PlaceholderComponent title="Help" />;
export const FAQ = () => <PlaceholderComponent title="FAQ" />;
export const ContactSupport = () => <PlaceholderComponent title="Contact Support" />;
export const Feedback = () => <PlaceholderComponent title="Feedback" />; 