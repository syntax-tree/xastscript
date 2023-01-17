import assert from 'node:assert/strict'
import test from 'node:test'
import {x} from '../index.js'

test('xastscript', () => {
  assert.equal(typeof x, 'function', 'should expose a function')

  assert.deepEqual(
    x(),
    {type: 'root', children: []},
    'should create a root when w/o `name`'
  )

  assert.throws(
    () => {
      // @ts-expect-error runtime.
      x(1)
    },
    /Expected element name, got `1`/,
    'should throw w/ incorrect `name`'
  )

  assert.deepEqual(
    x('y'),
    {type: 'element', name: 'y', attributes: {}, children: []},
    'should create an element when given `name`'
  )

  assert.deepEqual(
    x('Y'),
    {type: 'element', name: 'Y', attributes: {}, children: []},
    'should treat `name` case-sensitive'
  )

  assert.deepEqual(
    x('y', {a: 'b'}),
    {type: 'element', name: 'y', attributes: {a: 'b'}, children: []},
    'should create an element with given attributes'
  )

  assert.deepEqual(
    x('y', {a: null, b: undefined, c: Number.NaN}),
    {type: 'element', name: 'y', attributes: {}, children: []},
    'should ignore null, undefined, and NaN attribute values'
  )

  assert.deepEqual(
    x('y', {}, x('z')),
    {
      type: 'element',
      name: 'y',
      attributes: {},
      children: [{type: 'element', name: 'z', attributes: {}, children: []}]
    },
    'should add a child'
  )

  assert.deepEqual(
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

  assert.deepEqual(
    // @ts-expect-error Deeply nested children are not typed.
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

  assert.deepEqual(
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

  assert.deepEqual(
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

  assert.deepEqual(
    x('y', {}, null, undefined),
    {type: 'element', name: 'y', attributes: {}, children: []},
    'should ignore null and undefined children'
  )

  assert.throws(
    () => {
      // @ts-expect-error runtime.
      x('y', {}, {})
    },
    /Expected node, nodes, string, got `\[object Object]`/,
    'should throw on invalid children'
  )

  assert.deepEqual(
    x('y', 'z'),
    {
      type: 'element',
      name: 'y',
      attributes: {},
      children: [{type: 'text', value: 'z'}]
    },
    'should support omitting attributes when given a string for a child'
  )

  assert.deepEqual(
    x('y', 1),
    {
      type: 'element',
      name: 'y',
      attributes: {},
      children: [{type: 'text', value: '1'}]
    },
    'should support omitting attributes when given a number for a child'
  )

  assert.deepEqual(
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

  assert.deepEqual(
    x(null, '1'),
    {type: 'root', children: [{type: 'text', value: '1'}]},
    'should create a root with a textual child'
  )

  assert.deepEqual(
    x(null, 1),
    {type: 'root', children: [{type: 'text', value: '1'}]},
    'should create a root with a numerical child'
  )

  assert.deepEqual(
    x(null, x('a')),
    {
      type: 'root',
      children: [{type: 'element', name: 'a', attributes: {}, children: []}]
    },
    'should create a root with a node child'
  )

  assert.deepEqual(
    x('a', {}, [x(null, x('b'))]),
    {
      type: 'element',
      name: 'a',
      attributes: {},
      children: [{type: 'element', name: 'b', attributes: {}, children: []}]
    },
    'should create a node w/ by unraveling roots'
  )
})
