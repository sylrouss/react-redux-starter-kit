import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import App from 'containers/App/App'
import NotFound from 'containers/App/NotFound'
import Unsplash from 'containers/Unsplash/Unsplash'
import UnsplashDetail from 'containers/Unsplash/UnsplashDetail'

export default (store) => (
  <Route path='/' component={ App }>
    <IndexRoute component={ Unsplash } />
    <Route path='detail/:id' component={ UnsplashDetail } />
    <Route path='/404' component={ NotFound } />
    <Redirect from='*' to='/404' />
  </Route>
)
