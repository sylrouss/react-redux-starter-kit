import assert from 'assert'

describe('(Framework) Karma Plugins', function () {
  it('Should expose "expect" globally.', function () {
    assert.ok(expect)
  })

  it('Should expose "should" globally.', function () {
    assert.ok(should)
  })
})
