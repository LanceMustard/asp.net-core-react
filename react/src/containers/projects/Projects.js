import React, {
  Component
} from 'react'
import {
  Form,
  Input,
  Table,
  message
} from 'antd'
import FormHelper, {
  defaultFormItemLayout
} from '../../components/FormHelper'
import BreadcrumbLink from '../../components/BreadcrumbLink'
import CRUDHelper from '../../components/CRUDHelper'
import {
  fetchProjects,
  fetchProject,
  fetchProjectOrders,
  createProject,
  updateProject,
  deleteProject
} from './api'

const FormItem = Form.Item;

class Projects extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
      }
    ]
    this.orderColumns = [
      {
        title: 'Orders',
        dataIndex: 'description',
        key: 'description',
        sorter: (a, b) => a.description.length - b.description.length,
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
    this.fields = ['name']
  }

  state = {
    projects: [],
    project: {},
    orders: [],
    tableMessage: 'Loading projects...',
    formMessage: null,
  }

  componentWillMount() {
    // load inital record if one is specified in the params
    if (this.props.match.params.id) this.selectProject(this.props.match.params.id)
    // populate client tables
    fetchProjects()
      .then(res => {
        this.setState({
          projects: res.data,
          tableMessage: null
        })
      })
      .catch(err => {
        this.setState({tableMessage: null})
        message.error(err)
      })
  }

  selectProject = (id) => {
    this.setState({formMessage: 'Loading project details...'})
    fetchProject(id)
      .then(res => {
        var project = res.data
        fetchProjectOrders(id)
        .then(res => {
          this.setState({
            project,
            orders: res.data,
            formMessage: null
          }) 
        })
      .catch(err => {
        this.setState({formMessage: null})
        message.error(err)
      })
    })
    .catch(err => message.error(err))
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
    if (mode === 'update') {
      this.setState({
          project: data, 
          projects: this.state.projects.map(s => s.id === data.id ? data : s)
        })
    } else if (mode === 'insert'){
      this.setState({
        project: data, 
        projects: [ ...this.state.projects, data ]
      })
    } else if (mode === 'delete') {
      this.setState({
        project: {},
        projects: this.state.projects.filter(x => x.id !== data.id),
        orders: []
      })
      
    } else if (mode === 'new') {
      this.setState({
        project: {},
        orders: []
      })
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
        </Form>
      </FormHelper>
    )
  }

  render() {
    const navigationTable = {
      dataSource: this.state.projects,
      columns: this.columns
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
        onSelect={this.handleSelect}>
        {this.renderForm()}
        <Table
            columns={this.orderColumns}
            dataSource={this.state.orders}
            rowKey="id"
            pagination={{ pageSize: 10 }}/>
      </CRUDHelper>
    );
  }
}

Projects = Form.create()(Projects)

export default Projects