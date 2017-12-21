import React, {
  Component
} from 'react'
import {
  Form,
  Input,
  Select,
  Table
} from 'antd'
import styled from 'styled-components'
import FormHelper, {
  defaultFormItemLayout
} from '../../components/FormHelper'
import BreadcrumbLink from '../../components/BreadcrumbLink'
import CRUDHelper from '../../components/CRUDHelper'
import {
  fetchPackageTemplates,
  fetchPackageTemplate,
  fetchPackageTemplateDocumentCodes,
  fetchPackageTemplatesByLibrary,
  createPackageTemplate,
  updatePackageTemplate,
  deletePackageTemplate
} from './api'
import { fetchLibraries } from 'containers/libraries/api'
import { debug } from 'components/debug'

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
    this.documentCodeColumns = [
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
        render: (text, record) => (
          <span>
            <BreadcrumbLink 
              from={`/packagetempletes/${this.state.packageTemplate.id}`} 
              to={`/documentCodes/${record.documentCode.id}`}
              description={this.state.packageTemplate.name} />
          </span>
        )
      }
    ]
    this.fields = ['name']
  }

  state = {
    packageTemplates: [],
    packageTemplate: {},
    documentCodes: [],
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
    // populate packageTemplate tables
    fetchPackageTemplatesByLibrary(id)
    .then(res => {
      this.setState({
        packageTemplates: res.data,
        packageTemplate: {},
        documentCodes: [],
        tableMessage: null
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
      fetchPackageTemplateDocumentCodes(id)
      .then(res => {
        console.log('fetchPackageTemplateDocumentCodes', res.data)
        this.setState({
          packageTemplate,
          documentCodes: res.data,
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
        documentCodes: []
      })
      
    } else if (mode === 'new') {
      this.setState({
        packageTemplate: {},
        documentCodes: []
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
        onDelete={deletePackageTemplate}
        onInsert={createPackageTemplate}
        onUpdate={updatePackageTemplate}
        onProgress={this.handleProgress}
        record={this.state.packageTemplate}>
        <Form onSubmit={this.handleSubmit.bind(this)}>
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
        <Table
            columns={this.documentCodeColumns}
            dataSource={this.state.documentCodes}
            rowKey="id"
            pagination={{ pageSize: 6 }}/>
      </CRUDHelper>
    )
  }
}

PackageTemplates = Form.create()(PackageTemplates);

export default PackageTemplates