import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import EmployeesReducer from './employees';
import UsersReducer from './users';

const rootReducer = combineReducers({
  employees: EmployeesReducer,
  users: UsersReducer,
  form: formReducer
});

export default rootReducer;