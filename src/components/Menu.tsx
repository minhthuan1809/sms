import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu, Badge } from 'antd';
import {
  SendOutlined,
  HistoryOutlined,
  UserOutlined,
  SettingOutlined,
  DashboardOutlined,
  MessageOutlined,
  FileTextOutlined,
  ContactsOutlined,
  ProfileOutlined,
  KeyOutlined,
  SafetyCertificateOutlined,
  CrownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

interface MenuItem {
  key: string;
  label: string;
  path: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
  badge?: number;
  type?: 'group' | 'tab';
}

const getItem = (label: React.ReactNode, key: string, icon?: React.ReactNode, children?: MenuItem[]) => {
  return {
    key,
    icon,
    children,
    label
  };
};


const MenuComponent: React.FC = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string>('');
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const menuItems: MenuItem[] = [
    {
      key: 'dashboard',
      label: 'Tổng quan',
      path: '/',
      icon: <DashboardOutlined />,
      type: 'group'
    },
    {
      key: 'sms-group',
      label: 'Quản lý SMS',
      path: '#',
      icon: <MessageOutlined />,
      type: 'group',
      children: [
        {
          key: 'send',
          label: 'Gửi SMS',
          path: '/dashboard/send',
          type: 'tab',
          icon: <SendOutlined />
        },
        {
          key: 'history',
          label: 'Lịch sử SMS',
          path: '/dashboard/history',
          type: 'tab',
          icon: <HistoryOutlined />,
          badge: 5
        },
        {
          key: 'templates',
          label: 'Mẫu tin nhắn',
          path: '/dashboard/templates',
          type: 'tab',
          icon: <FileTextOutlined />
        },
        {
          key: 'contacts',
          label: 'Danh bạ',
          path: '/dashboard/contacts',
          type: 'tab',
          icon: <ContactsOutlined />
        }
      ]
    },
    {
      key: 'settings-group',
      label: 'Cài đặt',
      path: '#',
      icon: <SettingOutlined />,
      type: 'group',
      children: [
        {
          key: 'profile',
          label: 'Hồ sơ cá nhân',
          path: '/dashboard/profile',
          type: 'tab',
          icon: <ProfileOutlined />
        },
        {
          key: 'api-settings',
          label: 'Cài đặt API',
          path: '/dashboard/api-settings',
          type: 'tab',
          icon: <KeyOutlined />
        },
      ]
    },
    {
      key: 'admin-group',
      label: 'Quản trị hệ thống',
      path: '#',
      icon: <CrownOutlined />,
      type: 'group',
      children: [
        {
          key: 'users',
          label: 'Quản lý người dùng',
          path: '/dashboard/admin/users',
          type: 'tab',
          icon: <UserOutlined />
        },
        {
          key: 'roles',
          label: 'Phân quyền',
          path: '/dashboard/admin/roles',
          type: 'tab',
          icon: <SafetyCertificateOutlined />
        }
      ]
    }
  ];

  const renderMenu = (items: MenuItem[]): any[] => {
    return items
      .map(item => {
        const labelWithBadge = item.badge ? (
          <div className="flex justify-between items-center w-full">
            <Link className="text-inherit no-underline" to={item.path}>
              {item.label}
            </Link>
            <Badge count={item.badge} size="small" className="bg-blue-500" />
          </div>
        ) : (
          <Link className="text-inherit no-underline" to={item.path}>
            {item.label}
          </Link>
        );

        if (item.children && item.children.length > 0) {
          return getItem(
            labelWithBadge,
            item.key,
            item.icon,
            renderMenu(item.children)
          );
        }
        return getItem(
          labelWithBadge,
          item.key,
          item.icon
        );
      });
  };

  const routes = renderMenu(menuItems);

  const items = useMemo(() => {
    return routes;
  }, [routes]);

  const onOpenChange = useCallback((keys: string[]) => {
    // Chỉ cho phép mở một submenu tại một thời điểm
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (latestOpenKey) {
      setOpenKeys([latestOpenKey]);
    } else {
      setOpenKeys([]);
    }
  }, [openKeys]);

  const onClick = useCallback((keys: any) => {
    console.log('Menu clicked:', keys);
  }, []);

  const menu = useMemo(() => {
    return (
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        defaultOpenKeys={openKeys}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        onClick={onClick}
        items={items}
        className="bg-white border-r-0"
      />
    );
  }, [selectedKey, openKeys, onOpenChange, items]);

  const findKeyAndOpenKey = (pathname: string) => {
    let selectedKey = '';
    let openKey = '';

    const traverse = (items: MenuItem[], parentKey: string) => {
      for (const item of items) {
        if (item.children) {
          traverse(item.children, item.key);
        }
        // So sánh path thay vì key
        const isCheckActiveKey = item.path === pathname;
        if (isCheckActiveKey) {
          selectedKey = item.key;
          openKey = parentKey;
        }
      }
    };
    traverse(menuItems, '');
    return { selectedKey, openKey };
  };

  useEffect(() => {
    const { selectedKey, openKey } = findKeyAndOpenKey(location.pathname);
    
    if (location.pathname === '/dashboard' && !selectedKey) {
      setSelectedKey('dashboard');
      setOpenKeys([]);
    } else {
      setSelectedKey(selectedKey);
      if (Array.isArray(openKey)) {
        setOpenKeys(openKey?.length > 0 ? openKey : []);
      } else {
        setOpenKeys(openKey ? [openKey] : []);
      }
    }
  }, [location.pathname]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider 
      collapsible 
      collapsed={collapsed} 
      onCollapse={setCollapsed}
      trigger={null}
      width={280}
      collapsedWidth={70}
      className=" bg-white shadow-sm border-r border-gray-100 min-h-screen"
    >
      {/* Header */}
      <div className="p-2 border-b border-gray-100 bg-white relative">
        <div className="flex items-center justify-center relative z-10">
          <div className={`font-semibold text-gray-800 text-center transition-all duration-300 ${collapsed ? 'text-base' : 'text-lg'}`}>
            <span className="text-blue-600">
              {collapsed ? 'SMS' : 'SMS System'}
            </span>
          </div>
        </div>
        
        {/* Collapse Button */}
        <button 
          onClick={toggleCollapsed}
          className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-blue-500 border border-white rounded-full text-white flex items-center justify-center text-xs shadow-md hover:bg-blue-600 hover:shadow-lg transition-all duration-200 z-20"
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </button>
      </div>

      {/* Menu Container */}
      <div className="py-3 h-full overflow-y-auto overflow-x-hidden">
        <style>
          {`
            .ant-menu-light {
              background: white !important;
              border-right: none !important;
            }
            
            .ant-menu-light .ant-menu-item {
              margin: 2px 8px !important;
              border-radius: 12px !important;
              height: 44px !important;
              line-height: 44px !important;
              color: #64748b !important;
              font-weight: 500 !important;
              border: none !important;
              transition: all 0.2s ease !important;
              padding-left: 16px !important;
              padding-right: 16px !important;
            }
            
            .ant-menu-light .ant-menu-item:hover {
              background: #f8fafc !important;
              color: #3b82f6 !important;
              transform: translateX(2px) !important;
            }
            
            .ant-menu-light .ant-menu-item-selected {
              background: #eff6ff !important;
              color: #3b82f6 !important;
              font-weight: 600 !important;
              box-shadow: 0 1px 3px rgba(59, 130, 246, 0.1) !important;
            }
            
            .ant-menu-light .ant-menu-submenu-title {
              margin: 2px 8px !important;
              border-radius: 12px !important;
              height: 44px !important;
              line-height: 44px !important;
              color: #64748b !important;
              font-weight: 500 !important;
              border: none !important;
              transition: all 0.2s ease !important;
              padding-left: 16px !important;
              padding-right: 16px !important;
            }
            
            .ant-menu-light .ant-menu-submenu-title:hover {
              background: #f8fafc !important;
              color: #3b82f6 !important;
              transform: translateX(2px) !important;
            }
            
            .ant-menu-light .ant-menu-submenu-open > .ant-menu-submenu-title {
              background: #f8fafc !important;
              color: #3b82f6 !important;
              font-weight: 600 !important;
            }
            
            .ant-menu-light .ant-menu-sub.ant-menu-inline {
              background: transparent !important;
              border-radius: 0 !important;
              margin: 0 8px 0 16px !important;
              border: none !important;
              padding: 4px 0 !important;
            }
            
            .ant-menu-light .ant-menu-sub .ant-menu-item {
              margin: 2px 0 !important;
              border-radius: 10px !important;
              height: 38px !important;
              line-height: 38px !important;
              font-size: 13px !important;
              color: #64748b !important;
              padding-left: 20px !important;
              padding-right: 16px !important;
            }
            
            .ant-menu-light .ant-menu-item .ant-menu-item-icon,
            .ant-menu-light .ant-menu-submenu-title .ant-menu-item-icon {
              font-size: 16px !important;
              transition: all 0.2s ease !important;
              margin-right: 12px !important;
              opacity: 0.8 !important;
            }
            
            .ant-menu-light .ant-menu-item:hover .ant-menu-item-icon,
            .ant-menu-light .ant-menu-submenu-title:hover .ant-menu-item-icon {
              opacity: 1 !important;
              transform: scale(1.05) !important;
            }
            
            .ant-menu-light .ant-menu-item-selected .ant-menu-item-icon {
              opacity: 1 !important;
            }
            
            .ant-badge-count {
              background: #3b82f6 !important;
              box-shadow: 0 0 0 1px #ffffff !important;
              font-size: 10px !important;
              height: 16px !important;
              min-width: 16px !important;
              line-height: 16px !important;
            }
          `}
        </style>
        {menu}
      </div>
    </Sider>
  );
};

export default MenuComponent;