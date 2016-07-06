import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import App from 'Application/components/App/App'
import NotFound from 'Application/components/Errors/404/NotFound'
import Unsplash from 'Application/containers/UnsplashContainer/Unsplash'
import UnsplashDetail from 'Application/containers/UnsplashContainer/UnsplashDetail'

export default (store) => (
  <Route path='/' component={App}>
    <IndexRoute component={Unsplash} />
    <Route path='detail/:id' component={UnsplashDetail} />
    <Route path='/404' component={NotFound} />
    <Redirect from='*' to='/404' />
  </Route>
)
