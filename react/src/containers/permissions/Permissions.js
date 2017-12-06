import React, {
  Component
} from 'react'
import {
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
  fetchPermissions,
  fetchPermission,
  createPermission,
  updatePermission,
  deletePermission
} from './api'

const FormItem = Form.Item;

class Permissions extends Component {
  constructor(props) {
    super(props);
    this.rowSelected = this.rowSelected.bind(this)
    this.rowClassName = this.rowClassName.bind(this)
    this.columns = [
      {
        title: 'Group',
        dataIndex: 'group',
        key: 'group',
        sorter: (a, b) => a.group.length - b.group.length
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        sorter: (a, b) => a.description.length - b.description.length,
      } 
    ];
  }

  state = {
    permissions: [],
    permission: {}
  }

  componentWillMount() {
    fetchPermissions()
      .then(res => this.setState({ permissions: res.data }) )
      .catch(err => message.error(err))
  }

  rowSelected(record, index, event) {
    if (!this.props.form.isFieldsTouched(['description']))
    {
      fetchPermission(record.id)
        .then(res => this.setState({ permission: res.data }) )
        .catch(err => message.error(err))
    } else {
      if (record.id !== this.state.permission.id) {
        message.error(`Changes exist. Either save or clear these changes before navigating away from this record`)
      }
    }
  }

  handleSubmit(data, fields, mode) {
    if (mode === 'update') {
      this.setState({
          permission: data, 
          permissions: this.state.permissions.map(s => s.id === data.id ? data : s)
        })
    } else if (mode === 'insert'){
      this.setState({
        permission: data, 
        permissions: [ ...this.state.permissions, data ]
      })
    } else if (mode === 'delete') {
      this.setState({
        permission: {},
        permissions: this.state.permissions.filter(x => x.id !== data.id),
      })
      
    } else if (mode === 'new') {
      this.setState({permission: {}})
    }
  }

  renderForm() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <FormToolbar 
          onSubmit={this.handleSubmit.bind(this)}
          onDelete={deletePermission}
          onInsert={createPermission}
          onUpdate={updatePermission}
          /* onNew={this.handleNew.bind(this)} */
          form={this.props.form}
          record={this.state.permission}
          fields={['description', 'group']}/>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <FormItem
            {...defaultFormItemLayout}
            label="Description:">
            {getFieldDecorator('description', {
              initialValue: this.state.permission.description,
              rules: [{ 
                required: true, 
                message: 'Please input a permission description!', 
                whitespace: true }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...defaultFormItemLayout}
            label="Group:">
            {getFieldDecorator('group', {
              initialValue: this.state.permission.group,
              rules: [{ 
                required: true, 
                message: 'Please input a permission group!', 
                whitespace: true }],
            })(
              <Input />
            )}
          </FormItem>
        </Form>
      </div>
    )
  }

  rowClassName(record, index) {
    return record.id === this.state.permission.id ? 'SelectedRow'  : null;
  }

  render() {
    return (
      <div>
        <Header>
          <h1>Permission Maintenance</h1>
        </Header>
        <Wrapper>
          <Side>
            <Table
              columns={this.columns}
              dataSource={this.state.permissions}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              onRowClick={this.rowSelected}
              rowClassName={this.rowClassName} />
          </Side>
          <Body>
            {this.renderForm()}
          </Body>
        </Wrapper>
      </div>
    );
  }
}

Permissions = Form.create()(Permissions);
export default Permissions