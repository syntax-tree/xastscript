/**
 * @import {Element, Root} from 'xast'
 * @import {Child, Value} from './index.js'
 */

/**
 * @typedef {{[x: string]: Child | Value}} JSXProps
 */

import {x} from './index.js'

// Export `JSX` as a global for TypeScript.
export * from './jsx-automatic.js'

/**
 * Create XML trees in xast through JSX.
 *
 * @overload
 * @param {null} name
 *   `null` to get a root.
 * @param {{children?: Child}} props
 *   Properties with children.
 * @param {string} [key]
 *   Key (ignored).
 * @returns {Root}
 *   Root.
 *
 * @overload
 * @param {string} name
 *   Qualified name.
 * @param {JSXProps} props
 *   Map of attributes and children.
 * @param {string} [key]
 *   Key (ignored).
 * @returns {Element}
 *   Element.
 *
 * @param {string | null}  name
 *   Qualified name.
 *
 *   Case sensitive and can contain a namespace prefix (such as `rdf:RDF`).
 *   When string, an `Element` is built.
 *   When nullish, a `Root` is built instead.
 * @param {JSXProps}  props
 *   Map of attributes.
 *
 *   Nullish (`null` or `undefined`) or `NaN` values are ignored, other values
 *   are turned to strings.
 *
 *   Cannot be given if building a `Root`.
 *   Cannot be omitted when building an `Element` if the first child is a
 *   `Node`.
 * @param {string | null | undefined}  [_key]
 *   Key (not used).
 * @returns {Element | Root}
 *   Result.
 */
export function jsx(name, props, _key) {
  const {children, ...properties} = props
  return name === null
    ? x(name, children)
    : // @ts-expect-error: overloads are complex.
      x(name, properties, children)
}

export const Fragment = null

export const jsxDEV =
  /**
   * @type {{
   *   (name: null, props: {children?: Child}, key?: string, ...unused: Array<unknown>): Root
   *   (name: string, props: JSXProps, key?: string, ...unused: Array<unknown>): Element
   * }}
   */
  (jsx)

export const jsxs = jsx
