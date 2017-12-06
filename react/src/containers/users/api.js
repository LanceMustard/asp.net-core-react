import axios from 'axios'

import { ROOT_URL } from '../../actions/environment'

const API = 'api/Users';

export function fetchUsers() {
  const request = axios.get(`${ROOT_URL}${API}`)
  return request
}

export function fetchUser(id) {
  const request = axios.get(`${ROOT_URL}${API}/${id}`)
  return request
}

export function createUser(props) {
  const request = axios.post(`${ROOT_URL}${API}`, props)
  return request
}

export function updateUser(props) {
  const request = axios.put(`${ROOT_URL}${API}/${props.id}`, props)
  return request
}

export function deleteUser(id) {
  const request = axios.delete(`${ROOT_URL}${API}/${id}`)
  return request
}