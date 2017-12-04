import { FETCH_PROJECT, FETCH_PROJECTS, CREATE_PROJECT, DELETE_PROJECT, NEW_PROJECT, UPDATE_PROJECT } from '../actions/projects';

const DEFAULT_PROJECT = { id: 0, name: "", osProject: "", email: ""};
const INITIAL_STATE = { all: [], project: DEFAULT_PROJECT};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case NEW_PROJECT:
      return { ...state, project: DEFAULT_PROJECT };
    case FETCH_PROJECTS:
      return { ...state, all: action.payload.data };
    case FETCH_PROJECT:
      return { ...state, project: action.payload.data };
    case CREATE_PROJECT:
      console.log('CREATE_PROJECT Reducer', action)
      if (action.error) {
        return { ...state,
          error: action.error
        }
      } else {
        return { 
          ...state,
          all: [ ...state.all, action.payload.data ],
          project: action.payload.data,
        }
      }
    case UPDATE_PROJECT:
      console.log('UPDATE_PROJECT Reducer', action)  
      return { 
        ...state,
        all: state.all.map(project => project.id === action.payload.data.id ?
          // replace existing project record that just got updated
          action.payload.data :
          // leave all other records as they where
          project
        ),
        project: action.payload.data 
      }
    case DELETE_PROJECT:
      return { 
        ...state,
        all: state.all.filter(x => x.id !== action.payload.data.id),
        project: DEFAULT_PROJECT 
      };
    default:
      return state;
  }
}