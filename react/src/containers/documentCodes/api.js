import axios from 'axios'

import { ROOT_URL } from '../../actions/environment'

const API = 'api/DocumentCodes';

export function fetchDocumentCodes() {
  const request = axios.get(`${ROOT_URL}${API}`)
  return request
}

export function fetchDocumentCodesByLibrary(id) {
  const request = axios.get(`${ROOT_URL}api/Library/DocumentCodes/${id}`)
  return request
}

export function fetchDocumentCode(id) {
  const request = axios.get(`${ROOT_URL}${API}/${id}`)
  return request
}

export function createDocumentCode(props) {
  const request = axios.post(`${ROOT_URL}${API}`, props)
  return request
}

export function updateDocumentCode(props) {
  const request = axios.put(`${ROOT_URL}${API}/${props.id}`, props)
  return request
}

export function deleteDocumentCode(id) {
  const request = axios.delete(`${ROOT_URL}${API}/${id}`)
  return request
}