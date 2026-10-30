/* @jsxRuntime automatic */
/* @jsxImportSource xastscript */

import {x} from 'xastscript'
import type {Element, Root} from 'xast'
import {expectType} from 'tsd'

type Result = Element | Root

// JSX automatic runtime.
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
