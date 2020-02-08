import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import Head from 'next/head';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducers from '../store/reducers';
import withRedux from 'next-redux-wrapper';
import '../resources/less/App.less';
import App from 'next/app';


const store = (initialState, options) => {
  return createStore(rootReducers);
};

class PizzaApp extends App {
  render () {
    const {Component, pageProps, store} = this.props;
    return (
      <Provider store={store}>
          <Head>
            <link rel="shortcut icon" href="/static/favicon.ico" />
          </Head>
          <AppLayout {...pageProps}>
            <div>
              <Component {...pageProps} />
            </div>
          </AppLayout>
      </Provider>
    );
  }
}

export default withRedux(store)(PizzaApp);