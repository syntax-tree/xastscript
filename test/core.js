'use strict'

var test = require('tape')
var x = require('..')

test('xastscript', function (t) {
  t.equal(typeof x, 'function', 'should expose a function')

  t.deepEqual(
    x(),
    {type: 'root', children: []},
    'should create a root when w/o `name`'
  )

  t.throws(
    function () {
      x(1)
    },
    /Expected element name, got `1`/,
    'should throw w/ incorrect `name`'
  )

  t.deepEqual(
    x('y'),
    {type: 'element', name: 'y', attributes: {}, children: []},
    'should create an element when given `name`'
  )

  t.deepEqual(
    x('Y'),
    {type: 'element', name: 'Y', attributes: {}, children: []},
    'should treat `name` case-sensitive'
  )

  t.deepEqual(
    x('y', {a: 'b'}),
    {type: 'element', name: 'y', attributes: {a: 'b'}, children: []},
    'should create an element with given attributes'
  )

  t.deepEqual(
    x('y', {a: null, b: undefined, c: NaN}),
    {type: 'element', name: 'y', attributes: {}, children: []},
    'should ignore null, undefined, and NaN attribute values'
  )

  t.deepEqual(
    x('y', {}, x('z')),
    {
      type: 'element',
      name: 'y',
      attributes: {},
      children: [{type: 'element', name: 'z', attributes: {}, children: []}]
    },
    'should add a child'
  )

  t.deepEqual(
    x('y', {}, [x('a'), x('b')]),
    {
      type: 'element',
      name: 'y',
      attributes: {},
      children: [
        {type: 'element', name: 'a', attributes: {}, children: []},
        {type: 'element', name: 'b', attributes: {}, children: []}
      ]
    },
    'should add children as an array'
  )

  t.deepEqual(
    x('y', {}, [[[x('a')]], [[[[x('b')]], x('c')]]]),
    {
      type: 'element',
      name: 'y',
      attributes: {},
      children: [
        {type: 'element', name: 'a', attributes: {}, children: []},
        {type: 'element', name: 'b', attributes: {}, children: []},
        {type: 'element', name: 'c', attributes: {}, children: []}
      ]
    },
    'should add children in a deeply nested array'
  )

  t.deepEqual(
    x('y', {}, x('a'), x('b')),
    {
      type: 'element',
      name: 'y',
      attributes: {},
      children: [
        {type: 'element', name: 'a', attributes: {}, children: []},
        {type: 'element', name: 'b', attributes: {}, children: []}
      ]
    },
    'should add children as arguments'
  )

  t.deepEqual(
    x('y', {}, 'a', 1),
    {
      type: 'element',
      name: 'y',
      attributes: {},
      children: [
        {type: 'text', value: 'a'},
        {type: 'text', value: '1'}
      ]
    },
    'should add strings and numbers as literals'
  )

  t.deepEqual(
    x('y', {}, null, undefined),
    {type: 'element', name: 'y', attributes: {}, children: []},
    'should ignore null and undefined children'
  )

  t.throws(
    function () {
      x('y', {}, {})
    },
    /Expected node, nodes, string, got `\[object Object]`/,
    'should throw on invalid children'
  )

  t.deepEqual(
    x('y', 'z'),
    {
      type: 'element',
      name: 'y',
      attributes: {},
      children: [{type: 'text', value: 'z'}]
    },
    'should support omitting attributes when given a string for a child'
  )

  t.deepEqual(
    x('y', 1),
    {
      type: 'element',
      name: 'y',
      attributes: {},
      children: [{type: 'text', value: '1'}]
    },
    'should support omitting attributes when given a number for a child'
  )

  t.deepEqual(
    x('y', ['a', 1]),
    {
      type: 'element',
      name: 'y',
      attributes: {},
      children: [
        {type: 'text', value: 'a'},
        {type: 'text', value: '1'}
      ]
    },
    'should support omitting attributes when given an array for a child'
  )

  t.deepEqual(
    x(null, '1'),
    {type: 'root', children: [{type: 'text', value: '1'}]},
    'should create a root with a textual child'
  )

  t.deepEqual(
    x(null, 1),
    {type: 'root', children: [{type: 'text', value: '1'}]},
    'should create a root with a numerical child'
  )

  t.deepEqual(
    x(null, x('a')),
    {
      type: 'root',
      children: [{type: 'element', name: 'a', attributes: {}, children: []}]
    },
    'should create a root with a node child'
  )

  t.deepEqual(
    x('a', {}, [x(null, x('b'))]),
    {
      type: 'element',
      name: 'a',
      attributes: {},
      children: [{type: 'element', name: 'b', attributes: {}, children: []}]
    },
    'should create a node w/ by unraveling roots'
  )

  t.end()
})
