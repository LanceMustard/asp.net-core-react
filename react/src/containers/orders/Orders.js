import React, {
  Component
} from 'react'
import {
  Form,
  Input,
  message
} from 'antd'
import FormHelper, {
  defaultFormItemLayout
} from '../../components/FormHelper'
import CRUDHelper from '../../components/CRUDHelper'
import {
  fetchOrders,
  fetchOrder,
  createOrder,
  updateOrder,
  deleteOrder
} from './api'

const FormItem = Form.Item;

class Orders extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        sorter: (a, b) => a.description.length - b.description.length,
      }
    ]
    this.fields = ['description']
  }

  state = {
    orders: [],
    order: {},
    tableMessage: 'Loading projects...',
    formMessage: null,
  }

  componentWillMount() {
    // load inital record if one is specified in the params
    if (this.props.match.params.id) this.selectOrder(this.props.match.params.id)
    // populate client tables
    fetchOrders()
      .then(res => {
        this.setState({
          orders: res.data,
          tableMessage: null
        })
      })
      .catch(err => {
        this.setState({tableMessage: null})
        message.error(err)
      })
  }

  selectOrder = (id) => {
    this.setState({formMessage: 'Loading order details...'})
    fetchOrder(id)
      .then(res => this.setState({ 
        order: res.data,
        formMessage: null
      }) )
      .catch(err => {
        this.setState({formMessage: null})
        message.error(err)
      })
  }

  handleSelect = (record, index, event) => {
    if (!this.props.form.isFieldsTouched(this.fields)) {
      this.selectOrder(record.id)
    } else {
      if (record.id !== this.state.order.id) {
        message.error(`Changes exist. Either save or clear these changes before navigating away from this record`)
      }
    }
  }

  handleSubmit = (data, fields, mode) => {
    if (mode === 'update') {
      this.setState({
          order: data, 
          orders: this.state.orders.map(s => s.id === data.id ? data : s)
        })
    } else if (mode === 'insert'){
      this.setState({
        order: data, 
        orders: [ ...this.state.orders, data ]
      })
    } else if (mode === 'delete') {
      this.setState({
        order: {},
        orders: this.state.orders.filter(x => x.id !== data.id),
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
        </Form>
      </FormHelper>
    )
  }

  render() {
    const navigationTable = {
      dataSource: this.state.orders,
      columns: this.columns
    }
    return (
      <CRUDHelper 
        form={this.props.form}
        header="Order Maintenance"
        fields={this.fields}
        rowKey="id"
        searchField="description"
        searchText="Search by order description..."
        path={this.props.location.pathname}
        currentRecord={this.state.order}
        navigationTable={navigationTable}
        sideMessage={this.state.tableMessage}
        bodyMessage={this.state.formMessage}
        search={this.state.search}
        filter={this.state.filter}
        onSelect={this.handleSelect}>
        {this.renderForm()}
      </CRUDHelper>
    );
  }
}


Orders = Form.create()(Orders);

export default Orders
