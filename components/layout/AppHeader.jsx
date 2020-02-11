import React from 'react';
import Link from 'next/link';
import { Layout, Menu, Row, Col } from 'antd';
import CartContainer from '../cart/CartContainer';
import CurrencySelect from '../currency/CurrencySelect';
import { withRouter } from 'next/router';
import ProfileMenu from '../profile/ProfileMenu';

const { Header } = Layout;

const AppHeader = ({ router }) => {
    return (
      <Header>
        <Row type="flex" justify="space-between" style={{textAlign: 'right'}}>
          <Col className="app-menu">
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={[router.pathname]}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="/">
                <Link href="/">
                  <a>About</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="/menu">
                <Link href="/menu">
                  <a>Menu</a>
                </Link>
              </Menu.Item>
            </Menu>
          </Col>
          <Col>
            <Row type="flex" justify="space-between" gutter={10}>
              <Col>
                <CurrencySelect />
              </Col>
              <Col>
                <CartContainer />
              </Col>
              <Col>
                <ProfileMenu />
              </Col>
            </Row>
          </Col>
        </Row>
      </Header>
    );
}

export default withRouter(AppHeader);