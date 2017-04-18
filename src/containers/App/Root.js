import React from 'react'
import { Provider } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'

import App from 'containers/App/App'
import NotFound from 'containers/App/NotFound'
import Unsplash from 'containers/Unsplash/Unsplash'
import UnsplashDetail from 'containers/Unsplash/UnsplashDetail'

const Root = ({ history, store }) => (
  <Provider store={ store }>
    <ConnectedRouter history={ history }>
      <div style={ { height: '100%' } }>
        <App>
          <Switch>
            <Route exact path='/' component={ Unsplash } />
            <Route path='/detail' component={ UnsplashDetail } />
            <Route path='/404' component={ NotFound } />
            <Redirect from='*' to='/404' />
          </Switch>
        </App>
      </div>
    </ConnectedRouter>
  </Provider>
)

export default Root
