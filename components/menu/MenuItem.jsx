import React from 'react';
import { Radio, Statistic, Icon, Row, Col, Card, Button } from 'antd';
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
            src="https://cdn.tasteatlas.com/images/dishes/b05a0af72ad845f3a6abe16143d7853a.jpg?w=600&h=450"
          />
        }
      >
        <MenuItemContent item={this.props.item} />
      </Card>
    );
  }
}
