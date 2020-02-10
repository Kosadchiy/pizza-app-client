import React from 'react';
import ProfileLayout from '../components/profile/ProfileLayout';
import { get } from '../utils/api';
import cookies from 'next-cookies';

const Profile = props => (
  <ProfileLayout data={props.data} />
);

Profile.getInitialProps = async (ctx) => {
  const { access_token } = cookies(ctx);
  if (!access_token) {
    ctx.res.writeHead(301, {
      Location: '/login'
    });
    ctx.res.end();
  }

  const response = await get('/api/orders', {}, ctx);
  if (response.status === 200) {
    return {
      data: response.data
    };
  } else {
    return {
      data: null
    }
  }
}

export default Profile;
