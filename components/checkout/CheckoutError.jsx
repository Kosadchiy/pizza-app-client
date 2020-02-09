import { Result } from 'antd';
import React from 'react';

export default class CheckoutError extends React.Component{
  render () {
    return (
      <Result
        status="error"
        title="Checkout Failed"
        subTitle="Something went wrong. Please, try again."
      >
      </Result>
    );
  } 
}