/* @jsxRuntime automatic */
/* @jsxImportSource xastscript */

import {expectType, expectError} from 'tsd'
import type {Root, Element} from 'xast'
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

expectError(<a invalid={{}} />)
expectError(<a invalid={[1]} />)
expectError(<a>{{invalid: 'child'}}</a>)

// This is where the automatic runtime differs from the classic runtime.
// The automatic runtime the children prop to define JSX children, whereas it’s used as an attribute in the classic runtime.
expectType<Result>(<a children={<b />} />)

declare function Bar(props?: Record<string, unknown>): Element
expectError(<Bar />)
