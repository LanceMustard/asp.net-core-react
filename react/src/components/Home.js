import React, { Component } from 'react';
import styled from 'styled-components';

const Greetings = styled.div`
  width: 100%;
  text-align: center;
`


class Home extends Component {
  render() {
    return (
      <Greetings>this is the home page</Greetings>
    )
  }
}

export default Home;