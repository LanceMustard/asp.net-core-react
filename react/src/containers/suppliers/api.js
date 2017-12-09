import axios from 'axios'

import { ROOT_URL } from '../../actions/environment'

const API = 'api/Suppliers';

export function fetchSuppliers() {
  const request = axios.get(`${ROOT_URL}${API}`)
  return request
}

export function fetchSupplier(id) {
  const request = axios.get(`${ROOT_URL}${API}/${id}`)
  return request
}

export function fetchSupplierOrders(id) {
  const request = axios.get(`${ROOT_URL}api/Supplier/Orders/${id}`)
  return request
}

export function createSupplier(props) {
  const request = axios.post(`${ROOT_URL}${API}`, props)
  return request
}

export function updateSupplier(props) {
  const request = axios.put(`${ROOT_URL}${API}/${props.id}`, props)
  return request
}

export function deleteSupplier(id) {
  const request = axios.delete(`${ROOT_URL}${API}/${id}`)
  return request
}