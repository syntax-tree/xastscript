import assert from 'node:assert/strict'
import test from 'node:test'
import {x} from 'xastscript'

test('xastscript', async function (t) {
  await t.test('should expose the public api (`/`)', async function () {
    assert.deepEqual(Object.keys(await import('xastscript')).sort(), ['x'])
  })

  await t.test(
    'should expose the public api (`/jsx-runtime`)',
    async function () {
      assert.deepEqual(
        Object.keys(await import('xastscript/jsx-runtime')).sort(),
        ['Fragment', 'jsx', 'jsxs']
      )
    }
  )

  await t.test(
    'should expose the public api (`/jsx-dev-runtime`)',
    async function () {
      assert.deepEqual(
        Object.keys(await import('xastscript/jsx-dev-runtime')).sort(),
        ['Fragment', 'jsxDEV']
      )
    }
  )

  await t.test('should create a root when w/o `name`', async function () {
    assert.deepEqual(x(), {type: 'root', children: []})
  })

  await t.test('should throw w/ incorrect `name`', async function () {
    assert.throws(function () {
      // @ts-expect-error: check how the runtime handles an incorrect name.
      x(1)
    }, /Expected element name, got `1`/)
  })

  await t.test('should create an element when given `name`', async function () {
    assert.deepEqual(x('y'), {
      type: 'element',
      name: 'y',
      attributes: {},
      children: []
    })
  })

  await t.test('should treat `name` case-sensitive', async function () {
    assert.deepEqual(x('Y'), {
      type: 'element',
      name: 'Y',
      attributes: {},
      children: []
    })
  })

  await t.test(
    'should create an element with given attributes',
    async function () {
      assert.deepEqual(x('y', {a: 'b'}), {
        type: 'element',
        name: 'y',
        attributes: {a: 'b'},
        children: []
      })
    }
  )

  await t.test(
    'should ignore null, undefined, and NaN attribute values',
    async function () {
      assert.deepEqual(x('y', {a: null, b: undefined, c: Number.NaN}), {
        type: 'element',
        name: 'y',
        attributes: {},
        children: []
      })
    }
  )

  await t.test('should add a child', async function () {
    assert.deepEqual(x('y', {}, x('z')), {
      type: 'element',
      name: 'y',
      attributes: {},
      children: [{type: 'element', name: 'z', attributes: {}, children: []}]
    })
  })

  await t.test('should add children as an array', async function () {
    assert.deepEqual(x('y', {}, [x('a'), x('b')]), {
      type: 'element',
      name: 'y',
      attributes: {},
      children: [
        {type: 'element', name: 'a', attributes: {}, children: []},
        {type: 'element', name: 'b', attributes: {}, children: []}
      ]
    })
  })

  await t.test(
    'should add children in a deeply nested array',
    async function () {
      assert.deepEqual(
        // @ts-expect-error: check how the runtime handles deep children lists (not support in TS).
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
        }
      )
    }
  )

  await t.test('should add children as arguments', async function () {
    assert.deepEqual(x('y', {}, x('a'), x('b')), {
      type: 'element',
      name: 'y',
      attributes: {},
      children: [
        {type: 'element', name: 'a', attributes: {}, children: []},
        {type: 'element', name: 'b', attributes: {}, children: []}
      ]
    })
  })

  await t.test('should add strings and numbers as literals', async function () {
    assert.deepEqual(x('y', {}, 'a', 1), {
      type: 'element',
      name: 'y',
      attributes: {},
      children: [
        {type: 'text', value: 'a'},
        {type: 'text', value: '1'}
      ]
    })
  })

  await t.test('should ignore null and undefined children', async function () {
    assert.deepEqual(x('y', {}, null, undefined), {
      type: 'element',
      name: 'y',
      attributes: {},
      children: []
    })
  })

  await t.test('should throw on invalid children', async function () {
    assert.throws(function () {
      // @ts-expect-error: check how the runtime handles non-nodes.
      x('y', {}, {})
    }, /Expected node, nodes, string, got `\[object Object]`/)
  })

  await t.test(
    'should support omitting attributes when given a string for a child',
    async function () {
      assert.deepEqual(x('y', 'z'), {
        type: 'element',
        name: 'y',
        attributes: {},
        children: [{type: 'text', value: 'z'}]
      })
    }
  )

  await t.test(
    'should support omitting attributes when given a number for a child',
    async function () {
      assert.deepEqual(x('y', 1), {
        type: 'element',
        name: 'y',
        attributes: {},
        children: [{type: 'text', value: '1'}]
      })
    }
  )

  await t.test(
    'should support omitting attributes when given an array for a child',
    async function () {
      assert.deepEqual(x('y', ['a', 1]), {
        type: 'element',
        name: 'y',
        attributes: {},
        children: [
          {type: 'text', value: 'a'},
          {type: 'text', value: '1'}
        ]
      })
    }
  )

  await t.test('should create a root with a textual child', async function () {
    assert.deepEqual(x(null, '1'), {
      type: 'root',
      children: [{type: 'text', value: '1'}]
    })
  })

  await t.test(
    'should create a root with a numerical child',
    async function () {
      assert.deepEqual(x(null, 1), {
        type: 'root',
        children: [{type: 'text', value: '1'}]
      })
    }
  )

  await t.test('should create a root with a node child', async function () {
    assert.deepEqual(x(null, x('a')), {
      type: 'root',
      children: [{type: 'element', name: 'a', attributes: {}, children: []}]
    })
  })

  await t.test(
    'should create a node w/ by unraveling roots',
    async function () {
      assert.deepEqual(x('a', {}, [x(null, x('b'))]), {
        type: 'element',
        name: 'a',
        attributes: {},
        children: [{type: 'element', name: 'b', attributes: {}, children: []}]
      })
    }
  )
})
