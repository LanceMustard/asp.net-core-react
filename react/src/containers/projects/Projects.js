import React, {
  Component
} from 'react'
import {
  Form,
  Input,
  Table,
  Select,
  message
} from 'antd'
import Moment from 'react-moment'
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
import { fetchClients } from '../clients/api'

const FormItem = Form.Item
const Option = Select.Option

class Projects extends Component {
  constructor(props) {
    super(props);
    this.fields = ['name', 'clientId']
  }

  state = {
    projects: [],
    project: {},
    orders: [],
    clients: [],
    tableMessage: 'Loading projects...',
    formMessage: null,
  }

  componentWillMount() {
    // load inital record if one is specified in the params
    if (this.props.match.params.id) this.selectProject(this.props.match.params.id)
    // populate projects table
    fetchProjects()
      .then(res => {
        let projects = res.data
        fetchClients()
          .then(res => {
            let clients = res.data
            projects = this.buildDataset(projects, clients)
            this.setState({
              projects,
              clients,
              tableMessage: null
            })
          })
      })
      .catch(err => {
        this.setState({tableMessage: null})
        message.error(err)
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
          this.setState({
            project,
            orders: res.data,
            formMessage: null
          }) 
        })
    })
    .catch(err => {
      this.setState({formMessage: null})
      console.log('selectProject error:', err)
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
          projects: this.state.projects.map(s => s.id === project.id ? project : s)
        })
    } else if (mode === 'insert'){
      this.setState({
        project, 
        projects: [ ...this.state.projects, project ]
      })
    } else if (mode === 'delete') {
      this.setState({
        project: {},
        projects: this.state.projects.filter(x => x.id !== project.id),
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
    let orderColumns = [
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
      },
      {
        title: 'Engineer',
        dataIndex: 'responsibleEngineer',
        key: 'ResponsibleEngineer',
        sorter: (a, b) => a.responsibleengineer.length - b.responsibleengineer.length,
      },
      {
        title: 'Award Date',
        dataIndex: 'awardDate',
        key: 'awardDate',
        render: (text, record) => { return (<Moment format="YYYY/MM/DD">{text}</Moment>) },
        sorter: (a, b) => a.awarddate.length - b.awarddate.length,
      },
      {
        key: 'action',
        render: (text, record) => (
          <span>
            <BreadcrumbLink 
              from={`/suppliers/${this.state.supplier.id}`} 
              to={`/orders/${record.id}`}
              description={this.state.supplier.name} />
          </span>
        )
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
        onSelect={this.handleSelect}>
        {this.renderForm()}
        <Table
            columns={orderColumns}
            dataSource={this.state.orders}
            rowKey="id"
            pagination={{ pageSize: 10 }}/>
      </CRUDHelper>
    );
  }
}

Projects = Form.create()(Projects)

export default Projects