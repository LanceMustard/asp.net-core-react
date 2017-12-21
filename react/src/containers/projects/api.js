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

// export function fetchProjectUsers(id) {
//   const request = axios.get(`${ROOT_URL}api/Project/Users/${id}`)
//   return request
// }

export function createProject(props) {
  const request = axios.post(`${ROOT_URL}${API}`, props)
  return request
}

export function updateProject(props) {
  const request = axios.put(`${ROOT_URL}${API}/${props.id}`, props)
  return request
}

// export function updateProjectUsers(id, users) {
//   const request = axios.post(`${ROOT_URL}api/Project/Users/${id}`, users)
//   return request
// }

export function deleteProject(id) {
  const request = axios.delete(`${ROOT_URL}${API}/${id}`)
  
  return request
}

// ProjectUsers

const projectUserApi = 'api/ProjectUsers'

export function fetchProjectUsers(id) {
  const request = axios.get(`${ROOT_URL}${projectUserApi}/${id}`)
  return request
}

export function createProjectUser(props) {
  const request = axios.post(`${ROOT_URL}${projectUserApi}`, props)
  return request
}

export function deleteProjectUser(id) {
  const request = axios.delete(`${ROOT_URL}${projectUserApi}/${id}`)
  return request
}

export function updateProjectUser(props) {
  const request = axios.put(`${ROOT_URL}${projectUserApi}/${props.id}`, props)
  return request
}