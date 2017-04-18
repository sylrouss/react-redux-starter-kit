import React from 'react'
import { IntlProvider } from 'react-intl'
import { mount as enzymeMount } from 'enzyme'
import TestUtils from 'react-addons-test-utils'

export const mount = (component) => (
  enzymeMount(
    <IntlProvider locale='en'>
      { component }
    </IntlProvider>)
)

export const renderIntoDocument = (component) => (
  TestUtils.renderIntoDocument(
    <IntlProvider locale='en'>
      { component }
    </IntlProvider>)
)

export const createMockStore = (state) => ({
  dispatch: sinon.spy(),
  getState: () => state,
  subscribe: () => sinon.spy(),
})
