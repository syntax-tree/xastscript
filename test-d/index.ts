import {jsxDEV, Fragment, jsxs, jsx} from 'xastscript/jsx-dev-runtime'
import {x} from 'xastscript'
import type {Element, Root} from 'xast'
import {expectType} from 'tsd'

expectType<Root>(jsx(Fragment, {}))
expectType<Root>(jsx(Fragment, {children: x('x')}))
expectType<Element>(jsx('a', {}))
expectType<Element>(jsx('a', {children: 'a'}))
expectType<Element>(jsx('a', {children: x('x')}))
expectType<Element>(jsxs('a', {children: ['a', 'b']}))
expectType<Element>(jsxs('a', {children: [x('x'), x('y')]}))
expectType<Element>(jsxDEV('a', {children: 'a'}))
// Development builds pass more arguments.
expectType<Element>(
  jsxDEV('a', {}, undefined, false, {fileName: 'a.js'}, undefined)
)
expectType<Root>(
  jsxDEV(Fragment, {}, undefined, false, {fileName: 'a.js'}, undefined)
)

expectType<Root>(x())

// @ts-expect-error: not a valid name.
x(true)

expectType<Root>(x(null))
expectType<Root>(x(undefined))
expectType<Element>(x(''))
expectType<Element>(x('', null))
expectType<Element>(x('', undefined))
expectType<Element>(x('', 1))
expectType<Element>(x('', 'a'))
expectType<Element>(x('', true))
expectType<Element>(x('', [1, 'a', null]))
expectType<Element>(x('', [true]))

expectType<Element>(x('', {}))
expectType<Element>(x('', {}, [1, 'a', null]))
expectType<Element>(x('', {p: 1}))
expectType<Element>(x('', {p: null}))
expectType<Element>(x('', {p: undefined}))
expectType<Element>(x('', {p: true}))
expectType<Element>(x('', {p: false}))
expectType<Element>(x('', {p: 'a'}))

declare const attributesOrNullish: Record<string, string> | undefined
expectType<Element>(x('', attributesOrNullish))
expectType<Element>(x('', attributesOrNullish, 'a'))
declare const attributesOrChild: Record<string, string> | string
expectType<Element>(x('', attributesOrChild))

// @ts-expect-error: not a valid child.
x('', {p: [1]})

// @ts-expect-error: not a valid child.
x('', {p: [true]})

// @ts-expect-error: not a valid child.
x('', {p: ['a']})

// @ts-expect-error: not a valid child.
x('', {p: {x: true}})
