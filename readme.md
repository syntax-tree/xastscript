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

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c):
Node 12+ is needed to use it and it must be `import`ed instead of `require`d.

[npm][]:

```sh
npm install xastscript
```

## Use

```js
import {u} from 'unist-builder'
import {x} from 'xastscript'

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
  x(null, [
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

### `x(name?[, attributes][, …children])`

Create XML *[trees][tree]* in **[xast][]**.

##### Signatures

*   `x(): root`
*   `x(null[, …children]): root`
*   `x(name[, attributes][, …children]): element`

##### Parameters

###### `name`

Qualified name (`string`, optional).
Case sensitive and can contain a namespace prefix (such as `rdf:RDF`).
When string, an [`Element`][element] is built.
When nullish, a [`Root`][root] is built instead.

###### `attributes`

Map of attributes (`Object.<*>`, optional).
Nullish (`null` or `undefined`) or `NaN` values are ignored, other values are
turned to strings.

Cannot be given if building a [`Root`][root].
Cannot be omitted when building an [`Element`][element] if the first child is a
[`Node`][node].

###### `children`

(Lists of) children (`string`, `number`, `Node`, `Array.<children>`, optional).
When strings or numbers are encountered, they are mapped to [`Text`][text]
nodes.
If a [`Root`][root] node is given, its children are used instead.

##### Returns

[`Element`][element] or [`Root`][root].

## JSX

`xastscript` can be used as a pragma for JSX.
The example above (omitting the second) can then be written like so:

```jsx
import {u} from 'unist-builder'
import {x} from 'xastscript'

console.log(
  <album id={123}>
    <name>Born in the U.S.A.</name>
    <artist>Bruce Springsteen</artist>
    <releasedate>1984-04-06</releasedate>
  </album>
)

console.log(
  <>
    {u('instruction', {name: 'xml'}, 'version="1.0" encoding="UTF-8"')}
    <album>
      {u('comment', 'Great album!')}
      <name>Born in the U.S.A.</name>
      <description>{u('cdata', '3 < 5 & 8 > 13')}</description>
    </album>
  </>
)
```

Note that you must still import `xastscript` yourself and configure your
JavaScript compiler to use the identifier you assign it to as a pragma (and
pass `null` for fragments).

For [bublé][], this can be done by setting `jsx: 'x'` and `jsxFragment: 'null'`
(note that `jsxFragment` is currently only available on the API, not the CLI).

For [Babel][], use [`@babel/plugin-transform-react-jsx`][babel-jsx] (in classic
mode), and pass `pragma: 'x'` and `pragmaFrag: 'null'`.

Babel also lets you configure this in a script:

```jsx
/** @jsx x @jsxFrag null */
import {x} from 'xastscript'

console.log(<music />)
```

For [TypeScript][], this can be done by setting `"jsx": "react"`,
`"jsxFactory": "x"`, and `"jsxFragmentFactory": "null"` in the compiler options.
For more details on configuring JSX for TypeScript, see the
[TypeScript JSX handbook page][].

TypeScript also lets you configure this in a script:

```tsx
/** @jsx x @jsxFrag null */
import {x} from 'xastscript'

console.log(<music />)
```

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

[build-badge]: https://github.com/syntax-tree/xastscript/workflows/main/badge.svg

[build]: https://github.com/syntax-tree/xastscript/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/xastscript.svg

[coverage]: https://codecov.io/github/syntax-tree/xastscript

[downloads-badge]: https://img.shields.io/npm/dm/xastscript.svg

[downloads]: https://www.npmjs.com/package/xastscript

[size-badge]: https://img.shields.io/bundlephobia/minzip/xastscript.svg

[size]: https://bundlephobia.com/result?p=xastscript

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/syntax-tree/unist/discussions

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[contributing]: https://github.com/syntax-tree/.github/blob/HEAD/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/HEAD/support.md

[coc]: https://github.com/syntax-tree/.github/blob/HEAD/code-of-conduct.md

[unist]: https://github.com/syntax-tree/unist

[hast]: https://github.com/syntax-tree/hast

[xast]: https://github.com/syntax-tree/xast

[tree]: https://github.com/syntax-tree/unist#tree

[node]: https://github.com/syntax-tree/unist#node

[root]: https://github.com/syntax-tree/xast#root

[element]: https://github.com/syntax-tree/xast#element

[text]: https://github.com/syntax-tree/xast#text

[u]: https://github.com/syntax-tree/unist-builder

[h]: https://github.com/syntax-tree/hastscript

[bublé]: https://github.com/Rich-Harris/buble

[babel]: https://github.com/babel/babel

[babel-jsx]: https://github.com/babel/babel/tree/main/packages/babel-plugin-transform-react-jsx

[typescript]: https://www.typescriptlang.org

[typescript jsx handbook page]: https://www.typescriptlang.org/docs/handbook/jsx.html
