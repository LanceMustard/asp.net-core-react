import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import EmployeesReducer from './employees';
import UsersReducer from './users';
import ProjectsReducer from './projects';

const rootReducer = combineReducers({
  employees: EmployeesReducer,
  users: UsersReducer,
  projects: ProjectsReducer,
  form: formReducer
});

export default rootReducer;