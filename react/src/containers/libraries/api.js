import axios from 'axios'

import { ROOT_URL } from '../../actions/environment'

const API = 'api/Libraries';

export function fetchLibraries() {
  const request = axios.get(`${ROOT_URL}${API}`)
  return request
}

export function fetchLibrary(id) {
  const request = axios.get(`${ROOT_URL}${API}/${id}`)
  return request
}

export function createLibrary(props) {
  const request = axios.post(`${ROOT_URL}${API}`, props)
  return request
}

export function updateLibrary(props) {
  const request = axios.put(`${ROOT_URL}${API}/${props.id}`, props)
  return request
}

export function deleteLibrary(id) {
  const request = axios.delete(`${ROOT_URL}${API}/${id}`)
  return request
}