import React, {
  Component
} from 'react'
import {
  Form,
  Input,
  Select,
  Tabs,
  Table,
  Button,
  Icon,
  Modal,
  DatePicker,
  Calendar,
  Radio,
  Badge
} from 'antd'
import moment from 'moment'
import styled from 'styled-components'
import FormHelper, {
  defaultFormItemLayout
} from 'components/FormHelper'
import CRUDHelper from 'components/CRUDHelper'
import { debug } from 'components/debug'
import confirm from 'components/confirm'
import RecordSelector from 'components/RecordSelector'
import { TableFooter } from 'components/Layout'
import {
  fetchOrders,
  fetchOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  fetchOrderDataRequirements,
  createOrderDataRequirements,
  deleteOrderDataRequirement
} from 'containers/orders/api'
import {
  fetchPackageTemplates,
  fetchPackageTemplateItems
} from 'containers/packageTemplates/api'
import { fetchProjects } from 'containers/projects/api'
import { fetchSuppliers } from 'containers/suppliers/api'
import { fetchDocumentCodes } from 'containers/documentCodes/api'

const FormItem = Form.Item
const TabPane = Tabs.TabPane
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const { TextArea } = Input;

class MaximiseButton extends Component {
  handleMaximise = () => {
    if (this.props.onMaximise) {
      this.props.onMaximise()
    }
  }
  
  render() {
    return (
      <Button style={{float: 'right'}} onClick={this.handleMaximise}>
        <Icon type='scan' />
      </Button>
    )
  }
}

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
    documentCodes: [],
    nonAssignedDocumentCodes: [],
    packageTemplates: [],
    addPackageTemplates: [],
    dataRequirement: {},
    dataRequirements: [],
    addDataRequirements: [],
    dataRequirementMode: 'default',  // add / template / edit
    tableMessage: 'Loading projects...',
    formMessage: null,
    columns: this.columns,
    maximiseDataRequirements: false,
    collapsed: this.props.match.params.id ? true : false
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
      fetchOrderDataRequirements(id)
      .then(res => {
        let dataRequirements = res.data
        dataRequirements.sort((a, b) => a.documentCode.code > b.documentCode.code ? 1 : b.documentCode.code > a.documentCode.code ? -1 : 0)
        this.setState({ 
          order,
          dataRequirements,
          formMessage: null
        }) 
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

  handleDeleteDataRequirement = (record) => {
    let confirmMessage = this.props.deleteMessage || `Please confirm that you want to remove data requirement  "${record.documentCode.code} - ${record.documentCode.description}" from this order?`
    confirm(confirmMessage, { title: "Delete confirmation" })
    .then((ok) => {
      this.setState({formMessage: 'Removing data requirement...'})
      deleteOrderDataRequirement(record.id)
      .then(res => {
        this.setState({
          dataRequirements: this.state.dataRequirements.filter(d => d.id !== res.data.id),
          formMessage: null
        })
      })
      .catch(err => {
        debug(err)
        this.setState({formMessage: null})
      })
    },
    (cancel) => { /* do nothing */ })
  }

  setDataRequirementMode = (mode) => {
    if (mode == 'add' && this.state.documentCodes.length === 0) {
      // populate document codes array
      this.setState({formMessage: 'Loading document codes...'})
      fetchDocumentCodes(this.state.order.project.libraryId)
      .then(res => {
        // Build and sort the documentCodes array
        let documentCodes = res.data.filter(x => x.parentId !== null)
        documentCodes.sort((a, b) => a.code > b.code ? 1 : b.code > a.code ? -1 : 0) 
        // Update nonAssignedDocumentCodes array and filter out all currently assigned document codes (can not add a user twice)
        let nonAssignedDocumentCodes = documentCodes
        this.state.dataRequirements.map(o => {
          nonAssignedDocumentCodes = nonAssignedDocumentCodes.filter(x => x.id !== o.documentCode.id) 
        })

        this.setState({
          documentCodes,
          nonAssignedDocumentCodes,
          formMessage: null,
          dataRequirementMode: mode,
          addDataRequirements: []
        })
      })
      .catch(err => {
        debug(err)
        this.setState({formMessage: null})
      })
    }
    else if (mode === 'template' && this.state.packageTemplates.length === 0) {
      this.setState({formMessage: 'Loading package tempates...'})
      fetchPackageTemplates(this.state.order.project.libraryId)
      .then(res => {
        this.setState({
          dataRequirementMode: mode,
          packageTemplates: res.data,
          formMessage: null
        })
      })
      .catch(err => {
        debug(err)
        this.setState({formMessage: null})
      })
    }
    else {
      // Update nonAssignedDocumentCodes array and filter out all currently assigned document codes (can not add a user twice)
      let nonAssignedDocumentCodes = this.state.documentCodes
      this.state.dataRequirements.map(o => {
        nonAssignedDocumentCodes = nonAssignedDocumentCodes.filter(x => x.id !== o.documentCode.id) 
      })
      this.setState({
        dataRequirementMode: mode,
        addDataRequirements: [],
        nonAssignedDocumentCodes 
      })
    }
  }

  handleAddDataRequirements = (data) => {
    this.setState({formMessage: 'Updating data requirements...'})
    createOrderDataRequirements(this.state.order.id, this.state.addDataRequirements)
    .then(res => {
      let dataRequirements = [...this.state.dataRequirements, ...res.data]
      dataRequirements.sort((a,b) => (a.documentCode.code > b.documentCode.code) ? 1 : ((b.documentCode.code > a.documentCode.code) ? -1 : 0))
      this.setDataRequirementMode('default')
      this.setState({
        dataRequirements,
        formMessage: null
      })
    })
    .catch(err => {
        debug(err)
        this.setState({formMessage: null})  
    })
  }

  handleEditDataRequirement = (record) => {
    this.setState({
      dataRequirement: record,
      dataRequirementMode: 'edit'
    })
  }

  handleCancelAddDataRequirements = () => {
    this.setDataRequirementMode('default')
  }

  handleAddDataRequirementsChange = (dataRequirements) => {
    this.setState({addDataRequirements: dataRequirements})
  }

  handleUpdateSelectTemplates =() => {
    this.setState({formMessage: 'Updating data requirements...'})
    this.state.packageTemplates.map(template => {
      fetchPackageTemplateItems(template.id)
      .then(res => {
        let addDataRequirements = []
        res.data.map(templateDocumentCode => {
          addDataRequirements.push({ id: templateDocumentCode.documentCodeId })
        })
        this.setState({addDataRequirements})
        this.handleAddDataRequirements(addDataRequirements)
      })
      .catch(err => {
        debug(err)
        this.setState({formMessage: null})
      })
    })
  }

  handleSelectTemplatesChange =(packageTemplates) => {
    this.setState({addPackageTemplates: packageTemplates})
  }

  handleCancelSelectTemplates = () => {
    this.setDataRequirementMode('default')
  }

  handleCancelEditDataRequirement = () => {
    this.setDataRequirementMode('default')
  }

  handleOnChangeDataRequirementRequired = (e) => {
    let dataRequirement = this.state.dataRequirement
    dataRequirement.required = e.target.value
    console.log('dataRequirement.required', dataRequirement.required)
    this.setState({dataRequirement})
  }

  renderEditDataRequirement = () => {
    const { getFieldDecorator } = this.props.form
    let content = null
    if (this.state.dataRequirement.required === 'Manual') {
      console.log('this.state.dataRequirement.dateRequired', this.state.dataRequirement.dateRequired)
      content = (
        <FormItem
        {...defaultFormItemLayout}
        label="Date:">
        {getFieldDecorator('dateRequired', {
          initialValue: moment(this.state.dataRequirement.dateRequired === null ? moment(new Date()) : this.state.dataRequirement.dateRequired), 
          rules: [{ 
            type: 'object', 
            message: 'Please select a required date!' 
          }]
        })(
          <DatePicker />
        )}
      </FormItem>
      )
    } else {
      content = (
        <div>
          <FormItem
            {...defaultFormItemLayout}
            label=" ">
            {getFieldDecorator('quantity', {
              initialValue: this.state.dataRequirement.quantity,
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...defaultFormItemLayout}
            label=" ">
            {getFieldDecorator('unit', {
              initialValue: this.state.dataRequirement.unit,
            })(
              <Select>
                <Option value='Days'>Days</Option>
                <Option value='Weeks'>Weeks</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
            {...defaultFormItemLayout}
            label=" ">
            {getFieldDecorator('required', {
              initialValue: this.state.dataRequirement.required,
            })(
              <Select>
                <Option value='After Award'>After Award</Option>
              </Select>
            )}
          </FormItem>
        </div>
      )
    }
    return (
      <Modal
        title="Edit Data Requirement"
        onCancel={this.handleCancelEditDataRequirement}
        onOk={this.handleCancelEditDataRequirement}
        okText="Save"
        visible={true}>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <FormItem
            {...defaultFormItemLayout}
            label="Code:">
            {getFieldDecorator('documentCode.code', {
              initialValue: this.state.dataRequirement.documentCode.code
            })(
              <b>{this.state.dataRequirement.documentCode.code}</b>
            )}
          </FormItem>
          <FormItem
            {...defaultFormItemLayout}
            label="Description:">
            {getFieldDecorator('documentCode.description', {
              initialValue: this.state.dataRequirement.documentCode.description
            })(
              <b>{this.state.dataRequirement.documentCode.description}</b>
            )}
          </FormItem>
          <FormItem
            {...defaultFormItemLayout}
            label="Comments">
            {getFieldDecorator('comments', {
              initialValue: this.state.dataRequirement.comments,
            })(
              <TextArea />
            )}
          </FormItem>
          <FormItem
            {...defaultFormItemLayout}
            label='Required Date:'>
            {getFieldDecorator('required', {
              initialValue: this.state.dataRequirement.required
            })(
              <RadioGroup onChange={this.handleOnChangeDataRequirementRequired}>
                <RadioButton value="Manual">Manually set</RadioButton>
                <RadioButton value="After Award">Calculated</RadioButton>
              </RadioGroup>
            )}
          </FormItem>
          {content}
        </Form>
      </Modal>
    )
  }

  renderDataRequirementsTable = () => {
    let userDataRequirements = [
      {
        title: 'Code',
        dataIndex: 'documentCode.code',
        key: 'documentCode.code',
        sorter: (a, b) => a.documentCode.code > b.documentCode.code ? 1 : b.documentCode.code > a.documentCode.code ? -1 : 0,
      },
      {
        title: 'Description',
        dataIndex: 'documentCode.description',
        key: 'documentCode.description',
        sorter: (a, b) => a.documentCode.description > b.documentCode.description ? 1 : b.documentCode.description > a.documentCode.description ? -1 : 0,
      },
      {
        title: 'Required Date',
        dataIndex: 'dateRequiredText',
        key: 'dateRequiredText',
        sorter: (a, b) => a.dateRequiredText > b.dateRequiredText ? 1 : b.dateRequiredText > a.dateRequiredText ? -1 : 0
      },
      {
        title: 'Comments',
        dataIndex: 'comments',
        key: 'comments'
      },
      {
        key: 'action',
        title: (
            <Button type="primary" icon="file-add" onClick={() => this.setDataRequirementMode('add')} disabled={this.state.order.id === undefined ? true : false}>Add Data Requirements</Button>
        ),
        render: (record) => (
          <span>
            <Button icon="edit" onClick={() => this.handleEditDataRequirement(record)}>Edit</Button> 
            <Button icon="delete" onClick={() => this.handleDeleteDataRequirement(record)}>Remove</Button> 
          </span>
        )
      }
    ]
    return (
      <div>
        <Table
          columns={userDataRequirements}
          dataSource={this.state.dataRequirements}
          rowKey="id"
          pagination={this.state.maximiseDataRequirements ? {pageSize: 100} : {pageSize: 8}}
          scroll={this.state.maximiseDataRequirements ? { y: '65vh', x: '60wv'} : {y: null, x: null}}
          size='small'
          footer={(data => 
            <div>
              <Button type="primary" icon="database" onClick={() => this.setDataRequirementMode('template')} disabled={this.state.order.id === undefined ? true : false}>Assign Template</Button>
              <MaximiseButton onMaximise={this.toggleMaximiseDataRequirements} />
            </div>
          )}
        />
      </div>
    )
  }

  renderAddDataRequirements = () => {
    const addDataRequirementColumns = [
      {
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
        sorter: (a, b) => a.code > b.code ? 1 : b.code > a.code ? -1 : 0
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        sorter: (a, b) => a.description > b.description ? 1 : b.description > a.description ? -1 : 0
      }
    ]
    return (
      <div>
        <h2>Select Document Codes to add to Package</h2>
        <RecordSelector
          searchField='code'
          searchText="Search by document code"
          columns={addDataRequirementColumns}
          dataSource={this.state.nonAssignedDocumentCodes}
          targetDataSource={this.state.addDataRequirements}
          onChange={this.handleAddDataRequirementsChange}
          pagination={this.state.maximiseDataRequirements ? {pageSize: 100} : {pageSize: 8}}
          scroll={this.state.maximiseDataRequirements ? { y: '65vh', x: '60wv'} : {y: null, x: null}}
          size='small'
          footer={(data => 
            <TableFooter>
              <Button 
                type="primary"
                onClick={this.handleAddDataRequirements.bind(this)}
                disabled={this.state.addDataRequirements.length === 0}>
                Update data requirements
              </Button>
              <Button onClick={this.handleCancelAddDataRequirements.bind(this)}>Cancel</Button>
              <MaximiseButton onMaximise={this.toggleMaximiseDataRequirements} />
            </TableFooter>
          )}
        />
      </div>
    )
  }

  renderSelectTemplate = () => {
    const selectTemplateColumns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0
      }
    ]
    return (
      <div>
        <h2>Select Template(s) to add to Package</h2>
        <RecordSelector
          searchField='name'
          searchText="Search by package tempate name"
          columns={selectTemplateColumns}
          dataSource={this.state.packageTemplates}
          targetDataSource={this.state.addPackageTemplates}
          onChange={this.handleSelectTemplatesChange}
          pagination={this.state.maximiseDataRequirements ? {pageSize: 100} : {pageSize: 8}}
          scroll={this.state.maximiseDataRequirements ? { y: '65vh', x: '60wv'} : {y: null, x: null}}
          size='small'
          footer={(data => 
            <TableFooter>
              <Button 
                type="primary"
                onClick={this.handleUpdateSelectTemplates.bind(this)}
                disabled={this.state.addPackageTemplates.length === 0}>
                Assign package template(s)
              </Button>
              <Button onClick={this.handleCancelSelectTemplates.bind(this)}>Cancel</Button>
              <MaximiseButton onMaximise={this.toggleMaximiseDataRequirements} />
            </TableFooter>
          )}
        />
      </div>
    )
  }

  renderDataRequirements = () => {
    if (this.state.maximiseDataRequirements) {
      let style = {
        height: 'calc(100vh - 85px)'
      }
      return (
        <Modal
          title="Data Requirements"
          footer={null}
          style={{top: 0}}
          width='100vw'
          bodyStyle={style}
          visible={true}
          onCancel={this.toggleMaximiseDataRequirements}>
          {this.state.dataRequirementMode == 'add' ? 
            this.renderAddDataRequirements() : 
            this.state.dataRequirementMode == 'template' ? 
              this.renderSelectTemplate() :
              this.state.dataRequirementMode == 'edit' ?
                this.renderEditDataRequirement() :
                this.renderDataRequirementsTable()}
        </Modal>
      )
    } else {
      return ( 
        this.state.dataRequirementMode == 'add' ? 
          this.renderAddDataRequirements() : 
          this.state.dataRequirementMode == 'template' ? 
            this.renderSelectTemplate() :
            this.state.dataRequirementMode == 'edit' ?
              this.renderEditDataRequirement() :
              this.renderDataRequirementsTable()
      )
    }
  }

  renderCalendarEvents = (value) => {
    const listData = [
      { type: 'success', content: 'Content the supplier' },
      { type: 'success', content: 'Expecting some stuff from the supplier' },
      { type: 'success', content: 'Close out the order' },
    ]
    return (
      <ul className="events">
        {
          listData.map(item => (
            <li key={item.content}>
              <Badge status={item.type} text={item.content} />
            </li>
          ))
        }
      </ul>
    );
  }

  renderForm() {
    const { getFieldDecorator } = this.props.form
    return (
      <Tabs>
        <TabPane tab="Details" key="1">
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
        </TabPane>
        <TabPane tab="Attachments" key="2">
        </TabPane>
        <TabPane tab="Data Requirements" key="3">
          {this.renderDataRequirements()}
        </TabPane>
        <TabPane tab="Document Schedule" key="4">
        </TabPane>
        <TabPane tab="Calendar" key="5">
            <Calendar 
              dateCellRender={this.renderCalendarEvents} 
              mode={this.state.collapsed ? 'month' : 'year'}
            />
        </TabPane>
        <TabPane tab="History" key="6">
        </TabPane>
      </Tabs>
    )
  }

  toggleMaximiseDataRequirements = () => {
    this.setState({maximiseDataRequirements: !this.state.maximiseDataRequirements })
  }

  handleToggleSide = (collapsed) => {
    this.setState({collapsed})
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
        header={`Order Maintenance${this.state.order.id !== undefined ? ` - ${this.state.order.number} - ${this.state.order.description}` : ''}`}
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
        onToggleSide={this.handleToggleSide}
        params={this.props.match.params}>
        { this.renderForm() }
      </CRUDHelper>
    )
  }
}

Orders = Form.create()(Orders);

export default Orders
