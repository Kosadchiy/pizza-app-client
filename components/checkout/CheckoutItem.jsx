import { setCart } from '../../utils/localStorage';
import React from 'react';
import { List, Button, Icon, Badge } from 'antd';
import { getMoneyView } from '../../utils/currencyHelper';

export default class CheckoutItem extends React.Component {
	increase = () => {
    this.props.cart.items.forEach(item => {
      if (item === this.props.item) {
        item.qty += 1;
      }
    });
    this.props.cart.total += this.props.item.price;
    setCart(this.props.cart);
    this.props.updateCart(this.props.cart);
  };

  decline = () => {
    this.props.cart.items.forEach(item => {
      if (item === this.props.item && item.qty > 1) {
        item.qty -= 1;
        this.props.cart.total -= this.props.item.price;
        setCart(this.props.cart);
        this.props.updateCart(this.props.cart);
        return;
      }
    });
  };

  onDelete = () => {
    this.props.cart.items.forEach((item, index) => {
      if (item === this.props.item) {
        this.props.cart.items.splice(index, 1);
        this.props.cart.total -= this.props.item.price * this.props.item.qty;
        setCart(this.props.cart);
        this.props.updateCart(this.props.cart);
        return;
      }
    });
  }

  render () {
		return (
      <List.Item
        key={this.props.index}
        extra={
          <img
            height={100}
            alt={this.props.item.name}
            src={process.env.SERVER_HOST + this.props.item.image}
          />
        }
      >
        <List.Item.Meta
          title={this.props.item.name}
          description={this.props.item.option}
        />
        {this.props.price}
        <div>
          <Button size="small" onClick={this.decline}>
            <Icon type="minus" />
          </Button>
          <Badge 
            count={this.props.item.qty} 
            style={{ 
              backgroundColor: '#fff', 
              color: '#999', 
              boxShadow: '0 0 0 1px #d9d9d9 inset',
              margin: 5
            }}
          />
          <Button size="small" onClick={this.increase}>
            <Icon type="plus" />
          </Button>
          <Button 
            type="danger" 
            shape="circle" 
            icon="delete" 
            size="small" 
            style={{marginLeft: 10}} 
            onClick={this.onDelete}
          />
        </div>
        <span style={{fontWeight: 700}}>
          {
            this.props.loading ? '...' :
            `Subtotal: ${getMoneyView((this.props.item.price * this.props.item.qty), this.props.currency)}`
          }
        </span>
      </List.Item>
    );
	}
};