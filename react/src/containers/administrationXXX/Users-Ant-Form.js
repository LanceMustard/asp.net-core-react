import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Table, Icon, Popconfirm, Tooltip, Layout } from 'antd';
import { fetchUser, fetchUsers, createUser, deleteUser, newUser, updateUser } from '../../actions/users';
import styled, { css }  from 'styled-components';
import TableButton from './../../components/TableButton.js'

const { Content, Sider } = Layout;

const Header = styled.div`
  background-color: #a6a6a6;
  
  > h1 {
    padding-left: 20px;
    color: #595959;
    text-shadow: 0.5px 0.5px;
  }
`
const Wrapper = styled.div`
  display: flex;
  box-shadow: 2px 2px;
`
const Side = styled.div`
  min-width: 400px;
  margin: 10px;
`
const Body = styled.div`
  margin: 10px;
  background-color: yellow;
  width: 100%;
`


class Users extends Component {
  // state = {
  //   user : null
  // }
  constructor(props) {
    super(props);
    this.submitUser = this.submitUser.bind(this);
    this.rowSelected = this.rowSelected.bind(this);
    this.columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
      }, {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        filters: [
          { text: 'Admin', value: 'Admin' },
          { text: 'User', value: 'User' },
          { text: 'Read Only', value: 'Read Only' }
        ],
        onFilter: (value, record) => record.role.indexOf(value) === 0,
        sorter: (a, b) => a.role.length - b.role.length
      }
    ];
  }
  componentWillMount() {
    this.props.fetchUsers()
  }
  submitUser(values) {
    if (values.mode === 'delete') {
      this.props.deleteUser(values.id);
    } else if (values.mode === 'new') {
      this.props.newUser();
    } else {
      if (values.id === 0) {
        this.props.createUser(values);
      } else {
        this.props.updateUser(values);
      }
    }
  }
  rowSelected(record, index, event) {
    console.log(record)
    // this.setState({user: record})
    this.props.fetchUser(record.id)
  }
  render() {
    return (
      <div>
        <Header>
          <h1>User Maintenance</h1>
        </Header>
        <Wrapper>
          <Side>
            <Table
              columns={this.columns}
              dataSource={this.props.users.all}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              onRowClick={this.rowSelected} />
          </Side>
          <Body>
            <form onSubmit={this.submitUser}>
              <label>Id</label>
              <div>
                <Field
                  name="id"
                  component="input"
                  type="text"
                  placeholder="System generated id"
                  disabled="true"/>
              </div>
              <label>Name</label>
              <div>
                <Field
                  name="name"
                  component="input"
                  type="text"
                  placeholder="User name"/>
              </div>
              <label>OS USer</label>
              <div>
                <Field
                  name="osUser" 
                  component="input"
                  type="text"
                  placeholder="Operating system user">
                </Field>
              </div>
              <label>Email</label>
              <div>
                <Field
                  name="email" 
                  component="input"
                  type="text"
                  placeholder="Email address"/>
              </div>
              <label>Role</label>
              <div>
                <Field
                  name="role" 
                  component="select">
                  <option value="Admin">Administrator</option>
                  <option value="User">User</option>
                  <option value="Read Only">Read Only</option>
                </Field>
              </div>
            </form>
          </Body>
        </Wrapper>
      </div>
    );
  }
}

Users = reduxForm({
  form: 'userForm',
  enableReinitialize: true
})(Users);


Users = connect(
  state => ({
    initialValues: state.user
  })
)(Users)

function mapStateToProps({ users }) {
  return { users }
}

export default connect(mapStateToProps,
  { fetchUser,
    fetchUsers,
    createUser,
    deleteUser,
    newUser,
    updateUser
   })(Users)