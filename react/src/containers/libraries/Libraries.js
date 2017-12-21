import React, {
  Component
} from 'react'
import {
  Form,
  Input,
  message
} from 'antd'
import FormToolbar, {
  defaultFormItemLayout
} from '../../components/FormHelper'
import CRUDHelper from '../../components/CRUDHelper'
import {
  fetchLibraries,
  fetchLibrary,
  createLibrary,
  updateLibrary,
  deleteLibrary
} from './api'

const FormItem = Form.Item;

class Librarys extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
      } 
    ]
    this.fields = ['name',]
  }

  state = {
    libraries: [],
    library: {}
  }

  componentWillMount() {
    fetchLibraries()
      .then(res => this.setState({ libraries: res.data }) )
      .catch(err => message.error(err))
  }

  selectLibrary = (id) => {
    fetchLibrary(id)
    .then(res => this.setState({ 
      library: res.data,
      formMessage: null
    }) )
    .catch(err => message.error(err))
  }

  handleSelect = (record, index, event) => {
    if (!this.props.form.isFieldsTouched([this.fields]))
    {
      this.selectLibrary(record.id)
    } else {
      if (record.id !== this.state.library.id) {
        message.error(`Changes exist. Either save or clear these changes before navigating away from this record`)
      }
    }
  }

  handleSubmit = (data, fields, mode) => {
    if (mode === 'update') {
      this.setState({
          library: data, 
          libraries: this.state.libraries.map(s => s.id === data.id ? data : s)
        })
    } else if (mode === 'insert'){
      this.setState({
        library: data, 
        libraries: [ ...this.state.libraries, data ]
      })
    } else if (mode === 'delete') {
      this.setState({
        library: {},
        libraries: this.state.libraries.filter(x => x.id !== data.id),
      })
      
    } else if (mode === 'new') {
      this.setState({library: {}})
    }
  }

  handleProress(message) {
    this.setState({spinMessage: message})
  }

  renderForm() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <FormToolbar 
          onSubmit={this.handleSubmit.bind(this)}
          onDelete={deleteLibrary}
          onInsert={createLibrary}
          onUpdate={updateLibrary}
          form={this.props.form}
          record={this.state.library}
          fields={this.fields}/>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <FormItem
            {...defaultFormItemLayout}
            label="Name:">
            {getFieldDecorator('name', {
              initialValue: this.state.library.name,
              rules: [{ 
                required: true, 
                message: 'Please input a reference library name!', 
                whitespace: true }],
            })(
              <Input />
            )}
          </FormItem>
        </Form>
      </div>
    )
  }

  render() {
    const navigationTable = {
      dataSource: this.state.libraries,
      columns: this.columns
    }
    return (
      <CRUDHelper 
        form={this.props.form}
        header="Reference Library Maintenance"
        fields={this.fields}
        rowKey="id"
        searchText="Search by library name..."
        searchField="name"
        path={this.props.location.pathname}
        currentRecord={this.state.library}
        navigationTable={navigationTable}
        sideMessage={this.state.tableMessage}
        bodyMessage={this.state.formMessage}
        search={this.state.search}
        filter={this.state.filter}
        onSelect={this.handleSelect}
        params={this.props.match.params}>
        {this.renderForm()}
      </CRUDHelper>
    );
  }
}

Librarys = Form.create()(Librarys);
export default Librarys