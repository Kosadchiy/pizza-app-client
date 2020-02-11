import React from 'react';
import Link from 'next/link';
import { Menu, Icon, Dropdown, Button } from 'antd';
import { connect } from 'react-redux';
import { setAppUser } from '../../store/actions';
import Cookies from 'js-cookie';

class ProfileMenu extends React.Component {
  componentDidMount () {
    const user = Cookies.get('user');
    if (user) {
      this.props.setAppUser(JSON.parse(user));
    }
  }

  profileMenu = () => {
    return (
      <Menu>
        <Menu.Item key="1">
          <Link href='/profile'>
            <a className='ant-dropdown-menu-item'>
              <Icon type="user" />
              Profile
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item onClick={this.logout} key="2">
          <Icon type="logout" />
          Logout
        </Menu.Item>
      </Menu>
    );
  }

  logout = () => {
    Cookies.remove('user');
    Cookies.remove('access_token');
    this.props.setAppUser(null);
  }

	render () {
		return (
      <>
        {
          this.props.user ? 
          <Dropdown overlay={this.profileMenu()}>
            <Button className="profile-button">
              {this.props.user.email} <Icon type="down" />
            </Button>
          </Dropdown>
          :
          <Link href="/login">
            <a style={{color: '#FFF'}}>Login</a>
          </Link>
        }
      </>
		);
	}
}

const mapStateToProps = state => {
  return {
    user: state.app.user
  };
}

const mapDispatchToProps = {
  setAppUser
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMenu);