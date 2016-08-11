import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'

const Root = ({ history, onUpdate, routerKey, routes, store }) => (
  <Provider store={ store }>
    <div style={ { height: '100%' } }>
      <Router children={ routes } history={ history } key={ routerKey } onUpdate={ onUpdate } />
    </div>
  </Provider>
)

export default Root
