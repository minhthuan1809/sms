import React, { useState } from 'react';
import { Form, Input, Button, Card, Row, Col, Select, Upload, Typography } from 'antd';
    import { SendOutlined, UploadOutlined } from '@ant-design/icons';
    import { toast } from 'sonner';
    import type { SMSForm } from '../types/index';
import { SENDER_OPTIONS } from '../utils/constants';

const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;

const SMSSender: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);

  const senderOptions = SENDER_OPTIONS;

  const handleSendSMS = async (values: SMSForm) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const totalMessages = values.phoneNumbers.length;
      toast.success(`Đã gửi thành công ${totalMessages} tin nhắn!`);
      
      // Reset form
      form.resetFields();
      setMessageCount(0);
    } catch (error) {
      toast.error('Có lỗi xảy ra khi gửi SMS!');
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneNumbersChange = (value: string) => {
    const numbers = value.split(',').map(num => num.trim()).filter(num => num);
    setMessageCount(numbers.length);
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const numbers = content.split('\n').map(num => num.trim()).filter(num => num);
      form.setFieldsValue({ phoneNumbers: numbers.join(', ') });
      setMessageCount(numbers.length);
    };
    reader.readAsText(file);
    return false; // Prevent default upload
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Title level={3} className="mb-0">Gửi SMS</Title>
        <div className="text-sm text-gray-500">
          Số tin nhắn: <span className="font-semibold text-blue-600">{messageCount}</span>
        </div>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSendSMS}
        className="space-y-6"
      >
        <Row gutter={24}>
          <Col span={16}>
            <Card title="Thông tin SMS" className="shadow-sm">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="sender"
                    label="Người gửi"
                    rules={[{ required: true, message: 'Vui lòng chọn người gửi!' }]}
                  >
                    <Select placeholder="Chọn người gửi">
                      {senderOptions.map(option => (
                        <Option key={option.value} value={option.value}>
                          {option.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="scheduleTime"
                    label="Lên lịch gửi (tùy chọn)"
                  >
                    <Input type="datetime-local" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="phoneNumbers"
                label="Số điện thoại"
                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
              >
                                 <TextArea
                   rows={4}
                   placeholder="Nhập số điện thoại, phân cách bằng dấu phẩy hoặc xuống dòng"
                   onChange={(e) => handlePhoneNumbersChange(e.target.value)}
                 />
              </Form.Item>

              <Form.Item
                name="message"
                label="Nội dung tin nhắn"
                rules={[{ required: true, message: 'Vui lòng nhập nội dung tin nhắn!' }]}
              >
                                 <TextArea
                   rows={6}
                   placeholder="Nhập nội dung tin nhắn..."
                   maxLength={160}
                   showCount
                 />
              </Form.Item>
            </Card>
          </Col>

          <Col span={8}>
            <Card title="Tùy chọn" className="shadow-sm">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Upload danh sách số điện thoại</h4>
                  <Upload
                    beforeUpload={handleFileUpload}
                    accept=".txt,.csv"
                    showUploadList={false}
                  >
                    <Button icon={<UploadOutlined />} block>
                      Chọn file
                    </Button>
                  </Upload>
                  <p className="text-xs text-gray-500 mt-1">
                    Hỗ trợ file .txt, .csv (mỗi số trên một dòng)
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Lưu ý:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Mỗi tin nhắn tối đa 160 ký tự</li>
                    <li>• Số điện thoại phải đúng định dạng Việt Nam</li>
                    <li>• Có thể gửi tối đa 1000 tin nhắn/lần</li>
                  </ul>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        <div className="flex justify-end space-x-4">
          <Button size="large" onClick={() => form.resetFields()}>
            Làm mới
          </Button>
          <Button
            type="primary"
            size="large"
            icon={<SendOutlined />}
            loading={loading}
            htmlType="submit"
            disabled={messageCount === 0}
          >
            Gửi SMS ({messageCount} tin nhắn)
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SMSSender; 