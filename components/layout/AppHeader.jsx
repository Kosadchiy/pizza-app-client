import React from 'react';
import Link from 'next/link';
import { Layout, Menu, Row, Col } from 'antd';
import CartContainer from '../cart/CartContainer';
import CurrencySelect from '../currency/CurrencySelect';

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
            <Row type="flex" justify="space-between" gutter={20}>
              <Col>
                <CurrencySelect />
              </Col>
              <Col>
                <CartContainer />
              </Col>
            </Row>
          </Col>
        </Row>
      </Header>
    );
}

export default AppHeader;