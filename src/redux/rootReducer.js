import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import unsplash from './modules/unsplash'

const rootReducer = combineReducers({
  router,
  unsplash,
})

export default rootReducer
