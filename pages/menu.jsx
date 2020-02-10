import React from 'react';
import MenuLayout from '../components/menu/MenuLayout';
import { get } from '../utils/api';

const Menu = props => (
  <MenuLayout data={props.data} />
);

Menu.getInitialProps = async () => {
  const response = await get('/api/menu');
  if (response.status === 200) {
    return {
      ...response.data
    };
  } else {
    return {}
  }
}

export default Menu;
