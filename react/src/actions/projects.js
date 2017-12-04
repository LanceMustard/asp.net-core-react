import axios from 'axios'

import { ROOT_URL } from './environment'

export const FETCH_PROJECT = 'FETCH_PROJECT'
export const CREATE_PROJECT = 'CREATE_PROJECT'
export const UPDATE_PROJECT = 'UPDATE_PROJECT'
export const FETCH_PROJECTS = 'FETCH_PROJECTS'
export const DELETE_PROJECT = 'DELETE_PROJECT'
export const NEW_PROJECT = 'NEW_PROJECT'

const PROJECTS_API = 'api/Projects';

export function fetchProjects() {
  const request = axios.get(`${ROOT_URL}${PROJECTS_API}`)
  return {
    type: FETCH_PROJECTS,
    payload: request
  };
}

export function createProject(props) {
  const request = axios.post(`${ROOT_URL}${PROJECTS_API}`, props);
  return {
    type: CREATE_PROJECT,
    payload: request
  }
}

export function updateProject(props) {
  const request = axios.put(`${ROOT_URL}${PROJECTS_API}/${props.id}`, props);
  return {
    type: UPDATE_PROJECT,
    payload: request
  }
}

export function fetchProject(id) {
  const request = axios.get(`${ROOT_URL}${PROJECTS_API}/${id}`);
  return {
    type: FETCH_PROJECT,
    payload: request
  }
}

export function deleteProject(id) {
  const request = axios.delete(`${ROOT_URL}${PROJECTS_API}/${id}`);
  return {
    type: DELETE_PROJECT,
    payload: request
  }
}

export function newProject(id) {
  return {
    type: NEW_PROJECT
  }
}
