import React from 'react';
import { Layout } from 'antd';
import Link from 'next/link';

const { Footer } = Layout;

export default function AppFooter() {
  return (
    <Footer style={{ textAlign: 'center' }}>
      Pizza-App © {new Date().getFullYear()} Created by <Link href="https://github.com/Kosadchiy"><a>Kosadchiy</a></Link>
    </Footer>
  );
}