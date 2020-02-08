import { Col, Row } from 'antd';
import React from 'react';
import MenuItem from './MenuItem';

export default class MenuLayout extends React.Component {
	renderManuItems = () => {
		const items = this.props.data;
		return items.map((item, index) => {
			return (
				<Col key={index} span={6}>
					<MenuItem 
						title={item.name} 
						description={item.description}
						options={item.options}
					/>
				</Col>
			);
		})
	}

	render () {
		return (
			<Row gutter={20}>
				{this.renderManuItems()}
			</Row>
		);
	}
}