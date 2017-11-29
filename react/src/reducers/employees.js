import { FETCH_EMPLOYEE, FETCH_EMPLOYEES, CREATE_EMPLOYEE, DELETE_EMPLOYEE, NEW_EMPLOYEE, UPDATE_EMPLOYEE } from '../actions/index';

const DEFAULT_EMPLOYEE = { id: 0, name: "", gender: "male"};
const INITIAL_STATE = { all: [], employee: DEFAULT_EMPLOYEE};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case NEW_EMPLOYEE:
      return { ...state, employee: DEFAULT_EMPLOYEE };
    case FETCH_EMPLOYEES:
      return { ...state, all: action.payload.data };
    case FETCH_EMPLOYEE:
      return { ...state, employee: action.payload.data };
    case CREATE_EMPLOYEE:
      return { 
        ...state,
        all: [ ...state.all, action.payload.data ],
        employee: action.payload.data 
      };
    case UPDATE_EMPLOYEE:
      console.log('Reducer', JSON.stringify(action.payload.data));
      return { 
        ...state,
        all: state.all.map(employee => employee.id === action.payload.data.id ?
          // replace existing employee record that just got updated
          action.payload.data :
          // leave all other records as they where
          employee
        ),
        employee: action.payload.data 
      };
    case DELETE_EMPLOYEE:
      console.log(JSON.stringify(action.payload.data));
      return { 
        ...state,
        all: state.all.filter(x => x.id !== action.payload.data.id),
        employee: DEFAULT_EMPLOYEE 
      };
    default:
      return state;
  }
}