import React, { useState } from 'react';
import { Layout, Menu, theme, Button } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  TeamOutlined,
  EnvironmentOutlined,
  DollarOutlined,
  ToolOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import MenuHome from '../modules/header/MenuHome';
import { AuthService } from '../services/AuthService';
import { UserRole } from '../common/enums/user-role.enum';

const { Header, Sider, Content } = Layout;

interface IAppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<IAppLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const isAdmin = AuthService.hasRole(UserRole.ADMIN);

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: 'Главная',
    },
    {
      key: '/scheme',
      icon: <HomeOutlined />,
      label: 'Пример подключения',
    },
    {
      key: '/connection-points',
      icon: <EnvironmentOutlined />,
      label: 'Точки подключения',
    },
    {
      key: '/clients',
      icon: <TeamOutlined />,
      label: 'Клиенты',
    },
    {
      key: '/payments',
      icon: <DollarOutlined />,
      label: 'Платежи',
    },
    {
      key: '/works',
      icon: <ToolOutlined />,
      label: 'Работы',
    },
    ...(isAdmin ? [{
      key: '/materials',
      icon: <ShoppingOutlined />,
      label: 'Материалы',
    }] : []),
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <MenuHome />
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div style={{ 
            height: 32, 
            margin: 16, 
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: borderRadiusLG,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: collapsed ? 14 : 16,
          }}>
            {collapsed ? 'АН' : 'АкваНет'}
          </div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={({ key }) => navigate(key)}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}; 