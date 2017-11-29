import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmployeeTable from './EmployeeTable';
import EmployeeForm from './EmployeeForm';
import { fetchEmployee, fetchEmployees, createEmployee, deleteEmployee, newEmployee, updateEmployee } from '../../actions/employees';
import './../../styles/site.css';

class Employees extends Component {
  constructor(props) {
    super(props);

    this.submitEmployee = this.submitEmployee.bind(this);
  }
  componentWillMount() {
    this.props.fetchEmployees();
  }

  submitEmployee(values) {
    if (values.mode === 'delete') {
      this.props.deleteEmployee(values.id);
    } else if (values.mode === 'new') {
      this.props.newEmployee();
    } else {
      if (values.id === 0) {
        this.props.createEmployee(values);
      } else {
        this.props.updateEmployee(values);
      }
    }
  }

  render() {
    return (
      <div>
        <aside>
          <EmployeeTable
            employees={this.props.employees.all}
            selected={this.props.employees.employee}
            onSelect={this.props.fetchEmployee}/>
        </aside>
        <section>
        <EmployeeForm
          employee={this.props.employees.employee}
          onSubmit={this.submitEmployee}/>
        </section>
      </div>
    );
  }
}

function mapStateToProps({ employees }) {
  return { employees };
}

export default connect(mapStateToProps,
  { fetchEmployee,
    fetchEmployees,
    createEmployee,
    deleteEmployee,
    newEmployee,
    updateEmployee
   })(Employees);
