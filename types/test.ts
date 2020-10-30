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

x() // $ExpectError
x(false) // $ExpectError
x('urlset', x('loc'), {xmlns}) // $ExpectError
