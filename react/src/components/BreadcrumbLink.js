import React, { Component } from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const RightAlignLink = styled(Link)`
  float: right !important;
`

export class BreadcrumbLink extends Component {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick({
        description: this.props.description,
        path: this.props.from
      })
    } else console.error('No onClick event defined on BreadcrumbLink')

  }
  render() {
    return (
      <RightAlignLink to={this.props.to}>
        <Button icon="select" onClick={this.handleClick} type="primary">
          {this.props.label || 'Open'}
        </Button>
      </RightAlignLink>
    )
  }
}

export default BreadcrumbLink;