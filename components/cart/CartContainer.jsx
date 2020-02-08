import { connect } from 'react-redux';
import Cart from './Cart';
import { updateCart } from '../../store/cart/actions';
import React from 'react';

class CartContainer extends React.Component {
  render () {
		return (
      <Cart 
        cart={this.props.cart} 
        updateCart={this.props.updateCart} 
      />
    );
	}
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  };
}

const mapDispatchToProps = {
  updateCart
};

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);