import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'antd';

class EmployeeForm extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <label>Id</label>
        <div>
          <Field
            name="id"
            component="input"
            type="text"
            placeholder="System generated id"
            disabled="true"
          />
        </div>
        <label>Name</label>
        <div>
          <Field
            name="name"
            component="input"
            type="text"
            placeholder="Employee name"
          />
        </div>
        <label>Gender</label>
        <div>
          <Field name="gender" component="select">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Field>
        </div>
        <div>
          <Button type="primary" disabled={this.props.employee.id === 0 || !pristine || submitting} onClick={handleSubmit(values => this.props.onSubmit({...values, mode: 'new'}))}>
            New
          </Button>
          <Button type="submit" disabled={pristine || submitting}>
            Submit
          </Button>
          <Button type="button" disabled={pristine || submitting} onClick={reset}>
            Clear
          </Button>
          <Button type="button" disabled={this.props.employee.id === 0} onClick={handleSubmit(values => this.props.onSubmit({...values, mode: 'delete'}))}>
            Delete
          </Button>
        </div>
      </form>
    );
  }
}

EmployeeForm = reduxForm({
  form: 'employeeForm',
  enableReinitialize: true
})(EmployeeForm);


EmployeeForm = connect(
  state => ({
    initialValues: state.employees.employee
  })
)(EmployeeForm)

export default EmployeeForm;