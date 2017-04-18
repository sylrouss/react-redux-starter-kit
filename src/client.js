import React from 'react'
import ReactDOM from 'react-dom'
import createHistory from 'history/createBrowserHistory'
import Root from './containers/App/Root'
import createStore from './redux/createStore'

const initialState = window.___INITIAL_STATE__
const history = createHistory()
const store = createStore(initialState, history)

if (__DEBUG__ && window.devToolsExtension) {
  window.devToolsExtension.open()
}

const onUpdate = () => {
  console.log('coucou !')
}

let render = () => {
  ReactDOM.render(
    <Root history={ history } onUpdate={ onUpdate } store={ store } />,
    document.getElementById('root')
  )
}

if (__DEV__ && module.hot) {
  const renderApp = render
  const renderError = (error) => {
    const RedBox = require('redbox-react')
    ReactDOM.render(<RedBox error={ error } />, document.getElementById('root'))
  }
  render = () => {
    try {
      renderApp(Math.random())
    } catch (error) {
      renderError(error)
    }
  }
}

render()
