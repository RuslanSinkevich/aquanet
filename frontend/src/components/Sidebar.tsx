import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, ToolOutlined, DollarOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Sider } = Layout;

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/works',
      icon: <ToolOutlined />,
      label: 'Работы',
    },
    {
      key: '/users',
      icon: <UserOutlined />,
      label: 'Пользователи',
    },
    {
      key: '/payments',
      icon: <DollarOutlined />,
      label: 'Платежи',
    },
  ];

  return (
    <Sider width={200} style={{ background: '#fff' }}>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        style={{ height: '100%', borderRight: 0 }}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
      />
    </Sider>
  );
}; 