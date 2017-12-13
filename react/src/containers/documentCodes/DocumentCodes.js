import React, {
  Component
} from 'react'
import {
  Form,
  Input,
  Select,
  Table,
  message
} from 'antd'
import _ from 'lodash'
import FormHelper, {
  defaultFormItemLayout
} from '../../components/FormHelper'
import CRUDHelper from '../../components/CRUDHelper'
import BreadcrumbLink from '../../components/BreadcrumbLink'
import {
  fetchDocumentCodes,
  fetchDocumentCode,
  createDocumentCode,
  updateDocumentCode,
  deleteDocumentCode
} from './api'

const FormItem = Form.Item
const Option = Select.Option

class DocumentCodes extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
        sorter: (a, b) => a.code.length - b.code.length,
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        sorter: (a, b) => a.description.length - b.description.length,
      }
    ]
    this.fields = ['code', 'description', 'level']
  }

  state = {
    flatDocumentCodes: [],
    documentCodes: [],
    documentCode: {},
    children: [],
    tableMessage: 'Loading Document Codes...',
    formMessage: null,
  }

  componentWillMount() {
    // load inital record if one is specified in the params
    if (this.props.match.params.id) this.selectDocumentCode(this.props.match.params.id)
    // populate documentCode tables
    fetchDocumentCodes()
      .then(res => {
        console.log('fetchDocumentCodes', res.data)
        let documentCodes = this.buildDataSet(res.data)
        console.log('documentCodes', documentCodes)
        this.setState({
          flatDocumentCodes: res.data,
          documentCodes,
          tableMessage: null
        })
      })
      .catch(err => {
        this.setState({tableMessage: null})
        console.error(err)
      })
  }

  buildDataSet = (documentCodes) => {
    _(documentCodes).forEach(f => {
      f.children = _(documentCodes).filter(g => g.parentId === f.id).value()
    })
    let data = _(documentCodes).filter(f => f.parentId === 0).value()
    return data
  }

  selectDocumentCode = (id) => {
    this.setState({formMessage: 'Loading Document Code details...'})
    fetchDocumentCode(id)
      .then(res => {
        let documentCode = res.data
        let children = this.state.flatDocumentCodes.filter(d => d.parentId === documentCode.id)
        this.setState({
          documentCode,
          children,
          formMessage: null
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
      this.selectDocumentCode(record.id)
    } else {
      if (record.id !== this.state.documentCode.id) {
        message.error(`Changes exist. Either save or clear these changes before navigating away from this record`)
      }
    }
  }

  handleSubmit(data, fields, mode) {
    if (mode === 'update') {
      this.setState({
          documentCode: data, 
          documentCodes: this.state.documentCodes.map(s => s.id === data.id ? data : s)
        })
    } else if (mode === 'insert'){
      let flatDocumentCodes = [ ...this.state.flatDocumentCodes, data ]
      this.setState({
        flatDocumentCodes,
        documentCodes: this.buildDataSet(flatDocumentCodes),
        documentCode: data
      })
    } else if (mode === 'delete') {
      this.setState({
        documentCode: {},
        documentCodes: this.state.documentCodes.filter(x => x.id !== data.id),
        projects: []
      })
      
    } else if (mode === 'new') {
      this.setState({
        documentCode: {},
        projects: []
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
        onDelete={deleteDocumentCode}
        onInsert={createDocumentCode}
        onUpdate={updateDocumentCode}
        onProgress={this.handleProgress}
        record={this.state.documentCode}>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <FormItem
            {...defaultFormItemLayout}
            label="Code:">
            {getFieldDecorator('code', {
              initialValue: this.state.documentCode.code,
              rules: [{ 
                required: true, 
                message: 'Please input a Document Code!', 
                whitespace: true }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...defaultFormItemLayout}
            label="Description:">
            {getFieldDecorator('description', {
              initialValue: this.state.documentCode.description,
              rules: [{ 
                required: true, 
                message: 'Please input a Document Code description!', 
                whitespace: true }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...defaultFormItemLayout}
            label="Parent:">
            {getFieldDecorator('parentId', {
              initialValue: this.state.documentCode.parentId,
              rules: [{ 
                required: true, 
                message: 'Please input a Parent Document Code!', 
              }],
            })(
              <Select placeholder="Select parent document code">
                <Option value={0} key={0}>No parent</Option>
                {this.state.documentCodes.map(s => s.parentId === 0 ? <Option value={s.id} key={s.id}>{s.code} - {s.description}</Option> : null)}
              </Select>
            )}
          </FormItem>
        </Form>
      </FormHelper>
    )
  }

  render() {
    let documentCodesColumn = [
      {
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
        sorter: (a, b) => a.code.length - b.code.length,
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        sorter: (a, b) => a.description.length - b.description.length,
      },
      {
        key: 'action',
        render: (text, record) => (
          <span>
            <BreadcrumbLink 
              from={`/documentcodes/${this.state.documentCode.id}`} 
              to={`/documentcodes/${record.id}`}
              description={this.state.documentCode.code} />
          </span>
        )
      }
    ]
    const navigationTable = {
      dataSource: this.state.documentCodes,
      columns: this.columns
    }
    return (
      <CRUDHelper 
        form={this.props.form}
        header="Document Code Maintenance"
        fields={this.fields}
        rowKey="id"
        searchField="code"
        searchText="Search by Document Code..."
        path={this.props.location.pathname}
        currentRecord={this.state.documentCode}
        navigationTable={navigationTable}
        sideMessage={this.state.tableMessage}
        bodyMessage={this.state.formMessage}
        search={this.state.search}
        filter={this.state.filter}
        onSelect={this.handleSelect}
        params={this.props.match.params}>
        {this.renderForm()}
        <Table
          columns={documentCodesColumn}
          dataSource={this.state.children}
          rowKey="id"
          pagination={{ pageSize: 5 }}/>
      </CRUDHelper>
    )
  }
}

DocumentCodes = Form.create()(DocumentCodes);

export default DocumentCodes