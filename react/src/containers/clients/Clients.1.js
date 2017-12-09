import React, {
  Component
} from 'react'
import { connect } from 'react-redux'
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
  fetchClients,
  fetchClient,
  fetchClientProjects,
  createClient,
  updateClient,
  deleteClient
} from './api'
import BreadcrumbLink from '../../components/BreadcrumbLink'
import { addBreadcrumb, removeBreadcrumb } from './../../actions/breadcrumbs'

const FormItem = Form.Item;

class Clients extends Component {
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
              description={this.state.client.name} 
              onClick={this.props.addBreadcrumb}/>
          </span>
        )
      }
    ]
  }

  state = {
    clients: [],
    client: {},
    projects: []
  }

  componentWillMount() {
    this.props.removeBreadcrumb(this.props.location.pathname)
    // load inital record if one is specified in the params
    if (this.props.match.params.id) this.handleSelect(this.props.match.params.id)
    // populate client tables
    fetchClients()
      .then(res => this.setState({clients: res.data}))
      .catch(err => message.error(err))
  }

  rowSelected(record, index, event) {
    if (!this.props.form.isFieldsTouched(['name']))
    {
      this.handleSelect(record.id)
    } else {
      if (record.id !== this.state.client.id) {
        message.error(`Changes exist. Either save or clear these changes before navigating away from this record`)
      }
    }
  }

  handleSelect(id) {
    fetchClient(id)
    .then(res => {
      var client = res.data
      fetchClientProjects(id)
      .then(res => {
        this.setState({
           client,
           projects: res.data 
          }) 
      })
    })
    .catch(err => message.error(err))
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
      })
      
    } else if (mode === 'new') {
      this.setState({client: {}})
    }
  }

  renderForm() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <FormToolbar 
          onSubmit={this.handleSubmit.bind(this)}
          onDelete={deleteClient}
          onInsert={createClient}
          onUpdate={updateClient}
          /* onNew={this.handleNew.bind(this)} */
          form={this.props.form}
          record={this.state.client}
          fields={['name']}/>
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
      </div>
    )
  }

  rowClassName(record, index) {
    return record.id === this.state.client.id ? 'SelectedRow'  : null;
  }

  render() {
    return (
      <div>
        <Header>
          <h1>Client Maintenance</h1>
        </Header>
        <Wrapper>
          <Side>
            <Table
              columns={this.columns}
              dataSource={this.state.clients}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              onRowClick={this.rowSelected}
              rowClassName={this.rowClassName} />
          </Side>
          <Body>
            {this.renderForm()}
            <Table
              columns={this.projectColumns}
              dataSource={this.state.projects}
              rowKey="id"
              pagination={{ pageSize: 10 }}/>
          </Body>
        </Wrapper>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return { breadcrumbs: state.breadcrumbs }
}

Clients = Form.create()(Clients);

export default connect(mapStateToProps,
  { addBreadcrumb,
    removeBreadcrumb
   })(Clients)
