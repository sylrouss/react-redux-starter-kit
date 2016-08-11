import assert from 'assert'

describe('(Framework) Karma Plugins', () => {
  it('should expose "expect" globally.', () => {
    assert.ok(expect)
  })

  it('should expose "should" globally.', () => {
    assert.ok(should)
  })
})
