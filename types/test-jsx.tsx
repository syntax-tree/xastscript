import {Element, Root} from 'xast'
import * as x from 'xastscript'

const xmlns = 'http://www.sitemaps.org/schemas/sitemap/0.9'

let jsx: Element | Root
jsx = <urlset />
jsx = <urlset xmlns={xmlns} />
jsx = <urlset>string</urlset>
jsx = <urlset>{['string', 'string']}</urlset>
jsx = (
  <urlset xmlns={xmlns}>
    <child />
  </urlset>
)
jsx = (
  <urlset>
    <loc />
    string
  </urlset>
)
jsx = (
  <urlset>
    <loc />
  </urlset>
)
jsx = (
  <urlset>
    <loc />
    <loc />
  </urlset>
)
jsx = <urlset>{[<loc />, <loc />]}</urlset>
jsx = <urlset>{[]}</urlset>
jsx = <></>

jsx = <foo invalid={{}}></foo> // $ExpectError
jsx = <foo>{{invalid: 'child'}}</foo> // $ExpectError

const element: Element = <foo /> // $ExpectError
const root: Root = <></> // $ExpectError

declare function Bar(props?: Record<string, unknown>): Element
const bar = <Bar /> // $ExpectError
