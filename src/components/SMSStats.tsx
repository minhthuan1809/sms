import React from 'react';
import { Card, Row, Col, Statistic, Progress, Typography, Table } from 'antd';
import { 
  MessageOutlined, 
  CheckCircleOutlined, 
  CloseCircleOutlined, 
  ClockCircleOutlined,
  RiseOutlined,
  UserOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

interface TopSender {
  sender: string;
  totalSent: number;
  successRate: number;
  percentage: number;
}

const SMSStats: React.FC = () => {
  // Mock data
  const statsData = {
    totalSent: 1250,
    successRate: 94.5,
    failedRate: 3.2,
    pendingRate: 2.3,
    todaySent: 45,
    weekSent: 320,
    monthSent: 1250
  };

  const topSenders: TopSender[] = [
    {
      sender: 'SMS System',
      totalSent: 450,
      successRate: 96.2,
      percentage: 36
    },
    {
      sender: 'Customer Service',
      totalSent: 380,
      successRate: 93.8,
      percentage: 30.4
    },
    {
      sender: 'Marketing',
      totalSent: 420,
      successRate: 91.5,
      percentage: 33.6
    }
  ];

  const columns: ColumnsType<TopSender> = [
    {
      title: 'Người gửi',
      dataIndex: 'sender',
      key: 'sender',
    },
    {
      title: 'Tổng gửi',
      dataIndex: 'totalSent',
      key: 'totalSent',
      render: (value) => value.toLocaleString(),
    },
    {
      title: 'Tỷ lệ thành công',
      dataIndex: 'successRate',
      key: 'successRate',
      render: (value) => `${value}%`,
    },
    {
      title: 'Phần trăm',
      dataIndex: 'percentage',
      key: 'percentage',
      render: (value) => (
        <Progress 
          percent={value} 
          size="small" 
          status={value > 30 ? 'success' : 'normal'}
        />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Title level={3}>Thống kê SMS</Title>

      {/* Main Stats */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm">
            <Statistic
              title="Tổng SMS đã gửi"
              value={statsData.totalSent}
              prefix={<MessageOutlined className="text-blue-500" />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm">
            <Statistic
              title="Tỷ lệ thành công"
              value={statsData.successRate}
              suffix="%"
              prefix={<CheckCircleOutlined className="text-green-500" />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm">
            <Statistic
              title="Tỷ lệ thất bại"
              value={statsData.failedRate}
              suffix="%"
              prefix={<CloseCircleOutlined className="text-red-500" />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm">
            <Statistic
              title="Đang xử lý"
              value={statsData.pendingRate}
              suffix="%"
              prefix={<ClockCircleOutlined className="text-orange-500" />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Progress Charts */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Tỷ lệ thành công tổng thể" className="shadow-sm">
            <div className="text-center">
              <Progress
                type="circle"
                percent={statsData.successRate}
                format={(percent) => `${percent}%`}
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}
                size={120}
              />
              <p className="mt-4 text-gray-600">
                {statsData.totalSent.toLocaleString()} tin nhắn đã gửi
              </p>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Thống kê theo thời gian" className="shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Hôm nay</span>
                <span className="font-semibold">{statsData.todaySent} tin nhắn</span>
              </div>
              <Progress percent={(statsData.todaySent / 100) * 100} />
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Tuần này</span>
                <span className="font-semibold">{statsData.weekSent} tin nhắn</span>
              </div>
              <Progress percent={(statsData.weekSent / 500) * 100} />
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Tháng này</span>
                <span className="font-semibold">{statsData.monthSent} tin nhắn</span>
              </div>
              <Progress percent={(statsData.monthSent / 2000) * 100} />
            </div>
          </Card>
        </Col>
      </Row>

      {/* Top Senders Table */}
      <Card title="Top người gửi" className="shadow-sm">
        <Table
          columns={columns}
          dataSource={topSenders}
          rowKey="sender"
          pagination={false}
          size="small"
        />
      </Card>

      {/* Additional Stats */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={8}>
          <Card className="shadow-sm text-center">
            <RiseOutlined className="text-3xl text-green-500 mb-2" />
            <Title level={4} className="mb-2">Tăng trưởng</Title>
            <p className="text-green-600 font-semibold">+15.3%</p>
            <p className="text-gray-500 text-sm">So với tháng trước</p>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card className="shadow-sm text-center">
            <UserOutlined className="text-3xl text-blue-500 mb-2" />
            <Title level={4} className="mb-2">Người dùng</Title>
            <p className="text-blue-600 font-semibold">3</p>
            <p className="text-gray-500 text-sm">Người gửi tích cực</p>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card className="shadow-sm text-center">
            <MessageOutlined className="text-3xl text-purple-500 mb-2" />
            <Title level={4} className="mb-2">Trung bình</Title>
            <p className="text-purple-600 font-semibold">41.7</p>
            <p className="text-gray-500 text-sm">SMS/ngày</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SMSStats; 