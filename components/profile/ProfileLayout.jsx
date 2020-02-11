import { Table } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { getMoneyView } from '../../utils/currencyHelper';

class ProfileLayout extends React.Component { 
  columns = () => {
    return [
      { 
        title: 'Number', 
        dataIndex: 'id'
      },
      { 
        title: 'Address', 
        dataIndex: 'address'
      },
      { 
        title: 'Status', 
        dataIndex: 'status'
      },
      { 
        title: 'Total', 
        dataIndex: 'total',
        render: text =>(
          getMoneyView(text, this.props.currency)
        )
      },
      {
        title: 'Date', 
        dataIndex: 'created_at'
      }
    ];
  }

  expandedRowRender = (record) => {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name'
      },
      {
        title: 'Option',
        dataIndex: 'option'
      },
      {
        title: 'Price',
        dataIndex: 'price',
        render: text =>(
          getMoneyView(text, this.props.currency)
        )
      },
      {
        title: 'Quantity',
        dataIndex: 'qty'
      },
    ];
    return <Table rowKey={record => record.id} columns={columns} dataSource={record.items} pagination={false} />;
  }

	render () {
    console.log(this.props);
		return (
			<Table
        scroll={{ x: 'auto' }}
        rowKey={record => record.id}
        columns={this.columns()}
        expandedRowRender={this.expandedRowRender}
        dataSource={this.props.data.items}
      />
		);
	}
}

const mapStateToProps = state => {
  return {
    currency: state.app.currency
  };
}

export default connect(mapStateToProps, {})(ProfileLayout);