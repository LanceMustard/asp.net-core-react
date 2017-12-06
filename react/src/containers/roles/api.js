import axios from 'axios'

import { ROOT_URL } from '../../actions/environment'

const API = 'api/Roles';

export function fetchRoles() {
  const request = axios.get(`${ROOT_URL}${API}`)
  return request
}

export function fetchRole(id) {
  const request = axios.get(`${ROOT_URL}${API}/${id}`)
  return request
}

export function createRole(props) {
  const request = axios.post(`${ROOT_URL}${API}`, props)
  return request
}

export function updateRole(props) {
  const request = axios.put(`${ROOT_URL}${API}/${props.id}`, props)
  return request
}

export function deleteRole(id) {
  const request = axios.delete(`${ROOT_URL}${API}/${id}`)
  return request
}