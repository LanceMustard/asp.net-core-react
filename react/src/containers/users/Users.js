import React, {
  Component
} from 'react'
import {
  Spin,
  Table,
  Form,
  Input,
  Select,
  message
} from 'antd'
import {
  Header,
  Wrapper,
  Side,
  Body
} from '../../components/Layout'
import FormToolbar, {
  defaultFormItemLayout
} from '../../components/FormHelper'
import {
  fetchUsers,
  fetchUser,
  createUser,
  updateUser,
  deleteUser
} from './api'

const FormItem = Form.Item;
const Option = Select.Option;

class Users extends Component {
  constructor(props) {
    super(props);
    this.rowSelected = this.rowSelected.bind(this)
    this.rowClassName = this.rowClassName.bind(this)
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

  state = {
    loading: true,
    users: [],
    user: {role: "Read Only"}
  }

  componentWillMount() {
    fetchUsers()
      .then(res => {
        this.setState({ 
          users: res.data,
          loading: false 
        }) 
      })
      .catch(err => {
        this.setState({ loading: false }) 
        message.error(err)
      })
  }

  rowSelected(record, index, event) {
    if (!this.props.form.isFieldsTouched(['name']))
    {
      fetchUser(record.id)
        .then(res => this.setState({ user: res.data }) )
        .catch(err => message.error(err))
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
          users: this.state.users.map(s => s.id === data.id ? data : s)
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

  handleNew() {

  }

  renderForm() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <FormToolbar 
          onSubmit={this.handleSubmit.bind(this)}
          onDelete={deleteUser}
          onInsert={createUser}
          onUpdate={updateUser}
          onNew={this.handleNew.bind(this)}
          form={this.props.form}
          record={this.state.user}
          fields={['name', 'osUser', 'email', 'role']}/>
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
      </div>
    )
  }

  renderTable() {
    return (
      <Spin tip="Loading..." spinning={this.state.loading}>
        <Table
          columns={this.columns}
          dataSource={this.state.users}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          onRowClick={this.rowSelected}
          rowClassName={this.rowClassName} />
      </Spin>
    )
  }

  rowClassName(record, index) {
    return record.id === this.state.user.id ? 'SelectedRow'  : null;
  }

  render() {
    return (
      <div>
        <Header>
          <h1>User Maintenance</h1>
        </Header>
        <Wrapper>
          <Side>
            {this.renderTable()}
          </Side>
          <Body>
            {this.renderForm()}
          </Body>
        </Wrapper>
      </div>
    );
  }
}

Users = Form.create()(Users);
export default Users