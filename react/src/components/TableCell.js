import React, { Component } from 'react';
import { Input } from 'antd';

// allows a Cell to be in edit mode
class TableCell extends Component {
  state = {
    value: this.props.value
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }
  render() {
    const { value } = this.state;
    return (
      <div>
        {
          this.props.editable ?
            <Input
              value={value}
              onChange={this.handleChange}
            />
            :
            <div>
              {value || ' '}
            </div>
        }
      </div>
    );
  }
}

export default TableCell;