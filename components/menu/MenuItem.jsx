import React from 'react';
import { Card } from 'antd';
import MenuItemContent from './MenuItemContent';

export default class MenuItem extends React.Component {
  render () {
    return (
      <Card 
        title={this.props.item.name} 
        hoverable
        cover={
          <img
            alt="example"
            src={ process.env.SERVER_HOST + this.props.item.image }
          />
        }
      >
        <MenuItemContent item={this.props.item} />
      </Card>
    );
  }
}
