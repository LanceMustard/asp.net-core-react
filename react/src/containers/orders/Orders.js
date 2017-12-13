import React, {
  Component
} from 'react'
import {
  Form,
  Input,
  Select,
  DatePicker
} from 'antd'
import moment from 'moment'
import FormHelper, {
  defaultFormItemLayout
} from 'components/FormHelper'
import CRUDHelper from 'components/CRUDHelper'
import { debug } from 'components/debug'
import {
  fetchOrders,
  fetchOrder,
  createOrder,
  updateOrder,
  deleteOrder
} from 'containers/orders/api'
import { fetchProjects } from 'containers/projects/api'
import { fetchSuppliers } from 'containers/suppliers/api'

const FormItem = Form.Item
const Option = Select.Option

class Orders extends Component {
  constructor(props) {
    super(props);
    this.fields = ['number', 'description', 'projectId', 'supplierId', 'requisitionNumber', 'responsibleEngineer', 'awardDate']
  }

  state = {
    orders: [],
    order: {},
    projects: [],
    suppliers: [],
    tableMessage: 'Loading projects...',
    formMessage: null,
    columns: this.columns
  }

  componentWillMount() {
    fetchOrders()
      .then(res => {
        let orders = res.data
        fetchProjects()
          .then(res => {
            let projects = res.data
            fetchSuppliers()
              .then(res => {
                let suppliers = res.data
                orders = this.buildDataset(orders, projects, suppliers)
                this.setState({
                  orders,
                  projects,
                  suppliers,
                  tableMessage: null
                })
                // load inital record if one is specified in the params
                if (this.props.match.params.id) this.selectOrder(this.props.match.params.id)
              })
          })
      })
      .catch(err => {
        this.setState({tableMessage: null})
        debug(err)
      })
  }

  // merge in related records with the order record
  buildDataset = (orders, projects, suppliers) => {
    let retval = []
    for (let i in orders) {
      retval.push(this.handleForeignFields(orders[i], projects, suppliers))
    }
    return retval
  }

  handleForeignFields = (order, projects, suppliers) => {
    if (order) {
      projects = projects ? projects : this.state.projects
      suppliers = suppliers ? suppliers : this.state.suppliers 
      order.project = projects.find(x => x.id === order.projectId)
      order.supplier = suppliers.find(x => x.id === order.supplierId)
    }
    return order
  }

  selectOrder = (id) => {
    this.setState({formMessage: 'Loading order details...'})
    fetchOrder(id)
      .then(res => {
        let order = this.handleForeignFields(res.data)
        this.setState({ 
          order,
          formMessage: null
        }) 
      })
      .catch(err => {
        this.setState({formMessage: null})
        debug(err)
      })
  }

  handleSelect = (record, index, event) => {
    if (!this.props.form.isFieldsTouched(this.fields)) {
      this.selectOrder(record.id)
    } else {
      if (record.id !== this.state.order.id) {
        debug(`Changes exist. Either save or clear these changes before navigating away from this record`)
      }
    }
  }

  handleSubmit = (data, fields, mode) => {
    let order = this.handleForeignFields(data)
    if (mode === 'update') {
      this.setState({
          order, 
          orders: this.state.orders.map(s => s.id === order.id ? order : s)
        })
    } else if (mode === 'insert'){
      this.setState({
        order, 
        orders: [ ...this.state.orders, order ]
      })
    } else if (mode === 'delete') {
      this.setState({
        order: {},
        orders: this.state.orders.filter(x => x.id !== order.id),
      })
      
    } else if (mode === 'new') {
      this.setState({order: {}})
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
        onDelete={deleteOrder}
        onInsert={createOrder}
        onUpdate={updateOrder}
        onProgress={this.handleProgress}
        record={this.state.order}>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <FormItem
            {...defaultFormItemLayout}
            label="Number:">
            {getFieldDecorator('number', {
              initialValue: this.state.order.number,
              rules: [{ 
                required: true, 
                message: 'Please input an order number!', 
                whitespace: true }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...defaultFormItemLayout}
            label="Description:">
            {getFieldDecorator('description', {
              initialValue: this.state.order.description,
              rules: [{ 
                required: true, 
                message: 'Please input an order description!', 
                whitespace: true }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...defaultFormItemLayout}
            label="Project:">
            {getFieldDecorator('projectId', {
              initialValue: this.state.order.projectId,
              // initialValue: this.state.order.project ? this.state.order.project.name : '',
              rules: [{ 
                required: true, 
                message: 'Please select a project!' 
              }],
            })(
              <Select placeholder="Select project">
                {this.state.projects.map(p=> <Option value={p.id} key={p.id}>{p.name}</Option>)}
              </Select>
            )}
          </FormItem>
          <FormItem
            {...defaultFormItemLayout}
            label="Supplier:">
            {getFieldDecorator('supplierId', {
              initialValue: this.state.order.supplierId,
              // initialValue: this.state.order.supplier ? this.state.order.supplier.name : '',
              rules: [{ 
                required: true, 
                message: 'Please select a supplier!' 
              }],
            })(
              <Select placeholder="Select supplier">
                {this.state.suppliers.map(s => <Option value={s.id} key={s.id}>{s.name}</Option>)}
              </Select>
            )}
          </FormItem>
          <FormItem
            {...defaultFormItemLayout}
            label="Requisition Number:">
            {getFieldDecorator('requisitionNumber', {
              initialValue: this.state.order.requisitionNumber,
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...defaultFormItemLayout}
            label="Responsible Engineer:">
            {getFieldDecorator('responsibleEngineer', {
              initialValue: this.state.order.responsibleEngineer,
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...defaultFormItemLayout}
            label="Award Date:">
            {getFieldDecorator('awardDate', {
              // initialValue: (<Moment format="YYYY/MM/DD">{this.state.order.awardDate}</Moment>),
              initialValue: moment(this.state.order.awardDate), 
              rules: [{ 
                type: 'object', 
                message: 'Please select an award date!' 
              }]
            })(
              <DatePicker />
            )}
          </FormItem>
        </Form>
      </FormHelper>
    )
  }

  render() {
    let columns = [
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        sorter: (a, b) => a.description.length - b.description.length,
      },
      {
        title: 'Supplier',
        dataIndex: 'supplier.name',
        key: 'supplier.name',
        sorter: (a, b) => a.supplier.name.length - b.supplier.name.length,
        filters: this.state.suppliers.map(s => ({ text: s.name, value: s.name })),
        onFilter: (value, record) => record.supplier.name === value,
      },
      {
        title: 'Project',
        dataIndex: 'project.name',
        key: 'project.name',
        sorter: (a, b) => a.project.name.length - b.project.name.length,
        filters: this.state.projects.map(p => ({ text: p.name, value: p.name })),
        onFilter: (value, record) => record.project.name === value,
      }
    ]
    const navigationTable = {
      dataSource: this.state.orders,
      columns: columns
    }
    return (
      <CRUDHelper 
        form={this.props.form}
        header="Order Maintenance"
        fields={this.fields}
        rowKey="id"
        searchField="description"
        searchText="Search by order description..."
        sideWidth="600px"
        path={this.props.location.pathname}
        currentRecord={this.state.order}
        navigationTable={navigationTable}
        sideMessage={this.state.tableMessage}
        bodyMessage={this.state.formMessage}
        search={this.state.search}
        filter={this.state.filter}
        onSelect={this.handleSelect}
        params={this.props.match.params}>
        {this.renderForm()}
      </CRUDHelper>
    )
  }
}


Orders = Form.create()(Orders);

export default Orders
