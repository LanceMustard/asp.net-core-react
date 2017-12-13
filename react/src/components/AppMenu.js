import React, { Component } from 'react'
import { Menu, Icon, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

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
          <Link to="/"><Icon type="home" />Home</Link>
        </Menu.Item>
        <SubMenu title={<span><Icon type="caret-down" />Administration</span>}>
          <MenuItemGroup key="security" title="Security">
            <Menu.Item key="user"><Link to="/users">Users</Link></Menu.Item>
            <Menu.Item key="roles"><Link to="/roles">Roles</Link></Menu.Item>
            <Menu.Item key="permissions"><Link to="/permissions">Permissions</Link></Menu.Item>
          </MenuItemGroup>
          <Menu.Item key="documentcodes"><Link to="/documentcodes">Document Codes</Link></Menu.Item>
          <Menu.Item key="packagetempletes"><Link to="/packagetempletes">Package Templates</Link></Menu.Item>
          {/* <Menu.Item key="user-defined-attributes"><Link to="/employees">User Defined Attributes</Link></Menu.Item>
          <Menu.Item key="evaluators">Evaluators</Menu.Item>
          <Menu.Item key="data-writers">Data Writers</Menu.Item>
          <Menu.Item key="settings">Settings</Menu.Item>*/}
        </SubMenu>
        <SubMenu title={<span><Icon type="caret-down" />Supplier Portal</span>}>
          <Menu.Item key="client"><Link to="/clients">Client Maintenace</Link></Menu.Item>
          <Menu.Item key="project"><Link to="/projects">Project Maintenance</Link></Menu.Item>
          <Menu.Item key="supplier"><Link to="/suppliers">Supplier Maintenance</Link></Menu.Item>
          <Menu.Item key="order"><Link to="/orders">Order Maintenance</Link></Menu.Item>
        </SubMenu>
        {/* <SubMenu title={<span><Icon type="caret-down" />Company</span>}>
          <Menu.Item key="asset">Asset Maintenance</Menu.Item>
          <Menu.Item key="project2">Project Maintenance</Menu.Item>
        </SubMenu>
        <SubMenu title={<span><Icon type="caret-down" />Library</span>}>
          <Menu.Item key="library">Library Maintenance</Menu.Item>
          <Menu.Item key="discipline">Discipline Maintenance</Menu.Item>
          <Menu.Item key="class">Class Maintenance</Menu.Item>
          <Menu.Item key="attribute-group">Attribute Group Maintenance</Menu.Item>
          <Menu.Item key="attribute">Attribute Maintenance</Menu.Item>
          <Menu.Item key="uom">UOM Maintenance</Menu.Item>
          <Menu.Item key="enumerated-list">Enumerated List Maintenance</Menu.Item>
          <Menu.Item key="data-type">Data Type Maintenance</Menu.Item>
        </SubMenu>
        <SubMenu title={<span><Icon type="caret-down" />Authoring</span>}>
          <Menu.Item key="application">Application Maintenance</Menu.Item>
          <Menu.Item key="mappings">Mappings</Menu.Item>
          <Menu.Item key="authoring-matrix">Authoring Matrix</Menu.Item> 
        </SubMenu> */}
        <AppSettings>
          { this.props.user.name }
          <UserAvatar icon="user" />
        </AppSettings>
      </Menu>
    );
  }
}

export default AppMenu;