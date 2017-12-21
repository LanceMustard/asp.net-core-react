import React, {
  Component
} from 'react'
import {
  Tabs,
  Form,
  Input,
  Table,
  Select,
  Button,
  Modal,
  message
} from 'antd'
import Moment from 'react-moment'
import styled, { css } from 'styled-components'
import FormHelper, {
  defaultFormItemLayout
} from 'components/FormHelper'
import BreadcrumbLink from 'components/BreadcrumbLink'
import CRUDHelper from 'components/CRUDHelper'
import RecordSelector from 'components/RecordSelector'
import {
  fetchProjects,
  fetchProject,
  fetchProjectOrders,
  createProject,
  updateProject,
  deleteProject,
  fetchProjectUsers,
  deleteProjectUser,
  createProjectUser,
  updateProjectUser
} from './api'
import { fetchUsers } from 'containers/users/api'
import { fetchRoles } from 'containers/roles/api'
import { fetchLibraries } from 'containers/libraries/api'
import { fetchClients } from '../clients/api'
import confirm from 'components/confirm'
import { debug } from 'components/debug'

const TabPane = Tabs.TabPane
const FormItem = Form.Item
const Option = Select.Option

const RightAlignedDiv=styled.div`
  float: right;
  padding-left: 20px;
`
const CenteredDiv=styled.div`
  display: flex;
  padding: 20px
`

const CenteredVerticalDiv=styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100px;
`

class Projects extends Component {
  constructor(props) {
    super(props);
    this.fields = ['name', 'clientId', 'libraryId']
  }

  state = {
    projects: [],
    project: {},
    orders: [],
    clients: [],
    user: null,
    users: [],
    nonAssignedUsers: [],
    roles: [],
    projectUsers: [],
    addProjectUsers: [],
    editRoleMode: false,
    role: null,
    libraries: [],
    tableMessage: 'Loading projects...',
    formMessage: null,
    addUserMode: false
  }

  componentWillMount() {
    // load inital record if one is specified in the params
    if (this.props.match.params.id) this.selectProject(this.props.match.params.id)
    // populate projects table
    fetchProjects()
    .then(res => {
      let projects = res.data
      projects.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      fetchClients()
      .then(res => {
        let clients = res.data
        projects = this.buildDataset(projects, clients)
        fetchLibraries()
        .then(res => {
          let libraries = res.data
          fetchRoles()
          .then(res => {
            console.log('roles', res.data)
            this.setState({ 
              libraries,
              projects,
              clients,
              roles: res.data,
              tableMessage: null 
            })
          })
          
        })
      })
    })
    .catch(err => {
      this.setState({tableMessage: null})
      debug(err)
    })
  }

  // merge in related records with the order record
  buildDataset = (projects, clients) => {
    let retval = []
    for (let i in projects) {
      retval.push(this.handleForeignFields(projects[i], clients))
    }
    return retval
  }

  buildUserDataset = (rawUsers) => {
    // let users = []
    // for (let i in rawUsers) {
    //   users.push({
    //     key: rawUsers[i].id.toString(),
    //     title: rawUsers[i].name,
    //     description: rawUsers[i].name,
    //     chosen: true
    //   })
    // }
    // return users
    return rawUsers
  }
  
  handleForeignFields = (project, clients) => {
    if (project) {
      clients = clients ? clients : this.state.clients
      project.client = clients.find(x => x.id === project.clientId)
    }
    return project
  }

  selectProject = (id) => {
    this.setState({formMessage: 'Loading project details...'})
    fetchProject(id)
    .then(res => {
      let  project = this.handleForeignFields(res.data)
      fetchProjectOrders(id)
      .then(res => {
        let orders = res.data
        orders.sort((a,b) => (a.number > b.number) ? 1 : ((b.number > a.number) ? -1 : 0));
        fetchProjectUsers(id)
        .then (res => {
          let projectUsers = res.data
          projectUsers.sort((a,b) => (a.user.name > b.user.name) ? 1 : ((b.user.name > a.user.name) ? -1 : 0));
          this.setState({
            project,
            orders, 
            projectUsers,
            addUserMode: false,
            formMessage: null
          }) 
        })
      })
    })
    .catch(err => {
      this.setState({formMessage: null})
      debug('selectProject error:', err)
    })
  }

  handleSelect = (record, index, event) => {
    if (!this.props.form.isFieldsTouched(this.fields))
    {
      this.selectProject(record.id)    
    } else {
      if (record.id !== this.state.project.id) {
        message.error(`Changes exist. Either save or clear these changes before navigating away from this record`)
      }
    }
  }

  handleSubmit = (data, fields, mode) => {
    let project = this.handleForeignFields(data)
    if (mode === 'update') {
      this.setState({
          project, 
          projects: this.state.projects.map(s => s.id === project.id ? project : s),
          addUserMode: false
        })
    } else if (mode === 'insert'){
      this.setState({
        project, 
        projects: [ ...this.state.projects, project ],
        addUserMode: false
      })
    } else if (mode === 'delete') {
      this.setState({
        project: {},
        projects: this.state.projects.filter(x => x.id !== project.id),
        orders: [],
        addUserMode: false
      })
      
    } else if (mode === 'new') {
      this.setState({
        project: {},
        orders: [],
        projectUsers: [],
        addUserMode: false
      })
    }
  }

  handleProgress = (message) => {
    this.setState({formMessage: message})
  }

  toggleAddUserMode = () => {
    if (!this.state.addUserMode) {
      if (this.state.users.length == 0) {
        // if this is the first time, load users from server
        this.setState({formMessage: 'Loading users...'})
        fetchUsers()
        .then(res => {
          // Populate full list of users
          let users = res.data
          users.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
          // Update nonAssignedUsers array and filter out all current projectUsers (can not add a user twice)
          let nonAssignedUsers = users
          this.state.projectUsers.map(p => {
            nonAssignedUsers = nonAssignedUsers.filter(u => u.id !== p.user.id) 
          })
          this.setState({ 
            users,
            nonAssignedUsers,
            formMessage: null 
          })
        })
      } else {
        // Update nonAssignedUsers array and filter out all current projectUsers (can not add a user twice)
        let nonAssignedUsers = this.state.users
        this.state.projectUsers.map(p => {
          nonAssignedUsers = nonAssignedUsers.filter(u => u.id !== p.user.id) 
        })
        this.setState({nonAssignedUsers})
      }
    }
    // Toggle the addUserMode state
    this.setState({
      addUserMode: !this.state.addUserMode,
      role: null,
      addProjectUsers: []
    })
  }

  handleRoleChange = (role) => {
    console.log('handleRoleChange', role)
    this.setState({role:
      {
        id: role.id,
        name : role.name
      }
    })
  }

  handleAddUsers = () => {
    this.setState({formMessage: 'Updating project users...'})
    let count = this.state.addProjectUsers.length
    let projectUsers = this.state.projectUsers
    console.log('this.state.addProjectUsers', this.state.addProjectUsers)
    this.state.addProjectUsers.map((user, i) => {
      let projectUser = {
        ProjectId: this.state.project.id,
        RoleId: this.state.role.id,
        UserId: user.id
      }
      createProjectUser(projectUser)
      .then(res => {
        projectUsers = [...projectUsers, res.data]
        if (count === i + 1) {
          // if this is the last save to be done close add user mode and update the project Users state
          projectUsers.sort((a,b) => (a.user.name > b.user.name) ? 1 : ((b.user.name > a.user.name) ? -1 : 0));
          this.toggleAddUserMode();
          this.setState({
            projectUsers,
            formMessage: null
          })
        }
      })
      .catch(err => {
        debug(err)
        this.setState({formMessage: null})
      })
    })
  }

  handleCancelAddUsers = () => {
    this.toggleAddUserMode();
  }

  handleSelectUsersChange = (users) => {
    this.setState({addProjectUsers: users})
  }

  handleDeleteUser = (user) => {
    let confirmMessage = this.props.deleteMessage || `Please confirm that you want to remove ${user.user.name} from the ${this.state.project.name} project?`
    confirm(confirmMessage, { title: "Delete confirmation" })
    .then((ok) => {
      this.setState({formMessage: 'Removing project user...'})
      deleteProjectUser(user.id)
      .then(res => {
        this.setState({
          projectUsers: this.state.projectUsers.filter(u => u.id !== res.data.id),
          formMessage: null
        })
      })
      .catch(err => {
        debug(err)
        this.setState({formMessage: null})
      })
    },
    (cancel) => { /* do nothing */ })
  }

  handleEditUser = (user) => {
    console.log('handleEditUser', user)
    this.setState({
      user,
      role : null,
      editRoleMode: true
    })
  }

  handleEditUserOk = (e) => {
    if (!this.state.role) {
      message.error('Update not possible. Please select a role first  ')
    } else {
      this.setState({formMessage: 'Updating project user role...'})
      let projectUser = this.state.user
      projectUser.roleId = this.state.role.id
      projectUser.role = this.state.role
      updateProjectUser(projectUser)
      .then(res => {
        let projectUsers = this.state.projectUsers.map(x => x.id === projectUser.id ? projectUser : x)
        this.setState({
          formMessage: null,
          projectUsers: this.state.projectUsers.map(x => x.id === projectUser.id ? res.data : x),
          user: null,
          role: null,
          editRoleMode: false
        })
        message.success(`Project role update update complete`)
      })
      .catch(err => {
        debug(err)
        this.setState({
          formMessage: null,
          user: null,
          role: null,
          editRoleMode: false
        })
      })
      
    }
  }

  handleEditUserCancel = (e) => {
    this.setState({
      user: null,
      role: null,
      editRoleMode: false
    })
  }

  renderUserSelector() {
    const selectUserColumns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
      }
    ]
    return (
      <div>
       <h3>{this.state.role == null ? 'Select a project role' : `Select one or more users to add to the project with the role "${this.state.role.name}"`}</h3>
        <CenteredDiv>
          <div style={{marginRight: '20px'}}>
            <Select
                placeholder='Select a role'
                style={{width:'200px'}} 
                onChange={this.handleRoleChange}>
                {this.state.roles.map(x => <Option value={x} label={x.name}>{x.name}</Option>)}
              </Select>
            <CenteredVerticalDiv>
              <Button 
                type="primary"
                onClick={this.handleAddUsers.bind(this)} 
                disabled={this.state.addProjectUsers.length === 0}>
                Add Users
              </Button>
              <Button onClick={this.handleCancelAddUsers.bind(this)}>Cancel</Button>
            </CenteredVerticalDiv>
          </div>
          <RecordSelector
            columns={selectUserColumns}
            dataSource={this.state.nonAssignedUsers}
            targetDataSource={this.state.addProjectUsers}
            pageSize={5}
            onChange={this.handleSelectUsersChange}
            selectDisabled={this.state.role === null}
          />
        </CenteredDiv>
      </div>
    )
  }

  renderUserTable() {
    let userColumns = [
      {
        title: 'Name',
        dataIndex: 'user.name',
        key: 'user.name',
        sorter: (a, b) => a.user.name > b.user.name ? 1 : b.user.name > a.user.name ? -1 : 0,
        render: (text, record) => (
          <BreadcrumbLink
            type="Link"
            label={record.user.name}
            from={`/projects/${this.state.project.id}`} 
            to={`/users/${record.user.id}`}
            description={this.state.project.name} />
        )
      }, {
        title: 'Role',
        dataIndex: 'role.name',
        key: 'role.name',
        sorter: (a, b) => a.role.name > b.role.name ? 1 : b.role.name > a.role.name ? -1 : 0,
        filters: this.state.roles.map(r => ({ text: r.name, value: r.name })),
        onFilter: (value, record) => record.role.name === value,
        render: (text, record) => (
          <span>
            <Button 
              icon="edit" 
              onClick={() => this.handleEditUser(record)}>
              {text}
            </Button> 
          </span>
        )
      },
      {
        key: 'action',
        title: (<Button type="primary" icon="file-add" onClick={this.toggleAddUserMode.bind(this)} disabled={this.state.project.id === undefined ? true : false}>Add Users</Button>),
        render: (record) => (
          <span>
            <Button icon="delete" onClick={() => this.handleDeleteUser(record)}>Remove</Button> 
          </span>
        )
      }
    ]
    return (
      <Table
        columns={userColumns}
        dataSource={this.state.projectUsers}
        rowKey="id"
        /* scroll={{ y: 300 }} */
        pagination={{ pageSize: 5 }}/>
    )
  }

  renderOrderTable() {
    let orderColumns = [
      {
        title: 'Order Number',
        dataIndex: 'number',
        key: 'number',
        sorter: (a, b) => a.number > b.number ? 1 : b.number > a.number ? -1 : 0,
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        sorter: (a, b) => a.description > b.description ? 1 : b.description > a.description ? -1 : 0,
      },
      {
        title: 'Engineer',
        dataIndex: 'responsibleEngineer',
        key: 'ResponsibleEngineer',
        sorter: (a, b) => a.ResponsibleEngineer > b.ResponsibleEngineer ? 1 : b.ResponsibleEngineer > a.ResponsibleEngineer ? -1 : 0,
      },
      {
        title: 'Award Date',
        dataIndex: 'awardDate',
        key: 'awardDate',
        render: (text, record) => { return (<Moment format="YYYY/MM/DD">{text}</Moment>) },
        sorter: (a, b) => a.awardDate > b.awardDate ? 1 : b.awardDate > a.awardDate ? -1 : 0,
      },
      {
        key: 'action',
        render: (text, record) => (
          <span>
            <BreadcrumbLink 
              from={`/projects/${this.state.project.id}`} 
              to={`/orders/${record.id}`}
              description={this.state.project.name} />
          </span>
        )
      }
    ]
    return (
      <Table
        columns={orderColumns}
        dataSource={this.state.orders}
        rowKey="id"
        pagination={{ pageSize: 10 }}/>
    )
  }

  renderEditUserRole() {
    let title = `Edit project role for user "${this.state.user ? this.state.user.user.name : ''}"`
    let body = `Update project role from "${this.state.user ? this.state.user.role.name : ''}" to...`
    let roleId = this.state.user ? this.state.user.role.id : 0 
    return (
      <Modal
        title={title}
        visible={this.state.editRoleMode}
        onOk={this.handleEditUserOk}
        onCancel={this.handleEditUserCancel}
      >
        <p>{body}</p>
        <Select
          placeholder='Select a role...'
          style={{width:'200px'}} 
          value={this.state.role ? this.state.role.name : ''}
          onChange={this.handleRoleChange}>
          {this.state.roles
            .filter(x => x.id !== roleId)
            .map(x => <Option value={x} key={x.id}>{x.name}</Option>)}
        </Select>
      </Modal>
    )
  }

  renderForm() {
    const { getFieldDecorator } = this.props.form;

    return (
      <FormHelper
        onSubmit={this.handleSubmit.bind(this)}
        onDelete={deleteProject}
        onInsert={createProject}
        onUpdate={updateProject}
        onProgress={this.handleProgress}
        record={this.state.project}>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <FormItem
            {...defaultFormItemLayout}
            label="Name:">
            {getFieldDecorator('name', {
              initialValue: this.state.project.name,
              rules: [{ 
                required: true, 
                message: 'Please input a project name!', 
                whitespace: true }],
            })(
              <Input />
            )}
          </FormItem>
          <Tabs>
            <TabPane tab="Details" key="1">
              <FormItem
              {...defaultFormItemLayout}
              label="Client:">
              {getFieldDecorator('clientId', {
                initialValue: this.state.project.clientId,
                // initialValue: this.state.project.client ? this.state.project.client.name : '',
                rules: [{ 
                  required: true, 
                  message: 'Please select a client!' }],
              })(
                <Select placeholder="Select client">
                  {this.state.clients.map(c => <Option value={c.id} key={c.id}>{c.name}</Option>)}
                </Select>
              )}
            </FormItem>
            <FormItem
              {...defaultFormItemLayout}
              label="Reference Library:">
              {getFieldDecorator('libraryId', {
                initialValue: this.state.project.libraryId,
                rules: [{ 
                  required: true, 
                  message: 'Please select a reference library!' }],
              })(
                <Select placeholder="Select library">
                  {this.state.libraries.map(l => <Option value={l.id} key={l.id}>{l.name}</Option>)}
                </Select>
              )}
            </FormItem>
            </TabPane>
            <TabPane tab="Packages" key="2">
              { this.renderOrderTable() }
            </TabPane>
            <TabPane tab="Users" key="3">
              {this.state.addUserMode ? this.renderUserSelector() : this.renderUserTable() }
            </TabPane>
          </Tabs>
        </Form>
      </FormHelper>
    )
  }

  render() {
    let columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
      },
      {
        title: 'Client',
        dataIndex: 'client.name',
        key: 'client.name',
        sorter: (a, b) => a.client.name.length - b.client.name.length,
        filters: this.state.clients.map(c => ({ text: c.name, value: c.name })),
        onFilter: (value, record) => record.client.name === value,
      }
    ]
    const navigationTable = {
      dataSource: this.state.projects,
      columns: columns
    }
    return (
      <CRUDHelper 
        form={this.props.form}
        header="Project Maintenance"
        fields={this.fields}
        rowKey="id"
        searchText="Search by project name..."
        path={this.props.location.pathname}
        currentRecord={this.state.project}
        navigationTable={navigationTable}
        sideMessage={this.state.tableMessage}
        bodyMessage={this.state.formMessage}
        search={this.state.search}
        filter={this.state.filter}
        onSelect={this.handleSelect}
        params={this.props.match.params}>
        {this.renderForm()}        
        {this.renderEditUserRole()}
      </CRUDHelper>
    );
  }
}

Projects = Form.create()(Projects)

export default Projects