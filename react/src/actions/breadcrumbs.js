export const ADD_BREADCRUMB = 'ADD_BREADCRUMB'
export const REMOVE_BREADCRUMB = 'REMOVE_BREADCRUMB'

//!@# not really needing this logic, the path will most likely be enough
function generateUUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c === 'x' ? r : (r&0x3|0x8)).toString(16);
  });
  return uuid;
};

export function addBreadcrumb(breadcrumb) {
  breadcrumb = {...breadcrumb, uuid: generateUUID() }  
  return {
    type: ADD_BREADCRUMB,
    payload: breadcrumb
  }
}

export function removeBreadcrumb(path) {
  return {
    type: REMOVE_BREADCRUMB,
    payload: path
  }
}