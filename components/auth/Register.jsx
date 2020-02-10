import React from 'react';
import Router from 'next/router';
import { Form, Icon, Input, Button, Row, Col } from 'antd';
import { post } from '../../utils/api';

class Register extends React.Component {

  register = async () => {
    this.setState({
      loading: true
    });

    const response = await post('/api/register', {
      name: this.props.form.getFieldValue('email'),
      email: this.props.form.getFieldValue('email'),
      password: this.props.form.getFieldValue('password'),
      password_confirmation: this.props.form.getFieldValue('password_confirmation'),
    });
    
    if (response.status === 200) {
      Router.push('/login');
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row type="flex">
        <Col style={{ marginLeft: 'auto', marginRight: 'auto'}}>
          <Form>
            <Form.Item key='name'>
              {getFieldDecorator('name', {
                rules: [{ required: true }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Name"
                  name="name"
                />
                )}
            </Form.Item>
            <Form.Item key='email'>
              {getFieldDecorator('email', {
                rules: [{ required: true }],
              })(
                <Input
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Email"
                  name="email"
                />
                )}
            </Form.Item>
            <Form.Item key='password'>
              {getFieldDecorator('password', {
                rules: [{ required: true }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Password"
                  type="password"
                  name="password"
                />
                )}
            </Form.Item>
            <Form.Item key='password_confirmation'>
              {getFieldDecorator('password_confirmation', {
                rules: [{ required: true }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Password confirmation"
                  type="password"
                  name="password_confirmation"
                />
                )}
            </Form.Item>
            <Button onClick={this.register} type="primary" className="login-form-button">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default Form.create()(Register);
