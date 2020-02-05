import React from 'react';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

const AppHeader = () => {
    return (
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">About</Menu.Item>
          <Menu.Item key="2">Menu</Menu.Item>
        </Menu>
      </Header>
    );
}

export default AppHeader;