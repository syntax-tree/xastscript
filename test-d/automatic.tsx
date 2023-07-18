/* @jsxRuntime automatic */
/* @jsxImportSource xastscript */

import {expectType} from 'tsd'
import type {Element, Root} from 'xast'
import {x} from '../index.js'
import {Fragment, jsx, jsxs} from '../jsx-runtime.js'

type Result = Element | Root

// JSX automatic runtime.
expectType<Root>(jsx(Fragment, {}))
expectType<Root>(jsx(Fragment, {children: x('x')}))
expectType<Element>(jsx('a', {}))
expectType<Element>(jsx('a', {children: 'a'}))
expectType<Element>(jsx('a', {children: x('x')}))
expectType<Element>(jsxs('a', {children: ['a', 'b']}))
expectType<Element>(jsxs('a', {children: [x('x'), x('y')]}))

expectType<Result>(<></>)
expectType<Result>(<a />)
expectType<Result>(<a b="c" />)
expectType<Result>(<a b={'c'} />)
expectType<Result>(<a>string</a>)
expectType<Result>(<a>{['string', 'string']}</a>)
expectType<Result>(
  <a>
    <></>
  </a>
)
expectType<Result>(<a>{x()}</a>)
expectType<Result>(<a>{x('b')}</a>)
expectType<Result>(
  <a>
    <b />c
  </a>
)
expectType<Result>(
  <a>
    <b />
    <c />
  </a>
)

expectType<Result>(<a>{[<b />, <c />]}</a>)
expectType<Result>(<a>{[<b />, <c />]}</a>)
expectType<Result>(<a>{[]}</a>)

// @ts-expect-error: not a valid child.
expectType<Result>(<a invalid={{}} />)

// @ts-expect-error: not a valid child.
expectType<Result>(<a invalid={[1]} />)

// @ts-expect-error: not a valid child.
expectType<Result>(<a>{{invalid: 'child'}}</a>)

// This is where the automatic runtime differs from the classic runtime.
// The automatic runtime the children prop to define JSX children, whereas it’s used as an attribute in the classic runtime.
expectType<Result>(<a children={<b />} />)

declare function Bar(props?: Record<string, unknown>): Element

// @ts-expect-error: components not supported.
expectType<Result>(<Bar />)
