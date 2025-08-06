import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown } from 'antd';
import { 
  SendOutlined, 
  MessageOutlined, 
  UserOutlined, 
  LogoutOutlined,
  DashboardOutlined,
  HistoryOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import SMSSender from '../components/SMSSender';
import SMSHistory from '../components/SMSHistory';
import SMSStats from '../components/SMSStats';

const { Header, Sider, Content } = Layout;

const DashboardLayout: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('send');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    toast.success('Đăng xuất thành công!');
    navigate('/');
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Hồ sơ
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        Cài đặt
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  const menuItems = [
    {
      key: 'send',
      icon: <SendOutlined />,
      label: 'Gửi SMS',
    },
    {
      key: 'history',
      icon: <HistoryOutlined />,
      label: 'Lịch sử',
    },
    {
      key: 'stats',
      icon: <DashboardOutlined />,
      label: 'Thống kê',
    },
  ];

  const renderContent = () => {
    switch (selectedMenu) {
      case 'send':
        return <SMSSender />;
      case 'history':
        return <SMSHistory />;
      case 'stats':
        return <SMSStats />;
      default:
        return <SMSSender />;
    }
  };

  return (
    <Layout className="min-h-screen">
      {/* Sidebar */}
      <Sider 
        width={250} 
        className="bg-white shadow-lg"
        theme="light"
      >
        <div className="p-6">
          <div className="flex items-center mb-8">
            <MessageOutlined className="text-2xl text-blue-600 mr-3" />
            <h1 className="text-xl font-bold text-gray-800">SMS System</h1>
          </div>
          
          <Menu
            mode="inline"
            selectedKeys={[selectedMenu]}
            items={menuItems}
            onClick={({ key }) => setSelectedMenu(key)}
            className="border-0"
          />
        </div>
      </Sider>

      <Layout>
        {/* Header */}
        <Header className="bg-white shadow-sm px-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {selectedMenu === 'send' && 'Gửi SMS'}
              {selectedMenu === 'history' && 'Lịch sử SMS'}
              {selectedMenu === 'stats' && 'Thống kê'}
            </h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Admin</span>
            <Dropdown overlay={userMenu} placement="bottomRight">
              <Avatar 
                icon={<UserOutlined />} 
                className="cursor-pointer bg-blue-500"
              />
            </Dropdown>
          </div>
        </Header>

        {/* Main Content */}
        <Content className="p-6 bg-gray-50">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {renderContent()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout; 