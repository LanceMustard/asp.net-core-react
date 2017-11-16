import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './../resources/logo.svg';
import EmployeeTable from './EmployeeTable';
import EmployeeForm from './EmployeeForm';
import { fetchEmployee, fetchEmployees, createEmployee, deleteEmployee, newEmployee, updateEmployee } from '../actions/index';
import './../styles/site.css';

class App extends Component {
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
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Lance Mustard - Coding Challenge</h1>
          <p>Basic employee maintenance screen example.</p>
          <p>Backend WebAPI’s written using C# with .NET Core and Entity Framework (UseInMemoryDatabase)</p>
          <p>Frontend written in React making use of Redux, axios and styled-components</p>
        </header>
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
   })(App);
