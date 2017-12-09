import React, {
  Component
} from 'react'
import {
  Form,
  Input,
  Select,
  message
} from 'antd'
import FormHelper, {
  defaultFormItemLayout
} from '../../components/FormHelper'
import CRUDHelper from '../../components/CRUDHelper'
import {
  fetchUsers,
  fetchUser,
  createUser,
  updateUser,
  deleteUser
} from './api'

const FormItem = Form.Item
const Option = Select.Option

class Users extends Component {
  constructor(props) {
    super(props);
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
    ]
    this.fields = ['name', 'osUser', 'email', 'role']
  }

  state = {
    tableMessage: 'Loading users...',
    formMessage: null,
    users: [],
    user: {role: "Read Only"}
  }

  componentWillMount() {
    // load inital record if one is specified in the params
    if (this.props.match.params.id) this.selectUser(this.props.match.params.id)
    // populate user tables
    fetchUsers()
      .then(res => {
        this.setState({ 
          users: res.data,
          tableMessage: null 
        }) 
      })
      .catch(err => {
        this.setState({ tableMessage: null }) 
        message.error(err)
      })
  }

  selectUser = (id) => {
    this.setState({formMessage: 'Loading user details...'})
    fetchUser(id)
      .then(res => this.setState({ 
        user: res.data,
        formMessage: null 
      }))
      .catch(err => {
        this.setState({formMessage: null})
        message.error(err)
      })
  }
  
  handleSelect = (record, index, event) => {
    if (!this.props.form.isFieldsTouched(this.fields))
    {
      this.selectUser(record.id)
    } else {
      if (record.id !== this.state.user.id) {
        message.error(`Changes exist. Either save or clear these changes before navigating away from this record`)
      }
    }
  }

  handleSubmit(data, fields, mode) {
    if (mode === 'update') {
      this.setState({
          user: data, 
          users: this.state.users.map(user => user.id === data.id ? data : user)
        })
    } else if (mode === 'insert'){
      this.setState({
        user: data, 
        users: [ ...this.state.users, data ]
      })
    } else if (mode === 'delete') {
      this.setState({
        user: {},
        users: this.state.users.filter(x => x.id !== data.id),
      })
      
    } else if (mode === 'new') {
      this.setState({user: { role: "Read Only" }})
    }
  }

  handleProgress = (message) => {
    this.setState({formMessage: message})
  }

  renderForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <FormHelper
        onSubmit={this.handleSubmit.bind(this)}
        onDelete={deleteUser}
        onInsert={createUser}
        onUpdate={updateUser}
        onProgress={this.handleProgress}
        record={this.state.user}>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <FormItem
            {...defaultFormItemLayout}
            label="Name:">
            {getFieldDecorator('name', {
              initialValue: this.state.user.name,
              rules: [{                 
                required: true, 
                message: 'Please input a user name!', 
                whitespace: true }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...defaultFormItemLayout}
            label="Operating system user name:">
            {getFieldDecorator('osUser', {
              initialValue: this.state.user.osUser,
              rules: [{ 
                required: true, 
                message: 'Please input an operating system user name!', 
                whitespace: true }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...defaultFormItemLayout}
            label="Email Address:">
            {getFieldDecorator('email', {
              initialValue: this.state.user.email,
              rules: [{ 
                type: 'email', 
                message: 'Please input a valid email address!',
                required: true, 
                whitespace: true }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...defaultFormItemLayout}
            label="Role:">
            {getFieldDecorator('role', {
              initialValue: this.state.user.role,
              rules: [{ 
                required: true, 
                whitespace: true }],
            })(
              <Select>
                <Option value="Admin">Admin</Option>
                <Option value="User">User</Option>
                <Option value="Read Only">Read Only</Option>
              </Select>
            )}
          </FormItem>
        </Form>
      </FormHelper>
    )
  }

  render() {
    const navigationTable = {
      dataSource: this.state.users,
      columns: this.columns
    }
    return (
      <CRUDHelper 
        form={this.props.form}
        header="User Maintenance"
        fields={this.fields}
        rowKey="id"
        searchText="Search by user name..."
        path={this.props.location.pathname}
        currentRecord={this.state.user}
        navigationTable={navigationTable}
        sideMessage={this.state.tableMessage}
        bodyMessage={this.state.formMessage}
        search={this.state.search}
        filter={this.state.filter}
        onSelect={this.handleSelect}>
        {this.renderForm()}
      </CRUDHelper>
    );
  }
}

Users = Form.create()(Users);

export default Users