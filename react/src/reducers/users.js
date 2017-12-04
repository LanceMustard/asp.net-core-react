import { FETCH_USER, FETCH_USERS, CREATE_USER, DELETE_USER, NEW_USER, UPDATE_USER } from '../actions/users';

const DEFAULT_USER = { id: 0, name: "", osUser: "", email: ""};
const INITIAL_STATE = { all: [], user: DEFAULT_USER};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case NEW_USER:
      return { ...state, user: DEFAULT_USER };
    case FETCH_USERS:
      return { ...state, all: action.payload.data };
    case FETCH_USER:
      return { ...state, user: action.payload.data };
    case CREATE_USER:
      console.log('CREATE_USER Reducer', action)
      if (action.error) {
        return { ...state,
          error: action.error
        }
      } else {
        return { 
          ...state,
          all: [ ...state.all, action.payload.data ],
          user: action.payload.data,
        }
      }
    case UPDATE_USER:
      console.log('UPDATE_USER Reducer', action)  
      return { 
        ...state,
        all: state.all.map(user => user.id === action.payload.data.id ?
          // replace existing user record that just got updated
          action.payload.data :
          // leave all other records as they where
          user
        ),
        user: action.payload.data 
      }
    case DELETE_USER:
      return { 
        ...state,
        all: state.all.filter(x => x.id !== action.payload.data.id),
        user: DEFAULT_USER 
      };
    default:
      return state;
  }
}