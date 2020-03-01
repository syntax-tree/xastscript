# xastscript

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

**[xast][]** utility to create XML *[trees][tree]* (like [`hastscript`][h] for
**[hast][]** and [`unist-builder`][u] for **[unist][]**).

## Install

[npm][]:

```sh
npm install xastscript
```

## Use

```js
var u = require('unist-builder')
var x = require('xastscript')

// Children as an array:
console.log(
  x('album', {id: 123}, [
    x('name', 'Born in the U.S.A.'),
    x('artist', 'Bruce Springsteen'),
    x('releasedate', '1984-04-06')
  ])
)

// Children as arguments:
console.log(
  x(
    'album',
    {id: 123},
    x('name', 'Exile in Guyville'),
    x('artist', 'Liz Phair'),
    x('releasedate', '1993-06-22')
  )
)

// For other xast nodes, such as comments, instructions, doctypes, or cdata
// can be created with unist-builder:
console.log(
  u('root', [
    u('instruction', {name: 'xml'}, 'version="1.0" encoding="UTF-8"'),
    x('album', [
      u('comment', 'Great album!'),
      x('name', 'Born in the U.S.A.'),
      x('description', [u('cdata', '3 < 5 & 8 > 13')])
    ])
  ])
)
```

Yields:

```js
{
  type: 'element',
  name: 'album',
  attributes: {id: '123'},
  children: [
    {
      type: 'element',
      name: 'name',
      attributes: {},
      children: [{type: 'text', value: 'Born in the U.S.A.'}]
    },
    {
      type: 'element',
      name: 'artist',
      attributes: {},
      children: [{type: 'text', value: 'Bruce Springsteen'}]
    },
    {
      type: 'element',
      name: 'releasedate',
      attributes: {},
      children: [{type: 'text', value: '1984-04-06'}]
    }
  ]
}
{
  type: 'element',
  name: 'album',
  attributes: {id: '123'},
  children: [
    {
      type: 'element',
      name: 'name',
      attributes: {},
      children: [{type: 'text', value: 'Exile in Guyville'}]
    },
    {
      type: 'element',
      name: 'artist',
      attributes: {},
      children: [{type: 'text', value: 'Liz Phair'}]
    },
    {
      type: 'element',
      name: 'releasedate',
      attributes: {},
      children: [{type: 'text', value: '1993-06-22'}]
    }
  ]
}
{
  type: 'root',
  children: [
    {type: 'instruction', name: 'xml', value: 'version="1.0" encoding="UTF-8"'},
    {
      type: 'element',
      name: 'album',
      attributes: {},
      children: [
        {type: 'comment', value: 'Great album!'},
        {
          type: 'element',
          name: 'name',
          attributes: {},
          children: [{type: 'text', value: 'Born in the U.S.A.'}]
        },
        {
          type: 'element',
          name: 'description',
          attributes: {},
          children: [{type: 'cdata', value: '3 < 5 & 8 > 13'}]
        }
      ]
    }
  ]
}
```

## API

### `x(name[, attributes][, …children])`

Create XML *[trees][tree]* in **[xast][]**.

##### Parameters

###### `name`

Qualified name (`string`).
Case sensitive and can contain a namespace prefix (such as `rdf:RDF`).

###### `attributes`

Map of attributes (`Object.<*>`, optional).
Nully (`null` or `undefined`) or `NaN` values are ignored, other values are
turned to strings.

Cannot be omitted if `children` is a `Node`.

###### `children`

(Lists of) child nodes (`string`, `Node`, `Array.<children>`, optional).
When strings are encountered, they are mapped to [`text`][text] nodes.

##### Returns

[`Element`][element].

## Security

XML can be a dangerous language: don’t trust user-provided data.

## Related

*   [`unist-builder`][u]
    — Create any unist tree
*   [`hastscript`][h]
    — Create a **[hast][]** (HTML or SVG) unist tree
*   [`xast-util-to-xml`](https://github.com/syntax-tree/xast-util-to-xml)
    — Serialize nodes to XML
*   [`xast-util-from-xml`](https://github.com/syntax-tree/xast-util-from-xml)
    — Parse from XML
*   [`hast-util-to-xast`](https://github.com/syntax-tree/hast-util-to-xast)
    — Transform hast (html, svg) to xast (xml)

## Contribute

See [`contributing.md` in `syntax-tree/.github`][contributing] for ways to get
started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/syntax-tree/xastscript.svg

[build]: https://travis-ci.org/syntax-tree/xastscript

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/xastscript.svg

[coverage]: https://codecov.io/github/syntax-tree/xastscript

[downloads-badge]: https://img.shields.io/npm/dm/xastscript.svg

[downloads]: https://www.npmjs.com/package/xastscript

[size-badge]: https://img.shields.io/bundlephobia/minzip/xastscript.svg

[size]: https://bundlephobia.com/result?p=xastscript

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/syntax-tree

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[contributing]: https://github.com/syntax-tree/.github/blob/master/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/master/support.md

[coc]: https://github.com/syntax-tree/.github/blob/master/code-of-conduct.md

[unist]: https://github.com/syntax-tree/unist

[hast]: https://github.com/syntax-tree/hast

[xast]: https://github.com/syntax-tree/xast

[tree]: https://github.com/syntax-tree/unist#tree

[element]: https://github.com/syntax-tree/xast#element

[text]: https://github.com/syntax-tree/xast#text

[u]: https://github.com/syntax-tree/unist-builder

[h]: https://github.com/syntax-tree/hastscript
