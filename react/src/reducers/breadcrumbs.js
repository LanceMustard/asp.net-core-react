import { ADD_BREADCRUMB, REMOVE_BREADCRUMB } from '../actions/breadcrumbs';

const INITIAL_STATE = { links: [] };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ADD_BREADCRUMB:
      return { 
        ...state, 
        links: [ ...state.links, action.payload ] 
      };
    case REMOVE_BREADCRUMB:
      // find the a link that matches the payload (path)
      // exclude this link and all proceeding links from the state
      let removeRemaining = false
      let links = []
      for (var i = 0; i < state.links.length; i++) {
        if (state.links[i].path !== action.payload && !removeRemaining) {
          links.push(state.links[i])
        } else removeRemaining = true
      }
      return {
        ...state,
        links
      };
    default:
      return state;
  }
}