import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { addBreadcrumb } from './../actions/breadcrumbs'

const RightAlignLink = styled(Link)`
  float: right !important;
`

export class BreadcrumbLink extends Component {
  handleClick = () => {
    if (this.props.addBreadcrumb) {
      this.props.addBreadcrumb({
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

function mapStateToProps(state) {
  return { breadcrumbs: state.breadcrumbs }
}

export default connect(mapStateToProps, {
  addBreadcrumb
})(BreadcrumbLink)