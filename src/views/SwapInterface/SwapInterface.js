import React, { useState } from 'react';
import {
  Card,
  Button,
  Input,
  Select,
  Statistic,
  Table,
  Space,
  Divider,
  Row,
  Col,
  Typography,
  Tooltip,
  Switch,
  Tag
} from 'antd';
import {
  SwapOutlined,
  WalletOutlined,
  SettingOutlined,
  StarOutlined,
  StarFilled,
  ArrowUpOutlined,
  ArrowDownOutlined,
  InfoCircleOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import './SwapInterface.css';

const { Title, Text } = Typography;
const { Option } = Select;

const SwapInterface = () => {
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('USDT');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage, setSlippage] = useState('0.5');
  const [timeRange, setTimeRange] = useState('24h');
  const [viewMode, setViewMode] = useState('all');
  const [expertMode, setExpertMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSwap = () => {
    setLoading(true);
    // 模拟交换过程
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleTokenSelect = (value, type) => {
    if (type === 'from') {
      setFromToken(value);
    } else {
      setToToken(value);
    }
  };

  const tokenOptions = [
    { value: 'ETH', label: 'ETH', balance: '1.234', icon: 'Ξ' },
    { value: 'USDT', label: 'USDT', balance: '1,234.56', icon: '₮' },
    { value: 'BTC', label: 'BTC', balance: '0.123', icon: '₿' },
    { value: 'DAI', label: 'DAI', balance: '567.89', icon: '◈' },
  ];

  const columns = [
    {
      title: '交易对',
      dataIndex: 'pair',
      key: 'pair',
      render: (text, record) => (
        <Space>
          <div className="token-icon">{record.icon}</div>
          <Text strong>{text}</Text>
          <Button type="text" icon={<StarOutlined />} />
        </Space>
      ),
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: '24h涨跌',
      dataIndex: 'change',
      key: 'change',
      render: (text) => (
        <div className={`price-change-indicator ${text >= 0 ? 'up' : 'down'}`}>
          {text >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          {Math.abs(text)}%
        </div>
      ),
    },
    {
      title: '24h成交量',
      dataIndex: 'volume',
      key: 'volume',
      render: (text) => <Text>{text}</Text>,
    },
  ];

  const data = [
    {
      key: '1',
      pair: 'ETH/USDT',
      price: '1,234.56',
      change: 5.67,
      volume: '1,234,567',
      icon: 'Ξ',
    },
    {
      key: '2',
      pair: 'BTC/USDT',
      price: '45,678.90',
      change: -2.34,
      volume: '2,345,678',
      icon: '₿',
    },
    {
      key: '3',
      pair: 'DAI/USDT',
      price: '1.01',
      change: 0.12,
      volume: '789,012',
      icon: '◈',
    },
  ];

  const stats = [
    {
      title: "总交易量",
      value: "123,456.78",
      suffix: "ETH",
      change: "+5.67%",
      isPositive: true
    },
    {
      title: "交易笔数",
      value: "45,678",
      change: "+12.34%",
      isPositive: true
    },
    {
      title: "活跃用户",
      value: "12,345",
      change: "-2.34%",
      isPositive: false
    },
    {
      title: "平均交易额",
      value: "2.345",
      suffix: "ETH",
      change: "+8.90%",
      isPositive: true
    }
  ];

  return (
    <div className="swap-container">
      {/* 第一屏：交易界面 */}
      <div className="screen-content">
        <div className="screen-title">代币交换</div>
        <Card
          title={
            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
              <Space>
                <Text strong>快速交换</Text>
                {expertMode && <Tag color="blue">专家模式</Tag>}
              </Space>
              <Space>
                <Tooltip title="交易设置">
                  <Button type="text" icon={<SettingOutlined />} />
                </Tooltip>
                <Switch
                  checkedChildren="专家模式"
                  unCheckedChildren="普通模式"
                  checked={expertMode}
                  onChange={setExpertMode}
                  className="expert-mode-switch"
                />
              </Space>
            </Space>
          }
          className="swap-card"
          bordered={false}
        >
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div className="token-input-container">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                  <Text>支付</Text>
                  <div className="balance-display">
                    <Text type="secondary">余额: {tokenOptions.find(t => t.value === fromToken)?.balance} {fromToken}</Text>
                    <Button type="link" size="small" className="max-button">最大</Button>
                  </div>
                </Space>
                <Input
                  size="large"
                  placeholder="0.0"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  suffix={
                    <Select
                      value={fromToken}
                      onChange={(value) => handleTokenSelect(value, 'from')}
                      style={{ width: 120 }}
                      bordered={false}
                    >
                      {tokenOptions.map(token => (
                        <Option key={token.value} value={token.value}>
                          <Space>
                            <div className="token-icon">{token.icon}</div>
                            {token.label}
                          </Space>
                        </Option>
                      ))}
                    </Select>
                  }
                />
              </Space>
            </div>

            <Button
              type="text"
              icon={<SwapOutlined />}
              className="swap-direction-button"
            />

            <div className="token-input-container">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                  <Text>接收</Text>
                  <div className="balance-display">
                    <Text type="secondary">余额: {tokenOptions.find(t => t.value === toToken)?.balance} {toToken}</Text>
                    <Button type="link" size="small" className="max-button">最大</Button>
                  </div>
                </Space>
                <Input
                  size="large"
                  placeholder="0.0"
                  value={toAmount}
                  onChange={(e) => setToAmount(e.target.value)}
                  suffix={
                    <Select
                      value={toToken}
                      onChange={(value) => handleTokenSelect(value, 'to')}
                      style={{ width: 120 }}
                      bordered={false}
                    >
                      {tokenOptions.map(token => (
                        <Option key={token.value} value={token.value}>
                          <Space>
                            <div className="token-icon">{token.icon}</div>
                            {token.label}
                          </Space>
                        </Option>
                      ))}
                    </Select>
                  }
                />
              </Space>
            </div>

            <Card size="small" className="swap-info">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                  <Space>
                    <Text type="secondary">兑换率</Text>
                    <Tooltip title="当前市场兑换率，可能因滑点而变化">
                      <InfoCircleOutlined className="info-icon" />
                    </Tooltip>
                  </Space>
                  <Text>1 {fromToken} = {fromToken === 'ETH' ? '1,234.56' : '0.000812'} {toToken}</Text>
                </Space>
                <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                  <Space>
                    <Text type="secondary">滑点容差</Text>
                    <Tooltip title="交易价格偏离预期的最大百分比">
                      <InfoCircleOutlined className="info-icon" />
                    </Tooltip>
                  </Space>
                  <Space>
                    <Select
                      value={slippage}
                      onChange={setSlippage}
                      style={{ width: 100 }}
                      bordered={false}
                    >
                      <Option value="0.1">0.1%</Option>
                      <Option value="0.5">0.5%</Option>
                      <Option value="1.0">1.0%</Option>
                      <Option value="2.0">2.0%</Option>
                    </Select>
                  </Space>
                </Space>
                <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                  <Space>
                    <Text type="secondary">网络费用</Text>
                    <Tooltip title="预估的交易矿工费">
                      <InfoCircleOutlined className="info-icon" />
                    </Tooltip>
                  </Space>
                  <Text>≈ 0.001 ETH ($2.34)</Text>
                </Space>
                {expertMode && (
                  <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                    <Space>
                      <Text type="secondary">最小接收</Text>
                      <Tooltip title="考虑滑点后的最小接收数量">
                        <InfoCircleOutlined className="info-icon" />
                      </Tooltip>
                    </Space>
                    <Text>{toAmount || '0.0'} {toToken}</Text>
                  </Space>
                )}
              </Space>
            </Card>

            <Button
              type="primary"
              size="large"
              block
              onClick={handleSwap}
              disabled={!fromAmount || !toAmount || loading}
            >
              {loading ? (
                <Space>
                  <LoadingOutlined />
                  交易确认中
                </Space>
              ) : (
                '交换'
              )}
            </Button>
          </Space>
        </Card>
      </div>

      <div className="screen-divider" />

      {/* 第二屏：交易统计 */}
      <div className="screen-content">
        <div className="screen-title">交易统计</div>
        <Card className="stats-card" bordered={false}>
          <div className="time-range-buttons">
            <Button
              type={timeRange === '24h' ? 'primary' : 'default'}
              onClick={() => setTimeRange('24h')}
            >
              24h
            </Button>
            <Button
              type={timeRange === '7d' ? 'primary' : 'default'}
              onClick={() => setTimeRange('7d')}
            >
              7d
            </Button>
            <Button
              type={timeRange === '30d' ? 'primary' : 'default'}
              onClick={() => setTimeRange('30d')}
            >
              30d
            </Button>
          </div>

          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-label">{stat.title}</div>
                <div className="stat-value">
                  {stat.value}
                  {stat.suffix && ` ${stat.suffix}`}
                </div>
                <div className={`price-change-indicator ${stat.isPositive ? 'up' : 'down'}`}>
                  {stat.isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                  {stat.change}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="screen-divider" />

      {/* 第三屏：热门交易对 */}
      <div className="screen-content">
        <div className="screen-title">热门交易对</div>
        <Card
          className="pairs-card"
          bordered={false}
          extra={
            <Space>
              <Button
                type={viewMode === 'all' ? 'primary' : 'default'}
                onClick={() => setViewMode('all')}
              >
                全部
              </Button>
              <Button
                type={viewMode === 'favorite' ? 'primary' : 'default'}
                icon={viewMode === 'favorite' ? <StarFilled /> : <StarOutlined />}
                onClick={() => setViewMode('favorite')}
              >
                收藏
              </Button>
            </Space>
          }
        >
          <div className="pairs-table-container">
            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              size="middle"
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SwapInterface;