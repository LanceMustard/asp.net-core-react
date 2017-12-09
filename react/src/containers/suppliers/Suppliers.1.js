import React, {
  Component
} from 'react'
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
  fetchSuppliers,
  fetchSupplier,
  createSupplier,
  updateSupplier,
  deleteSupplier
} from './api'

const FormItem = Form.Item;

class Suppliers extends Component {
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
    ];
  }

  state = {
    suppliers: [],
    supplier: {}
  }

  componentWillMount() {
    fetchSuppliers()
      .then(res => this.setState({ suppliers: res.data }) )
      .catch(err => message.error(err))
  }

  rowSelected(record, index, event) {
    if (!this.props.form.isFieldsTouched(['name']))
    {
      fetchSupplier(record.id)
        .then(res => this.setState({ supplier: res.data }) )
        .catch(err => message.error(err))
    } else {
      if (record.id !== this.state.supplier.id) {
        message.error(`Changes exist. Either save or clear these changes before navigating away from this record`)
      }
    }
  }

  handleSubmit(data, fields, mode) {
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
      })
      
    } else if (mode === 'new') {
      this.setState({supplier: {}})
    }
  }

  renderForm() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <FormToolbar 
          onSubmit={this.handleSubmit.bind(this)}
          onDelete={deleteSupplier}
          onInsert={createSupplier}
          onUpdate={updateSupplier}
          /* onNew={this.handleNew.bind(this)} */
          form={this.props.form}
          record={this.state.supplier}
          fields={['name']}/>
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
      </div>
    )
  }

  rowClassName(record, index) {
    return record.id === this.state.supplier.id ? 'SelectedRow'  : null;
  }

  render() {
    return (
      <div>
        <Header>
          <h1>Supplier Maintenance</h1>
        </Header>
        <Wrapper>
          <Side>
            <Table
              columns={this.columns}
              dataSource={this.state.suppliers}
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

Suppliers = Form.create()(Suppliers);
export default Suppliers