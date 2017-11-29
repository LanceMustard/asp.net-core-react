import React, { Component } from 'react';
import { Breadcrumb, Icon } from 'antd';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 5px 0px 5px 20px;
`

class AppBreadcrumb extends Component {
  render() {
    return (
      <Wrapper>
        <Breadcrumb>
          <Breadcrumb.Item href="">
            <Icon type="home" />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="">
            <Icon type="user" />
            <span>Application List</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            Application
          </Breadcrumb.Item>
        </Breadcrumb>
      </Wrapper>
    )
  }
}

export default AppBreadcrumb;