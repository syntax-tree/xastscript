import {expectType} from 'tsd'
import type {Element, Root} from 'xast'
import {x} from '../index.js'

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

// @ts-expect-error: not a valid child.
x('', {p: [1]})

// @ts-expect-error: not a valid child.
x('', {p: [true]})

// @ts-expect-error: not a valid child.
x('', {p: ['a']})

// @ts-expect-error: not a valid child.
x('', {p: {x: true}})
