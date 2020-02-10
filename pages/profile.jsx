import React from 'react';
import ProfileLayout from '../components/profile/ProfileLayout';
import { get } from '../utils/api';

const Profile = props => (
  <ProfileLayout data={props.data} />
);

Profile.getInitialProps = async (ctx) => {
  const response = await get('/api/orders', {}, ctx);
  if (response.status === 200) {
    return {
      data: response.data
    };
  } else {
    return {}
  }
}

export default Profile;
