import axios from 'axios'

import { ROOT_URL } from '../../actions/environment'

const API = 'api/Clients';

export function fetchClients() {
  const request = axios.get(`${ROOT_URL}${API}`)
  return request
}

export function fetchClient(id) {
  const request = axios.get(`${ROOT_URL}${API}/${id}`)
  return request
}

export function createClient(props) {
  const request = axios.post(`${ROOT_URL}${API}`, props)
  return request
}

export function updateClient(props) {
  const request = axios.put(`${ROOT_URL}${API}/${props.id}`, props)
  return request
}

export function deleteClient(id) {
  const request = axios.delete(`${ROOT_URL}${API}/${id}`)
  return request
}