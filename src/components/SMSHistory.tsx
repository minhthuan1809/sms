import React, { useState } from 'react';
import { Table, Card, Tag, Button, Input, DatePicker, Select, Space, Typography } from 'antd';
import { SearchOutlined, DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Title } = Typography;

interface SMSRecord {
  id: string;
  phoneNumber: string;
  message: string;
  status: 'success' | 'failed' | 'pending';
  sender: string;
  sentAt: string;
  deliveryStatus: 'delivered' | 'failed' | 'pending';
}

const SMSHistory: React.FC = () => {
  const [loading] = useState(false);
  const [searchText, setSearchText] = useState('');

  // Mock data
  const mockData: SMSRecord[] = [
    {
      id: '1',
      phoneNumber: '0123456789',
      message: 'Chào mừng bạn đến với SMS System!',
      status: 'success',
      sender: 'SMS_SYSTEM',
      sentAt: '2024-01-15 10:30:00',
      deliveryStatus: 'delivered'
    },
    {
      id: '2',
      phoneNumber: '0987654321',
      message: 'Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.',
      status: 'success',
      sender: 'CUSTOMER_SERVICE',
      sentAt: '2024-01-15 09:15:00',
      deliveryStatus: 'delivered'
    },
    {
      id: '3',
      phoneNumber: '0555666777',
      message: 'Khuyến mãi đặc biệt dành cho khách hàng VIP!',
      status: 'failed',
      sender: 'MARKETING',
      sentAt: '2024-01-15 08:45:00',
      deliveryStatus: 'failed'
    },
    {
      id: '4',
      phoneNumber: '0333444555',
      message: 'Nhắc nhở: Hẹn khám bệnh vào ngày mai.',
      status: 'pending',
      sender: 'SMS_SYSTEM',
      sentAt: '2024-01-15 07:20:00',
      deliveryStatus: 'pending'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'green';
      case 'failed':
        return 'red';
      case 'pending':
        return 'orange';
      default:
        return 'default';
    }
  };

  const getDeliveryStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'green';
      case 'failed':
        return 'red';
      case 'pending':
        return 'orange';
      default:
        return 'default';
    }
  };

  const columns: ColumnsType<SMSRecord> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 120,
    },
    {
      title: 'Nội dung',
      dataIndex: 'message',
      key: 'message',
      ellipsis: true,
      render: (text) => (
        <div className="max-w-xs">
          <div className="truncate" title={text}>
            {text}
          </div>
        </div>
      ),
    },
    {
      title: 'Người gửi',
      dataIndex: 'sender',
      key: 'sender',
      width: 120,
      render: (sender) => {
        const senderMap: { [key: string]: string } = {
          'SMS_SYSTEM': 'SMS System',
          'CUSTOMER_SERVICE': 'Customer Service',
          'MARKETING': 'Marketing'
        };
        return senderMap[sender] || sender;
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status === 'success' ? 'Thành công' : 
           status === 'failed' ? 'Thất bại' : 'Đang xử lý'}
        </Tag>
      ),
    },
    {
      title: 'Trạng thái gửi',
      dataIndex: 'deliveryStatus',
      key: 'deliveryStatus',
      width: 120,
      render: (status) => (
        <Tag color={getDeliveryStatusColor(status)}>
          {status === 'delivered' ? 'Đã gửi' : 
           status === 'failed' ? 'Gửi lỗi' : 'Đang gửi'}
        </Tag>
      ),
    },
    {
      title: 'Thời gian gửi',
      dataIndex: 'sentAt',
      key: 'sentAt',
      width: 150,
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 100,
      render: (_, record) => (
        <Space>
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            size="small"
            onClick={() => handleViewDetails(record)}
          >
            Chi tiết
          </Button>
        </Space>
      ),
    },
  ];

  const handleViewDetails = (record: SMSRecord) => {
    console.log('View details:', record);
  };

  const handleExport = () => {
    // Export functionality
    console.log('Export data');
  };

  const filteredData = mockData.filter(item =>
    item.phoneNumber.includes(searchText) ||
    item.message.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Title level={3} className="mb-0">Lịch sử SMS</Title>
        <Button 
          type="primary" 
          icon={<DownloadOutlined />}
          onClick={handleExport}
        >
          Xuất dữ liệu
        </Button>
      </div>

      <Card className="shadow-sm">
        <div className="mb-4">
          <Space wrap>
            <Input
              placeholder="Tìm kiếm theo số điện thoại hoặc nội dung..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 300 }}
            />
            <RangePicker placeholder={['Từ ngày', 'Đến ngày']} />
            <Select placeholder="Trạng thái" style={{ width: 120 }}>
              <Option value="all">Tất cả</Option>
              <Option value="success">Thành công</Option>
              <Option value="failed">Thất bại</Option>
              <Option value="pending">Đang xử lý</Option>
            </Select>
            <Select placeholder="Người gửi" style={{ width: 150 }}>
              <Option value="all">Tất cả</Option>
              <Option value="SMS_SYSTEM">SMS System</Option>
              <Option value="CUSTOMER_SERVICE">Customer Service</Option>
              <Option value="MARKETING">Marketing</Option>
            </Select>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          loading={loading}
          pagination={{
            total: filteredData.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} của ${total} bản ghi`,
          }}
          scroll={{ x: 1000 }}
        />
      </Card>
    </div>
  );
};

export default SMSHistory; 