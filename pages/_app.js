import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import Head from 'next/head';
import '../resources/less/App.less';

export default function PizzaApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/static/favicon.ico" />
      </Head>
      <AppLayout {...pageProps}>
        <div>
          <Component {...pageProps} />
        </div>
      </AppLayout>
    </>
  );
}