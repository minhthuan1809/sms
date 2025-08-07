import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import MenuComponent from '../components/Menu';

const { Header, Content } = Layout;

const DashboardLayout: React.FC = () => {


  return (
    <Layout className="min-h-screen overflow-hidden">
      {/* Sidebar */}
      <MenuComponent />

      <Layout className="overflow-auto">
        {/* Header */}
        <Header className="bg-white shadow-sm px-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
          
            <h2 className="text-lg font-semibold text-gray-800">
             Tổng quan
            </h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Admin</span>
            
          </div>
        </Header>

        {/* Main Content */}
        <Content className="p-2 bg-gray-50">
          <div className="bg-white rounded-lg shadow-sm p-2">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout; 