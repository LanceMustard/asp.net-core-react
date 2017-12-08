import axios from 'axios'

import { ROOT_URL } from '../../actions/environment'

const API = 'api/Orders';

export function fetchOrders() {
  const request = axios.get(`${ROOT_URL}${API}`)
  return request
}

export function fetchOrder(id) {
  const request = axios.get(`${ROOT_URL}${API}/${id}`)
  return request
}

export function createOrder(props) {
  const request = axios.post(`${ROOT_URL}${API}`, props)
  return request
}

export function updateOrder(props) {
  const request = axios.put(`${ROOT_URL}${API}/${props.id}`, props)
  return request
}

export function deleteOrder(id) {
  const request = axios.delete(`${ROOT_URL}${API}/${id}`)
  return request
}