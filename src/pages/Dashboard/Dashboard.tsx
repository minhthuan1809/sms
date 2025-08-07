import React, { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Progress, 
  Table, 
  Tag, 
  Button, 
  Timeline,
  Badge,
  Space,
  Typography,
  Tooltip
} from 'antd';
import { 
  SendOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  UserOutlined,
  MessageOutlined,
  DollarOutlined,
  RiseOutlined,
  FallOutlined,
  SettingOutlined,
  PlusOutlined,
  ReloadOutlined,
  TrophyOutlined,
  FireOutlined,
  StarOutlined,
  CrownOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'sms_sent',
      message: 'SMS campaign "Summer Sale" sent to 1,250 customers',
      time: '2 minutes ago',
      status: 'success',
      icon: <SendOutlined style={{ color: '#52c41a' }} />
    },
    {
      id: 2,
      type: 'campaign_created',
      message: 'New campaign "Flash Sale" created',
      time: '15 minutes ago',
      status: 'info',
      icon: <MessageOutlined style={{ color: '#1890ff' }} />
    },
    {
      id: 3,
      type: 'customer_added',
      message: '50 new customers imported from CSV',
      time: '1 hour ago',
      status: 'success',
      icon: <UserOutlined style={{ color: '#52c41a' }} />
    },
    {
      id: 4,
      type: 'payment_received',
      message: 'Payment received: $250.00',
      time: '2 hours ago',
      status: 'success',
      icon: <DollarOutlined style={{ color: '#52c41a' }} />
    }
  ];

  // Mock data for top campaigns
  const topCampaigns = [
    {
      id: 1,
      name: 'Summer Sale 2024',
      sent: 1250,
      delivered: 1180,
      rate: 94.4,
      revenue: 12500
    },
    {
      id: 2,
      name: 'Flash Sale Alert',
      sent: 890,
      delivered: 845,
      rate: 94.9,
      revenue: 8900
    },
    {
      id: 3,
      name: 'New Product Launch',
      sent: 650,
      delivered: 620,
      rate: 95.4,
      revenue: 7800
    }
  ];

  // Mock data for recent SMS
  const recentSMS = [
    {
      id: 1,
      phone: '+84 912 345 678',
      message: 'Your order #12345 has been shipped! Track at...',
      status: 'delivered',
      time: '2 min ago'
    },
    {
      id: 2,
      phone: '+84 987 654 321',
      message: 'Flash sale! 50% off all items. Ends today!',
      status: 'sent',
      time: '5 min ago'
    },
    {
      id: 3,
      phone: '+84 555 123 456',
      message: 'Thank you for your purchase! Rate us...',
      status: 'delivered',
      time: '10 min ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'green';
      case 'sent': return 'blue';
      case 'failed': return 'red';
      default: return 'default';
    }
  };

  const columns = [
    {
      title: 'Campaign',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <Text strong>{text}</Text>
    },
    {
      title: 'Sent',
      dataIndex: 'sent',
      key: 'sent',
      render: (value: number) => <Text>{value.toLocaleString()}</Text>
    },
    {
      title: 'Delivered',
      dataIndex: 'delivered',
      key: 'delivered',
      render: (value: number) => <Text>{value.toLocaleString()}</Text>
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      key: 'rate',
      render: (value: number) => (
        <Progress 
          percent={value} 
          size="small" 
          status={value > 95 ? 'success' : value > 90 ? 'normal' : 'exception'}
        />
      )
    },
    {
      title: 'Revenue',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (value: number) => (
        <Text strong style={{ color: '#52c41a' }}>
          ${value.toLocaleString()}
        </Text>
      )
    }
  ];

  const smsColumns = [
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (text: string) => <Text code>{text}</Text>
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      render: (text: string) => (
        <Tooltip title={text}>
          <Text ellipsis style={{ maxWidth: 200 }}>{text}</Text>
        </Tooltip>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {status.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      render: (text: string) => <Text type="secondary">{text}</Text>
    }
  ];

  return (
    <div className="dashboard-container">
      {/* Header */}
      

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <Statistic
              title="SMS Sent Today"
              value={1128}
              prefix={<SendOutlined />}
              valueStyle={{ color: '#3f8600' }}
              suffix={
                <span style={{ fontSize: '14px', color: '#52c41a' }}>
                  <RiseOutlined /> +12%
                </span>
              }
            />
            <Progress percent={75} size="small" showInfo={false} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <Statistic
              title="Delivered"
              value={1024}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#3f8600' }}
              suffix={
                <span style={{ fontSize: '14px', color: '#52c41a' }}>
                  <RiseOutlined /> +8%
                </span>
              }
            />
            <Progress percent={91} size="small" showInfo={false} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <Statistic
              title="Pending"
              value={104}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#cf1322' }}
              suffix={
                <span style={{ fontSize: '14px', color: '#cf1322' }}>
                  <FallOutlined /> -5%
                </span>
              }
            />
            <Progress percent={9} size="small" showInfo={false} status="exception" />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <Statistic
              title="Active Users"
              value={256}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
              suffix={
                <span style={{ fontSize: '14px', color: '#1890ff' }}>
                  <RiseOutlined /> +15%
                </span>
              }
            />
            <Progress percent={85} size="small" showInfo={false} />
          </Card>
        </Col>
      </Row>

      {/* Main Content */}
      <Row gutter={[16, 16]}>
        {/* Left Column */}
        <Col xs={24} lg={16}>
          {/* Top Campaigns */}
          <Card 
            title="Top Campaigns" 
            className="mb-4"
            extra={<Button type="link">View All</Button>}
          >
            <Table 
              dataSource={topCampaigns} 
              columns={columns} 
              pagination={false}
              size="small"
            />
          </Card>

          {/* Recent SMS */}
          <Card 
            title="Recent SMS" 
            className="mb-4"
            extra={<Button type="link">View All</Button>}
          >
            <Table 
              dataSource={recentSMS} 
              columns={smsColumns} 
              pagination={false}
              size="small"
            />
          </Card>
        </Col>

        {/* Right Column */}
        <Col xs={24} lg={8}>
          {/* Quick Actions */}
          <Card title="Quick Actions" className="mb-4">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button type="primary" block icon={<SendOutlined />}>
                Send SMS
              </Button>
              <Button block icon={<MessageOutlined />}>
                Create Campaign
              </Button>
              <Button block icon={<UserOutlined />}>
                Import Contacts
              </Button>
              <Button block icon={<SettingOutlined />}>
                Settings
              </Button>
            </Space>
          </Card>

          {/* Recent Activities */}
          <Card title="Recent Activities" className="mb-4">
            <Timeline>
              {recentActivities.map((activity) => (
                <Timeline.Item 
                  key={activity.id}
                  dot={activity.icon}
                  color={activity.status === 'success' ? 'green' : 'blue'}
                >
                  <div>
                    <Text>{activity.message}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {activity.time}
                    </Text>
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>

          {/* Performance Metrics */}
          <Card title="Performance Metrics" className="mb-4">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Text>Delivery Rate</Text>
                  <Text strong>94.2%</Text>
                </div>
                <Progress percent={94.2} size="small" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Text>Click Rate</Text>
                  <Text strong>12.8%</Text>
                </div>
                <Progress percent={12.8} size="small" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Text>Conversion Rate</Text>
                  <Text strong>5.4%</Text>
                </div>
                <Progress percent={5.4} size="small" />
              </div>
            </div>
          </Card>

          {/* System Status */}
          <Card title="System Status">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Text>API Status</Text>
                <Badge status="success" text="Online" />
              </div>
              <div className="flex justify-between items-center">
                <Text>Database</Text>
                <Badge status="success" text="Connected" />
              </div>
              <div className="flex justify-between items-center">
                <Text>SMS Gateway</Text>
                <Badge status="success" text="Active" />
              </div>
              <div className="flex justify-between items-center">
                <Text>Last Backup</Text>
                <Text type="secondary">2 hours ago</Text>
              </div>
            </div>
          </Card>
        </Col>
      </Row>


    </div>
  );
};

export default Dashboard; 