import { List, Popover, Button, Spin, Row, Col } from 'antd';
import React from 'react';
import CartItem from './CartItem';
import { getCart } from '../../utils/localStorage';
import Cookie from 'js-cookie';
import { setUSDRate, getMoneyView } from '../../utils/currencyHelper';
import Router from 'next/router';

export default class Cart extends React.Component {
  state = {
    loading: true
  }

  componentDidMount = async () => {
    const cart = getCart();
    if (cart)
      this.props.updateCart(cart);

    if (!Cookie.get('USDRate'))
      await setUSDRate();
    this.setState({
      loading: false
    });
  }

  checkout = async () => {
    Router.push('/checkout');
  }

  cartContent = () => {
    this.props
    return (
      <List
        itemLayout="vertical"
        size="large"
        footer={
          <div>
            {
              this.state.loading ? <Spin /> : 
              <Row type="flex" justify="space-between" align="bottom">
                <Col>
                  <span style={{fontWeight: 700, fontSize: 18}}>
                    {getMoneyView(this.props.cart.total, this.props.currency)}
                  </span>
                </Col>
                <Col>
                  {
                    this.props.cart.total === 0 ? '' :
                    <Button type="primary" onClick={this.checkout}>
                      Order now
                    </Button>
                  }
                </Col>
              </Row>
            }
          </div>
        }
        pagination={false}
        dataSource={this.props.cart.items}
        renderItem={(item, index) => (
          <CartItem 
            cart={this.props.cart}
            index={index} 
            item={item} 
            currency={this.props.currency}
            loading={this.state.loading}
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
        {
          this.state.loading ? <Spin /> : 
          <span style={{color: '#FFF', paddingLeft: 10}}>
            {getMoneyView(this.props.cart.total, this.props.currency)}
          </span>
        }
      </Popover>
    );
	};
}