import React, {
  Component
} from 'react'
import {
  Form,
  Input
} from 'antd'
import FormToolbar, {
  defaultFormItemLayout
} from '../../components/FormHelper'
import CRUDHelper from '../../components/CRUDHelper'
import {
  fetchPermissions,
  fetchPermission,
  createPermission,
  updatePermission,
  deletePermission
} from './api'
import { debug } from 'components/debug'

const FormItem = Form.Item;

class Permissions extends Component {
  constructor(props) {
    super(props);
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
    ]
    this.fields = ['description', 'group']
  }

  state = {
    permissions: [],
    permission: {}
  }

  componentWillMount() {
    fetchPermissions()
      .then(res => this.setState({ permissions: res.data }) )
      .catch(err => debug(err))
  }

  selectPermission = (id) => {
    fetchPermission(id)
    .then(res => this.setState({ 
      permission: res.data,
      formMessage: null
    }) )
    .catch(err => debug(err))
  }

  handleSelect = (record, index, event) => {
    if (!this.props.form.isFieldsTouched([this.fields]))
    {
      this.selectPermission(record.id)
    } else {
      if (record.id !== this.state.permission.id) {
        debug(`Changes exist. Either save or clear these changes before navigating away from this record`)
      }
    }
  }

  handleSubmit = (data, fields, mode) => {
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

  handleProress(message) {
    this.setState({spinMessage: message})
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
                message: 'Please input a permission d escription!', 
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

  render() {
    const navigationTable = {
      dataSource: this.state.permissions,
      columns: this.columns
    }
    return (
      <CRUDHelper 
        form={this.props.form}
        header="Permission Maintenance"
        fields={this.fields}
        rowKey="id"
        searchText="Search by permission description..."
        searchField="description"
        path={this.props.location.pathname}
        currentRecord={this.state.permission}
        navigationTable={navigationTable}
        sideMessage={this.state.tableMessage}
        bodyMessage={this.state.formMessage}
        search={this.state.search}
        filter={this.state.filter}
        onSelect={this.handleSelect}
        params={this.props.match.params}>
        {this.renderForm()}
      </CRUDHelper>
    );
  }
}

Permissions = Form.create()(Permissions);
export default Permissions