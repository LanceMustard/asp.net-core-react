import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import '../../styles/site.css'
import {
  SelectField,
  TextField,
} from 'redux-form-antd'
import {
  Table,
  Icon,
  Popconfirm,
  Tooltip,
  Layout,
  Form,
  Input,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  message
} from 'antd'
import { fetchProject, fetchProjects, createProject, deleteProject, newProject, updateProject } from '../../actions/projects';
import TableButton from './../../components/TableButton.js'
import { Header, Wrapper, Side, Body } from '../../components/Layout'
import FormToolbar, { handleFormSubmit, required, email } from '../../components/FormHelper'
const { Content, Sider } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

// const SelectedRow =  {background: 'green'};

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

  componentWillMount() {
    this.props.fetchProjects()
  }

  rowSelected(record, index, event) {
    if (this.props.pristine)
    {
      console.log(this)
      console.log(this.props.onSelectRecord)
      this.props.fetchProject(record.id)
    } else {
      if (record.id !== this.props.projects.project.id) {
        message.error(`Changes exist. Either save or clear these changes before navigating away from this record`)
      }
    }
  }

  renderForm() {
    const { handleSubmit, pristine, reset, submitting } = this.props
    return (
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <FormToolbar 
          handleSubmit={handleSubmit}
          pristine={pristine}
          reset={reset}
          submitting={submitting}
          onSubmit={handleFormSubmit}
          newRecord={this.props.newProject}
          createRecord={this.props.createProject}
          updateRecord={this.props.updateProject}
          deleteRecord={this.props.deleteProject}
          />
        <Field 
          label="Project name" 
          name="name" 
          component={TextField} 
          validate={[ required ]} />
      </Form>
    )
  }

  rowClassName(record, index) {
    return record.id === this.props.projects.project.id ? 'SelectedRow'  : null;
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
              dataSource={this.props.projects.all}
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

Projects = reduxForm({
  form: 'projectForm',
  enableReinitialize: true,
  onSelectRecord: fetchProject
})(Projects);

Projects = connect(
  state => ({
    initialValues: state.projects.project
  })
)(Projects)

function mapStateToProps({ projects }) {
  return { projects }
}

export default connect(mapStateToProps,
  { fetchProject,
    fetchProjects,
    createProject,
    deleteProject,
    newProject,
    updateProject
   })(Projects)