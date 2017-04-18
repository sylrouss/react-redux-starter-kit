// ---------------------------------------
// Test Environment Setup
// ---------------------------------------
import sinon from 'sinon'
import chai from 'chai'

global.chai = chai
global.sinon = sinon
global.expect = chai.expect
global.should = chai.should()

console.error = (error) => {
  if (/[React Intl]/.test(error)) {
    return
  }
  throw new Error(error)
}

// ---------------------------------------
// Require Tests
// ---------------------------------------
// require all `tests/**/*.spec.js`
const testsContext = require.context('./', true, /\.spec\.js$/)
testsContext.keys().forEach(testsContext)

// require all `src/**/*.js` except for `client.js` (for isparta coverage reporting)
const componentsContext = require.context('../src/', true, /^((?!client).)*\.js$/)

componentsContext.keys().forEach(componentsContext)
