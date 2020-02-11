import React from 'react';
import { Select } from 'antd';
import { connect } from 'react-redux';
import { setUSDRate, setCurrency, getCurrency } from '../../utils/currencyHelper';
import { setAppCurrency } from '../../store/actions';

const { Option } = Select;

class CurrencySelect extends React.Component {
  componentDidMount () {
    const currency = getCurrency();
    if (currency) {
      this.props.setAppCurrency(currency);
    } else {
      setCurrency('EUR');
      this.props.setAppCurrency('EUR');
    }
  }

  handleChange = async (value) => {
    if (value === 'USD') {
      setCurrency('USD');
      const rate = await setUSDRate();
      if (typeof rate === 'number') {}
        this.props.setAppCurrency('USD');
    } else {
      setCurrency('EUR');
      this.props.setAppCurrency('EUR');
    }
  }

	render () {
		return (
      <Select 
        style={{width: 80}} 
        value={this.props.app.currency} 
        onChange={this.handleChange}
      >
        <Option value="EUR">EUR</Option>
        <Option value="USD">USD</Option>
      </Select>
		);
	}
}

const mapStateToProps = state => {
  return {
    app: state.app
  };
}

const mapDispatchToProps = {
  setAppCurrency
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySelect);