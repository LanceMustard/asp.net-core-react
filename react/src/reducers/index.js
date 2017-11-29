import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import EmployeesReducer from './employees';

const rootReducer = combineReducers({
  employees: EmployeesReducer,
  form: formReducer
});

export default rootReducer;