import React from 'react'
import { browserHistory, Route } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { default as Root } from 'containers/App/Root'
import { createMockStore } from '../../testHelpers'
import { mount as enzymeMount } from 'enzyme'

const DumbComponent = () => (
  <div>Dumb Component</div>
)

describe('(containers) Root', () => {
  let _props
  before(() => {
    let store = createMockStore({
      router: {},
    })
    const history = syncHistoryWithStore(browserHistory, store, {
      selectLocationState: (state) => state.router,
    })
    _props={
      history: history,
      onUpdate: sinon.spy(),
      routerKey: {},
      routes: <Route path='/context.html' component={ DumbComponent } />,
      store: store,
    }
  })

  it('should call onUpdate when mounting root', () => {
    const wrapper = enzymeMount(<Root { ..._props } />)
    expect(location.pathname).to.equal('/context.html')
    expect(wrapper.find('Router').props().onUpdate.calledOnce).to.be.true
  })
})
