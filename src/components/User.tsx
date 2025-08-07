import React, { useState } from 'react';
import { Table, Input, Button, Avatar, Tag, Space, Card, Typography } from 'antd';
import { SearchOutlined, PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface UserData {
  key: number;
  name: string;
  email: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  role: string;
  status: 'active' | 'inactive';
}

const fakeUsers: UserData[] = [
  {
    key: 1,
    name: 'Minh Thuận',
    email: 'thuan@gmail.com',
    avatar: 'https://i.pravatar.cc/40?img=5',
    createdAt: '2025-05-14 07:52:15',
    updatedAt: '2025-05-14 07:51:42',
    role: 'user',
    status: 'active',
  },
  {
    key: 2,
    name: '20210533@eaut.edu.vn',
    email: '20210533@eaut.edu.vn',
    avatar: 'https://i.pravatar.cc/40?img=6',
    createdAt: '2025-05-14 08:07:28',
    updatedAt: '2025-03-16 14:41:04',
    role: 'user',
    status: 'active',
  },
  {
    key: 3,
    name: 'Nguyễn Thị Ánh',
    email: '03.ntanh@gmail.com',
    avatar: 'https://i.pravatar.cc/40?img=7',
    createdAt: '2025-03-16 14:28:41',
    updatedAt: '2025-03-16 14:28:11',
    role: 'user',
    status: 'active',
  },
  {
    key: 4,
    name: 'Anh hoàng',
    email: 'anh924571@gmail.com',
    avatar: 'https://i.pravatar.cc/40?img=8',
    createdAt: '2025-05-10 05:09:14',
    updatedAt: '2025-03-13 16:48:43',
    role: 'user',
    status: 'active',
  },
  {
    key: 5,
    name: 'Nguyễn Minh Thuận',
    email: 'thuan18092003@gmail.com',
    avatar: 'https://i.pravatar.cc/40?img=9',
    createdAt: '2025-03-15 09:05:00',
    updatedAt: '2025-03-09 23:10:52',
    role: 'super_admin',
    status: 'active',
  },
];

const User = () => {
  const [searchText, setSearchText] = useState('');

  const columns = [
    {
      title: 'KHÁCH HÀNG',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: UserData) => (
        <Space>
          <Avatar src={record.avatar} size={40} />
          <div>
            <div style={{ fontWeight: 500 }}>{text}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{record.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'NGÀY TẠO',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'NGÀY CẬP NHẬT',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
    {
      title: 'VAI TRÒ',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <Tag color="blue" style={{ textTransform: 'capitalize' }}>
          {role}
        </Tag>
      ),
    },
    {
      title: 'TRẠNG THÁI',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color="green">
          Hoạt động
        </Tag>
      ),
    },
    {
      title: 'CHỨC NĂNG',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="text" icon={<EyeOutlined />} style={{ color: '#1890ff' }} />
          <Button type="text" icon={<EditOutlined />} style={{ color: '#1890ff' }} />
          <Button type="text" icon={<DeleteOutlined />} style={{ color: '#ff4d4f' }} />
        </Space>
      ),
    },
  ];

  const filteredData = fakeUsers.filter(user =>
    user.name.toLowerCase().includes(searchText.toLowerCase()) ||
    user.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <Title level={2} style={{ marginBottom: '24px' }}>
        Thông tin khách hàng
      </Title>
      
      <Card style={{ marginBottom: '16px' }}>
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Input
            placeholder="Tìm kiếm"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: '300px' }}
          />
          <Button type="primary" icon={<PlusOutlined />}>
            Thêm
          </Button>
        </Space>
      </Card>

      <Card>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} mục`,
          }}
          rowKey="key"
        />
      </Card>
    </div>
  );
};

export default User;