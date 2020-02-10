import { Table } from 'antd';
import React from 'react';

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

export default class ProfileLayout extends React.Component {  
	render () {
    console.log(this.props);
		return (
			<Table
        columns={columns}
        expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
        dataSource={this.props.data.items}
      />
		);
	}
}