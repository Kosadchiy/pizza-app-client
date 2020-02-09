import { List, Popover, Button } from 'antd';
import React from 'react';
import CartItem from './CartItem';
import { getCart } from '../../utils/localStorage';

export default class Cart extends React.Component {
  componentDidMount = () => {
    const cart = getCart();
    if (cart)
      this.props.updateCart(cart);
  }

  cartContent = () => {
    this.props
    return (
      <List
        itemLayout="vertical"
        size="large"
        footer={
          <div>
            <span style={{fontWeight: 700, fontSize: 18}}>
              {this.props.cart.total}
            </span>
          </div>
        }
        pagination={false}
        dataSource={this.props.cart.items}
        renderItem={(item, index) => (
          <CartItem 
            cart={this.props.cart}
            index={index} 
            item={item} 
            updateCart={this.props.updateCart} 
          />
        )}
      />
    );
  };

  render () {
		return (
      <Popover placement="bottomRight" trigger="click" content={this.cartContent()} title="Shopping cart">
        <Button type="primary" icon="shopping-cart" />
        <span style={{color: '#FFF', paddingLeft: 10}}>
          {this.props.cart.total}
        </span>
      </Popover>
    );
	};
}