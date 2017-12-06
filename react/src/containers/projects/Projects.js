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
  fetchProjects,
  fetchProject,
  createProject,
  updateProject,
  deleteProject
} from './api'

const FormItem = Form.Item;

class Projects extends Component {
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
    projects: [],
    project: {}
  }

  componentWillMount() {
    fetchProjects()
      .then(res => this.setState({ projects: res.data }) )
      .catch(err => message.error(err))
  }

  rowSelected(record, index, event) {
    if (!this.props.form.isFieldsTouched(['name']))
    {
      fetchProject(record.id)
        .then(res => this.setState({ project: res.data }) )
        .catch(err => message.error(err))
    } else {
      if (record.id !== this.state.project.id) {
        message.error(`Changes exist. Either save or clear these changes before navigating away from this record`)
      }
    }
  }

  handleSubmit(data, fields, mode) {
    if (mode === 'update') {
      this.setState({
          project: data, 
          projects: this.state.projects.map(s => s.id === data.id ? data : s)
        })
    } else if (mode === 'insert'){
      this.setState({
        project: data, 
        projects: [ ...this.state.projects, data ]
      })
    } else if (mode === 'delete') {
      this.setState({
        project: {},
        projects: this.state.projects.filter(x => x.id !== data.id),
      })
      
    } else if (mode === 'new') {
      this.setState({project: {}})
    }
  }

  renderForm() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <FormToolbar 
          onSubmit={this.handleSubmit.bind(this)}
          onDelete={deleteProject}
          onInsert={createProject}
          onUpdate={updateProject}
          /* onNew={this.handleNew.bind(this)} */
          form={this.props.form}
          record={this.state.project}
          fields={['name']}/>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <FormItem
            {...defaultFormItemLayout}
            label="Name:">
            {getFieldDecorator('name', {
              initialValue: this.state.project.name,
              rules: [{ 
                required: true, 
                message: 'Please input a project name!', 
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
    return record.id === this.state.project.id ? 'SelectedRow'  : null;
  }

  render() {
    return (
      <div>
        <Header>
          <h1>Project Maintenance</h1>
        </Header>
        <Wrapper>
          <Side>
            <Table
              columns={this.columns}
              dataSource={this.state.projects}
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

Projects = Form.create()(Projects);
export default Projects