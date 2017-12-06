import axios from 'axios'

import { ROOT_URL } from '../../actions/environment'

const API = 'api/Permissions';

export function fetchPermissions() {
  const request = axios.get(`${ROOT_URL}${API}`)
  return request
}

export function fetchPermission(id) {
  const request = axios.get(`${ROOT_URL}${API}/${id}`)
  return request
}

export function createPermission(props) {
  const request = axios.post(`${ROOT_URL}${API}`, props)
  return request
}

export function updatePermission(props) {
  const request = axios.put(`${ROOT_URL}${API}/${props.id}`, props)
  return request
}

export function deletePermission(id) {
  const request = axios.delete(`${ROOT_URL}${API}/${id}`)
  return request
}