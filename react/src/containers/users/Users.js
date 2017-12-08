import React, {
  Component
} from 'react'
import { connect } from 'react-redux'
import {
  Spin,
  Table,
  Form,
  Icon,
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
import { addBreadcrumb, removeBreadcrumb } from './../../actions/breadcrumbs'

const FormItem = Form.Item
const Option = Select.Option
const Search = Input.Search

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
    search: '',
    filter: null,
    users: [],
    user: {role: "Read Only"}
  }

  componentWillMount() {
    this.updateBreadcrumbs(this.props.location.pathname)
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
  
  // updateBreadcrumbs = (path) => {
  //   let removeRemaining = false
  //   let links = this.props.breadcrumbs.links
  //   let removeBreadcrumb = this.props.removeBreadcrumb
  //   for (var i = 0; i < links.length; i++) {
  //     if (links[i].path === path) {
  //       removeBreadcrumb(links[i].uuid)
  //       removeRemaining = true
  //     } else if (removeRemaining) removeBreadcrumb(links[i].uuid)
  //   }
  // }

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
          dataSource={this.state.filter || this.state.users}
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

  onSearch = (e) => {
    let search = e.target.value
    const reg = new RegExp(search, 'gi')
    let filter = this.state.users.filter(user => user.name.match(reg))
    this.setState({ search, filter })
  }

  resetSearch = () => {
    this.setState({
      search: '',
      filter: null
    })
  }

  render() {
    const suffix = this.state.search ? <Icon type="close-circle" onClick={this.resetSearch} /> : null
    return (
      <div>
        <Header>
          <h1>User Maintenance</h1>
        </Header>
        <Wrapper>
          <Side>
            <Search
              prefix={suffix} 
              placeholder="Search by user name"
              value={this.state.search}
              onChange={this.onSearch}
              onPressEnter={this.onSearch}/>
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

function mapStateToProps(state) {
  return { breadcrumbs: state.breadcrumbs }
}

Users = Form.create()(Users);

export default connect(mapStateToProps,
  { addBreadcrumb,
    removeBreadcrumb
   })(Users)