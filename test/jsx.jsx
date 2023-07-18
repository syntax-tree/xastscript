/** @jsxImportSource xastscript */

import assert from 'node:assert/strict'
import test from 'node:test'
import {u} from 'unist-builder'
import {x} from 'xastscript'

test('name', async function (t) {
  await t.test('should support a self-closing element', async function () {
    assert.deepEqual(<a />, x('a'))
  })

  await t.test('should support a value as a child', async function () {
    assert.deepEqual(<a>b</a>, x('a', 'b'))
  })

  await t.test('should support an uppercase tag name', async function () {
    const A = 'a'

    // Note: this file is a template, generated with different runtimes.
    // @ts-ignore: TS (depending on this build) sometimes doesn’t understand.
    assert.deepEqual(<A />, x(A))
  })

  await t.test('should support expressions as children', async function () {
    assert.deepEqual(<a>{1 + 1}</a>, x('a', '2'))
  })

  await t.test('should support a fragment', async function () {
    assert.deepEqual(<></>, u('root', []))
  })

  await t.test('should support a fragment with text', async function () {
    assert.deepEqual(<>a</>, u('root', [u('text', 'a')]))
  })

  await t.test('should support a fragment with an element', async function () {
    assert.deepEqual(
      <>
        <a />
      </>,
      u('root', [x('a')])
    )
  })

  await t.test(
    'should support a fragment with an expression',
    async function () {
      assert.deepEqual(<>{-1}</>, u('root', [u('text', '-1')]))
    }
  )

  await t.test('should support members as names (`a.b`)', async function () {
    const com = {acme: {a: 'A', b: 'B'}}

    assert.deepEqual(
      // Note: this file is a template, generated with different runtimes.
      // @ts-ignore: TS (depending on this build) sometimes doesn’t understand.
      <com.acme.a />,
      x(com.acme.a)
    )
  })

  await t.test('should support a boolean attribute', async function () {
    assert.deepEqual(<a b />, x('a', {b: 'true'}))
  })

  await t.test('should support a double quoted attribute', async function () {
    assert.deepEqual(<a b="" />, x('a', {b: ''}))
  })

  await t.test('should support a single quoted attribute', async function () {
    assert.deepEqual(<a b='"' />, x('a', {b: '"'}))
  })

  await t.test('should support expression value attributes', async function () {
    assert.deepEqual(<a b={1 + 1} />, x('a', {b: '2'}))
  })

  await t.test(
    'should support expression spread attributes',
    async function () {
      const props = {a: 1, b: 2}

      assert.deepEqual(<a {...props} />, x('a', props))
    }
  )

  await t.test(
    'should support text, elements, and expressions in JSX',
    async function () {
      assert.deepEqual(
        <a>
          <b />c<d>e</d>
          {1 + 1}
        </a>,
        x('a', [x('b'), 'c', x('d', 'e'), '2'])
      )
    }
  )

  await t.test(
    'should support a fragment in an element (#1)',
    async function () {
      assert.deepEqual(
        <a>
          <>{1}</>
        </a>,
        x('a', '1')
      )
    }
  )

  await t.test(
    'should support a fragment in an element (#2)',
    async function () {
      const dl = [
        ['Firefox', 'A red panda.'],
        ['Chrome', 'A chemical element.']
      ]

      assert.deepEqual(
        <dl>
          {dl.map(function ([title, definition]) {
            return (
              <>
                <dt>{title}</dt>
                <dd>{definition}</dd>
              </>
            )
          })}
        </dl>,
        x('dl', [
          x('dt', dl[0][0]),
          x('dd', dl[0][1]),
          x('dt', dl[1][0]),
          x('dd', dl[1][1])
        ])
      )
    }
  )
})
