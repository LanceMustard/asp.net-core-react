import axios from 'axios'
import { ROOT_URL } from './environment'
export const FETCH_EMPLOYEES = 'FETCH_EMPLOYEES'
export const CREATE_EMPLOYEE = 'CREATE_EMPLOYEE'
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE'
export const FETCH_EMPLOYEE = 'FETCH_EMPLOYEE'
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE'
export const NEW_EMPLOYEE = 'NEW_EMPLOYEE'

// const ROOT_URL = 'http://localhost:53579/';
const EMPLOYEES_API = 'api/Employees';

export function fetchEmployees() {
  const request = axios.get(`${ROOT_URL}${EMPLOYEES_API}`)
  return {
    type: FETCH_EMPLOYEES,
    payload: request
  };
}

export function createEmployee(props) {
  console.log('createEmployee', JSON.stringify(props));
  const request = axios.post(`${ROOT_URL}${EMPLOYEES_API}`, props);
  return {
    type: CREATE_EMPLOYEE,
    payload: request
  }
}

export function updateEmployee(props) {
  const request = axios.put(`${ROOT_URL}${EMPLOYEES_API}/${props.id}`, props);
  return {
    type: UPDATE_EMPLOYEE,
    payload: request
  }
}

export function fetchEmployee(id) {
  const request = axios.get(`${ROOT_URL}${EMPLOYEES_API}/${id}`);
  return {
    type: FETCH_EMPLOYEE,
    payload: request
  }
}

export function deleteEmployee(id) {
  const request = axios.delete(`${ROOT_URL}${EMPLOYEES_API}/${id}`);
  return {
    type: DELETE_EMPLOYEE,
    payload: request
  }
}

export function newEmployee(id) {
  // returns default employee record
  const request = axios.get(`${ROOT_URL}${EMPLOYEES_API}/0`);
  return {
    type: NEW_EMPLOYEE,
    payload: request
  }
}
