import React from 'react';
import { Result, Icon } from 'antd';
import Link from 'next/link';

export default function Index() {
  return (
    <Result
      icon={<Icon type="smile" theme="twoTone" />}
      title="Hello! This is a simple pizza ordering application."
      extra={
        <Link href="/menu">
          <a>Let's start</a>
        </Link>
      }
    />
  );
}
