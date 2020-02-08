import React from 'react';
import Link from 'next/link';
import { Layout, Menu, Row, Col } from 'antd';
import CartContainer from '../cart/CartContainer';

const { Header } = Layout;

const AppHeader = () => {
    return (
      <Header>
        <Row type="flex" justify="space-between" style={{textAlign: 'right'}}>
          <Col>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">
                <Link href="/">
                  <a>About</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link href="/menu">
                  <a>Menu</a>
                </Link>
              </Menu.Item>
            </Menu>
          </Col>
          <Col>
            <CartContainer />
          </Col>
        </Row>
      </Header>
    );
}

export default AppHeader;