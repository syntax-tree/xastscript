/** @jsxImportSource xastscript */

import test from 'tape'
import {u} from 'unist-builder'
import {x} from '../index.js'

test('name', (t) => {
  t.deepEqual(<a />, x('a'), 'should support a self-closing element')

  t.deepEqual(<a>b</a>, x('a', 'b'), 'should support a value as a child')

  const A = 'a'

  // Note: this file is a template, generated with different runtimes.
  // @ts-ignore: TS (depending on this build) sometimes doesn’t understand.
  t.deepEqual(<A />, x(A), 'should support an uppercase tag name')

  t.deepEqual(
    <a>{1 + 1}</a>,
    x('a', '2'),
    'should support expressions as children'
  )

  t.deepEqual(<></>, u('root', []), 'should support a fragment')

  t.deepEqual(
    <>a</>,
    u('root', [u('text', 'a')]),
    'should support a fragment with text'
  )

  t.deepEqual(
    <>
      <a />
    </>,
    u('root', [x('a')]),
    'should support a fragment with an element'
  )

  t.deepEqual(
    <>{-1}</>,
    u('root', [u('text', '-1')]),
    'should support a fragment with an expression'
  )

  const com = {acme: {a: 'A', b: 'B'}}

  t.deepEqual(
    // Note: this file is a template, generated with different runtimes.
    // @ts-ignore: TS (depending on this build) sometimes doesn’t understand.
    <com.acme.a />,
    x(com.acme.a),
    'should support members as names (`a.b`)'
  )

  t.deepEqual(
    <a b />,
    x('a', {b: 'true'}),
    'should support a boolean attribute'
  )

  t.deepEqual(
    <a b="" />,
    x('a', {b: ''}),
    'should support a double quoted attribute'
  )

  t.deepEqual(
    <a b='"' />,
    x('a', {b: '"'}),
    'should support a single quoted attribute'
  )

  t.deepEqual(
    <a b={1 + 1} />,
    x('a', {b: '2'}),
    'should support expression value attributes'
  )

  const props = {a: 1, b: 2}

  t.deepEqual(
    <a {...props} />,
    x('a', props),
    'should support expression spread attributes'
  )

  t.deepEqual(
    <a>
      <b />c<d>e</d>
      {1 + 1}
    </a>,
    x('a', [x('b'), 'c', x('d', 'e'), '2']),
    'should support text, elements, and expressions in JSX'
  )

  t.deepEqual(
    <a>
      <>{1}</>
    </a>,
    x('a', '1'),
    'should support a fragment in an element (#1)'
  )

  const dl = [
    ['Firefox', 'A red panda.'],
    ['Chrome', 'A chemical element.']
  ]

  t.deepEqual(
    <dl>
      {dl.map(([title, definition]) => (
        <>
          <dt>{title}</dt>
          <dd>{definition}</dd>
        </>
      ))}
    </dl>,
    x('dl', [
      x('dt', dl[0][0]),
      x('dd', dl[0][1]),
      x('dt', dl[1][0]),
      x('dd', dl[1][1])
    ]),
    'should support a fragment in an element (#2)'
  )

  t.end()
})
