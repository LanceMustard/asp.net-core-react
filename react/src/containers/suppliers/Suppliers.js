import React, {
  Component
} from 'react'
import {
  Form,
  Input,
  Table,
  message
} from 'antd'
import Moment from 'react-moment'
import FormHelper, {
  defaultFormItemLayout
} from '../../components/FormHelper'
import BreadcrumbLink from '../../components/BreadcrumbLink'
import CRUDHelper from '../../components/CRUDHelper'
import {
  fetchSuppliers,
  fetchSupplier,
  fetchSupplierOrders,
  createSupplier,
  updateSupplier,
  deleteSupplier
} from './api'

const FormItem = Form.Item;

class Suppliers extends Component {
  constructor(props) {
    super(props);
    this.fields = ['name']
  }

  state = {
    suppliers: [],
    supplier: {},
    orders: [],
    tableMessage: 'Loading suppliers...',
    formMessage: null,
  }

  componentWillMount() {
    // load inital record if one is specified in the params
    if (this.props.match.params.id) this.selectSupplier(this.props.match.params.id)
    // populate client tables
    fetchSuppliers()
      .then(res => {
        console.log('fetchSuppliers', res.data)
        this.setState({
          suppliers: res.data,
          tableMessage: null
        })
      })
      .catch(err => {
        this.setState({tableMessage: null})
        message.error(err)
      })
  }

  selectSupplier = (id) => {
    this.setState({ formMessage: 'Loading supplier details...' })
    fetchSupplier(id)
      .then(res => {
        var supplier = res.data
        fetchSupplierOrders(id)
        .then(res => {
          console.log('fetchSupplierOrders', res.data)
          this.setState({
            supplier,
            orders: res.data,
            formMessage: null
          }) 
        })
      })
      .catch(err => {
        this.setState({formMessage: null})
        console.error(err)
      })
  }

  handleSelect = (record, index, event) => {
    if (!this.props.form.isFieldsTouched(this.fields))
    {
      this.selectSupplier(record.id)
    } else {
      if (record.id !== this.state.supplier.id) {
        message.error(`Changes exist. Either save or clear these changes before navigating away from this record`)
      }
    }
  }

  handleSubmit = (data, fields, mode) => {
    if (mode === 'update') {
      this.setState({
          supplier: data, 
          suppliers: this.state.suppliers.map(s => s.id === data.id ? data : s)
        })
    } else if (mode === 'insert'){
      this.setState({
        supplier: data, 
        suppliers: [ ...this.state.suppliers, data ]
      })
    } else if (mode === 'delete') {
      this.setState({
        supplier: {},
        suppliers: this.state.suppliers.filter(x => x.id !== data.id),
        orders: []
      })
      
    } else if (mode === 'new') {
      this.setState({
        supplier: {},
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
        onDelete={deleteSupplier}
        onInsert={createSupplier}
        onUpdate={updateSupplier}
        onProgress={this.handleProgress}
        record={this.state.supplier}>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <FormItem
            {...defaultFormItemLayout}
            label="Name:">
            {getFieldDecorator('name', {
              initialValue: this.state.supplier.name,
              rules: [{ 
                required: true, 
                message: 'Please input a supplier name!', 
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
    let columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
      }
    ]
    let orderColumns = [
      {
        title: 'Order Number',
        dataIndex: 'number',
        key: 'number',
        sorter: (a, b) => a.number.length - b.number.length,
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        sorter: (a, b) => a.description.length - b.description.length,
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
      dataSource: this.state.suppliers,
      columns: columns
    }
    return (
      <CRUDHelper 
        form={this.props.form}
        header="Supplier Maintenance"
        fields={this.fields}
        rowKey="id"
        searchField="name"
        searchText="Search by supplier name..."
        path={this.props.location.pathname}
        currentRecord={this.state.supplier}
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
    )
  }
}

Suppliers = Form.create()(Suppliers);
export default Suppliers