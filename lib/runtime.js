/**
 * @typedef {import('./index.js').Element} Element
 * @typedef {import('./index.js').Root} Root
 * @typedef {import('./index.js').XResult} XResult
 * @typedef {import('./index.js').XChild} XChild
 * @typedef {import('./index.js').XAttributes} XAttributes
 * @typedef {import('./index.js').XValue} XValue
 *
 * @typedef {{[x: string]: XValue|XChild}} JSXProps
 */

import {x} from './index.js'

// Export `JSX` as a global for TypeScript.
export * from './jsx-automatic.js'

/**
 * Create XML trees in xast through JSX.
 *
 * @param name Qualified name. Case sensitive and can contain a namespace prefix (such as `rdf:RDF`). Pass `null|undefined` to build a root.
 * @param props Map of attributes. Nullish (null or undefined) or NaN values are ignored, other values (strings, booleans) are cast to strings. `children` can contain one child or a list of children. When strings are encountered, they are mapped to text nodes.
 */
export const jsx =
  /**
   * @type {{
   *   (name: null|undefined, props: {children?: XChild}, key?: string): Root
   *   (name: string, props: JSXProps, key?: string): Element
   * }}
   */
  (
    /**
     * @param {string|null} name
     * @param {XAttributes & {children?: XChild}} props
     * @returns {XResult}
     */
    function (name, props) {
      const {children, ...properties} = props
      return name === null ? x(name, children) : x(name, properties, children)
    }
  )

export const jsxs = jsx

/** @type {null} */
export const Fragment = null
