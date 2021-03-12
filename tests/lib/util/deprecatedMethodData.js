'use strict'
const assert = require('assert')
const v4 = require('../../../src/util/methodDeprecationByVersion/4')
const v5 = require('../../../src/util/methodDeprecationByVersion/5')

describe('Deprectaed Method Data', () => {
  it('v4 should not be null', () => {
    assert.ok(v4)
  })
  it('v4 should not be empty', () => {
    assert.notEqual(Object.keys(v4).length, 0)
  })

  it('v5 should not be null', () => {
    assert.ok(v5)
  })
  it('v5 should not be empty', () => {
    assert.notEqual(Object.keys(v5).length, 0)
  })
})
