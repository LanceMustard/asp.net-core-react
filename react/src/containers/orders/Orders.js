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
  fetchOrders,
  fetchOrder,
  createOrder,
  updateOrder,
  deleteOrder
} from './api'
import { addBreadcrumb, removeBreadcrumb } from './../../actions/breadcrumbs'

const FormItem = Form.Item;
const FormFields = ['description']

class Orders extends Component {
  constructor(props) {
    super(props);
    this.rowSelected = this.rowSelected.bind(this)
    this.rowClassName = this.rowClassName.bind(this)
    this.columns = [
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        sorter: (a, b) => a.description.length - b.description.length,
      }
    ];
  }

  state = {
    orders: [],
    order: {}
  }

  componentWillMount() {
    this.props.removeBreadcrumb(this.props.location.pathname)
    // load inital record if one is specified in the params
    if (this.props.match.params.id) this.handleSelect(this.props.match.params.id)
    // populate orders tables
    fetchOrders()
      .then(res => this.setState({ orders: res.data }) )
      .catch(err => message.error(err))
  }

  rowSelected(record, index, event) {
    if (!this.props.form.isFieldsTouched(FormFields)) {
      this.handleSelect(record.id)
    } else {
      if (record.id !== this.state.order.id) {
        message.error(`Changes exist. Either save or clear these changes before navigating away from this record`)
      }
    }
  }

  handleSelect(id) {
    fetchOrder(id)
      .then(res => this.setState({ order: res.data }) )
      .catch(err => message.error(err))
  }

  handleSubmit(data, fields, mode) {
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

  renderForm() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <FormToolbar 
          onSubmit={this.handleSubmit.bind(this)}
          onDelete={deleteOrder}
          onInsert={createOrder}
          onUpdate={updateOrder}
          form={this.props.form}
          record={this.state.order}
          fields={FormFields}/>
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
      </div>
    )
  }

  rowClassName(record, index) {
    return record.id === this.state.order.id ? 'SelectedRow'  : null;
  }

  render() {
    return (
      <div>
        <Header>
          <h1>Order Maintenance</h1>
        </Header>
        <Wrapper>
          <Side>
            <Table
              columns={this.columns}
              dataSource={this.state.orders}
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


function mapStateToProps(state) {
  return { breadcrumbs: state.breadcrumbs }
}

Orders = Form.create()(Orders);

export default connect(mapStateToProps,
  { addBreadcrumb,
    removeBreadcrumb
   })(Orders)
