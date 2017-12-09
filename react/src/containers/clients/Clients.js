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
  fetchClients,
  fetchClient,
  fetchClientProjects,
  createClient,
  updateClient,
  deleteClient
} from './api'

const FormItem = Form.Item;

class Clients extends Component {
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
    this.projectColumns = [
      {
        title: 'Projects',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
      },
      {
        key: 'action',
        render: (text, record) => (
          <span>
            <BreadcrumbLink 
              from={`/clients/${this.state.client.id}`} 
              to={`/projects/${record.id}`}
              description={this.state.client.name} />
          </span>
        )
      }
    ]
    this.fields = ['name']
  }

  state = {
    clients: [],
    client: {},
    projects: [],
    tableMessage: 'Loading clients...',
    formMessage: null,
  }

  componentWillMount() {
    // load inital record if one is specified in the params
    if (this.props.match.params.id) this.selectClient(this.props.match.params.id)
    // populate client tables
    fetchClients()
      .then(res => {
        this.setState({
          clients: res.data,
          tableMessage: null
        })
      })
      .catch(err => {
        this.setState({tableMessage: null})
        message.error(err)
      })
  }

  selectClient = (id) => {
    this.setState({formMessage: 'Loading client details...'})
    fetchClient(id)
      .then(res => {
        var client = res.data
        fetchClientProjects(id)
        .then(res => {
          this.setState({
            client,
            projects: res.data,
            formMessage: null
            }) 
        })
      })
      .catch(err => {
        this.setState({formMessage: null})
        message.error(err)
      })
  }

  handleSelect = (record, index, event) => {
    if (!this.props.form.isFieldsTouched(this.fields))
    {
      this.selectClient(record.id)
    } else {
      if (record.id !== this.state.client.id) {
        message.error(`Changes exist. Either save or clear these changes before navigating away from this record`)
      }
    }
  }

  handleSubmit(data, fields, mode) {
    if (mode === 'update') {
      this.setState({
          client: data, 
          clients: this.state.clients.map(s => s.id === data.id ? data : s)
        })
    } else if (mode === 'insert'){
      this.setState({
        client: data, 
        clients: [ ...this.state.clients, data ]
      })
    } else if (mode === 'delete') {
      this.setState({
        client: {},
        clients: this.state.clients.filter(x => x.id !== data.id),
        projects: []
      })
      
    } else if (mode === 'new') {
      this.setState({
        client: {},
        projects: []
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
        onDelete={deleteClient}
        onInsert={createClient}
        onUpdate={updateClient}
        onProgress={this.handleProgress}
        record={this.state.client}>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <FormItem
            {...defaultFormItemLayout}
            label="Name:">
            {getFieldDecorator('name', {
              initialValue: this.state.client.name,
              rules: [{ 
                required: true, 
                message: 'Please input a client name!', 
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
      dataSource: this.state.clients,
      columns: this.columns
    }
    return (
      <CRUDHelper 
        form={this.props.form}
        header="Client Maintenance"
        fields={this.fields}
        rowKey="id"
        searchText="Search by client name..."
        path={this.props.location.pathname}
        currentRecord={this.state.client}
        navigationTable={navigationTable}
        sideMessage={this.state.tableMessage}
        bodyMessage={this.state.formMessage}
        search={this.state.search}
        filter={this.state.filter}
        onSelect={this.handleSelect}>
        {this.renderForm()}
        <Table
            columns={this.projectColumns}
            dataSource={this.state.projects}
            rowKey="id"
            pagination={{ pageSize: 10 }}/>
      </CRUDHelper>
    )
  }
}


Clients = Form.create()(Clients);

export default Clients