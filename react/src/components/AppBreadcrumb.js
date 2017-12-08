import React, { Component } from 'react'
import { Breadcrumb, Icon } from 'antd'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 5px 0px 5px 20px;
`

class AppBreadcrumb extends Component {
  handleClick = (e) => {
    if (this.props.onClick) this.props.onClick(e.target.pathname)
  }

  renderBreadcrumb(breadcrumb) {
    return (
      <Breadcrumb.Item 
        onClick={this.handleClick}        
        key={breadcrumb.uuid}
        href={breadcrumb.path}>
        {breadcrumb.description}
      </Breadcrumb.Item>
    )
  }

  render() {
    return (
      <Wrapper>
        <Breadcrumb>
          <Breadcrumb.Item href="/">
            <Icon type="home" />
          </Breadcrumb.Item>
          { this.props.data ? this.props.data.map(x => this.renderBreadcrumb(x)) : null }
        </Breadcrumb>
      </Wrapper>
    )
  }
}

export default AppBreadcrumb;