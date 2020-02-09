import { Col, Row, Spin, List, Alert } from 'antd';
import { getCart, setCart } from '../../utils/localStorage';
import { updateCart } from '../../store/cart/actions';
import { post } from '../../utils/api';
import { getMoneyView } from '../../utils/currencyHelper';
import CheckoutItem from './CheckoutItem';
import CheckoutForm from './CheckoutForm';
import CheckoutError from './CheckoutError';
import React from 'react';
import { connect } from 'react-redux';

class CheckoutLayout extends React.Component {
  state = {
    loading: true,
    error: false,
    modified: false
  }

  componentDidMount = async () => {
    let cart = getCart();
    cart = await post('/api/orders/check', cart);
    
    if (cart.error) {
      this.setState({
        loading: false,
        error: true
      });
    } else {
      setCart(cart);
      this.props.updateCart(cart);
      this.setState({
        loading: false,
        modified: cart.modified ? true : false
      });
    }
  };

  showMudifiedNotify = () => {
    this.setState({
      modified: true
    })
  }

  renderError = () => {
    return <CheckoutError/>;
  }

  renderContent = () => {
    if (this.state.loading) {
      return (
        <Col type="flex" align="middle">
          <Spin />
        </Col>
      );
    } else {
      return (
        <>
          {
            this.state.modified ?
              <Alert
                message="Products in shopping cart have been modified"
                description="Please, check your shopping cart."
                type="warning"
                showIcon
              />
            : ''
          }
          <Col span={8}>
            <List
              itemLayout="vertical"
              size="large"
              footer={
                <div>
                  <span style={{fontWeight: 700, fontSize: 18}}>
                    Total: {getMoneyView(this.props.cart.total, this.props.currency)}
                  </span>
                </div>
              }
              pagination={false}
              dataSource={this.props.cart.items}
              renderItem={(item, index) => (
                <CheckoutItem 
                  cart={this.props.cart}
                  index={index} 
                  item={item} 
                  currency={this.props.currency}
                  loading={this.state.loading}
                  updateCart={this.props.updateCart} 
                />
              )}
            />
          </Col>
          <Col span={16}>
            <CheckoutForm 
              cart={this.props.cart} 
              showMudifiedNotify={this.showMudifiedNotify} 
              updateCart={this.props.updateCart}
            />
          </Col>
        </>
      )
    }
  }

	render () {
		return (
			<Row gutter={50}>
        {
          this.state.error ? this.renderError() : this.renderContent()          
        }
			</Row>
		);
	}
};

const mapStateToProps = state => {
  return {
    cart: state.cart,
    currency: state.app.currency
  };
};

const mapDispatchToProps = {
  updateCart
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutLayout);