import { Result } from 'antd';
import React from 'react';

export default class CheckoutError extends React.Component{
  render () {
    return (
      <Result
        status="success"
        title="Checkout completed"
      >
      </Result>
    );
  } 
}