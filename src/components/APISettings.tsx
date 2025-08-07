import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Row, Col, Switch, Select, message, Divider, Alert } from 'antd';
import { SaveOutlined, KeyOutlined, LinkOutlined, SettingOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

interface APISettingsData {
  provider: string;
  apiKey: string;
  apiSecret: string;
  endpoint: string;
  senderId: string;
  isActive: boolean;
  webhookUrl: string;
  retryAttempts: number;
  timeout: number;
}

const fakeAPISettings: APISettingsData = {
  provider: 'twilio',
  apiKey: 'AC1234567890abcdef1234567890abcdef',
  apiSecret: '********************************',
  endpoint: 'https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Messages.json',
  senderId: '+1234567890',
  isActive: true,
  webhookUrl: 'https://your-domain.com/webhook/sms-delivery',
  retryAttempts: 3,
  timeout: 30,
};

const APISettings = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  const handleSave = async (values: APISettingsData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('API Settings:', values);
      message.success('Cài đặt API đã được lưu thành công!');
    } catch (error) {
      message.error('Có lỗi xảy ra khi lưu cài đặt!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    try {
      // Simulate API test
      await new Promise(resolve => setTimeout(resolve, 2000));
      message.success('Kết nối API thành công!');
    } catch (error) {
      message.error('Kết nối API thất bại!');
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Title level={2} style={{ marginBottom: '24px' }}>
          <SettingOutlined style={{ marginRight: '8px' }} />
          Cài đặt API SMS
        </Title>

        <Alert
          message="Thông tin quan trọng"
          description="Đảm bảo bạn đã đăng ký tài khoản với nhà cung cấp SMS và có đầy đủ thông tin API. Cài đặt này sẽ được sử dụng để gửi SMS từ hệ thống."
          type="info"
          showIcon
          style={{ marginBottom: '24px' }}
        />

        <Form
          form={form}
          layout="vertical"
          initialValues={fakeAPISettings}
          onFinish={handleSave}
        >
          <Row gutter={24}>
            <Col xs={24} lg={16}>
              <Card title="Cấu hình cơ bản" style={{ marginBottom: '24px' }}>
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Nhà cung cấp SMS"
                      name="provider"
                      rules={[{ required: true, message: 'Vui lòng chọn nhà cung cấp!' }]}
                    >
                      <Select placeholder="Chọn nhà cung cấp">
                        <Option value="twilio">Twilio</Option>
                        <Option value="nexmo">Nexmo (Vonage)</Option>
                        <Option value="aws">AWS SNS</Option>
                        <Option value="firebase">Firebase</Option>
                        <Option value="custom">Tùy chỉnh</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Trạng thái"
                      name="isActive"
                      valuePropName="checked"
                    >
                      <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="API Key"
                      name="apiKey"
                      rules={[{ required: true, message: 'Vui lòng nhập API Key!' }]}
                    >
                      <Input.Password 
                        prefix={<KeyOutlined />}
                        placeholder="Nhập API Key"
                      />
                    </Form.Item>
                  </Col>
                  
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="API Secret"
                      name="apiSecret"
                      rules={[{ required: true, message: 'Vui lòng nhập API Secret!' }]}
                    >
                      <Input.Password 
                        prefix={<KeyOutlined />}
                        placeholder="Nhập API Secret"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Endpoint URL"
                      name="endpoint"
                      rules={[{ required: true, message: 'Vui lòng nhập Endpoint URL!' }]}
                    >
                      <Input 
                        prefix={<LinkOutlined />}
                        placeholder="https://api.provider.com/send"
                      />
                    </Form.Item>
                  </Col>
                  
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Sender ID"
                      name="senderId"
                      rules={[{ required: true, message: 'Vui lòng nhập Sender ID!' }]}
                    >
                      <Input placeholder="Số điện thoại hoặc tên người gửi" />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>

              <Card title="Cấu hình nâng cao" style={{ marginBottom: '24px' }}>
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Webhook URL"
                      name="webhookUrl"
                      rules={[{ type: 'url', message: 'URL không hợp lệ!' }]}
                    >
                      <Input 
                        prefix={<LinkOutlined />}
                        placeholder="https://your-domain.com/webhook"
                      />
                    </Form.Item>
                  </Col>
                  
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Số lần thử lại"
                      name="retryAttempts"
                      rules={[{ required: true, message: 'Vui lòng nhập số lần thử lại!' }]}
                    >
                      <Select placeholder="Chọn số lần thử lại">
                        <Option value={1}>1 lần</Option>
                        <Option value={2}>2 lần</Option>
                        <Option value={3}>3 lần</Option>
                        <Option value={5}>5 lần</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Timeout (giây)"
                      name="timeout"
                      rules={[{ required: true, message: 'Vui lòng nhập timeout!' }]}
                    >
                      <Select placeholder="Chọn timeout">
                        <Option value={10}>10 giây</Option>
                        <Option value={30}>30 giây</Option>
                        <Option value={60}>60 giây</Option>
                        <Option value={120}>120 giây</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card title="Hành động" style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    loading={isLoading}
                    htmlType="submit"
                    block
                  >
                    Lưu cài đặt
                  </Button>
                  
                  <Button
                    icon={<CheckCircleOutlined />}
                    loading={isTesting}
                    onClick={handleTestConnection}
                    block
                  >
                    Kiểm tra kết nối
                  </Button>
                </div>

                <Divider />

                <div>
                  <Text strong>Hướng dẫn:</Text>
                  <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                    <li>Nhập đầy đủ thông tin API từ nhà cung cấp</li>
                    <li>Kiểm tra kết nối trước khi sử dụng</li>
                    <li>Webhook URL để nhận thông báo trạng thái SMS</li>
                    <li>Cài đặt timeout và retry phù hợp</li>
                  </ul>
                </div>
              </Card>

              <Card title="Thông tin API" size="small">
                <div>
                  <Text type="secondary">Provider: </Text>
                  <Text strong>Twilio</Text>
                </div>
                <div>
                  <Text type="secondary">Status: </Text>
                  <Text type="success">Hoạt động</Text>
                </div>
                <div>
                  <Text type="secondary">Last Test: </Text>
                  <Text>2024-01-15 14:30:00</Text>
                </div>
                <div>
                  <Text type="secondary">SMS Sent: </Text>
                  <Text strong>1,234</Text>
                </div>
              </Card>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default APISettings;