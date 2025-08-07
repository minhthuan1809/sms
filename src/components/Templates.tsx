import React, { useState } from 'react';
import { Table, Input, Button, Card, Space, Typography, Tag, Modal, Form, message } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { TextArea } = Input;

interface TemplateData {
  key: number;
  name: string;
  content: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

const fakeTemplates: TemplateData[] = [
  {
    key: 1,
    name: 'Chào mừng khách hàng',
    content: 'Xin chào {customer_name}! Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. Chúc bạn một ngày tốt lành!',
    status: 'active',
    createdAt: '2024-01-15 10:30:00',
    updatedAt: '2024-01-15 10:30:00',
  },
  {
    key: 2,
    name: 'Thông báo đơn hàng',
    content: 'Đơn hàng #{order_id} của bạn đã được xác nhận và đang được xử lý. Dự kiến giao hàng trong 2-3 ngày tới.',
    status: 'active',
    createdAt: '2024-01-10 14:20:00',
    updatedAt: '2024-01-12 09:15:00',
  },
  {
    key: 3,
    name: 'Nhắc nhở thanh toán',
    content: 'Hóa đơn #{invoice_id} của bạn đến hạn thanh toán. Vui lòng thanh toán trước {due_date} để tránh phí phạt.',
    status: 'active',
    createdAt: '2024-01-05 16:45:00',
    updatedAt: '2024-01-08 11:30:00',
  },
  {
    key: 4,
    name: 'Xác nhận đăng ký',
    content: 'Tài khoản của bạn đã được tạo thành công. Mã xác thực: {verification_code}. Vui lòng nhập mã này để kích hoạt tài khoản.',
    status: 'inactive',
    createdAt: '2024-01-01 08:00:00',
    updatedAt: '2024-01-03 15:20:00',
  },
  {
    key: 5,
    name: 'Thông báo khuyến mãi',
    content: '🎉 Khuyến mãi đặc biệt! Giảm {discount_percent}% cho tất cả sản phẩm. Áp dụng từ {start_date} đến {end_date}. Mã: {promo_code}',
    status: 'active',
    createdAt: '2023-12-28 12:00:00',
    updatedAt: '2024-01-02 10:45:00',
  },
];

const Templates = () => {
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateData | null>(null);
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
      width: 80,
    },
    {
      title: 'Tên template',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <span style={{ fontWeight: 500 }}>{text}</span>,
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: 'content',
      render: (text: string) => (
        <div style={{ maxWidth: '300px' }}>
          <div style={{ 
            overflow: 'hidden', 
            textOverflow: 'ellipsis', 
            whiteSpace: 'nowrap',
            color: '#666'
          }}>
            {text}
          </div>
        </div>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
        </Tag>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 120,
      render: (_ : any, record: TemplateData) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            style={{ color: '#1890ff' }}
            onClick={() => handleView(record)}
          />
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            style={{ color: '#1890ff' }}
            onClick={() => handleEdit(record)}
          />
          <Button 
            type="text" 
            icon={<DeleteOutlined />} 
            style={{ color: '#ff4d4f' }}
            onClick={() => handleDelete(record)}
          />
        </Space>
      ),
    },
  ];

  const filteredData = fakeTemplates.filter(template =>
    template.name.toLowerCase().includes(searchText.toLowerCase()) ||
    template.content.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleView = (template: TemplateData) => {
    setSelectedTemplate(template);
    setIsModalVisible(true);
  };

  const handleEdit = (template: TemplateData) => {
    setSelectedTemplate(template);
    form.setFieldsValue(template);
    setIsModalVisible(true);
  };

  const handleDelete = (template: TemplateData) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: `Bạn có chắc chắn muốn xóa template "${template.name}"?`,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        message.success('Xóa template thành công!');
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      console.log('Form values:', values);
      message.success('Lưu template thành công!');
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setSelectedTemplate(null);
  };

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <Title level={2} style={{ marginBottom: '24px' }}>Quản lý mẫu SMS</Title>
      
      <Card style={{ marginBottom: '16px' }}>
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Input
            placeholder="Tìm kiếm template..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: '300px' }}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
            Thêm template
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

      <Modal
        title={selectedTemplate ? 'Chỉnh sửa template' : 'Thêm template mới'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={selectedTemplate || {}}
        >
          <Form.Item
            label="Tên template"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên template!' }]}
          >
            <Input placeholder="Nhập tên template" />
          </Form.Item>
          
          <Form.Item
            label="Nội dung"
            name="content"
            rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
          >
            <TextArea 
              rows={6} 
              placeholder="Nhập nội dung template. Sử dụng {variable} để thêm biến động."
            />
          </Form.Item>
          
          <Form.Item
            label="Trạng thái"
            name="status"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
          >
            <Input.Group compact>
              <Button 
                type="default" 
                style={{ width: '50%' }}
                onClick={() => form.setFieldValue('status', 'active')}
              >
                Hoạt động
              </Button>
              <Button 
                type="default" 
                style={{ width: '50%' }}
                onClick={() => form.setFieldValue('status', 'inactive')}
              >
                Không hoạt động
              </Button>
            </Input.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Templates;