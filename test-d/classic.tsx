/* @jsx x */
/* @jsxFrag null */

import {expectType} from 'tsd'
import type {Element, Root} from 'xast'
import {x} from '../index.js'

type Result = Element | Root

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

// @ts-expect-error: not a valid attribute value.
expectType<Result>(<a invalid={{}} />)

// @ts-expect-error: not a valid attribute value.
expectType<Result>(<a invalid={[1]} />)

// @ts-expect-error: not a valid child.
expectType<Result>(<a>{{invalid: 'child'}}</a>)

// @ts-expect-error: classic runtime does not accept children as an attribute.
// This is where the classic runtime differs from the automatic runtime.
// The automatic runtime the children prop to define JSX children, whereas it’s
// used as an attribute in the classic runtime.
expectType<Result>(<a children={<b />} />)

declare function Bar(props?: Record<string, unknown>): Element

// @ts-expect-error: components not supported.
expectType<Result>(<Bar />)
