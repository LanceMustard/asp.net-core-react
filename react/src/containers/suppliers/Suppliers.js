import React, { Component } from 'react'
import {
  Table,
  Layout,
  Form,
  Select,
  Button,
  Input,
  Icon,
  Popconfirm,
  message
} from 'antd'
// import { fetchSupplier, fetchSuppliers, createSupplier, deleteSupplier, newSupplier, updateSupplier } from '../../actions/suppliers';
import { Header, Wrapper, Side, Body } from '../../components/Layout'
import FormToolbar, { handleFormSubmit, required, email } from '../../components/FormHelper'
import { fetchSuppliers, fetchSupplier } from './api'
import styled  from 'styled-components'
const { Content, Sider } = Layout;
const FormItem = Form.Item;

export const Toolbar = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding-bottom: 20px;
`

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

  renderForm() {
    const { getFieldDecorator, resetFields } = this.props.form;

    const defaultFormItemLayout = {
      labelCol: {
        xs: { span: 16 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <div>
        <Toolbar>
          <Button 
            type="button" >
            <Icon type="file-add"/>New
          </Button>
          <Button 
            type="button"
            htmlType="submit"
            onClick={this.handleSubmit} >
            <Icon type="save"/>Save
          </Button>
          <Button 
            type="button"
            onClick={this.handleReset}>
            <Icon type="retweet" />Clear
          </Button>
          <Popconfirm 
            title="Confirm delete?"> 
            <Button 
              type="button" >
              <Icon type="delete"/>Delete
            </Button>
          </Popconfirm>
        </Toolbar>
        <Form onSubmit={this.handleSubmit}>
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

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e)
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleReset = () => {
    this.props.form.resetFields(['name'])
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