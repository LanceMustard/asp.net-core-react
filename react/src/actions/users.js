import axios from 'axios';

export const FETCH_USER = 'FETCH_USER';
export const CREATE_USER = 'CREATE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const FETCH_USERS = 'FETCH_USERS';
export const DELETE_USER = 'DELETE_USER';
export const NEW_USER = 'NEW_USER';

// const ROOT_URL = 'http://localhost:53579/';
const ROOT_URL = 'http://localhost:53579/';
const USERS_API = 'api/Users';

export function fetchUsers() {
  const request = axios.get(`${ROOT_URL}${USERS_API}`)
  return {
    type: FETCH_USERS,
    payload: request
  };
}

export function createUser(props) {
  const request = axios.post(`${ROOT_URL}${USERS_API}`, props);
  return {
    type: CREATE_USER,
    payload: request
  }
}

export function updateUser(props) {
  const request = axios.put(`${ROOT_URL}${USERS_API}/${props.id}`, props);
  return {
    type: UPDATE_USER,
    payload: request
  }
}

export function fetchUser(id) {
  const request = axios.get(`${ROOT_URL}${USERS_API}/${id}`);
  return {
    type: FETCH_USER,
    payload: request
  }
}

export function deleteUser(id) {
  const request = axios.delete(`${ROOT_URL}${USERS_API}/${id}`);
  return {
    type: DELETE_USER,
    payload: request
  }
}

export function newUser(id) {
  return {
    type: NEW_USER
  }
}
