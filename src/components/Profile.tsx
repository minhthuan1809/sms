import React, { useState } from 'react';
import { Form, Input, Button, Avatar, Card, Typography, Row, Col, Divider, message } from 'antd';
import { UserOutlined, LockOutlined, SaveOutlined, EditOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
  department: string;
  joinDate: string;
}

const fakeProfile: ProfileData = {
  name: 'Nguyễn Minh Thuận',
  email: 'thuan18092003@gmail.com',
  phone: '0123456789',
  avatar: 'https://i.pravatar.cc/150?img=1',
  role: 'Admin',
  department: 'IT Department',
  joinDate: '2023-01-15',
};

const Profile = () => {
  const [profile, setProfile] = useState(fakeProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();

  const handleProfileUpdate = (values: any) => {
    setProfile(prev => ({ ...prev, ...values }));
    setIsEditing(false);
    message.success('Cập nhật thông tin thành công!');
  };

  const handlePasswordChange = (values: any) => {
    console.log('Đổi mật khẩu:', values);
    passwordForm.resetFields();
    message.success('Đổi mật khẩu thành công!');
  };

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Title level={2} style={{ marginBottom: '24px' }}>Thông tin cá nhân</Title>
        
        {/* Profile Information */}
        <Card style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <Title level={3} style={{ margin: 0 }}>Thông tin cơ bản</Title>
            <Button
              type={isEditing ? 'primary' : 'default'}
              icon={isEditing ? <SaveOutlined /> : <EditOutlined />}
              onClick={() => {
                if (isEditing) {
                  profileForm.submit();
                } else {
                  setIsEditing(true);
                }
              }}
            >
              {isEditing ? 'Lưu' : 'Chỉnh sửa'}
            </Button>
          </div>
          
          <Row gutter={24}>
            <Col xs={24} md={8}>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <Avatar
                  src={profile.avatar}
                  size={120}
                  style={{ border: '4px solid #f0f0f0' }}
                />
                <div style={{ marginTop: '16px' }}>
                  <Text strong>{profile.name}</Text>
                </div>
              </div>
            </Col>
            
            <Col xs={24} md={16}>
              <Form
                form={profileForm}
                layout="vertical"
                initialValues={profile}
                onFinish={handleProfileUpdate}
                disabled={!isEditing}
              >
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Họ và tên"
                      name="name"
                      rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                    >
                      <Input prefix={<UserOutlined />} />
                    </Form.Item>
                  </Col>
                  
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        { required: true, message: 'Vui lòng nhập email!' },
                        { type: 'email', message: 'Email không hợp lệ!' }
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Số điện thoại"
                      name="phone"
                      rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  
                  <Col xs={24} md={12}>
                    <Form.Item label="Vai trò">
                      <Input value={profile.role} disabled />
                    </Form.Item>
                  </Col>
                  
                  <Col xs={24} md={12}>
                    <Form.Item label="Phòng ban">
                      <Input value={profile.department} disabled />
                    </Form.Item>
                  </Col>
                  
                  <Col xs={24} md={12}>
                    <Form.Item label="Ngày tham gia">
                      <Input value={profile.joinDate} disabled />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Card>

        {/* Change Password */}
        <Card>
          <Title level={3} style={{ marginBottom: '24px' }}>Đổi mật khẩu</Title>
          
          <Form
            form={passwordForm}
            layout="vertical"
            onFinish={handlePasswordChange}
            style={{ maxWidth: '400px' }}
          >
            <Form.Item
              label="Mật khẩu hiện tại"
              name="currentPassword"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại!' }]}
            >
              <Input.Password prefix={<LockOutlined />} />
            </Form.Item>
            
            <Form.Item
              label="Mật khẩu mới"
              name="newPassword"
              rules={[
                { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
                { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
              ]}
            >
              <Input.Password prefix={<LockOutlined />} />
            </Form.Item>
            
            <Form.Item
              label="Xác nhận mật khẩu mới"
              name="confirmPassword"
              dependencies={['newPassword']}
              rules={[
                { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                  },
                }),
              ]}
            >
              <Input.Password prefix={<LockOutlined />} />
            </Form.Item>
            
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Đổi mật khẩu
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Profile;