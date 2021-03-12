'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/no-deprecated')
const ruleTesterUtil = require('../testUtil/ruleTesterUtil')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------
const v4Deprecations = require('../../../src/util/methodDeprecationByVersion/4')
const v5Deprecations = require('../../../src/util/methodDeprecationByVersion/5')

const ruleTester = ruleTesterUtil.getRuleTester()
const { fromMessage, withDefaultPragma } = require('../testUtil/optionsUtil')

Object.keys(v4Deprecations).forEach(key => {
  const formRules = {
    valid: [
      `const ${key} = function(x,y){return x}
       const mockObj = { a: 5, b: 'abc' }
       const result = ${key}(mockObj,['a'])`,
      `import ${key} from "underscore";
         const mockObj = { a: 5, b: 'abc' }
         const result = ${key}(mockObj)`
    ],
    invalid: [
      `const mockObj = { a: 5, b: 'abc' }
    const result = _.${key}(mockObj,['a'])`,
      `import _${key} from "lodash/${key}";
     const mockObj = { a: 5, b: 'abc' }
     const result = _${key}(mockObj)`,
      `import {${key}} from "lodash";
       const mockObj = { a: 5, b: 'abc' }
       const result = ${key}(mockObj)`
    ]
  }
  const toErrorObject = fromMessage(v4Deprecations[key])

  ruleTester.run(`no-deprecated - v4 - ${key}`, rule, {
    valid: formRules.valid
      .map(code => ({
        code,
        options: [[4]],
        parserOptions: { sourceType: 'module' }
      }))
      .map(withDefaultPragma),
    invalid: formRules.invalid
      .map(code => ({
        code,
        options: [[4]],
        parserOptions: { sourceType: 'module' }
      }))
      .map(withDefaultPragma)
      .map(toErrorObject)
  })

  ruleTester.run(`no-deprecated - v4,5 - ${key}`, rule, {
    valid: formRules.valid
      .map(code => ({
        code,
        options: [[4, 5]],
        parserOptions: { sourceType: 'module' }
      }))
      .map(withDefaultPragma),
    invalid: formRules.invalid
      .map(code => ({
        code,
        options: [[4, 5]],
        parserOptions: { sourceType: 'module' }
      }))
      .map(withDefaultPragma)
      .map(toErrorObject)
  })
})

Object.keys(v5Deprecations).forEach(key => {
  const formRules = {
    valid: [
      `const ${key} = function(x,y){return x}
       const mockObj = { a: 5, b: 'abc' }
       const result = ${key}(mockObj,['a'])`,
      `import ${key} from "underscore";
         const mockObj = { a: 5, b: 'abc' }
         const result = ${key}(mockObj)`
    ],
    invalid: [
      `const mockObj = { a: 5, b: 'abc' }
    const result = _.${key}(mockObj,['a'])`,
      `import _${key} from "lodash/${key}";
     const mockObj = { a: 5, b: 'abc' }
     const result = _${key}(mockObj)`,
      `import {${key}} from "lodash";
       const mockObj = { a: 5, b: 'abc' }
       const result = ${key}(mockObj)`
    ]
  }
  const toErrorObject = fromMessage(v5Deprecations[key])

  ruleTester.run(`no-deprecated - v5 - ${key}`, rule, {
    valid: formRules.valid
      .map(code => ({
        code,
        options: [[5]],
        parserOptions: { sourceType: 'module' }
      }))
      .map(withDefaultPragma),
    invalid: formRules.invalid
      .map(code => ({
        code,
        options: [[5]],
        parserOptions: { sourceType: 'module' }
      }))
      .map(withDefaultPragma)
      .map(toErrorObject)
  })

  ruleTester.run(`no-deprecated - v4,5 - ${key}`, rule, {
    valid: formRules.valid
      .map(code => ({
        code,
        options: [[4, 5]],
        parserOptions: { sourceType: 'module' }
      }))
      .map(withDefaultPragma),
    invalid: formRules.invalid
      .map(code => ({
        code,
        options: [[4, 5]],
        parserOptions: { sourceType: 'module' }
      }))
      .map(withDefaultPragma)
      .map(toErrorObject)
  })
})
