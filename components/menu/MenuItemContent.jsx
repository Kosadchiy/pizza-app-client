import React from 'react';
import { connect } from 'react-redux';
import { Radio, Spin, Statistic, Row, Col, Button } from 'antd';
import { updateCart } from '../../store/cart/actions';
import { setCart } from '../../utils/localStorage';
import { successMessage } from '../../utils/api';
import { getMoneyView, setUSDRate } from '../../utils/currencyHelper';
import Cookie from 'js-cookie';

class MenuItemContent extends React.Component {
  state = {
    price: this.props.item.options[0].price,
    option: this.props.item.options[0].name,
    loading: true
  }

  componentDidMount = async () => {
    if (!Cookie.get('USDRate'))
      await setUSDRate();
    this.setState({
      loading: false
    });
  }

  onAddToCart = () => {
    let cart = this.props.cart;
    const index = this.checkIfInCart();
    if (index !== false) {
      cart.items[index].qty += 1;
    } else {
      cart.items.push({
        id: this.props.item.id,
        name: this.props.item.name,
        image: this.props.item.image,
        price: this.state.price,
        option: this.state.option,
        qty: 1
      });
    }
    cart.total += this.state.price;
    setCart(this.props.cart);
    this.props.updateCart(cart)
    successMessage('Added to cart');
  }

  checkIfInCart = () => {
    let index = false;
    this.props.cart.items.forEach((cartItem, i) => {
      if (cartItem.id === this.props.item.id && cartItem.option === this.state.option) {
        index = i;
        return;
      }
    });
    return index;
  }

  onOptionChange = (e) => {
    this.setState({
      price: e.target.value,
      option: e.target.option
    });
  }

  renderOptions = () => {
    const options = this.props.item.options;
    return options.map((item, index) => {
      return <Radio.Button key={index} option={item.name} value={item.price}>{item.name}</Radio.Button>;
    })
  }

  render () {
    return (
      <>
        <p>
          {this.props.item.description}<br/>
        </p>
        <div style={{marginBottom: 10}}>
          <Radio.Group onChange={this.onOptionChange} defaultValue={this.props.item.options[0].price}>
            {this.renderOptions()}
          </Radio.Group>
        </div>
        <Row type="flex" justify="space-between" align="bottom">
          <Col span={8}>
            {
              this.state.loading ? <Spin /> : 
              <Statistic 
                title="Price" 
                value={
                  getMoneyView(this.state.price, this.props.currency)
                } 
                precision={2} 
              />
            }
          </Col>
          <Col span={6}>
          <Button type="primary" icon="shopping-cart" onClick={this.onAddToCart}>
            Add
          </Button>
          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    currency: state.app.currency
  };
}

const mapDispatchToProps = {
  updateCart
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItemContent);
