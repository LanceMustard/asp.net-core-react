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
import { fetchUser, fetchUsers, createUser, deleteUser, newUser, updateUser } from '../../actions/users';
import TableButton from './../../components/TableButton.js'
import { Header, Wrapper, Side, Body } from '../../components/Layout'
import FormToolbar, { handleFormSubmit, required, email } from '../../components/FormHelper'
const { Content, Sider } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

// const SelectedRow =  {background: 'green'};

class Users extends Component {
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
      }, {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        filters: [
          { text: 'Admin', value: 'Admin' },
          { text: 'User', value: 'User' },
          { text: 'Read Only', value: 'Read Only' }
        ],
        onFilter: (value, record) => record.role.indexOf(value) === 0,
        sorter: (a, b) => a.role.length - b.role.length
      }
    ];
  }

  componentWillMount() {
    this.props.fetchUsers()
  }

  rowSelected(record, index, event) {
    if (this.props.pristine)
    {
      console.log(this)
      console.log(this.props.onSelectRecord)
      // this.props.onSelectRecord(record.id)
      // const { onSelectRecord} = this.props
      // onSelectRecord(record.id)
      this.props.fetchUser(record.id)
    } else {
      if (record.id !== this.props.users.user.id) {
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
          newRecord={this.props.newUser}
          createRecord={this.props.createUser}
          updateRecord={this.props.updateUser}
          deleteRecord={this.props.deleteUser}
          />
        <Field 
          label="User name" 
          name="name" 
          component={TextField} 
          validate={[ required ]} />
        <Field 
          label="Operating system user" 
          name="osUser" 
          component={TextField} 
          validate={[ required ]}/>
        <Field 
          label="Email address" 
          name="email" 
          component={TextField} 
          validate={[ email, required ]}/>
        <Field 
          label="Role" 
          name="role" 
          component={SelectField} 
          options={[
            {"label": "Administrtor", "value": "Admin"},
            {"label": "User", "value": "User"},
            {"label": "Read Only", "value": "Read Only"}
          ]}/>
      </Form>
    )
  }

  rowClassName(record, index) {
    // console.log('rowClassName', record)
    // console.log('rowClassName', index)
    return record.id === this.props.users.user.id ? 'SelectedRow'  : null;
  }

  render() {
    return (
      <div>
        <Header>
          <h1>User Maintenance</h1>
        </Header>
        <Wrapper>
          <Side>
            <Table
              columns={this.columns}
              dataSource={this.props.users.all}
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

Users = reduxForm({
  form: 'userForm',
  enableReinitialize: true,
  onSelectRecord: fetchUser
})(Users);

Users = connect(
  state => ({
    initialValues: state.users.user
  })
)(Users)

function mapStateToProps({ users }) {
  return { users }
}

export default connect(mapStateToProps,
  { fetchUser,
    fetchUsers,
    createUser,
    deleteUser,
    newUser,
    updateUser
   })(Users)