/**
 * @fileoverview Rule to check if a call to omit method
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const getDocsUrl = require('../util/getDocsUrl')
const v4Deprecations = require('../util/methodDeprecationByVersion/4')
const v5Deprecations = require('../util/methodDeprecationByVersion/5')
const deprecatedMethods = {
  4: v4Deprecations,
  5: v5Deprecations
}
module.exports = {
  meta: {
    docs: {
      url: getDocsUrl('no-deprecated')
    },
    schema: [
      {
        type: 'array',
        items: {
          enum: [4, 5]
        }
      }
    ]
  },

  create(context) {
    const { getLodashMethodVisitors } = require('../util/lodashUtil')
    const { isAliasOfMethod } = require('../util/methodDataUtil')
    const options = context.options[0] || []
    return getLodashMethodVisitors(context, (node, iteratee, { method, version }) => {
      options.forEach(versionToCheck => {
        if (deprecatedMethods[versionToCheck]) {
          Object.keys(deprecatedMethods[versionToCheck]).forEach(methodName => {
            if (isAliasOfMethod(version, methodName, method)) {
              context.report({ node, message: deprecatedMethods[versionToCheck][method] })
            }
          })
        }
      })
    })
  }
}
