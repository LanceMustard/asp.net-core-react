import React, {
  Component
} from 'react'
import {
  Form,
  Input,
  Select,
  Button,
  Table
} from 'antd'
import styled from 'styled-components'
import FormHelper, {
  defaultFormItemLayout
} from '../../components/FormHelper'
import BreadcrumbLink from '../../components/BreadcrumbLink'
import CRUDHelper from '../../components/CRUDHelper'
import RecordSelector from 'components/RecordSelector'
import { TableFooter } from 'components/Layout'
import confirm from 'components/confirm'
import { debug } from 'components/debug'
import {
  fetchPackageTemplates,
  fetchPackageTemplate,
  fetchPackageTemplatesByLibrary,
  createPackageTemplate,
  updatePackageTemplate,
  deletePackageTemplate,
  fetchPackageTemplateItems,
  deletePackageTemplateItem,
  createPackageTemplateItems
} from './api'
import { 
  fetchLibrary,
  fetchLibraries 
} from 'containers/libraries/api'
import { fetchDocumentCodes } from 'containers/documentCodes/api'

const FormItem = Form.Item
const Option = Select.Option

const SelectLibrary = styled(Select)`
  width: 100%;
`

class PackageTemplates extends Component {
  constructor(props) {
    super(props)
    this.columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
      }
    ]
    this.fields = ['libraryId, name']
  }

  state = {
    packageTemplates: [],
    packageTemplate: {},
    packageTemplateItems: [],
    addDocumentCodesMode: false,
    documentCodes: [],
    nonAssignedDocumentCodes: [],
    addDocumentCodes: [],
    libraryId: {},
    libraries: [],
    tableMessage: 'Loading Package Templates...',
    formMessage: null,
  }

  componentWillMount() {
    // load inital record if one is specified in the params
    if (this.props.match.params.id) this.selectPackageTemplate(this.props.match.params.id)
    fetchLibraries()
    .then(res => this.setState({ 
      libraries: res.data,
      tableMessage: null 
    }) )
    .catch(err => debug(err))
  }

  selectLibrary = (id) => {
    this.setState({tableMessage: 'Loading Reference Library...'})
    fetchLibrary(id)
    .then(res => {
      let library = res.data
      fetchPackageTemplatesByLibrary(id)
      .then(res => {
        let packageTemplates = res.data
        packageTemplates.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0) 
        this.setState({
          library,
          packageTemplates,
          packageTemplate: {},
          packageTemplateItems: [],
          tableMessage: null
        })
      })
    })
    .catch(err => {
      this.setState({tableMessage: null})
      debug(err)
    })
  }

  selectPackageTemplate = (id) => {
    this.setState({formMessage: 'Loading Package Template details...'})
    fetchPackageTemplate(id)
    .then(res => {
      var packageTemplate = res.data
      fetchPackageTemplateItems(id)
      .then(res => {
        console.log('res.data', res.data)
        let packageTemplateItems = res.data
        packageTemplateItems.sort((a, b) => a.documentCode.code > b.documentCode.code ? 1 : b.documentCode.code > a.documentCode.code ? -1 : 0) 
        this.setState({
          packageTemplate,
          packageTemplateItems,
          formMessage: null
          }) 
      })
    })
    .catch(err => {
      this.setState({formMessage: null})
      debug(err)
    })
  }

  toggleAddDocumentCodes = () => {
    if (!this.state.addDocumentCodesMode && this.state.documentCodes.length === 0) {
      this.setState({formMessage: 'Loading Document Codes...'})
      fetchDocumentCodes(this.state.library.id)
      .then(res => {
        // Build and sort the documentCodes array
        let documentCodes = res.data.filter(x => x.parentId !== null)
        documentCodes.sort((a, b) => a.code > b.code ? 1 : b.code > a.code ? -1 : 0) 
        // Update nonAssignedDocumentCodes array and filter out all currently assigned document codes (can not add a user twice)
        let nonAssignedDocumentCodes = documentCodes
        this.state.packageTemplateItems.map(o => {
          nonAssignedDocumentCodes = nonAssignedDocumentCodes.filter(x => x.id !== o.documentCode.id) 
        })
        this.setState({
          addDocumentCodesMode: !this.state.addDocumentCodesMode,
          documentCodes,
          nonAssignedDocumentCodes,
          formMessage: null
        })  
      })
      .catch(err => {
        debug(err)
        this.setState({formMessage: null})
      })
    } else {
      // Update nonAssignedDocumentCodes array and filter out all currently assigned document codes (can not add a user twice)
      let nonAssignedDocumentCodes = this.state.documentCodes
      this.state.packageTemplateItems.map(o => {
        nonAssignedDocumentCodes = nonAssignedDocumentCodes.filter(x => x.id !== o.documentCode.id) 
      })
      this.setState({
        addDocumentCodesMode: !this.state.addDocumentCodesMode,
        nonAssignedDocumentCodes,
        addDocumentCodes: []
      })
    }
  }

  handleDeleteDocumentCode = (record) => {
    let confirmMessage = this.props.deleteMessage || `Please confirm that you want to remove document code  "${record.documentCode.code} - ${record.documentCode.description}" from this order?`
    confirm(confirmMessage, { title: "Delete confirmation" })
    .then((ok) => {
      this.setState({formMessage: 'Deleting package template item...'})
      deletePackageTemplateItem(record.id)
      .then(res => {
        this.setState({
          packageTemplateItems: this.state.packageTemplateItems.filter(x => x.id !== record.id),
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

  handleSelect = (record, index, event) => {
    if (!this.props.form.isFieldsTouched(this.fields))
    {
      this.selectPackageTemplate(record.id)
    } else {
      if (record.id !== this.state.packageTemplate.id) {
        debug(`Changes exist. Either save or clear these changes before navigating away from this record`)
      }
    }
  }

  handleSubmit(data, fields, mode) {
    if (mode === 'update') {
      this.setState({
          packageTemplate: data, 
          packageTemplates: this.state.packageTemplates.map(s => s.id === data.id ? data : s)
        })
    } else if (mode === 'insert'){
      this.setState({
        packageTemplate: data, 
        packageTemplates: [ ...this.state.packageTemplates, data ]
      })
    } else if (mode === 'delete') {
      this.setState({
        packageTemplate: {},
        packageTemplates: this.state.packageTemplates.filter(x => x.id !== data.id),
        packageTemplateItems: []
      })
      
    } else if (mode === 'new') {
      this.setState({
        packageTemplate: {},
        packageTemplateItems: []
      })
    }
  }

  handleProgress = (message) => {
    this.setState({formMessage: message})
  }

  handleAddDocumentCodesChange = (data) => {
    this.setState({addDocumentCodes: data})
  }

  handleUpdatePackageTemplateItems = () => {
    this.setState({formMessage: 'Updating package template items...'})
    createPackageTemplateItems(this.state.packageTemplate.id, this.state.addDocumentCodes)
    .then(res => {
      let packageTemplateItems = [...this.state.packageTemplateItems, ...res.data]
      packageTemplateItems.sort((a,b) => (a.documentCode.code > b.documentCode.code) ? 1 : ((b.documentCode.code > a.documentCode.code) ? -1 : 0))
      this.setState({
        packageTemplateItems,
        addDocumentCodesMode: false,
        formMessage: null
      })
    })
    .catch(err => {
        debug(err)
        this.setState({formMessage: null})  
    })
  }

  renderForm() {
    const { getFieldDecorator } = this.props.form;

    return (
      <FormHelper
        onSubmit={this.handleSubmit.bind(this)}
        onDelete={deletePackageTemplate}
        onInsert={createPackageTemplate}
        onUpdate={updatePackageTemplate}
        onProgress={this.handleProgress}
        record={this.state.packageTemplate}>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <FormItem
            {...defaultFormItemLayout}
            >
            {getFieldDecorator('libraryId', {
              initialValue: this.state.library ? this.state.library.id : null
            })(
              <div/>
            )}
          </FormItem>
          <FormItem
            {...defaultFormItemLayout}
            label="Name:">
            {getFieldDecorator('name', {
              initialValue: this.state.packageTemplate.name,
              rules: [{ 
                required: true, 
                message: 'Please input a Package Template name!', 
                whitespace: true }],
            })(
              <Input />
            )}
          </FormItem>
        </Form>
      </FormHelper>
    )
  }

  renderDocumentCodes() {
    let documentCodeColumns = [
      {
        title: 'Document Codes',
        dataIndex: 'documentCode.code',
        key: 'documentCode.code',
        sorter: (a, b) => a.documentCode.code.length - b.documentCode.code.length,
      },
      {
        title: 'Description',
        dataIndex: 'documentCode.description',
        key: 'documentCode.description',
        sorter: (a, b) => a.documentCode.description.length - b.documentCode.description.length,
      },
      {
        key: 'action',
        title: (
          <Button type="primary" icon="file-add" onClick={() => this.toggleAddDocumentCodes()} disabled={this.state.packageTemplate.id === undefined ? true : false}>Add Document Codes</Button>
        ),
        render: (record) => (
          <span>
            <Button icon="delete" onClick={() => this.handleDeleteDocumentCode(record)}>Remove</Button> 
          </span>
        )
      }
    ]
    return (
      <Table
        columns={documentCodeColumns}
        dataSource={this.state.packageTemplateItems}
        rowKey="id"
        pagination={{ pageSize: 6 }}/>
    )
  }

  renderAddDocumentCodes() {
    const addDocumentCodesColumns = [
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
        <h2>Select Document Codes to add to Package Template</h2>
        <RecordSelector
          searchField='code'
          searchText="Search by document code"
          columns={addDocumentCodesColumns}
          dataSource={this.state.nonAssignedDocumentCodes}
          targetDataSource={this.state.addDocumentCodes}
          onChange={this.handleAddDocumentCodesChange}
          pagination={{pageSize: 8}}
          size='small'
          footer={(data => 
            <TableFooter>
              <Button 
                type="primary"
                onClick={this.handleUpdatePackageTemplateItems.bind(this)}
                disabled={this.state.addDocumentCodes.length === 0}>
                Update package template
              </Button>
              <Button onClick={this.toggleAddDocumentCodes.bind(this)}>Cancel</Button>
            </TableFooter>
          )}
        />
      </div>
    )
  }

  render() {
    const navigationTable = {
      dataSource: this.state.packageTemplates,
      columns: this.columns
    }
    return (
      <CRUDHelper 
        form={this.props.form}
        header="Package Template Maintenance"
        fields={this.fields}
        rowKey="id"
        searchText="Search by Package Template name..."
        path={this.props.location.pathname}
        currentRecord={this.state.packageTemplate}
        navigationTable={navigationTable}
        sideMessage={this.state.tableMessage}
        bodyMessage={this.state.formMessage}
        search={this.state.search}
        filter={this.state.filter}
        onSelect={this.handleSelect}
        side={(
          <SelectLibrary placeholder="Select reference library" onChange={this.selectLibrary}>
            {this.state.libraries.map(l => <Option value={l.id} key={l.id}>{l.name}</Option>)}
          </SelectLibrary>
        )}
        params={this.props.match.params}>
        {this.renderForm()}
        {this.state.addDocumentCodesMode ? this.renderAddDocumentCodes() : this.renderDocumentCodes()}
      </CRUDHelper>
    )
  }
}

PackageTemplates = Form.create()(PackageTemplates);

export default PackageTemplates