import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const { Title } = Typography;

interface LoginForm {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: LoginForm) => {
    console.log('Form submitted with values:', values);
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation - in real app, this would be API call
      if (values.username === 'admin' && values.password === 'admin123') {
        console.log('Login successful');
        toast.success('Đăng nhập thành công!');
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/');
      } else {
        console.log('Login failed - invalid credentials');
        toast.error('Tên đăng nhập hoặc mật khẩu không đúng!');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Có lỗi xảy ra, vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <Title className="text-gray-800 mb-2 !text-4xl">
            SMS System
          </Title>
          <p className="text-gray-600 !text-xl">Đăng nhập để tiếp tục</p>
        </div>
        
        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="Tên đăng nhập"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Mật khẩu"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full h-12 rounded-lg bg-blue-600 hover:bg-blue-700 border-0"
            >
              Đăng nhập
            </Button>
            <Button
              type="default"
              onClick={() => {
                console.log('Test button clicked');
                onFinish({ username: 'admin', password: 'admin123' });
              }}
              className="w-full mt-2"
            >
              Test Login (admin/admin123)
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center mt-4">
          <p className="text-gray-500 text-sm">
            Demo: admin / admin123
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login; 