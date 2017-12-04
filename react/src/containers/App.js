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
import { saveUser, loadUser } from './../localStorage'

const FullScreen = styled.div`
  height: 100vh;
  width: 100vw;
`

class App extends Component {
  state = {
    user: loadUser()  // bit of a crude way of persiting user state, probably should manage this is Redux
  }
  loginUser(values) {
    let user = {
      name: values.userName,
      password: values.password
    }
    this.setState({user})
    saveUser(user)
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
    if (this.state.user === null || this.state.user === undefined) appContent = this.renderLogin();
    else appContent = this.renderApplication();
    return (
      <Router>
        {appContent}
      </Router>
    )
  }
}
export default App