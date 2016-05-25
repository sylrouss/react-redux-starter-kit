import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import App from 'components/App/App'
import NotFound from 'containers/NotFound'
import SignUp from 'containers/SignUp'

export default (store) => (
  <Route path='/' component={App}>
    <IndexRoute component={SignUp} />
    <Route path='/404' component={NotFound} />
    <Redirect from='*' to='/404' />
  </Route>
)
