# xastscript

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[xast][] utility to create trees with ease.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`x(name?[, attributes][, …children])`](#xname-attributes-children)
    *   [`Attributes`](#attributes-1)
    *   [`Child`](#child)
    *   [`Result`](#result)
*   [Syntax tree](#syntax-tree)
*   [JSX](#jsx)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Related](#related)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package is a hyperscript interface (like `createElement` from React and
such) to help with creating xast trees.

## When should I use this?

You can use this utility in your project when you generate xast syntax trees
with code.
It helps because it replaces most of the repetition otherwise needed in a syntax
tree with function calls.

You can instead use [`unist-builder`][u] when creating any unist nodes and
[`hastscript`][h] when creating hast (HTML) nodes.

## Install

This package is [ESM only][esm].
In Node.js (version 14.14+ and 16.0+), install with [npm][]:

```sh
npm install xastscript
```

In Deno with [`esm.sh`][esmsh]:

```js
import {x} from 'https://esm.sh/xastscript@3'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {x} from 'https://esm.sh/xastscript@3?bundle'
</script>
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

This package exports the identifier [`x`][x].
There is no default export.

The export map supports the automatic JSX runtime.
You can pass `xastscript` to your build tool (TypeScript, Babel, SWC) with an
`importSource` option or similar.

### `x(name?[, attributes][, …children])`

Create [xast][] trees.

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

Attributes of the element ([`Attributes`][attributes], optional).

###### `children`

Children of the node ([`Child`][child] or `Array<Child>`, optional).

##### Returns

Created tree ([`Result`][result]).

[`Element`][element] when a `name` is passed, otherwise [`Root`][root].

### `Attributes`

Map of attributes (TypeScript type).

Nullish (`null` or `undefined`) or `NaN` values are ignored, other values are
turned to strings.

###### Type

```ts
type Attributes = Record<string, boolean | number | string | null | undefined>
```

### `Child`

(Lists of) children (TypeScript type).

When strings or numbers are encountered, they are turned into [`Text`][text]
nodes.
[`Root`][root] nodes are treated as “fragments”, meaning that their children
are used instead.

###### Type

```ts
type Child =
  | Array<Node | boolean | number | string | null | undefined>
  | Node
  | boolean
  | number
  | string
  | null
  | undefined
```

### `Result`

Result from a `x` call (TypeScript type).

###### Type

```ts
type Result = Element | Root
```

## Syntax tree

The syntax tree is [xast][].

## JSX

This package can be used with JSX.
You should use the automatic JSX runtime set to `xastscript`.

> 🪦 **Legacy**: you can also use the classic JSX runtime, but this is not
> recommended.
> To do so, import `x` yourself and define it as the pragma (plus set the
> fragment to `null`).

The Use example above (omitting the second) can then be written like so:

```jsx
/** @jsxImportSource x */

import {u} from 'unist-builder'

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

## Types

This package is fully typed with [TypeScript][].
It exports the additional types [`Attributes`][attributes], [`Child`][child],
and [`Result`][result].

## Compatibility

Projects maintained by the unified collective are compatible with all maintained
versions of Node.js.
As of now, that is Node.js 14.14+ and 16.0+.
Our projects sometimes work with older versions, but this is not guaranteed.

## Security

XML can be a dangerous language: don’t trust user-provided data.

## Related

*   [`unist-builder`][u]
    — create any unist tree
*   [`hastscript`][h]
    — create a hast tree
*   [`xast-util-to-xml`](https://github.com/syntax-tree/xast-util-to-xml)
    — serialize xast as XML
*   [`xast-util-from-xml`](https://github.com/syntax-tree/xast-util-from-xml)
    — parse xast from XML
*   [`hast-util-to-xast`](https://github.com/syntax-tree/hast-util-to-xast)
    — transform hast to xast

## Contribute

See [`contributing.md`][contributing] in [`syntax-tree/.github`][health] for
ways to get started.
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

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[typescript]: https://www.typescriptlang.org

[license]: license

[author]: https://wooorm.com

[health]: https://github.com/syntax-tree/.github

[contributing]: https://github.com/syntax-tree/.github/blob/main/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/main/support.md

[coc]: https://github.com/syntax-tree/.github/blob/main/code-of-conduct.md

[xast]: https://github.com/syntax-tree/xast

[root]: https://github.com/syntax-tree/xast#root

[element]: https://github.com/syntax-tree/xast#element

[text]: https://github.com/syntax-tree/xast#text

[u]: https://github.com/syntax-tree/unist-builder

[h]: https://github.com/syntax-tree/hastscript

[x]: #xname-attributes-children

[attributes]: #attributes-1

[child]: #child

[result]: #result
