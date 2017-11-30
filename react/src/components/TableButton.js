import React, { Component } from 'react';
import { Icon } from 'antd';
import styled, { css }  from 'styled-components';

const ActionIcon = styled(Icon)`
  padding: 0 20px 0 0;

  ${props => props.hidden && css`
    visibility: hidden;
    width: 0px;
    padding: 0px;
  `}
`
class TableButton extends Component {
  // click = () => {
  //   if (this.props.handleClick) {
  //     this.props.handleClick();
  //   }
  // }

  render() {
    return  (
      <ActionIcon
        type={this.props.type}
        hidden={this.props.hidden}
        onClick={this.props.onClick}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        onFocus={this.props.onFocus}
        />
    )
  }
}

export default TableButton