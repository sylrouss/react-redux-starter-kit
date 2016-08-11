import React from 'react'
import App from 'containers/App/App'
import { Provider } from 'react-redux'
import { createMockStore, mount } from '../../testHelpers'

describe('(containers) App', () => {
  it('should render as a <div>.', () => {
    let props = { children: <h1 className='child'>Child</h1> }
    let container = mount(<Provider store={ createMockStore() }><App { ...props } /></Provider>)
    expect(container.find('div')).not.to.be.undefined
  })
})
