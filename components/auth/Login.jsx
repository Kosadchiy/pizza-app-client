import React from 'react';
import axios from 'axios';
import Router from 'next/router'
import Link from 'next/link'
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
import { post } from '../../utils/api';

class Login extends React.Component {

  login = async () => {
    this.setState({
      loading: true
    });

    const response = await post('/oauth/token', {
      grant_type: 'password',
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      username: this.props.form.getFieldValue('email'),
      password: this.props.form.getFieldValue('password'),
      scope: ''
    });
    console.log(response);    
  }

  getUser = async (token) => {
    const user = await axios.get(process.env.SERVER_HOST + '/api/user', 
    {
      headers: {
        'Authorization': `${token.token_type} ${token.access_token}`
      }
    })
    .then( async response => {
      return response.data;  
    })
    .catch(function (error) {
      errorMessage(error.response.data.message);
    });

    return user;
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row type="flex">
        <Col style={{ marginLeft: 'auto', marginRight: 'auto'}}>
          <Form>
            <Form.Item key='email'>
              {getFieldDecorator('email', {
                rules: [{ required: true }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
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
            <Form.Item key='remember'>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
              })
              (<Checkbox name="remember">Remember me</Checkbox>)}
            </Form.Item>
            <Button onClick={this.login} type="primary" className="login-form-button">
              Sign in
            </Button>
            <span style={{marginLeft: 10}}>or 
              <Link href="/register">
                <a> register</a>
              </Link>
            </span>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default Form.create()(Login);
