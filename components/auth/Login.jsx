import React from 'react';
import { connect } from 'react-redux';
import { setAppUser } from '../../store/actions';
import Router from 'next/router'
import Link from 'next/link'
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
import { post, get } from '../../utils/api';
import Cookie from 'js-cookie';

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
    
    if (response.status === 200) {
      if (this.props.form.getFieldValue('remember')) {
        Cookie.set("access_token", response.data.access_token, { expires: 30 });
      } else {
        Cookie.set("access_token", response.data.access_token);
      }
      await this.getUser();
    }   
  }

  getUser = async () => {
    const response = await get('/api/user');
    if (response.status === 200) {
      if (this.props.form.getFieldValue('remember')) {
        Cookie.set("user", response.data, { expires: 30 });
      } else {
        Cookie.set("user", response.data);
      }
      this.props.setAppUser(response.data);
      Router.push('/');
    } else {
      Cookie.remove('access_token');
    }
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

const mapStateToProps = state => {
  return {
    user: state.user
  };
}

const mapDispatchToProps = {
  setAppUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Login));
