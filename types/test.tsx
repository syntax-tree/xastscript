/** @jsx x */
import x = require('xastscript')

const xmlns = 'http://www.sitemaps.org/schemas/sitemap/0.9'
const xmlNumberAttribute = 100

const t0 = <urlset /> // $ExpectType Element
const t1 = <urlset xmlns={xmlns} /> // $ExpectType Element
const t2 = <urlset xmlNumberAttribute={xmlNumberAttribute} /> // $ExpectType Element
const t3 = <urlset>string</urlset> // $ExpectType Element
// $ExpectType Element
const t4 = (
  <urlset>
    <text />
  </urlset>
)
// $ExpectType Element
const t5 = <urlset>text</urlset>
// $ExpectType Element
const t6 = (
  <urlset>
    <text />
    <text />
  </urlset>
)
// $ExpectType Element
const t7 = (
  <urlset>
    test
    <text />
  </urlset>
)
// $ExpectType Element
const t8 = (
  <urlset>
    {['a', 'b'].map((value) => (
      <text>{value}</text>
    ))}
  </urlset>
)
const t9 = <urlset xmlns /> // $ExpectError
