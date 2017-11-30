import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Affix } from 'antd'
import styled from 'styled-components'
import AppMenu from './../components/AppMenu'
import AppFooter from './../components/AppFooter'
// import AppBreadcrumb from './../components/AppBreadcrumb'
import Login from './Login'
import Home from './Home'
import Employees from './administration/Employees'
import Users from './administration/Users'

const FullScreen = styled.div`
  height: 100vh;
  width: 100vw;
`

class App extends Component {
  state = {
    // breadcrumb: [ 'Home' ],
    user: null
  }
  loginUser(values) {
    this.setState({
      user: {
        name: values.userName,
        password: values.password
      }
    })
  }
  renderLogin() {
    return (
      <FullScreen>
        <h1>Core-React Application</h1>
        <Login onSubmit={this.loginUser.bind(this)} />
      </FullScreen>
    )
  }
  renderApplication() {
    return (
      <FullScreen>
        <Affix>
          <AppMenu user={this.state.user} />
          <Route exact path="/" component={Home}/>
          <Route path="/employees" component={Employees}/>
          <Route path="/users" component={Users}/>
        </Affix>
        <Affix offsetBottom={0}>
          <AppFooter />
        </Affix>
      </FullScreen>
    )
  }
  render() {
    let appContent = null;
    if (this.state.user === null) appContent = this.renderLogin();
    else appContent = this.renderApplication();
    return (
      <Router>
        {appContent}
      </Router>
    )
  }
}
export default App