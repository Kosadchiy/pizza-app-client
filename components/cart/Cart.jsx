import { Popover, Button } from 'antd';
import React from 'react';

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

export default class Cart extends React.Component {
  render () {
		return (
      <Popover placement="bottom" trigger="click" content={content} title="Shopping cart">
        <Button type="primary" icon="shopping-cart" />
      </Popover>
    );
	}
}