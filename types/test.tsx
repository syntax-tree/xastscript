/** @jsx x */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {Attributes, Element} from 'xast'
import x = require('xastscript')

x('urlset') // $ExpectType Element
x('urlset', 'string') // $ExpectType Element
x('urlset', ['string', 'string']) // $ExpectType Element
x('urlset', x('loc'), 'string') // $ExpectType Element
x('urlset', x('loc')) // $ExpectType Element
x('urlset', x('loc'), x('loc')) // $ExpectType Element
x('urlset', [x('loc'), x('loc')]) // $ExpectType Element
x('urlset', []) // $ExpectType Element

const xmlns = 'http://www.sitemaps.org/schemas/sitemap/0.9'

x('urlset', {xmlns}) // $ExpectType Element
x('urlset', {xmlns}, 'string') // $ExpectType Element
x('urlset', {xmlns}, ['string', 'string']) // $ExpectType Element
x('urlset', {xmlns}, x('loc'), 'string') // $ExpectType Element
x('urlset', {xmlns}, x('loc')) // $ExpectType Element
x('urlset', {xmlns}, x('loc'), x('loc')) // $ExpectType Element
x('urlset', {xmlns}, [x('loc'), x('loc')]) // $ExpectType Element
x('urlset', {xmlns}, []) // $ExpectType Element

// $ExpectType Element
const jsx0 = <urlset />
// $ExpectType Element
const jsx1 = <urlset xmlns={xmlns} />
// $ExpectType Element
const jsx2 = <urlset>string</urlset>
// $ExpectType Element
const jsx3 = <urlset>{['string', 'string']}</urlset>
// $ExpectType Element
const jsx4 = (
  <urlset>
    <loc />
    string
  </urlset>
)
// $ExpectType Element
const jsx5 = (
  <urlset>
    <loc />
  </urlset>
)
// $ExpectType Element
const jsx6 = (
  <urlset>
    <loc />
    <loc />
  </urlset>
)
// $ExpectType Element
const jsx7 = <urlset>{[<loc />, <loc />]}</urlset>
// $ExpectType Element
const jsx8 = <urlset>{[]}</urlset>

declare function Bar(props?: Attributes): Element
const bar = <Bar /> // $ExpectError
x() // $ExpectError
x(false) // $ExpectError
x('urlset', x('loc'), {xmlns}) // $ExpectError
