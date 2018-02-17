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

export function fetchPackageTemplatesByLibrary(id) {
  const request = axios.get(`${ROOT_URL}api/Library/PackageTemplates/${id}`)
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

// Package template items

const ItemsApi = 'api/PackageTemplateItems'

export function fetchPackageTemplateItems(id) {
  // const request = axios.get(`${ROOT_URL}api/packageTemplate/documentCodes/${id}`)
  const request = axios.get(`${ROOT_URL}${ItemsApi}/${id}`)
  return request
}

export function deletePackageTemplateItem(id) {
  const request = axios.delete(`${ROOT_URL}${ItemsApi}/${id}`)
  return request
}

export function createPackageTemplateItems(id, props) {
  const request = axios.post(`${ROOT_URL}${ItemsApi}/${id}`, props)
  return request
}