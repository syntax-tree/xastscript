import {expectType, expectError} from 'tsd'
import {Root, Element} from 'xast'
import {x} from './index.js'

expectType<Root>(x())
expectError(x(true))
expectType<Root>(x(null))
expectType<Root>(x(undefined))
expectType<Element>(x(''))
expectType<Element>(x('', null))
expectType<Element>(x('', undefined))
expectType<Element>(x('', 1))
expectType<Element>(x('', 'a'))
expectError(x('', true))
expectType<Element>(x('', [1, 'a', null]))
expectError(x('', [true]))

expectType<Element>(x('', {}))
expectType<Element>(x('', {}, [1, 'a', null]))
expectType<Element>(x('', {p: 1}))
expectType<Element>(x('', {p: null}))
expectType<Element>(x('', {p: undefined}))
expectType<Element>(x('', {p: true}))
expectType<Element>(x('', {p: false}))
expectType<Element>(x('', {p: 'a'}))
expectError(x('', {p: [1]}))
expectError(x('', {p: [true]}))
expectError(x('', {p: ['a']}))
expectError(x('', {p: {x: true}}))
