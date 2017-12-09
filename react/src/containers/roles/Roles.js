import React, {
  Component
} from 'react'
import {
  Spin,
  Table,
  Form,
  Input,
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
  fetchRoles,
  fetchRole,
  createRole,
  updateRole,
  deleteRole
} from './api'

const FormItem = Form.Item;

class Roles extends Component {
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
      }
    ];
  }

  state = {
    loading: true,
    spinMessage: null,
    roles: [],
    role: {}
  }

  componentWillMount() {
    fetchRoles()
      .then(res => this.setState({ 
        roles: res.data,
        loading: false 
       }) )
      .catch(err => message.error(err))
  }

  rowSelected(record, index, event) {
    if (!this.props.form.isFieldsTouched(['name']))
    {
      this.setState({spinMessage: 'Loading role details...'})
      fetchRole(record.id)
        .then(res => this.setState({ 
          role: res.data,
          spinMessage: null 
        }))
        .catch(err => {
          this.setState({spinMessage: null})
          message.error(err)
        })
    } else {
      if (record.id !== this.state.role.id) {
        message.error(`Changes exist. Either save or clear these changes before navigating away from this record`)
      }
    }
  }

  handleSubmit(data, fields, mode) {
    if (mode === 'update') {
      this.setState({
          role: data, 
          roles: this.state.roles.map(s => s.id === data.id ? data : s)
        })
    } else if (mode === 'insert'){
      this.setState({
        role: data, 
        roles: [ ...this.state.roles, data ]
      })
    } else if (mode === 'delete') {
      this.setState({
        role: {},
        roles: this.state.roles.filter(x => x.id !== data.id),
      })
      
    } else if (mode === 'new') {
      this.setState({role: {}})
    }
  }

  handleProress(message) {
    this.setState({spinMessage: message})
  }

  renderForm() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Spin tip={this.state.spinMessage} spinning={this.state.spinMessage ? true : false}>
        <FormToolbar 
          onSubmit={this.handleSubmit.bind(this)}
          onDelete={deleteRole}
          onInsert={createRole}
          onUpdate={updateRole}
          onProgress={this.handleProress.bind(this)}
          form={this.props.form}
          record={this.state.role}
          fields={['name']}/>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <FormItem
            {...defaultFormItemLayout}
            label="Name:">
            {getFieldDecorator('name', {
              initialValue: this.state.role.name,
              rules: [{ 
                required: true, 
                message: 'Please input a role name!', 
                whitespace: true }],
            })(
              <Input />
            )}
          </FormItem>
        </Form>
      </Spin>
    )
  }

  rowClassName(record, index) {
    return record.id === this.state.role.id ? 'SelectedRow'  : null;
  }

  render() {
    return (
      <div>
        <Header>
          <h1>Role Maintenance</h1>
        </Header>
        <Wrapper>
          <Side>
            <Spin tip="Loading roles..." spinning={this.state.loading}>
              <Table
                columns={this.columns}
                dataSource={this.state.roles}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                onRowClick={this.rowSelected}
                rowClassName={this.rowClassName} />
            </Spin>
          </Side>
          <Body>
            {this.renderForm()}
          </Body>
        </Wrapper>
      </div>
    );
  }
}

Roles = Form.create()(Roles);
export default Roles