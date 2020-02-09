import React from 'react';
import { Select } from 'antd';
import { connect } from 'react-redux';
import { setUSDRate } from '../../utils/currencyHelper';
import { setAppCurrency } from '../../store/actions';

const { Option } = Select;

class CurrencySelect extends React.Component {
  handleChange = async (value) => {
    if (value === 'USD') {
      const rate = await setUSDRate();
      if (typeof rate === 'number')
        this.props.setAppCurrency('USD');
    } else {
      this.props.setAppCurrency('EUR');
    }
  }

	render () {
		return (
			<Select defaultValue="EUR" style={{ width: 120 }} onChange={this.handleChange}>
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