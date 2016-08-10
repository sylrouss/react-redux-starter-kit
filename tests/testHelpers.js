import React from 'react'
import { IntlProvider } from 'react-intl'
import { mount as enzymeMount } from 'enzyme'
// import messages from '../build/lang/en.json'
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

export const createMockStore = (state) => {
  return {
    subscribe: () => sinon.spy(),
    dispatch: () => sinon.spy(),
    getState: () => state,
  }
}
