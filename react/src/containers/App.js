import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Affix } from 'antd'
import styled from 'styled-components'
import { addBreadcrumb, removeBreadcrumb } from './../actions/breadcrumbs'
import AppMenu from './../components/AppMenu'
import AppFooter from './../components/AppFooter'
import AppBreadcrumb from './../components/AppBreadcrumb'
import Login from './Login'
import Home from './Home'
import Users from './users/Users'
import Roles from './roles/Roles'
import Permissions from './permissions/Permissions'
import Clients from './clients/Clients'
import Projects from './projects/Projects'
import Suppliers from './suppliers/Suppliers'
import Orders from './orders/Orders'
import DocumentCodes from './documentCodes/DocumentCodes'
import PackageTemplates from './packageTemplates/PackageTemplates'
import Libraries from './libraries/Libraries'
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
        <h1>Supplier Portal</h1>
        <Login onSubmit={this.loginUser.bind(this)} />
      </FullScreen>
    )
  }

  renderApplication() {
    return (
      <FullScreen>
        <Affix>
          <AppMenu user={this.state.user} />
          <AppBreadcrumb data={this.props.breadcrumbs.links}/>
          <Route exact path="/" component={Home}/>
          <Route path="/users/:id?" component={Users}/>
          <Route path="/roles/:id?" component={Roles}/>
          <Route path="/permissions" component={Permissions}/>
          <Route path="/clients/:id?" component={Clients}/>
          <Route path="/projects/:id?" component={Projects}/>
          <Route path="/suppliers/:id?" component={Suppliers}/>
          <Route path="/orders/:id?" component={Orders}/>
          <Route path="/documentcodes/:id?" component={DocumentCodes}/>
          <Route path="/packagetempletes/:id?" component={PackageTemplates}/>
          <Route path="/libraries/:id?" component={Libraries}/>
        </Affix>
        {/* <Affix offsetBottom={0}>
          <AppFooter />
        </Affix> */}
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

function mapStateToProps(state) {
  return { breadcrumbs: state.breadcrumbs }
}

export default connect(mapStateToProps,
  { addBreadcrumb,
    removeBreadcrumb
   })(App)

// export default App