import React, {
  Component
} from 'react'
import {
  Spin,
  Form,
  Input,
  Card, 
  Checkbox,
  message
} from 'antd'
import FormToolbar, {
  defaultFormItemLayout
} from 'components/FormHelper'
import CRUDHelper from '../../components/CRUDHelper'
import {
  fetchRoles,
  fetchRole,
  fetchRolePermissions,
  createRole,
  updateRole,
  deleteRole
} from './api'
import { fetchPermissions } from 'containers/permissions/api'
import styled from 'styled-components'

const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group

const PermissionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  height: 60vh;
`
const PermissionsCard = styled(Card)`
  width: 250px;
  flex: 1;
  border-radius: 2px;
  display: inline-block;
  margin: 1rem;
  position: relative;
`

// const Permission = styled(Checkbox)`
//   padding: 5px;
// `

class Roles extends Component {
  constructor(props) {
    super(props);
    this.fields = ['name']
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
    roles: [],
    role: {},
    permissions: [],
    groups: [],
    rolePermissions: [],
    tableMessage: 'Loading roles...',
  }

  componentWillMount() {
    fetchRoles()
      .then(res => { 
        let roles = res.data
        fetchPermissions()
        .then(res => {
          let permissions = res.data
          const groupDescriptions = [...new Set(permissions.map(p => p.group))]
          const groups = []
          for (let i in groupDescriptions) {
            let groupPermissions = permissions.filter(p => p.group === groupDescriptions[i])
            groups.push({
              name: groupDescriptions[i],
              permissions: groupPermissions.map(p => p.description)
            })
          }
          console.log('groups', groups)
          this.setState({ 
            roles,
            permissions,
            groups,
            tableMessage: null
          }) 
        })
      })
      .catch(err => message.error(err))
  }

  selectRole = (id) => {
    this.setState({formMessage: 'Loading role details...'})
    fetchRole(id)
    .then(res => {
      var role = res.data
      fetchRolePermissions(id)
      .then(res => {
        // let rolePermissions = res.data
        //   this.state.rolePermissions.map(p => {
        //     let group = this.state.groups.find(g => g.name == p.group)
        //     group.selected = [...group.selected, p.name]
        //  })
        this.setState({
          role,
          rolePermissions: res.data,
          formMessage: null
        }) 
      })
    })
    .catch(err => {
      this.setState({formMessage: null})
      message.error(err)
    })
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

  handleSelect = (record, index, event) => {
    if (!this.props.form.isFieldsTouched(this.fields))
    {
      this.selectRole(record.id)
    } else {
      if (record.id !== this.state.role.id) {
        message.error(`Changes exist. Either save or clear these changes before navigating away from this record`)
      }
    }
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

  onChange = (e) => {
    console.log(e)
    // this.setState({
    //   checkedList,
    //   indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
    //   checkAll: checkedList.length === plainOptions.length,
    // });
  }
  onCheckAllChange = (e) => {
    console.log(e)
    // this.setState({
    //   checkedList: e.target.checked ? plainOptions : [],
    //   indeterminate: false,
    //   checkAll: e.target.checked,
    // });
  }

  renderPermissions() {
    return (
      <PermissionsContainer>
        { this.state.groups.map(group =>
          <PermissionsCard
            key={group.id}
            value={group.name} 
            extra={group.name !== 'General' ? <Checkbox onChange={this.onCheckAllChange}>All</Checkbox> : null }
            title={group.name} 
            bordered={true}>
            <CheckboxGroup 
              options={group.permissions}
              onChange={this.onChange} />
          </PermissionsCard>
        )}
      </PermissionsContainer>
    )
  }

  render() {
    const navigationTable = {
      dataSource: this.state.roles,
      columns: this.columns
    }
    return (
      <CRUDHelper 
        form={this.props.form}
        header="Role Maintenance"
        fields={this.fields}
        rowKey="id"
        searchText="Search by role name..."
        path={this.props.location.pathname}
        currentRecord={this.state.role}
        navigationTable={navigationTable}
        sideMessage={this.state.tableMessage}
        bodyMessage={this.state.formMessage}
        search={this.state.search}
        filter={this.state.filter}
        onSelect={this.handleSelect}
        params={this.props.match.params}>
        {this.renderForm()}
        {this.renderPermissions()}
      </CRUDHelper>
    );
  }
}

Roles = Form.create()(Roles);
export default Roles