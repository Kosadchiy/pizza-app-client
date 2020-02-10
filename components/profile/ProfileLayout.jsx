import { Table } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { getMoneyView } from '../../utils/currencyHelper';

const columns = [
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
    dataIndex: 'total'
  },
  {
    title: 'Date', 
    dataIndex: 'created_at'
  }
];

class ProfileLayout extends React.Component { 
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
        rowKey={record => record.id}
        columns={columns}
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