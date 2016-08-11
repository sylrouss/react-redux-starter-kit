import assert from 'assert'

describe('(Framework) Karma Plugins', function () {
  it('should expose "expect" globally.', function () {
    assert.ok(expect)
  })

  it('should expose "should" globally.', function () {
    assert.ok(should)
  })
})
