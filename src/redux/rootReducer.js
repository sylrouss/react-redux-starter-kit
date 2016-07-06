import { combineReducers } from 'redux'
import { routeReducer as router } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import ApplicationReducers from '../Application/ApplicationReducers'

const reducers = {
  router,
  form: formReducer,
}

export default combineReducers(Object.assign({}, reducers, ApplicationReducers))
