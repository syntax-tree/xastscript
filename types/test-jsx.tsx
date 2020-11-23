import {Element} from 'xast'
import * as x from 'xastscript'

const xmlns = 'http://www.sitemaps.org/schemas/sitemap/0.9'

let jsx
// $ExpectType Element
jsx = <urlset />
// $ExpectType Element
jsx = <urlset xmlns={xmlns} />
// $ExpectType Element
jsx = <urlset>string</urlset>
// $ExpectType Element
jsx = <urlset>{['string', 'string']}</urlset>
// $ExpectType Element
jsx = (
  <urlset xmlns={xmlns}>
    <child />
  </urlset>
)
// $ExpectType Element
jsx = (
  <urlset>
    <loc />
    string
  </urlset>
)
// $ExpectType Element
jsx = (
  <urlset>
    <loc />
  </urlset>
)
// $ExpectType Element
jsx = (
  <urlset>
    <loc />
    <loc />
  </urlset>
)
// $ExpectType Element
jsx = <urlset>{[<loc />, <loc />]}</urlset>
// $ExpectType Element
jsx = <urlset>{[]}</urlset>

jsx = <foo invalid={{}}></foo> // $ExpectError
jsx = <foo>{{invalid: 'child'}}</foo> // $ExpectError

declare function Bar(props?: Record<string, unknown>): Element
const bar = <Bar /> // $ExpectError
