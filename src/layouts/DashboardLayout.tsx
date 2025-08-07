import React, { useState } from 'react';
import { Layout, Avatar, Dropdown, Button, Menu } from 'antd';
import { 
  UserOutlined, 
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import { useNavigate, Outlet } from 'react-router-dom';
import { toast } from 'sonner';
import MenuComponent from '../components/Menu';

const { Header, Content } = Layout;

const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
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
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="min-h-screen">
      {/* Sidebar */}
      <MenuComponent />

      <Layout>
        {/* Header */}
        <Header className="bg-white shadow-sm px-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="text-gray-600 hover:text-blue-600"
            />
            <h2 className="text-lg font-semibold text-gray-800">
              SMS System Dashboard
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
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout; 