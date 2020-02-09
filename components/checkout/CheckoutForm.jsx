import React from 'react';
import { Form, Button, Input } from 'antd';
import { post } from '../../utils/api';
import { removeCart } from '../../utils/localStorage';
import TextArea from 'antd/lib/input/TextArea';
import Router from 'next/router';

class CheckoutForm extends React.Component {

  onConfirm = async () => {
    const data = this.props.form.getFieldsValue();
    const result = await post('/api/orders/confirm', {
      ...data,
      ...this.props.cart
    });
    console.log(result);
    
    if (result && result.errors) {
      this.showErrors(result.errors)
    } else if (result && result.modified) {
      this.props.showMudifiedNotify();
    } else if (result && result.status === 'confirmed') {
      removeCart();
      this.props.updateCart({
        items: [],
        total: 0
      });
      Router.push('/checkout-success')  
    }
  };

  showErrors = (errors) => {
    const errorsObject = {};
    for (let fieldName in errors) {
      errorsObject[fieldName] = {
        errors: errors[fieldName].map(item => { return new Error(item) })
      }
    }
    this.props.form.setFields(errorsObject);
  }

  renderForm = () => {
    const { getFieldDecorator } = this.props.form;
      return (
        <>
          <Form.Item key='name' label='Name'>
            {getFieldDecorator('name', {
              rules: [{ required: true }],
            })(<Input name='name' />)}
          </Form.Item>
          <Form.Item key='phone' label='Phone'>
            {getFieldDecorator('phone', {
              rules: [{ required: true }],
            })(<Input name='phone' />)}
          </Form.Item>
          <Form.Item key='address' label='Address'>
            {getFieldDecorator('address', {
              rules: [{ required: true }],
            })(<TextArea name='address' />)}
          </Form.Item>
          <Form.Item key='comment' label='Comment'>
            {getFieldDecorator('comment', {
            })(<TextArea name='comment' />)}
          </Form.Item>
        </>
      );
  }

  onClose = () => {
    this.setState({
      visible: false,
      itemId: null,
      itemTitle: null,
    });
  };

  render () {
    return (
      <Form layout="vertical">
        {this.renderForm()}
        <Button onClick={this.onConfirm} type="primary">
          Confirm
        </Button>
      </Form>
    );
  }
}

export default Form.create()(CheckoutForm);
