'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/path-style')
const ruleTesterUtil = require('../testUtil/ruleTesterUtil')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = ruleTesterUtil.getRuleTester()
const {withDefaultPragma} = require('../testUtil/optionsUtil')

const withDefaultPragmaArr = a => a.map(withDefaultPragma)

ruleTester.run('path-style', rule, {
    valid: withDefaultPragmaArr([
        "var aProp = _.property('a');",
        "var aProp = _.property('a.b');",
        'var aProp = _.property(`${name}id`);',
        "var aProp = _.property(name + 'id');",
        "var aProp = _.property(['a', 'b', x]);",
        {code: "var t = _.get(x, ['a'])", options: ['array']},
        {code: 'var t = _.has(x, `a.b.${x}`)', options: ['string']},
        {code: "var t = _.has(x, 'a.b.' + x)", options: ['string']},
        {code: "_.set(x, ['a'], t)", options: ['array']},
        "var t = _.replace(a, 'a', 'b')"
    ]),
    invalid: withDefaultPragmaArr([{
        code: "_.invoke(x, ['a'])",
        errors: [{messageId: 'stringForSimple'}],
        output: "_.invoke(x, 'a')"
    }, {
        code: "_.invoke(x, ['a', 'some-value'])",
        errors: [{messageId: 'stringForSimple'}],
        output: "_.invoke(x, 'a[\"some-value\"]')"
    }, {
        code: "_.invoke(x, ['a', 'b.c', 'd'])",
        errors: [{messageId: 'stringForSimple'}],
        output: "_.invoke(x, 'a[\"b.c\"].d')"
    }, {
        code: "_(x).invoke(['a']).filter(f).value()",
        errors: [{messageId: 'stringForSimple'}],
        output: "_(x).invoke('a').filter(f).value()"
    }, {
        code: "var t = _.matchesProperty(['a', 'b'])",
        errors: [{messageId: 'stringForSimple'}],
        output: "var t = _.matchesProperty('a.b')"
    }, {
        code: "var t = _.has(y, 'a.' + x)",
        errors: [{messageId: 'arrayForVars'}]
    }, {
        code: "var t = _.has(y, x + '[b]')",
        errors: [{messageId: 'arrayForVars'}]
    }, {
        code: 'var t = _.has(y, `a[${x}]`)',
        errors: [{messageId: 'arrayForVars'}]
    }, {
        code: "var t = _.get(x, 'a')",
        errors: [{messageId: 'array', column: 18}],
        options: ['array'],
        output: "var t = _.get(x, ['a'])"
    }, {
        code: 'var t = _.get(y, `a.${x}`)',
        errors: [{messageId: 'array'}],
        options: ['array']
    }, {
        code: "var t = _.get(y, [a, 'x'])",
        errors: [{messageId: 'string'}],
        options: ['string'],
        output: 'var t = _.get(y, `${a}.x`)'
    }, {
        code: 'var t = _.get(y, [a, 0])',
        errors: [{messageId: 'string'}],
        options: ['string'],
        output: 'var t = _.get(y, `${a}[0]`)'
    }, {
        code: "var t = _.get(x, ['a', 'b'])",
        errors: [{messageId: 'string', column: 18}],
        options: ['string'],
        output: "var t = _.get(x, 'a.b')"
    }, {
        code: 'var t = _.set(x, [b.a, b.c], a)',
        errors: [{messageId: 'string', column: 18}],
        options: ['string'],
        output: 'var t = _.set(x, `${b.a}.${b.c}`, a)'
    }])
})
