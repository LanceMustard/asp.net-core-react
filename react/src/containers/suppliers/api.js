import axios from 'axios'

import { ROOT_URL } from '../../actions/environment'

const API = 'api/Suppliers';

export function fetchSuppliers() {
  const request = axios.get(`${ROOT_URL}${API}`)
  // request
  //   .then(result => console.log('fetchSuppliers:', result))
  //   .catch(error => console.error('fetchSuppliers:', error))
  return request
}

export function fetchSupplier(id) {
  const request = axios.get(`${ROOT_URL}${API}/${id}`)
  // request
  //  .then(result => console.log('fetchSupplier:', result))
  //  .catch(error => console.error('fetchSupplier:', error))
 return request
}