import React, { Component } from 'react'
import { Menu, Icon, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components';

const SubMenu = Menu.SubMenu;
const AppSettings = styled.div`
  float: right;
  margin-right: 20px;
  display: block;
  height: 100%;
`
const UserAvatar = styled(Avatar)`
  vertical-align: middle;
  margin-left: 20px;
`

class AppMenu extends Component {
  state = {
    current: 'mail',
  }
  handleClick = (e) => {
    // console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }
  render() {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
        theme="dark"
      >
        <Menu.Item key="home">
          <Link to="/"><Icon type="mail" />Home</Link>
        </Menu.Item>
        <SubMenu title={<span><Icon type="setting" />Administration</span>}>
          <Menu.Item key="user"><Link to="/employee">Users</Link></Menu.Item>
          <Menu.Item key="user-defined-attributes">User Defined Attributes</Menu.Item>
          <Menu.Item key="evaluators">Evaluators</Menu.Item>
          <Menu.Item key="data-writers">Date Writers</Menu.Item>
          <Menu.Item key="settings">Settings</Menu.Item>
        </SubMenu>
        <SubMenu title={<span><Icon type="setting" />Company</span>}>
          <Menu.Item key="asset">Asset Maintenance</Menu.Item>
          <Menu.Item key="project">Project Maintenance</Menu.Item>
        </SubMenu>
        <SubMenu title={<span><Icon type="setting" />Library</span>}>
          <Menu.Item key="library">Library Maintenance</Menu.Item>
          <Menu.Item key="discipline">Discipline Maintenance</Menu.Item>
          <Menu.Item key="class">Class Maintenance</Menu.Item>
          <Menu.Item key="attribute-group">Attribute Group Maintenance</Menu.Item>
          <Menu.Item key="attribute">Attribute Maintenance</Menu.Item>
          <Menu.Item key="uom">UOM Maintenance</Menu.Item>
          <Menu.Item key="enumerated-list">Enumerated List Maintenance</Menu.Item>
          <Menu.Item key="data-type">Data Type Maintenance</Menu.Item>
        </SubMenu>
        <SubMenu title={<span><Icon type="setting" />Authoring</span>}>
          <Menu.Item key="application">Application Maintenance</Menu.Item>
          <Menu.Item key="mappings">Mappings</Menu.Item>
          <Menu.Item key="authoring-matrix">Authoring Matrix</Menu.Item>
        </SubMenu>
        <AppSettings>
          { this.props.user.name }
          <UserAvatar icon="user" />
        </AppSettings>
      </Menu>
    );
  }
}

export default AppMenu;