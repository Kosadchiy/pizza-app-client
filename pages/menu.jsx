import React from 'react';
import MenuLayout from '../components/menu/MenuLayout';
import { get } from '../utils/api';

const Menu = props => (
  <MenuLayout data={props.data} />
);

Menu.getInitialProps = async () => {
  const data = await get('/api/menu');
  return {
    ...data
  };
}

export default Menu;
