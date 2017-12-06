import React, { Component } from 'react';
import styled, { css } from 'styled-components';

// basic example of using styled-components
const EmployeeRecord = styled.button`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: transparent;
  color: palevioletred;
  border: 2px solid palevioletred;

  ${props => props.selected && css`
    background: palevioletred;
    color: white;
  `}
`

class EmployeeTable extends Component {
  renderRow(employee, idx){
    return (
      <EmployeeRecord 
        key={idx} 
        selected={employee.id === this.props.selected.id}
        onClick={() => this.props.onSelect(employee.id)}>
        {employee.name}
      </EmployeeRecord>
    );
  }
  render() {
    return (
      <ul>
        { this.props.employees.map(this.renderRow.bind(this)) }
      </ul>
    );
  }
}

export default EmployeeTable;
