import React from 'react';
import { Radio, Statistic, Icon, Row, Col, Card, Button } from 'antd';

export default class MenuItem extends React.Component {
  state = {
    price: this.props.options[0].price
  }

  onOptionChange = (e) => {
    this.setState({
      price: e.target.value
    });
  }

  renderOptions = () => {
    const options = this.props.options;
    return options.map((item, index) => {
      return <Radio.Button key={index} value={item.price}>{item.name}</Radio.Button>;
    })
  }

  render () {
    return (
      <Card 
        title={this.props.title} 
        hoverable
        cover={
          <img
            alt="example"
            src="https://cdn.tasteatlas.com/images/dishes/b05a0af72ad845f3a6abe16143d7853a.jpg?w=600&h=450"
          />
        }
      >
        <p>
          {this.props.description}<br/>
        </p>
        <div style={{marginBottom: 10}}>
          <Radio.Group onChange={this.onOptionChange} defaultValue={this.props.options[0].price}>
            {this.renderOptions()}
          </Radio.Group>
        </div>
        <Row type="flex" justify="space-between" align="middle">
          <Col span={6}>
            <Statistic title="Price" value={this.state.price} precision={2} />
          </Col>
          <Col span={6}>
          <Button type="primary" icon="shopping-cart">
            Add
          </Button>
          </Col>
        </Row>
      </Card>
    );
  }
}
