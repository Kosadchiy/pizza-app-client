import React from 'react'
import Link from 'next/link'
import { Layout, PageHeader, Breadcrumb } from 'antd'
import AppFooter from './AppFooter';
import AppHeader from './AppHeader';

const breadCrumbs = routes => {
  return routes.map((item, key) => {
    return (
      <Breadcrumb.Item key={key}>
        <Link href={item.path}>
          <a>{item.breadcrumbName}</a>
        </Link>
      </Breadcrumb.Item>
    );
  });
}

const { Content } = Layout;
class AppLayout extends React.Component {
  render () {
    const { props } = this;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Layout>
          <AppHeader user={props.user} />
            <Breadcrumb style={{ margin: '16px 24px 0 16px' }}>
              { props.routes ? breadCrumbs(props.routes) : '' }
            </Breadcrumb>
          <PageHeader  style={{ padding: '0px 24px 16px 16px' }} title={props.title} subTitle={props.subTitle}>
          </PageHeader>
          <Content style={{ margin: '0 16px' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {props.children}
            </div>
          </Content>
          <AppFooter />
        </Layout>
      </Layout>
    );
  }
}

export default AppLayout;