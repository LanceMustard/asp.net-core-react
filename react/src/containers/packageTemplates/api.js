import axios from 'axios'

import { ROOT_URL } from '../../actions/environment'

const API = 'api/PackageTemplates';

export function fetchPackageTemplates() {
  const request = axios.get(`${ROOT_URL}${API}`)
  return request
}

export function fetchPackageTemplate(id) {
  const request = axios.get(`${ROOT_URL}${API}/${id}`)
  return request
}

export function fetchPackageTemplateDocumentCodes(id) {
  const request = axios.get(`${ROOT_URL}api/packageTemplate/documentCodes/${id}`)
  return request
}

export function createPackageTemplate(props) {
  const request = axios.post(`${ROOT_URL}${API}`, props)
  return request
}

export function updatePackageTemplate(props) {
  const request = axios.put(`${ROOT_URL}${API}/${props.id}`, props)
  return request
}

export function deletePackageTemplate(id) {
  const request = axios.delete(`${ROOT_URL}${API}/${id}`)
  return request
}