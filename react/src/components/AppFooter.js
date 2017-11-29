import React, { Component } from 'react';
import styled from 'styled-components';

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
`;

class AppFooter extends Component {
  render() {
    return (
      <Footer>
        <label>This app is under construction</label>
      </Footer>
    )
  }
}

export default AppFooter;