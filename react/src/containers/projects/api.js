import axios from 'axios'

import { ROOT_URL } from '../../actions/environment'

const API = 'api/Projects';

export function fetchProjects() {
  const request = axios.get(`${ROOT_URL}${API}`)
  return request
}

export function fetchProject(id) {
  const request = axios.get(`${ROOT_URL}${API}/${id}`)
  return request
}

export function fetchProjectOrders(id) {
  const request = axios.get(`${ROOT_URL}api/Project/Orders/${id}`)
  return request
}

export function createProject(props) {
  const request = axios.post(`${ROOT_URL}${API}`, props)
  return request
}

export function updateProject(props) {
  const request = axios.put(`${ROOT_URL}${API}/${props.id}`, props)
  return request
}

export function deleteProject(id) {
  const request = axios.delete(`${ROOT_URL}${API}/${id}`)
  return request
}