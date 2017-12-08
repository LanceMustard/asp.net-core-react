import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import UsersReducer from './users'
import BreadcrumbReducer from './breadcrumbs'

const rootReducer = combineReducers({
  users: UsersReducer,
  breadcrumbs: BreadcrumbReducer,
  form: formReducer
});

export default rootReducer;